/*Carousel */

//Init variables
//Use . here
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carouselBtn--right');
const prevBtn = document.querySelector('.carouselBtn--left');
const dotsNavs = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNavs.children);

//Get width of slides to find out how much to move 
const slideWidth = slides[0].getBoundingClientRect().width;

//Arrange slides to be next to each other using absolute positioning
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);


//Evals current slide, gets target slide and moves to target slide
const moveToSlide = (track, curSlide, targetSlide) => {
    //Move to the slide
    track.style.transform = 'translateX(-' + targetSlide.style.left; + ')';
    //reassign current slide
    //Don't add . when looking in classList
    curSlide.classList.remove('cur-slide');
    targetSlide.classList.add('cur-slide');
}

const updateDots = (curDot, targetDot) => {
    //Change dot color
    curDot.classList.remove('cur-slide');
    targetDot.classList.add('cur-slide');
}

const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
    if (targetIndex === 0) {
        prevBtn.classList.add('is-hidden');
        nextBtn.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        prevBtn.classList.remove('is-hidden');
        nextBtn.classList.add('is-hidden');
    } else {
        prevBtn.classList.remove('is-hidden');
        nextBtn.classList.remove('is-hidden');
    }
}

//When click right, move slides to right
nextBtn.addEventListener('click', e => {
    //What slide are we on?
    //Look through track to find current slide
    const curSlide = track.querySelector('.cur-slide');
    const nextSlide = curSlide.nextElementSibling;
    const curDot = dotsNavs.querySelector('.cur-slide');
    const nextDot = curDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    moveToSlide(track, curSlide, nextSlide);
    updateDots(curDot, nextDot);
    hideShowArrows(slides, prevBtn, nextBtn, nextIndex);
});

//When click left, move slides to left
prevBtn.addEventListener('click', e => {
    //What slide are we on?
    //Look through track to find current slide
    const curSlide = track.querySelector('.cur-slide');
    const prevSlide = curSlide.previousElementSibling;
    const curDot = dotsNavs.querySelector('.cur-slide');
    const prevDot = curDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    moveToSlide(track, curSlide, prevSlide);
    updateDots(curDot, prevDot);
    hideShowArrows(slides, prevBtn, nextBtn, prevIndex);
});

//When click nav indicators, move to the clicked slide
dotsNavs.addEventListener('click', e => {
    //what indicator was clicked
    const targetDot = e.target.closest('button');//Look for buttons only
    //null if nav clicked
    if (!targetDot) return;

    const curSlide = track.querySelector('.cur-slide');
    const curDot = dotsNavs.querySelector('.cur-slide');
    //Returns index # of clicked indicator dot
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, curSlide,  targetSlide);
    updateDots(curDot, targetDot);
    hideShowArrows(slides, prevBtn, nextBtn, targetIndex);
});

/* Navigation response */

const nav = document.querySelector('.navigation-container');
const navBtns = Array.from(nav.children);
const headers = document.querySelectorAll('.header');
const welcome = document.querySelector('.welcome');
//console.log(headers);

const updateNav = function(curNavBtn, clickedNav) {
    curNavBtn.classList.remove('current');
    clickedNav.classList.add('current');
}

const isInViewPort = function(header) {
    const rect = header.getBoundingClientRect();
    return (
        rect.top >=0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

//Respond based on clicks
nav.addEventListener('click', e => {
    //Which one was clicked
    const targetNav = e.target.closest('li');
    //null if ul clicked
    if (!targetNav) return;

    const curNavBtn = nav.querySelector('.current');
    //Get index of clicked nav
    const targetNavIndex = navBtns.findIndex(nav => nav === targetNav);
    const clickedNav = navBtns[targetNavIndex].firstChild;

    updateNav(curNavBtn, clickedNav);
});

//Respond based on scroll position
document.addEventListener('scroll', e  => {
    //current nav
    const curNavBtn = nav.querySelector('.current');
    //Update based on whats in view
    if (isInViewPort(headers[0])){
        updateNav(curNavBtn, navBtns[1].firstChild);
    } else if (isInViewPort(headers[1])){
        updateNav(curNavBtn, navBtns[2].firstChild);
    } else if (isInViewPort(headers[2])){
        updateNav(curNavBtn, navBtns[3].firstChild);
    }
});
