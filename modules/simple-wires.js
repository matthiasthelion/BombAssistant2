const YELLOW_INDEX = 0;
const BLUE_INDEX = 1;
const RED_INDEX = 2;
const WHITE_INDEX = 3;
const BLACK_INDEX = 4;
const YELLOW_RGB = 'rgb(255, 255, 0)';
const YELLOW_ACTIVE_RGB = 'rgb(173, 173, 0)';
const BLUE_RGB = 'rgb(0, 0, 255)';
const BLUE_ACTIVE_RGB = 'rgb(0, 0, 199)';
const RED_RGB = 'rgb(255, 0, 0)';
const RED_ACTIVE_RGB = 'rgb(168, 0, 0)';
const WHITE_RGB = 'rgb(245, 245, 245)';
const WHITE_ACTIVE_RGB = 'rgb(175, 170, 170)';
const BLACK_RGB = 'rgb(0, 0, 0)';
const BLACK_ACTIVE_RGB = 'rgb(49, 49, 49)';

class SimpleWires {
  wiresDisplayed;
  wiresVisible;
  wireList;
  coloursCount;

  constructor() {
    this.draw();
    this.setSettings();
    this.wiresVisible = 1;
    this.wireList = [];
    this.coloursCount = [];
  }

  // TODO: change implementation so only one row is present at a time + clearing wire removes row
  draw() {
    console.log('SimpleWires.draw(): drawing in canvas');
    $('#canvas')
      .html(` <div class="row console" id="instructions">Select wires matching bomb module.</div>
                            <div class="steel-plate container-fluid" id="simple-wire-container">
                              <div id="top-left-text">Serial: </div>
                            </div>
                            <div class="row console" id="commands">Add more wires.</div>`);
    for (let i = 0; i < 6; i++) {
      $('#simple-wire-container').append(`<div class="row simple-wire-row p-1 ${i > 0 ? "hidden" : ""}" id="${i}">
                                <div class="col-4">
                                    <div class="wire my-auto"></div>
                                </div>
                                <div class="col-8 row">
                                    <div class="col-2"><button class="colour-button yellow"></button></div>
                                    <div class="col-2"><button class="colour-button blue"></button></div>
                                    <div class="col-2"><button class="colour-button red"></button></div>
                                    <div class="col-2"><button class="colour-button white"></button></div>
                                    <div class="col-2"><button class="colour-button black"></button></div>
                                    <div class="col-2"><button class="colour-button clear">X</button></div>
                                </div>
                            </div>`);
    }
    $('.colour-button').on('click', this.clickedButton);
  }

  // Collects info on wires.
  collectInfo = () => {
    // Get the wires
    this.coloursCount = [0, 0, 0, 0, 0];
    const rawWires = document.getElementsByClassName('wire');
    this.wireList = [];

    // For each wire, add to list and count colours
    for (let wire of rawWires) {
      if (wire.style.visibility == 'visible') {
        this.wireList.push(wire);

        switch (wire.style.backgroundColor) {
          case RED_RGB:
          case RED_ACTIVE_RGB:
            this.coloursCount[RED_INDEX]++;
            break;
          case WHITE_RGB:
          case WHITE_ACTIVE_RGB:
            this.coloursCount[WHITE_INDEX]++;
            break;
          case BLACK_RGB:
          case BLACK_ACTIVE_RGB:
            this.coloursCount[BLACK_INDEX]++;
            break;
          case YELLOW_RGB:
          case YELLOW_ACTIVE_RGB:
            this.coloursCount[YELLOW_INDEX]++;
            break;
          case BLUE_RGB:
          case BLUE_ACTIVE_RGB:
            this.coloursCount[BLUE_INDEX]++;
            break;
        }
      }
    }
    this.wiresVisible = this.wireList.length;
  };

