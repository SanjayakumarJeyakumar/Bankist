'use strict';

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    new Date(2025, 5, 12).toISOString(),
    new Date(2025, 5, 14).toISOString(),
    new Date(2025, 5, 16, 12).toISOString(),
    new Date().toISOString(),
  ],
  currency: 'INR',
  locale: 'en-In',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-08-11T23:36:17.929Z',
    '2020-08-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2020-01-28T09:15:04.904Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account5 = {
  owner: 'Sanjay Kumar',
  movements: [2000, 4500, -4000, 30000, -6050, -1300, 700, 13000],
  interestRate: 1.2, // %
  pin: 9639,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    new Date(2025, 5, 12).toISOString(),
    new Date(2025, 5, 14).toISOString(),
    new Date(2025, 5, 16, 12).toISOString(),
    new Date().toISOString(),
  ],
  currency: 'INR',
  locale: 'en-In',
};
const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const labelTime = document.querySelector('.time__label');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const createUserName = function () {
  accounts.forEach((acc, i) => {
    acc.username = acc.owner
      .split(' ')
      .map(w => w[0])
      .join('')
      .toLowerCase();
  });
};

createUserName();
setInterval(function () {
  const clock = new Date();
  const opClock = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  labelTime.textContent = new Intl.DateTimeFormat('en-IN', opClock).format(
    clock
  );
}, 1000);

let timerLogOut;

const setLogOutTimer = function (num) {
  let sec = num;
  const tick = function () {
    const minn = Math.trunc(sec / 60);
    labelTimer.textContent = `${String(minn).padStart(2, 0)}:${String(
      sec % 60
    ).padStart(2, 0)}`;
    if (sec === 0) {
      containerApp.style.opacity = 0;
      clearInterval(timerLogOut);
      labelWelcome.textContent = 'Log in to get started';
    }
    sec--;
  };
  tick();
  const timerLogOut = setInterval(tick, 1000);
  return timerLogOut;
};

const CalDaysPassed = function (days1, days2) {
  return Math.round(Math.abs(days2 - days1) / (1000 * 60 * 60 * 24));
};

const formatDays = function (tnow) {
  const daysGone = CalDaysPassed(new Date(), tnow);

  if (daysGone === 0) return 'Today';
  if (daysGone === 1) return 'Yesterday';
  if (daysGone <= 7) return `${daysGone} days Ago`;

  const op1 = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en-IN', op1).format(tnow);
};

