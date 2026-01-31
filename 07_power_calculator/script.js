const inputs = [
    document.getElementById("i1"),
    document.getElementById("i2"),
    document.getElementById("i3"),
    document.getElementById("i4")
];

function updateValues(n) {
    inputs[0].value = n;
    inputs[1].value = n ** 2;
    inputs[2].value = n ** 3;
    inputs[3].value = n ** 4;
}

inputs.forEach(input => {
    input.addEventListener("input", () => {
        const n = parseFloat(input.value);
        if (isNaN(n)) return;

        updateValues(n);
    });
});
