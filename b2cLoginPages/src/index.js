function replaceTitleContent() {
    const title = document.querySelector('div.heading h1[role="heading"]');
    title.innerHTML = 'Log in';
}

function replaceButtonContent() {
    const button = document.querySelector('button#next');
    button.innerHTML = 'Log in';
}

function fixUserNameLabel() {
    const label = document.querySelector('label[for="email"]');
    label.innerHTML = 'Email';
}

function fixLabelPassword() {
    const label = document.querySelector('label[for="password"]');
    label.innerHTML = 'Password';
    const parent = label.parentElement;
    const entryItem = parent.parentElement;
    parent.removeChild(label);
    entryItem.insertBefore(label, parent);
}

function fixForgotPasswordLink() {
    const forgotPassword = document.querySelector('a#forgotPassword');
    const parent = forgotPassword.parentElement;
    parent.removeChild(forgotPassword);
    const entry = document.querySelector('div.entry');
    entry.appendChild(forgotPassword);
    forgotPassword.innerHTML = 'Forgot password?';
}

function styleInputs() {
    const usernameInput = document.querySelector('input#email');
    usernameInput.placeholder = 'Email';
}

function changeErrorPlace() {
    const entryList = document.querySelectorAll('.entry-item');

    [...entryList].forEach(elem => {
        const error = elem.querySelector('.error')
        elem.removeChild(error);
        elem.appendChild(error);
    });
}

function fixCreateAccountSection() {
    const createSection = document.querySelector('div.create');
    const linkCreateAccount = createSection.querySelector('a');
    const ourLinkCreateAccount = document.querySelector('a#createNewAccount.link');

    ourLinkCreateAccount.href = linkCreateAccount.href;
    createSection.style = 'display: none;';
}

function app() {
    replaceTitleContent();
    replaceButtonContent();
    changeErrorPlace();
    fixUserNameLabel();
    fixLabelPassword();
    fixForgotPasswordLink();
    fixCreateAccountSection();
    styleInputs();
}

app();

// setTimeout(() => {
//     app();
// }, 500);