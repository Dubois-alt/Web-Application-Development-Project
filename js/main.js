/*==================================================
  BARCELONA HOUSE — main.js
  All JavaScript for the entire site lives here.

  SECTIONS:
  1. Global Constants
  2. Reusable Helper Functions
  3. Menu & Blog Filters
  4. Dark Mode Toggle
  5. Gallery Page — Hover Background Swap
  6. Contact Page — Form Validation
  7. Reservations Page — Form Validation
  8. Mug Club — Signup & Members List
  9. Reviews Page — Star Rating & Review Form
==================================================*/


/*==================================================
  1. GLOBAL CONSTANTS
==================================================*/

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


/*==================================================
  2. REUSABLE HELPER FUNCTIONS
  These are used by multiple pages and forms.
  Written once here, called anywhere below.
==================================================*/

/**
 * Validates a single input field against a set of rules.
 * Adds Bootstrap's "is-invalid" class if it fails,
 * removes it if it passes.
 *
 * @param {HTMLElement} input  - The input element to check
 * @param {Object}      rules  - { required, minLength, pattern }
 * @returns {boolean}          - true if valid, false if not
 */
function validateField(input, rules) {
  const value = input.value.trim();
  let isValid = true;

  if (rules.required && value.length === 0) {
    isValid = false;
  }

  if (rules.minLength && value.length < rules.minLength) {
    isValid = false;
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    isValid = false;
  }

  if (isValid) {
    input.classList.remove('is-invalid');
  } else {
    input.classList.add('is-invalid');
  }

  return isValid;
}

/**
 * Wires up form validation for any form on the site.
 * Checks every field listed in fieldRules on submit.
 * Only calls onSuccess() if every field passes.
 *
 * @param {string}   formId      - The id of the <form> element
 * @param {Object}   fieldRules  - { fieldId: { required, minLength, pattern } }
 * @param {Function} onSuccess   - Callback to run when all fields are valid
 */
function setupFormValidation(formId, fieldRules, onSuccess) {
  const form = document.getElementById(formId);
  if (!form) return; // this form isn't on the current page

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let formIsValid = true;

    for (const fieldId in fieldRules) {
      const input = document.getElementById(fieldId);
      const fieldIsValid = validateField(input, fieldRules[fieldId]);
      if (!fieldIsValid) {
        formIsValid = false;
      }
    }

    if (formIsValid) {
      onSuccess(form);
    }
  });
}

/**
 * Shows a success alert element, then hides it after a delay.
 *
 * @param {string} elementId  - The id of the alert <div>
 * @param {number} duration   - How long to show it in ms (default 4000)
 */
function showSuccessMessage(elementId, duration = 4000) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.style.display = 'block';
  setTimeout(function () {
    el.style.display = 'none';
  }, duration);
}

/**
 * Sets up a category filter for a grid of items.
 * Works on both the menu page and the blog page.
 *
 * @param {string} buttonContainerId  - The id of the div wrapping the filter buttons
 * @param {string} itemClass          - The class on each filterable item (e.g. "menu-item")
 */
function setupFilter(buttonContainerId, itemClass) {
  const container = document.getElementById(buttonContainerId);
  if (!container) return; // this filter isn't on the current page

  const filterButtons = container.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.' + itemClass);

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {

      // Reset all buttons to outline style, then activate the clicked one
      filterButtons.forEach(function (btn) {
        btn.classList.remove('active', 'btn-dark');
        btn.classList.add('btn-outline-dark');
      });
      button.classList.add('active', 'btn-dark');
      button.classList.remove('btn-outline-dark');

      const selectedCategory = button.getAttribute('data-filter');

      // Show items that match the selected category, hide the rest
      items.forEach(function (item) {
        const itemCategory = item.getAttribute('data-category');
        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

    });
  });
}


/*==================================================
  3. MENU & BLOG FILTERS
  Calls the reusable setupFilter() for both pages.
  Safe to run on every page — returns early if
  the relevant container id isn't found.
==================================================*/

