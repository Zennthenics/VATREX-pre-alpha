
window.addEventListener("DOMContentLoaded",()=>{

    const loader = document.getElementById("loader");

    loader.classList.add("hidden");

    setTimeout(()=>{
        loader.remove();
    },800);

});