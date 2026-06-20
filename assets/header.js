/* ==========================================================
   BURANSHHH HEADER V2
   ========================================================== */

class LuxuryHeader {

  constructor(section){

    this.section = section;

    this.drawer =
      section.querySelector('.header-drawer');

    this.openButton =
      section.querySelector('[data-header-toggle]');

    this.closeButton =
      section.querySelector('[data-header-close]');

    this.header =
      section.querySelector('.header');

    this.lastScroll = 0;

    this.init();

  }

  /* ======================================================
     INIT
     ====================================================== */

  init(){

    this.bindDrawer();

    this.bindEscape();

    this.bindOutsideClick();

    this.bindStickyHeader();

  }

  /* ======================================================
     DRAWER
     ====================================================== */

  bindDrawer(){

    if(this.openButton){

      this.openButton.addEventListener(
        'click',
        ()=>{

          this.openDrawer();

        }
      );

    }

    if(this.closeButton){

      this.closeButton.addEventListener(
        'click',
        ()=>{

          this.closeDrawer();

        }
      );

    }

  }

  openDrawer(){

    if(!this.drawer) return;

    this.drawer.classList.add('is-open');

    document.body.style.overflow = 'hidden';

  }

  closeDrawer(){

    if(!this.drawer) return;

    this.drawer.classList.remove('is-open');

    document.body.style.overflow = '';

  }

  /* ======================================================
     ESC KEY
     ====================================================== */

  bindEscape(){

    document.addEventListener(
      'keydown',
      (event)=>{

        if(event.key === 'Escape'){

          this.closeDrawer();

        }

      }
    );

  }

  /* ======================================================
     OUTSIDE CLICK
     ====================================================== */

  bindOutsideClick(){

    if(!this.drawer) return;

    this.drawer.addEventListener(
      'click',
      (event)=>{

        if(
          event.target === this.drawer
        ){

          this.closeDrawer();

        }

      }
    );

  }

  /* ======================================================
     STICKY HEADER
     ====================================================== */

  bindStickyHeader(){

    window.addEventListener(
      'scroll',
      ()=>{

        const currentScroll =
          window.scrollY;

        if(currentScroll > 40){

          this.section.classList.add(
            'is-scrolled'
          );

        }else{

          this.section.classList.remove(
            'is-scrolled'
          );

        }

        this.lastScroll =
          currentScroll;

      },
      { passive:true }
    );

  }

}

/* ==========================================================
   INITIALIZE
   ========================================================== */

function initLuxuryHeaders(){

  document
    .querySelectorAll(
      '[data-header-section]'
    )
    .forEach(section=>{

      if(
        section.dataset.loaded === 'true'
      ) return;

      new LuxuryHeader(section);

      section.dataset.loaded = 'true';

    });

}

/* ==========================================================
   DOM READY
   ========================================================== */

document.addEventListener(
  'DOMContentLoaded',
  initLuxuryHeaders
);

/* ==========================================================
   SHOPIFY EDITOR
   ========================================================== */

document.addEventListener(
  'shopify:section:load',
  initLuxuryHeaders
);

document.addEventListener(
  'shopify:section:reorder',
  initLuxuryHeaders
);