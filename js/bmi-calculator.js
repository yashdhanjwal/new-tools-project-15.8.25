document.addEventListener('DOMContentLoaded', () => {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiResultSpan = document.getElementById('bmi-result');
    const bmiCategorySpan = document.getElementById('bmi-category');
    const metricBtn = document.getElementById('metric-btn');
    const imperialBtn = document.getElementById('imperial-btn');
    const heightGroup = document.getElementById('height-group');
    const weightGroup = document.getElementById('weight-group');

    let currentUnit = 'metric'; // 'metric' or 'imperial'

    function setUnits(unit) {
        currentUnit = unit;
        if (unit === 'metric') {
            metricBtn.classList.add('active');
            imperialBtn.classList.remove('active');
            heightGroup.querySelector('label').textContent = 'Height (cm)';
            heightInput.placeholder = 'e.g., 175';
            weightGroup.querySelector('label').textContent = 'Weight (kg)';
            weightInput.placeholder = 'e.g., 70';
        } else {
            imperialBtn.classList.add('active');
            metricBtn.classList.remove('active');
            heightGroup.querySelector('label').textContent = 'Height (in)';
            heightInput.placeholder = 'e.g., 69';
            weightGroup.querySelector('label').textContent = 'Weight (lbs)';
            weightInput.placeholder = 'e.g., 154';
        }
        calculateBMI();
    }

    metricBtn.addEventListener('click', () => setUnits('metric'));
    imperialBtn.addEventListener('click', () => setUnits('imperial'));

    function getBMICategory(bmi) {
        if (bmi < 18.5) return 'Underweight';
        if (bmi >= 18.5 && bmi <= 24.9) return 'Normal weight';
        if (bmi >= 25 && bmi <= 29.9) return 'Overweight';
        if (bmi >= 30) return 'Obesity';
        return '';
    }

    function calculateBMI() {
        let height = parseFloat(heightInput.value);
        let weight = parseFloat(weightInput.value);

        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            bmiResultSpan.textContent = '0.0';
            bmiCategorySpan.textContent = '';
            return;
        }

        if (currentUnit === 'imperial') {
            // Convert inches to meters and pounds to kg
            height = height * 0.0254; // inches to meters
            weight = weight * 0.453592; // lbs to kg
        } else {
            // Convert cm to meters
            height = height / 100;
        }

        const bmi = weight / (height * height);

        if (isFinite(bmi)) {
            bmiResultSpan.textContent = bmi.toFixed(1);
            bmiCategorySpan.textContent = getBMICategory(bmi);
        } else {
            bmiResultSpan.textContent = '0.0';
            bmiCategorySpan.textContent = '';
        }
    }

    [heightInput, weightInput].forEach(input => {
        input.addEventListener('input', calculateBMI);
    });

    // Initial setup
    setUnits('metric');
});
