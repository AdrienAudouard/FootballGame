import { GameFramework } from '../framework/GameFramework';

let gf;

function onClickDocument(e) {
  gf.onClick(e);
}

function mouseMoveDocument(e) {
  gf.onMouseMove(e);
}

function initDocument() {
  gf = new GameFramework();
  gf.init();
}

window.onload = initDocument;
document.onclick = onClickDocument;
document.onmousemove = mouseMoveDocument;
