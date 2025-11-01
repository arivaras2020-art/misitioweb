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

    // ----------------------------------------------------
    // Lógica del Inicio de Sesión y Selector de Rol (NUEVO)
    // ----------------------------------------------------
    
    const loginForm = document.getElementById('loginForm');
    const roleButtons = document.querySelectorAll('.role-button');
    const errorMessage = document.getElementById('error-message');
    let selectedRole = null; 

    // 1. Manejar la selección de rol
    roleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover 'active' de todos los botones
            roleButtons.forEach(btn => btn.classList.remove('active'));

            // Añadir 'active' al botón clickeado
            button.classList.add('active');
            
            selectedRole = button.dataset.role;

            errorMessage.style.display = 'none';
        });
    });

    // 2. Manejar el envío del formulario
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            // Simulación de credenciales de prueba:
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            const userDatabase = [
                { email: 'padre@test.com', password: '123', role: 'padre' },
                { email: 'docente@test.com', password: '123', role: 'docente' },
                { email: 'alumno@test.com', password: '123', role: 'alumno' },
            ];

            // 3. Validación de Rol obligatorio
            if (!selectedRole) {
                errorMessage.textContent = 'Por favor, selecciona tu rol (Alumno, Padre o Docente).';
                errorMessage.style.display = 'block';
                return; 
            }

            // 4. Simulación de Validación y Coincidencia de Rol
            const foundUser = userDatabase.find(user => 
                user.email === email && 
                user.password === password
            );

if (foundUser) {
                if (foundUser.role === selectedRole) {
                    // 🎉 Éxito: Redirigir SIEMPRE a index.html
                    window.location.href = 'index.html'; 
                } else {
                    // Credenciales correctas, pero Rol incorrecto
                    errorMessage.textContent = `Tu cuenta es de ${foundUser.role.toUpperCase()}. Selecciona el rol correcto.`;
                    errorMessage.style.display = 'block';
                }
            } else {
                // Credenciales incorrectas
                errorMessage.textContent = 'Email o contraseña incorrectos.';
                errorMessage.style.display = 'block';
            }
        });
    }
});