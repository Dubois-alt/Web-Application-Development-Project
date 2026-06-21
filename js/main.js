
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
  setupFilter('filterButtons', 'menu-item');   // menu page
  setupFilter('blogFilterButtons', 'blog-item'); // blog page
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


document.addEventListener("DOMContentLoaded", function () {

    
    // CHECK IF WE ARE ON REVIEWS PAGE
   

    const reviewForm = document.getElementById("reviewForm");

    if (!reviewForm) return;

    
    // GET ELEMENTS


    const nameInput = document.getElementById("reviewerName");
    const textInput = document.getElementById("reviewText");
    const ratingInput = document.getElementById("ratingValue");
    const ratingError = document.getElementById("ratingError");
    const successMessage = document.getElementById("reviewSuccess");
    const reviewsGrid = document.getElementById("reviewsGrid");

    const stars = document.querySelectorAll("#starRating .star");

   
    // LOAD SAVED REVIEWS
    

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviews.forEach(function (review) {
        createReviewCard(review, false);
    });

    updateSummary();

  
    // STAR RATING
      stars.forEach(function (star) {

        star.addEventListener("click", function () {

            const value = parseInt(this.dataset.value);

            ratingInput.value = value;

            stars.forEach(function (s) {

                if (parseInt(s.dataset.value) <= value) {

                    s.textContent = "★";

                } else {

                    s.textContent = "☆";

                }

            });

            ratingError.style.display = "none";

        });

    });

    
    // FORM SUBMISSION

    reviewForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let valid = true;

        // NAME

        if (nameInput.value.trim().length < 2) {

            nameInput.classList.add("is-invalid");

            valid = false;

        } else {

            nameInput.classList.remove("is-invalid");

        }

        // REVIEW

        if (textInput.value.trim().length < 10) {

            textInput.classList.add("is-invalid");

            valid = false;

        } else {

            textInput.classList.remove("is-invalid");

        }

        // RATING

        if (Number(ratingInput.value) === 0) {

            ratingError.style.display = "block";

            valid = false;

        } else {

            ratingError.style.display = "none";

        }

        if (!valid) return;

        const review = {

            name: nameInput.value.trim(),

            text: textInput.value.trim(),

            rating: Number(ratingInput.value)

        };

        // SAVE

        reviews.unshift(review);

        localStorage.setItem("reviews", JSON.stringify(reviews));

        // DISPLAY

        createReviewCard(review, true);

        updateSummary();

        // RESET FORM

        reviewForm.reset();

        ratingInput.value = 0;

        stars.forEach(function (s) {

            s.textContent = "☆";

        });

        successMessage.style.display = "block";

        setTimeout(function () {

            successMessage.style.display = "none";

        }, 3000);

    });

    
    // CREATE REVIEW CARD
    

    function createReviewCard(review, newest) {

        let starHTML = "";

        for (let i = 1; i <= 5; i++) {

            starHTML += i <= review.rating ? "★" : "☆";

        }

        const col = document.createElement("div");

        col.className = "col-md-6 col-lg-4";

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

  
    // UPDATE SUMMARY
   

    function updateSummary() {

        const totalReviews = 10 + reviews.length;

        document.getElementById("reviewCount").textContent = totalReviews;

        // Original reviews:
        // 7 × ★★★★★ + 3 × ★★★★☆ = 48 stars

        let totalStars = 48;

        reviews.forEach(function (review) {

            totalStars += review.rating;

        });

        const average = (totalStars / totalReviews).toFixed(1);

        document.getElementById("averageRating").textContent = average;

    }

});
// MUG CLUB NEWSLETTER FORM VALIDATION
document.addEventListener('DOMContentLoaded', function () {

  const mugClubForm = document.getElementById('mugClubForm');
  if (!mugClubForm) return;

  mugClubForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('mugClubEmail');
    const successMessage = document.getElementById('mugClubSuccess');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(emailInput.value.trim());

    if (!isValidEmail) {
      emailInput.classList.add('is-invalid');
      successMessage.style.display = 'none';
      return;
    }

    emailInput.classList.remove('is-invalid');
    successMessage.style.display = 'block';
    mugClubForm.reset();

    setTimeout(function () {
      successMessage.style.display = 'none';
    }, 4000);
  });

});