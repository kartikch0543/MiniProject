document.getElementById('regForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear previous errors
    document.querySelectorAll('.error-msg').forEach(el => el.remove());
    document.querySelectorAll('.input-group').forEach(el => el.classList.remove('error'));

    let isValid = true;
    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    // Simple validation
    if (fullname.value.trim().length < 3) {
        showError(fullname, 'Name must be at least 3 characters');
        isValid = false;
    }

    if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }

    if (password.value.length < 6) {
        showError(password, 'Password must be at least 6 characters');
        isValid = false;
    }

    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }

    if (isValid) {
        // Stimulate success
        const btn = document.querySelector('.btn-submit');
        const originalText = btn.innerText;
        btn.innerText = 'Success!';
        btn.style.background = '#00b894';

        setTimeout(() => {
            alert('Account created successfully (Simulation)');
            btn.innerText = originalText;
            btn.innerText = originalText;
            document.getElementById('regForm').reset();
        }, 500);
    }
});

function showError(input, message) {
    const group = input.parentElement;
    group.classList.add('error');
    const msg = document.createElement('span');
    msg.className = 'error-msg';
    msg.innerText = message;
    group.appendChild(msg);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
