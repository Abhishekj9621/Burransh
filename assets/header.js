class LuxuryHeader {

constructor(section){

this.section = section;

this.drawer =
  section.querySelector('.header-drawer');

this.openButton =
  section.querySelector('[data-header-toggle]');

this.closeButton =
  section.querySelector('[data-header-close]');

this.init();

}

init(){

this.bindOpen();

this.bindClose();

this.bindEscape();

}

bindOpen(){

if(!this.openButton || !this.drawer) return;

this.openButton.addEventListener(
  'click',
  ()=>{

    this.drawer.classList.add('is-open');

    document.body.style.overflow = 'hidden';

  }
);

}

bindClose(){

if(!this.closeButton || !this.drawer) return;

this.closeButton.addEventListener(
  'click',
  ()=>{

    this.closeDrawer();

  }
);

}

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

closeDrawer(){

if(!this.drawer) return;

this.drawer.classList.remove('is-open');

document.body.style.overflow = '';

}

}

function initLuxuryHeaders(){

document
.querySelectorAll('[data-header-section]')
.forEach(section=>{

  if(section.dataset.loaded === 'true') return;

  new LuxuryHeader(section);

  section.dataset.loaded = 'true';

});

}

document.addEventListener(
'DOMContentLoaded',
initLuxuryHeaders
);

document.addEventListener(
'shopify:section:load',
initLuxuryHeaders
);
