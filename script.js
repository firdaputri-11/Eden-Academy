/* =========================================================
   EDEN ACADEMY
   MAIN JAVASCRIPT
   TANPA DARK MODE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENT
    ===================================================== */

    const body = document.body;

    const header = document.getElementById("header");
    const navbar = document.getElementById("navbar");
    const menuButton = document.getElementById("menuButton");

    const scrollProgress =
        document.getElementById("scrollProgress");

    const backTop =
        document.getElementById("backTop");

    const toast =
        document.getElementById("toast");


    /* =====================================================
       MODAL
    ===================================================== */

    const contentModal =
        document.getElementById("contentModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalKicker =
        document.getElementById("modalKicker");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalText =
        document.getElementById("modalText");


    /* =====================================================
       LIGHTBOX
    ===================================================== */

    const lightbox =
        document.getElementById("lightbox");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxTitle =
        document.getElementById("lightboxTitle");



    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        if (!toast) {
            return;
        }

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(window.edenToastTimer);

        window.edenToastTimer =
            setTimeout(function () {

                toast.classList.remove("show");

            }, 2500);

    }



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuButton && navbar) {

        menuButton.addEventListener(
            "click",
            function () {

                navbar.classList.toggle("show");

                const opened =
                    navbar.classList.contains("show");

                menuButton.textContent =
                    opened ? "×" : "☰";

                menuButton.setAttribute(
                    "aria-expanded",
                    opened ? "true" : "false"
                );

            }
        );


        const mobileNavLinks =
            document.querySelectorAll(".nav-link");


        mobileNavLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navbar.classList.remove("show");

                        menuButton.textContent = "☰";

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            }
        );

    }



    /* =====================================================
       HEADER
    ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }



    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    function updateScrollProgress() {

        if (!scrollProgress) {
            return;
        }

        const scrollTop =
            window.scrollY;


        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (scrollHeight <= 0) {

            scrollProgress.style.width = "0%";

            return;

        }


        const progress =
            (scrollTop / scrollHeight) * 100;


        scrollProgress.style.width =
            progress + "%";

    }



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function updateBackTop() {

        if (!backTop) {
            return;
        }

        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    }


    if (backTop) {

        backTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }



   /* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const navLinks =
    document.querySelectorAll(".nav-link");


function setActiveNav(id) {

    navLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            href === "#" + id
        );

    });

}


/* Saat link navbar diklik */
navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        const targetID =
            this.getAttribute("href");

        if (!targetID || targetID === "#") {
            return;
        }

        setActiveNav(
            targetID.substring(1)
        );

    });

});


