const lightningPlay = function(ctx, audio, WIDTH, HEIGHT, visualizer){

    // ANIMATION SEQUENCE SO THEY DONT STACK WITH OTHER VISUALIZERS
    window.animseq = 2;

    // HIGHER BUFFER SIZE WILL CONTAIN MORE INFORMATION
    visualizer.fftSize = 512; 

    // INITIATE BASED ON TYPE OF VISUALIZTION
    let bufferLength = visualizer.frequencyBinCount; // Half of fftSize represents the amount of data values
    let dataArray = new Uint8Array(bufferLength);
    let barHeight = 0;
    let x = 0;
    let EQ = 5; // THE AMOUNT OF IF STATEMENTS

    // RENDER VISUALIZATION FUNCTION
    function renderVisualizer(){
        if (window.animseq === 2){
            visualizer.getByteFrequencyData(dataArray);
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            for (let i = 0; i < bufferLength; i++){
                barHeight = dataArray[i];

                if (
                    (i >= 0 && i < 3) && // Frequency
                    barHeight > (150 * audio.volume) // Noise Gate
                    ) 
                {
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = `rgb(${255},${0},${0})`; // SUBS
                    ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, (0 / EQ) * Math.PI, (1 / EQ) * Math.PI, false);
                }
                else if (
                    (i >= 3 && i < 4) && // Frequency
                    barHeight > (150 * audio.volume) // Noise Gate
                    ) 
                {
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = `rgb(${255},${0},${0})`; // LOWS
                    ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, (1 / EQ) * Math.PI, (2 / EQ) * Math.PI, false);
                }
                else if (
                    (i > 4 && i < 6) && // Frequency
                    barHeight > (150 * audio.volume) // Noise Gate
                    ){
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = `rgb(${0},${255},${0})`; // MIDS
                    ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, (2 / EQ) * Math.PI, (3 / EQ) * Math.PI, false);
                }
                else if (
                    (i >= 6 && i < 8) && // Frequency
                    barHeight > (150 * audio.volume) // Noise Gate
                    )
                {
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = `rgb(${0},${0},${255})`; // HIGHS
                    ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, (3 / EQ) * Math.PI, (4 / EQ) * Math.PI, false);
                }
                else if (
                    (i > 8 && i < 11) && // Frequency
                    barHeight > (150 * audio.volume) // Noise Gate
                    )
                {
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = `rgb(${200},${50},${255})`;
                    ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, (4 / EQ) * Math.PI, (5 / EQ) * Math.PI, false);
                }
                else if ( // MID TO HIGH
                    (i >= 11 && i < 13) && // Frequency
                    barHeight > (150 * audio.volume) // Noise Gate
                    )
                {
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = `rgb(${255},${0},${255})`;
                    ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, (5 / EQ) * Math.PI, (6 / EQ) * Math.PI, false);
                }
                else if ( // CLAPS
                    (i >= 13 && i < 19) && // Frequency
                    barHeight > (150 * audio.volume) // Noise Gate
                    )
                {
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = `rgb(${255},${255},${255})`;
                    ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, (6 / EQ) * Math.PI, (7 / EQ) * Math.PI, false);
                }
                else if ( // HIGH 
                    (i >= 19 && i < 25) && // Frequency
                    barHeight > (150 * audio.volume) // Noise Gate
                    )
                {
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = `rgb(${255},${255},${255})`;
                    ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, (7 / EQ) * Math.PI, (8 / EQ) * Math.PI, false);
                }
                else if ( // HIGH
                    (i >= 25 && i < 35) && // Frequency
                    barHeight > (150 * audio.volume) // Noise Gate
                    )
                {
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = `rgb(${255},${255},${255})`;
                    ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, (8 / EQ) * Math.PI, (9 / EQ) * Math.PI, false);
                }
                else if ( // HIGH
                    (i >= 35 && i < 50) && // Frequency
                    barHeight > (150 * audio.volume) // Noise Gate
                    )
                {
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = `rgb(${255},${255},${255})`;
                    ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, (9 / EQ) * Math.PI, (10 / EQ) * Math.PI, false);
                }
                x += 1
                ctx.stroke();
                if ((x % 64) === 0){
                    ctx.beginPath();
                    ctx.stroke();
                }
            }
            requestAnimationFrame(renderVisualizer);
        }
    }

    // IF SONG IS NOT LOADED VISUALIZER WILL NOT START
    if (visualizer) {
        ctx.beginPath();
        ctx.stroke();
        ctx.clearRect(0,0, WIDTH, HEIGHT);
        renderVisualizer();
    }

}

export { lightningPlay };