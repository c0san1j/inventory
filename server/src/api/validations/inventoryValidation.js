const cleanInput = (input) => {
	if (!input) return 0;
	return input.trim();
};

const countInput = (input) => {
	if (!input) return 0;
	// if (input == undefined) return 0;
	return input.length;
};

const regexInput = (regex, input) => {
	return regex.test(input);
};

const isEmailValid = (email) => {
	return regexInput(/^(?=.*[@])(?=.*[.])[A-Za-z\d@.]/, email);
};

exports.detectSerial = (serial) => {
	const items = [
		{ name: 'EPSON DS-320 Doc Scanner', regex: /^X35L/ },
		{ name: 'Aruba Router - RAP 155', regex: /^CC00/ },
		{ name: 'Aruba Router - RAP 205', regex: /^CNC/ },
		{ name: 'Aruba Router - RAP 303H', regex: /^CNF/ },
		{ name: 'Cisco SG200 8 Port Gigabit Network Switch', regex: /^PNZ2/ },
		{ name: 'Cisco SG200 8 Port Gigabit Network Switch', regex: /^PSZ2/ },
		{ name: 'Cisco SG250 8 Port Gigabit Network Switch', regex: /^PNZ235/ },
		{ name: 'Dymo 450 Label Printer', regex: /^1750/ },
		{ name: 'DC800 Elitedesk Mini CPU', regex: /^2UA5/ },
		{ name: 'DC800G2 Elitedesk Mini CPU', regex: /^(?:2UA[6-7]|MXL)/ },
		// { name: 'DC8003 Elitedesk Mini CPU', regex: /^(?:2UA3)/ },
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

	for (item of items) {
		// const serial = "1750";
		let check = regexInput(item.regex, serial);
		if (check) {
			return item.name;
		}
	}
};
