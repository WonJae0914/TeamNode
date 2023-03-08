const signupForm = document.querySelector("#signupform");
const idField = document.querySelector("#id");
const iderror = document.querySelector("#iderror");
const pwField = document.querySelector("#pw");
const pwerror = document.querySelector(".pwerror")
const emailField = document.querySelector("#email");
const emailerror = document.querySelector("#emailerror");
const pwChk = document.querySelector("#pwChk");
const pwChkText = document.querySelector("#pwchktext");
const yearSelect = document.querySelector('#year');
const monthSelect = document.querySelector('#month');
const daySelect = document.querySelector('#day');
const isAgreedInput = document.querySelector('#gridCheck1');
const pwToggle = document.querySelector('.pw_btn');


idField.addEventListener('keyup', async function(event) {
  event.preventDefault();
  const id = idField.value;
  const regex = /^[a-zA-Z0-9]+$/;
  const isValid = regex.test(id);

  if (id.length < 4 || id.length > 15) {
    iderror.innerText = 'ID는 4자리 이상 15자리 이하이어야 합니다.';
    iderror.style.color = 'red';
  } else if (!isValid) {
    iderror.innerText = 'ID는 공백을 제외한 영문 대소문자와 숫자로만 작성이 가능합니다.';
    iderror.style.color = 'red';
  } else {
    const response = await fetch(`/checkDuplicateId/${id}`);
    const isDuplicate = await response.json();
    if (isDuplicate) {
      iderror.innerText = '이미 사용 중인 ID입니다.';
      iderror.style.color = 'red';
    } else {
      iderror.innerText = '사용가능한 ID입니다';
      iderror.style.color = 'green';
    }
  }
});

pwField.addEventListener('keyup', function(event) {
  event.preventDefault();
  const pw = event.target.value;
  const regex = /(?=.*[a-zA-Z])(?=.*\d)(?=.*[&!@#$%^*+=_()-])/;
  const isValid = regex.test(pw);

  if (pw.length < 8 || pw.length > 15) {
    pwerror.innerText = 'password는 영문, 숫자, 특수문자가 포함된 8자리 이상 15자리 이하이어야 합니다.';
    pwerror.style.color = 'red';
  } else if(!isValid) {
    pwerror.innerText = 'password는 영문, 숫자, 특수문자가 포함된 8자리 이상 15자리 이하이어야 합니다.';
    pwerror.style.color = 'red';
  } else if(/\s/.test(pw)) {
    pwerror.innerText = 'password에는 공백이 포함될 수 없습니다.';
    pwerror.style.color = 'red'; 
  } else {
    pwerror.innerText = '사용가능한 비밀번호입니다';
    pwerror.style.color = 'green';
  }
});

pwToggle.addEventListener('click', function() {
  if (pwField.type === 'password') {
    pwField.type = 'text';
    pwToggle.innerHTML = '<i class="fa fa-eye-slash"></i>';
  } else {
    pwField.type = 'password';
    pwToggle.innerHTML = '<i class="fa fa-eye"></i>';
  }
});

pwToggle.addEventListener('mouseleave', function() {
  pwField.type = 'password';
  pwToggle.innerHTML = '<i class="fa fa-eye"></i>';
});

function validatePassword(event) {
  if (pwField.value !== pwChk.value) {
    pwChkText.innerText = '비밀번호가 일치하지 않습니다.';
    pwChkText.style.color = 'red';
    event.preventDefault();
  } else {
    pwChkText.innerText = '비밀번호가 일치합니다.';
    pwChkText.style.color = 'green';
  }
}
pwChk.addEventListener('keyup', validatePassword);



emailField.addEventListener('keyup', async function(event) {
    event.preventDefault();
    const email = emailField.value;
    const regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    const isValid = regex.test(email);
    
    if (!isValid) {
    emailerror.innerText = '유효한 이메일 주소를 입력해주세요.';
    emailerror.style.color = 'red';
    } else {
    const response = await fetch(`/checkDuplicateEmail/${email}`);
    const isDuplicate = await response.json();
    if (isDuplicate) {
    emailerror.innerText = '이미 사용 중인 이메일입니다.';
    emailerror.style.color = 'red';
    } else {
    emailerror.innerText = '사용가능한 이메일입니다.';
    emailerror.style.color = 'green';
    }
    }
    });

function validateDate(event) {
  const year = yearSelect.value;
  const month = monthSelect.value;
  const day = daySelect.value;

  // Check if all fields have been selected
  if (year === '태어난 해') {
  dateerror.innerText = '태어난 달과 날짜를 선택해주세요.';
  dateerror.style.color = 'red';
  return;
} else if (month === '태어난 달') {
  dateerror.innerText = '태어난 달을 선택해주세요.';
  dateerror.style.color = 'red';
  return;
} else if (day === '태어난 날짜') {
  dateerror.innerText = '태어난 날짜를 선택해주세요.';
  dateerror.style.color = 'red';
  return;
}

  const date = new Date(year, month - 1, day);
  const currentDate = new Date();

  if (currentDate.getFullYear() - date.getFullYear() < 18) {
    dateerror.innerText = '만 18세 미만의 사용자는 가입할 수 없습니다.';
    dateerror.style.color = 'red';
    event.preventDefault();
  } else {
    dateerror.innerText = '';
  }
}

yearSelect.addEventListener('change', validateDate);
monthSelect.addEventListener('change', validateDate);
daySelect.addEventListener('change', validateDate);


function validateForm(event) {
validatePassword();
validateDate();

if (!isAgreedInput.checked) {
alert('이용약관에 동의해주세요.');
event.preventDefault();
}}

signupForm.addEventListener('submit', validateForm);