document.addEventListener('DOMContentLoaded', function () {
  setupFilter('filterButtons', 'menu-item');      // menu.html
  setupFilter('blogFilterButtons', 'blog-item');  // blog.html
});


/*==================================================
  4. DARK MODE TOGGLE
  Toggles "dark-mode" class on <body>.
  CSS in style.css handles the visual changes.
  The button icon switches between 🌙 and ☀️.
==================================================*/

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


/*==================================================
  5. GALLERY PAGE — IMAGE HOVER EFFECT
  Adds a smooth scale-up effect when hovering
  over any gallery thumbnail image.
  The page background does not change.
==================================================*/

document.addEventListener('DOMContentLoaded', function () {

  const galleryThumbs = document.querySelectorAll('.gallery-row-img');
  if (galleryThumbs.length === 0) return; // only run on gallery.html

  galleryThumbs.forEach(function (img) {
    img.addEventListener('mouseenter', function () {
      img.style.transform = 'scale(1.05)';
      img.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.5)';
    });

    img.addEventListener('mouseleave', function () {
      img.style.transform = 'scale(1)';
      img.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
    });
  });

});

/*==================================================
  6. CONTACT PAGE — FORM VALIDATION
  Validates: name (min 2 chars), email (pattern),
  message (min 10 chars).
  Shows a success alert on valid submission.
==================================================*/

document.addEventListener('DOMContentLoaded', function () {

  setupFormValidation('contactForm', {
    contactName:    { required: true, minLength: 2 },
    contactEmail:   { required: true, pattern: EMAIL_PATTERN },
    contactMessage: { required: true, minLength: 10 }
  }, function (form) {
    showSuccessMessage('contactSuccess');
    form.reset();
  });

});


/*==================================================
  7. RESERVATIONS PAGE — FORM VALIDATION
  Validates: name, email, phone, date, time, guests.
  Special requests (resNotes) are optional — not
  included in validation rules.
==================================================*/

document.addEventListener('DOMContentLoaded', function () {

  setupFormValidation('reservationForm', {
    resName:   { required: true, minLength: 2 },
    resEmail:  { required: true, pattern: EMAIL_PATTERN },
    resPhone:  { required: true, minLength: 7 },
    resDate:   { required: true },
    resTime:   { required: true },
    resGuests: { required: true }
  }, function (form) {
    showSuccessMessage('reservationSuccess');
    form.reset();
  });

});


/*==================================================
  8. MUG CLUB — SIGNUP & LIVE MEMBERS LIST
  Validates name + email, saves each new member
  to localStorage, and immediately adds their name
  to the visible members list with a member number.
  Previously saved members reload on page visit.
==================================================*/

document.addEventListener('DOMContentLoaded', function () {

  const mugClubForm = document.getElementById('mugClubForm');
  if (!mugClubForm) return; // only run on blog.html

  const membersList = document.getElementById('membersList');

  // Load any previously saved members from localStorage
  let members = JSON.parse(localStorage.getItem('mugClubMembers')) || [];

  members.forEach(function (member) {
    addMemberToList(member.name, member.number, false);
  });

  // Validate and process new signup
  setupFormValidation('mugClubForm', {
    mugClubName:  { required: true, minLength: 2 },
    mugClubEmail: { required: true, pattern: EMAIL_PATTERN }
  }, function (form) {

    const memberNumber = members.length + 1;
    const memberName = document.getElementById('mugClubName').value.trim();

    // Save to localStorage
    members.push({ name: memberName, number: memberNumber });
    localStorage.setItem('mugClubMembers', JSON.stringify(members));

    // Show in the members list immediately
    addMemberToList(memberName, memberNumber, true);

    showSuccessMessage('mugClubSuccess');
    form.reset();
  });

  /**
   * Creates and inserts a member list item into the <ul>.
   * New members appear at the top; loaded members append to bottom.
   */
  function addMemberToList(name, number, isNew) {
    const listItem = document.createElement('li');
    listItem.className = 'mb-2 pb-2 border-bottom';
    listItem.innerHTML = `<strong>${name}</strong> <span class="text-muted small">— Mug Club Member #${number}</span>`;

    if (isNew) {
      membersList.prepend(listItem);
    } else {
      membersList.appendChild(listItem);
    }
  }

});


