const heartPlay = function(ctx, audio, WIDTH, HEIGHT, visualizer){

    // ANIMATION SEQUENCE SO THEY DONT STACK WITH OTHER VISUALIZERS
    window.animseq = 4;

    // HIGHER BUFFER SIZE WILL CONTAIN MORE INFORMATION
    visualizer.fftSize = 1024;

    // INITIATE BASED ON TYPE OF VISUALIZTION
    let bufferLength = visualizer.frequencyBinCount; // Half of fftSize represents the amount of data values
    let dataArray = new Uint8Array(bufferLength);
    let barHeight;
    let boxSize = 64;

    let x = 0;
    let y = 0;
    let boxCount = 0;
    let startRipple;
    let howManyTimes = 0;
    let tick = 0;
    let heartBeatSize = 4; // SMALLER NUMBER MEANS BIGGER BUMP
    let heartArray = [96, 97, 100, 101,
                    123, 124, 125, 126, 127, 128, 129, 130,
                    151, 152, 153, 154, 155, 156, 157, 158,
                    180, 181, 182, 183, 184, 185,
                    209, 210, 211, 212,
                    238, 239
                    ]

    // RENDER VISUALIZATION FUNCTION
    function renderVisualizer(){
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        x = 0;
        y = 1;
        boxCount = 1;
        startRipple;
        visualizer.getByteFrequencyData(dataArray);
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        for (let i = 0; i < bufferLength; i++){
            if (heartArray.includes(boxCount)) {
                ctx.fillStyle = `rgba(${255},${255},${255},${1})`;
                ctx.fillRect(x, y, boxSize, boxSize);
            }

            
            ctx.fillStyle = `rgba(${255},${0},${0},${1})`;
            ctx.fillRect(x + barHeight / heartBeatSize, y + barHeight / heartBeatSize, boxSize, boxSize);

            if (dataArray[4] < 150) barHeight = 0;
            else {
                // barHeight = dataArray[4];
                // // ctx.fillStyle = `rgba(${255},${0},${0},${barHeight / 256})`;
                // ctx.fillStyle = `rgba(${255},${255},${255},${barHeight / 256})`;
                // // ctx.fillStyle = `rgba(${47},${253},${255},${barHeight / 256})`;
                // ctx.fillRect(x, y, boxSize, boxSize);
 

            }
            if (dataArray[3] < 150) barHeight = 0;
            else {
                if (heartArray.includes(boxCount)) {
                    barHeight = dataArray[3];
                    // ctx.fillStyle = `rgba(${255},${0},${0},${1})`;
                    // ctx.fillRect(x - barHeight / (heartBeatSize * 2), y - barHeight / heartBeatSize, boxSize + barHeight / heartBeatSize, boxSize + barHeight / heartBeatSize);

                }
            }

            if (!heartArray.includes(boxCount))
            {

                
            }
            else
            {

                // while(startRipple === undefined)
                // {
                //     startRipple = Math.floor(Math.random() * 449);
                //     if (heartArray.includes(startRipple)) startRipple = undefined;
                // }
                // if (tick === 0){
                //     ctx.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
                //     ctx.fillRect((startRipple % 28) * 69, (Math.floor(startRipple / 28) - howManyTimes) * 69, boxSize, boxSize); // UP
                //     ctx.fillRect(((startRipple % 28) + howManyTimes) * 69, Math.floor(startRipple / 28) * 69, boxSize, boxSize); // RIGHT
                //     ctx.fillRect((startRipple % 28) * 69, (Math.floor(startRipple / 28) + howManyTimes) * 69, boxSize, boxSize); // DOWN
                //     ctx.fillRect(((startRipple % 28) - howManyTimes) * 69, Math.floor(startRipple / 28) * 69, boxSize, boxSize); // LEFT
                //     ctx.fillStyle = `rgba(${0},${0},${0})`;
                //     ctx.fillRect((startRipple % 28) * 69, (Math.floor(startRipple / 28) - (howManyTimes - 1)) * 69, boxSize, boxSize); // UP
                //     ctx.fillRect(((startRipple % 28) + howManyTimes - 1) * 69, Math.floor(startRipple / 28) * 69, boxSize, boxSize); // RIGHT
                //     ctx.fillRect((startRipple % 28) * 69, (Math.floor(startRipple / 28) + howManyTimes - 1) * 69, boxSize, boxSize); // DOWN
                //     ctx.fillRect(((startRipple % 28) - (howManyTimes - 1)) * 69, Math.floor(startRipple / 28) * 69, boxSize, boxSize); // LEFT
                //     howManyTimes += 1;
                //     if (howManyTimes === 28) {howManyTimes = 0; startRipple = undefined;} 
                // }
                // tick += 1;
            }
            
            x += boxSize + 5; // GAP
            boxCount += 1;
            if (x > 1920) x = 0, y += boxSize + 5; // GAP and RESET X
            // if (tick === 1500) tick = 0; 

        }
        requestAnimationFrame(renderVisualizer);
    }

    // IF SONG IS NOT LOADED VISUALIZER WILL NOT START
    if (visualizer) {
        ctx.clearRect(0,0, WIDTH, HEIGHT);
        renderVisualizer();
    }
}


export { heartPlay };
//7.5 W
//4 H