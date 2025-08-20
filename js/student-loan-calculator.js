document.addEventListener('DOMContentLoaded', () => {
    const loanAmountInput = document.getElementById('loan-amount');
    const interestRateInput = document.getElementById('interest-rate');
    const loanTenureInput = document.getElementById('loan-tenure');

    const monthlyPaymentSpan = document.getElementById('monthly-payment');
    const totalInterestSpan = document.getElementById('total-interest');
    const totalCostSpan = document.getElementById('total-cost');

    function formatCurrency(value) {
        // Using 'en-US' for dollar formatting, can be changed if needed
        return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function calculateStudentLoan() {
        const p = parseFloat(loanAmountInput.value);
        const annualRate = parseFloat(interestRateInput.value);
        const tenureYears = parseFloat(loanTenureInput.value);

        if (isNaN(p) || isNaN(annualRate) || isNaN(tenureYears) || p <= 0 || annualRate < 0 || tenureYears <= 0) {
            monthlyPaymentSpan.textContent = '0.00';
            totalInterestSpan.textContent = '0.00';
            totalCostSpan.textContent = '0.00';
            return;
        }

        const r = annualRate / 12 / 100; // Monthly interest rate
        const n = tenureYears * 12; // Loan tenure in months

        // Handle 0% interest rate case
        if (r === 0) {
            const emi = p / n;
            monthlyPaymentSpan.textContent = formatCurrency(emi);
            totalInterestSpan.textContent = '0.00';
            totalCostSpan.textContent = formatCurrency(p);
            return;
        }

        const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        if (!isFinite(emi)) {
            monthlyPaymentSpan.textContent = '0.00';
            totalInterestSpan.textContent = '0.00';
            totalCostSpan.textContent = '0.00';
            return;
        }

        const totalCost = emi * n;
        const totalInterest = totalCost - p;

        monthlyPaymentSpan.textContent = formatCurrency(emi);
        totalInterestSpan.textContent = formatCurrency(totalInterest);
        totalCostSpan.textContent = formatCurrency(totalCost);
    }

    [loanAmountInput, interestRateInput, loanTenureInput].forEach(input => {
        input.addEventListener('input', calculateStudentLoan);
    });

    // Initial calculation on page load
    calculateStudentLoan();
});
