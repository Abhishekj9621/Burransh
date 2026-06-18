const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},

{
threshold:.2
}

);

document.querySelectorAll(".fade-up")
.forEach((el)=>observer.observe(el));


const header = document.querySelector('.site-header');

window.addEventListener('scroll',()=>{

if(window.scrollY > 50){

header?.classList.add('scrolled');

}else{

header?.classList.remove('scrolled');

}

});

const cartBtn =
document.querySelector('.cart-trigger');

const cartDrawer =
document.querySelector('#cartDrawer');

const closeCart =
document.querySelector('#closeCart');

cartBtn?.addEventListener('click',()=>{

cartDrawer.classList.add('active');

});

closeCart?.addEventListener('click',()=>{

cartDrawer.classList.remove('active');

});


const menuBtn =
document.querySelector('.mobile-menu-btn');

const mobileMenu =
document.querySelector('#mobileMenu');

const closeMenu =
document.querySelector('#closeMenu');

menuBtn?.addEventListener('click',()=>{

mobileMenu.classList.add('active');

});

closeMenu?.addEventListener('click',()=>{

mobileMenu.classList.remove('active');

});

const searchBtn =
document.querySelector('.search-trigger');

const searchModal =
document.querySelector('#searchModal');

const closeSearch =
document.querySelector('#closeSearch');

searchBtn?.addEventListener('click',()=>{

searchModal.classList.add('active');

});

closeSearch?.addEventListener('click',()=>{

searchModal.classList.remove('active');

});

/* ── Announcement bar ── */
(function () {
  const bar     = document.getElementById('annBar');
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

    /* Snap header back to top */
    const header = document.querySelector('.site-header');
    if (header) header.style.top = '0';
  });
})();

/* ── Dropdown nav ── */
(function () {
  const items = document.querySelectorAll('.nav-item--dropdown');

  items.forEach(item => {
    const btn = item.querySelector('.nav-dropdown-trigger');

    btn?.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = item.classList.contains('open');

      /* Close all others */
      items.forEach(el => {
        el.classList.remove('open');
        el.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Click outside closes all */
  document.addEventListener('click', () => {
    items.forEach(el => {
      el.classList.remove('open');
      el.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
    });
  });

  /* Escape key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      items.forEach(el => {
        el.classList.remove('open');
        el.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }
  });
})();

/* ── Mobile menu — animated hamburger ── */
(function () {
  const btn  = document.getElementById('mobileMenuBtn');
  const menu = document.querySelector('#mobileMenu');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.classList.contains('open');
    btn.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(!isOpen));
    menu?.classList.toggle('active');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });
})();