const lightningPlay = function(ctx, sfile, uploadSound, audio, WIDTH, HEIGHT){

    window.animseq = 2;

    uploadSound.addEventListener("click", function(){
        sfile.click();
    });

    let audioContext = new AudioContext();
    let src = audioContext.createMediaElementSource(audio);
    let visualizer = audioContext.createAnalyser();

    src.connect(visualizer);
    visualizer.connect(audioContext.destination);
    visualizer.fftSize = 512; // Higher the more detail in data.

    let bufferLength = visualizer.frequencyBinCount; // Half of fftSize represents the amount of data values
    let dataArray = new Uint8Array(bufferLength);
    let barHeight = 0;
    let x = 0;
    let EQ = 5;

    sfile.onchange = function(){

        let sfiles = this.files;
        audio.src = URL.createObjectURL(sfiles[0]);
        audio.load();
        audio.play();

        audioContext = new AudioContext();
        src = audioContext.createMediaElementSource(audio);
        visualizer = audioContext.createAnalyser();

        src.connect(visualizer);
        visualizer.connect(audioContext.destination);
        visualizer.fftSize = 512; // Higher the more detail in data.

        bufferLength = visualizer.frequencyBinCount; // Half of fftSize represents the amount of data values

        dataArray = new Uint8Array(bufferLength);

        barHeight = 0;
        x = 0;
        EQ = 5 // THE AMOUNT OF IF STATEMENTS
        renderVisualizer();
    }

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

    if (visualizer) {
        ctx.beginPath();
        ctx.stroke();
        ctx.clearRect(0,0, WIDTH, HEIGHT);
        renderVisualizer();
        console.log("b");
    }

}

export { lightningPlay };