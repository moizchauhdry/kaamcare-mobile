const sendNewCodeButton = document.querySelector('#emailVerificationControl_but_send_new_code');
const verificationButton = document.querySelector('#emailVerificationControl_but_verify_code');
const verificationInput = document.querySelector('#emailVerificationCode');

function fixCancelButton() {
    const cancelButton = document.querySelector('button#cancel');

    cancelButton.innerText = '';
}

function hideChangeEmailButton() {
    const button = document.querySelector('button.changeClaims');
    button.style = 'display: none!important';
}

function hideEmailInput() {
    const emailInput = document.querySelector('li.EmailBox');
    emailInput.style = 'display: none!important';
    emailInput.classList.add('hide-important');
}

function fixStepContent(stepNumber) {
    const step = document.querySelector('p.step');
    step.innerHTML = `${stepNumber}/3`;
}

function replaceIntroContent() {
    const description = document.querySelector('div.intro p');
    description.style = 'margin-bottom: 32px;';
    description.innerText = 'Enter your email address that you used to register. We\'ll send you an email with a code to reset your password.'
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

    fixStepContent(1);
}

function hideIntroText() {
    const text = document.querySelector('.intro');
    text.style.display = 'none';
}

function fixEmailInput() {
    const emailInput = document.querySelectorAll('input#email');
    const emailLabel = document.querySelectorAll('label#email_label');

    [...emailLabel].forEach(elem => elem.innerHTML = 'Email');
    [...emailInput].forEach(elem => elem.placeholder = 'myemail@exampleemail.com');
}

function initObserver() {
    const targetNode = document.querySelector('body');
    const config = { attributes: true, attributesFilter: ['styles'], childList: true, subtree: true };

    const observerCallback = (mutationList, callback) => {
        for (const mutation of mutationList) {
            if (mutation.type === "attributes" && mutation.attributeName === 'style') {
                const target = mutation.target;

                if ((target.id === 'emailVerificationControl_success_message' && target.style.display === 'inline')
                  || (target.id === 'emailVerificationControl_error_message' && target.style.display === 'inline')
                ) {
                    enableSendNewCodeButton();
                    enableVerificationButton();
                }

                if (target.classList.contains('VerificationCode') && target.style.display === 'inline') {
                    fixStepContent(2);
                    hideEmailInput();
                    hideChangeEmailButton();
                    hideIntroText();
                    showVerificationInput();
                    showVerificationButton();
                    showSendNewCodeButton();
                } else if (target.id === 'emailVerificationControl_success_message' && target.innerText === 'E-mail address verified. You can now continue.') {
                    toggleContinueButton();
                    hideEmailInput();
                    hideChangeEmailButton();
                    hideVerificationInput();
                    hideVerificationButton();
                    hideSendNewCodeButton();
                }
            }
        }
    }

    const mutationObserver = new MutationObserver(observerCallback);
    mutationObserver.observe(targetNode, config);
}

function enableSendNewCodeButton() {
    sendNewCodeButton.disabled = false;
    sendNewCodeButton.setAttribute('aria-disabled', 'false');
}

function enableVerificationButton() {
    verificationButton.disabled = false;
    verificationButton.setAttribute('aria-disabled', 'false');
}

function disableCodeButtons() {
    if (!verificationInput.value) {
        return;
    }

    sendNewCodeButton.disabled = true;
    sendNewCodeButton.setAttribute('aria-disabled', 'true');
    verificationButton.disabled = true;
    verificationButton.setAttribute('aria-disabled', 'true');
}

function handleSendNewCodeButton() {
    sendNewCodeButton.addEventListener('click', () => {
        disableCodeButtons()
    })
}

function handleVerificationButton() {
    verificationButton.addEventListener('click', () => {
        disableCodeButtons()
    })
}

function hideSendNewCodeButton() {
    sendNewCodeButton.classList.add('hide-important');
    sendNewCodeButton.classList.remove('show-important');
    sendNewCodeButton.setAttribute('aria-hidden', 'true');
}

function showSendNewCodeButton() {
    sendNewCodeButton.classList.remove('hide-important');
    sendNewCodeButton.classList.add('show-important');
    sendNewCodeButton.setAttribute('aria-hidden', 'false');
}

function hideVerificationButton() {
    verificationButton.classList.add('hide-important');
    verificationButton.classList.remove('show-important');
    verificationButton.setAttribute('aria-hidden', 'true');
}

function showVerificationButton() {
    verificationButton.classList.remove('hide-important');
    verificationButton.classList.add('show-important');
    verificationButton.setAttribute('aria-hidden', 'false');
}

function hideVerificationInput() {
    const verificationInput = document.querySelector('.VerificationCode');
    verificationInput.classList.add('hide-important');
    verificationInput.classList.remove('show-important');
}

function showVerificationInput() {
    const verificationInput = document.querySelector('.VerificationCode');
    verificationInput.classList.remove('hide-important');
    verificationInput.classList.add('show-important');
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

function toggleContinueButton() {
    const button = document.querySelector('button#continue');
    toggleDisplayElement(button);
}

function showContent() {
    const container = document.querySelector('.container');
    container.style = 'display: table!important;';
}

function app() {
    replaceTitleContent();
    replaceIntroContent();

    fixCancelButton();
    fixEmailInput();

    toggleContinueButton();

    handleSendNewCodeButton();
    handleVerificationButton();

    initObserver();
    showContent();
}

app();