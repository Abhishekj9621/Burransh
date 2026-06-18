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