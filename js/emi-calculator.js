document.addEventListener('DOMContentLoaded', () => {
    const loanAmountInput = document.getElementById('loan-amount');
    const interestRateInput = document.getElementById('interest-rate');
    const loanTenureInput = document.getElementById('loan-tenure');
    const emiResult = document.getElementById('emi-result');

    function calculateEMI() {
        const p = parseFloat(loanAmountInput.value);
        const annualRate = parseFloat(interestRateInput.value);
        const tenureYears = parseFloat(loanTenureInput.value);

        if (isNaN(p) || isNaN(annualRate) || isNaN(tenureYears) || p <= 0 || annualRate <= 0 || tenureYears <= 0) {
            emiResult.textContent = '0.00';
            return;
        }

        const r = annualRate / 12 / 100; // Monthly interest rate
        const n = tenureYears * 12; // Loan tenure in months

        const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        if (isFinite(emi)) {
            emiResult.textContent = emi.toFixed(2);
        } else {
            emiResult.textContent = '0.00';
        }
    }

    [loanAmountInput, interestRateInput, loanTenureInput].forEach(input => {
        input.addEventListener('input', calculateEMI);
    });
});
