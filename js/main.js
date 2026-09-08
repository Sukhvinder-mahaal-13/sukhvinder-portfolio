
document.addEventListener("DOMContentLoaded", () => {

    loadNavbar();
    loadFooter();

});


// ================================
// LOAD NAVBAR
// ================================

async function loadNavbar() {

    const navbar =
        document.getElementById("navbar");

    if (!navbar) return;


    const isPagesFolder =
        window.location.pathname.includes("/pages/");


    const navbarPath =
        isPagesFolder
            ? "../components/navbar.html"
            : "components/navbar.html";


    try {

        const response =
            await fetch(navbarPath);


        if (!response.ok) {

            throw new Error(
                "Navbar file not found"
            );

        }


        navbar.innerHTML =
            await response.text();


        // Setup navbar features
        setupMobileMenu();
        setupTheme();
        setupActiveNav();


    } catch (error) {

        console.error(
            "Navbar loading error:",
            error
        );

    }

}



// ================================
// LOAD FOOTER
// ================================

async function loadFooter() {

    const footer =
        document.getElementById("footer");

    if (!footer) return;


    const isPagesFolder =
        window.location.pathname.includes("/pages/");


    const footerPath =
        isPagesFolder
            ? "../components/footer.html"
            : "components/footer.html";


    try {

        const response =
            await fetch(footerPath);


        if (!response.ok) {

            throw new Error(
                "Footer file not found"
            );

        }


        footer.innerHTML =
            await response.text();


        // Footer year
        const footerYear =
            document.getElementById("footerYear");


        if (footerYear) {

            footerYear.textContent =
                new Date().getFullYear();

        }


        setupBackToTop();


    } catch (error) {

        console.error(
            "Footer loading error:",
            error
        );

    }

}



// ================================
// MOBILE MENU
// ================================

function setupMobileMenu() {

    const menuBtn =
        document.getElementById("menuBtn");


    const navMenu =
        document.querySelector(".nav-menu");


    if (!menuBtn || !navMenu) return;


    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");


        const icon =
            menuBtn.querySelector("i");


        if (!icon) return;


        if (
            navMenu.classList.contains("active")
        ) {

            icon.classList.remove(
                "fa-bars"
            );

            icon.classList.add(
                "fa-xmark"
            );

        } else {

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

    });



    // Mobile menu link click

    navMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navMenu.classList.remove(
                        "active"
                    );


                    const icon =
                        menuBtn.querySelector("i");


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }
            );

        });

}



// ================================
// THEME
// ================================

function setupTheme() {

    const themeBtn =
        document.getElementById("themeBtn");


    if (!themeBtn) return;


    const themeIcon =
        themeBtn.querySelector("i");



    // ================================
    // LOAD SAVED THEME
    // ================================

    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );


    if (savedTheme === "light") {

        document.body.classList.add(
            "light-theme"
        );


        if (themeIcon) {

            themeIcon.classList.remove(
                "fa-moon"
            );

            themeIcon.classList.add(
                "fa-sun"
            );

        }

    } else {

        document.body.classList.remove(
            "light-theme"
        );


        if (themeIcon) {

            themeIcon.classList.remove(
                "fa-sun"
            );

            themeIcon.classList.add(
                "fa-moon"
            );

        }

    }



    // ================================
    // CHANGE THEME
    // ================================

    themeBtn.addEventListener(
        "click",
        () => {


            document.body.classList.toggle(
                "light-theme"
            );


            const isLight =
                document.body.classList.contains(
                    "light-theme"
                );



            // Save theme

            localStorage.setItem(
                "portfolio-theme",
                isLight
                    ? "light"
                    : "dark"
            );



            // Change icon

            if (themeIcon) {

                if (isLight) {

                    themeIcon.classList.remove(
                        "fa-moon"
                    );

                    themeIcon.classList.add(
                        "fa-sun"
                    );

                } else {

                    themeIcon.classList.remove(
                        "fa-sun"
                    );

                    themeIcon.classList.add(
                        "fa-moon"
                    );

                }

            }

        }
    );

}



// ================================
// ACTIVE NAV LINK
// ================================

function setupActiveNav() {

    const links =
        document.querySelectorAll(
            ".nav-menu a"
        );


    if (!links.length) return;


    const currentPage =
        window.location.pathname
            .split("/")
            .pop();



    links.forEach(link => {

        const href =
            link.getAttribute("href");


        if (!href) return;


        const linkPage =
            href.split("/").pop();



        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}



// ================================
// BACK TO TOP
// ================================

function setupBackToTop() {

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    if (!backToTop) return;



    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 400) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );

            }

        }
    );



    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}

