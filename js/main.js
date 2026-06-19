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