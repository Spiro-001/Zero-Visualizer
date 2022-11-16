import { circlePlay } from "./scripts/circlePlay";
import { mirrorbarPlay } from "./scripts/mirrorbarPlay";
import { barPlay } from "./scripts/barPlay";
import { lightningPlay } from "./scripts/lightningPlay";
import { heartPlay } from "./scripts/heartPlay";

let stage = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = stage.getContext('2d');

window.pause = true;

let WIDTH = canvas.width;
let HEIGHT = canvas.height;

let sfile = document.getElementById("soundfile");
let uploadSound = document.getElementById("uploadButton")
let audio = document.getElementById("audio"); 

const lightning = document.getElementById("lightning")
const circle = document.getElementById("circle")

// lightningPlay(ctx, sfile, uploadSound, audio, WIDTH, HEIGHT);

let lowShel

lightning.addEventListener("click", e => {
    lightningPlay(ctx, sfile, uploadSound, audio, WIDTH, HEIGHT);
});

circle.addEventListener("click", e => {
    circlePlay(ctx, sfile, uploadSound, audio, WIDTH, HEIGHT)
});

// circlePlay();
// mirrorbarPlay();
// barPlay();
// lightningPlay();
// heartPlay();