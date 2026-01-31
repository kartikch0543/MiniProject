const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f']; // Red, Blue, Green, Yellow

function setStaticColors() {
    for (let i = 1; i <= 4; i++) {
        const box = document.getElementById(`box${i}`);

        // Remove old listeners by cloning
        const newBox = box.cloneNode(true);
        box.parentNode.replaceChild(newBox, box);

        // Set style
        newBox.style.backgroundColor = colors[i - 1];
        newBox.innerText = "";

        newBox.addEventListener('click', () => {
            document.body.style.backgroundColor = colors[i - 1];
        });
    }
}

setStaticColors();
