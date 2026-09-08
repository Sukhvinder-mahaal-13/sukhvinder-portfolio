
// ========================================
// PORTFOLIO SCROLL ANIMATIONS
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // THEME TOGGLE — MOON / SUN
    // ========================================

    const themeBtn = document.getElementById("themeBtn");

    if (themeBtn) {

        const themeIcon = themeBtn.querySelector("i");

        // Saved theme check
        const savedTheme = localStorage.getItem("portfolio-theme");

        if (savedTheme === "light") {

            document.body.classList.add("light-theme");

            if (themeIcon) {
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
            }

        } else {

            document.body.classList.remove("light-theme");

            if (themeIcon) {
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
            }
        }


        themeBtn.addEventListener("click", () => {

            document.body.classList.toggle("light-theme");

            const isLight =
                document.body.classList.contains("light-theme");

            if (isLight) {

                // LIGHT MODE → SUN
                if (themeIcon) {
                    themeIcon.classList.remove("fa-moon");
                    themeIcon.classList.add("fa-sun");
                }

                localStorage.setItem(
                    "portfolio-theme",
                    "light"
                );

            } else {

                // DARK MODE → MOON
                if (themeIcon) {
                    themeIcon.classList.remove("fa-sun");
                    themeIcon.classList.add("fa-moon");
                }

                localStorage.setItem(
                    "portfolio-theme",
                    "dark"
                );
            }

        });

    }


    // ========================================
    // INTERSECTION OBSERVER
    // ========================================

    const observerOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    };


    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    // Animation sirf ek baar chale
                    observer.unobserve(entry.target);

                }

            });

        },
        observerOptions
    );


    // ========================================
    // ELEMENTS TO ANIMATE
    // ========================================

    const animatedElements = document.querySelectorAll(
        ".section, " +
        ".about-content, " +
        ".about-image, " +
        ".skill-card, " +
        ".tool-card, " +
        ".concept-card, " +
        ".project-card, " +
        ".resume-box, " +
        ".contact-box, " +
        ".stat-card"
    );


    animatedElements.forEach((element, index) => {

        // Reveal class
        element.classList.add("scroll-reveal");


        // Cards ke liye stagger effect
        if (
            element.classList.contains("skill-card") ||
            element.classList.contains("project-card") ||
            element.classList.contains("stat-card")
        ) {

            const delay = (index % 6) * 0.08;

            element.style.transitionDelay =
                `${delay}s`;
        }


        observer.observe(element);

    });


    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================

    const navbar =
        document.querySelector(".navbar");


    if (navbar) {

        const handleNavbarScroll = () => {

            if (window.scrollY > 40) {

                navbar.classList.add(
                    "navbar-scrolled"
                );

            } else {

                navbar.classList.remove(
                    "navbar-scrolled"
                );

            }

        };


        window.addEventListener(
            "scroll",
            handleNavbarScroll,
            { passive: true }
        );


        handleNavbarScroll();

    }


    // ========================================
    // HERO PARALLAX EFFECT
    // ========================================

    const heroImage =
        document.querySelector(".hero-image");


    if (
        heroImage &&
        window.innerWidth > 768
    ) {

        window.addEventListener(
            "scroll",
            () => {

                const scrollValue =
                    window.scrollY;


                if (scrollValue < 700) {

                    heroImage.style.transform =
                        `translateY(${scrollValue * 0.08}px)`;

                }

            },
            { passive: true }
        );

    }


    // ========================================
    // MOUSE MOVE EFFECT ON PROJECT CARDS
    // ========================================

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth <= 768)
                    return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;


                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) / centerY) * -3;


                const rotateY =
                    ((x - centerX) / centerX) * 3;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    // ========================================
    // SKILL CARD HOVER GLOW
    // ========================================

    const skillCards =
        document.querySelectorAll(".skill-card");


    skillCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "skill-active"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "skill-active"
                );

            }
        );

    });


    // ========================================
    // COUNTER ANIMATION
    // ========================================

    const statNumbers =
        document.querySelectorAll(".stat-number");


    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting)
                        return;


                    const numberElement =
                        entry.target;


                    const originalText =
                        numberElement.textContent.trim();


                    const numberMatch =
                        originalText.match(/\d+/);


                    if (!numberMatch) {

                        observer.unobserve(
                            numberElement
                        );

                        return;

                    }


                    const target =
                        parseInt(
                            numberMatch[0]
                        );


                    const suffix =
                        originalText.replace(
                            /\d+/g,
                            ""
                        );


                    let current = 0;

                    const duration = 1000;

                    const startTime =
                        performance.now();


                    const updateCounter =
                        (currentTime) => {

                            const elapsed =
                                currentTime -
                                startTime;


                            const progress =
                                Math.min(
                                    elapsed /
                                    duration,
                                    1
                                );


                            // Smooth ease-out
                            const easedProgress =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );


                            current =
                                Math.floor(
                                    easedProgress *
                                    target
                                );


                            numberElement.textContent =
                                current +
                                suffix;


                            if (progress < 1) {

                                requestAnimationFrame(
                                    updateCounter
                                );

                            } else {

                                numberElement.textContent =
                                    target +
                                    suffix;

                            }

                        };


                    requestAnimationFrame(
                        updateCounter
                    );


                    observer.unobserve(
                        numberElement
                    );

                });

            },
            {
                threshold: 0.5
            }
        );


    statNumbers.forEach((number) => {

        counterObserver.observe(number);

    });


    // ========================================
    // SMOOTH INTERNAL LINK SCROLL
    // ========================================

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target)
                    return;


                event.preventDefault();


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target
                        .getBoundingClientRect()
                        .top +
                    window.scrollY -
                    navbarHeight -
                    15;


                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    // ========================================
    // PAGE LOADED
    // ========================================

    document.body.classList.add(
        "page-loaded"
    );

});

