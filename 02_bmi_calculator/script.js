function calculateBMI() {
    const heightInput = document.getElementById('height').value;
    const weightInput = document.getElementById('weight').value;

    if (!heightInput || !weightInput) return;

    const heightInMeters = heightInput / 100;
    const bmi = weightInput / (heightInMeters * heightInMeters);
    const roundedBMI = bmi.toFixed(1);

    const valueDisplay = document.querySelector('.bmi-value');
    const statusDisplay = document.querySelector('.bmi-status');

    valueDisplay.innerText = roundedBMI;

    let status = '';

    if (bmi < 18.5) {
        status = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        status = 'Normal Weight';
    } else if (bmi >= 25 && bmi < 30) {
        status = 'Overweight';
    } else {
        status = 'Obese';
    }

    statusDisplay.innerText = status;
}
