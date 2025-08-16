document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const wordCountEl = document.getElementById('word-count');
    const charCountEl = document.getElementById('char-count');
    const sentenceCountEl = document.getElementById('sentence-count');
    const paragraphCountEl = document.getElementById('paragraph-count');

    textInput.addEventListener('input', () => {
        const text = textInput.value;

        // Character count
        const charCount = text.length;
        charCountEl.textContent = charCount;

        // Word count
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;
        wordCountEl.textContent = wordCount;

        // Sentence count
        const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
        const sentenceCount = sentences ? sentences.length : 0;
        sentenceCountEl.textContent = sentenceCount;

        // Paragraph count
        const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
        const paragraphCount = paragraphs.length;
        paragraphCountEl.textContent = paragraphCount;
    });
});
