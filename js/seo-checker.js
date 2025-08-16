document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('title-input');
    const titleCount = document.getElementById('title-count');
    const titleRec = document.getElementById('title-rec');

    const metaInput = document.getElementById('meta-input');
    const metaCount = document.getElementById('meta-count');
    const metaRec = document.getElementById('meta-rec');

    const TITLE_MAX = 60;
    const META_MAX = 160;

    titleInput.addEventListener('input', () => {
        const count = titleInput.value.length;
        titleCount.textContent = count;
        if (count > TITLE_MAX) {
            titleRec.textContent = '(Too long)';
            titleRec.className = 'recommendation bad';
        } else if (count > 0) {
            titleRec.textContent = '(Good)';
            titleRec.className = 'recommendation good';
        } else {
            titleRec.textContent = '';
        }
    });

    metaInput.addEventListener('input', () => {
        const count = metaInput.value.length;
        metaCount.textContent = count;
        if (count > META_MAX) {
            metaRec.textContent = '(Too long)';
            metaRec.className = 'recommendation bad';
        } else if (count > 0) {
            metaRec.textContent = '(Good)';
            metaRec.className = 'recommendation good';
        } else {
            metaRec.textContent = '';
        }
    });
});
