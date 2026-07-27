(function(){
      const fileInput = document.getElementById('imageInput');
      const pickFileBtn = document.getElementById('pickFileBtn');
      const uploadArea = document.getElementById('uploadArea');
      const generateBtn = document.getElementById('generateBtn');
      const uploadMessage = document.getElementById('uploadMessage');
      const fileName = document.getElementById('fileName');

      pickFileBtn.addEventListener('click', () => fileInput.click());

      function handleFiles(files) {
        if (!files || files.length === 0) return;
        if (files.length > 10) {
          alert('You can upload a maximum of 10 images.');
          // clear the input
          try { fileInput.value = ''; } catch (e) {}
          fileName.textContent = '';
          return;
        }

        // Update visible filename text
        fileName.textContent = files.length > 1 ? `${files.length} files selected` : files[0].name;
        uploadMessage.textContent = '';

        // Create a DataTransfer to assign files to the input (works in modern browsers)
        try {
          const dt = new DataTransfer();
          for (let i = 0; i < files.length; i++) dt.items.add(files[i]);
          fileInput.files = dt.files;
        } catch (e) {
          // If DataTransfer isn't available, just leave the FileList as-is (UI will still show names)
        }
      }

      fileInput.addEventListener('change', () => {
        handleFiles(fileInput.files);
      });

      uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
      });
      uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
      uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const dt = e.dataTransfer;
        if (dt && dt.files && dt.files.length) {
          // Convert FileList to an array and pass to handler
          const files = Array.from(dt.files);
          handleFiles(files);
        }
      });

      generateBtn.addEventListener('click', () => {
        if (!fileInput.files || fileInput.files.length === 0) {
          uploadMessage.textContent = 'Please select an image.';
          uploadMessage.style.color = 'var(--blender)';
          return;
        }
        // Placeholder: start generation flow
        uploadMessage.style.color = 'var(--accent)';
        uploadMessage.textContent = 'Starting 3D model generation...';
        // In a real app, here you'd upload the file to the server or call an API.
      });
    })();
