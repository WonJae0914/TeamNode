"use strict"

// ------- 캐러셀 호버 구현 시작 -------
const carouselOver = document.querySelector(".carousel")

carouselOver.addEventListener("mouseover",()=>{
  document.querySelector(".prev").style.display="block";
  document.querySelector(".next").style.display="block";
});

carouselOver.addEventListener("mouseout",()=>{
  document.querySelector(".prev").style.display="none";
  document.querySelector(".next").style.display="none";
});
// ------ 캐러셀 호버 구현 끝 ------- 

// ------ 캐러셀 구현 시작 ------

// 필요한 DOM 요소 선택
const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelector('.content-box');
const carouselItem = document.querySelectorAll('.item-box');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// 항목 너비 및 뷰당 항목 계산 (컨텐츠 6개씩 넘어가도록 *6 하여 구현)
const itemWidth = (carouselItem[0].offsetWidth)*6 +
                   parseFloat(getComputedStyle(carouselItem[0]).marginRight)*6;
const itemsPerView = Math.floor(carousel.offsetWidth / itemWidth);

// 초기 인덱스 설정 (이동거리를 0으로 초기설정하는 것)
let currentIndex = 0;

// 이전 버튼 이벤트 리스너
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    carouselItems.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
  };
}) ;

//다음 버튼 이벤트 리스너
nextBtn.addEventListener('click', () => {
  if (currentIndex < carouselItem.length - itemsPerView) {
    currentIndex++;
    carouselItems.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
  }
});
// 창 크기 조정 이벤트 리스너
window.addEventListener('resize', () => {
  currentIndex = 0;
  itemsPerView = Math.floor(carousel.offsetWidth / itemWidth);
  carouselItems.style.transform = `translateX(0)`;
});

// ------ 캐러셀 구현 끝 ------