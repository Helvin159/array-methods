const main = document.getElementById('main');
const addUserBtn = document.getElementById('addUser');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('showMillionaires');
const sortRichestBtn = document.getElementById('sort');
const sortPoortBtn = document.getElementById('sortTwo');
const calcWealthBtn = document.getElementById('calculateWealth');

let data = [];

const getRandomUser = async () => {
	const res = await fetch('https://randomuser.me/api/');
	const data = await res.json();

	// console.log(data);

	const user = data.results[0];

	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 10000000),
	};

	addData(newUser);
};

const addData = (newUser) => {
	data.push(newUser);
	// console.log(data);

	updateDOM();
};

const updateDOM = (providedData = data) => {
	main.innerHTML = '<h2><strong> Person </strong>Wealth</h2>';

	providedData.forEach((i) => {
		const element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML = `<strong>${i.name}</strong> ${formatMoney(i.money)}`;
		main.appendChild(element);
	});
};

const doubleMoney = () => {
	data = data.map((i) => {
		return { ...i, money: i.money * 2 };
	});

	updateDOM();
};

const sortByRichest = () => {
	data.sort((a, b) => {
		return b.money - a.money;
	});

	updateDOM();
};

const sortByPoorest = () => {
	data.sort((a, b) => {
		return a.money - b.money;
	});

	updateDOM();
};

const showMillionaires = () => {
	data = data.filter((i) => {
		return i.money >= 1000000;
	});

	updateDOM();
};

const calcWealth = () => {
	const wealth = data.reduce((acc, num) => {
		return (acc += num.money);
	}, 0);

	console.log(formatMoney(wealth));

	const wealthEl = document.createElement('div');
	wealthEl.innerHTML = `
	<h3>Total Wealth</h3>
	${formatMoney(wealth)}
	`;
	main.appendChild(wealthEl);
};

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
const formatMoney = (number) => {
	return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortRichestBtn.addEventListener('click', sortByRichest);
sortPoortBtn.addEventListener('click', sortByPoorest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calcWealthBtn.addEventListener('click', calcWealth);

getRandomUser();
