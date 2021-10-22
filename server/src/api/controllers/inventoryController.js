const inventoryService = require('../services/inventoryService');
const inventoryValidation = require('../validations/inventoryValidation');
const { promisify } = require('util');
const env = require('../config/env');

const redis = require('redis').createClient({
	host: env.REDIS_URL,
	port: env.REDIS_PORT,
});

const get = promisify(redis.get).bind(redis);
const set = promisify(redis.set).bind(redis);

// const bcrypt = require('bcryptjs');
// const { hash } = require('../helpers/cryptoHelper');

// const User = require('../models/userModel');

// exports.createNewUser = async (payload) => {
// 	try {
// 		return await User.create(payload);
// 	} catch (err) {
// 		return err.message;
// 	}
// };

exports.addToVan = async (req, res) => {
	const { serial } = req.body;
	// This will check the user input to make sure is clean if not will throw an error of all non-clean input
	const model = inventoryValidation.detectSerial(serial);
	console.log(model);

	const newPayload = { model: model, status: 'avaliable', serial };

	// console.log(`ID: ${item.result._id}`);
	const reply = await get('addToVan');
	// console.log(`Reply: ${reply}`);
	if (reply) {
		const replyData = JSON.parse(reply);

		const newReply = replyData.some((item) => item.serial == serial);

		if (!newReply) {
			// It passed validation and using clean syntax to save data to mongodb
			const item = await inventoryService.addToVan(newPayload);
			// If any error cause during saving to database will be display the error
			if (item.status == 'failed') {
				return res.status(400).json({ Error: item.error });
			}
			const custom = [
				{
					id: item.result._id,
					text: `[SN: ${serial}] - ${model}`,
					serial: serial,
				},
				...replyData,
			];
			const saveResult = await set('addToVan', JSON.stringify(custom));
			res.status(201).json(item.result);
		}
	} else {
		// It passed validation and using clean syntax to save data to mongodb
		const item = await inventoryService.addToVan(newPayload); // If any error cause during saving to database will be display the error
		if (item.status == 'failed') {
			return res.status(400).json({ Error: item.error });
		}
		const custom = [
			{
				id: item.result._id,
				text: `[SN: ${serial}] - ${model}`,
				serial: serial,
			},
		];
		const saveResult = await set('addToVan', JSON.stringify(custom));
		res.status(201).json(item.result);
	}

	// // If any error cause during saving to database will be display the error
	// if (item.status == 'failed') {
	// 	return res.status(400).json({ Error: item.error });
	// }

	// Create User On Database Result
};

// exports.getVan = async (req, res) => {
// 	// const getAll = await inventoryService.getVan();

// 	// if (getAll.status == 'failed') {
// 	// 	return res.status(400).json({ Error: getAll.error });
// 	// }

// 	// const newObj = [];

// 	// for (item of getAll.result) {
// 	// 	const tempObj = {
// 	// 		id: item._id,
// 	// 		text: `[SN: ${item.serial}] - ${item.model}`,
// 	// 	};

// 	// 	newObj.push(tempObj);
// 	// }

// 	const getDataJson = await get('addToVan');
// 	console.log(getDataJson);
// 	const jsonToObj = JSON.parse(getDataJson);
// 	console.log(jsonToObj);
// 	// Create User On Database Result
// 	res.status(200).json(jsonToObj);
// };

exports.getVan = async (req, res) => {
	const getAll = await inventoryService.getVan();

	if (getAll.status == 'failed') {
		return res.status(400).json({ Error: getAll.error });
	}

	const newObj = [];

	for (item of getAll.result) {
		const tempObj = {
			id: item._id,
			text: `[SN: ${item.serial}] - ${item.model}`,
		};

		newObj.push(tempObj);
	}

	const reply = await get('addToVan');
	// console.log(reply);
	if (reply) {
		const replyToObj = JSON.parse(reply);
		return res.status(200).json(replyToObj);
	}
	// console.log(`Data: ${reply}`);
	// const jsonToObj = JSON.parse(reply);
	// console.log(jsonToObj);
	// console.log(jsonToObj[jsonToObj.length - 1]);

	// Create User On Database Result
	return res.status(200).json([]);
};

exports.getOneVan = async (req, res) => {
	const { serial } = req.params;

	// const getOne = await inventoryService.getOneVan(serial);
	// // console.log(getOne);

	// if (getOne.status == 'failed') {
	// 	return res.status(400).json({ Error: getOne.error });
	// }

	// const tempObj = {
	// 	id: getOne.result._id,
	// 	text: `[SN: ${getOne.result.serial}] - ${getOne.result.model}`,
	// };
	const reply = await get('addToVan');
	const replyToObj = JSON.parse(reply);
	const newReply = replyToObj.filter((item) => item.serial == serial);

	console.log(newReply);
	// if (reply) {
	// }
	// console.log(`Data: ${reply}`);

	// Create User On Database Result
	res.status(200).json(newReply[0]);
};

exports.delVan = async (req, res) => {
	const { id } = req.body;

	console.log(req.body);

	// const getOne = await inventoryService.getOneVan(serial);
	// // console.log(getOne);

	// if (getOne.status == 'failed') {
	// 	return res.status(400).json({ Error: getOne.error });
	// }

	// const tempObj = {
	// 	id: getOne.result._id,
	// 	text: `[SN: ${getOne.result.serial}] - ${getOne.result.model}`,
	// };
	const reply = await get('addToVan');
	const replyToObj = JSON.parse(reply);
	const newReply = replyToObj.filter((item) => item.id !== id);
	const saveResult = await set('addToVan', JSON.stringify(newReply));

	// It passed validation and using clean syntax to save data to mongodb
	const item = await inventoryService.delVan(id);
	// If any error cause during saving to database will be display the error
	if (item.status == 'failed') {
		return res.status(400).json({ Error: item.error });
	}

	console.log(item);
	// if (reply) {
	// }
	// console.log(`Data: ${reply}`);

	// Create User On Database Result
	res.status(200).json(item);
};

exports.userLogin = async (req, res) => {
	const { email, password } = req.body;
	// This will check the user input to make sure is clean if not will throw an error of all non-clean input
	const isEmailValid = await inventoryValidation.userLogin(email);
	if (!isEmailValid) {
		return res.status(400).json({ Error: 'Invalid email syntax' });
	}

	// It passed validation and using clean syntax to save data to mongodb
	const login = await inventoryService.userLogin(email);

	// If any error during fetching to database will be display the error
	if (login.status == 'failed') {
		return res.status(400).json({ Error: login.error });
	}

	// Check if account exist on database
	if (!login.result) {
		return res
			.status(404)
			.json({ Error: 'No Account is found under that email address' });
	}

	// check if password match to the hash
	const verify = await bcrypt.compare(password, login.result.password);

	//if password not match throw an error
	if (!verify) return res.status(404).json({ Error: 'Invalid Password' });

	//TODO: PASSWORD MATCH WHAT TO DO? Make a accesstoke? save it to redit?

	await inventoryService.setAccessToken(
		hash,
		JSON.stringify(login.result),
		'EX',
		3000
	);

	res.status(201).json(login.result);
};
