const crypto = require('crypto');
const secret = 'Secret';

exports.hash = () => {
	return crypto
		.createHmac('sha256', secret)
		.update(Date.now().toString())
		.digest('hex');
};
