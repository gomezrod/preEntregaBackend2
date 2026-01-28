import { InputValidator } from './utils.js';
import { $ } from './utils.js'

const loginForm = $('#loginForm')

if(loginForm?.dataset?.message){
    alert(loginForm.dataset.message)
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData);
        
        const errorDiv = $('#errorMessage');

        if (!InputValidator.validateEmail(data.email)) {
        alert("Por favor, ingresa un email válido.");
        return;
    }

        try {
            const response = await fetch('/api/sessions/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                window.location.replace('/current?loggedin=1');
            } else {
                const result = await response.json();
                if (errorDiv) {
                    errorDiv.textContent = result.error || "Credenciales inválidas";
                    errorDiv.style.display = 'block';
                    setTimeout(() => {
                        errorDiv.style.display = 'none'
                    }, 2000);
                }
            }
        } catch (error) {
            console.error("Error connecting to server:", error);
        }
    });
}