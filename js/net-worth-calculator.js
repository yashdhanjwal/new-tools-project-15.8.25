document.addEventListener('DOMContentLoaded', () => {
    const assetInputs = document.querySelectorAll('.asset-input');
    const liabilityInputs = document.querySelectorAll('.liability-input');

    const totalAssetsSpan = document.getElementById('total-assets');
    const totalLiabilitiesSpan = document.getElementById('total-liabilities');
    const netWorthResultSpan = document.getElementById('net-worth-result');

    function formatCurrency(value) {
        return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function calculateNetWorth() {
        let totalAssets = 0;
        assetInputs.forEach(input => {
            totalAssets += parseFloat(input.value) || 0;
        });

        let totalLiabilities = 0;
        liabilityInputs.forEach(input => {
            totalLiabilities += parseFloat(input.value) || 0;
        });

        const netWorth = totalAssets - totalLiabilities;

        totalAssetsSpan.textContent = formatCurrency(totalAssets);
        totalLiabilitiesSpan.textContent = formatCurrency(totalLiabilities);
        netWorthResultSpan.textContent = formatCurrency(netWorth);
    }

    const allInputs = [...assetInputs, ...liabilityInputs];
    allInputs.forEach(input => {
        input.addEventListener('input', calculateNetWorth);
    });

    // Initial calculation on page load
    calculateNetWorth();
});
