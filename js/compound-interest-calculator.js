document.addEventListener('DOMContentLoaded', () => {
    const principalInput = document.getElementById('principal');
    const interestRateInput = document.getElementById('interest-rate');
    const timePeriodInput = document.getElementById('time-period');
    const compoundingFrequencySelect = document.getElementById('compounding-frequency');

    const futureValueSpan = document.getElementById('future-value');
    const principalInvestedSpan = document.getElementById('principal-invested');
    const totalInterestSpan = document.getElementById('total-interest');

    function formatCurrency(value) {
        return value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function calculateCompoundInterest() {
        const p = parseFloat(principalInput.value);
        const annualRate = parseFloat(interestRateInput.value);
        const t = parseFloat(timePeriodInput.value);
        const n = parseFloat(compoundingFrequencySelect.value);

        if (isNaN(p) || isNaN(annualRate) || isNaN(t) || isNaN(n) || p <= 0 || annualRate < 0 || t <= 0) {
            futureValueSpan.textContent = '0.00';
            principalInvestedSpan.textContent = '0.00';
            totalInterestSpan.textContent = '0.00';
            return;
        }

        const r = annualRate / 100; // Annual interest rate as a decimal

        const amount = p * Math.pow((1 + r / n), (n * t));

        if (!isFinite(amount)) {
            futureValueSpan.textContent = '0.00';
            principalInvestedSpan.textContent = '0.00';
            totalInterestSpan.textContent = '0.00';
            return;
        }

        const totalInterest = amount - p;

        futureValueSpan.textContent = formatCurrency(amount);
        principalInvestedSpan.textContent = formatCurrency(p);
        totalInterestSpan.textContent = formatCurrency(totalInterest);
    }

    [principalInput, interestRateInput, timePeriodInput, compoundingFrequencySelect].forEach(el => {
        el.addEventListener('input', calculateCompoundInterest);
    });

    // Initial calculation on page load
    calculateCompoundInterest();
});
