// contact-form.js
// Minimal safe handler to prevent 404 and provide basic UI feedback.
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const feedbackDiv = document.querySelector('.form-feedback');
    if (feedbackDiv) {
      feedbackDiv.style.display = 'block';
      feedbackDiv.innerHTML = '<div class="alert alert-success">Thank you! Your message has been received (demo).</div>';
    }

    // Optionally clear the form (uncomment if desired)
    // contactForm.reset();

    // In a real deployment, replace this with a fetch() or XHR to your backend/email service.
  });
});
