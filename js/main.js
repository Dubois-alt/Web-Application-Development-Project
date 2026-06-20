// ============================================
// MENU CATEGORY FILTER
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  
  if (filterButtons.length === 0) return;

  
  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {

      
      filterButtons.forEach(function (btn) {
        btn.classList.remove('active', 'btn-dark');
        btn.classList.add('btn-outline-dark');
      });
      button.classList.add('active', 'btn-dark');
      button.classList.remove('btn-outline-dark');

      
      const selectedCategory = button.getAttribute('data-filter');

            menuItems.forEach(function (item) {
        const itemCategory = item.getAttribute('data-category');

        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

    });
  });

});
// ============================================
// DARK / LIGHT MODE TOGGLE
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  const themeToggle = document.getElementById('themeToggle');

  if (!themeToggle) return;

  themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      themeToggle.textContent = '☀️';
    } else {
      themeToggle.textContent = '🌙';
    }
  });

});

// ============================================
// STAR RATING PICKER (Reviews page)
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  const starRating = document.getElementById('starRating');
  if (!starRating) return; // only run this on the reviews page

  const stars = starRating.querySelectorAll('.star');
  const ratingInput = document.getElementById('ratingValue');

  stars.forEach(function (star) {
    star.addEventListener('click', function () {
      const value = parseInt(star.getAttribute('data-value'));
      ratingInput.value = value;

      // Fill in stars up to the clicked one, empty the rest
      stars.forEach(function (s) {
        const sValue = parseInt(s.getAttribute('data-value'));
        s.textContent = sValue <= value ? '★' : '☆';
      });
    });
  });

});


// ============================================
// REVIEW FORM VALIDATION
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  const reviewForm = document.getElementById('reviewForm');
  if (!reviewForm) return; // only run this on the reviews page

  reviewForm.addEventListener('submit', function (event) {
    event.preventDefault(); // stop the page from reloading

    const nameInput = document.getElementById('reviewerName');
    const textInput = document.getElementById('reviewText');
    const ratingInput = document.getElementById('ratingValue');
    const ratingError = document.getElementById('ratingError');
    const successMessage = document.getElementById('reviewSuccess');

    let isValid = true;

    // Validate name
    if (nameInput.value.trim().length < 2) {
      nameInput.classList.add('is-invalid');
      isValid = false;
    } else {
      nameInput.classList.remove('is-invalid');
    }

    // Validate review text
    if (textInput.value.trim().length < 10) {
      textInput.classList.add('is-invalid');
      isValid = false;
    } else {
      textInput.classList.remove('is-invalid');
    }

    // Validate star rating
    if (parseInt(ratingInput.value) === 0) {
      ratingError.style.display = 'block';
      isValid = false;
    } else {
      ratingError.style.display = 'none';
    }

    // If everything passed, show success message and reset the form
    if (isValid) {
      successMessage.style.display = 'block';
      reviewForm.reset();

      // Reset stars visually back to empty
      document.querySelectorAll('#starRating .star').forEach(function (s) {
        s.textContent = '☆';
      });
      ratingInput.value = 0;

      // Hide the success message after a few seconds
      setTimeout(function () {
        successMessage.style.display = 'none';
      }, 4000);
    }
  });

});