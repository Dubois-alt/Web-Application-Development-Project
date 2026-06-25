
// REUSABLE CATEGORY FILTER


function setupFilter(buttonContainerId, itemClass) {
  const container = document.getElementById(buttonContainerId);
  if (!container) return; // this filter group isn't on the current page

  const filterButtons = container.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.' + itemClass);

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {

      filterButtons.forEach(function (btn) {
        btn.classList.remove('active', 'btn-dark');
        btn.classList.add('btn-outline-dark');
      });
      button.classList.add('active', 'btn-dark');
      button.classList.remove('btn-outline-dark');

      const selectedCategory = button.getAttribute('data-filter');

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

document.addEventListener('DOMContentLoaded', function () {
  setupFilter('filterButtons', 'menu-item');     // menu page
  setupFilter('blogFilterButtons', 'blog-item');  // blog page
});



// DARK / LIGHT MODE TOGGLE


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


// REUSABLE FORM VALIDATION



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


function setupFormValidation(formId, fieldRules, onSuccess) {
  const form = document.getElementById(formId);
  if (!form) return; 

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


function showSuccessMessage(elementId, duration) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.style.display = 'block';
  setTimeout(function () {
    el.style.display = 'none';
  }, duration || 4000);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



// CONTACT FORM


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



// MUG CLUB SIGNUP + MEMBERS LIST


document.addEventListener('DOMContentLoaded', function () {

  const mugClubForm = document.getElementById('mugClubForm');
  if (!mugClubForm) return; // only run on the blog page

  const membersList = document.getElementById('membersList');

  // Load existing members from localStorage (or start with an empty list)
  let members = JSON.parse(localStorage.getItem('mugClubMembers')) || [];

  // Show any members already saved from a previous visit
  members.forEach(function (member) {
    addMemberToList(member.name, member.number, false);
  });

  // Use the shared validation engine for the two normal text fields
  setupFormValidation('mugClubForm', {
    mugClubName:  { required: true, minLength: 2 },
    mugClubEmail: { required: true, pattern: EMAIL_PATTERN }
  }, function (form) {

    const memberNumber = members.length + 1;
    const memberName = document.getElementById('mugClubName').value.trim();

    members.push({ name: memberName, number: memberNumber });
    localStorage.setItem('mugClubMembers', JSON.stringify(members));

    addMemberToList(memberName, memberNumber, true);

    showSuccessMessage('mugClubSuccess');
    form.reset();
  });

  // Helper function: adds one member's name to the visible <ul> list
  function addMemberToList(name, number, isNew) {
    const listItem = document.createElement('li');
    listItem.className = 'mb-2 pb-2 border-bottom';
    listItem.innerHTML = `<strong>${name}</strong> <span class="text-muted small">— Mug Club Member #${number}</span>`;

    if (isNew) {
      membersList.prepend(listItem); // newest member appears at the top
    } else {
      membersList.appendChild(listItem); // older members load in order
    }
  }

});



// REVIEWS PAGE


document.addEventListener('DOMContentLoaded', function () {

  const reviewForm = document.getElementById('reviewForm');
  if (!reviewForm) return; // only run on the reviews page

  const ratingInput = document.getElementById('ratingValue');
  const ratingError = document.getElementById('ratingError');
  const reviewsGrid = document.getElementById('reviewsGrid');
  const stars = document.querySelectorAll('#starRating .star');

  
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

  reviews.forEach(function (review) {
    createReviewCard(review, false);
  });

  updateSummary();

  // Star rating click handler
  stars.forEach(function (star) {
    star.addEventListener('click', function () {
      const value = parseInt(this.dataset.value);
      ratingInput.value = value;

      stars.forEach(function (s) {
        s.textContent = parseInt(s.dataset.value) <= value ? '★' : '☆';
      });

      ratingError.style.display = 'none';
    });
  });

  // Form submission: reuse the shared validator for name + text,
  // then handle the star rating separately
  setupFormValidation('reviewForm', {
    reviewerName: { required: true, minLength: 2 },
    reviewText:   { required: true, minLength: 10 }
  }, function (form) {

    // Star rating check (not handled by the generic validator)
    const ratingValid = Number(ratingInput.value) > 0;
    ratingError.style.display = ratingValid ? 'none' : 'block';
    if (!ratingValid) return; // stop here if no rating was picked

    const review = {
      name: document.getElementById('reviewerName').value.trim(),
      text: document.getElementById('reviewText').value.trim(),
      rating: Number(ratingInput.value)
    };

    reviews.unshift(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    createReviewCard(review, true);
    updateSummary();

    form.reset();
    ratingInput.value = 0;
    stars.forEach(function (s) {
      s.textContent = '☆';
    });

    showSuccessMessage('reviewSuccess', 3000);
  });

  // Builds and inserts one review card into the grid
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

  // Recalculates and displays the average rating + total review count
  function updateSummary() {
    const totalReviews = 10 + reviews.length;
    document.getElementById('reviewCount').textContent = totalReviews;

    // Original 10 seed reviews: 7 × 5-star + 3 × 4-star = 47 stars
    let totalStars = 47;
    reviews.forEach(function (review) {
      totalStars += review.rating;
    });

    const average = (totalStars / totalReviews).toFixed(1);
    document.getElementById('averageRating').textContent = average;
  }

});
