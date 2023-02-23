"use strict"
//캐러셀 호버 
const carouselover = document.querySelector(".carousel")
carouselover.addEventListener("mouseover",()=>{
    document.querySelector(".prev").style.display="block";
    document.querySelector(".next").style.display="block";
});
carouselover.addEventListener("mouseout",()=>{
  document.querySelector(".prev").style.display="none";
  document.querySelector(".next").style.display="none";
});

//캐러셀
const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelector('.content-box');
const carouselItem = document.querySelectorAll('.item-box');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const itemWidth = (carouselItem[0].offsetWidth)*6 + parseFloat(getComputedStyle(carouselItem[0]).marginRight)*6;
const itemsPerView = Math.floor(carousel.offsetWidth / itemWidth);
let currentIndex = 0;


prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      carouselItems.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
  };
}) ;

nextBtn.addEventListener('click', () => {
  if (currentIndex < carouselItem.length - itemsPerView) {
    currentIndex++;
    carouselItems.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
  }
});

window.addEventListener('resize', () => {
  currentIndex = 0;
  itemsPerView = Math.floor(carousel.offsetWidth / itemWidth);
  carouselItems.style.transform = `translateX(0)`;
});