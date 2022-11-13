const heartPlay = function(){

    let sfile = document.getElementById("soundfile");
    let uploadSound = document.getElementById("uploadButton")
    let audio = document.getElementById("audio");

    uploadSound.addEventListener("click", function(){
        sfile.click();
    });
  
    sfile.onchange = function(){
        let sfiles = this.files;
        audio.src = URL.createObjectURL(sfiles[0]);
        audio.load();
        audio.play();
        let audioContext = new AudioContext();
        let src = audioContext.createMediaElementSource(audio);
        let visualizer = audioContext.createAnalyser();

        let stage = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let ctx = stage.getContext('2d');
        src.connect(visualizer);
        visualizer.connect(audioContext.destination);
        visualizer.fftSize = 1024; // Higher the more detail in data.

        let bufferLength = visualizer.frequencyBinCount; // Half of fftSize represents the amount of data values

        let dataArray = new Uint8Array(bufferLength);

        let WIDTH = canvas.width;
        let HEIGHT = canvas.height;

        let barWidth = (WIDTH / bufferLength) * 2.5;
        let barHeight;
        let boxSize = 64;

        let x = 0;
        let y = 0;
        let boxCount = 0;
        let startRipple;
        let heartArray = [96, 97, 100, 101,
                        123, 124, 125, 126, 127, 128, 129, 130,
                        151, 152, 153, 154, 155, 156, 157, 158,
                        180, 181, 182, 183, 184, 185,
                        209, 210, 211, 212,
                        238, 239
                    ]

        function renderVisualizer(){
            requestAnimationFrame(renderVisualizer);
            x = 0;
            y = 1;
            boxCount = 1;
            startRipple = undefined;
            visualizer.getByteFrequencyData(dataArray);
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            for (let i = 0; i < bufferLength; i++){
                if (heartArray.includes(boxCount))
                {
                    if (dataArray[3] < 200) barHeight = 0;
                    else barHeight = dataArray[4];
                    ctx.fillStyle = `rgba(${255},${0},${0},${barHeight / 256})`;
                    ctx.fillRect(x, y, boxSize, boxSize);
                }
                else
                {
                    while(startRipple === undefined)
                    {
                        startRipple = Math.floor(Math.random() * 449);
                        if (heartArray.includes(startRipple)) startRipple = undefined;
                        console.log(startRipple);
                    }
                    for (let howManyTimes = 0; howManyTimes <= 28; howManyTimes++)
                    {
                        ctx.fillStyle = `rgba(${255},${0},${0})`;
                        ctx.fillRect(startRipple * 69, Math.floor(startRipple / 28) * 69, boxSize, boxSize);
                    }
                }
                
                x += boxSize + 5; // GAP
                boxCount += 1;
                if (x > 1920) x = 0, y += boxSize + 5; // GAP and RESET X

            }
        }
        audio.play();
        renderVisualizer();
    }
}


export { heartPlay };
//7.5 W
//4 H