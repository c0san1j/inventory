// const text = 'Joel Santiago';

// console.log(text.replace(/[^a-zA-Z\s]/g, ''));
// console.log(text.match(/[^a-zA-Z\s]/g));
// console.log(text.match(/oel/g));

// const fullnameRegex = /[^0-9][\W]/g;

// console.log(fullnameRegex.test(text)); // => true
// console.log(text.match(fullnameRegex)); // => true

// ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$
// This regex will enforce these rules:

// At least one upper case English letter, (?=.*?[A-Z])
// At least one lower case English letter, (?=.*?[a-z])
// At least one digit, (?=.*?[0-9])
// At least one special character, (?=.*?[#?!@$%^&*-])
// Minimum eight in length .{8,} (with the anchors)

const password = 'Sess2338';
const email_CleanInput = 'joel@gmail.com';

const regexInput = (regex, input) => {
	return regex.test(input);
};

// const email_Result = regexInput(
// 	/^(?=.*[@])(?=.*[.])[A-Za-z\d@.]/,
// 	email_CleanInput
// );

// const password_Result = regexInput(
// 	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
// 	password
// );
// console.log(password_Result);
// console.log(email_Result);

const serialCollection = [
	{ name: 'EPSON DS-320 Doc Scanner', regex: /^X35L/ },
	{ name: 'Aruba Router - RAP 155', regex: /^CC00/ },
	{ name: 'Aruba Router - RAP 205', regex: /^CNC/ },
	{ name: 'Aruba Router - RAP 303H', regex: /^CNF/ },
	{ name: 'Cisco SG200 8 Port Gigabit Network Switch', regex: /^PNZ2/ },
	{ name: 'Cisco SG250 8 Port Gigabit Network Switch', regex: /^PNZ235/ },
	{ name: 'Dymo 450 Label Printer', regex: /^1750/ },
	{ name: 'DC800 Elitedesk Mini CPU', regex: /^2UA5/ },
	{ name: 'DC800G2 Elitedesk Mini CPU', regex: /^(?:2UA[6-7]|MXL)/ },
	{ name: 'DC800G3 Elitedesk Mini CPU', regex: /^8CG/ },
	{ name: 'M401DN3 Laser Printer', regex: /^PHG/ },
	{ name: 'M402N Laser Printer', regex: /^PHBH/ },
	{ name: 'M404N Laser Printer', regex: /^PHBC/ },
	{ name: 'M454DN Laser Printer', regex: /^VNB/ },
	{ name: 'V5G70 Monitor', regex: /^3CQ/ },
	{ name: 'Lenovo M720Q CPU', regex: /^MJ0(?:C|D)/ },
	{ name: 'Lenovo M75Q CPU', regex: /^MJ0(?:E|D)/ },
	{ name: 'Magtek USB Card Reader', regex: /^X0(?:3|5)/ },
	{ name: 'Zebra LP2824+ Label Printer', regex: /^36(?:J|j)/ },
	{ name: 'Zebra ZD410 Label Printer', regex: /^50(?:J|j)/ },
	{ name: 'Unknown', regex: /[A-Za-z0-9]/g },
];

const detectSerial = (serial) => {
	for (el of serialCollection) {
		// const serial = "1750";
		let check = regexInput(el.regex, serial);
		if (check) {
			return el.name;
		}
	}

	//EPSON DS-320 Doc Scanner
	// const detect = regexInput(/^X35L/, serial);

	// Aruba Router - RAP 155
	// const detect = regexInput(/^CC00/, serial);

	// Aruba Router - RAP 205
	// const detect = regexInput(/^CNC/, serial);

	// Aruba Router - RAP 303H
	// const detect = regexInput(/^CNF/, serial);

	// Cisco SG200 8 Port Gigabit Network Switch
	// const detect = regexInput(/^PNZ2/, serial);

	// Cisco SG250 8 Port Gigabit Network Switch
	// const detect = regexInput(/^PNZ235/, serial);

	// Dymo 450 Label Printer
	// const detect = regexInput(/^1750/, serial);

	// Hewlett Packard DC800 Elitedesk Mini CPU
	// const detect = regexInput(/^2UA5/, serial);

	// Hewlett Packard DC800G2 Elitedesk Mini CPU
	// const detect = regexInput(/^(?:2UA[6-7]|MXL)/, serial);

	// Hewlett Packard DC800G3 Elitedesk Mini CPU
	// const detect = regexInput(/^8CG/, serial);

	// Hewlett Packard M401DN3 Laser Printer
	// const detect = regexInput(/^PHG/, serial);

	// Hewlett Packard M402N Laser Printer
	// const detect = regexInput(/^PHBH/, serial);

	// Hewlett Packard M404N Laser Printer
	// const detect = regexInput(/^PHBC/, serial);

	// Hewlett Packard M454DN Laser Printer
	// const detect = regexInput(/^VNB/, serial);

	// Hewlett Packard V5G70 Monitor
	// const detect = regexInput(/^3CQ/, serial);

	// Lenovo M720Q CPU
	// const detect = regexInput(/^MJ0(?:C|D)/, serial);

	// Lenovo M75Q CPU
	// const detect = regexInput(/^MJ0(?:E|D)/, serial);

	// Magtek USB Swipe-Credit Card Reader
	// const detect = regexInput(/^X0(?:3|5)/, serial);

	// Zebra LP2824+ Label Printer
	// const detect = regexInput(/^36(?:J|j)/, serial);

	// Zebra ZD410 Label Printer
	// const detect = regexInput(/^50(?:J|j)/, serial);

	// const password_Result = regexInput(
	// 	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
	// 	password
	// );
	// console.log(detect);
};

console.log(detectSerial('MJ0wGL9E'));
