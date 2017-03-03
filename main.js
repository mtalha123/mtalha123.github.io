 var body = document.getElementsByTagName("body");

//make the width of the body equal to any screen width (adjusts to multiple resolutions)
body[0].style.width = screen.availWidth + "px";

var canvas = document.getElementById("canvas");

//innerWidth and innerHeight are the width and height of the window without toolbars/scrollbars (i.e. content on page)
var canvasWidth = canvas.width = window.innerWidth;
var canvasHeight = canvas.height = window.innerHeight;

//get context of main canvas and store in variable "context"
var gl = canvas.getContext("webgl");


//----------------

var widthFactor = 1.0 / canvasWidth;
var heightFactor = 1.0 / canvasHeight;

var vertexShaderSource = document.getElementById("vertexShader").textContent;
var fragmentShaderSource = document.getElementById("fragmentShader").textContent;

gl.clearColor(0.5, 0.8, 0.2, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);


var vertexShader = gl.createShader(gl.VERTEX_SHADER);
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertexShader, vertexShaderSource);
gl.shaderSource(fragmentShader, fragmentShaderSource);

gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    alert("Could not compile vertex shader: " + gl.getShaderInfoLog(vertexShader));
}

gl.compileShader(fragmentShader);

if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    alert("Could not compile fragment shader: " + gl.getShaderInfoLog(fragmentShader));
}


var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);

if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
  alert("Could not link shaders: " + gl.getProgramInfoLog(shaderProgram));
}
gl.useProgram(shaderProgram);

var vertices = [
        -1.0, 1.0,  
        -1.0, -1.0,  
        1.0, 1.0,
         
        1.0, 1.0,
        -1.0, -1.0,
        1.0, -1.0
];

var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

var vertexPositionAttribLocation = gl.getAttribLocation(shaderProgram, "vertexPosition");
gl.enableVertexAttribArray(vertexPositionAttribLocation);
gl.vertexAttribPointer(vertexPositionAttribLocation, 2, gl.FLOAT, false, 0, 0);

var uniformLocation = gl.getUniformLocation(shaderProgram, "resolution");
gl.uniform2f(uniformLocation, canvasWidth, canvasHeight);

var time = 1;

var timeLocation = gl.getUniformLocation(shaderProgram, "time");
gl.uniform1f(timeLocation, time);

var fpsCounter = 0;
var fps;
var startTime = Date.now();

var texture = gl.createTexture();
var image = new Image();
image.src = "brick.jpg";

image.onload = function(){
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
};

gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, texture);

var samplerLocation = gl.getUniformLocation(shaderProgram, "sampler");
gl.uniform1i(samplerLocation, 0);

function draw(){
    gl.viewport(0, 0, canvasWidth, canvasHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);

    time += 0.02;
    gl.uniform1f(timeLocation, time);
    
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
   // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
//    fpsCounter++;
//    if((Date.now() - startTime) >= 1000){
//        fps = fpsCounter;
//        fpsCounter = 0;
//        startTime = Date.now();
//    }
//    
//    console.log("FPS: " + fps);
    
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
