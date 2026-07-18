const cursor = document.querySelector(".cursor");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;

// Change this:
// 0.08 = floaty
// 0.12 = smooth
// 0.18 = responsive
// 0.25 = almost instant
const speed = 0.18;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {

    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;

    // Adjust these numbers until the sword tip is exactly where you click
    const offsetX = -6;
    const offsetY = -6;

    cursor.style.transform =
        `translate3d(${currentX + offsetX}px, ${currentY + offsetY}px, 0)`;

    requestAnimationFrame(animate);
}

animate();
window.addEventListener("load",()=>{

    const loader = document.getElementById("loader");

    loader.classList.add("hidden");

    setTimeout(()=>{
        loader.remove();
    },800);

});