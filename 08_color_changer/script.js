function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function randomizeAll() {
    for (let i = 1; i <= 4; i++) {
        const box = document.getElementById(`box${i}`);
        const newColor = getRandomColor();
        box.style.backgroundColor = newColor;
        box.innerText = newColor; // Show hex code
    }
}

// Attach listeners
for (let i = 1; i <= 4; i++) {
    const box = document.getElementById(`box${i}`);
    box.addEventListener('click', randomizeAll);

    // Initial Color
    box.style.backgroundColor = getRandomColor();
}
randomizeAll(); // Run once on load
