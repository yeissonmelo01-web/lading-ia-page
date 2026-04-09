document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INTERSECTION OBSERVER (Animación de entrada suave)
    const reveals = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        threshold: 0.12, 
        rootMargin: "0px 0px -40px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(el => revealObserver.observe(el));

    // 2. LÓGICA DE FORMULARIO (Validación mejorada)
    const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('nombre');
    const phoneInput = document.getElementById('telefono');
    const emailInput = document.getElementById('email');
    const termsCheckbox = document.getElementById('terminos');
    
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');
    const termsError = document.getElementById('termsError');
    const successMessage = document.getElementById('successMessage');

    // RegEx: Solo letras y espacios, mínimo 3
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // RegEx: Al menos 7 dígitos
    const phoneRegex = /^\+?[\d\s-]{7,}$/;

    const validateField = (input, errorElement, condition) => {
        if (input.value.trim() !== "" && !condition) {
            input.classList.add('invalid');
            errorElement.style.display = 'block';
            return false;
        } else {
            input.classList.remove('invalid');
            errorElement.style.display = 'none';
            return true;
        }
    };

    // Validación en tiempo real
    nameInput.addEventListener('input', () => {
        validateField(nameInput, nameError, nameRegex.test(nameInput.value.trim()));
    });

    phoneInput.addEventListener('input', () => {
        validateField(phoneInput, phoneError, phoneRegex.test(phoneInput.value.trim()));
    });

    emailInput.addEventListener('input', () => {
        validateField(emailInput, emailError, emailRegex.test(emailInput.value.trim()));
    });

    termsCheckbox.addEventListener('change', () => {
        termsError.style.display = termsCheckbox.checked ? 'none' : 'block';
    });

    // Procesamiento de Envío
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isNameValid = nameRegex.test(nameInput.value.trim());
        const isPhoneValid = phoneRegex.test(phoneInput.value.trim());
        const isEmailValid = emailRegex.test(emailInput.value.trim());
        const isTermsAccepted = termsCheckbox.checked;

        // Forzamos errores visuales
        if (!isNameValid) { nameInput.classList.add('invalid'); nameError.style.display = 'block'; }
        if (!isPhoneValid) { phoneInput.classList.add('invalid'); phoneError.style.display = 'block'; }
        if (!isEmailValid) { emailInput.classList.add('invalid'); emailError.style.display = 'block'; }
        if (!isTermsAccepted) { termsError.style.display = 'block'; }

        if (isNameValid && isPhoneValid && isEmailValid && isTermsAccepted) {
            successMessage.style.display = 'block';
            successMessage.style.opacity = '1';
            
            form.reset();

            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 500);
            }, 5000);
        }
    });
});