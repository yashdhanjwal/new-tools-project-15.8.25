document.addEventListener('DOMContentLoaded', () => {
    const taxRegimeSelect = document.getElementById('tax-regime');
    const ageGroupSelect = document.getElementById('age-group');
    const grossIncomeInput = document.getElementById('gross-income');
    const deductionsInput = document.getElementById('deductions');
    const deductionsGroup = document.getElementById('deductions-group');

    const taxableIncomeSpan = document.getElementById('taxable-income');
    const incomeTaxSpan = document.getElementById('income-tax');
    const surchargeSpan = document.getElementById('surcharge');
    const cessSpan = document.getElementById('cess');
    const totalTaxSpan = document.getElementById('total-tax');

    function formatCurrency(value) {
        return value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function calculateTax() {
        const regime = taxRegimeSelect.value;
        const age = ageGroupSelect.value;
        const grossIncome = parseFloat(grossIncomeInput.value) || 0;
        const deductions = parseFloat(deductionsInput.value) || 0;

        let taxableIncome = 0;
        let tax = 0;

        if (regime === 'new') {
            // New Regime Logic
            taxableIncome = grossIncome - 50000; // Standard Deduction
            if (taxableIncome < 0) taxableIncome = 0;

            if (taxableIncome <= 700000) {
                tax = 0; // Rebate u/s 87A
            } else {
                if (taxableIncome > 300000) tax += (Math.min(taxableIncome, 600000) - 300000) * 0.05;
                if (taxableIncome > 600000) tax += (Math.min(taxableIncome, 900000) - 600000) * 0.10;
                if (taxableIncome > 900000) tax += (Math.min(taxableIncome, 1200000) - 900000) * 0.15;
                if (taxableIncome > 1200000) tax += (Math.min(taxableIncome, 1500000) - 1200000) * 0.20;
                if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.30;
            }
        } else {
            // Old Regime Logic
            taxableIncome = grossIncome - deductions;
            if (taxableIncome < 0) taxableIncome = 0;

            let exemptionLimit = 250000;
            if (age === '60_to_80') exemptionLimit = 300000;
            if (age === 'above_80') exemptionLimit = 500000;

            if (taxableIncome <= 500000) {
                tax = 0; // Rebate u/s 87A
            } else {
                if (taxableIncome > exemptionLimit) {
                    tax += (Math.min(taxableIncome, 500000) - exemptionLimit) * 0.05;
                }
                if (taxableIncome > 500000) {
                    tax += (Math.min(taxableIncome, 1000000) - 500000) * 0.20;
                }
                if (taxableIncome > 1000000) {
                    tax += (taxableIncome - 1000000) * 0.30;
                }
            }
        }

        if (tax < 0) tax = 0;

        // Surcharge Calculation
        let surcharge = 0;
        if (taxableIncome > 5000000 && taxableIncome <= 10000000) {
            surcharge = tax * 0.10;
        } else if (taxableIncome > 10000000 && taxableIncome <= 20000000) {
            surcharge = tax * 0.15;
        } else if (taxableIncome > 20000000 && taxableIncome <= 50000000) {
            surcharge = tax * 0.25;
        } else if (taxableIncome > 50000000) {
            surcharge = tax * 0.37;
        }

        const taxAndSurcharge = tax + surcharge;
        const cess = taxAndSurcharge * 0.04;
        const totalTax = taxAndSurcharge + cess;

        taxableIncomeSpan.textContent = formatCurrency(taxableIncome);
        incomeTaxSpan.textContent = formatCurrency(tax);
        surchargeSpan.textContent = formatCurrency(surcharge);
        cessSpan.textContent = formatCurrency(cess);
        totalTaxSpan.textContent = formatCurrency(totalTax);
    }

    function toggleInputs() {
        if (taxRegimeSelect.value === 'new') {
            deductionsGroup.style.display = 'none';
            ageGroupSelect.disabled = true;
        } else {
            deductionsGroup.style.display = 'block';
            ageGroupSelect.disabled = false;
        }
        calculateTax();
    }

    [taxRegimeSelect, ageGroupSelect, grossIncomeInput, deductionsInput].forEach(el => {
        el.addEventListener('input', calculateTax);
    });

    taxRegimeSelect.addEventListener('change', toggleInputs);

    // Initial setup
    toggleInputs();
});
