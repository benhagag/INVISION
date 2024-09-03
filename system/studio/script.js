document.addEventListener('DOMContentLoaded', function() {
    const platformButtons = document.querySelectorAll('.platform-btn');
    const autoPathLink = document.getElementById('auto-path');
    const guidedPathLink = document.getElementById('guided-path');
    const autoPathSection = document.getElementById('auto-path-section');
    const guidedPathSection = document.getElementById('guided-path-section');
    const imageDesignButton = document.querySelector('[data-platform="image-design"]');
    const imageDesignSection = document.getElementById('image-design-section');

    // Platform button hover effects
    platformButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-menu').style.display = 'block';
        });

        button.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-menu').style.display = 'none';
        });
    });

    // Auto path, Guided path, and Image design section toggle
    autoPathLink.addEventListener('click', function(e) {
        e.preventDefault();
        autoPathSection.style.display = 'block';
        guidedPathSection.style.display = 'none';
        imageDesignSection.style.display = 'none';
        updateActiveButton(this);
    });

    guidedPathLink.addEventListener('click', function(e) {
        e.preventDefault();
        guidedPathSection.style.display = 'block';
        autoPathSection.style.display = 'none';
        imageDesignSection.style.display = 'none';
        updateActiveButton(this);
    });

    imageDesignButton.addEventListener('click', function() {
        guidedPathSection.style.display = 'none';
        autoPathSection.style.display = 'none';
        imageDesignSection.style.display = 'block';
        updateActiveButton(this);
    });

    function updateActiveButton(clickedButton) {
        document.querySelectorAll('.platform-btn').forEach(btn => btn.classList.remove('active'));
        clickedButton.closest('.platform-btn').classList.add('active');
    }

    // Guided path navigation with next buttons
    const guidedButtons = document.querySelectorAll('.guided-btn');
    const guidedContentItems = document.querySelectorAll('.guided-content-item');
    const guidedNextButtons = document.querySelectorAll('#guided-path-section .next-step-btn');

    guidedButtons.forEach(button => {
        button.addEventListener('click', function() {
            const step = this.dataset.step;
            guidedContentItems.forEach(item => item.classList.add('hidden'));
            document.getElementById(step).classList.remove('hidden');
            updateActiveStep(this, guidedButtons);
        });
    });

    guidedNextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = document.querySelector('#guided-path-section .guided-content-item:not(.hidden)');
            const nextStepId = currentStep.nextElementSibling.id;
            currentStep.classList.add('hidden');
            document.getElementById(nextStepId).classList.remove('hidden');
            updateActiveStep(document.querySelector(`.guided-btn[data-step="${nextStepId}"]`), guidedButtons);
        });
    });

    // Auto path navigation with next buttons
    const autoButtons = document.querySelectorAll('.auto-btn');
    const autoContentItems = document.querySelectorAll('.auto-content-item');
    const autoNextButtons = document.querySelectorAll('#auto-path-section .next-step-btn');

    autoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const step = this.dataset.step;
            autoContentItems.forEach(item => item.classList.add('hidden'));
            document.getElementById(step).classList.remove('hidden');
            updateActiveStep(this, autoButtons);
        });
    });

    autoNextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = document.querySelector('#auto-path-section .auto-content-item:not(.hidden)');
            const nextStepId = currentStep.nextElementSibling.id;
            currentStep.classList.add('hidden');
            document.getElementById(nextStepId).classList.remove('hidden');
            updateActiveStep(document.querySelector(`.auto-btn[data-step="${nextStepId}"]`), autoButtons);
        });
    });

    // Image design navigation with next buttons
    const imageButtons = document.querySelectorAll('.image-btn');
    const imageContentItems = document.querySelectorAll('.image-content-item');
    const imageNextButtons = document.querySelectorAll('#image-design-section .next-step-btn');

    imageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const step = this.dataset.step;
            imageContentItems.forEach(item => item.classList.add('hidden'));
            document.getElementById(step).classList.remove('hidden');
            updateActiveStep(this, imageButtons);
        });
    });

    imageNextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = document.querySelector('#image-design-section .image-content-item:not(.hidden)');
            const nextStepId = currentStep.nextElementSibling.id;
            currentStep.classList.add('hidden');
            document.getElementById(nextStepId).classList.remove('hidden');
            updateActiveStep(document.querySelector(`.image-btn[data-step="${nextStepId}"]`), imageButtons);
        });
    });
    function updateActiveStep(clickedButton, buttonGroup) {
        buttonGroup.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
    }

    // Template selection
    const templateBoxes = document.querySelectorAll('.template-box');
    templateBoxes.forEach(box => {
        box.addEventListener('click', function() {
            templateBoxes.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Template filter
    const filterBtn = document.getElementById('filter-btn');
    const templateFilter = document.getElementById('template-filter');

    filterBtn.addEventListener('click', function() {
        const filterText = templateFilter.value.toLowerCase();
        templateBoxes.forEach(box => {
            const boxText = box.textContent.toLowerCase();
            if (boxText.includes(filterText)) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    });

    // AI suggestion button for text in guided path
    const aiSuggestionBtn = document.getElementById('ai-suggestion-btn');
    const textarea = document.getElementById('auto-resize-textarea');

    aiSuggestionBtn.addEventListener('click', function() {
        const userPrompt = prompt('תאר לי באיזה נושא ומה היית רוצה שאכתוב בשבילך:');
        if (userPrompt) {
            // Simulate system filling in the content
            textarea.value = `תוכן שיווקי מקצועי בנושא: ${userPrompt}\n\nכאן יופיע התוכן המוצע על ידי המערכת...`;
            autoResizeTextarea(textarea); // Adjust textarea height after content is set
        }
    });

    // AI suggestion button for text in image design path
    const imageAiSuggestionBtn = document.getElementById('image-ai-suggestion-btn');
    const imageTextarea = document.getElementById('image-textarea');

    imageAiSuggestionBtn.addEventListener('click', function() {
        const userPrompt = prompt('באיזה נושא תרצה שהטקסט יעסוק?');
        if (userPrompt) {
            imageTextarea.value = `תוכן לתמונה בנושא: ${userPrompt}\n\nכאן יופיע התוכן המוצע על ידי המערכת...`;
            autoResizeTextarea(imageTextarea); // Adjust textarea height after content is set
        }
    });

    // Auto-resize textarea for text
    function autoResizeTextarea(textarea) {
        textarea.style.height = 'auto'; // Reset height
        textarea.style.height = textarea.scrollHeight + 'px'; // Set height to fit content
    }

    textarea.addEventListener('input', function() {
        autoResizeTextarea(textarea);
    });

    imageTextarea.addEventListener('input', function() {
        autoResizeTextarea(imageTextarea);
    });

    // Initial call to resize based on initial content
    autoResizeTextarea(textarea);
    autoResizeTextarea(imageTextarea);

    // File upload preview
    const fileUpload = document.getElementById('file-upload');
    const autoFileUpload = document.getElementById('auto-file-upload');
    const imageFileUpload = document.getElementById('image-file-upload');
    const fileOrder = document.querySelector('.file-order');

    function handleFileUpload(event) {
        const files = event.target.files;
        fileOrder.innerHTML = '';

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const filePreview = document.createElement('div');
            filePreview.classList.add('file-preview');
            filePreview.textContent = file.name;
            fileOrder.appendChild(filePreview);
        }
    }

    fileUpload.addEventListener('change', handleFileUpload);
    autoFileUpload.addEventListener('change', handleFileUpload);
    imageFileUpload.addEventListener('change', handleFileUpload);

    // Create video button (Auto path)
    const createVideoBtn = document.querySelector('.create-video-btn');
    createVideoBtn.addEventListener('click', function() {
        this.textContent = 'יוצר סרטון...';
        this.disabled = true;

        setTimeout(() => {
            this.textContent = 'צור סרטון';
            this.disabled = false;
            document.getElementById('auto-preview').classList.remove('hidden');
            document.getElementById('media-upload').classList.add('hidden');
            updateActiveStep(document.querySelector('.auto-btn[data-step="auto-preview"]'), autoButtons);
        }, 2000);
    });

    // Create image button (Image design path)
    const createImageBtn = document.querySelector('.create-image-btn');
    createImageBtn.addEventListener('click', function() {
        this.textContent = 'יוצר תמונה...';
        this.disabled = true;

        setTimeout(() => {
            this.textContent = 'צור תמונה';
            this.disabled = false;
            document.getElementById('image-preview').classList.remove('hidden');
            document.getElementById('image-preparation').classList.add('hidden');
            updateActiveStep(document.querySelector('.image-btn[data-step="image-preview"]'), imageButtons);
        }, 2000);
    });

    // Preview section gallery
    const previewSection = document.querySelector('.preview-section');
    const carouselWrapper = previewSection.querySelector('.carousel-wrapper');
    const arrowLeft = previewSection.querySelector('.arrow-btn.left');
    const arrowRight = previewSection.querySelector('.arrow-btn.right');
    const previewContainers = carouselWrapper.querySelectorAll('.preview-container');

    let currentPreviewIndex = 0;

    function updatePreviewVisibility() {
        const containerWidth = previewContainers[0].offsetWidth; // גודל של כל קונטיינר
        const offset = -(currentPreviewIndex * containerWidth); // היסט לפי גודל כל קונטיינר
        carouselWrapper.style.transform = `translateX(${offset}px)`; // טרנספורמציה לפי פיקסלים
    }

    arrowLeft.addEventListener('click', () => {
        if (currentPreviewIndex > 0) {
            currentPreviewIndex--;
        } else {
            currentPreviewIndex = previewContainers.length - 3; // 3 תמונות מוצגות
        }
        updatePreviewVisibility();
    });

    arrowRight.addEventListener('click', () => {
        if (currentPreviewIndex < previewContainers.length - 3) {
            currentPreviewIndex++;
        } else {
            currentPreviewIndex = 0;
        }
        updatePreviewVisibility();
    });

    updatePreviewVisibility();

    // Image selection in preview
    previewContainers.forEach((container) => {
        container.addEventListener('click', function() {
            previewContainers.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Continue button in auto preview
    const continueBtn = document.querySelector('.continue-btn');
    continueBtn.addEventListener('click', () => {
        const additionalImprovements = document.querySelector('.additional-improvements').value;
        // Here you would typically send the additionalImprovements to your backend or process it
        console.log('Additional improvements:', additionalImprovements);

        document.getElementById('auto-preview').classList.add('hidden');
        document.getElementById('auto-finish').classList.remove('hidden');
        updateActiveStep(document.querySelector('.auto-btn[data-step="auto-finish"]'), autoButtons);
    });

    // Save and continue button in image preview
    const saveAndContinueBtn = document.querySelector('.save-and-continue-btn');
    saveAndContinueBtn.addEventListener('click', () => {
        const additionalImprovements = document.querySelector('.additional-improvements').value;
        // Here you would typically send the additionalImprovements to your backend or process it
        console.log('Additional improvements:', additionalImprovements);

        document.getElementById('image-preview').classList.add('hidden');
        document.getElementById('image-finish').classList.remove('hidden');
        updateActiveStep(document.querySelector('.image-btn[data-step="image-finish"]'), imageButtons);
    });
});