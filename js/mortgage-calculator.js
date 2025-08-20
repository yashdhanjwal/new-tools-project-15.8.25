document.addEventListener('DOMContentLoaded', () => {
    const loanAmountInput = document.getElementById('loan-amount');
    const interestRateInput = document.getElementById('interest-rate');
    const loanTenureInput = document.getElementById('loan-tenure');

    const monthlyPaymentSpan = document.getElementById('monthly-payment');
    const totalInterestSpan = document.getElementById('total-interest');
    const totalCostSpan = document.getElementById('total-cost');
    const amortizationBody = document.getElementById('amortization-body');

    function formatCurrency(value) {
        return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function calculateMortgage() {
        const p = parseFloat(loanAmountInput.value);
        const annualRate = parseFloat(interestRateInput.value);
        const tenureYears = parseFloat(loanTenureInput.value);

        if (isNaN(p) || isNaN(annualRate) || isNaN(tenureYears) || p <= 0 || annualRate <= 0 || tenureYears <= 0) {
            monthlyPaymentSpan.textContent = '0.00';
            totalInterestSpan.textContent = '0.00';
            totalCostSpan.textContent = '0.00';
            amortizationBody.innerHTML = '';
            return;
        }

        const r = annualRate / 12 / 100; // Monthly interest rate
        const n = tenureYears * 12; // Loan tenure in months

        const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        if (!isFinite(emi)) {
            monthlyPaymentSpan.textContent = '0.00';
            totalInterestSpan.textContent = '0.00';
            totalCostSpan.textContent = '0.00';
            amortizationBody.innerHTML = '';
            return;
        }

        const totalCost = emi * n;
        const totalInterest = totalCost - p;

        monthlyPaymentSpan.textContent = formatCurrency(emi);
        totalInterestSpan.textContent = formatCurrency(totalInterest);
        totalCostSpan.textContent = formatCurrency(totalCost);

        // Generate Amortization Schedule
        let balance = p;
        let tableHtml = '';
        for (let i = 1; i <= n; i++) {
            const interestPayment = balance * r;
            const principalPayment = emi - interestPayment;
            balance -= principalPayment;

            tableHtml += `
                <tr>
                    <td>${i}</td>
                    <td>${formatCurrency(principalPayment)}</td>
                    <td>${formatCurrency(interestPayment)}</td>
                    <td>${formatCurrency(balance > 0 ? balance : 0)}</td>
                </tr>
            `;
        }
        amortizationBody.innerHTML = tableHtml;
    }

    [loanAmountInput, interestRateInput, loanTenureInput].forEach(input => {
        input.addEventListener('input', calculateMortgage);
    });

    // Initial calculation on page load
    calculateMortgage();
});
