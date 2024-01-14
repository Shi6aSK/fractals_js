window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //canvas settings
    ctx.fillStyle = 'green';
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;

    //effect settings
    let size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height *0.3;
    const maxLevel = 8;
    const branches = 2;

    let slides = 5;
    let scale = 0.7;
    let spread = 0.6;
    let colour = 'hsl(' + Math.random() * 360+', 100%, 50%)';
    let lineWidth = Math.floor(Math.random() * 20 + 10);

    //controls
    const randomizeButton = document.getElementById('randomizeButton');
    const resetButton = document.getElementById('resetButton');
    const slider_spread = document.getElementById('spread');
    const label_spread = document.querySelector('[for= "spread"]');
    slider_spread.addEventListener('mousemove', function(e) {
        spread = e.target.value;
    updateSliders();
    drawFractal();
    });
     const slider_sides = document.getElementById('sides');
     const label_sides = document.querySelector('[for= "sides"]');
    slider_sides.addEventListener('mousemove', function(e) {
        slides = e.target.value;
        updateSliders();
        drawFractal();
    });

    function drawBranch(level){
        if (level > maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(size,0);
        ctx.stroke();
        for (let i = 1; i < branches + 1; i++){
            ctx.save();
            ctx.translate(size * i / (branches + 1), 0);
            ctx.scale(scale, scale);

            ctx.save();
            ctx.rotate(spread);
            drawBranch(level + 1);
            ctx.restore();

            ctx.restore();
        }
        ctx.beginPath();
        ctx.arc(0, size, size * 0.1, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawFractal(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = colour;
        ctx.fillStyle = colour;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        for (let i = 0; i < slides; i++){
            ctx.rotate((Math.PI * 2) / slides);
            drawBranch(0);
        
        
        }
        ctx.restore();
        randomizeButton.style.backgroundColor = colour;
    }
    drawFractal();

    function randomizeFractal(){
        slides = Math.floor(Math.random() * 7 + 2);
        scale = Math.random() * 0.4 + 0.4;
        spread = Math.random() * 2.9 - 0.1;
        colour = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
        lineWidth = Math.floor(Math.random() * 20 + 10);
    }
    randomizeButton.addEventListener('click', function(){
        randomizeFractal();
        updateSliders();
        drawFractal();
    });

    function resetFractal(){
        slides = 5;
        scale = 0.5;
        spread = 0.7;
        colour = 'hsl(290, 100%, 50%)';
        lineWidth = 15;
    }
    resetButton.addEventListener('click', function(){
        resetFractal();
        updateSliders();
        drawFractal();
    });

    function updateSliders(){
        slider_spread.value = spread;
        label_spread.innerHTML = spread;
        slider_sides.value = slides;
        label_sides.innerHTML = slides;
    }
    updateSliders();

    this.window.addEventListener('resize', function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
        drawFractal();
    });

});