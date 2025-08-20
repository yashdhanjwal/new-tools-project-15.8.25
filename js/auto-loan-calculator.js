document.addEventListener('DOMContentLoaded', () => {
    const vehiclePriceInput = document.getElementById('vehicle-price');
    const downPaymentInput = document.getElementById('down-payment');
    const interestRateInput = document.getElementById('interest-rate');
    const loanTermInput = document.getElementById('loan-term');

    const monthlyPaymentSpan = document.getElementById('monthly-payment');
    const totalInterestSpan = document.getElementById('total-interest');
    const totalCostSpan = document.getElementById('total-cost');

    function formatCurrency(value) {
        return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function calculateAutoLoan() {
        const vehiclePrice = parseFloat(vehiclePriceInput.value);
        const downPayment = parseFloat(downPaymentInput.value) || 0;
        const annualRate = parseFloat(interestRateInput.value);
        const termMonths = parseFloat(loanTermInput.value);

        const loanAmount = vehiclePrice - downPayment;

        if (isNaN(loanAmount) || isNaN(annualRate) || isNaN(termMonths) || loanAmount <= 0 || annualRate < 0 || termMonths <= 0) {
            monthlyPaymentSpan.textContent = '0.00';
            totalInterestSpan.textContent = '0.00';
            totalCostSpan.textContent = '0.00';
            return;
        }

        const r = annualRate / 12 / 100; // Monthly interest rate
        const n = termMonths;

        // Handle 0% interest rate case
        if (r === 0) {
            const emi = loanAmount / n;
            monthlyPaymentSpan.textContent = formatCurrency(emi);
            totalInterestSpan.textContent = '0.00';
            totalCostSpan.textContent = formatCurrency(loanAmount);
            return;
        }

        const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        if (!isFinite(emi)) {
            monthlyPaymentSpan.textContent = '0.00';
            totalInterestSpan.textContent = '0.00';
            totalCostSpan.textContent = '0.00';
            return;
        }

        const totalCost = emi * n;
        const totalInterest = totalCost - loanAmount;

        monthlyPaymentSpan.textContent = formatCurrency(emi);
        totalInterestSpan.textContent = formatCurrency(totalInterest);
        totalCostSpan.textContent = formatCurrency(totalCost + downPayment);
    }

    [vehiclePriceInput, downPaymentInput, interestRateInput, loanTermInput].forEach(input => {
        input.addEventListener('input', calculateAutoLoan);
    });

    // Initial calculation on page load
    calculateAutoLoan();
});
