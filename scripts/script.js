const menuBtn = document.getElementById("menu-btn");
const closeMenu = document.getElementById("close-menu");
const menuOverlay = document.getElementById("menu-overlay");
const menuRight = document.getElementById("menu-right");

menuBtn.addEventListener("click", () => {
  menuOverlay.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  menuOverlay.classList.remove("active");
  menuRight.innerHTML = ""; // limpiar submenú
});

// Submenús según sección
const submenus = {
  inicio: {
    titulo: "Inicio",
    items: [
      { texto: "Sobre nosotros", link: "#inicio" },
      { texto: "Nuestras tecnicaturas", link: "#tecnicaturas" },
      { texto: "Últimas noticias", link: "#noticias" },
      { texto: "Testimonios", link: "#testimonios" },
    ],
    img: "imagenes/estudiantes.jpg",
  },
  contacto: {
    titulo: "Contacto",
    items: [
      { texto: "Información", link: "contacto.html" },
      { texto: "Ubicación", link: "contacto.html" },
      { texto: "Horario de atención", link: "contacto.html" },
      { texto: "Enviar mensaje", link: "contacto.html" },
    ],
    img: "imagenes/contacto.jpg",
  },
  tecnicaturas: {
    titulo: "Tecnicaturas",
    items: [
      { texto: "Informática", link: "informatica.html" },
      { texto: "Construcciones", link: "construcciones.html" },
      { texto: "Electromecánica", link: "electromecanica.html" },
      { texto: "Electrónica", link: "electronica.html" },
    ],
    img: "imagenes/tecnicaturas.jpg",
  },
  institucion: {
    titulo: "Institución",
    items: [
      { texto: "Nuestra historia", link: "institucion.html" },
      { texto: "Equipo directivo", link: "institucion.html" },
      { texto: "Vida escolar", link: "institucion.html" },
      { texto: "Misión, visión y valores", link: "institucion.html" },
    ],
    img: "imagenes/institucion.jpg",
  },
};

// Mostrar submenú
document.querySelectorAll(".menu-left ul li").forEach((item) => {
  item.addEventListener("click", () => {
    const section = item.getAttribute("data-section");
    const data = submenus[section];

    if (data) {
      menuRight.style.backgroundImage = `url(${data.img})`;
      menuRight.innerHTML = `
        <div class="submenu">
          <h3>${data.titulo}</h3>
          <ul>
            ${data.items.map(i => `<li onclick="window.location='${i.link}'">${i.texto}</li>`).join("")}
          </ul>
        </div>
      `;
    }
  });
});
