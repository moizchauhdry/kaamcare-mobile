const checkboxImg = '<img src="https://stkmcrappsdevplc.blob.core.windows.net/auth/src/images/checkbox.svg" alt="check" />';
let isPasswordCorrect = false;
let isCheckboxCheck = false;

function fixStepContent(stepNumber) {
    const step = document.querySelector('p.step');
    step.innerHTML = `${stepNumber}/3`;
}

function fixLoginLink() {
    const loginLink = document.querySelector('#login-link');
    const link = window.location.href;

    if (link.includes('p=B2C_1_SignUpSignIn')) {
        loginLink.setAttribute('href', undefined);
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.history.back();
        });

        return;
    }

    const properLink = link.replace('p=B2C_1_SignUp', 'p=B2C_1_SignUpSignIn')
    loginLink.setAttribute('href', properLink);
}

function fixEmailInput() {
    const input = document.querySelector('input#email');
    input.placeholder = 'myemail@exampleemail.com'
}

function hideChangeEmailButton() {
    const button = document.querySelector('button.changeClaims');
    button.style = 'display: none!important';
}

function replaceTitleContent() {
    const parent = document.querySelector('div#api');
    const heading = document.createElement('div')
    heading.classList.add('heading');
    const title = document.createElement('h1');
    const step = document.createElement('p');
    step.classList.add('step', 'step-text');
    title.role = 'heading';
    title.innerHTML = 'Create your account';
    heading.appendChild(step)
    heading.appendChild(title)

    parent.insertBefore(heading, parent.firstChild);

    fixStepContent(1);
}

function fixIntroElement() {
    const intro = document.querySelector('div.intro');
    const textIntro = intro.querySelector('p');
    intro.removeChild(textIntro);
}

function fixEmailLabel() {
    const label = document.querySelector('label[for="emailVerificationControl"]');
    label.innerHTML = 'Email';
    const parent = label.parentElement;
    parent.removeChild(label);

    const emailElem = document.querySelector('input#email');
    const parentEmail = emailElem.parentElement;

    parentEmail.insertBefore(label, parentEmail.children[0]);
    label.style = 'display: block!important;'
    label.classList.add('common-label');
}

function fixLabelVerificationCode() {
    const label = document.querySelector('label#emailVerificationCode_label');
    label.innerHTML = 'Verification code';
    label.style = 'display: block!important';
    label.classList.add('common-label');
}

function fixLabelPassword() {
    const labelPassword = document.querySelector('label#newPassword_label');
    const labelConfirmPassword = document.querySelector('label#reenterPassword_label');
    labelPassword.innerHTML = 'Password';
    labelConfirmPassword.innerHTML = 'Confirm Password';

    labelPassword.classList.add('common-label');
    labelConfirmPassword.classList.add('common-label');
}

