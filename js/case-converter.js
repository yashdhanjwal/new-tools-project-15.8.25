document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const upperBtn = document.getElementById('upper-btn');
    const lowerBtn = document.getElementById('lower-btn');
    const titleBtn = document.getElementById('title-btn');
    const sentenceBtn = document.getElementById('sentence-btn');
    const copyBtn = document.getElementById('copy-btn');
    const clearBtn = document.getElementById('clear-btn');

    upperBtn.addEventListener('click', () => {
        textInput.value = textInput.value.toUpperCase();
    });

    lowerBtn.addEventListener('click', () => {
        textInput.value = textInput.value.toLowerCase();
    });

    titleBtn.addEventListener('click', () => {
        textInput.value = textInput.value.toLowerCase().split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    });

    sentenceBtn.addEventListener('click', () => {
        textInput.value = textInput.value.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    });

    copyBtn.addEventListener('click', () => {
        textInput.select();
        document.execCommand('copy');
        alert('Text copied to clipboard!');
    });

    clearBtn.addEventListener('click', () => {
        textInput.value = '';
    });
});
