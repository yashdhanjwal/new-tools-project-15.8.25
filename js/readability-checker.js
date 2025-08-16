document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const checkBtn = document.getElementById('check-btn');
    const resultsArea = document.getElementById('results-area');

    const scoreEl = document.getElementById('score');
    const gradeLevelEl = document.getElementById('grade-level');
    const wordCountEl = document.getElementById('word-count');
    const sentenceCountEl = document.getElementById('sentence-count');

    function countWords(text) {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    }

    function countSentences(text) {
        const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
        return sentences ? sentences.length : 0;
    }

    function countSyllables(word) {
        word = word.toLowerCase();
        if (word.length <= 3) { return 1; }
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        const syllables = word.match(/[aeiouy]{1,2}/g);
        return syllables ? syllables.length : 0;
    }

    function totalSyllables(text) {
        const words = text.trim().toLowerCase().split(/\s+/);
        return words.reduce((acc, word) => acc + countSyllables(word), 0);
    }

    checkBtn.addEventListener('click', () => {
        const text = textInput.value;
        if (text.trim().length === 0) {
            alert('Please enter some text to check.');
            return;
        }

        const words = countWords(text);
        const sentences = countSentences(text);
        const syllables = totalSyllables(text);

        if (words === 0 || sentences === 0) {
            alert('Not enough text to calculate a score.');
            return;
        }

        // Flesch Reading Ease formula
        const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);

        // Flesch-Kincaid Grade Level formula
        const gradeLevel = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;

        wordCountEl.textContent = words;
        sentenceCountEl.textContent = sentences;
        scoreEl.textContent = score.toFixed(2);
        gradeLevelEl.textContent = gradeLevel.toFixed(2);

        resultsArea.style.display = 'grid';
    });
});
