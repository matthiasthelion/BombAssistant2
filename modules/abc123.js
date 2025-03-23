class ABC123 {
  redIndex; // Indeces to track positiion in each sequence.
  blueIndex;
  blackIndex;
  redSequence; // Sequences that hold possible letters for each index. 2D arrays.
  blueSequence;
  blackSequence;

  constructor() {
    this.redIndex = 0;
    this.blueIndex = 0;
    this.blackIndex = 0;
    this.redSequence = this.getRedSequence();
    this.blueSequence = this.getBlueSequence();
    this.blackSequence = this.getBlackSequence();
    this.draw();
    $('.abc123-button').on('click', this.buttonClicked);
  }

  // Sequence getters. Return array of possible letters for each index.
  getRedSequence = () => {
    return [
      ['C'],
      ['B'],
      ['A'],
      ['A', 'C'],
      ['B'],
      ['A', 'C'],
      ['A', 'B', 'C'],
      ['A', 'B'],
      ['B'],
    ];
  };

  getBlueSequence = () => {
    return [
      ['B'],
      ['A', 'C'],
      ['B'],
      ['A'],
      ['B'],
      ['B', 'C'],
      ['C'],
      ['A', 'C'],
      ['A'],
    ];
  };

  getBlackSequence = () => {
    return [
      ['A', 'B', 'C'],
      ['A', 'C'],
      ['B'],
      ['A', 'C'],
      ['B'],
      ['B', 'C'],
      ['A', 'B'],
      ['C'],
      ['C'],
    ];
  };

  // Action when either of the three buttons is clicked
  buttonClicked = () => {
    // Which button was clicked?
    const buttonID = $(event.target).attr('id');
    // Advance relevant index and get new content, only if more elements in sequence
    let newContent;
    switch (buttonID) {
      case 'red-button':
        if (this.redIndex < this.redSequence.length - 1) {
          this.redIndex++;
          newContent = (this.redIndex + 1) + '. ' + this.redSequence[this.redIndex].join(' ');
        }
        break;
      case 'blue-button':
        if (this.blueIndex < this.blueSequence.length - 1) {
          this.blueIndex++;
          newContent = (this.blueIndex + 1) + '. ' + this.blueSequence[this.blueIndex].join(' ');
        }
        break;
      case 'black-button':
        if (this.blackIndex < this.blackSequence.length - 1) {
          this.blackIndex++;
          newContent = (this.blackIndex + 1) + '. ' + this.blackSequence[this.blackIndex].join(' ');
        }
        break;
    }

    // Update button text
    this.updateButton(buttonID, newContent);
  };

  // Update button text with next element
  updateButton = (buttonID, newContent) => {
    $(`#${buttonID}`).html(newContent);
  };

  draw() {
    console.log('ABC123.draw(): drawing in canvas');
    $('#canvas').html(`
      <div class="row console" id="instructions">
        If the matching colour has the letter on it, cut the wire. <br />
        Click the button to advance.
      </div>
      <div class="steel-plate container-fluid">
        <div id="abc123-container" class="row">
          <div class="col-md-6 mx-auto">
            <table class="table table-bordered my-3 white rounded console">
              <thead>
                <tr>
                  <th scope="col" class="text-red col-4">Red</th>
                  <th scope="col" class="text-blue col-4">Blue</th>
                  <th scope="col" class="text-black col-4">Black</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><button class="steel-button border-red abc123-button" id="red-button">${this.redIndex + '. ' + this.redSequence[
                    this.redIndex
                  ].join(' ')}</button></td>
                  <td><button class="steel-button border-blue abc123-button" id="blue-button">${this.blueIndex + '. ' + this.blueSequence[
                    this.blueIndex
                  ].join(' ')}</button></td>
                  <td>
                    <button class="steel-button border-black abc123-button" id="black-button">${this.blackIndex + '. ' + this.blackSequence[
                      this.blackIndex
                    ].join(' ')}</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `);
  }
}
