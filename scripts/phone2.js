document.addEventListener("DOMContentLoaded", () => {
  // Imágenes de pantalla para cada sección
  const screenImages = [
    "images/collage3.webp", // Imagen para la sección 1
    "images/chat2.png", // Imagen para la sección 2
    "images/date2.png", // Imagen para la sección 3
    "images/home1.png", // Imagen para la sección 4
  ]

  // Ángulos de rotación del teléfono para cada sección
  const phoneRotations = [
    "rotateY(0deg) rotateX(0deg)", // Rotación para la sección 1
    "rotateY(-25deg) rotateX(5deg)", // Rotación para la sección 2
    "rotateY(25deg) rotateX(-3deg)", // Rotación para la sección 3
    "rotateY(-30deg) rotateX(0deg)", // Rotación para la sección 4
  ]

  // Obtener elementos del DOM
  const phoneScreen = document.querySelector(".phone-screen2")
  const phone = document.querySelector(".phone2")
  const sections = document.querySelectorAll(".section")

  // Eliminar la imagen original si existe
  phoneScreen.innerHTML = ""

  // Crear dos imágenes para alternar entre ellas (técnica de doble buffer)
  const img1 = document.createElement("img")
  const img2 = document.createElement("img")

  // Configurar ambas imágenes
  img1.src = screenImages[0]
  img2.src = screenImages[0]
  img1.alt = "Pantalla de la App"
  img2.alt = "Pantalla de la App"
  img1.style.position = "absolute"
  img2.style.position = "absolute"
  img1.style.top = "0"
  img2.style.top = "0"
  img1.style.left = "0"
  img2.style.left = "0"
  img1.style.width = "100%"
  img2.style.width = "100%"
  img1.style.height = "100%"
  img2.style.height = "100%"
  img1.style.objectFit = "cover"
  img2.style.objectFit = "cover"
  img1.style.zIndex = "2"
  img2.style.zIndex = "1"

  // Añadir imágenes al contenedor
  phoneScreen.appendChild(img1)
  phoneScreen.appendChild(img2)

  // Variable para rastrear qué imagen está visible actualmente
  let activeImage = 1
  let currentSectionIndex = 0
  let lastSectionIndex = 0

  // Precarga de imágenes para evitar el flash negro
  function preloadImages() {
    screenImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }

  // Llamar a la función de precarga
  preloadImages()

  // Función para actualizar la pantalla y rotación del teléfono según la posición de desplazamiento
  function updatePhone() {
    // Calcular la posición de desplazamiento (mitad de la ventana)
    const scrollPosition = window.scrollY + window.innerHeight / 2

    // Encontrar la sección visible actual
    lastSectionIndex = currentSectionIndex
    currentSectionIndex = 0
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop
      const sectionBottom = sectionTop + section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSectionIndex = index
      }
    })

    // Solo actualizar si la sección ha cambiado
    if (currentSectionIndex !== lastSectionIndex) {
      // Determinar qué imagen está activa y cuál inactiva
      const activeImg = activeImage === 1 ? img1 : img2
      const inactiveImg = activeImage === 1 ? img2 : img1

      // Preparar la imagen inactiva con el nuevo contenido
      inactiveImg.src = screenImages[currentSectionIndex]
      inactiveImg.style.opacity = "0"
      inactiveImg.style.transition = "none"

      // Forzar un reflow para asegurar que los cambios se apliquen
      void inactiveImg.offsetWidth

      // Traer la imagen inactiva al frente
      inactiveImg.style.zIndex = "3"
      activeImg.style.zIndex = "2"

      // Hacer aparecer la nueva imagen con una transición suave
      inactiveImg.style.transition = "opacity 0.5s ease"
      inactiveImg.style.opacity = "1"

      // Cambiar la imagen activa
      activeImage = activeImage === 1 ? 2 : 1
    }

    // Actualizar la rotación del teléfono con transición suave
    phone.style.transform = phoneRotations[currentSectionIndex]
  }

  // Agregar detector de eventos de desplazamiento
  window.addEventListener("scroll", () => {
    updatePhone()
  })

  // Inicializar teléfono
  updatePhone()
})
