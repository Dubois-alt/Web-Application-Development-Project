# ☕ Barcelona House — Web Application Project

A fully responsive, multi-page website for **Barcelona House**, a specialty coffee café
based in Westlands, Nairobi. Built as a front-end web development assignment using
HTML5, CSS3, JavaScript (ES6+), and Bootstrap 5.

---

## 🌐 Live Preview

> [Barcelona House on GitHub Pages](https://dubois-alt.github.io/Web-Application-Development-Project)

---

## 📁 Project Structure

```
Web-Application-Development-Project/
├── index.html              # Homepage — previews all pages
├── about.html              # Our story, values, team, and stats
├── menu.html               # Filterable food and drinks menu
├── gallery.html            # Interior photo gallery with hover effect
├── blog.html               # Blog posts, events sidebar, Mug Club signup
├── contact.html            # Contact form and café information
├── reservations.html       # Table booking form and policy
├── reviews.html            # Customer reviews and star rating form
├── css/
│   └── style.css           # Custom stylesheet (16 numbered sections)
├── js/
│   └── main.js             # All JavaScript (9 numbered sections)
├── images/
│   ├── ambience/           # Interior and background photos
│   ├── blog/               # Blog post images
│   ├── food/               # Menu item photos
│   ├── logo/               # Barcelona House logo
│   └── team/               # Team member photos
└── README.md
```

---

## 📄 Pages

| Page | Description |
|------|-------------|
| **Home** | Full-page hero with tagline, previews of all 7 other pages, and direct links |
| **About** | Café origin story, 3 core values, team of 4, and a stats strip |
| **Menu** | 13 items across 4 categories (Coffee, Cold Drinks, Non-Coffee, Food & Pastries) with a live category filter |
| **Gallery** | 6 interior photos in a zigzag layout with a smooth hover scale effect |
| **Blog** | 6 blog posts across 3 categories (Behind the Beans, Menu Spotlights, Community), an events sidebar with 4 upcoming events, and a Mug Club newsletter signup |
| **Contact** | Contact form with validation and a sidebar showing address, phone, email, and opening hours |
| **Reservations** | Booking form (name, email, phone, date, time, guests, notes) and a policy sidebar |
| **Reviews** | 10 seed customer reviews, a live average rating summary, and a star-rating review submission form |

---

## ⚙️ Technologies Used

- **HTML5** — Semantic markup with proper structure and accessibility attributes
- **CSS3** — Custom properties (variables), flexbox, media queries, and CSS transitions
- **JavaScript ES6+** — Reusable functions, localStorage, DOM manipulation, event listeners
- **Bootstrap 5.3.3** — Responsive grid, navbar, cards, modals, and form components

---

## ✨ JavaScript Features

### 1. Reusable Category Filter
A single `setupFilter()` function powers both the menu and blog pages. Clicking a category button shows only matching items and hides the rest, with active button state toggling.

### 2. Dark / Light Mode Toggle
A moon/sun button in the navbar toggles a `dark-mode` class on `<body>`. All colours, cards, forms, and section backgrounds adapt via CSS, with no page reload.

### 3. Star Rating + Review Form
Clickable star icons (1–5) on the reviews page set a hidden input value. Combined with name and review text validation, new reviews are saved to `localStorage` and instantly rendered as new cards. The average rating and total review count update automatically.

### 4. Mug Club Signup + Live Members List
The blog page signup form validates name and email, saves each new member to `localStorage`, and immediately adds their name and member number to a visible list. Previously saved members reload on every visit.

### 5. Gallery Hover Effect
Hovering over any interior photo in the gallery triggers a smooth `scale(1.05)` zoom and an enhanced box shadow, powered by CSS transitions and JavaScript `mouseenter`/`mouseleave` events.

### 6. Reusable Form Validation Engine
A shared `validateField()` and `setupFormValidation()` system validates every form on the site (contact, reservations, Mug Club, reviews) from a single set of reusable functions, without duplicating logic.

---

## 🎨 Design

### Colour Palette

| Role | Name | Hex |
|------|------|-----|
| Primary | Espresso Brown | `#3B2417` |
| Background | Cream | `#FBF3E7` |
| Accent | Terracotta | `#A8442C` |
| Secondary accent | Gold Ochre | `#D4A017` |
| Base | White | `#FFFFFF` |

### Typography

| Element | Font |
|---------|------|
| Headings | Playfair Display (serif) |
| Body | Inter (sans-serif) |

### Theme
Spanish / Mediterranean coffee house — warm terracotta, espresso brown, and gold tones
inspired by Barcelona's neighbourhood cafés, grounded in Nairobi's local culture.

---

## 📅 Development Timeline

| Milestone | Date | Deliverable |
|-----------|------|-------------|
| Kick-off | 15 June 2026 | Repo created, README, HTML skeletons |
| Milestone 1 | 17–19 June 2026 | Navbar, Bootstrap, menu page, dark mode, JS filter |
| Milestone 2 | 20–21 June 2026 | Gallery, reviews, blog, contact pages |
| Milestone 3 | 25–27 June 2026 | About, reservations, homepage built |
| Final | 28 June 2026 | Logo, footer, CSS/JS organized, images fixed, 39 commits |


