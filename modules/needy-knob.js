class NeedyKnob {
  constructor() {
    this.draw();
    $('.up').on('click', this.setUp);
    $('.led').on('click', this.ledToggle);
  }

  // Changes which UP button is selected, then triggers processing
  setUp = () => {
    $('.up').removeClass('needy-button-selected');
    $(event.target).addClass('needy-button-selected');
    this.process();
  }

  // Toggles LED button on or off, then triggers processing
  ledToggle = () => {
    $(event.target).toggleClass('needy-button-selected');
    this.process();
  }

  // Rotates pointer
  rotateKnob = (degreesFromTop) => {
    // Reset to top
    $('#needy-arrow').css('transform','rotate(0deg)');

    // Set new orientation
    $('#needy-arrow').css('transform',`rotate(${degreesFromTop}deg)`);
  }

  // Decides what direction knob should face, if any
  process = () => {
    // Get led status in list
    let leds = [];
    if ($('#needy-0').hasClass('needy-button-selected')) leds.push(1);
    else leds.push(0);

    if ($('#needy-1').hasClass('needy-button-selected')) leds.push(1);
    else leds.push(0);

    if ($('#needy-2').hasClass('needy-button-selected')) leds.push(1);
    else leds.push(0);

    if ($('#needy-3').hasClass('needy-button-selected')) leds.push(1);
    else leds.push(0);

    // Determine degrees to add based on UP config
    let upDegrees;
    if ($('#up-up').hasClass('needy-button-selected'))
      upDegrees = 0;
    if ($('#up-right').hasClass('needy-button-selected'))
      upDegrees = 90;
    if ($('#up-down').hasClass('needy-button-selected'))
      upDegrees = 180;
    if ($('#up-left').hasClass('needy-button-selected'))
      upDegrees = 270;

    // Determine if list matches configuration
    let match;
    let direction = '';
    // UP
    if (leds.join() === [0,0,0,1].join() || leds.join() === [1,0,1,1].join()){
      this.rotateKnob(upDegrees + 0);
      match = true;
      direction = 'UP';
    }
    // DOWN
    else if (leds.join() === [0,1,0,1].join() || leds.join() === [1,0,0,1].join()){
      this.rotateKnob(upDegrees + 180);
      match = true;
      direction = 'DOWN';
    }
    // LEFT
    else if (leds.join() === [0,0,1,1].join() || leds.join() === [0,0,1,0].join()){
      this.rotateKnob(upDegrees + 270);
      match = true;
      direction = 'LEFT';
    }
    // RIGHT
    else if (leds.join() === [1,0,1,0].join()){
      this.rotateKnob(upDegrees + 90);
      match = true;
      direction = 'RIGHT';
    }

    if (match) $('#top-left-text').html(`LED match! (${direction})`);
    else{
      $('#top-left-text').html('No LED match');
      this.rotateKnob(upDegrees + 0);
    } 
    console.log('NeedyKnob.process(): leds', leds);
  }

  draw() {
    console.log('NeedyKnob.draw(): drawing in canvas');
    $('#canvas').html(`
      <div class="row console" id="instructions">If necessary, change UP location.<br>Turn required LEDs on or off.</div>
      <div class="container-fluid" id="needy-container">
      <div id="top-left-text">No LED match</div>
        <div class="d-flex justify-content-center">
          <button class="needy-button needy-button-selected rounded up" id="up-up">UP</button>
        </div>
        <div class="d-flex justify-content-center align-items-center">
          <button class="needy-button rounded up" id="up-left">UP</button>
          <img src="./images/needy-pointer.svg" alt="" id="needy-arrow">
          <button class="needy-button rounded up" id="up-right">UP</button>
        </div>
        <div class="d-flex justify-content-center">
            <button class="needy-button rounded up" id="up-down">UP</button>
        </div>
        <div class="d-flex justify-content-center mt-3">
          <div class="needy-column"><button class="needy-button led" id="needy-0"></button></div>
          <div class="needy-column"><button class="needy-button led" id="needy-1"></button></div>
          <div class="needy-column"><button class="needy-button" disabled></button></div>
          <div class="needy-column"><button class="needy-button" disabled></button></div>
          <div class="needy-column"><button class="needy-button" disabled></button></div>
          <div class="needy-column"><button class="needy-button" disabled></button></div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="needy-column"><button class="needy-button" disabled></button></div>
          <div class="needy-column"><button class="needy-button" disabled></button></div>
          <div class="needy-column"><button class="needy-button" disabled></button></div>
          <div class="needy-column"><button class="needy-button" disabled></button></div>
          <div class="needy-column"><button class="needy-button led" id="needy-2"></button></div>
          <div class="needy-column"><button class="needy-button led" id="needy-3"></button></div>
        </div>
      </div>
    `);
  }


}
