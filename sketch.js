var diameter; 
var angle = 0;

function preload() {
  soundFormats('mp3', 'ogg');
  soundFile = loadSound('Frank Ocean - Nights.mp3');
}

function setup() {
  createCanvas(800, 500);
  diameter = height - 10;
  noStroke();
  fill(255, 204, 0);
	
	 // loop the sound file
  soundFile.loop();

  filter = new p5.LowPass();

  // Disconnect soundfile from master output.
  // Then, connect it to the filter, so that we only hear the filtered sound
  soundFile.disconnect();
  soundFile.connect(filter);
  fft = new p5.FFT();
}

function draw() {
  background(0);

  var d1 = 10 + (sin(angle) * diameter/2) + diameter/2;
  var d2 = 10 + (sin(angle + PI/2) * diameter/2) + diameter/2;
  var d3 = 10 + (sin(angle + PI) * diameter/2) + diameter/2;
  
  ellipse(0, height/2, d1, d1);
	fill(255, 153, 102);
  ellipse(width/2, height/2, d2, d2);
	fill (204, 102, 0);
  ellipse(width, height/2, d3, d3);
  fill (255, 153, 51); 
  angle += 0.02;
	
	filterFreq = map (mouseX, 0, width, 10, 22050);

  // Map mouseY to resonance (volume boost) at the cutoff frequency
  filterRes = map(mouseY, 0, height, 15, 5);

  // set filter parameters
  filter.set(filterFreq, filterRes);

  // Draw every value in the FFT spectrum analysis where
  // x = lowest (10Hz) to highest (22050Hz) frequencies,
  // h = energy (amplitude / volume) at that frequency
  var spectrum = fft.analyze();
  noStroke();
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width/spectrum.length, h) ;
  }
}
