import { circlePlay } from "./scripts/circlePlay";
import { mirrorbarPlay } from "./scripts/mirrorbarPlay";
import { barPlay } from "./scripts/barPlay";
import { lightningPlay } from "./scripts/lightningPlay";
import { heartPlay } from "./scripts/heartPlay";

// STAGE & CANVAS SETTER 
let stage = document.getElementById("canvas");
stage.width = window.innerWidth;
stage.height = window.innerHeight;
let ctx = stage.getContext('2d');

// ANIMATION PAUSE & SEQUENCE SETTER
window.pause = true;
window.animseq = 0;

// HTML CANVAS WIDTH AND HEIGHT
let WIDTH = stage.width;
let HEIGHT = stage.height;

// AUDIO HTML HANDLER
let sfile = document.getElementById("soundfile");
let uploadSound = document.getElementById("uploadButton")
let audio = document.getElementById("audio");

// CUSTOM AUDIO PLAYER
// new Playerjs
// let player = new Playerjs({ id: "player", file: "" });
// let playButton = document.getElementById("player"); 

// PlayerjsEvents("play", "player",);

// CUSTOM HTML BUTTON
const lightning = document.getElementById("lightning")
const circle = document.getElementById("circle")
const heart = document.getElementById("heart")
const bar = document.getElementById("bar")

// FOLLOW MOUSE
$(document).mousemove(function(e) {
    $("#follow").css({
        left: e.pageX - 15,
        top: e.pageY - 10
    });
});

// FIRST TIME MOTTO POP UP
const mottoPopUp = document.getElementById("mottoPopUp");
const closePopUp = document.getElementById("mottoPopUpRemove");
closePopUp.addEventListener("click", function(){
    mottoPopUp.style.opacity = "0";
    mottoPopUp.style.zIndex = "-10"
});

// HTML ELEMENTS
const lightningText = document.getElementById("1");
const circleText = document.getElementById("2");
const heartText = document.getElementById("3");
const cloudText = document.getElementById("4");

// EQ SLIDER HTML SLIDER
const HSfilterGain = document.getElementById("highShelfGain");
const HSfilterFreq = document.getElementById("highShelfFreq");
const LSfilterGain = document.getElementById("lowShelfGain");
const LSfilterFreq = document.getElementById("lowShelfFreq");

const HPfilterFreq = document.getElementById("highPassFreq");
const HPfilterQ = document.getElementById("highPassQ");
const LPfilterFreq = document.getElementById("lowPassFreq");
const LPfilterQ = document.getElementById("lowPassQ");

HSfilterGain.value = 0;
HSfilterFreq.value = 2200;
LSfilterGain.value = 0;
LSfilterFreq.value = 160;

HPfilterFreq.value = 210;
HPfilterQ.value = 0.5;
LPfilterFreq.value = 3500;
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
highShelf.gain.value = 40;
HSfilterGain.addEventListener("input", function(){highShelf.gain.value = HSfilterGain.value})
HSfilterFreq.addEventListener("input", function(){highShelf.frequency.value = HSfilterFreq.value})

// LOWSHELF @ 100
lowShelf.type = "lowshelf";
lowShelf.frequency.value = 100;
lowShelf.gain.value = 40;
LSfilterGain.addEventListener("input", function(){lowShelf.gain.value = LSfilterGain.value})
LSfilterFreq.addEventListener("input", function(){lowShelf.frequency.value = LSfilterFreq.value})


// HIGHPASS @ 100
highPass.type = "highpass";
highPass.frequency.value = 100;
highPass.Q.value = 0.5;
HPfilterFreq.addEventListener("input", function(){highPass.frequency.value = HPfilterFreq.value})
HPfilterQ.addEventListener("input", function(){highPass.Q.value = HPfilterQ.value})

// LOWPASS @ 3150
lowPass.type = "lowpass";
lowPass.frequency.value = 3150;
lowPass.Q.value = 0.5;
LPfilterFreq.addEventListener("input", function(){lowPass.frequency.value = LPfilterFreq.value})
LPfilterQ.addEventListener("input", function(){lowPass.Q.value = LPfilterQ.value})

// WHEN FILE LOADED FUNCTION WILL RUN
sfile.onchange = function(){
    let sfiles = this.files;
    audio.src = URL.createObjectURL(sfiles[0]);
    // let player = new Playerjs({ id: "player", file: `${audio.src}` });
    // console.log(player);
    audio.load();
    // audio.play(); GOOGLE CHROME DOES NOT ALLOW AUTOPLAY WITH CERTAIN EXCEPTIONS

    // CONNECTING ALL MODULES
    src.connect(highShelf);                         // CONNECT SONG
    highShelf.connect(lowShelf);                    // HIGH SHELF FILTER
    lowShelf.connect(highPass);                     // LOW SHELF FILTER
    highPass.connect(lowPass);                      // HIGH PASS FILTER
    lowPass.connect(visualizer);                    // LOW PASS FILTER
    visualizer.connect(audioContext.destination);   // CONNECT TO THE VISUALIZER FROM THE FILTERED SONG

    visualizer.fftSize = 512; // Higher the more detail in data.

    bufferLength = visualizer.frequencyBinCount; // Half of fftSize represents the amount of data values
    dataArray = new Uint8Array(bufferLength);

}

// heartPlay(ctx, sfile, uploadSound, audio, WIDTH, HEIGHT);

lightning.addEventListener("click", e => {
    lightningText.style.color = "red";
    circleText.style.color = "white";
    heartText.style.color = "white";
    cloudText.style.color = "white";
    lightningPlay(ctx, audio, WIDTH, HEIGHT, visualizer);
});

circle.addEventListener("click", e => {
    lightningText.style.color = "white";
    circleText.style.color = "red";
    heartText.style.color = "white";
    cloudText.style.color = "white";
    circlePlay(ctx, audio, WIDTH, HEIGHT, visualizer)
});

heart.addEventListener("click", e => {
    lightningText.style.color = "white";
    circleText.style.color = "white";
    heartText.style.color = "red";
    cloudText.style.color = "white";
    heartPlay(ctx, audio, WIDTH, HEIGHT, visualizer);
});

bar.addEventListener("click", e => {
    lightningText.style.color = "white";
    circleText.style.color = "white";
    heartText.style.color = "white";
    cloudText.style.color = "red";
    barPlay(ctx, audio, WIDTH, HEIGHT, visualizer)
});

uploadSound.addEventListener("click", function(){
    sfile.click();
});
