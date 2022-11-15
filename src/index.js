import { circlePlay } from "./scripts/circlePlay";
import { mirrorbarPlay } from "./scripts/mirrorbarPlay";
import { barPlay } from "./scripts/barPlay";
import { lightningPlay } from "./scripts/lightningPlay";
import { heartPlay } from "./scripts/heartPlay";

const lightning = document.getElementById("lightning")
const circle = document.getElementById("circle")
lightning.addEventListener("click", e => {lightningPlay()});
circle.addEventListener("click", e => {circlePlay()});
// circlePlay();
// mirrorbarPlay();
// barPlay();
// lightningPlay();
// heartPlay();