function deleteRequiredStar() {
   const stars = document.querySelectorAll('span.required');

   [...stars].forEach(elem => {
       elem.parentElement.removeChild(elem);
   });
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

    wrapper.style = 'display: none;';

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

function checkSendVerificationButton() {
    const button = document.querySelector('#emailVerificationControl_but_send_code')

    if (isCheckboxCheck) {
        button.disabled = false;
        button.setAttribute('aria-disabled', false);
    } else {
        button.disabled = true;
        button.setAttribute('aria-disabled', true);
    }
}

function checkContinueButton() {
    const continueButton = document.querySelector('button#continue');

    if (isCheckboxCheck && isPasswordCorrect) {
        continueButton.disabled = false;
        continueButton.setAttribute('aria-disabled', false);
    } else {
        continueButton.disabled = true;
        continueButton.setAttribute('aria-disabled', true);
    }
}

function termsAndConditions() {
    const termsAndConditionsDialog = document.querySelector('div#termsAndConditions');
    const termsLink = document.querySelector('a#termsAndConditionsLink');
    const closeLink = termsAndConditionsDialog.querySelector('a');

    closeLink.addEventListener('click', (e) => {
        e.preventDefault();

        termsAndConditionsDialog.style.display = 'none';
    })

    termsLink.addEventListener('click', (e) => {
        e.preventDefault();

        termsAndConditionsDialog.style.display = 'block';
    });
}

function privacyPolicy() {
    const privacyPolicyModal = document.querySelector('div#privacyPolicy');
    const termsLink = document.querySelector('a#privacyPolicyLink');
    const closeLink = privacyPolicyModal.querySelector('a');

    closeLink.addEventListener('click', (e) => {
        e.preventDefault();

        privacyPolicyModal.style.display = 'none';
    })

    termsLink.addEventListener('click', (e) => {
        e.preventDefault();

        privacyPolicyModal.style.display = 'block';
    });
}

function toggleDisplayElement(elem) {
    if (!elem.style.display) {
        elem.style.display = 'none';
    } else {
        if (elem.style.display === 'none') {
            elem.style.display = 'block';
        } else if (elem.style.display === 'inline' || elem.style.display === 'block') {
            elem.style.display = 'none';
        }
    }
}

function togglePasswordInput() {
    const passwordInputs = document.querySelectorAll('li.Password');
    [...passwordInputs].forEach(elem => {
        toggleDisplayElement(elem)
    });
}

function toggleContinueButton() {
    const button = document.querySelector('button#continue');
    toggleDisplayElement(button);
}

function togglePasswordInfo() {
    const container = document.querySelector('.password-checker-container')
    container.style = 'display: block';
}

function toggleEmailInput() {
    const emailInput = document.querySelector('li.EmailBox');
    toggleDisplayElement(emailInput);
}

function addGenericErrorMessage() {
    const message = document.querySelector('#claimVerificationServerError')
    message.innerHTML = 'We are sorry. Something went wrong. Please try again later.';
}

function hideSuccessMessage() {
    const message = document.querySelector("#emailVerificationControl_success_message");
    message.style = 'display: none';
}

function disableCheckbox() {
    const checkbox = document.querySelector('input#privacyPolicyCheckbox');
    checkbox.disabled = true;
}

function initObserver() {
    const targetNode = document.querySelector('body');
    const config = { attributes: true, attributesFilter: ['styles'], childList: true, subtree: true };

    const observerCallback = (mutationList, callback) => {
        for (const mutation of mutationList) {
            if (mutation.type === "attributes" && mutation.attributeName === 'style') {
                const target = mutation.target;

                if (target.classList.contains('VerificationCode') && target.style.display === 'inline') {
                    fixStepContent(2);
                    disableCheckbox();
                    toggleEmailInput();
                } else if (target.classList.contains('changeClaims') && target.style.display === 'inline') {
                    fixStepContent(3);
                    hideChangeEmailButton();
                    toggleEmailInput();
                    togglePasswordInput();
                    toggleContinueButton();
                    togglePasswordInfo();
                    addGenericErrorMessage();
                    hideSuccessMessage();
                }
            }
        }
    }

    const mutationObserver = new MutationObserver(observerCallback);
    mutationObserver.observe(targetNode, config);
}

function showContent() {
    const container = document.querySelector('.container');
    container.style = 'display: table!important;';
}

function app() {
    fixLoginLink();

    replaceTitleContent();
    hideChangeEmailButton();

    fixEmailLabel();
    fixLabelPassword();
    fixLabelVerificationCode();
    fixIntroElement();
    fixEmailInput();

    termsAndPrivacyCheck();
    deleteRequiredStar();
    addPasswordInfo();
    checkContinueButton();
    checkSendVerificationButton();
    termsAndConditions();
    privacyPolicy();

    togglePasswordInput();
    toggleContinueButton();

    initObserver();
    showContent();
}

function termsAndPrivacyCheck() {
    const checkbox = document.querySelector('input#privacyPolicyCheckbox');
    const checkboxLabelTerms = document.querySelector('a#termsAndConditionsLink');
    const checkboxLabelPrivacy = document.querySelector('a#privacyPolicyLink');

    checkboxLabelTerms.addEventListener('click', (e) => e.stopPropagation());
    checkboxLabelPrivacy.addEventListener('click', (e) => e.stopPropagation());

    checkbox.addEventListener('input', (e) => {
        e.preventDefault();
        e.stopPropagation();
        isCheckboxCheck = e.target.checked;

        checkContinueButton();
        checkSendVerificationButton();
    });
}

app();