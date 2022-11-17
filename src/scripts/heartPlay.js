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
        if (window.animseq === 4){
            x = 0;
            y = 1;
            boxCount = 1;
            let startRipple;
            
            visualizer.getByteFrequencyData(dataArray);
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            for (let i = 0; i < bufferLength; i++){
                if (heartArray.includes(boxCount)) {
                    // ctx.fillStyle = `rgba(${255},${255},${255},${dataArray[8] / 256})`;
                    // ctx.fillRect(x, y, boxSize + 5, boxSize + 5);
                }
                else {
                    ctx.fillStyle = `rgba(${255},${255},${255},${dataArray[12] / 256})`;
                    ctx.fillRect(x, y, boxSize, boxSize);
                }
                
                x += boxSize + 5; // GAP
                boxCount += 1;
                if (x > 1920) x = 0, y += boxSize + 5; // GAP AND RESET X LIKE A TYPEWRITER
            }
    
            x = 0;
            y = 1;
            boxCount = 1;
    
            for (let i = 0; i < bufferLength; i++){
                if (dataArray[6] > 100) barHeight = dataArray[4];
                else barHeight = 0;
    
                if (heartArray.includes(boxCount)){
                    ctx.fillStyle = `rgba(${0},${0},${0},${0.7})`;
                    ctx.fillRect(x + 10 - barHeight / heartBeatSize, y + 10 - barHeight / heartBeatSize, boxSize + 5 + barHeight / heartBeatSize, boxSize + 5 + barHeight / heartBeatSize);
                }
                
                x += boxSize + 5; // GAP
                boxCount += 1;
                if (x > 1920) x = 0, y += boxSize + 5; // GAP AND RESET X LIKE A TYPEWRITER
            }

            x = 0;
            y = 1;
            boxCount = 1;
    
            for (let i = 0; i < bufferLength; i++){
                if (dataArray[6] > 100) barHeight = dataArray[4];
                else barHeight = 0;
    
                if (heartArray.includes(boxCount)) {
                    ctx.fillStyle = `rgba(${255},${0},${0},${1})`;
                    ctx.fillRect(x - barHeight / heartBeatSize, y - barHeight / heartBeatSize, boxSize + 5 + barHeight / heartBeatSize, boxSize + 5 + barHeight / heartBeatSize);
                }
                
                x += boxSize + 5; // GAP
                boxCount += 1;
                if (x > 1920) x = 0, y += boxSize + 5; // GAP AND RESET X LIKE A TYPEWRITER
            }

            for (let i = 0; i < bufferLength; i++){
                
                x += boxSize + 5; // GAP
                boxCount += 1;
                if (x > 1920) x = 0, y += boxSize + 5; // GAP AND RESET X LIKE A TYPEWRITER
            }
    
            requestAnimationFrame(renderVisualizer);
        }
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