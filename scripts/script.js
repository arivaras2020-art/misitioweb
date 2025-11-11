document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------
    // Lógica del Menú Overlay (RUTAS UNIVERSALES COMPLETAS)
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

        // Determinar la ruta base según la ubicación actual
        const currentPath = window.location.pathname;
        let basePath = '';
        
        // Determina si es necesario retroceder (../)
        if (currentPath.includes('/formularios/') ||
            currentPath.includes('/contacto/') || 
            currentPath.includes('/tecnicaturas/') || 
            currentPath.includes('/institucion/') || 
            currentPath.includes('/inicioyregistro/') ||
            currentPath.includes('/portalfamiliar/') || 
            currentPath.includes('/portaldocente/')) {  
            
            basePath = '../';
        } else {
            // Para la raíz, basePath queda vacío
            basePath = '';
        }

        switch (menuType) {
            case 'inicio':
                backgroundImageClass = 'inicio-bg';
                submenuHtml = `
                <ul class="submenu-list">
                    <li><a href="${basePath}index.html#sobre-nosotros">Sobre nosotros</a></li>
                    <li><a href="${basePath}index.html#nuestras-tecnicaturas">Nuestras tecnicaturas</a></li>
                    <li><a href="${basePath}index.html#ultimas-noticias">Últimas noticias</a></li>
                    <li><a href="${basePath}index.html#testimonios">Testimonios</a></li>
                </ul>
                `;
                break;
            case 'contacto':
                backgroundImageClass = 'contacto-bg';
                submenuHtml = `
                <ul class="submenu-list">
                    <li><a href="${basePath}contacto/index.html#informacion">Información</a></li>
                    <li><a href="${basePath}contacto/index.html#ubicacion">Ubicación</a></li>
                    <li><a href="${basePath}contacto/index.html#horario-atencion">Horario de atención</a></li>
                    <li><a href="${basePath}contacto/index.html#enviar-mensaje">Enviar mensaje</a></li>
                </ul>
                `;
                break;
            case 'tecnicaturas':
                backgroundImageClass = 'tecnicaturas-bg';
                submenuHtml = `
                <ul class="submenu-list">
                    <li><a href="${basePath}tecnicaturas/index.html">Informática</a></li>
                    <li><a href="${basePath}tecnicaturas/index.html">Construcciones</a></li>
                    <li><a href="${basePath}tecnicaturas/index.html">Electrónica</a></li>
                    <li><a href="${basePath}tecnicaturas/index.html">Electromecánica</a></li>
                </ul>
                `;
                break;
            case 'institucion':
                backgroundImageClass = 'institucion-bg';
                submenuHtml = `
                <ul class="submenu-list">
                    <li><a href="${basePath}institucion/index.html#nuestra-historia">Nuestra historia</a></li>
                    <li><a href="${basePath}institucion/index.html#equipo-directivo">Equipo directivo</a></li>
                    <li><a href="${basePath}institucion/index.html#vida-escolar">Vida escolar</a></li>
                    <li><a href="${basePath}institucion/index.html#mision-vision-valores">Misión, visión y valores</a></li>
                </ul>
                `;
                break;

            // =========================================================
            // CORRECCIÓN: PORTAL FAMILIAR (Muestra submenú antes de ir a verificación)
            // =========================================================
            case 'portal-familiar':
                backgroundImageClass = 'portalfamiliar-bg';
                submenuHtml = `
                <ul class="submenu-list">
                    <li><a href="${basePath}formularios/verificacionpf.html#comunicado">Comunicado del día</a></li>
                    <li><a href="${basePath}formularios/verificacionpf.html#informe">Informe orientador</a></li>
                    <li><a href="${basePath}formularios/verificacionpf.html#asistencia">Asistencia</a></li>
                    <li><a href="${basePath}formularios/verificacionpf.html#boletin">Boletín</a></li>
                </ul>
                `;
                break;
                
            // =========================================================
            // CORRECCIÓN: PORTAL DOCENTE (Muestra submenú antes de ir a verificación)
            // =========================================================
            case 'portal-docente':
                backgroundImageClass = 'portaldocente-bg';
                submenuHtml = `
                <ul class="submenu-list">
                    <li><a href="${basePath}formularios/verificacionpd.html#notas">Subir notas</a></li>
                    <li><a href="${basePath}formularios/verificacionpd.html#control">Control de asistencia</a></li>
                    <li><a href="${basePath}formularios/verificacionpd.html#informe">Informe orientador</a></li>
                    <li><a href="${basePath}formularios/verificacionpd.html#avisos">Avisos institucionales</a></li>
                </ul>
                `;
                break;
        }

        submenuContainer.className = `submenu-container ${backgroundImageClass}`;
        submenuContainer.innerHTML = submenuHtml;

        // CORRECCIÓN: Establecer la imagen de fondo con la ruta correcta
        const imagePaths = {
            'inicio-bg': 'menuinicio.jpeg',
            'contacto-bg': 'menucontacto.jpeg',
            'tecnicaturas-bg': 'menutecnicaturas.jpeg',
            'institucion-bg': 'menuinstitucion.jpg',
            'portalfamiliar-bg': 'menuportalfamiliar.jpg',
            'portaldocente-bg': 'menuportaldocente.webp'
        };

        // Determinar la ruta base para las imágenes
        let imageBasePath = 'imagenes/';
        if (currentPath.includes('/portalfamiliar/') || currentPath.includes('/portaldocente/')) {
            imageBasePath = '../../imagenes/';
        } else if (currentPath.includes('/contacto/') || currentPath.includes('/tecnicaturas/') || 
                   currentPath.includes('/institucion/') || currentPath.includes('/inicioyregistro/')) {
            imageBasePath = '../imagenes/';
        }

        const imageUrl = imageBasePath + imagePaths[backgroundImageClass];
        submenuContainer.style.backgroundImage = `url('${imageUrl}')`;

        mainMenuItems.forEach(item => item.classList.remove('active'));
        document.querySelector(`.main-menu-list a[data-submenu="${menuType}"]`)?.classList.add('active');
    }

    mainMenuItems.forEach(item => {
        item.addEventListener('click', e => {
            const submenuId = e.target.dataset.submenu;

            if (submenuId) {
                e.preventDefault();
                showSubmenu(submenuId);
            } else {
                overlayMenu.classList.remove('open');
                overlayMenu.style.width = '0%';
            }
        });
    });

    document.addEventListener('click', e => {
        if (e.target.closest('.submenu-list a')) {
            overlayMenu.classList.remove('open');
            overlayMenu.style.width = '0%';
        }
    });

    // ----------------------------------------------------
    // Lógica de la Barra de Búsqueda (RUTAS UNIVERSALES COMPLETAS)
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
                
                // Determinar la ruta base según la ubicación actual
                const currentPath = window.location.pathname;
                let basePath = '';
                
                if (currentPath.includes('/portalfamiliar/') || currentPath.includes('/portaldocente/')) {
                    basePath = '../../';
                } else if (currentPath.includes('/contacto/') || currentPath.includes('/tecnicaturas/') || 
                           currentPath.includes('/institucion/') || currentPath.includes('/inicioyregistro/')) {
                    basePath = '../';
                }

                const redirectMap = {
                    'inicio': `${basePath}index.html`,
                    'contacto': `${basePath}contacto/index.html`,
                    'institucion': `${basePath}institucion/index.html`,
                    'tecnicaturas': `${basePath}tecnicaturas/index.html`,
                    'informatica': `${basePath}tecnicaturas/informatica.html`,
                    'construcciones': `${basePath}tecnicaturas/construcciones.html`,
                    'electronica': `${basePath}tecnicaturas/electronica.html`,
                    'electromecanica': `${basePath}tecnicaturas/electromecanica.html`,
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
                    window.location.href = `${basePath}resultados.html?q=${encodeURIComponent(query)}`;
                }

                searchContainer.classList.remove('active');
                searchInput.value = '';
            }
        });
    }

    // ----------------------------------------------------
    // Lógica del Formulario de INICIO DE SESIÓN (RUTAS UNIVERSALES COMPLETAS)
    // ----------------------------------------------------
    const loginForm = document.getElementById('loginForm');
    const loginErrorMessage = document.getElementById('login-error-message');
    
    // Credenciales de prueba
    const VALID_EMAIL = 'prueba@gmail.com';
    const VALID_PASSWORD = '123';
    const VALID_NAME = 'Usuario Prueba';
    
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const email = document.getElementById('email-login').value.trim();
            const password = document.getElementById('password-login').value;
            
            loginErrorMessage.style.display = 'none';

            if (email === VALID_EMAIL && password === VALID_PASSWORD) {
                // Determinar la ruta base según la ubicación actual
                const currentPath = window.location.pathname;
                let basePath = '';
                
                if (currentPath.includes('/inicioyregistro/')) {
                    basePath = '../';
                } else if (currentPath.includes('/portalfamiliar/') || currentPath.includes('/portaldocente/') ||
                           currentPath.includes('/contacto/') || currentPath.includes('/tecnicaturas/') || 
                           currentPath.includes('/institucion/')) {
                    basePath = '../../';
                }

                window.location.href = `${basePath}index.html`; 
            } else {
                loginErrorMessage.textContent = 'Email o contraseña incorrectos.';
                loginErrorMessage.style.display = 'block';
            }
        });
    }
    
    // ----------------------------------------------------
    // Lógica del Formulario de REGISTRO (RUTAS UNIVERSALES COMPLETAS)
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

            if (name === VALID_NAME && email === VALID_EMAIL && password === VALID_PASSWORD) {
                alert('¡Registro exitoso! Serás redirigido para iniciar sesión.');
                registerForm.reset();
                setTimeout(() => {
                    // Determinar la ruta base según la ubicación actual
                    const currentPath = window.location.pathname;
                    let loginPath = 'inicioyregistro/login.html';
                    
                    if (currentPath.includes('/inicioyregistro/')) {
                        loginPath = 'login.html';
                    } else if (currentPath.includes('/portalfamiliar/') || currentPath.includes('/portaldocente/') ||
                               currentPath.includes('/contacto/') || currentPath.includes('/tecnicaturas/') || 
                               currentPath.includes('/institucion/')) {
                        loginPath = '../../inicioyregistro/login.html';
                    }

                    window.location.href = loginPath; 
                }, 100); 

            } else {
                registerErrorMessage.textContent = `Registro fallido. Para la simulación, usa Nombre: "${VALID_NAME}", Email: "${VALID_EMAIL}" y Contraseña: "${VALID_PASSWORD}".`;
                registerErrorMessage.style.display = 'block';
            }
        });
    }

    // ====================================================
    // LÓGICA DE VERIFICACIÓN DE PORTALES (RUTAS UNIVERSALES COMPLETAS)
    // ====================================================

    const VALID_PARENT_DNI = '12345678';
    const VALID_TEACHER_DNI = '87654321';
    
    let userRole = sessionStorage.getItem('userRole') || 'ninguno'; 

    function redirectToHome(errorMessageElement) {
        errorMessageElement.style.display = 'block';
        setTimeout(() => {
            sessionStorage.setItem('userRole', 'ninguno'); 
            // Determinar la ruta base según la ubicación actual
            const currentPath = window.location.pathname;
            let basePath = '';
            
            if (currentPath.includes('/portalfamiliar/') || currentPath.includes('/portaldocente/')) {
                basePath = '../../';
            } else if (currentPath.includes('/contacto/') || currentPath.includes('/tecnicaturas/') || 
                       currentPath.includes('/institucion/') || currentPath.includes('/inicioyregistro/')) {
                basePath = '../';
            }

            window.location.href = `${basePath}index.html`;
        }, 3000); 
    }

    // Portal Familiar
    const parentForm = document.getElementById('parentVerificationForm');
    if (parentForm) {
        const verificationContainer = document.getElementById('verificationContainer');
        const mainContent = document.getElementById('mainContent');

        if (userRole === 'padre') {
            if (verificationContainer && mainContent) {
                verificationContainer.style.display = 'none';
                mainContent.style.display = 'block';
            }
        } else {
            parentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const parentName = document.getElementById('parentName').value.trim();
                const parentDNI = document.getElementById('parentDNI').value.trim();
                const childName = document.getElementById('childName').value.trim();
                const childCourse = document.getElementById('childCourse').value.trim();
                const errorMessage = document.getElementById('parent-error-message');
                
                errorMessage.style.display = 'none';

                if (parentName && parentDNI === VALID_PARENT_DNI && childName && childCourse) {
                    sessionStorage.setItem('userRole', 'padre'); 
                    window.location.reload(); 
                } else {
                    redirectToHome(errorMessage);
                }
            });
        }
    }

    // Portal Docente
    const teacherForm = document.getElementById('teacherVerificationForm');
    if (teacherForm) {
        const verificationContainer = document.getElementById('verificationContainer');
        const mainContent = document.getElementById('mainContent');

        if (userRole === 'docente') {
            if (verificationContainer && mainContent) {
                verificationContainer.style.display = 'none';
                mainContent.style.display = 'block';
            }
        } else {
            teacherForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const teacherName = document.getElementById('teacherName').value.trim();
                const teacherDNI = document.getElementById('teacherDNI').value.trim();
                const teacherCourse = document.getElementById('teacherCourse').value.trim();
                const teacherSubject = document.getElementById('teacherSubject').value.trim();
                const errorMessage = document.getElementById('teacher-error-message');

                errorMessage.style.display = 'none'; 
                
                if (teacherName && teacherDNI === VALID_TEACHER_DNI && teacherCourse && teacherSubject) {
                    sessionStorage.setItem('userRole', 'docente'); 
                    const destino = sessionStorage.getItem('pendingPage');
                    if (destino) {
                        sessionStorage.removeItem('pendingPage');
                        window.location.href = destino;
                    } else {
                        window.location.reload();
                    }
                } else {
                    redirectToHome(errorMessage);
                }
            });
        }
    }
    
    // Interceptar clics en enlaces del portal docente (RUTAS UNIVERSALES COMPLETAS)
    document.addEventListener('click', e => {
        const link = e.target.closest('.docente-link');
        if (!link) return;

        if (sessionStorage.getItem('userRole') !== 'docente') {
            e.preventDefault();
            sessionStorage.setItem('pendingPage', link.getAttribute('href'));
            // Determinar la ruta base según la ubicación actual
            const currentPath = window.location.pathname;
            let portalPath = 'portaldocente/index.html';
            
            if (currentPath.includes('/portaldocente/')) {
                portalPath = 'index.html';
            } else if (currentPath.includes('/portalfamiliar/') || currentPath.includes('/contacto/') || 
                       currentPath.includes('/tecnicaturas/') || currentPath.includes('/institucion/') ||
                       currentPath.includes('/inicioyregistro/')) {
                portalPath = '../portaldocente/index.html';
            }

            window.location.href = portalPath;
        }
    });

    // ====================================================
    // LÓGICA DEL FORMULARIO DE CONTACTO (CORREGIDA)
    // ====================================================
    const formulario = document.querySelector('.formulario-container form');
    const notificacion = document.getElementById('notificacion-envio');

    if (formulario && notificacion) { 
        formulario.addEventListener('submit', function(event) {
            // PREVENIR COMPORTAMIENTO POR DEFECTO
            event.preventDefault(); 
            
            // Verificar validez del formulario
            if (formulario.checkValidity()) {
                // Mostrar notificación de éxito
                notificacion.textContent = '¡Mensaje enviado con éxito!, gracias por comunicarse con nosotros.';
                notificacion.classList.remove('notificacion-oculta');
                notificacion.classList.add('notificacion-visible');

                // Ocultar notificación y resetear formulario después de 4 segundos
                setTimeout(() => {
                    notificacion.classList.remove('notificacion-visible');
                    notificacion.classList.add('notificacion-oculta');
                    formulario.reset(); 
                }, 4000); 
            } else {
                // Mostrar errores de validación nativos
                formulario.reportValidity();
            }
        });
    }
}); // FIN DEL DOMContentLoaded


