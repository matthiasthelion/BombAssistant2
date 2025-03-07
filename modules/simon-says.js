class SimonSays {
  inputList; // List of input colours
  outputList; // List of commands

  constructor() {
    this.draw();
    this.inputList = [];
    this.outputList = [];
    $('.simon-square').on('click', this.addColour);
    this.setSettings();
  }

  // Adds colour clicked to list
  addColour = () => {
    const colour = $(event.target).attr('value');
    this.inputList.push(colour);
    this.translateList();
    this.printCommands();
  };

  // Translates list into instructions
  translateList = () => {
    console.log('translateList(): input', this.inputList);
    // Get bomb variables
    const serialHasVowel = $('.vowel-button.selected').attr('value') === '1';
    const strikes = parseInt($('#strike-display').attr('value'));

    console.log('serialHasVowel', serialHasVowel);
    console.log('strikes', strikes);

    // Reset output list
    this.outputList = [];

    // For each input, push colour to output
    this.inputList.forEach((colour) => {
      if (serialHasVowel) {
        switch (colour) {
          case 'red':
            switch (strikes) {
              case 0:
                this.outputList.push('blue');
                break;
              case 1:
                this.outputList.push('yellow');
                break;
              case 2:
                this.outputList.push('green');
                break;
            }
            break;
          case 'blue':
            switch (strikes) {
              case 0:
                this.outputList.push('red');
                break;
              case 1:
                this.outputList.push('green');
                break;
              case 2:
                this.outputList.push('red');
                break;
            }
            break;
          case 'green':
            switch (strikes) {
              case 0:
                this.outputList.push('yellow');
                break;
              case 1:
                this.outputList.push('blue');
                break;
              case 2:
                this.outputList.push('yellow');
                break;
            }
            break;
          case 'yellow':
            switch (strikes) {
              case 0:
                this.outputList.push('green');
                break;
              case 1:
                this.outputList.push('red');
                break;
              case 2:
                this.outputList.push('blue');
                break;
            }
            break;
        }
      } else {
        switch (colour) {
          case 'red':
            switch (strikes) {
              case 0:
                this.outputList.push('blue');
                break;
              case 1:
                this.outputList.push('red');
                break;
              case 2:
                this.outputList.push('yellow');
                break;
            }
            break;
          case 'blue':
            switch (strikes) {
              case 0:
                this.outputList.push('yellow');
                break;
              case 1:
                this.outputList.push('blue');
                break;
              case 2:
                this.outputList.push('green');
                break;
            }
            break;
          case 'green':
            switch (strikes) {
              case 0:
                this.outputList.push('green');
                break;
              case 1:
                this.outputList.push('yellow');
                break;
              case 2:
                this.outputList.push('blue');
                break;
            }
            break;
          case 'yellow':
            switch (strikes) {
              case 0:
                this.outputList.push('red');
                break;
              case 1:
                this.outputList.push('green');
                break;
              case 2:
                this.outputList.push('red');
                break;
            }
            break;
        }
      }
    });
    console.log('translateList(): output', this.outputList);
  };

  // Prints commands and record of input
  printCommands = () => {
    $('#input-record').html(`Input: ${this.inputList.join(', ')}`);
    $('#commands').html(`Press: ${this.outputList.join(', ')}`);
  };

  draw() {
    console.log('SimonSays.draw(): drawing in canvas');
    $('#canvas')
      .html(`<div class="row console" id="instructions">Set Serial Vowel and Strikes, then press buttons.</div>
    <div class="steel-plate container-fluid">
    <div id="top-left-text">
      <p id="top-left-serial" class="m-0">Serial Vowel: </p>
      <p id="top-left-strikes" class="m-0">Strikes: </p>
    </div>
      <div id="simon">
        <div id="simon-container">
          <div id="simon-wrapper">
            <div class="red simon-square" id="simon-red" value="red"></div>
            <div class="blue simon-square" id="simon-blue" value="blue"></div>
            <div class="green simon-square" id="simon-green" value="green"></div>
            <div class="yellow simon-square" id="simon-yellow" value="yellow"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row console" id="input-record">-----</div>
    <div class="row console" id="commands">Waiting for input.</div>`);
  }

  // Handles modal for requesting settings
  setSettings = () => {
    console.log('SimonSays.setSettings()');

    // If vowel serial is not set...
    if (!$('#vowel-true').hasClass('selected') && !$('#vowel-false').hasClass('selected')) {
      // Draw and show modal
      $('#popup-body').html(`
        <div id="vowel-serial" class="global-setting-container">
          <div class="row steel-text">The serial contains a vowel.</div>
          <div class="row">
            <div class="col">
              <button class="steel-button vowel-button" value="1" id="temp-vowel-true">
                YES
              </button>
            </div>
            <div class="col">
              <button class="steel-button vowel-button" value="0" id="temp-vowel-false">
                NO
              </button>
            </div>
          </div>
        </div>
      `);

      $('#temp-vowel-false').on('click', this.updateSettings);
      $('#temp-vowel-true').on('click', this.updateSettings);
      $('#popup-modal').modal('show');
    }
  }

  // Action to update global settings from temp settings
  updateSettings = () => {
    // Set any buttons with this class to default
    $('.selected.vowel-button').removeClass('selected');

    // Add the class back to the appropriate button
    $(event.target).addClass('selected');
    // And the global settings equivalent (remove temp from id)
    $(`#${event.target.id.substring(5)}`).addClass('selected');
  }

  // Updates the settings notifications
  updateNotes = () => {
    console.log('SimonSays.updateNotes()');
    // Is serial set?
    if ($('#vowel-true').hasClass('selected')){
      $('#top-left-serial').html('Serial Vowel: True');
    } else if ($('#vowel-false').hasClass('selected')){
      $('#top-left-serial').html('Serial Vowel: False');
    } else {
      $('#top-left-serial').html('Serial Vowel: Not set.');
    }

    $('#top-left-strikes').html(`Strikes: ${parseInt($('#strike-display').attr('value'))}`);
  }

  // Repeats an interval so settings notifications are frequently updated.
  runInterval = () => {
    return setInterval(this.updateNotes, 1000);
  }
}
