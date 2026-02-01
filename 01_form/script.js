document.getElementById('regForm').addEventListener('submit', function (e) {
    e.preventDefault();

    document.querySelectorAll('.error-msg').forEach(el => el.remove());
    document.querySelectorAll('.input-group').forEach(el => el.classList.remove('error'));

    let isValid = true;

    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    if (fullname.value.trim().length < 3) {
        showError(fullname, 'Name must be at least 3 characters');
        isValid = false;
    }

    if (!isValidEmail(email.value)) {
        showError(email, 'Enter a valid email');
        isValid = false;
    }

    if (password.value.length < 6) {
        showError(password, 'Minimum 6 characters required');
        isValid = false;
    }

    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }

    if (isValid) {
        const btn = document.querySelector('.btn-submit');
        btn.innerText = 'Success!';
        btn.style.background = '#16a34a';

        setTimeout(() => {
            alert('Account created successfully!');
            btn.innerText = 'Sign Up';
            btn.style.background = '#6366f1';
            e.target.reset();
        }, 800);
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
