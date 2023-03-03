
const stars = document.querySelectorAll(".star");
const subStarbtn = document.querySelector(".subStar");
let rating=-1;

// 각 별 요소에 클릭이벤트 부여

stars.forEach(function (star) {
  star.addEventListener("click", setRating);
});
  function setRating(e) {
    // 클릭한 별의 요소를 가져옴
    const clickedStar = e.target;
    //클릭한 별 요소의 등급을 가져옴. 해당 요소의 지정한 값을 가져옴
    rating = clickedStar.getAttribute("data-rating");
    console.log(rating);
    // 모든 별 요소에 대해 반복
    stars.forEach(function (star) { // star = class명 star인 모든 span
       console.log(star)
       // 클릭한 별 이하의 모든 별에 대해
      if (star.getAttribute("data-rating") <= rating) {
        // 선택된 별 스타일을 적용
        star.classList.add("selected");
      } else {
        // 선택되지 않은 별 스타일을 제거
        star.classList.remove("selected");
      }
    });
  }

  subStarbtn.addEventListener("click", function(){
    $.ajax({
      method : "post",
      url : "/score?score=" + rating,
      success : function(){
        console.log("평점 반영됨");
      }
    })
  })


// ------------------ 컨텐츠 정보 시작 ------------------------

//////////// 북마크 시작 ////////////

// 북마크 참조 요소
const bookmark = document.querySelector(".rating-bookmark");
const title = document.querySelector("#movie").dataset.title;
const icon = document.querySelector(".fa-bookmark");
const bookmarkData = document.querySelector("#data1").dataset.bookmark;

// 북마크 비동기 함수 
function bookmarkHandler(){
    $.ajax({
      method : "post",
      url : "/bookmark?title="+title,
      data : { title : title },
      dataType : "json",
      success : function(res){
        if(res!==null){
          icon.classList.toggle("fa-solid");
        };
      },
    });
  };
// 북마크 클릭 이벤트 
bookmark.addEventListener("click", bookmarkHandler);

//////////// 북마크 끝 ////////////



// ------------------ 컨텐츠 정보 끝 ------------------------