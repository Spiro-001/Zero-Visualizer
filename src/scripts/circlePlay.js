const circlePlay = function(ctx, sfile, uploadSound, audio, WIDTH, HEIGHT){

    window.animseq = 1;

    ctx.clearRect(0,0, WIDTH, HEIGHT);

    uploadSound.addEventListener("click", function(){
        sfile.click();
    });

    let audioContext = new AudioContext();
    let src = audioContext.createMediaElementSource(audio);
    let visualizer = audioContext.createAnalyser();

    let lowShelf = audioContext.createBiquadFilter();
    let highShelf = audioContext.createBiquadFilter();
    let highPass = audioContext.createBiquadFilter();
    let lowPass = audioContext.createBiquadFilter();

    src.connect(visualizer);
    src.connect(highShelf);
    highShelf.connect(lowShelf);
    lowShelf.connect(highPass);
    highPass.connect(lowPass);
    lowPass.connect(audioContext.destination);

    highShelf.type = "highshelf";
    highShelf.frequency.value = 2000;
    highShelf.gain.value = -100;

    lowShelf.type = "lowshelf";
    lowShelf.frequency.value = 220;
    lowShelf.gain.value = 100;

    highPass.type = "highpass";
    highPass.frequency.value = 800;
    highPass.Q.value = 0.7;

    lowPass.type = "lowpass";
    lowPass.frequency.value = 100;
    lowPass.Q.value = 12;

    src.connect(visualizer);
    visualizer.connect(audioContext.destination);
    visualizer.fftSize = 512; // Higher the more detail in data.

    let bufferLength = visualizer.frequencyBinCount; // Half of fftSize represents the amount of data values
    let dataArray = new Uint8Array(bufferLength);
    let barHeight = 0;
    let EQ = 5 // THE AMOUNT OF IF STATEMENTS

    sfile.onchange = function(){
        let sfiles = this.files;
        audio.src = URL.createObjectURL(sfiles[0]);
        audio.load();
        audio.play();

        audioContext = new AudioContext();
        src = audioContext.createMediaElementSource(audio);
        visualizer = audioContext.createAnalyser();

        src.connect(visualizer);
        src.connect(highShelf);
        highShelf.connect(lowShelf);
        lowShelf.connect(highPass);
        highPass.connect(lowPass);
        lowPass.connect(audioContext.destination);
    
        highShelf.type = "highshelf";
        highShelf.frequency.value = 4700;
        highShelf.gain.value = -100;
    
        lowShelf.type = "lowshelf";
        lowShelf.frequency.value = 220;
        lowShelf.gain.value = 100;
    
        highPass.type = "highpass";
        highPass.frequency.value = 800;
        highPass.Q.value = 0.7;
    
        lowPass.type = "lowpass";
        lowPass.frequency.value = 100;
        lowPass.Q.value = 12;

        src.connect(visualizer);
        visualizer.connect(audioContext.destination);
        visualizer.fftSize = 512; // Higher the more detail in data.

        bufferLength = visualizer.frequencyBinCount; // Half of fftSize represents the amount of data values
        dataArray = new Uint8Array(bufferLength);
    
        barHeight = 0;
        EQ = 5 // THE AMOUNT OF IF STATEMENTS
        renderVisualizer();
    }

    function renderVisualizer(){
        if (window.animseq === 1){
            ctx.clearRect(0,0, WIDTH, HEIGHT);
            visualizer.getByteFrequencyData(dataArray);
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            for (let i = 0; i < bufferLength; i++){
                barHeight = dataArray[i];
                ctx.beginPath();
                if (
                    (i >= 0 && i < 3) && // Frequency
                    barHeight > (150 * audio.volume) // Noise Gate
                    ) 
                {
                    ctx.lineWidth = 1;
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
                    ctx.lineWidth = 1;
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
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = `rgb(${200},${50},${255})`;
                    ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, (4 / EQ) * Math.PI, (5 / EQ) * Math.PI, false);
                }
                else if ( // MID TO HIGH
                    (i >= 11 && i < 13) && // Frequency
                    barHeight > (195 * audio.volume) // Noise Gate
                    )
                {
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = `rgb(${255},${0},${255})`;
                    ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, (5 / EQ) * Math.PI, (6 / EQ) * Math.PI, false);
                }
                else if ( // CLAPS
                    (i >= 13 && i < 19) && // Frequency
                    barHeight > (185 * audio.volume) // Noise Gate
                    )
                {
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = `rgb(${255},${255},${255})`;
                    ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, (6 / EQ) * Math.PI, (7 / EQ) * Math.PI, false);
                }
                else if ( // HIGH 
                    (i >= 19 && i < 25) && // Frequency
                    barHeight > (185 * audio.volume) // Noise Gate
                    )
                {
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = `rgb(${255},${255},${255})`;
                    ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, (7 / EQ) * Math.PI, (8 / EQ) * Math.PI, false);
                }
                else if ( // HIGH
                    (i >= 25 && i < 35) && // Frequency
                    barHeight > (185 * audio.volume) // Noise Gate
                    )
                {
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = `rgb(${255},${255},${255})`;
                    ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, (8 / EQ) * Math.PI, (9 / EQ) * Math.PI, false);
                }
                else if ( // HIGH
                    (i >= 35 && i < 50) && // Frequency
                    barHeight > (185 * audio.volume) // Noise Gate
                    )
                {
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = `rgb(${255},${255},${255})`;
                    ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, (9 / EQ) * Math.PI, (10 / EQ) * Math.PI, false);
                }

                ctx.stroke();
            }
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = `rgb(${255},${255},${255})` 
            ctx.arc(canvas.width / 2, canvas.height / 2, 255, 0, 2 * Math.PI, false);
            ctx.stroke();
            requestAnimationFrame(renderVisualizer);
        }
    }
    
    if (visualizer) {
        ctx.clearRect(0,0, WIDTH, HEIGHT);
        renderVisualizer();
        console.log("a");
    }


}

export { circlePlay };