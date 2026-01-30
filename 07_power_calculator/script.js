const base = document.getElementById('base');
const square = document.getElementById('square');
const cube = document.getElementById('cube');
const pow4 = document.getElementById('pow4');
const pow5 = document.getElementById('pow5');

const inputs = {
    base, square, cube, pow4, pow5
};

function updateAll(sourceId, value) {
    if (value === '' || isNaN(value)) {
        // Clear all if empty
        Object.values(inputs).forEach(inp => {
            if (inp.id !== sourceId) inp.value = '';
        });
        return;
    }

    const val = parseFloat(value);
    let x;

    // Calculate base 'x' from the source
    switch (sourceId) {
        case 'base': x = val; break;
        case 'square': x = Math.sqrt(val); break;
        case 'cube': x = Math.cbrt(val); break;
        case 'pow4': x = Math.pow(val, 1 / 4); break;
        case 'pow5': x = Math.pow(val, 1 / 5); break;
    }

    // Update others
    if (sourceId !== 'base') base.value = format(x);
    if (sourceId !== 'square') square.value = format(Math.pow(x, 2));
    if (sourceId !== 'cube') cube.value = format(Math.pow(x, 3));
    if (sourceId !== 'pow4') pow4.value = format(Math.pow(x, 4));
    if (sourceId !== 'pow5') pow5.value = format(Math.pow(x, 5));
}

function format(num) {
    // Avoid floating point errors for clean integers (2.0000000001 -> 2)
    if (Math.abs(Math.round(num) - num) < 0.000001) return Math.round(num);
    return parseFloat(num.toFixed(4));
}

// Add listeners
Object.values(inputs).forEach(input => {
    input.addEventListener('input', (e) => {
        updateAll(e.target.id, e.target.value);
    });
});
