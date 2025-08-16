document.addEventListener('DOMContentLoaded', () => {
    const { PDFDocument } = PDFLib;

    const fileInput = document.getElementById('file-input');
    const preview = document.getElementById('preview');
    const statusText = document.getElementById('status-text');
    const convertBtn = document.getElementById('convert-btn');
    const downloadBtn = document.getElementById('download-btn');
    const uploadLabel = document.getElementById('upload-label');

    let imageBytes = null;
    let originalFilename = '';

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith('image/jpeg')) {
            statusText.textContent = 'Please select a valid JPG file.';
            imageBytes = null;
            preview.style.display = 'none';
            convertBtn.style.display = 'none';
            downloadBtn.style.display = 'none';
            return;
        }

        originalFilename = file.name.substring(0, file.name.lastIndexOf('.'));
        statusText.textContent = 'Image selected. Ready to convert.';

        const reader = new FileReader();
        reader.onload = (event) => {
            imageBytes = new Uint8Array(event.target.result);
            preview.src = URL.createObjectURL(new Blob([imageBytes], { type: 'image/jpeg' }));
            preview.style.display = 'block';
            convertBtn.style.display = 'inline-block';
            downloadBtn.style.display = 'none';
            uploadLabel.style.display = 'none';
        };
        reader.readAsArrayBuffer(file);
    });

    convertBtn.addEventListener('click', async () => {
        if (!imageBytes) {
            statusText.textContent = 'Something went wrong. Please select an image again.';
            return;
        }

        statusText.textContent = 'Converting to PDF...';
        convertBtn.disabled = true;

        try {
            const pdfDoc = await PDFDocument.create();
            const jpgImage = await pdfDoc.embedJpg(imageBytes);
            const page = pdfDoc.addPage([jpgImage.width, jpgImage.height]);
            page.drawImage(jpgImage, {
                x: 0,
                y: 0,
                width: jpgImage.width,
                height: jpgImage.height,
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });

            downloadBtn.href = URL.createObjectURL(blob);
            downloadBtn.download = `${originalFilename}.pdf`;
            downloadBtn.style.display = 'inline-block';

            statusText.textContent = 'Conversion successful!';
            convertBtn.style.display = 'none';

        } catch (error) {
            console.error('Error converting JPG to PDF:', error);
            statusText.textContent = `An error occurred: ${error.message}`;
        } finally {
            convertBtn.disabled = false;
        }
    });
});
