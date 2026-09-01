window.addEventListener("DOMContentLoaded", () => {

    // LOADER
    const loader = document.getElementById("loader");

    if (loader) {
        loader.classList.add("hidden");

        setTimeout(() => {
            loader.remove();
        }, 800);
    }


    // MOBILE TOPS SCROLL ANIMATION
    const topsCards = document.querySelectorAll(".mbtops-card");

    if (window.innerWidth <= 768 && topsCards.length > 0) {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.15
        });

        topsCards.forEach((card) => {
            observer.observe(card);
        });

    }

});