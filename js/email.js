window.onload = function() {
    emailjs.init({
        publicKey: "qH6sM_j5f1Tm7YqZY",
    });

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const mailStatus = document.getElementById('mail-status');
        const form = document.getElementById('contact-form');
        emailjs.sendForm('contact_service', 'contact_form', this)
            .then(() => {
                console.log('SUCCESS!');
                mailStatus.className = "contact-success"
                mailStatus.innerText = 'Email sent!';
                form.reset();
            }, (error) => {
                console.log('FAILED...', error);
                mailStatus.className = "contact-error"
                mailStatus.innerText = 'Email isn\'t sent!';
                form.reset();
            });
    });
}
