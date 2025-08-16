document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const statusText = document.getElementById('status-text');
    const resultsContainer = document.getElementById('results-container');
    const convertBtn = document.getElementById('convert-btn');
    const uploadArea = document.getElementById('upload-label');

    let selectedFile = null;

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file || file.type !== 'application/pdf') {
            statusText.textContent = 'Please select a valid PDF file.';
            selectedFile = null;
            convertBtn.style.display = 'none';
            return;
        }
        selectedFile = file;
        statusText.textContent = `File "${file.name}" selected. Click "Convert" to begin.`;
        convertBtn.style.display = 'inline-block';
        resultsContainer.innerHTML = '';
        uploadArea.style.display = 'none';
    });

    convertBtn.addEventListener('click', async () => {
        if (!selectedFile) {
            statusText.textContent = 'Please select a PDF file first.';
            return;
        }

        resultsContainer.innerHTML = '';
        statusText.textContent = 'Loading PDF...';
        convertBtn.disabled = true;

        try {
            const fileReader = new FileReader();
            fileReader.onload = async (event) => {
                const typedarray = new Uint8Array(event.target.result);
                const pdf = await pdfjsLib.getDocument(typedarray).promise;

                statusText.textContent = `Found ${pdf.numPages} page(s). Starting conversion...`;

                for (let i = 1; i <= pdf.numPages; i++) {
                    statusText.textContent = `Converting page ${i} of ${pdf.numPages}...`;
                    const page = await pdf.getPage(i);

                    const viewport = page.getViewport({ scale: 2.0 });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    await page.render({ canvasContext: context, viewport: viewport }).promise;

                    const jpgUrl = canvas.toDataURL('image/jpeg', 0.9);

                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';

                    const img = document.createElement('img');
                    img.src = jpgUrl;

                    const downloadLink = document.createElement('a');
                    downloadLink.href = jpgUrl;
                    const originalFilename = selectedFile.name.substring(0, selectedFile.name.lastIndexOf('.'));
                    downloadLink.download = `${originalFilename}_page_${i}.jpg`;
                    downloadLink.textContent = `Download Page ${i}`;

                    resultItem.appendChild(img);
                    resultItem.appendChild(downloadLink);
                    resultsContainer.appendChild(resultItem);
                }
                statusText.textContent = 'Conversion complete!';
                convertBtn.style.display = 'none';
            };
            fileReader.readAsArrayBuffer(selectedFile);

        } catch (error) {
            console.error('Error converting PDF:', error);
            statusText.textContent = `An error occurred: ${error.message}`;
        } finally {
            convertBtn.disabled = false;
        }
    });
});
