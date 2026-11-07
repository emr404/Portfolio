console.log(`
        IF YOU'RE LOOKING HERE THEN YOU AGREE THAT MAN UTD IS THE BEST TEAM IN THE WORLD =))


    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⣴⡄⠀⠀⣰⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⣀⠀⢠⠀⠐⢶⣾⣿⣷⣶⣾⣿⣷⣶⠂⣰⡄⠀⣴⡄⠀⣴⡄
    ⠀⠀⠀⣾⣿⣿⣿⡄⠀⠈⢻⣿⡈⣻⣟⢁⣿⠃⠈⢻⡟⠈⣿⡟⠀⣿⡏
    ⠹⣶⣾⣿⡿⢿⣿⣷⡀⠀⠈⢻⣿⣿⣿⣿⣿⠀⠀⢸⣇⣀⣿⣇⣀⣿⡇
    ⠀⡿⠋⠁⠀⢀⣿⣿⣿⡆⢀⣼⣿⡅⢨⣿⣿⣄⠀⠸⠿⠿⣿⡿⠿⠿⠇
    ⠀⠀⠀⠀⠈⠛⣿⣿⡟⠀⣿⣿⣿⣿⣿⣿⣿⡿⠓⢀⣀⣠⣿⡇⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⣿⣿⠇⠀⢻⣿⣿⣿⣿⣿⣿⣷⣾⠿⠿⢿⣿⣿⡆⠀⠀
    ⠀⠀⠀⠀⠀⠀⣿⣿⡆⠀⠀⣽⣿⣿⣿⣿⣿⣿⣿⣦⣀⣀⣿⣿⡟⠀⠀
    ⠀⠀⠀⠀⠀⠀⣿⣿⣇⠀⣸⣿⣿⣿⣿⣿⣿⡿⠛⠿⣿⣿⣿⣿⡇⠀⠀
    ⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⣀⡀⠀⠉⣿⡏⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⣿⡇⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠘⠿⠿⠿⣿⣿⣿⡟⢿⣿⣿⣿⣿⣿⣷ ⣿⡇⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⡄⠈⢿⣿⣿⣿⡏⠀⣿⡇⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⡄⠀⠙⢿⣿⡇⠀⣿⡇⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠟⠁⠀⠀⠀⠙⠿⠀  ⣿⡇⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠿⠟⠃⠀
    #GGMU

`);
const carousel = document.querySelector('.projectCarousel');

if (carousel) {
    const slides = [...carousel.querySelectorAll('.project')];
    const controls = document.querySelector('.carouselControls');
    const previous = controls.querySelector('.carouselPrevious');
    const next = controls.querySelector('.carouselNext');
    const position = controls.querySelector('.carouselPosition');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    slides.forEach((slide, index) => {
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'slide');
        slide.setAttribute('aria-label', `${index + 1} of ${slides.length}: ${slide.querySelector('h2').textContent}`);
    });

    const step = () => slides[1].offsetLeft - slides[0].offsetLeft;
    const currentIndex = () => Math.round(carousel.scrollLeft / step());

    function updateControls() {
        const first = currentIndex() + 1;
        const visible = Math.max(1, Math.round(carousel.clientWidth / step()));
        const last = Math.min(slides.length, first + visible - 1);
        const label = first === last ? `${first}` : `${first}–${last}`;
        const text = `${label} of ${slides.length}`;

        if (position.textContent !== text) position.textContent = text;
        previous.disabled = carousel.scrollLeft <= 1;
        next.disabled = carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 1;
    }

    function goTo(index) {
        carousel.scrollTo({
            left: Math.max(0, Math.min(slides.length - 1, index)) * step(),
            behavior: reducedMotion.matches ? 'instant' : 'smooth',
        });
    }

    previous.addEventListener('click', () => goTo(currentIndex() - 1));
    next.addEventListener('click', () => goTo(currentIndex() + 1));
    carousel.addEventListener('scroll', updateControls, { passive: true });
    carousel.addEventListener('keydown', (event) => {
        if (event.target !== carousel) return;
        const destinations = {
            ArrowLeft: currentIndex() - 1,
            ArrowRight: currentIndex() + 1,
            Home: 0,
            End: slides.length - 1,
        };
        if (!(event.key in destinations)) return;
        event.preventDefault();
        goTo(destinations[event.key]);
    });
    new ResizeObserver(updateControls).observe(carousel);
    controls.hidden = false;
    updateControls();
}
