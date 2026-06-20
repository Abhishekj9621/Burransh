/* ==========================================================
   BURANSHH ANNOUNCEMENT BAR
   Version 2.0
   ========================================================== */

class AnnouncementBar {

  constructor(section){

    this.section = section;

    this.track = section.querySelector('.announcement-slider__track');

    this.slides = section.querySelectorAll('.announcement-slide');

    this.prevBtn = section.querySelector('[data-announcement-prev]');
    this.nextBtn = section.querySelector('[data-announcement-next]');

    this.progress = section.querySelector('.announcement-progress__bar');

    this.closeBtn = section.querySelector('[data-announcement-close]');

    this.mode = section.dataset.mode || 'slider';

    this.autoplay =
      section.dataset.autoplay === 'true';

    this.interval =
      parseInt(section.dataset.speed) || 5000;

    this.pauseOnHover =
      section.dataset.pauseHover === 'true';

    this.currentIndex = 0;

    this.timer = null;

    this.progressTimer = null;

    this.touchStartX = 0;
    this.touchEndX = 0;

    this.totalSlides = this.slides.length;

    this.init();
  }

  /* =======================================================
     INIT
     ======================================================= */

  init(){

    this.restoreClosedState();

    if(this.mode === 'slider'){

      this.bindNavigation();

      this.bindTouch();

      this.bindKeyboard();

      this.update();

      if(this.autoplay){

        this.startAutoplay();

      }

    }

    this.bindCloseButton();

    this.bindHover();

  }

  /* =======================================================
     UPDATE
     ======================================================= */

  update(){

    if(!this.track) return;

    this.track.style.transform =
      `translateX(-${this.currentIndex * 100}%)`;

    this.restartProgress();

  }

  /* =======================================================
     NEXT
     ======================================================= */

  next(){

    this.currentIndex++;

    if(this.currentIndex >= this.totalSlides){

      this.currentIndex = 0;

    }

    this.update();

  }

  /* =======================================================
     PREV
     ======================================================= */

  prev(){

    this.currentIndex--;

    if(this.currentIndex < 0){

      this.currentIndex =
        this.totalSlides - 1;

    }

    this.update();

  }

  /* =======================================================
     AUTOPLAY
     ======================================================= */

  startAutoplay(){

    this.stopAutoplay();

    this.timer = setInterval(()=>{

      this.next();

    },this.interval);

    this.startProgress();

  }

  stopAutoplay(){

    clearInterval(this.timer);

    clearInterval(this.progressTimer);

  }

  /* =======================================================
     PROGRESS BAR
     ======================================================= */

  startProgress(){

    if(!this.progress) return;

    let width = 0;

    const step =
      100 / (this.interval / 50);

    this.progress.style.width = '0%';

    this.progressTimer = setInterval(()=>{

      width += step;

      if(width > 100){

        width = 100;

      }

      this.progress.style.width =
        `${width}%`;

    },50);

  }

  restartProgress(){

    clearInterval(this.progressTimer);

    this.startProgress();

  }

  /* =======================================================
     NAVIGATION
     ======================================================= */

  bindNavigation(){

    if(this.prevBtn){

      this.prevBtn.addEventListener('click',()=>{

        this.prev();

      });

    }

    if(this.nextBtn){

      this.nextBtn.addEventListener('click',()=>{

        this.next();

      });

    }

  }

  /* =======================================================
     HOVER
     ======================================================= */

  bindHover(){

    if(!this.pauseOnHover) return;

    this.section.addEventListener('mouseenter',()=>{

      this.stopAutoplay();

    });

    this.section.addEventListener('mouseleave',()=>{

      if(this.autoplay){

        this.startAutoplay();

      }

    });

  }

  /* =======================================================
     TOUCH
     ======================================================= */

  bindTouch(){

    this.section.addEventListener(
      'touchstart',
      e=>{

        this.touchStartX =
          e.changedTouches[0].screenX;

      },
      { passive:true }
    );

    this.section.addEventListener(
      'touchend',
      e=>{

        this.touchEndX =
          e.changedTouches[0].screenX;

        this.handleSwipe();

      },
      { passive:true }
    );

  }

  handleSwipe(){

    const diff =
      this.touchStartX - this.touchEndX;

    if(Math.abs(diff) < 40) return;

    if(diff > 0){

      this.next();

    }else{

      this.prev();

    }

  }

  /* =======================================================
     KEYBOARD
     ======================================================= */

  bindKeyboard(){

    document.addEventListener('keydown',(e)=>{

      if(e.key === 'ArrowRight'){

        this.next();

      }

      if(e.key === 'ArrowLeft'){

        this.prev();

      }

    });

  }

  /* =======================================================
     CLOSE BUTTON
     ======================================================= */

  bindCloseButton(){

    if(!this.closeBtn) return;

    this.closeBtn.addEventListener('click',()=>{

      this.section.classList.add(
        'announcement-bar--hidden'
      );

      localStorage.setItem(
        `announcement-hidden-${this.section.id}`,
        'true'
      );

    });

  }

  restoreClosedState(){

    const hidden =
      localStorage.getItem(
        `announcement-hidden-${this.section.id}`
      );

    if(hidden === 'true'){

      this.section.classList.add(
        'announcement-bar--hidden'
      );

    }

  }

}

/* ==========================================================
   INITIALIZATION
   ========================================================== */

function initializeAnnouncementBars(){

  const bars =
    document.querySelectorAll(
      '[data-announcement-bar]'
    );

  bars.forEach(bar=>{

    if(bar.dataset.loaded === 'true') return;

    new AnnouncementBar(bar);

    bar.dataset.loaded = 'true';

  });

}

/* ==========================================================
   DOM READY
   ========================================================== */

document.addEventListener(
  'DOMContentLoaded',
  initializeAnnouncementBars
);

/* ==========================================================
   SHOPIFY THEME EDITOR
   ========================================================== */

document.addEventListener(
  'shopify:section:load',
  initializeAnnouncementBars
);

document.addEventListener(
  'shopify:section:reorder',
  initializeAnnouncementBars
);

document.addEventListener(
  'shopify:block:select',
  initializeAnnouncementBars
);

document.addEventListener(
  'shopify:block:deselect',
  initializeAnnouncementBars
);