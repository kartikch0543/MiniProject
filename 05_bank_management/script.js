let balance = 0;
const balanceDisplay = document.getElementById('balanceDisplay');
const transactionList = document.getElementById('transactionList');
const withdrawError = document.getElementById('withdrawError');

function updateBalance() {
    balanceDisplay.innerText = `$${balance.toFixed(2)}`;
}

function addTransaction(type, amount) {
    const li = document.createElement('li');
    li.className = 'transaction-item';

    const isDeposit = type === 'deposit';
    const sign = isDeposit ? '+' : '-';

    li.innerHTML = `
        <span class="type ${type}">${isDeposit ? 'Received' : 'Sent'}</span>
        <span>${sign}$${amount.toFixed(2)}</span>
    `;

    transactionList.prepend(li);
}

function deposit() {
    const input = document.getElementById('depositInput');
    const amount = parseFloat(input.value);

    if (amount > 0) {
        balance += amount;
        updateBalance();
        addTransaction('deposit', amount);
        input.value = '';
        withdrawError.style.display = 'none';
    }
}

function withdraw() {
    const input = document.getElementById('withdrawInput');
    const amount = parseFloat(input.value);

    if (amount > 0) {
        if (amount <= balance) {
            balance -= amount;
            updateBalance();
            addTransaction('withdraw', amount);
            input.value = '';
            withdrawError.style.display = 'none';
        } else {
            withdrawError.style.display = 'block';
            withdrawError.innerText = "Error: Low Balance";
        }
    }
}

// Initial
updateBalance();
