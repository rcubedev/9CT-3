const EmailRE = /(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

class Newsletter {
  constructor(selector = '.newsletter') {
    this.forms = Array.from(document.querySelectorAll(selector));
    this.init();
  }

  init() {
    this.forms.forEach((form) => {
      form.addEventListener('submit', (e) => this.handleSubmit(e, form));
      const input = form.querySelector('input[name="email"]');
      if (input && typeof input.setCustomValidity === 'function') {
        input.addEventListener('input', () => {
          try { input.setCustomValidity(''); } catch (err) {}
        });
      }
    });
  }

  validateEmail(email) {
    try {
      return EmailRE.test(email.toLowerCase());
    } catch (err) {
      return false;
    }
  }

  handleSubmit(e, form) {
    e.preventDefault();
    const input = form.querySelector('input[name="email"]');
    const submit = form.querySelector('button[type="submit"]');
    const email = input ? (input.value || '').trim() : '';
    // clear any previous custom validity
    if (input && typeof input.setCustomValidity === 'function') input.setCustomValidity('');

    if (!email) {
      if (input && typeof input.setCustomValidity === 'function') {
        input.setCustomValidity('Please enter your email address.');
        try { input.reportValidity(); } catch (err) {}
      }
      return;
    }

    if (!this.validateEmail(email)) {
      if (input && typeof input.setCustomValidity === 'function') {
        input.setCustomValidity('Please enter a valid email address.');
        try { input.reportValidity(); } catch (err) {}
      }
      return;
    }

    if (input) input.value = '';
    if (submit) {
      submit.disabled = true;
      alert('Thank you for subscribing to our newsletter.');
      setTimeout(() => {
        submit.disabled = false;
      }, 500);
    }
  }
}

new Newsletter();
