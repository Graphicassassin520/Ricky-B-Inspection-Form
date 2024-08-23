// Enable Bootstrap tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

// Form Validation
(function () {
    'use strict';
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
})();

// Progress Indicator and Form Section Navigation
let currentStep = 1;
const totalSteps = document.querySelectorAll('.form-section').length;

function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('formProgress').style.width = `${progress}%`;
}

function nextSection() {
    if (currentStep < totalSteps) {
        if (!validateSection()) return;
        document.querySelector(`.form-section[data-step="${currentStep}"]`).classList.remove('active');
        currentStep++;
        document.querySelector(`.form-section[data-step="${currentStep}"]`).classList.add('active');
        updateProgress();
    }
}

function previousSection() {
    if (currentStep > 1) {
        document.querySelector(`.form-section[data-step="${currentStep}"]`).classList.remove('active');
        currentStep--;
        document.querySelector(`.form-section[data-step="${currentStep}"]`).classList.add('active');
        updateProgress();
    }
}

function validateSection() {
    const currentSection = document.querySelector(`.form-section[data-step="${currentStep}"]`);
    const inputs = currentSection.querySelectorAll('input, textarea, select');
    let valid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add('is-invalid');
            valid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return valid;
}

// Initialize progress bar
updateProgress();
