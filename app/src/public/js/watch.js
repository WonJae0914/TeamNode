
///////////////// 비디오 플레이어 시작 ////////////////////

// 비디오 요소 참조
const video = document.querySelector('.player');

// 컨트롤러 요소 참조
const playButton = document.querySelector('.play-button');
const pauseButton = document.querySelector('.pause-button');
const progressContainer = document.querySelector('.progress-container');
const progressBar = document.querySelector('.progress-bar');
const currentTime = document.querySelector('.current-time');
const totalTime = document.querySelector('.total-time');
const volumeButton = document.querySelector('.volume-button');
const volumeBar = document.querySelector('.volume-bar');
const fullscreenButton = document.querySelector('.fullscreen-button');

// 플레이/일시정지 버튼 클릭 이벤트 핸들러
playButton.addEventListener('click', () => {
video.play();
playButton.style.display = 'none';
pauseButton.style.display = 'block';
});

pauseButton.addEventListener('click', () => {
video.pause();
pauseButton.style.display = 'none';
playButton.style.display = 'block';
});

// 비디오 로딩 완료 이벤트 핸들러
video.addEventListener('loadedmetadata', () => {
// 비디오 총 재생 시간을 표시
const duration = video.duration;
const totalMinutes = Math.floor(duration / 60);
const totalSeconds = Math.floor(duration % 60).toString().padStart(2, '0');
totalTime.textContent = `${totalMinutes}:${totalSeconds}`;
});

// 비디오 재생 중 이벤트 핸들러
video.addEventListener('timeupdate', () => {
// 비디오 재생 시간을 표시
const currentTimeValue = video.currentTime;
const currentMinutes = Math.floor(currentTimeValue / 60);
const currentSeconds = Math.floor(currentTimeValue % 60).toString().padStart(2, '0');
currentTime.textContent = `${currentMinutes}:${currentSeconds}`;

// 프로그레스 바 업데이트
const progressPercent = (currentTimeValue / video.duration) * 100;
progressBar.style.width = `${progressPercent}%`;
});

// 프로그레스 바 클릭 이벤트 핸들러
progressContainer.addEventListener('click', (e) => {
const clickX = e.offsetX;
const containerWidth = progressContainer.clientWidth;
const progressPercent = (clickX / containerWidth) * 100;
const duration = video.duration;
const newTime = (progressPercent * duration) / 100;
video.currentTime = newTime;
});

// 볼륨 버튼 클릭 이벤트 핸들러
volumeButton.addEventListener('click', () => {
if (video.muted) {
video.muted = false;
volumeButton.textContent = '🔊';
volumeBar.value = video.volume;
} else {
video.muted = true;
volumeButton.textContent = '🔇';
volumeBar.value = 0;
}
});

// 볼륨 바 변경 이벤트 핸들러
volumeBar.addEventListener('input', () => {
video.volume = volumeBar.value;
if (volumeBar.value == 0) {
video.muted = true;
volumeButton.textContent = '🔇';
} else {
video.muted = false;
volumeButton.textContent = '🔊';
}
});

// 전체화면 버튼 클릭 이벤트 핸들러
fullscreenButton.addEventListener('click', () => {
    if (document.fullscreenElement) {
    document.exitFullscreen();
    fullscreenButton.textContent = '🔍';
    } else {
    video.requestFullscreen();
    fullscreenButton.textContent = '❌';
    }
    });

///////////////// 비디오 플레이어 끝 ////////////////////

///////////////// 영화 정보 ////////////////////////////

const bookmark = document.querySelector(".fa-bookmark");
const title = document.querySelector("#movie").dataset.title;

function bookmarkHandler(){
    console.log(title);
    $.ajax({
      type : "post",
      url : "/bookmark?="+title,
      data : { 제목 : title },
      success : function(res){
        if(res!==null){
          bookmark.classList.toggle("fa-solid");
        }
      },
    })
    
    
    
}

bookmark.addEventListener("click", bookmarkHandler);

const stars = document.querySelectorAll('.star-rating input[type="radio"]');
const submitBtn = document.getElementById('submit-btn');

let rating;

stars.forEach((star) => {
  star.addEventListener('click', () => {
    rating = star.value;
  });
});

submitBtn.addEventListener('click', () => {
  if (!rating) {
    alert('Please select a rating!');
    return;
  }

  // Send rating to server here
  console.log(`User rated ${rating} stars.`);
});

