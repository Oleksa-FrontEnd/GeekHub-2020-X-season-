document.querySelector('#user-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let fullName = document.querySelector('[name = "full_name"]')
    let email = document.querySelector('[name = "email"]')
    let password = document.querySelector('[name = "password"]')
    
    let validFullName  = /^[йцукенгґшщзхїфівапролджєячсмитьбю]+\s[йцукенгґшщзхїфівапролджєячсмитьбю]+\s[йцукенгґшщзхїфівапролджєячсмитьбю]+$/gi;
    let validEmail = /^[^\.][a-zA-Z0-9-\.]+[^\.]@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+$/gi
    let validPassword = /(?=[A-Z\d]*?[a-z])(?=[a-z\d]*?[A-Z])(?=[a-zA-Z]*?\d)[a-zA-Z\d]{8}/
    //let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/
    
    if (validFullName.test(fullName.value)){
        fullName.style.backgroundColor = '#C2E0C6'
    } else {
        fullName.style.backgroundColor = '#F9D0C4'
    }
    if (validEmail.test(email.value)){
        email.style.backgroundColor = '#C2E0C6'
    } else {
        email.style.backgroundColor = '#F9D0C4'
    }
    if (validPassword.test(password.value)){
        password.style.backgroundColor = '#C2E0C6'
    } else {
        password.style.backgroundColor = '#F9D0C4'
    }
   
});

document.querySelectorAll('[data-show]').forEach(function (button) {
	button.addEventListener('click', function (e) {
		document.querySelector('#description').classList.add('d-none');
		document.querySelector('#preview').classList.add('d-none');

		document.querySelector('#' + e.currentTarget.getAttribute('data-show')).classList.remove('d-none');
	});
});