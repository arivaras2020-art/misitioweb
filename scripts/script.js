document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // Lógica del Menú Overlay
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

    // Lógica para mostrar los submenús (se mantiene la que ya tenías)
    function showSubmenu(menuType) {
        // ... (Tu código showSubmenu con switch case aquí) ...
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
    // Lógica de la Barra de Búsqueda (CORREGIDA Y AMPLIADA)
    // ----------------------------------------------------
    const searchToggle = document.getElementById('searchToggle');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');

    if (searchToggle && searchContainer && searchInput) {
        // Tarea 1: Alternar (Toggle) la barra al hacer clic en la lupa
        searchToggle.addEventListener('click', () => {
            searchContainer.classList.toggle('active');

            if (searchContainer.classList.contains('active')) {
                searchInput.focus();
            } else {
                searchInput.value = '';
            }
        });

        // Tarea 2: Manejar la búsqueda al presionar ENTER
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();

                const query = searchInput.value.toLowerCase().trim();

                // ----------------------------------------------------------
                // Diccionario de Redirecciones (Todas tus opciones solicitadas)
                // ----------------------------------------------------------
                const redirectMap = {
                    // Páginas Principales
                    'inicio': 'index.html',
                    'contacto': 'contacto.html',
                    'informacion de contacto': 'contacto.html',
                    'horarios': 'contacto.html',
                    'institucion': 'institucion.html',
                    'tecnicaturas': 'tecnicaturas.html',

                    // Páginas de Tecnicaturas
                    'informatica': 'informatica.html',
                    'construcciones': 'construcciones.html',
                    'electronica': 'electronica.html',
                    'electromecanica': 'electromecanica.html',
                };

                let destination = null;

                // Buscar la palabra clave en el diccionario
                for (const keyword in redirectMap) {
                    if (query.includes(keyword)) {
                        destination = redirectMap[keyword];
                        break; // Encontró la mejor coincidencia
                    }
                }

                if (destination) {
                    window.location.href = destination;
                } else if (query.length > 0) {
                    // Opción genérica si no hay coincidencia
                    window.location.href = `resultados.html?q=${encodeURIComponent(query)}`;
                }

                // Limpieza y cierre
                searchContainer.classList.remove('active');
                searchInput.value = '';
            }
        });
    }
});