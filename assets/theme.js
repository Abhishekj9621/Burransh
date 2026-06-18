/* ═══════════════════════════════════════════════════════════
   BURANSHH — Theme JavaScript
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ── Utility: DOM helpers ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);


/* ── Header: sticky + mobile nav ── */
class BuranshHeader {
  constructor() {
    this.header = $('.site-header');
    this.toggle = $('.header-mobile-toggle');
    this.drawer = $('.mobile-nav-drawer');
    this.overlay = $('.mobile-nav-overlay');
    this.close = $('.mobile-nav-close');
    this.scrollThreshold = 10;
    this.init();
  }

  init() {
    // Scroll effect
    on(window, 'scroll', () => this.onScroll(), { passive: true });

    // Mobile nav
    on(this.toggle, 'click', () => this.openNav());
    on(this.overlay, 'click', () => this.closeNav());
    on(this.close, 'click', () => this.closeNav());

    // Escape key
    on(document, 'keydown', e => {
      if (e.key === 'Escape') this.closeNav();
    });
  }

  onScroll() {
    if (!this.header) return;
    const scrolled = window.scrollY > this.scrollThreshold;
    this.header.classList.toggle('scrolled', scrolled);
  }

  openNav() {
    this.drawer?.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.toggle?.setAttribute('aria-expanded', 'true');
  }

  closeNav() {
    this.drawer?.classList.remove('open');
    document.body.style.overflow = '';
    this.toggle?.setAttribute('aria-expanded', 'false');
  }
}


/* ── Cart Drawer ── */
class BuranshCart {
  constructor() {
    this.drawer = $('.cart-drawer');
    this.overlay = $('.cart-drawer-overlay');
    this.cartTriggers = $$('[data-cart-trigger]');
    this.init();
  }

  init() {
    this.cartTriggers.forEach(btn => on(btn, 'click', () => this.open()));
    on(this.overlay, 'click', () => this.close());
    on(document, 'keydown', e => { if (e.key === 'Escape') this.close(); });

    // Close, ATC, remove, and qty buttons (delegated — covers both the
    // header X button and the footer "Continue Shopping" button, which
    // both share the .cart-drawer-close class)
    on(document, 'click', e => {
      if (e.target.closest('.cart-drawer-close')) this.close();

      const atcBtn = e.target.closest('[data-atc]');
      if (atcBtn) this.addToCart(atcBtn);

      const removeBtn = e.target.closest('[data-cart-remove]');
      if (removeBtn) this.removeItem(removeBtn);

      const qtyBtn = e.target.closest('[data-qty]');
      if (qtyBtn) this.updateQty(qtyBtn);
    });
  }

  open() {
    this.drawer?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.drawer?.classList.remove('open');
    document.body.style.overflow = '';
  }

  async addToCart(btn) {
    const variantId = btn.dataset.atc;
    const qty = parseInt($('[data-quantity]')?.value || 1);

    btn.classList.add('loading');
    btn.textContent = 'Adding...';

    try {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity: qty })
      });
      if (res.ok) {
        await this.refreshCart();
        this.open();
        btn.textContent = 'Added!';
        setTimeout(() => {
          btn.classList.remove('loading');
          btn.textContent = 'Add to Bag';
        }, 1500);
      }
    } catch (err) {
      console.error('ATC error:', err);
      btn.classList.remove('loading');
      btn.textContent = 'Add to Bag';
    }
  }

  async refreshCart() {
    try {
      const res = await fetch('/cart.js');
      const cart = await res.json();
      this.updateCartUI(cart);
    } catch (err) {
      console.error('Cart refresh error:', err);
    }
  }

  updateCartUI(cart) {
    // Update item count badge
    $$('[data-cart-count]').forEach(el => {
      el.textContent = cart.item_count;
      el.style.display = cart.item_count > 0 ? 'flex' : 'none';
    });

    // Update subtotal
    const subtotalEl = $('.cart-drawer__subtotal-amount');
    if (subtotalEl) {
      subtotalEl.textContent = this.formatMoney(cart.total_price);
    }
  }

  async removeItem(btn) {
    const lineIdx = btn.dataset.cartRemove;
    try {
      await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line: lineIdx, quantity: 0 })
      });
      await this.refreshCart();
    } catch(err) { console.error(err); }
  }

  async updateQty(btn) {
    const lineIdx = btn.dataset.qty;
    const delta = btn.dataset.delta === 'up' ? 1 : -1;
    const numEl = btn.closest('.cart-item__qty')?.querySelector('.cart-item__qty-num');
    const currentQty = parseInt(numEl?.textContent || 1);
    const newQty = Math.max(0, currentQty + delta);

    try {
      await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line: lineIdx, quantity: newQty })
      });
      await this.refreshCart();
    } catch(err) { console.error(err); }
  }

  formatMoney(cents) {
    return '₹' + (cents / 100).toLocaleString('en-IN', { minimumFractionDigits: 0 });
  }
}


/* ── Accordion ── */
class BuranshAccordion {
  constructor(container) {
    this.items = $$('.accordion-item', container);
    this.init();
  }

  init() {
    this.items.forEach(item => {
      const trigger = $('.accordion-trigger', item);
      on(trigger, 'click', () => this.toggle(item));
    });
  }

