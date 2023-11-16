document.addEventListener("DOMContentLoaded", function () {
  let arriba = ["frame0", "frame1", "frame2", "frame1"];
  let abajo = ["frame6", "frame7", "frame8", "frame7"];
  let izquierda = ["frame9", "frame10", "frame11", "frame10"];
  let derecha = ["frame3", "frame4", "frame5", "frame4"];
  let frames = abajo;
  let velocidadMovimiento = 3;
  let movimiento = { arriba: false, abajo: false, izquierda: false, derecha: false };
  let frame_actual = 0;
  const distanciaProximidad = 50;

  function animar() {
    personaje.className = frames[frame_actual];
    frame_actual = (frame_actual + 1) % frames.length;
  }

  function moverPersonaje() {
    if (movimiento.arriba) {
      frames = arriba;
      const newPosition = parseInt(getComputedStyle(personaje).top) - velocidadMovimiento;
      const imageElement = document.getElementById("background");
      const imageTop = parseInt(getComputedStyle(imageElement).top);
  
      const Limit_Element = document.getElementById("limitante");
      const imageTop_Element = parseInt(getComputedStyle(Limit_Element).top);

      if (newPosition >= imageTop_Element) {
        personaje.style.top = newPosition + "px";
      }
    }
    if (movimiento.abajo) {
      frames = abajo;
      const newPosition = parseInt(getComputedStyle(personaje).top) + velocidadMovimiento;
      const imageElement = document.getElementById("background");
      const imageBottom = parseInt(getComputedStyle(imageElement).top) + parseInt(getComputedStyle(imageElement).height) - parseInt(getComputedStyle(personaje).height);
  
      if (newPosition <= imageBottom) {
        personaje.style.top = newPosition + "px";
      }
    }
    if (movimiento.izquierda) {
      frames = izquierda;
      const newPosition = parseInt(getComputedStyle(personaje).left) - velocidadMovimiento;
      const imageElement = document.getElementById("background");
      const imageLeft = parseInt(getComputedStyle(imageElement).left);
  
      if (newPosition >= imageLeft) {
        personaje.style.left = newPosition + "px";
      }
    }
    if (movimiento.derecha) {
      frames = derecha;
      const newPosition = parseInt(getComputedStyle(personaje).left) + velocidadMovimiento;
      const imageElement = document.getElementById("background");
      const imageRight = parseInt(getComputedStyle(imageElement).left) + parseInt(getComputedStyle(imageElement).width) - parseInt(getComputedStyle(personaje).width);
  
      if (newPosition <= imageRight) {
        personaje.style.left = newPosition + "px";
      }
    }
    requestAnimationFrame(moverPersonaje);
  }

  // Inicializar elementos
  personaje = document.getElementById("personaje");

  Imagen_1 = document.getElementById("Imagen_1");
  Imagen_2 = document.getElementById("Imagen_2");
  Imagen_3 = document.getElementById("Imagen_3");
  Imagen_4 = document.getElementById("Imagen_4");
  popUp_1 = document.querySelector(".pop-up_1");
  popUp_2 = document.querySelector(".pop-up_2");
  popUp_3 = document.querySelector(".pop-up_3");
  popUp_4 = document.querySelector(".pop-up_4");

  moverPersonaje();

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        movimiento.arriba = true;
        break;
      case "ArrowDown":
        movimiento.abajo = true;
        break;
      case "ArrowLeft":
        movimiento.izquierda = true;
        break;
      case "ArrowRight":
        movimiento.derecha = true;
        break;
      case "i":
        window.location.href = 'INVENTARIO_PC.html';
        break;
      case "I":
        window.location.href = 'INVENTARIO_PC.html';
        break;
      case "m":
        window.location.href = 'MAPA_PC.html';
        break;
      case "M":
        window.location.href = 'MAPA_PC.html';
        break;
    }
  });

  document.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "ArrowUp":
        movimiento.arriba = false;
        break;
      case "ArrowDown":
        movimiento.abajo = false;
        break;
      case "ArrowLeft":
        movimiento.izquierda = false;
        break;
      case "ArrowRight":
        movimiento.derecha = false;
        break;
    }
  });

  setInterval(animar, 100);

  let PopUp_1_Visible = false;
  let PopUp_2_Visible = false;
  let PopUp_3_Visible = false;
  let PopUp_4_Visible = false;
  let distancia_Imagen_1;
  let distancia_Imagen_2;
  let distancia_Imagen_3;
  let distancia_Imagen_4;

  function togglePopUp() {
    console.log("En efecto se hizo.");
    const personajeRect = personaje.getBoundingClientRect();
    const Rect_1 = Imagen_1.getBoundingClientRect();
    const Rect_2 = Imagen_2.getBoundingClientRect();
    const Rect_3 = Imagen_3.getBoundingClientRect();
    const Rect_4 = Imagen_4.getBoundingClientRect();

    const centroImagen = (rect) => ({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });

    const Imagen_1_pos = centroImagen(Rect_1);
    const Imagen_2_pos = centroImagen(Rect_2);
    const Imagen_3_pos = centroImagen(Rect_3);
    const Imagen_4_pos = centroImagen(Rect_4);

    distancia_Imagen_1 = calcularDistancia(personajeRect, Imagen_1_pos);
    distancia_Imagen_2 = calcularDistancia(personajeRect, Imagen_2_pos);
    distancia_Imagen_3 = calcularDistancia(personajeRect, Imagen_3_pos);
    distancia_Imagen_4 = calcularDistancia(personajeRect, Imagen_4_pos);

    //console.log("Distancia a Segunda Imagen:", distancia_Imagen_1);
    //console.log("Distancia a Tercera Imagen:", distancia_Imagen_2);

    if (distancia_Imagen_1 <= distanciaProximidad) {
      PopUp_1_Visible = !PopUp_1_Visible;
      togglePopUpVisible(popUp_1, PopUp_1_Visible);
    } else {
      PopUp_1_Visible = false;
      togglePopUpVisible(popUp_1, false);
    }

    if (distancia_Imagen_2 <= distanciaProximidad) {
      PopUp_2_Visible = !PopUp_2_Visible;
      togglePopUpVisible(popUp_2, PopUp_2_Visible);
    } else {
      PopUp_2_Visible = false;
      togglePopUpVisible(popUp_2, false);
    }

    if (distancia_Imagen_3 <= distanciaProximidad) {
      PopUp_3_Visible = !PopUp_3_Visible;
      togglePopUpVisible(popUp_3, PopUp_3_Visible);
    } else {
      PopUp_3_Visible = false;
      togglePopUpVisible(popUp_3, false);
    }

    if (distancia_Imagen_4 <= distanciaProximidad) {
      PopUp_4_Visible = !PopUp_4_Visible;
      togglePopUpVisible(popUp_4, PopUp_4_Visible);
    } else {
      PopUp_4_Visible = false;
      togglePopUpVisible(popUp_4, false);
    }

  }

  function calcularDistancia(rect, punto) {
    const centerX1 = rect.x + rect.width / 2;
    const centerY1 = rect.y + rect.height / 2;

    return Math.sqrt(Math.pow(centerX1 - punto.x, 2) + Math.pow(centerY1 - punto.y, 2));
  }

  function togglePopUpVisible(popUpElement, isVisible) {
    if (isVisible) {
      popUpElement.style.display = "block";
    } else {
      popUpElement.style.display = "none";
    }
  }

  const buttonToShowPopUp = document.getElementById("showPopUpButton");
  buttonToShowPopUp.addEventListener("click", togglePopUp);
  document.addEventListener("keydown", (event) => {
    if (event.key === "e") {
        togglePopUp();
    }
  });
});