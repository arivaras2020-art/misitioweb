document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // Lógica del Menú Overlay (CÓDIGO EXISTENTE)
    // ----------------------------------------------------
    const menuIcon = document.getElementById('menuIcon');
    const closeBtn = document.getElementById('closeBtn');
    const overlayMenu = document.getElementById('overlayMenu');
    const mainMenuItems = document.querySelectorAll('.main-menu-list a');
    const submenuContainer = document.getElementById('submenuContainer');

    function resetSubmenu() {
        submenuContainer.innerHTML = '';
        submenuContainer.className = 'submenu-container';
    }

    if (menuIcon && overlayMenu && closeBtn) {
        menuIcon.addEventListener('click', () => {
            overlayMenu.classList.add('open');
            overlayMenu.style.width = '100%';
            resetSubmenu();
        });

        closeBtn.addEventListener('click', () => {
            overlayMenu.classList.remove('open');
            overlayMenu.style.width = '0%';
            resetSubmenu();
        });
    }

    function showSubmenu(menuType) {
        let submenuHtml = '';
        let backgroundImageClass = '';

        resetSubmenu();

        switch (menuType) {
            case 'inicio':
                backgroundImageClass = 'inicio-bg';
                submenuHtml = `
                <ul class="submenu-list">
                    <li><a href="index.html#sobre-nosotros">Sobre nosotros</a></li>
                    <li><a href="index.html#nuestras-tecnicaturas">Nuestras tecnicaturas</a></li>
                    <li><a href="index.html#ultimas-noticias">Últimas noticias</a></li>
                    <li><a href="index.html#testimonios">Testimonios</a></li>
                </ul>
                `;
                break;
            case 'contacto':
                backgroundImageClass = 'contacto-bg';
                submenuHtml = `
                <ul class="submenu-list">
                    <li><a href="contacto.html#informacion">Información</a></li>
                    <li><a href="contacto.html#ubicacion">Ubicación</a></li>
                    <li><a href="contacto.html#horario-atencion">Horario de atención</a></li>
                    <li><a href="contacto.html#enviar-mensaje">Enviar mensaje</a></li>
                </ul>
                `;
                break;
            case 'tecnicaturas':
                backgroundImageClass = 'tecnicaturas-bg';
                submenuHtml = `
                <ul class="submenu-list">
                    <li><a href="informatica.html">Informática</a></li>
                    <li><a href="construcciones.html">Construcciones</a></li>
                    <li><a href="electronica.html">Electrónica</a></li>
                    <li><a href="electromecanica.html">Electromecánica</a></li>
                </ul>
                `;
                break;
            case 'institucion':
                backgroundImageClass = 'institucion-bg';
                submenuHtml = `
                <ul class="submenu-list">
                    <li><a href="institucion.html#nuestra-historia">Nuestra historia</a></li>
                    <li><a href="institucion.html#equipo-directivo">Equipo directivo</a></li>
                    <li><a href="institucion.html#vida-escolar">Vida escolar</a></li>
                    <li><a href="institucion.html#mision-vision-valores">Misión, visión y valores</a></li>
                </ul>
                `;
                break;
        }

        submenuContainer.innerHTML = submenuHtml;
        submenuContainer.classList.add(backgroundImageClass);

        mainMenuItems.forEach(item => item.classList.remove('active'));
        document.querySelector(`.main-menu-list a[data-submenu="${menuType}"]`)?.classList.add('active');
    }

    mainMenuItems.forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            const submenuId = e.target.dataset.submenu;
            showSubmenu(submenuId);
        });
    });

    // ----------------------------------------------------
    // Lógica de la Barra de Búsqueda (CÓDIGO EXISTENTE)
    // ----------------------------------------------------
    const searchToggle = document.getElementById('searchToggle');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');

    if (searchToggle && searchContainer && searchInput) {
        searchToggle.addEventListener('click', () => {
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchInput.focus();
            } else {
                searchInput.value = '';
            }
        });

        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();

                const query = searchInput.value.toLowerCase().trim();

                const redirectMap = {
                    'inicio': 'index.html',
                    'contacto': 'contacto.html',
                    'informacion de contacto': 'contacto.html',
                    'horarios': 'contacto.html',
                    'institucion': 'institucion.html',
                    'tecnicaturas': 'tecnicaturas.html',
                    'informatica': 'informatica.html',
                    'construcciones': 'construcciones.html',
                    'electronica': 'electronica.html',
                    'electromecanica': 'electromecanica.html',
                };

                let destination = null;

                for (const keyword in redirectMap) {
                    if (query.includes(keyword)) {
                        destination = redirectMap[keyword];
                        break;
                    }
                }

                if (destination) {
                    window.location.href = destination;
                } else if (query.length > 0) {
                    window.location.href = `resultados.html?q=${encodeURIComponent(query)}`;
                }

                searchContainer.classList.remove('active');
                searchInput.value = '';
            }
        });
    }

 const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    // Función para cambiar la vista
    function switchView(target) {
        if (target === 'register') {
            loginSection.classList.remove('active');
            registerSection.classList.add('active');
        } else {
            registerSection.classList.remove('active');
            loginSection.classList.add('active');
        }
    }

    // Eventos para los enlaces de cambio de vista
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchView('register');
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchView('login');
        });
    }

    // ----------------------------------------------------
    // Lógica del Formulario de Inicio de Sesión (MODIFICADA)
    // ----------------------------------------------------
    
    const loginForm = document.getElementById('loginForm');
    const loginErrorMessage = document.getElementById('login-error-message');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            // Simulación de credenciales de prueba
            const email = document.getElementById('email-login').value.trim();
            const password = document.getElementById('password-login').value;
            
            // Usuario de prueba simple
            const testUser = { email: 'test@industrial.com', password: '123' };

            loginErrorMessage.style.display = 'none';

            if (email === testUser.email && password === testUser.password) {
                // 🎉 Éxito: Redirigir
                window.location.href = 'index.html'; 
            } else {
                // Credenciales incorrectas
                loginErrorMessage.textContent = 'Email o contraseña incorrectos.';
                loginErrorMessage.style.display = 'block';
            }
        });
    }
    
    // ----------------------------------------------------
    // Lógica del Formulario de Registro (NUEVA)
    // ----------------------------------------------------
    
    const registerForm = document.getElementById('registerForm');
    const registerErrorMessage = document.getElementById('register-error-message');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // En un entorno real, aquí enviarías los datos al servidor.
            const name = document.getElementById('name-register').value.trim();
            const email = document.getElementById('email-register').value.trim();
            const password = document.getElementById('password-register').value;

            registerErrorMessage.style.display = 'none';

            // Validación simple para simular el registro
            if (name.length < 3) {
                registerErrorMessage.textContent = 'El nombre debe tener al menos 3 caracteres.';
                registerErrorMessage.style.display = 'block';
            } else if (!email.includes('@')) {
                registerErrorMessage.textContent = 'Por favor, ingresa un email válido.';
                registerErrorMessage.style.display = 'block';
            } else if (password.length < 6) {
                registerErrorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres.';
                registerErrorMessage.style.display = 'block';
            } else {
                // Simulación de registro exitoso
                alert('¡Registro exitoso! Serás redirigido al inicio de sesión.');
                // Limpiar formulario
                registerForm.reset();
                // Cambiar a la vista de login
                switchView('login');
            }
        });
    }

});