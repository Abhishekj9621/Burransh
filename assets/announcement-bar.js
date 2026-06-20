class AnnouncementBar {

constructor(section){

this.section = section;

this.slides =
  section.querySelectorAll('.ab__slide');

this.closeButton =
  section.querySelector('.ab__close');

this.interval =
  parseInt(section.dataset.interval) * 1000 || 5000;

this.autoplay =
  section.dataset.autoplay === 'true';

this.animation =
  section.dataset.animation;

this.current = 0;

this.timer = null;

this.init();

}

init(){

this.restoreDismissed();

this.bindClose();

if(
  this.animation !== 'static' &&
  this.slides.length > 1
){
  this.start();
  this.bindPause();
}

}

start(){

if(!this.autoplay) return;

this.timer = setInterval(()=>{

  this.next();

},this.interval);

}

stop(){

clearInterval(this.timer);

}

next(){

this.slides[this.current]
  ?.classList.remove('is-active');

this.current++;

if(this.current >= this.slides.length){

  this.current = 0;

}

this.slides[this.current]
  ?.classList.add('is-active');

}

bindPause(){

this.section.addEventListener(
  'mouseenter',
  ()=> this.stop()
);

this.section.addEventListener(
  'mouseleave',
  ()=> this.start()
);

this.section.addEventListener(
  'touchstart',
  ()=> this.stop(),
  { passive:true }
);

this.section.addEventListener(
  'touchend',
  ()=> this.start(),
  { passive:true }
);

}

bindClose(){

if(!this.closeButton) return;

this.closeButton.addEventListener(
  'click',
  ()=>{

    localStorage.setItem(
      `announcement-dismissed-${this.section.id}`,
      'true'
    );

    this.section.classList.add('ab--hidden');

  }
);

}

restoreDismissed(){

if(
  localStorage.getItem(
    `announcement-dismissed-${this.section.id}`
  ) === 'true'
){

  this.section.classList.add('ab--hidden');

}

}

}

function initAnnouncementBars(){

document
.querySelectorAll('[data-announcement-bar]')
.forEach(section=>{

  if(section.dataset.loaded) return;

  new AnnouncementBar(section);

  section.dataset.loaded = 'true';

});

}

document.addEventListener(
'DOMContentLoaded',
initAnnouncementBars
);

document.addEventListener(
'shopify:section:load',
initAnnouncementBars
);
