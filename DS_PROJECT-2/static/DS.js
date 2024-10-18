const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');

// When the user clicks the upload area, trigger the file input dialog
uploadArea.addEventListener('click', () => {
  fileInput.click();
});

// When the user drags a file over the upload area, change its appearance
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.style.backgroundColor = '#f0f0f0';
});

// When the user leaves the drag area, revert the appearance
uploadArea.addEventListener('dragleave', () => {
  uploadArea.style.backgroundColor = '';
});

// When a file is dropped, process it
uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.style.backgroundColor = '';
  const file = e.dataTransfer.files[0];
  uploadFile(file);
});

// When a file is selected via the input dialog, process it
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  uploadFile(file);
});

// Function to upload the file to the server
function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  // Clear previous results
  document.getElementById('result').innerHTML = '';

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      throw new Error(data.error);
    }

    // Display the message
    const message = document.createElement('p');
    message.textContent = data.message;
    document.getElementById('result').appendChild(message);

    // Display the original uploaded image
    const img = document.createElement('img');
    img.src = 'data:image/png;base64,' + data.image;
    document.getElementById('result').appendChild(img);
  })
  .catch(error => {
    console.error('Error:', error);
    const errorMessage = document.createElement('p');
    errorMessage.textContent = error.message;
    document.getElementById('result').appendChild(errorMessage);
  });
}