/*****************************
 * CARRUSEL AUTOMÁTICO 1 (INDEX)
 *****************************/
let heroIndex = 0;
function showSlidesHero() {
    const slides = document.getElementsByClassName("carousel-slide-hero");
    const dots = document.getElementsByClassName("dot-hero");
    if (slides.length === 0) return;

    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    for (let i = 0; i < dots.length; i++) dots[i].classList.remove("active");

    heroIndex++;
    if (heroIndex > slides.length) heroIndex = 1;

    slides[heroIndex - 1].style.display = "block";
    dots[heroIndex - 1].classList.add("active");

    setTimeout(showSlidesHero, 4000);
}

function currentSlideHero(n) {
    heroIndex = n - 1;
    showSlidesHero();
}

document.addEventListener("DOMContentLoaded", showSlidesHero);


/*****************************
 * CARRUSEL AUTOMÁTICO 2 (INSTITUCION)
 *****************************/
let vidaIndex = 0;
function showSlidesVida() {
    const slides = document.getElementsByClassName("carousel-slide-vida");
    const dots = document.getElementsByClassName("dot-vida");
    if (slides.length === 0) return;

    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    for (let i = 0; i < dots.length; i++) dots[i].classList.remove("active");

    vidaIndex++;
    if (vidaIndex > slides.length) vidaIndex = 1;

    slides[vidaIndex - 1].style.display = "block";
    dots[vidaIndex - 1].classList.add("active");

    setTimeout(showSlidesVida, 4000);
}