  toggle(item) {
    const isOpen = item.classList.contains('open');
    // Close all
    this.items.forEach(i => {
      i.classList.remove('open');
      $('.accordion-body', i)?.classList.remove('open');
    });
    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      $('.accordion-body', item)?.classList.add('open');
    }
  }
}


/* ── Product Gallery: thumbnail switching ── */
class ProductGallery {
  constructor(container) {
    this.container = container;
    this.mainImg = $('.product-gallery__main img', container);
    this.thumbs = $$('.product-gallery__thumb', container);
    this.init();
  }

  init() {
    this.thumbs.forEach((thumb, i) => {
      on(thumb, 'click', () => this.switchTo(i));
    });
  }

  switchTo(idx) {
    const src = this.thumbs[idx]?.querySelector('img')?.src;
    if (!src || !this.mainImg) return;
    this.mainImg.src = src;
    this.thumbs.forEach((t, i) => t.classList.toggle('active', i === idx));
  }
}


/* ── Product: Variant selection ── */
class ProductVariants {
  constructor() {
    this.sizeOptions = $$('.size-option');
    this.colorOptions = $$('.color-option');
    this.init();
  }

  init() {
    this.sizeOptions.forEach(opt => {
      if (!opt.classList.contains('sold-out')) {
        on(opt, 'click', () => {
          this.sizeOptions.forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
          this.updateVariant();
        });
      }
    });

    this.colorOptions.forEach(opt => {
      on(opt, 'click', () => {
        this.colorOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        this.updateVariant();
      });
    });

    // Quantity buttons
    on($('[data-qty-minus]'), 'click', () => this.changeQty(-1));
    on($('[data-qty-plus]'), 'click', () => this.changeQty(1));
  }

  changeQty(delta) {
    const input = $('[data-quantity]');
    if (!input) return;
    const newVal = Math.max(1, parseInt(input.value) + delta);
    input.value = newVal;
  }

  updateVariant() {
    // In a real Shopify theme, this would find the matching variant
    // and update price, availability, and the variant_id on the ATC button
    const size = $('.size-option.selected')?.dataset.size;
    const color = $('.color-option.selected')?.dataset.color;
    // console.log('Variant update:', { size, color });
  }
}


/* ── Marquee: pause on hover ── */
class Marquee {
  constructor(el) {
    this.track = el;
    on(el, 'mouseenter', () => el.style.animationPlayState = 'paused');
    on(el, 'mouseleave', () => el.style.animationPlayState = 'running');
  }
}


/* ── Scroll Reveal: lightweight IntersectionObserver ── */
class ScrollReveal {
  constructor() {
    this.els = $$('[data-reveal]');
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            this.observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    this.els.forEach(el => this.observer.observe(el));
  }
}


/* ── Newsletter form ── */
class NewsletterForm {
  constructor() {
    this.form = $('.newsletter__form');
    this.init();
  }

  init() {
    on(this.form, 'submit', async (e) => {
      e.preventDefault();
      const email = this.form?.querySelector('input[type="email"]')?.value;
      const btn = this.form?.querySelector('.newsletter__submit');
      if (!email) return;
      if (btn) {
        btn.textContent = 'Subscribing...';
        btn.disabled = true;
      }
      // Shopify form submission is handled natively; this is for feedback
      setTimeout(() => {
        if (btn) {
          btn.textContent = 'Subscribed ✓';
          btn.style.background = 'var(--color-moss)';
        }
      }, 800);
    });
  }
}


/* ── Image lazy loading enhancement ── */
function initLazyImages() {
  if (!('IntersectionObserver' in window)) return;
  const imgs = $$('img[data-src]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        img.src = img.dataset.src;
        if (img.dataset.srcset) img.srcset = img.dataset.srcset;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });
  imgs.forEach(img => observer.observe(img));
}


/* ── Product card image swap on hover ── */
function initProductCardHover() {
  $$('.product-card').forEach(card => {
    const imgs = $$('img[data-hover-src]', card);
    imgs.forEach(img => {
      const original = img.src;
      const hover = img.dataset.hoverSrc;
      if (!hover) return;
      on(card, 'mouseenter', () => img.src = hover);
      on(card, 'mouseleave', () => img.src = original);
    });
  });
}


/* ── Instagram grid: placeholder pattern ── */
function initInstagramPlaceholders() {
  $$('.instagram-item__placeholder').forEach((el, i) => {
    const hues = ['#F0EDD0', '#E8E5C8', '#DDD9BE', '#F0EDD0', '#E8E5C8'];
    el.style.background = hues[i % hues.length];
  });
}


/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  new BuranshHeader();
  new BuranshCart();
  new ScrollReveal();
  new NewsletterForm();

  // Accordion instances
  $$('.product-accordion').forEach(el => new BuranshAccordion(el));

  // Product gallery
  $$('.product-gallery').forEach(el => new ProductGallery(el));

  // Product variants
  if ($('.product-page')) new ProductVariants();

  // Marquee
  $$('.marquee-strip__track').forEach(el => new Marquee(el));

  initLazyImages();
  initProductCardHover();
  initInstagramPlaceholders();
});
