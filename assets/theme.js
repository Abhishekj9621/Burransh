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