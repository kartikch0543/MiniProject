const boxes = document.querySelectorAll('.color-box');

// Fixed final colors (order matters)
const finalColors = [
    '#e74c3c', // Red
    '#3498db', // Blue
    '#2ecc71', // Green
    '#f1c40f'  // Yellow
];

let revealed = false;

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        if (!revealed) {
            boxes.forEach((b, i) => {
                b.style.backgroundColor = finalColors[i];
            });
            revealed = true;
        }
    });
});
