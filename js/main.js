const userData = {
    USD: 1000,
    EUR: 900,
    UAH: 15000,
    BIF: 20000,
    AOA: 100
};

const bankData = {
    USD: {
        max: 3000,
        min: 100,
        img: '💵'
    },
    EUR: {
        max: 1000,
        min: 50,
        img: '💶'
    },
    UAH: {
        max: 0,
        min: 0,
        img: '💴'
    },
    GBP: {
        max: 10000,
        min: 100,
        img: '💷'
    }
}

function getCurrencyInput(whiteList) {
    do {
        const answer = prompt(`Which currency do you want to get? (${whiteList})`)?.toUpperCase();

        if (!answer)
            return;
        else if (!answer.length || !whiteList.includes(answer))
            alert(`You putted wrong currency <${answer}>. You can put only these currencies: ${whiteList}.`);
        else
            return answer;
    } while(true)
}

function getAmountInput(currency) {
    do {
        const answer = prompt(`How much? (${currency})`);

        if (!answer)
            return;
        else if (isNaN(+answer) || +answer < 1)
            alert(`You putted wrong amount <${answer}>. You can put only positive values.`);
        else
            return answer;
    } while(true)
}

function getMoney() {
    return new Promise((resolve, reject) => {
        confirm('Show balance?') ? resolve() : reject();
    });
}

getMoney()
    .then(
        () => {
            const userCurrencies = Object.keys(userData).map(c => c.toUpperCase());
            const currencyFromUser = getCurrencyInput(userCurrencies);

            return currencyFromUser ?
                Promise.resolve(`You balance: ${ userData[currencyFromUser] + ' ' + currencyFromUser}`) :
                Promise.reject();
        },
        () => {
            const userCurrencies = Object.keys(userData).map(c => c.toUpperCase());
            const atmCurrencies = Object.entries(bankData).filter(c => c[1]['max'] > 1).map(c => c[0]);
            const availableCurrencies = userCurrencies.filter(c => atmCurrencies.includes(c));
            const currencyFromUser = getCurrencyInput(availableCurrencies);

            if(!currencyFromUser) return Promise.reject();

            const amountFromUser = getAmountInput(currencyFromUser);

            if(!amountFromUser) return Promise.reject();

            const money = bankData[currencyFromUser];

            if (amountFromUser > money['max']) {
                return Promise.reject(
                    `The amount entered is greater than available. ` +
                    `Max withdrawal amount: ${money['max']}${currencyFromUser}`
                );
            } else if (amountFromUser < money['min']) {
                return Promise.reject(
                    `The amount entered is less than available. ` +
                    `Min withdrawal amount: ${money['min']}${currencyFromUser}`
                );
            }

            return Promise.resolve(
                `Take your money - ${amountFromUser}${currencyFromUser}${money['img']}`
            );
        })
    .then(msg => alert(msg))
    .catch(rejectMsg => rejectMsg && alert(rejectMsg))
    .finally(() => alert('Thanks, have a nice day 😊'));