document.addEventListener('DOMContentLoaded', () => {
    const currentAgeInput = document.getElementById('current-age');
    const retirementAgeInput = document.getElementById('retirement-age');
    const currentSavingsInput = document.getElementById('current-savings');
    const monthlyContributionInput = document.getElementById('monthly-contribution');
    const interestRateInput = document.getElementById('interest-rate');

    const totalSavingsSpan = document.getElementById('total-savings');
    const totalContributionsSpan = document.getElementById('total-contributions');
    const totalInterestSpan = document.getElementById('total-interest');

    function formatCurrency(value) {
        return value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function calculateRetirementSavings() {
        const currentAge = parseInt(currentAgeInput.value);
        const retirementAge = parseInt(retirementAgeInput.value);
        const currentSavings = parseFloat(currentSavingsInput.value) || 0;
        const monthlyContribution = parseFloat(monthlyContributionInput.value) || 0;
        const annualRate = parseFloat(interestRateInput.value);

        if (isNaN(currentAge) || isNaN(retirementAge) || isNaN(annualRate) || retirementAge <= currentAge || annualRate < 0) {
            totalSavingsSpan.textContent = '0.00';
            totalContributionsSpan.textContent = '0.00';
            totalInterestSpan.textContent = '0.00';
            return;
        }

        const yearsToRetirement = retirementAge - currentAge;
        const n = yearsToRetirement * 12; // Total number of months
        const r = annualRate / 100 / 12; // Monthly interest rate

        // Future value of current savings
        const fvCurrentSavings = currentSavings * Math.pow(1 + r, n);

        // Future value of monthly contributions (annuity)
        const fvContributions = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);

        // Handle case where r is 0
        const totalFutureValue = annualRate === 0
            ? currentSavings + (monthlyContribution * n)
            : fvCurrentSavings + fvContributions;


        if (!isFinite(totalFutureValue)) {
            totalSavingsSpan.textContent = '0.00';
            totalContributionsSpan.textContent = '0.00';
            totalInterestSpan.textContent = '0.00';
            return;
        }

        const totalPrincipal = currentSavings + (monthlyContribution * n);
        const totalInterest = totalFutureValue - totalPrincipal;

        totalSavingsSpan.textContent = formatCurrency(totalFutureValue);
        totalContributionsSpan.textContent = formatCurrency(totalPrincipal);
        totalInterestSpan.textContent = formatCurrency(totalInterest);
    }

    [currentAgeInput, retirementAgeInput, currentSavingsInput, monthlyContributionInput, interestRateInput].forEach(input => {
        input.addEventListener('input', calculateRetirementSavings);
    });

    // Initial calculation on page load
    calculateRetirementSavings();
});
