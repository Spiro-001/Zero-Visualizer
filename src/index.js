import { circlePlay } from "./scripts/circlePlay";
import { mirrorbarPlay } from "./scripts/mirrorbarPlay";
import { barPlay } from "./scripts/barPlay";
import { lightningPlay } from "./scripts/lightningPlay";
import { heartPlay } from "./scripts/heartPlay";

// STAGE & CANVAS SETTER 
let stage = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = stage.getContext('2d');

// ANIMATION PAUSE & SEQUENCE SETTER
window.pause = true;
window.animseq = 0;

// HTML CANVAS WIDTH AND HEIGHT
let WIDTH = canvas.width;
let HEIGHT = canvas.height;

// AUDIO HTML HANDLER
let sfile = document.getElementById("soundfile");
let uploadSound = document.getElementById("uploadButton")
let audio = document.getElementById("audio"); 

// CUSTOM HTML BUTTON
const lightning = document.getElementById("lightning")
const circle = document.getElementById("circle")

// EQ SLIDER HTML SLIDER
const HSfilterGain = document.getElementById("highShelfGain");
const HSfilterFreq = document.getElementById("highShelfFreq");
const LSfilterGain = document.getElementById("lowShelfGain");
const LSfilterFreq = document.getElementById("lowShelfFreq");

const HPfilterFreq = document.getElementById("highPassFreq");
const HPfilterQ = document.getElementById("highPassQ");
const LPfilterFreq = document.getElementById("lowPassFreq");
const LPfilterQ = document.getElementById("lowPassQ");

HSfilterGain.value = 50;
HSfilterFreq.value = 2200;
LSfilterGain.value = 50;
LSfilterFreq.value = 60;

HPfilterFreq.value = 3500;
HPfilterQ.value = 0.5;
LPfilterFreq.value = 210;
LPfilterQ.value = 0.5;

// INITIATE AUDIO CONTEXT
let audioContext = new AudioContext();
let src = audioContext.createMediaElementSource(audio);
let visualizer = audioContext.createAnalyser();
let bufferLength;
let dataArray;
visualizer.maxDecibels = -30;
visualizer.minDecibels = -100;

// INITIATE FILTERS
let lowShelf = audioContext.createBiquadFilter();
let highShelf = audioContext.createBiquadFilter();
let highPass = audioContext.createBiquadFilter();
let lowPass = audioContext.createBiquadFilter();

// CONNECTING ALL MODULES
src.connect(highShelf);                         // CONNECT SONG
highShelf.connect(lowShelf);                    // HIGH SHELF FILTER
lowShelf.connect(highPass);                     // LOW SHELF FILTER
highPass.connect(lowPass);                      // HIGH PASS FILTER
lowPass.connect(visualizer);                    // LOW PASS FILTER
visualizer.connect(audioContext.destination);   // CONNECT TO THE VISUALIZER FROM THE FILTERED SONG

// HIGHSHELF @ 2000
highShelf.type = "highshelf";
highShelf.frequency.value = 2000;
highShelf.gain.value = 2200;
HSfilterGain.addEventListener("input", function(){highShelf.gain.value = HSfilterGain.value})
HSfilterFreq.addEventListener("input", function(){highShelf.frequency.value = HSfilterFreq.value})

// LOWSHELF @ 100
lowShelf.type = "lowshelf";
lowShelf.frequency.value = 100;
lowShelf.gain.value = 50;
LSfilterGain.addEventListener("input", function(){lowShelf.gain.value = LSfilterGain.value})
LSfilterFreq.addEventListener("input", function(){lowShelf.frequency.value = LSfilterFreq.value})


// HIGHPASS @ 3150
highPass.type = "highpass";
highPass.frequency.value = 3150;
highPass.Q.value = 0.5;
HPfilterFreq.addEventListener("input", function(){highPass.frequency.value = LSfilterFreq.value})
HPfilterQ.addEventListener("input", function(){highPass.Q.value = HPfilterQ.value})

// LOWPASS @ 100
lowPass.type = "lowpass";
lowPass.frequency.value = 100;
lowPass.Q.value = 0.5;
LPfilterFreq.addEventListener("input", function(){lowShelf.gain.value = LSfilterFreq.value})
LPfilterQ.addEventListener("input", function(){lowShelf.frequency.value = LPfilterQ.value})

// WHEN FILE LOADED FUNCTION WILL RUN
sfile.onchange = function(){

    let sfiles = this.files;
    audio.src = URL.createObjectURL(sfiles[0]);
    audio.load();
    audio.play();

    src.connect(highShelf);
    highShelf.connect(lowShelf);
    lowShelf.connect(highPass);
    highPass.connect(lowPass);
    lowPass.connect(visualizer);
    visualizer.connect(audioContext.destination);

    visualizer.fftSize = 512; // Higher the more detail in data.

    bufferLength = visualizer.frequencyBinCount; // Half of fftSize represents the amount of data values

    dataArray = new Uint8Array(bufferLength);

}

// lightningPlay(ctx, sfile, uploadSound, audio, WIDTH, HEIGHT);

lightning.addEventListener("click", e => {
    lightningPlay(ctx, audio, WIDTH, HEIGHT, visualizer, audioContext, src);
});

circle.addEventListener("click", e => {
    circlePlay(ctx, audio, WIDTH, HEIGHT, visualizer, audioContext, src)
});

uploadSound.addEventListener("click", function(){
    sfile.click();
});
