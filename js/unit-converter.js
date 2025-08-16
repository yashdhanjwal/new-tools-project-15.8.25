document.addEventListener('DOMContentLoaded', () => {

    // Conversion factors to a base unit
    const length_base = 'meters';
    const length_factors = {
        meters: 1,
        kilometers: 1000,
        feet: 0.3048,
        miles: 1609.34,
    };

    const weight_base = 'kilograms';
    const weight_factors = {
        grams: 0.001,
        kilograms: 1,
        pounds: 0.453592,
        ounces: 0.0283495,
    };

    function setupConverter(inputId, fromId, toId, outputId, factors, base_unit) {
        const input = document.getElementById(inputId);
        const from = document.getElementById(fromId);
        const to = document.getElementById(toId);
        const output = document.getElementById(outputId);

        function convert() {
            const fromValue = parseFloat(input.value);
            if (isNaN(fromValue)) {
                output.value = '';
                return;
            }
            const fromUnit = from.value;
            const toUnit = to.value;

            const inBase = fromValue * factors[fromUnit];
            const result = inBase / factors[toUnit];

            output.value = result.toFixed(4);
        }

        [input, from, to].forEach(el => el.addEventListener('input', convert));
    }

    function setupTempConverter() {
        const input = document.getElementById('temp-input');
        const from = document.getElementById('temp-from');
        const to = document.getElementById('temp-to');
        const output = document.getElementById('temp-output');

        function convert() {
            const fromValue = parseFloat(input.value);
            if (isNaN(fromValue)) {
                output.value = '';
                return;
            }
            const fromUnit = from.value;
            const toUnit = to.value;
            let inCelsius;

            // Convert to Celsius first
            if (fromUnit === 'celsius') inCelsius = fromValue;
            else if (fromUnit === 'fahrenheit') inCelsius = (fromValue - 32) * 5 / 9;
            else if (fromUnit === 'kelvin') inCelsius = fromValue - 273.15;

            let result;
            // Convert from Celsius to target
            if (toUnit === 'celsius') result = inCelsius;
            else if (toUnit === 'fahrenheit') result = (inCelsius * 9 / 5) + 32;
            else if (toUnit === 'kelvin') result = inCelsius + 273.15;

            output.value = result.toFixed(2);
        }

        [input, from, to].forEach(el => el.addEventListener('input', convert));
    }

    setupConverter('length-input', 'length-from', 'length-to', 'length-output', length_factors, length_base);
    setupConverter('weight-input', 'weight-from', 'weight-to', 'weight-output', weight_factors, weight_base);
    setupTempConverter();
});
