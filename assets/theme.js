/* ── Scroll animations ── */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  { threshold: .2 }
);

document.querySelectorAll('.fade-up')
  .forEach((el) => observer.observe(el));


/* ── Header scroll state ── */

const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
}, { passive: true });


/* ── Cart drawer ── */

const cartBtn   = document.querySelector('.cart-trigger');
const cartDrawer = document.querySelector('#cartDrawer');
const closeCart  = document.querySelector('#closeCart');

cartBtn?.addEventListener('click', () => {
  cartDrawer.classList.add('active');
});

closeCart?.addEventListener('click', () => {
  cartDrawer.classList.remove('active');
});


/* ── Mobile menu ── */

const menuBtn   = document.getElementById('mobileMenuBtn');
const mobileMenu = document.querySelector('#mobileMenu');
const closeMenu  = document.querySelector('#closeMenu');

menuBtn?.addEventListener('click', () => {
  const isOpen = menuBtn.classList.contains('open');
  menuBtn.classList.toggle('open');
  mobileMenu?.classList.toggle('active');
  menuBtn.setAttribute('aria-expanded', String(!isOpen));
  document.body.style.overflow = isOpen ? '' : 'hidden';
});

closeMenu?.addEventListener('click', () => {
  menuBtn?.classList.remove('open');
  mobileMenu?.classList.remove('active');
  menuBtn?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
});


/* ── Search modal ── */

const searchBtn   = document.querySelector('.search-trigger');
const searchModal  = document.querySelector('#searchModal');
const closeSearch  = document.querySelector('#closeSearch');

searchBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  searchModal?.classList.add('active');
  searchModal?.querySelector('input')?.focus();
});

closeSearch?.addEventListener('click', () => {
  searchModal?.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    searchModal?.classList.remove('active');
    closeAllDropdowns();
  }
});


/* ── Announcement bar ── */

(function () {
  const bar      = document.getElementById('annBar');
  const closeBtn = document.getElementById('annClose');
  if (!bar) return;

  const KEY = 'bh_ann_dismissed';

  if (!sessionStorage.getItem(KEY)) {
    document.body.classList.add('ann-visible');
  } else {
    bar.classList.add('ann-bar--hidden');
  }

  closeBtn?.addEventListener('click', () => {
    bar.classList.add('ann-bar--hidden');
    document.body.classList.remove('ann-visible');
    sessionStorage.setItem(KEY, '1');
  });
})();


/* ── Dropdown nav ── */

function closeAllDropdowns() {
  document.querySelectorAll('.nav-item--dropdown.open').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.nav-dropdown-trigger')
      ?.setAttribute('aria-expanded', 'false');
  });
}

document.querySelectorAll('.nav-item--dropdown').forEach(item => {
  const btn = item.querySelector('.nav-dropdown-trigger');

  btn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = item.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

document.addEventListener('click', closeAllDropdowns);