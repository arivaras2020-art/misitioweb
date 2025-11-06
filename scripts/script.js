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
                    <li><a href="contacto/index.html#informacion">Información</a></li>
                    <li><a href="contacto/index.html#ubicacion">Ubicación</a></li>
                    <li><a href="contacto/index.html#horario-atencion">Horario de atención</a></li>
                    <li><a href="contacto/index.html#enviar-mensaje">Enviar mensaje</a></li>
                </ul>
                `;
                break;
            case 'tecnicaturas':
                backgroundImageClass = 'tecnicaturas-bg';
                submenuHtml = `
                <ul class="submenu-list">
                    <li><a href="tecnicaturas/informatica.html">Informática</a></li>
                    <li><a href="tecnicaturas/construcciones.html">Construcciones</a></li>
                    <li><a href="tecnicaturas/electronica.html">Electrónica</a></li>
                    <li><a href="tecnicaturas/electromecanica.html">Electromecánica</a></li>
                </ul>
                `;
                break;
            case 'institucion':
                backgroundImageClass = 'institucion-bg';
                submenuHtml = `
                <ul class="submenu-list">
                    <li><a href="institucion/index.html#nuestra-historia">Nuestra historia</a></li>
                    <li><a href="institucion/index.html#equipo-directivo">Equipo directivo</a></li>
                    <li><a href="institucion/index.html#vida-escolar">Vida escolar</a></li>
                    <li><a href="institucion/index.html#mision-vision-valores">Misión, visión y valores</a></li>
                </ul>
                `;
                break;
            case 'portal-familiar':
                backgroundImageClass = 'portalfamiliar-bg';
                submenuHtml = `
                <ul class="submenu-list">
                    <li><a href="portalfamiliar/index.html">Comunicado del día</a></li>
                    <li><a href="portalfamiliar/index.html">Informe orientador</a></li>
                    <li><a href="portalfamiliar/index.html">Asistencia</a></li>
                    <li><a href="portalfamiliar/index.html">Boletín</a></li>
                </ul>
                `;
                break;
            case 'portal-docente':
                backgroundImageClass = 'portaldocente-bg';
                submenuHtml = `
                <ul class="submenu-list">
                <li><a href="portaldocente/subirnotas.html" class="docente-link">Subir notas</a></li>
                <li><a href="portaldocente/controldeasistencia.html" class="docente-link">Control de asistencia</a></li>
                <li><a href="portaldocente/gestiondeboletines.html" class="docente-link">Gestión de boletines</a></li>
                <li><a href="portaldocente/avisosinstitucionales.html" class="docente-link">Avisos institucionales</a></li>
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
        const submenuId = e.target.dataset.submenu;

        if (submenuId) {
            // Si el enlace tiene submenú, mostrarlo (sin navegar)
            e.preventDefault();
            showSubmenu(submenuId);
        } else {
            // Si NO tiene submenú, cerrar el menú y navegar normalmente
            overlayMenu.classList.remove('open');
            overlayMenu.style.width = '0%';
        }
    });
});

// Permite cerrar el overlay y navegar al hacer clic en un submenú
document.addEventListener('click', e => {
    if (e.target.closest('.submenu-list a')) {
        overlayMenu.classList.remove('open');
        overlayMenu.style.width = '0%';
    }
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
                    'contacto': 'contacto/index.html',
                    'horarios': 'contacto/index.html',
                    'institucion': 'institucion/index.html',
                    'tecnicaturas': 'tecnicaturas/index.html',
                    'informatica': 'tecnicaturas/informatica.html',
                    'construcciones': 'tecnicaturas/construcciones.html',
                    'electronica': 'tecnicaturas/electronica.html',
                    'electromecanica': 'tecnicaturas/electromecanica.html',
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
    // Lógica del Formulario de INICIO DE SESIÓN
    // ----------------------------------------------------
    const loginForm = document.getElementById('loginForm');
    const loginErrorMessage = document.getElementById('login-error-message');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const email = document.getElementById('email-login').value.trim();
            const password = document.getElementById('password-login').value;
            
            loginErrorMessage.style.display = 'none';

            // Validación: prueba@gmail.com y 123
            if (email === VALID_EMAIL && password === VALID_PASSWORD) {
                // Éxito: Redirigir a index.html
                window.location.href = 'index.html'; 
            } else {
                loginErrorMessage.textContent = 'Email o contraseña incorrectos.';
                loginErrorMessage.style.display = 'block';
            }
        });
    }
    
    // ----------------------------------------------------
    // Lógica del Formulario de REGISTRO (¡REDIRECCIÓN A login.html!)
    // ----------------------------------------------------
    const registerForm = document.getElementById('registerForm');
    const registerErrorMessage = document.getElementById('register-error-message');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name-register').value.trim();
            const email = document.getElementById('email-register').value.trim();
            const password = document.getElementById('password-register').value;

            registerErrorMessage.style.display = 'none';

            // VALIDACIÓN: Solo acepta las credenciales de prueba
            if (name === VALID_NAME && email === VALID_EMAIL && password === VALID_PASSWORD) {
                
                // Simulación de registro exitoso
                alert('¡Registro exitoso! Serás redirigido para iniciar sesión.');
                
                // Limpiar formulario
                registerForm.reset();
                
                // === CAMBIO CLAVE: REDIRECCIÓN DIRECTA A LOGIN.HTML ===
                // Usamos setTimeout para asegurar que la alerta no interfiera con la redirección
                setTimeout(() => {
                    window.location.href = 'inicioyregistro/login.html'; 
                }, 100); 

            } else {
                // Mensaje de error si la simulación falla
                registerErrorMessage.textContent = `Registro fallido. Para la simulación, usa Nombre: "${VALID_NAME}", Email: "${VALID_EMAIL}" y Contraseña: "${VALID_PASSWORD}".`;
                registerErrorMessage.style.display = 'block';
            }
        });
    }
});

