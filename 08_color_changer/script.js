const themes = [
    { bg: "#ff7675", text: "#2d3436" }, // Red
    { bg: "#74b9ff", text: "#2d3436" }, // Blue
    { bg: "#55efc4", text: "#2d3436" }, // Green
    { bg: "#ffeaa7", text: "#2d3436" }  // Yellow
];

// Random color generator for the boxes themselves
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeTheme(index) {
    // Change body background
    const theme = themes[index];
    document.body.style.background = theme.bg;
    document.body.style.color = theme.text;

    // Now randomize the boxes for fun
    for (let i = 1; i <= 4; i++) {
        const box = document.getElementById(`box${i}`);
        const newColor = getRandomColor();
        box.style.background = newColor;

        // Update theme array so clicking it again sets the NEW color
        themes[i - 1].bg = newColor;
    }
}
