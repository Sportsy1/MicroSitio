let personaje;
let arriba = ["frame0", "frame1", "frame2", "frame1"];
let abajo = ["frame6", "frame7", "frame8", "frame7"];
let izquierda = ["frame9", "frame10", "frame11", "frame10"];
let derecha = ["frame3", "frame4", "frame5", "frame4"];
let frames = abajo;
let velocidadMovimiento = 2;
let movimiento = { arriba: false, abajo: false, izquierda: false, derecha: false };
let frame_actual = 0;

window.onload = function () {
  personaje = document.getElementById("personaje");
  setInterval(animar, 100);
};

function animar() {
  personaje.className = frames[frame_actual];
  frame_actual = (frame_actual + 1) % frames.length;
}

function moverPersonaje() {
  if (movimiento.arriba) {
    frames = arriba;
    const newPosition = parseInt(getComputedStyle(personaje).top) - velocidadMovimiento;
    const imageElement = document.getElementById("my-image");
    const imageTop = parseInt(getComputedStyle(imageElement).top);

    if (newPosition >= imageTop) {
      personaje.style.top = newPosition + "px";
    }
  }
  if (movimiento.abajo) {
    frames = abajo;
    const newPosition = parseInt(getComputedStyle(personaje).top) + velocidadMovimiento;
    const imageElement = document.getElementById("my-image");
    const imageBottom = parseInt(getComputedStyle(imageElement).top) + parseInt(getComputedStyle(imageElement).height) - parseInt(getComputedStyle(personaje).height);

    if (newPosition <= imageBottom) {
      personaje.style.top = newPosition + "px";
    }
  }
  if (movimiento.izquierda) {
    frames = izquierda;
    const newPosition = parseInt(getComputedStyle(personaje).left) - velocidadMovimiento;
    const imageElement = document.getElementById("my-image");
    const imageLeft = parseInt(getComputedStyle(imageElement).left);

    if (newPosition >= imageLeft) {
      personaje.style.left = newPosition + "px";
    }
  }
  if (movimiento.derecha) {
    frames = derecha;
    const newPosition = parseInt(getComputedStyle(personaje).left) + velocidadMovimiento;
    const imageElement = document.getElementById("my-image");
    const imageRight = parseInt(getComputedStyle(imageElement).left) + parseInt(getComputedStyle(imageElement).width) - parseInt(getComputedStyle(personaje).width);

    if (newPosition <= imageRight) {
      personaje.style.left = newPosition + "px";
    }
  }
  requestAnimationFrame(moverPersonaje);
}

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

