document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector("[data-header]");

  window.addEventListener("scroll", () => {

    if(window.scrollY > 40){
      header.classList.add("scrolled");
    }else{
      header.classList.remove("scrolled");
    }

  });

  const openBtn =
    document.querySelector("[data-mobile-open]");

  const closeBtn =
    document.querySelector("[data-mobile-close]");

  const mobileMenu =
    document.querySelector("[data-mobile-menu]");

  if(openBtn){

    openBtn.addEventListener("click",()=>{

      mobileMenu.classList.add("active");

      document.body.style.overflow="hidden";

    });

  }

  if(closeBtn){

    closeBtn.addEventListener("click",()=>{

      mobileMenu.classList.remove("active");

      document.body.style.overflow="";

    });

  }

});