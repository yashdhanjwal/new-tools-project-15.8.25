document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const uploadLabel = document.getElementById('upload-label');
    const preview = document.getElementById('preview');
    const optionsArea = document.getElementById('options-area');
    const originalDimsEl = document.getElementById('original-dims');
    const widthInput = document.getElementById('width-input');
    const heightInput = document.getElementById('height-input');
    const aspectRatioCheck = document.getElementById('aspect-ratio');
    const resizeBtn = document.getElementById('resize-btn');
    const downloadBtn = document.getElementById('download-btn');

    let originalImage = new Image();
    let originalAspectRatio = 1;
    let originalFileType = 'image/png';
    let originalFilename = '';

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.match('image.*')) {
            alert('Please select a valid image file.');
            return;
        }
        originalFileType = file.type;
        originalFilename = file.name.substring(0, file.name.lastIndexOf('.'));

        const reader = new FileReader();
        reader.onload = (event) => {
            originalImage.src = event.target.result;
            preview.src = event.target.result;

            originalImage.onload = () => {
                originalDimsEl.textContent = `${originalImage.width} x ${originalImage.height}`;
                widthInput.value = originalImage.width;
                heightInput.value = originalImage.height;
                originalAspectRatio = originalImage.width / originalImage.height;

                preview.style.display = 'block';
                optionsArea.style.display = 'block';
                resizeBtn.style.display = 'inline-block';
                uploadLabel.style.display = 'none';
                downloadBtn.style.display = 'none';
            };
        };
        reader.readAsDataURL(file);
    });

    widthInput.addEventListener('input', () => {
        if (aspectRatioCheck.checked) {
            heightInput.value = Math.round(widthInput.value / originalAspectRatio);
        }
    });

    heightInput.addEventListener('input', () => {
        if (aspectRatioCheck.checked) {
            widthInput.value = Math.round(heightInput.value * originalAspectRatio);
        }
    });

    resizeBtn.addEventListener('click', () => {
        const width = parseInt(widthInput.value, 10);
        const height = parseInt(heightInput.value, 10);

        if (!width || !height || width <= 0 || height <= 0) {
            alert('Please enter valid width and height.');
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(originalImage, 0, 0, width, height);

        const resizedDataUrl = canvas.toDataURL(originalFileType);

        downloadBtn.href = resizedDataUrl;
        const extension = originalFileType.split('/')[1];
        downloadBtn.download = `${originalFilename}-resized.${extension}`;
        downloadBtn.style.display = 'inline-block';
    });
});
