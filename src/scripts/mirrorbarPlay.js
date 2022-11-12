const mirrorbarPlay = function(){

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
        visualizer.fftSize = 256; // Higher the more detail in data.

        let bufferLength = visualizer.frequencyBinCount; // Half of fftSize represents the amount of data values

        let dataArray = new Uint8Array(bufferLength);

        let WIDTH = canvas.width;
        let HEIGHT = canvas.height;

        let barWidth = (WIDTH / bufferLength);
        let barHeight;
        let x = 0;

        function renderVisualizer(){
            requestAnimationFrame(renderVisualizer);
            x = 0;
            visualizer.getByteFrequencyData(dataArray);
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            for (let i = 0; i < bufferLength; i++){
                barHeight = dataArray[i];
                ctx.fillStyle = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${(Math.random() * 1)})`;
                ctx.fillRect(x , HEIGHT / 2 - barHeight, barWidth, barHeight);
                ctx.fillRect(x , HEIGHT / 2 - barHeight, barWidth, 2 * barHeight);
                x += barWidth + 5; // GAP
            }
        }
        audio.play();
        renderVisualizer();
    }
}

export { mirrorbarPlay };