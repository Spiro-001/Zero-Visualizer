const barPlay = function(ctx, audio, WIDTH, HEIGHT, visualizer){
    // ANIMATION SEQUENCE SO THEY DONT STACK WITH OTHER VISUALIZERS
    window.animseq = 3;

    // HIGHER BUFFER SIZE WILL CONTAIN MORE INFORMATION
    visualizer.fftSize = 256;

    // INITIATE BASED ON TYPE OF VISUALIZTION
    let bufferLength = visualizer.frequencyBinCount; // Half of fftSize represents the amount of data values
    let dataArray = new Uint8Array(bufferLength);
    let barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    // RENDER VISUALIZATION FUNCTION
    function renderVisualizer(){
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        if (window.animseq === 3){
            x = 0;
            visualizer.getByteFrequencyData(dataArray);
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            for (let i = 0; i < bufferLength; i++){
                barHeight = dataArray[i];
                ctx.fillStyle = `rgba(${47},${253},${255},${barHeight / 255})`;
                ctx.fillRect(x , HEIGHT - barHeight, barWidth, barHeight);
                ctx.fillRect(x , HEIGHT - barHeight, barWidth, -1.5 * barHeight);
    
                x += barWidth + 10; // GAP
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

export { barPlay };