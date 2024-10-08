document.getElementById('imageUpload').addEventListener('change', function(event) {
  const formData = new FormData();
  formData.append('image', event.target.files[0]);

  fetch('/upload-image', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    // Check if the response is JSON
    if (response.ok) {
      return response.json();
    } else {
      return response.text().then(text => { throw new Error(text); });
    }
  })
  .then(data => {
    console.log('Image uploaded:', data.imagePath);
    // Proceed with the image path or further processing
  })
  .catch(error => {
    console.error('Error uploading image:', error);
  });
});
