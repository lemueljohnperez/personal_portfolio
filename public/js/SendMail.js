const contactForm = document.querySelector('#form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let contact = document.getElementById('contact');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = {
        name: name.value,
        email: email.value,
        contact: contact.value,
        subject: subject.value,
        message: message.value
    }

    console.log(formData);
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
        console.log(xhr.responseText);
        if(xhr.responseText == 'Email sent successfully') {
            alert("Email sent successfully!");
            name.value = '';
            email.value = '';
            contact.value = '';
            subject.value = '';
            message.value = ''
        }

        else {
            alert("Something went wrong.");
        }
    }
    
    xhr.send(JSON.stringify(formData));
    
})