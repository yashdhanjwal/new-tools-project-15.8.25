document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const uploadLabel = document.getElementById('upload-label');
    const preview = document.getElementById('preview');
    const optionsArea = document.getElementById('options-area');
    const qualitySlider = document.getElementById('quality');
    const qualityValue = document.getElementById('quality-value');
    const originalSizeEl = document.getElementById('original-size');
    const compressedSizeEl = document.getElementById('compressed-size');
    const downloadBtn = document.getElementById('download-btn');

    let originalImage = new Image();
    let originalFileType = 'image/jpeg';
    let originalFilename = '';

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.match('image.*')) {
            alert('Please select a valid image file (JPG or PNG).');
            return;
        }
        originalFileType = file.type;
        originalFilename = file.name.substring(0, file.name.lastIndexOf('.'));

        const reader = new FileReader();
        reader.onload = (event) => {
            originalImage.src = event.target.result;
            preview.src = event.target.result;

            originalImage.onload = () => {
                originalSizeEl.textContent = (file.size / 1024).toFixed(2);
                preview.style.display = 'block';
                optionsArea.style.display = 'block';
                uploadLabel.style.display = 'none';
                downloadBtn.style.display = 'inline-block';
                updateCompression();
            };
        };
        reader.readAsDataURL(file);
    });

    qualitySlider.addEventListener('input', () => {
        qualityValue.textContent = qualitySlider.value;
        updateCompression();
    });

    function updateCompression() {
        const quality = parseFloat(qualitySlider.value);

        const canvas = document.createElement('canvas');
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(originalImage, 0, 0);

        // Always convert to JPEG for compression
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

        // Update compressed size
        const head = 'data:image/jpeg;base64,';
        const compressedSizeBytes = Math.round((compressedDataUrl.length - head.length) * 3 / 4);
        compressedSizeEl.textContent = (compressedSizeBytes / 1024).toFixed(2);

        // Update download link
        downloadBtn.href = compressedDataUrl;
        downloadBtn.download = `${originalFilename}-compressed.jpg`;
    }
});
