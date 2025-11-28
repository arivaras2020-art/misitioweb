document.addEventListener('DOMContentLoaded', () => {

    // ====================================================
    // 1. CONSTANTES GLOBALES Y FUNCIONES DE UTILIDAD (Centralizadas)
    // ====================================================
    const VALID_EMAIL = 'prueba@gmail.com';
    const VALID_PASSWORD = '123';
    const VALID_NAME = 'Usuario Prueba';
    const VALID_PARENT_DNI = '12345678';
    const VALID_TEACHER_DNI = '87654321';
    let userRole = sessionStorage.getItem('userRole') || 'ninguno'; 

    /**
     * Muestra una notificación de éxito (toast) en la parte inferior de la pantalla.
     * Es la versión única y centralizada, utilizada por todos los formularios.
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

    // ====================================================
    // 2. LÓGICA DEL MENÚ OVERLAY Y RUTAS
    // ====================================================
    const menuIcon = document.getElementById('menuIcon');
    const closeBtn = document.getElementById('closeBtn');
    const overlayMenu = document.getElementById('overlayMenu');
    const mainMenuItems = document.querySelectorAll('.main-menu-list a');
    const submenuContainer = document.getElementById('submenuContainer');

    function resetSubmenu() {
        if (submenuContainer) {
             submenuContainer.innerHTML = '';
             submenuContainer.className = 'submenu-container';
        }
    }

    if (menuIcon && overlayMenu && closeBtn && submenuContainer) {
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
        if (!submenuContainer) return; 

        resetSubmenu();

        const currentPath = window.location.pathname;
        let basePath = '';
        
        if (currentPath.includes('/formularios/') || currentPath.includes('/contacto/') || 
            currentPath.includes('/tecnicaturas/') || currentPath.includes('/institucion/') || 
            currentPath.includes('/inicioyregistro/') || currentPath.includes('/portalfamiliar/') || 
            currentPath.includes('/portaldocente/')) {  
            basePath = '../';
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
            default:
                if (overlayMenu) {
                    overlayMenu.classList.remove('open');
                    overlayMenu.style.width = '0%';
                }
                return; 
        }

        submenuContainer.className = `submenu-container ${backgroundImageClass}`;
        submenuContainer.innerHTML = submenuHtml;

        const imagePaths = {
            'inicio-bg': 'menuinicio.jpeg', 'contacto-bg': 'menucontacto.jpeg',
            'tecnicaturas-bg': 'menutecnicaturas.jpeg', 'institucion-bg': 'menuinstitucion.jpg',
            'portalfamiliar-bg': 'menuportalfamiliar.jpg', 'portaldocente-bg': 'menuportaldocente.webp'
        };

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
            } else if (overlayMenu) {
                overlayMenu.classList.remove('open');
                overlayMenu.style.width = '0%';
            }
        });
    });

    document.addEventListener('click', e => {
        if (e.target.closest('.submenu-list a') && overlayMenu) {
            overlayMenu.classList.remove('open');
            overlayMenu.style.width = '0%';
        }
    });

    // ====================================================
    // 3. LÓGICA DE LA BARRA DE BÚSQUEDA
    // ====================================================
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
                const currentPath = window.location.pathname;
                let basePath = '';
                
                if (currentPath.includes('/portalfamiliar/') || currentPath.includes('/portaldocente/')) {
                    basePath = '../../';
                } else if (currentPath.includes('/contacto/') || currentPath.includes('/tecnicaturas/') || 
                           currentPath.includes('/institucion/') || currentPath.includes('/inicioyregistro/')) {
                    basePath = '../';
                }

                const redirectMap = {
                    'inicio': `${basePath}index.html`, 'contacto': `${basePath}contacto/index.html`,
                    'institucion': `${basePath}institucion/index.html`, 'tecnicaturas': `${basePath}tecnicaturas/index.html`,
                    'informatica': `${basePath}tecnicaturas/informatica.html`, 'construcciones': `${basePath}tecnicaturas/construcciones.html`,
                    'electronica': `${basePath}tecnicaturas/electronica.html`, 'electromecanica': `${basePath}tecnicaturas/electromecanica.html`,
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

    // ====================================================
    // 4. LÓGICA DE LOGIN Y REGISTRO
    // ====================================================

    // Login
    const loginForm = document.getElementById('loginForm');
    const loginErrorMessage = document.getElementById('login-error-message');
    
    if (loginForm && loginErrorMessage) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            const email = document.getElementById('email-login').value.trim();
            const password = document.getElementById('password-login').value;
            loginErrorMessage.style.display = 'none';

            if (email === VALID_EMAIL && password === VALID_PASSWORD) {
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
    
    // Registro
    const registerForm = document.getElementById('registerForm');
    const registerErrorMessage = document.getElementById('register-error-message');

    if (registerForm && registerErrorMessage) {
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
    // 5. LÓGICA DE VERIFICACIÓN DE PORTALES
    // ====================================================

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
                const parentDNI = document.getElementById('parentDNI').value.trim();
                const errorMessage = document.getElementById('parent-error-message');
                errorMessage.style.display = 'none';

                if (parentDNI === VALID_PARENT_DNI) {
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
                const teacherDNI = document.getElementById('teacherDNI').value.trim();
                const errorMessage = document.getElementById('teacher-error-message');
                errorMessage.style.display = 'none'; 
                
                if (teacherDNI === VALID_TEACHER_DNI) {
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
    
    // Interceptar clics en enlaces del portal docente
    document.addEventListener('click', e => {
        const link = e.target.closest('.docente-link');
        if (!link) return;

        if (sessionStorage.getItem('userRole') !== 'docente') {
            e.preventDefault();
            sessionStorage.setItem('pendingPage', link.getAttribute('href'));
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
    // 6. LÓGICA DE FORMULARIOS DEL PORTAL DOCENTE Y CONTACTO
    // ====================================================

    // Formulario de Contacto
    const formulario = document.querySelector('.formulario-container form');
    const notificacion = document.getElementById('notificacion-envio');

    if (formulario && notificacion) { 
        formulario.addEventListener('submit', function(event) {
            event.preventDefault(); 
            if (formulario.checkValidity()) {
                notificacion.textContent = '¡Mensaje enviado con éxito!, gracias por comunicarse con nosotros.';
                notificacion.classList.remove('notificacion-oculta');
                notificacion.classList.add('notificacion-visible');

                setTimeout(() => {
                    notificacion.classList.remove('notificacion-visible');
                    notificacion.classList.add('notificacion-oculta');
                    formulario.reset(); 
                }, 4000); 
            } else {
                formulario.reportValidity();
            }
        });
    }

    // Formulario Subir Notas
    const formNotes = document.getElementById('uploadNotesForm');
    if (formNotes) { 
        formNotes.addEventListener('submit', (event) => {
            event.preventDefault();
            const subject = document.getElementById('subject').value.trim();
            const grade = document.getElementById('grade').value;
            
            if (grade < 1 || grade > 10) {
                alert('La nota debe ser un número entre 1 y 10.');
                return;
            }
            
            const message = `Se subió la nota de ${subject} exitosa`;
            showNotification(message);
            formNotes.reset();
        });
    }

    // Formulario Control Asistencia
    const formAttendance = document.getElementById('attendanceForm');
    if (formAttendance) { 
        formAttendance.addEventListener('submit', (event) => {
            event.preventDefault();
            const day = document.getElementById('day').value;
            const month = document.getElementById('month').value;
            const year = document.getElementById('year').value;
            const status = document.getElementById('status').value;

            if (status !== 'presente' && status !== 'ausente') {
                alert('Por favor, seleccione un estado válido.');
                return;
            }

            const dateString = `${day}/${month}/${year}`;
            const message = `Se registró la asistencia como ${status.toUpperCase()} para el día ${dateString}.`;
            
            showNotification(message);
            formAttendance.reset();
        });
    }

    // Formulario Subir Boletín
    const formBulletin = document.getElementById('bulletinForm');
    const fileInput = document.getElementById('bulletinFile');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    
    if (fileInput && fileNameDisplay) {
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                fileNameDisplay.textContent = fileInput.files[0].name;
                fileNameDisplay.style.color = '#1A2F4E';
            } else {
                fileNameDisplay.textContent = 'Ningún archivo seleccionado.';
                fileNameDisplay.style.color = '#555';
            }
        });
    }

    if (formBulletin && fileInput) { 
        formBulletin.addEventListener('submit', (event) => {
            event.preventDefault();
            const selectedFile = fileInput.files[0];

            if (!selectedFile) {
                alert('Por favor, seleccione un archivo (PDF o Imagen).');
                return;
            }

            const message = `Se subió el boletín (${selectedFile.name}) exitosamente.`;
            showNotification(message);

            formBulletin.reset();
            fileNameDisplay.textContent = 'Ningún archivo seleccionado.';
            fileNameDisplay.style.color = '#555';
        });
    }
    
    // Formulario Publicar Comunicado
    const formAnnouncement = document.getElementById('announcementForm');
    if (formAnnouncement) { 
        formAnnouncement.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = document.getElementById('announcementTitle').value.trim();

            if (!title) {
                alert('Por favor, complete tanto el título como el contenido del comunicado.');
                return;
            }
            const message = `El aviso titulado "${title}" fue publicado exitosamente.`;
            showNotification(message);
            formAnnouncement.reset();
        });
    }

    // Botón de Descarga (Toast Notification)
    const downloadButton = document.getElementById('btn-descargar');
    const notificationDownload = document.getElementById('toast-notification');

    if (downloadButton && notificationDownload) {
        downloadButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            notificationDownload.classList.add('show');
            setTimeout(() => {
                notificationDownload.classList.remove('show');
            }, 3000);
        });
    }


// =============================
// CARRUSEL DE PANTALLA COMPLETA
// =============================

const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev-button');
const nextBtn = document.querySelector('.next-button');
let currentSlide = 0;

if (slides.length && prevBtn && nextBtn) {
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  // Cambio automático cada 6 segundos
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 6000);
}
});