const displayMovements = function (acco, sort = false) {
  containerMovements.innerHTML = '';

  const move = acco.movements.slice();
  const moveDate = acco.movementsDates.slice();
  if (sort) {
    for (let i = 0; i < acco.movements.length - 1; i++) {
      for (let j = 0; j < acco.movements.length - 1; j++) {
        if (move[j] > move[j + 1]) {
          let temp = move[j];
          move[j] = move[j + 1];
          move[j + 1] = temp;
          let temp1 = moveDate[j];
          moveDate[j] = moveDate[j + 1];
          moveDate[j + 1] = temp1;
        }
      }
    }
  }

  move.forEach(function (mov, i) {
    const type = mov < 0 ? 'withdrawal' : 'deposit';

    const tt = formatDays(new Date(moveDate[i]));

    const formattedCurrency = new Intl.NumberFormat(acco.locale, {
      style: 'currency',
      currency: acco.currency,
    }).format(mov);

    let html = `
  <div class="movements__row">
    <div class="movements__type         
    movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${tt}</div>
   <div class="movements__value">${formattedCurrency}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayBalance = function (acco) {
  const bal = acco.movements.reduce((acc, curr) => acc + curr, 0);
  acco.balance = bal.toFixed(2);
  labelBalance.textContent = `${new Intl.NumberFormat(acco.locale, {
    style: 'currency',
    currency: acco.currency,
  }).format(bal.toFixed(2))}`;
};

const displaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(income.toFixed(2))}`;

  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(Math.abs(outcome).toFixed(2))}`;

  const intr = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / (100).toFixed(2))
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(intr)}`;
};

const updateUI = function (ac) {
  displayBalance(ac);
  displaySummary(ac);
  displayMovements(ac);
};

let acc;

const now = new Date();

const op = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
};
labelDate.textContent = new Intl.DateTimeFormat('en-IN', op).format(now);

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  acc = accounts.find(
    acc => acc.username === inputLoginUsername.value.trim().toLowerCase()
  );

  if (acc?.pin === Number(inputLoginPin.value.trim())) {
    labelWelcome.textContent = `Welcome back , ${acc.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();
    if (timerLogOut) clearInterval(timerLogOut);
    timerLogOut = setLogOutTimer(120);
    updateUI(acc);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const toacc = accounts.find(
    acc => acc.username === inputTransferTo.value.trim().toLowerCase()
  );
  const money = Number(inputTransferAmount.value);

  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  inputTransferTo.blur();
  inputTransferAmount.blur();

  if (toacc && money > 0 && acc.balance >= money && toacc !== acc) {
    setTimeout(function () {
      toacc.movements.push(money);
      acc.movements.push(-1 * money);
      acc.movementsDates.push(new Date().toISOString());
      toacc.movementsDates.push(new Date().toISOString());
      updateUI(acc);
    }, 2000);

    if (timerLogOut) clearInterval(timerLogOut);
    timerLogOut = setLogOutTimer(120);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const closeAccUser = inputCloseUsername.value.trim().toLowerCase();

  const closeAccPin = Number(inputClosePin.value);

  if (acc.username === closeAccUser && acc.pin === closeAccPin) {
    const index = accounts.findIndex(acc => acc.username === closeAccUser);
    console.log(index);

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;

    labelWelcome.textContent = 'Log in to get started';

    inputCloseUsername.value = inputClosePin.value = '';
    inputCloseUsername.blur();
    inputClosePin.blur();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const money = Math.floor(inputLoanAmount.value);

  if (money > 0 && acc.movements.some(mov => mov * 0.1)) {
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
    setTimeout(function () {
      acc.movements.push(money);

      acc.movementsDates.push(new Date().toISOString());
      updateUI(acc);
    }, 3000);
    if (timerLogOut) clearInterval(timerLogOut);
    timerLogOut = setLogOutTimer(120);
  }
});

let sortState = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(acc, !sortState);
  sortState = !sortState;
});

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(mods => mods.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnNextCreateAccount = document.querySelector('.next-create-acc');

const inputCreateAccountFirstName = document.querySelector(
  '.create__acc__fname'
);
const inputCreateAccountLastName = document.querySelector(
  '.create__acc__lname'
);
const inputCreateAccountPin = document.querySelector('.create__acc__pin');

const randomNumber = function (min, max) {
  return Math.trunc(Math.random() * (max - min + 1)) + min;
};

const arrayCurrency = ['EUR', 'INR', 'USD'];
const arrayLocale = ['pt-PT', 'en-IN', 'en-US'];

btnNextCreateAccount.addEventListener('click', function (e) {
  e.preventDefault();
  const name = [
    inputCreateAccountFirstName.value,
    inputCreateAccountLastName.value,
  ]
    .map(m => m.replace(m[0], m[0].toUpperCase()))
    .join(' ');

  const pin = +inputCreateAccountPin.value;
  let n = randomNumber(0, 2);
  const newAccount = {
    owner: name,
    movements: [],
    interestRate: +(Math.random() + 1).toFixed(1),
    pin: pin,
    movementsDates: [],
    currency: arrayCurrency[n],
    locale: arrayLocale[n],
  };

  newAccount.movements.push(5000);
  newAccount.movementsDates.push(new Date().toISOString());
  accounts.push(newAccount);
  createUserName();
  console.log(accounts);
  acc = newAccount;
  containerApp.style.opacity = 100;
  labelWelcome.textContent = `Welcome back , ${acc.owner.split(' ')[0]}`;
  if (timerLogOut) clearInterval(timerLogOut);
  timerLogOut = setLogOutTimer(120);
  updateUI(acc);
  closeModal();
});
