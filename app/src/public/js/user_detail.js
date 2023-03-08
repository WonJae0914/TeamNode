const detailForm = document.querySelector(".userdetailform");
const yearSelect = document.querySelector('#year');

let isUnder18Selected = false;

function validateDate(event) {
  const year = yearSelect.value;
  const age = new Date().getFullYear() - year;
  if (age < 18) {
    window.alert('18세 미만으로는 수정 불가합니다.');
    isUnder18Selected = true;
    event.preventDefault();
  } else {
    isUnder18Selected = false;
    // execute code to modify data here
  }
}

function validateForm(event) {
  validateDate(event);
}
detailForm.addEventListener('submit', validateForm);

document.getElementById("removeuser").addEventListener("click", (event) => {
  const confirmed = confirm("계정을 삭제하시겠습니까?");
  if (confirmed) {
    window.location.href = "/userpage/delete?confirmed=true";
  } else {
    event.preventDefault();
  }
});