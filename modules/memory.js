class Memory {
  nextPhase; // Two phases: query, record
  stage; // 1-5 stages of modules. Affects instructions
  storageValue; // Temporarily stores the position or value number. Later used to add to table.
  storageType; // Either position or value. So we know where the storageValue goes
  stageHistory; // 2D list of [position, value] entered

  constructor() {
    this.draw();
    this.nextPhase = 'query';
    this.stage = 1;
    this.stageHistory = [];
    this.storageValue = 0;
    $('.memory-number').on('click', this.numberButton);
  }

  // Decide what to do with button inputs 1-4
  numberButton = () => {
    const number = parseInt($(event.target).attr('value'));
    // If phase is initial query
    if (this.nextPhase === 'query'){
      this.printInstructions(number);
      this.nextPhase = 'record';
    } else { // Else phase is record
      if (this.stage <= 5){
        $('#commands').html(`Select number on module screen.`);

        // Add into to table properly
        if (this.storageType === 'position')
          this.addToTable(this.storageValue, number);
        else 
          this.addToTable(number, this.storageValue);

        this.nextPhase = 'query';
        this.stage++; // Stage is over. Move to next stage.
      } else {
        $('#commands').html(`Final stage complete.`);
      }
      
    }
  }

  // Add numbers to table array
  addToTable = (position, value) => {
    this.stageHistory.push([position, value]);
  }

  // Converts number to ordinal value
  getOrdinal = (number) => {
    switch (number) {
      case 1:
        return 'first';
      case 2:
        return 'second';
      case 3:
        return 'third';
      case 4:
        return 'fourth';
      default:
        return '';
    }
  }

  // Prints instructions and sets storage value
  printInstructions = (number) => {
    const POSITION = 0;
    const VALUE = 1;

    // This switch statement is for the stages 1-5
    // Inner switch statements are for the value of button pressed.
    switch (this.stage) {
      case 1:
        this.storageType = 'position';
        switch (number) {
          case 1:
            $('#commands').html(`On bomb: Press the button in the second position.`);
            this.storageValue = 2;
            break;
          case 2:
            $('#commands').html(`On bomb: Press the button in the second position.`);
            this.storageValue = 2;
            break;
          case 3:
            $('#commands').html(`On bomb: Press the button in the third position.`);
            this.storageValue = 3;
            break;
          case 4:
            $('#commands').html(`On bomb: Press the button in the fourth position.`);
            this.storageValue = 4;
            break;
        }
        $('#commands').append(`<br>BombAssistant: Select label of that button.`);
        break;
      case 2:
        switch (number) {
          case 1:
            $('#commands').html(`On bomb: Press the button labelled "4".`);
            $('#commands').append(`<br>BombAssistant: Select position of that button.`);
            this.storageType = 'value';
            this.storageValue = 4;
            break;
          case 2:
            $('#commands').html(`On bomb: Press the button in ${this.getOrdinal(this.stageHistory[0][POSITION])} position.`);
            $('#commands').append(`<br>BombAssistant: Select label of that button.`);
            this.storageType = 'position';
            this.storageValue = this.stageHistory[0][POSITION];
            break;
          case 3:
            $('#commands').html(`On bomb: Press the button in first position.`);
            $('#commands').append(`<br>BombAssistant: Select label of that button.`);
            this.storageType = 'position';
            this.storageValue = 1;
            break;
          case 4:
            $('#commands').html(`On bomb: Press the button in ${this.getOrdinal(this.stageHistory[0][POSITION])} position.`);
            $('#commands').append(`<br>BombAssistant: Select label of that button.`);
            this.storageType = 'position';
            this.storageValue = this.stageHistory[0][POSITION];
            break;
        }
        break;
      case 3:
        switch (number) {
          case 1:
            $('#commands').html(`On bomb: Press the button labelled "${this.stageHistory[1][VALUE]}".`);
            $('#commands').append(`<br>BombAssistant: Select position of that button.`);
            this.storageType = 'value';
            this.storageValue = this.stageHistory[1][VALUE];
            break;
          case 2:
            $('#commands').html(`On bomb: Press the button labelled "${this.stageHistory[0][VALUE]}".`);
            $('#commands').append(`<br>BombAssistant: Select position of that button.`);
            this.storageType = 'value';
            this.storageValue = this.stageHistory[0][VALUE];
            break;
          case 3:
            $('#commands').html(`On bomb: Press the button in the third position.`);
            $('#commands').append(`<br>BombAssistant: Select label of that button.`);
            this.storageType = 'position';
            this.storageValue = 3;
            break;
          case 4:
            $('#commands').html(`On bomb: Press the button labelled "4".`);
            $('#commands').append(`<br>BombAssistant: Select position of that button.`);
            this.storageType = 'value';
            this.storageValue = 4;
            break;
        }
        break;
      case 4:
        this.storageType = 'position';
        switch (number) {
          case 1:
            $('#commands').html(`On bomb: Press the button in ${this.getOrdinal(this.stageHistory[0][POSITION])} position.`);
            this.storageValue = this.stageHistory[0][POSITION];
            break;
          case 2:
            $('#commands').html(`On bomb: Press the button in first position.`);
            this.storageValue = 1;
            break;
          case 3:
            $('#commands').html(`On bomb: Press the button in ${this.getOrdinal(this.stageHistory[1][POSITION])} position.`);
            this.storageValue = this.stageHistory[1][POSITION];
            break;
          case 4:
            $('#commands').html(`On bomb: Press the button in ${this.getOrdinal(this.stageHistory[1][POSITION])} position.`);
            this.storageValue = this.stageHistory[1][POSITION];
            break;
        }
        $('#commands').append(`<br>BombAssistant: Select label of that button.`);
        break;
      case 5:
        this.storageType = 'value';
        switch (number) {
          case 1:
            $('#commands').html(`On bomb: Press the button labelled "${this.stageHistory[0][VALUE]}".`);
            this.storageValue = this.stageHistory[0][VALUE];
            break;
          case 2:
            $('#commands').html(`On bomb: Press the button labelled "${this.stageHistory[1][VALUE]}".`);
            this.storageValue = this.stageHistory[1][VALUE];
            break;
          case 3:
            $('#commands').html(`On bomb: Press the button labelled "${this.stageHistory[3][VALUE]}".`);
            this.storageValue = this.stageHistory[3][VALUE];
            break;
          case 4:
            $('#commands').html(`On bomb: Press the button labelled "${this.stageHistory[2][VALUE]}".`);
            this.storageValue = this.stageHistory[2][VALUE];
            break;
        }
        $('#commands').append(`<br>BombAssistant: Select position of that button.`);
        break;
      default:
        $('#commands').html(`Final stage complete.`);
        break;
    }
  }

  draw() {
    console.log('Memory.draw(): drawing in canvas');
    $('#canvas').html(`
      <div class="row console" id="instructions">Follow commands at bottom.</div>
      <div class="container-fluid">
        <div class="container row p-3">
          <div class="col-3 px-1"><button class="steel-button memory-number" value="1">1</button></div>
          <div class="col-3 px-1"><button class="steel-button memory-number" value="2">2</button></div>
          <div class="col-3 px-1"><button class="steel-button memory-number" value="3">3</button></div>
          <div class="col-3 px-1"><button class="steel-button memory-number" value="4">4</button></div>
        </div>
      </div>
      <div class="row console" id="commands">Select number on module screen.</div>
    `);
  }
}
