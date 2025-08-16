document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const uploadLabel = document.getElementById('upload-label');
    const preview = document.getElementById('preview');
    const optionsArea = document.getElementById('options-area');
    const formatSelect = document.getElementById('format-select');
    const convertBtn = document.getElementById('convert-btn');
    const downloadBtn = document.getElementById('download-btn');

    let originalImage = new Image();
    let originalFilename = '';

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.match('image.*')) {
            alert('Please select a valid image file.');
            return;
        }
        originalFilename = file.name.substring(0, file.name.lastIndexOf('.'));

        const reader = new FileReader();
        reader.onload = (event) => {
            originalImage.src = event.target.result;
            preview.src = event.target.result;

            originalImage.onload = () => {
                preview.style.display = 'block';
                optionsArea.style.display = 'block';
                convertBtn.style.display = 'inline-block';
                uploadLabel.style.display = 'none';
                downloadBtn.style.display = 'none';
            };
        };
        reader.readAsDataURL(file);
    });

    convertBtn.addEventListener('click', () => {
        const format = formatSelect.value;
        const mimeType = `image/${format}`;

        const canvas = document.createElement('canvas');
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        const ctx = canvas.getContext('2d');

        // When converting from a transparent format (like PNG) to a format that doesn't support transparency (like JPG),
        // the background will be black by default. We can draw a white background first to avoid this.
        if (format === 'jpeg') {
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(originalImage, 0, 0);

        const dataUrl = canvas.toDataURL(mimeType, 0.9); // 0.9 quality for JPG/WEBP

        downloadBtn.href = dataUrl;
        downloadBtn.download = `${originalFilename}.${format}`;
        downloadBtn.style.display = 'inline-block';
    });
});
