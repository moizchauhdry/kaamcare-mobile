let isPasswordCorrect = false;
const checkboxImg = '<img src="https://stkmcrappsdevplc.blob.core.windows.net/auth/src/images/checkbox.svg" alt="check" />';

function fixStepContent(stepNumber) {
  const step = document.querySelector('p.step');
  step.innerHTML = `${stepNumber}/3`;
}

function replaceTitleContent() {
  const parent = document.querySelector('div#api');
  const heading = document.createElement('div')
  heading.classList.add('heading');
  const title = document.createElement('h1');
  const step = document.createElement('p');
  step.classList.add('step', 'step-text');
  title.role = 'heading';
  title.innerHTML = 'Reset Password';
  heading.appendChild(step)
  heading.appendChild(title)

  parent.insertBefore(heading, parent.firstChild);

  fixStepContent(3);
}

function checkContinueButton() {
  const continueButton = document.querySelector('button#continue');

  if (isPasswordCorrect) {
    continueButton.disabled = false;
    continueButton.setAttribute('aria-disabled', false);
  } else {
    continueButton.disabled = true;
    continueButton.setAttribute('aria-disabled', true);
  }
}

function addPasswordInfo() {
  const inputPassword = document.querySelector('input#newPassword');
  const attrList = document.querySelector('div#attributeList');
  const passwordLetters = document.createElement('p');
  passwordLetters.innerText = 'Passwords must be at least 8 characters';
  passwordLetters.classList.add('password-checker-text');
  const passwordUpperAndLower = document.createElement('p');
  passwordUpperAndLower.innerText = 'Uppercase & lowercase letters';
  passwordUpperAndLower.classList.add('password-checker-text');
  const passwordNumber = document.createElement('p')
  passwordNumber.innerText = 'At least one number';
  passwordNumber.classList.add('password-checker-text');
  const passwordSymbol = document.createElement('p');
  passwordSymbol.innerText = 'At least one symbol';
  passwordSymbol.classList.add('password-checker-text');

  const lettersChecker = document.createElement('span');
  lettersChecker.classList.add('password-checker');
  lettersChecker.innerHTML = '-';
  const upperAndLowerChecker = document.createElement('span')
  upperAndLowerChecker.classList.add('password-checker');
  upperAndLowerChecker.innerHTML = '-';
  const numbersChecker = document.createElement('span')
  numbersChecker.classList.add('password-checker');
  numbersChecker.innerHTML = '-';
  const symbolChecker = document.createElement('span')
  symbolChecker.classList.add('password-checker');
  symbolChecker.innerHTML = '-';

  const lettersWrapper = document.createElement('div');
  lettersWrapper.classList.add('password-checker-wrapper');
  lettersWrapper.appendChild(lettersChecker);
  lettersWrapper.appendChild(passwordLetters);

  const upperAndLowerWrapper = document.createElement('div');
  upperAndLowerWrapper.classList.add('password-checker-wrapper');
  upperAndLowerWrapper.appendChild(upperAndLowerChecker);
  upperAndLowerWrapper.appendChild(passwordUpperAndLower);

  const numberWrapper = document.createElement('div');
  numberWrapper.classList.add('password-checker-wrapper');
  numberWrapper.appendChild(numbersChecker);
  numberWrapper.appendChild(passwordNumber);

  const symbolWrapper = document.createElement('div');
  symbolWrapper.classList.add('password-checker-wrapper');
  symbolWrapper.appendChild(symbolChecker);
  symbolWrapper.appendChild(passwordSymbol);

  const wrapper = document.createElement('div');
  wrapper.classList.add('password-checker-container');
  wrapper.appendChild(lettersWrapper);
  wrapper.appendChild(upperAndLowerWrapper);
  wrapper.appendChild(numberWrapper);
  wrapper.appendChild(symbolWrapper);

  attrList.appendChild(wrapper);

  inputPassword.addEventListener('input', (e) => {
    const value = e.target.value;
    const numberReg = /(?=.*[0-9])/;
    const upperAndLower = /(?=.*[a-z])(?=.*[A-Z])/;
    const symbolReg = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const long = value.length >= 8 && value.length < 64;
    const hasNumber = numberReg.test(value);
    const hasUpperAndLower = upperAndLower.test(value);
    const hasSymbol = symbolReg.test(value);

    passwordCheck(hasNumber, passwordNumber, numbersChecker);
    passwordCheck(hasUpperAndLower, passwordUpperAndLower, upperAndLowerChecker);
    passwordCheck(long, passwordLetters, lettersChecker);
    passwordCheck(hasSymbol, passwordSymbol, symbolChecker);

    isPasswordCorrect = long && hasNumber && hasUpperAndLower && hasSymbol;

    checkContinueButton();
  });
}

function passwordCheck(checker, text, checkbox) {
  if (checker) {
    text.classList.add('password-checker-text-active');
    checkbox.innerHTML = checkboxImg;
  } else {
    if (text.classList.contains('password-checker-text-active')) {
      text.classList.remove('password-checker-text-active');
      checkbox.innerHTML = '-'
    }
  }
}

function fixCancelButton() {
  const cancelButton = document.querySelector('button#cancel');

  cancelButton.innerText = '';
  cancelButton.style.display = 'none!important';
}

function fixIntroText() {
  const text = document.querySelector('.intro p');
  text.innerHTML = 'Email address has been verified. You can now change the password.'
}

function fixConfirmInput() {
  const label = document.querySelector('#reenterPassword_label');
  label.innerHTML = 'Repeat new password';
  const input = document.querySelector('#reenterPassword');
  input.placeholder = 'Repeat new password';
}

function changeContinueButton() {
  const continueButton = document.querySelector('button#continue');
  continueButton.innerHTML = 'Reset password';
}

function app() {
  fixCancelButton();
  fixIntroText();
  fixConfirmInput();
  replaceTitleContent();
  addPasswordInfo();
  checkContinueButton();
  changeContinueButton();
}

app();