function currentSlideVida(n) {
    vidaIndex = n - 1;
    showSlidesVida();
}

document.addEventListener("DOMContentLoaded", showSlidesVida);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('uploadNotesForm');
    
    if (!form) return; // Se asegura de que el formulario exista

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Detiene el envío del formulario

        const studentName = document.getElementById('studentName').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const grade = document.getElementById('grade').value;
        
        // Validación de nota (aunque el HTML lo maneja, esto es un buen fallback)
        if (grade < 1 || grade > 10) {
            alert('La nota debe ser un número entre 1 y 10.');
            return;
        }
        
        // --- LÓGICA DE SUBIDA DE NOTAS ---
        // Aquí iría tu código para enviar los datos (studentName, subject, grade, observations)
        // a una base de datos o servidor. 
        // Por ahora, solo simulará el éxito.
        
        // 1. Mostrar la notificación de éxito
        const message = `Se subió la nota de ${subject} exitosa`;
        showNotification(message);

        // 2. Limpiar el formulario
        form.reset();
    });

    /**
     * Muestra una notificación de éxito en la parte inferior de la pantalla.
     * @param {string} message - El mensaje a mostrar.
     */
    function showNotification(message) {
        // Creamos o encontramos el div de la notificación
        let notification = document.getElementById('appNotification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'appNotification';
            // Usamos la clase CSS definida en main.css
            notification.classList.add('notification-success');
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.classList.add('show');

        // Ocultar la notificación después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('attendanceForm');
    
    if (!form) return; 

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const studentName = document.getElementById('studentNameAttendance').value.trim();
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;
        const status = document.getElementById('status').value;

        // Validaciones básicas de fecha y estado
        if (!studentName || !day || !month || !year || !status) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        if (status !== 'presente' && status !== 'ausente') {
             alert('Por favor, seleccione un estado válido.');
             return;
        }

        // --- LÓGICA DE GUARDADO DE ASISTENCIA ---
        // Aquí iría el código para enviar los datos al servidor.
        
        // 1. Crear el mensaje de notificación
        const dateString = `${day}/${month}/${year}`;
        const message = `Se registró la asistencia de ${studentName} como ${status.toUpperCase()} para el día ${dateString}.`;
        
        // 2. Mostrar la notificación de éxito
        showNotification(message);

        // 3. Limpiar el formulario
        form.reset();
    });

    /**
     * Muestra una notificación de éxito con el mismo estilo de la página de notas.
     * @param {string} message - El mensaje a mostrar.
     */
    function showNotification(message) {
        let notification = document.getElementById('appNotification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'appNotification';
            // Reutilizamos la clase CSS definida en main.css
            notification.classList.add('notification-success'); 
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.classList.add('show');

        // Ocultar la notificación después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bulletinForm');
    const fileInput = document.getElementById('bulletinFile');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    
    // 1. Lógica para mostrar el nombre del archivo seleccionado
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            // Muestra el nombre del primer archivo seleccionado
            fileNameDisplay.textContent = fileInput.files[0].name;
            fileNameDisplay.style.color = '#1A2F4E';
        } else {
            fileNameDisplay.textContent = 'Ningún archivo seleccionado.';
            fileNameDisplay.style.color = '#555';
        }
    });

    // 2. Lógica para manejar el envío del formulario
    if (!form) return; 

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const studentName = document.getElementById('studentNameBulletin').value.trim();
        const selectedFile = fileInput.files[0];

        // Validaciones
        if (!studentName) {
            alert('Por favor, ingrese el nombre del alumno.');
            return;
        }

        if (!selectedFile) {
            alert('Por favor, seleccione un archivo (PDF o Imagen).');
            return;
        }

        // --- LÓGICA DE SUBIDA DE ARCHIVOS ---
        // En un entorno real, aquí se usaría `FormData` y `fetch` 
        // para enviar el archivo al servidor.

        // 1. Crear el mensaje de notificación
        const message = `Se subió el boletín (${selectedFile.name}) para ${studentName} exitosamente.`;
        
        // 2. Mostrar la notificación de éxito (reutiliza la función de los scripts anteriores)
        showNotification(message);

        // 3. Limpiar el formulario y el display
        form.reset();
        fileNameDisplay.textContent = 'Ningún archivo seleccionado.';
        fileNameDisplay.style.color = '#555';
    });

    /**
     * Muestra una notificación de éxito (función reutilizada de tus otros scripts).
     * @param {string} message - El mensaje a mostrar.
     */
    function showNotification(message) {
        let notification = document.getElementById('appNotification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'appNotification';
            notification.classList.add('notification-success'); 
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('announcementForm');
    
    if (!form) return; 

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('announcementTitle').value.trim();
        const text = document.getElementById('announcementText').value.trim();

        // Validaciones
        if (!title || !text) {
            alert('Por favor, complete tanto el título como el contenido del comunicado.');
            return;
        }

        // --- LÓGICA DE PUBLICACIÓN DE AVISO ---
        // Aquí iría la lógica para enviar el título y el texto 
        // a una base de datos o sistema de gestión de contenido.
        
        // 1. Crear el mensaje de notificación
        const message = `El aviso titulado "${title}" fue publicado exitosamente.`;
        
        // 2. Mostrar la notificación de éxito
        showNotification(message);

        // 3. Limpiar el formulario
        form.reset();
    });

    /**
     * Muestra una notificación de éxito (función reutilizada de tus otros scripts).
     * @param {string} message - El mensaje a mostrar.
     */
    function showNotification(message) {
        let notification = document.getElementById('appNotification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'appNotification';
            // Reutilizamos la clase CSS definida en main.css
            notification.classList.add('notification-success'); 
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Obtener el botón de descarga y el elemento de notificación (toast)
    const downloadButton = document.getElementById('btn-descargar');
    const notification = document.getElementById('toast-notification');

    // Verificar que ambos elementos existen antes de añadir el listener
    if (downloadButton && notification) {
        downloadButton.addEventListener('click', (event) => {
            // Prevenir cualquier acción por defecto (aunque ahora es un botón)
            event.preventDefault(); 
            
            // 1. Mostrar la notificación añadiendo la clase 'show'
            notification.classList.add('show');

            // 2. Ocultar la notificación después de 3000 milisegundos (3 segundos)
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        });
    }
});