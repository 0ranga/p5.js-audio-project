var song;
var slider;
var button;
var amp;
var volhistory = [];
var mic;
var fft;
var w;

// function preload() {
//   song = loadSound("file.mp3");
// }

function setup() {
  // put setup code here
  angleMode(DEGREES);

  createCanvas(700, 512);
  // createCanvas(256,256);
  song = loadSound("file3.mp3", loaded);
  // amp = new p5.Amplitude();
  
  fft = new p5.FFT(0.6, 512);

  // w=width/16;

  // mic = new p5.AudioIn();
  // mic.start();
  // var buttonmic = createButton("mic");
  // buttonmic.mousePressed(test);


  //slider = createSlider(0, 1, 0.5, 0.01);
  background(51);
  // noStroke();
  // rect(0, 0, 20, 20);
  // copy(0, 0, 20, 20, 0, 50, 20, 20)
}

// function test (){
//   getAudioContext().resume();
// }

var position = 0;
var amplitude = [];
var count = 0;

function draw() {
  // put drawing code here
  fill(255);
  colorMode(RGB);
  // background(51);
  text("Frame Count with frameRate " +  int(getFrameRate()), 60, 60);
  // song.setVolume(slider.value());


  // SOUND VISUALIZER
  // var vol = amp.getLevel();
  // volhistory.push(vol);
  // console.log(vol);
  var spectrum = fft.analyze();
  var wave = fft.waveform();

  // amplitude.push(spectrum);
  // console.log(spectrum);
  colorMode(RGB);
  for (let i = 0; i < spectrum.length; i++) {
    // const amp = amplitude[i];

    // for (let j = 0; j < amp.length; j++) {
    //   const x = amp[j];
    //   var y = map(amp[j], 0, 256, 0, 100)
    //   stroke(0, y, 50);
    //   point(i,height-j);
    // }
    // noStroke();
    // var y = map(amp, 0, 256, height, 0);
    // fill(y/3, 255, 255);
    // rect(i*w, y, w-6, height-y);

    var waveAmp = map(wave[i],-1,1, 0, 200);
    var yPos = map(wave[i],-1,1,height/2,-height/2);
  
    const amp = spectrum[i];
    var y = map(amp, 0, 256, 100, 0);
    var x = map(amp, 0, 256, 360, 0);
    var z = map(amp, 0, 256, 0, 100);
      stroke(x, y, waveAmp);
      stroke(x, y, z);
      strokeWeight(1);
      point(position,height-i);
      // stroke(0);
      stroke(i, yPos, waveAmp);
      // point(position, height/2+yPos);

  }
  

  // if (amplitude.length > width ){
  //     amplitude.splice(0,1);
  //   }

  if (position<width-10){
    position++;
  } else {
    copy(0, 0, width, height, -1, 0, width, height);
    // noLoop();
  }

  count++;
 
  // stroke (255);
  // noFill();

  //

  //CIRCLE
  // translate(width/2, height/2);
  // beginShape();
  // for (var i = 0; i < 360; i++){
  //   var r = map(volhistory[i], 0, 1, 30, 300);
  //   var x = r * cos(i);
  //   var y = r * sin(i);
  //   vertex(x, y);
  // }
  // endShape();

  // if (volhistory.length > 360 ){
  //   volhistory.splice(0,1);
  // }





  // beginShape();
  // for (var i = 0; i < volhistory.length; i++){
  //   var y = map(volhistory[i], 0, 1, height/2, 0);
  //   vertex(i, y);
  // }
  // endShape();

  // if (volhistory.length > width-50 ){
  //   volhistory.splice(0,1);
  // }


  //var diam = map(vol, 0, 1, 10, 200);
  // fill(255, 0, 255);
  // ellipse(width/2, height/2, diam, diam);


  // MIC VISUALIZATION
  // var vol = mic.getLevel();
  // fill(255,0,255);
  // ellipse(width/2, height/2, vol*200, vol*200);
  // console.log(vol);

}

function touchStarted() {
  // getAudioContext().resume();
}

function loaded() {

  button = createButton("play");
  button.mousePressed(togglePlaying);



}

function togglePlaying () {

  if(!song.isPlaying()){
    song.play();
    button.html("pause");
  } else {
    song.pause();
    button.html("play");
  }

}