/*==================================================
  9. REVIEWS PAGE — STAR RATING & REVIEW FORM
  Handles:
  - Clickable star rating (1–5 stars)
  - Form validation for name + review text
  - Saving new reviews to localStorage
  - Dynamically building and inserting review cards
  - Recalculating the average rating summary
  Note: star rating is a custom input, so it gets
  its own validation check alongside the shared one.
==================================================*/

document.addEventListener('DOMContentLoaded', function () {

  const reviewForm = document.getElementById('reviewForm');
  if (!reviewForm) return; // only run on reviews.html

  const ratingInput = document.getElementById('ratingValue');
  const ratingError = document.getElementById('ratingError');
  const reviewsGrid = document.getElementById('reviewsGrid');
  const stars = document.querySelectorAll('#starRating .star');

  // Load saved reviews from localStorage
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

  reviews.forEach(function (review) {
    createReviewCard(review, false);
  });

  updateSummary();

  // ── Star rating click handler ──
  stars.forEach(function (star) {
    star.addEventListener('click', function () {
      const value = parseInt(this.dataset.value);
      ratingInput.value = value;

      // Fill stars up to the clicked value, empty the rest
      stars.forEach(function (s) {
        s.textContent = parseInt(s.dataset.value) <= value ? '★' : '☆';
      });

      ratingError.style.display = 'none';
    });
  });

  // ── Form submission ──
  setupFormValidation('reviewForm', {
    reviewerName: { required: true, minLength: 2 },
    reviewText:   { required: true, minLength: 10 }
  }, function (form) {

    // Star rating needs its own check (not a standard input)
    const ratingValid = Number(ratingInput.value) > 0;
    ratingError.style.display = ratingValid ? 'none' : 'block';
    if (!ratingValid) return;

    const review = {
      name:   document.getElementById('reviewerName').value.trim(),
      text:   document.getElementById('reviewText').value.trim(),
      rating: Number(ratingInput.value)
    };

    // Save and display
    reviews.unshift(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    createReviewCard(review, true);
    updateSummary();

    // Reset the form and stars
    form.reset();
    ratingInput.value = 0;
    stars.forEach(function (s) { s.textContent = '☆'; });

    showSuccessMessage('reviewSuccess', 3000);
  });

  // ── Helper: build and insert a review card ──
  function createReviewCard(review, newest) {
    let starHTML = '';
    for (let i = 1; i <= 5; i++) {
      starHTML += i <= review.rating ? '★' : '☆';
    }

    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    col.innerHTML = `
      <div class="card h-100 p-3">
        <div class="card-body">
          <div class="mb-2 review-stars">${starHTML}</div>
          <p class="card-text">"${review.text}"</p>
          <p class="fw-semibold mb-0">${review.name}</p>
          <small class="text-muted">Just now</small>
        </div>
      </div>
    `;

    if (newest) {
      reviewsGrid.prepend(col);
    } else {
      reviewsGrid.appendChild(col);
    }
  }

  // ── Helper: recalculate and display average rating ──
  function updateSummary() {
    const totalReviews = 10 + reviews.length;
    document.getElementById('reviewCount').textContent = totalReviews;

    // Seed: original 10 reviews = 7×5★ + 3×4★ = 47 stars
    let totalStars = 47;
    reviews.forEach(function (review) {
      totalStars += review.rating;
    });

    const average = (totalStars / totalReviews).toFixed(1);
    document.getElementById('averageRating').textContent = average;
  }

});
