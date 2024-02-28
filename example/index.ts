import { Application } from 'pixi.js';
import img0 from './img0.jpeg';
import img1 from './img1.jpeg';
import { Camera3d, Container3d, Sprite3d } from '../src/index';

console.log('hello world!');

// ---
const canvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;
canvasElement.style.width = '100vw';
canvasElement.style.height = '100vh';

const app = new Application({
  view: canvasElement,
  width: 750,
  height: 1624,
  autoStart: true,
});

document.body.appendChild(app.view);

window.app = app;

// ---
const camera = new Camera3d();
camera.setPlanes(500, 0, 1000, false); // true if you want orthographics projection
// I assume you have an app or renderer already
camera.position.set(375, 812);

// const root = new Tiny.Container();
const root = camera;

const container = new Container3d();
root.addChild(container);

const sprite1 = Sprite3d.from(img0);
sprite1.anchor.set(0.5);
// sprite1.position.set(375, 812);
container.addChild(sprite1);

// sprite1.convertTo3d();
sprite1.position3d.set(0, 0, 500);

const sprite2 = Sprite3d.from(img1);
sprite2.anchor.set(0.5);
// sprite2.position.set(375, 812);
container.addChild(sprite2);

// sprite2.convertTo3d();
sprite2.position3d.set(0, 0, 0);
window.sprite2 = sprite2;

app.stage.addChild(root);

//
let duration = 0;
app.ticker.add((delta) => {
  duration = (duration + delta * app.ticker.deltaMS) % 4000;
  const pi = duration / 2000 * Math.PI;
  sprite2.position3d.set(Math.cos(pi) * 300, Math.cos(pi) * 300, Math.sin(pi) * 300 + 500);

  container.sortChildren();
});