// ... (Tu código JavaScript existente antes de esta sección, como la lógica del menú hamburguesa) ...

    // ====================================================
    //  LÓGICA DE VERIFICACIÓN DE PORTALES (CORREGIDA) 
    // ====================================================

    // --- 0. CREDENCIALES DE PRUEBA Y FUNCIÓN DE REDIRECCIÓN ---
    const VALID_PARENT_DNI = '12345678';
    const VALID_TEACHER_DNI = '87654321';
    
    // Inicializamos el rol buscando si existe en la sesión. Si no existe, es 'ninguno'.
    let userRole = sessionStorage.getItem('userRole') || 'ninguno'; 

    function redirectToHome(errorMessageElement) {
        errorMessageElement.style.display = 'block';
        
        // Espera 3 segundos (3000 milisegundos) y luego redirige al inicio
        setTimeout(() => {
            // Aseguramos que el rol sea "ninguno" antes de volver al inicio en caso de error
            sessionStorage.setItem('userRole', 'ninguno'); 
            window.location.href = 'index.html';
        }, 3000); 
    }
    // ----------------------------------------------------

    // --- 1. Lógica del Portal Familiar (portalfamiliar.html) ---
    const parentForm = document.getElementById('parentVerificationForm');
    if (parentForm) {
        const verificationContainer = document.getElementById('verificationContainer');
        const mainContent = document.getElementById('mainContent');

        // Si el rol ya está establecido como padre (vía acceso previo), muestra el contenido.
        if (userRole === 'padre') {
            if (verificationContainer && mainContent) {
                verificationContainer.style.display = 'none';
                mainContent.style.display = 'block';
            }
        } else {
            // Lógica de verificación con formulario
            parentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // OBTENEMOS TODOS LOS VALORES (CORREGIDO)
                const parentName = document.getElementById('parentName').value.trim();
                const parentDNI = document.getElementById('parentDNI').value.trim();
                const childName = document.getElementById('childName').value.trim();
                const childCourse = document.getElementById('childCourse').value.trim();
                const errorMessage = document.getElementById('parent-error-message');
                
                errorMessage.style.display = 'none';

                // SIMULACIÓN DE VERIFICACIÓN: TODOS los campos deben estar completos Y el DNI debe ser correcto
                if (parentName && parentDNI === VALID_PARENT_DNI && childName && childCourse) {
                    
                    // ACCESO EXITOSO: Establecer el rol y recargar
                    sessionStorage.setItem('userRole', 'padre'); 
                    window.location.reload(); 
                    
                } else {
                    // ACCESO FALLIDO: Redirigir
                    redirectToHome(errorMessage);
                }
            });
        }
    }
    // ----------------------------------------------------

    // --- 2. Lógica del Portal Docente (portaldocente.html) ---
    const teacherForm = document.getElementById('teacherVerificationForm');
    if (teacherForm) {
        const verificationContainer = document.getElementById('verificationContainer');
        const mainContent = document.getElementById('mainContent');

        // Si el rol ya está establecido como docente (vía acceso previo), muestra el contenido.
        if (userRole === 'docente') {
            if (verificationContainer && mainContent) {
                verificationContainer.style.display = 'none';
                mainContent.style.display = 'block';
            }
        } else {
            // Lógica de verificación con formulario
            teacherForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // OBTENEMOS TODOS LOS VALORES
                const teacherName = document.getElementById('teacherName').value.trim();
                const teacherDNI = document.getElementById('teacherDNI').value.trim();
                const teacherCourse = document.getElementById('teacherCourse').value.trim();
                const teacherSubject = document.getElementById('teacherSubject').value.trim();
                const errorMessage = document.getElementById('teacher-error-message');

                errorMessage.style.display = 'none'; 
                
                // SIMULACIÓN DE VERIFICACIÓN: TODOS los campos deben estar completos Y el DNI debe ser correcto
                if (teacherName && teacherDNI === VALID_TEACHER_DNI && teacherCourse && teacherSubject) {
                    
                // ACCESO EXITOSO: Establecer el rol
                sessionStorage.setItem('userRole', 'docente'); 

                // Si había una página de destino guardada, ir ahí
                const destino = sessionStorage.getItem('pendingPage');
                if (destino) {
                sessionStorage.removeItem('pendingPage');
                window.location.href = destino;
                } else {
                 // Si no hay destino guardado, mostrar el contenido normal
                window.location.reload();
}
                } else {
                    // ACCESO FALLIDO: Redirigir
                    redirectToHome(errorMessage);
                }
            });
        }
    }
    
    // Intercepta los clics en los enlaces del portal docente
document.addEventListener('click', e => {
    const link = e.target.closest('.docente-link');
    if (!link) return;

    // Si no es docente aún, detener la navegación y guardar destino
    if (sessionStorage.getItem('userRole') !== 'docente') {
        e.preventDefault();
        sessionStorage.setItem('pendingPage', link.getAttribute('href'));
        window.location.href = 'portaldocente/index.html';
    }
});
