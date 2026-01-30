const i1 = document.getElementById("i1");
const i2 = document.getElementById("i2");
const i3 = document.getElementById("i3");
const i4 = document.getElementById("i4");

function updateFromBase(n) {
    if (isNaN(n)) {
        i2.value = "";
        i3.value = "";
        i4.value = "";
        return;
    }
    i1.value = n; // Ensure base is set if called from others
    i2.value = parseFloat((n ** 2).toFixed(4));
    i3.value = parseFloat((n ** 3).toFixed(4));
    i4.value = parseFloat((n ** 4).toFixed(4));
}

// Base Input (x)
i1.addEventListener("input", () => {
    const val = parseFloat(i1.value);
    updateFromBase(val);
});

// Square Input (x^2) -> x = sqrt(val)
i2.addEventListener("input", () => {
    const val = parseFloat(i2.value);
    if (isNaN(val) || val < 0) return; // Basic validation
    const base = Math.sqrt(val);
    i1.value = parseFloat(base.toFixed(4));
    i3.value = parseFloat((base ** 3).toFixed(4));
    i4.value = parseFloat((base ** 4).toFixed(4));
});

// Cube Input (x^3) -> x = cbrt(val)
i3.addEventListener("input", () => {
    const val = parseFloat(i3.value);
    if (isNaN(val)) return;
    const base = Math.cbrt(val);
    i1.value = parseFloat(base.toFixed(4));
    i2.value = parseFloat((base ** 2).toFixed(4));
    i4.value = parseFloat((base ** 4).toFixed(4));
});

// Power 4 Input (x^4) -> x = val^(1/4)
i4.addEventListener("input", () => {
    const val = parseFloat(i4.value);
    if (isNaN(val) || val < 0) return;
    const base = Math.pow(val, 0.25);
    i1.value = parseFloat(base.toFixed(4));
    i2.value = parseFloat((base ** 2).toFixed(4));
    i3.value = parseFloat((base ** 3).toFixed(4));
});
