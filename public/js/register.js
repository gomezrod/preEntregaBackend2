import { $ } from './utils.js'
import { InputValidator } from './utils.js';

const registerForm = $('#registerForm');

if(registerForm){
    registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData);
    
    const errorDiv = $('#generalError');

    if (!InputValidator.validateEmail(data.email)) {
        alert("Por favor, ingresa un email válido.");
        return;
    }

    if (!InputValidator.validateName(data.first_name) || !InputValidator.validateName(data.last_name)) {
        alert("Por favor, ingresa un nombre y apellido válidos.");
        return;
    }

    if (!InputValidator.validatePassword(data.password)) {
        alert("La contraseña debe tener al menos 8 caracteres e incluir al menos una letra minúsula, una mayúscula, un número y un caracter especial (@$!%*?&).");
        return;
    }

    try {
        const response = await fetch('/api/sessions/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert(`Usuario ${data.first_name} registrado con éxito!`);
            window.location.replace('/login');
        } else {
            errorDiv.textContent = result.error || "Error en el registro";
            errorDiv.style.display = 'block';
            setTimeout(() => {
                        errorDiv.style.display = 'none'
                    }, 2000);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
}