  // Checks wires and runs logic to give defuser commands
  setCommands = () => {
    console.log('SimpleWires: setCommands() - ' + this.wireList.length);
    console.log('SimpleWires: setCommands() - ' + this.coloursCount);
    // Track last wire for logic purposes
    const LAST_WIRE = this.wireList.length - 1;

    // Run logic for which command to give
    switch (this.wireList.length) {
      case 3:
        // If there are no red wires, cut the second wire.
        if (this.coloursCount[RED_INDEX] == 0)
          $('#commands').html(`Cut the second wire.`);
        // If the last wire is white, cut the last wire.
        else if (this.wireList[LAST_WIRE].style.backgroundColor == WHITE_RGB || this.wireList[LAST_WIRE].style.backgroundColor == WHITE_ACTIVE_RGB)
          $('#commands').html(`Cut the last wire.`);
        // If there is more than one blue wire, cut the last blue wire.
        else if (this.coloursCount[BLUE_INDEX] > 1)
          $('#commands').html(`Cut the last blue wire.`);
        // Cut the last wire.
        else $('#commands').html(`Cut the last wire.`);
        break;
      case 4:
        // If there is > 1 red wire and last digit of serial is odd, cut the last red wire.
        if (this.coloursCount[RED_INDEX] > 1 && $('#odd').hasClass('selected'))
          $('#commands').html(`Cut the last red wire.`);
        // If the last wire is yellow and there are no red wires, cut the first wire.
        else if (
          (this.wireList[LAST_WIRE].style.backgroundColor == YELLOW_RGB || this.wireList[LAST_WIRE].style.backgroundColor == YELLOW_ACTIVE_RGB) &&
          this.coloursCount[RED_INDEX] === 0
        )
          $('#commands').html(`Cut the first wire.`);
        // If there is only 1 blue wire, cut the first wire.
        else if (this.coloursCount[BLUE_INDEX] === 1)
          $('#commands').html(`Cut the first wire.`);
        // If there is > 1 yellow wire, cut the last wire.
        else if (this.coloursCount[YELLOW_INDEX] > 1)
          $('#commands').html(`Cut the last wire.`);
        // Cut the second wire
        else $('#commands').html(`Cut the second wire.`);
        break;
      case 5:
        // If the last wire is black and the last digit of serial is odd, cut 4th wire.
        if (
          (this.wireList[LAST_WIRE].style.backgroundColor == BLACK_RGB || this.wireList[LAST_WIRE].style.backgroundColor == BLACK_ACTIVE_RGB) &&
          $('#odd').hasClass('selected')
        )
          $('#commands').html(`Cut the fourth wire.`);
        // If there is only 1 red wire and > 1 yellow wire, cut the first wire.
        else if (
          this.coloursCount[RED_INDEX] === 1 &&
          this.coloursCount[YELLOW_INDEX] > 1
        )
          $('#commands').html(`Cut the first wire.`);
        // If there are 0 black wires, cut the second wire.
        else if (this.coloursCount[BLACK_INDEX] === 0)
          $('#commands').html(`Cut the second wire.`);
        // Cut the first wire.
        else $('#commands').html(`Cut the first wire.`);
        break;
      case 6:
        // If there are 0 yellow wires, and last digit of serial is odd, cut 3rd wire.
        if (this.coloursCount[YELLOW_INDEX] === 0 && $('#odd').hasClass('selected'))
          $('#commands').html(`Cut the third wire.`);
        // If there is only 1 yellow wire and > 1 white wire, cut 4th wire.
        else if (
          this.coloursCount[YELLOW_INDEX] === 1 &&
          this.coloursCount[WHITE_INDEX] > 1
        )
          $('#commands').html(`Cut the fourth wire.`);
        // If there are 0 red wires, cut the last wire.
        else if (this.coloursCount[RED_INDEX] === 0)
          $('#commands').html(`Cut the last wire.`);
        // Cut the 4th wire.
        else $('#commands').html(`Cut the fourth wire.`);
        break;
      default:
        $('#commands').html(`Add more wires.`);
    }
  };

  // When a user clicks a colour button
  clickedButton = () => {
    // Get button colour
    let colour = $(event.target).css('background-color');
    // Get related wire/line
    let line = $(event.target).closest('.simple-wire-row').find('.wire');

    console.log('SimpleWires: clickedButton() - ' + colour);

    // If already clear, add colour and show
    if (!$(event.target).hasClass('clear')) {
      line.css('background-color', colour);
      line.css('visibility', 'visible');
    } else {
      // else, hide it
      line.css('visibility', 'hidden');
    }
    this.collectInfo();
    this.setCommands();
    this.showWires(this.wiresVisible);
  };

  // Handles modal for requesting settings
  setSettings = () => {
    console.log('SimpleWires.setSettings()');

    // If vowel serial is not set...
    if (!$('#odd').hasClass('selected') && !$('#even').hasClass('selected')) {
      // Draw and show modal
      $('#popup-body').html(`
      <div id="even-odd-serial" class="global-setting-container">
        <div class="row steel-text">
          The last digit of the serial is...
        </div>
        <div class="row">
          <div class="col">
            <button class="steel-button even-odd-button" id="temp-even">
              EVEN
            </button>
          </div>
          <div class="col">
            <button class="steel-button even-odd-button" id="temp-odd">
              ODD
            </button>
          </div>
        </div>
      </div>
      `);

      $('#temp-odd').on('click', this.updateSettings);
      $('#temp-even').on('click', this.updateSettings);
      $('#popup-modal').modal('show');
    }
  };

  // Action to update global settings from temp settings
  updateSettings = () => {
    // Set any buttons with this class to default
    $('.selected.even-odd-button').removeClass('selected');

    // Add the class back to the appropriate button
    $(event.target).addClass('selected');
    // And the global settings equivalent (remove temp from id)
    $(`#${event.target.id.substring(5)}`).addClass('selected');
  };

  // Sees which wires should be visible and makes it so
  showWires = (visibleWireCount) => {
    console.log('visiblewirecount', visibleWireCount);
    const allWires = document.querySelectorAll('.wire');
    console.log('allWires', allWires);
    console.log('wireList', this.wireList);
    allWires.forEach((wire, index) => {
      if (this.wireList[index]) {
        console.log('wire background', wire.style.backgroundColor);
        console.log('wirelist value', this.wireList[index].style.backgroundColor);
        console.log('wirelist index', index);
        wire.style.backgroundColor = this.wireList[index].style.backgroundColor;
        wire.classList.remove('hidden');
        wire.style.visibility = 'visible';
      } else {
        wire.classList.add('hidden');
        wire.style.visibility = 'hidden';
      }
    });

    const allRows = document.querySelectorAll('.simple-wire-row');
    allRows.forEach(row => {
      if (row.id <= visibleWireCount) { row.classList.remove('hidden'); }
      else { row.classList.add('hidden'); }
    });

  };

  // Updates the Serial notification
  updateNotes = () => {
    console.log('SimpleWires.updateNotes()');
    // Is serial set?
    if ($('#odd').hasClass('selected')) {
      $('#top-left-text').html('Serial: Odd');
    } else if ($('#even').hasClass('selected')) {
      $('#top-left-text').html('Serial: Even');
    } else {
      $('#top-left-text').html('Not set.');
    }

    this.setCommands();
  };

  // Repeats an interval so serial notification is frequently updated.
  runInterval = () => {
    return setInterval(this.updateNotes, 1000);
  };
}
