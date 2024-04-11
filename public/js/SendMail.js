const contactForm = document.querySelector('#form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        contact: document.getElementById('contactNo').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    console.log(formData);

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        if(data === 'Email sent successfully') {
            alert('Email sent');
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('contactNo').value = '';
            document.getElementById('subject').value = '';
            document.getElementById('message').value = '';
        }
        
        else {
            alert('Something went wrong.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong.');
    });
});