/* Saat posisi scroll berubah */
const sections =
    document.querySelectorAll("main section[id]");


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 200;

    let currentSection =
        sections.length
            ? sections[0].id
            : "beranda";


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop;

        if (
            scrollPosition >= sectionTop
        ) {

            currentSection =
                section.id;

        }

    });


    setActiveNav(currentSection);

}



    /* =====================================================
       ALL SCROLL EVENTS
    ===================================================== */

    window.addEventListener(
        "scroll",
        function () {

            updateHeader();
            updateScrollProgress();
            updateBackTop();
            updateActiveNavigation();

        },
        {
            passive: true
        }
    );


    updateHeader();
    updateScrollProgress();
    updateBackTop();
    updateActiveNavigation();



    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );


    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

    }



    /* =====================================================
       HERO IMAGE PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(".hero");


    const heroImage =
        document.querySelector(
            ".hero-media img"
        );


    if (hero && heroImage) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.innerWidth <= 850) {
                    return;
                }


                const rect =
                    hero.getBoundingClientRect();


                if (
                    rect.bottom < 0 ||
                    rect.top > window.innerHeight
                ) {
                    return;
                }


                const move =
                    window.scrollY * 0.035;


                heroImage.style.transform =
                    "scale(1.04) translateY(" +
                    move +
                    "px)";

            },
            {
                passive: true
            }
        );

    }



    /* =====================================================
       COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    function animateCounter(element) {

        const target =
            parseInt(
                element.dataset.counter,
                10
            );


        if (Number.isNaN(target)) {
            return;
        }


        let startTime = null;

        const duration = 1200;


        function count(currentTime) {

            if (!startTime) {
                startTime = currentTime;
            }


            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.floor(
                    target * eased
                );


            element.textContent =
                value;


            if (progress < 1) {

                requestAnimationFrame(
                    count
                );

            } else {

                element.textContent =
                    target;

            }

        }


        requestAnimationFrame(
            count
        );

    }


    if (counters.length) {

        if (
            "IntersectionObserver" in window
        ) {

            const counterObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    animateCounter(
                                        entry.target
                                    );

                                    counterObserver.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.5
                    }
                );


            counters.forEach(
                function (counter) {

                    counterObserver.observe(
                        counter
                    );

                }
            );


        } else {

            counters.forEach(
                function (counter) {

                    animateCounter(
                        counter
                    );

                }
            );

        }

    }



    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".magnetic"
        );


    magneticButtons.forEach(
        function (button) {

            button.addEventListener(
                "mousemove",
                function (event) {

                    if (
                        window.innerWidth <= 850
                    ) {
                        return;
                    }


                    const rect =
                        button.getBoundingClientRect();


                    const x =
                        event.clientX -
                        (
                            rect.left +
                            rect.width / 2
                        );


                    const y =
                        event.clientY -
                        (
                            rect.top +
                            rect.height / 2
                        );


                    button.style.transform =
                        "translate(" +
                        x * 0.06 +
                        "px, " +
                        y * 0.06 +
                        "px)";

                }
            );


            button.addEventListener(
                "mouseleave",
                function () {

                    button.style.transform =
                        "";

                }
            );

        }
    );



    /* =====================================================
       PROGRAM KEAHLIAN HOVER
    ===================================================== */

    const programCards =
        document.querySelectorAll(
            ".program-card"
        );


    programCards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    card.style.transform =
                        "translateY(-6px)";

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.style.transform =
                        "";

                }
            );

        }
    );



    /* =====================================================
       TEACHER SEARCH
    ===================================================== */

    const teacherSearch =
        document.getElementById(
            "teacherSearch"
        );


    const teacherFilter =
        document.getElementById(
            "teacherFilter"
        );


    const teacherGrid =
        document.getElementById(
            "teacherGrid"
        );


    const teacherEmpty =
        document.getElementById(
            "teacherEmpty"
        );


    const teacherCards =
        document.querySelectorAll(
            ".teacher-card"
        );


    function filterTeachers() {

        if (!teacherCards.length) {
            return;
        }


        const searchValue =
            teacherSearch
                ? teacherSearch.value
                    .toLowerCase()
                    .trim()
                : "";


        const filterValue =
            teacherFilter
                ? teacherFilter.value
                    .toLowerCase()
                    .trim()
                : "all";


        let visibleTeachers = 0;


        teacherCards.forEach(
            function (card) {

                const name =
                    (
                        card.dataset.name ||
                        ""
                    )
                    .toLowerCase()
                    .trim();


                const category =
                    (
                        card.dataset.category ||
                        ""
                    )
                    .toLowerCase()
                    .trim();


                const fullText =
                    (
                        card.textContent ||
                        ""
                    )
                    .toLowerCase();


                const searchMatch =
                    searchValue === "" ||
                    name.includes(
                        searchValue
                    ) ||
                    fullText.includes(
                        searchValue
                    );


                const filterMatch =
                    filterValue === "all" ||
                    category === filterValue;


                if (
                    searchMatch &&
                    filterMatch
                ) {

                    card.style.display =
                        "";

                    visibleTeachers++;

                } else {

                    card.style.display =
                        "none";

                }

            }
        );


        if (teacherEmpty) {

            teacherEmpty.style.display =
                visibleTeachers === 0
                    ? "block"
                    : "none";

        }

    }


    if (teacherSearch) {

        teacherSearch.addEventListener(
            "input",
            filterTeachers
        );

    }


    if (teacherFilter) {

        teacherFilter.addEventListener(
            "change",
            filterTeachers
        );

    }


    filterTeachers();



    /* =====================================================
       CONTENT MODAL
    ===================================================== */

    function openModal(
        title,
        text,
        kicker
    ) {

        if (!contentModal) {
            return;
        }


        if (modalKicker) {

            modalKicker.textContent =
                kicker ||
                "EDEN ACADEMY";

        }


        if (modalTitle) {

            modalTitle.textContent =
                title;

        }


        if (modalText) {

            modalText.textContent =
                text;

        }


        contentModal.classList.add(
            "show"
        );


        contentModal.setAttribute(
            "aria-hidden",
            "false"
        );


        body.classList.add(
            "modal-open"
        );

    }



    function closeModal() {

        if (!contentModal) {
            return;
        }


        contentModal.classList.remove(
            "show"
        );


        contentModal.setAttribute(
            "aria-hidden",
            "true"
        );


        body.classList.remove(
            "modal-open"
        );

    }



    /* =====================================================
       PROGRAM KEAHLIAN MODAL
    ===================================================== */

    const programButtons =
        document.querySelectorAll(
            ".program-button"
        );


    programButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const title =
                        button.dataset.title ||
                        "Program Keahlian";


                    const text =
                        button.dataset.text ||
                        "Informasi program keahlian Eden Academy.";


                    openModal(
                        title,
                        text,
                        "PROGRAM KEAHLIAN"
                    );

                }
            );

        }
    );



    /* =====================================================
       PROGRAM SEKOLAH MODAL
    ===================================================== */

    const schoolPrograms =
        document.querySelectorAll(
            ".school-program"
        );


    schoolPrograms.forEach(
        function (program) {

            program.addEventListener(
                "click",
                function () {

                    const title =
                        program.dataset.title ||
                        "Program Sekolah";


                    const text =
                        program.dataset.text ||
                        "Informasi program sekolah Eden Academy.";


                    openModal(
                        title,
                        text,
                        "PROGRAM SEKOLAH"
                    );

                }
            );

        }
    );



    /* =====================================================
       NEWS MODAL
    ===================================================== */

    const newsButtons =
        document.querySelectorAll(
            ".news-more"
        );


    newsButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const card =
                        button.closest(
                            ".news-card"
                        );


                    if (!card) {
                        return;
                    }


                    const titleElement =
                        card.querySelector(
                            "h3"
                        );


                    const textElement =
                        card.querySelector(
                            ".news-content p"
                        );


                    const title =
                        titleElement
                            ? titleElement.textContent.trim()
                            : "Berita Sekolah";


                    const text =
                        textElement
                            ? textElement.textContent.trim()
                            : "Informasi berita Eden Academy.";


                    openModal(
                        title,
                        text,
                        "BERITA SEKOLAH"
                    );

                }
            );

        }
    );



    /* =====================================================
       MODAL CLOSE
    ===================================================== */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (contentModal) {

        const backdrop =
            contentModal.querySelector(
                ".modal-backdrop"
            );


        if (backdrop) {

            backdrop.addEventListener(
                "click",
                closeModal
            );

        }

    }



    /* =====================================================
       GALLERY FILTER
    ===================================================== */

    const galleryFilters =
        document.querySelectorAll(
            ".gallery-filter"
        );


    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    galleryFilters.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    galleryFilters.forEach(
                        function (filter) {

                            filter.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const selectedCategory =
                        button.dataset.filter ||
                        "all";


                    galleryItems.forEach(
                        function (item) {

                            const category =
                                item.dataset.category ||
                                "";


                            if (
                                selectedCategory === "all" ||
                                selectedCategory === category
                            ) {

                                item.classList.remove(
                                    "is-hidden"
                                );

                            } else {

                                item.classList.add(
                                    "is-hidden"
                                );

                            }

                        }
                    );


                    refreshGallery();

                }
            );

        }
    );



    /* =====================================================
       LIGHTBOX
    ===================================================== */

    let galleryImages = [];

    let currentGalleryIndex = 0;


    function refreshGallery() {

        galleryImages =
            Array.from(
                document.querySelectorAll(
                    ".gallery-item:not(.is-hidden) img"
                )
            );

    }


    refreshGallery();



    function openLightbox(index) {

        refreshGallery();


        if (
            !lightbox ||
            !lightboxImage ||
            !galleryImages.length
        ) {

            return;

        }


        currentGalleryIndex =
            Math.max(
                0,
                Math.min(
                    index,
                    galleryImages.length - 1
                )
            );


        updateLightbox();


        lightbox.classList.add(
            "show"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        body.classList.add(
            "modal-open"
        );

    }



    function updateLightbox() {

        if (!galleryImages.length) {
            return;
        }


        const image =
            galleryImages[
                currentGalleryIndex
            ];


        if (!image) {
            return;
        }


        lightboxImage.src =
            image.src;


        lightboxImage.alt =
            image.alt || "";


        const item =
            image.closest(
                ".gallery-item"
            );


        const caption =
            item?.querySelector(
                "figcaption"
            );


        if (lightboxTitle) {

            lightboxTitle.textContent =
                caption
                    ? caption.textContent.trim()
                    : image.alt || "";

        }

    }



    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "show"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        body.classList.remove(
            "modal-open"
        );

    }



    galleryItems.forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    refreshGallery();


                    const image =
                        item.querySelector(
                            "img"
                        );


                    if (!image) {
                        return;
                    }


                    const index =
                        galleryImages.indexOf(
                            image
                        );


                    if (index !== -1) {

                        openLightbox(
                            index
                        );

                    }

                }
            );

        }
    );



    /* =====================================================
       LIGHTBOX BUTTONS
    ===================================================== */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                refreshGallery();


                if (!galleryImages.length) {
                    return;
                }


                currentGalleryIndex =
                    (
                        currentGalleryIndex -
                        1 +
                        galleryImages.length
                    ) %
                    galleryImages.length;


                updateLightbox();

            }
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                refreshGallery();


                if (!galleryImages.length) {
                    return;
                }


                currentGalleryIndex =
                    (
                        currentGalleryIndex +
                        1
                    ) %
                    galleryImages.length;


                updateLightbox();

            }
        );

    }



    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                closeModal();
                closeLightbox();

            }


            if (
                lightbox &&
                lightbox.classList.contains(
                    "show"
                )
            ) {

                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    lightboxPrev?.click();

                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    lightboxNext?.click();

                }

            }

        }
    );



   /* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetID = this.getAttribute("href");

        if (!targetID || targetID === "#") {
            return;
        }

        const target = document.querySelector(targetID);

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerHeight = header
            ? header.offsetHeight
            : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            10;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

        /* Tutup menu HP */
        if (navbar) {
            navbar.classList.remove("show");
        }

        if (menuButton) {
            menuButton.textContent = "☰";

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    });

});


    /* =====================================================
       ESCAPE MOBILE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                navbar
            ) {

                navbar.classList.remove(
                    "show"
                );


                if (menuButton) {

                    menuButton.textContent =
                        "☰";


                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );



    /* =====================================================
       IMAGE ERROR
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(
            function (image) {

                image.addEventListener(
                    "error",
                    function () {

                        image.style.background =
                            "#d9dce0";

                    }
                );

            }
        );



    /* =====================================================
       DONE
    ===================================================== */

    console.log(
        "Eden Academy JavaScript aktif — tanpa dark mode."
    );

});