document.addEventListener('DOMContentLoaded', () => {
    const { PDFDocument, degrees } = PDFLib;

    const fileInput = document.getElementById('file-input');
    const uploadLabel = document.getElementById('upload-label');
    const optionsArea = document.getElementById('options-area');
    const filenameEl = document.getElementById('filename');
    const rotateBtn = document.getElementById('rotate-btn');
    const downloadBtn = document.getElementById('download-btn');

    let selectedFile = null;

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file || file.type !== 'application/pdf') {
            alert('Please select a valid PDF file.');
            return;
        }
        selectedFile = file;
        filenameEl.textContent = file.name;
        optionsArea.style.display = 'block';
        rotateBtn.style.display = 'inline-block';
        downloadBtn.style.display = 'none';
        uploadLabel.style.display = 'none';
    });

    rotateBtn.addEventListener('click', async () => {
        if (!selectedFile) {
            alert('Please select a file first.');
            return;
        }

        rotateBtn.disabled = true;
        rotateBtn.textContent = 'Rotating...';

        try {
            const existingPdfBytes = await selectedFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const pages = pdfDoc.getPages();

            const rotationAngle = parseInt(document.querySelector('input[name="rotation"]:checked').value, 10);

            pages.forEach(page => {
                const currentRotation = page.getRotation().angle;
                page.setRotation(degrees(currentRotation + rotationAngle));
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });

            downloadBtn.href = URL.createObjectURL(blob);
            const originalFilename = selectedFile.name.substring(0, selectedFile.name.lastIndexOf('.'));
            downloadBtn.download = `${originalFilename}-rotated.pdf`;
            downloadBtn.style.display = 'inline-block';
            rotateBtn.style.display = 'none';

        } catch (error) {
            console.error('Error rotating PDF:', error);
            alert(`An error occurred: ${error.message}`);
        } finally {
            rotateBtn.disabled = false;
            rotateBtn.textContent = 'Rotate PDF';
        }
    });
});
