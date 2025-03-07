class Passwords {
  words;
  selectedLetters;
  filteredWords;
  farthestSelectedColumn;

  constructor() {
    this.words = [
      'about',
      'after',
      'again',
      'below',
      'could',
      'every',
      'first',
      'found',
      'great',
      'house',
      'large',
      'learn',
      'never',
      'other',
      'place',
      'plant',
      'point',
      'right',
      'small',
      'sound',
      'spell',
      'still',
      'study',
      'their',
      'there',
      'these',
      'thing',
      'think',
      'three',
      'water',
      'where',
      'which',
      'world',
      'would',
      'write',
    ];
    this.selectedLetters = [[]]; // 2D array with columns 1-5 holding selected button content
    this.filteredWords = []; // Final array with possible words after filtering
    this.farthestSelectedColumn = -1;
    this.draw();
  }

  columnController() {
    console.log('Passwords: columnController() - populating columns');

    // get all selected letters
    this.setSelectedLetters();
    // de-select letters if they don't match -> start in column 1
    // check if other letters should be visible/not visible -> start in column 4
    this.displayLetters();
    // get all selected letters again --- remove in previous step if possible
    this.setSelectedLetters();
    // compare selected letters to list of words
    this.populateFilteredWords();
  }

  populateFilteredWords() {
    this.filteredWords = [];
    this.setFarthestSelectedColumn();
    for (let i = 0; i < this.words.length; i++) {
      let allLettersSelected = [];
      for (let j = this.farthestSelectedColumn; j >= 0; j--) {
        if (
          this.selectedLetters[j].includes(
            this.words[i].charAt(j).toUpperCase()
          )
        ) {
          allLettersSelected.push(true);
        } else {
          allLettersSelected.push(false);
        }
      }
      if (!allLettersSelected.includes(false)) {
        this.filteredWords.push(this.words[i]);
      }
    }

    $('#commands').html('Possible words: ');
    this.filteredWords.forEach((word) => {
      $('#commands').append(`${word} `);
    });
  }

  setFarthestSelectedColumn() {
    for (let i = 0; i < this.selectedLetters.length; i++) {
      if (this.selectedLetters[i].length != 0) {
        this.farthestSelectedColumn = i;
      }
    }
  }

  displayLetters() {
    // For each column after the first
    for (let i = 1; i <= 4; i++) {
      // For each button in column, see if preceeding letter requirement is there.
      let buttonList = $(`#${i} .steel-button`).toArray();

      buttonList.forEach((button) => {
        if (this.shouldThisBeVisible(button.textContent, i)) {
          button.classList.remove('hidden');
        } else {
          button.classList.add('hidden');
          button.classList.remove('selected');
        }
      });

      this.setSelectedLetters();
    }
  }

  shouldThisBeVisible(letter, column) {
    // Was that the last column? Then all needed letters are selected.
    if (column == 0) {
      return true;
    } else {
      // Go through every word in list
      for (let i = 0; i < this.words.length; i++) {
        // If this word has a letter at that location
        if (this.words[i].charAt(column).toUpperCase() == letter) {
          // Are the previous letters in the word available?
          let previousLettersSelected = [];
          // For each column/letter left of checked letter
          for (let j = column - 1; j >= 0; j--) {
            if (
              this.selectedLetters[j].includes(
                this.words[i].charAt(j).toUpperCase()
              )
            ) {
              previousLettersSelected.push(true);
            } else {
              previousLettersSelected.push(false);
              break;
            }
          }

          // Were all of them true? AKA all needed letters were selected
          if (!previousLettersSelected.includes(false)) {
            return true;
          }
        }
      }
      // All words looped through, no complete matches found.
      return false;
    }
  }

  setSelectedLetters() {
    for (let i = 0; i < 5; i++) {
      this.selectedLetters[i] = this.getSelectedLettersInColumn(i);
    }
  }

  getSelectedLettersInColumn(column) {
    let selectedLetters = [];
    let selectedButtons = $(`#${column} .selected`).toArray();

    selectedButtons.forEach((button) => {
      selectedLetters.push(button.textContent);
    });

    return selectedLetters;
  }

  getAllButtons(column) {
    let buttonList = [];
    let buttons = $(`#${column} button`).toArray();

    buttons.forEach((button) => {
      let buttonObject = {
        selected: button.classList.contains('selected'),
        letter: button.textContent,
      };
      buttonList.push(buttonObject);
    });

    console.log(`Passwords: getAllButtons() - column ${column}`);
    return buttonList;
  }

  selectButton = () => {
    $(event.currentTarget).toggleClass('selected');
    this.columnController();
  };

  draw() {
    console.log('Passwords.draw(): drawing in canvas');
    $('#canvas')
      .html(` <div class="row console" id="instructions">Select the letters in each column.</div>
                            <div class="steel-plate container-fluid">
                                <div class="row">
                                    <div class="col password-column" id="0">
                                        <div class="row"><button class="steel-button">A</button></div>
                                        <div class="row"><button class="steel-button">B</button></div>
                                        <div class="row"><button class="steel-button">C</button></div>
                                        <div class="row"><button class="steel-button">E</button></div>
                                        <div class="row"><button class="steel-button">F</button></div>
                                        <div class="row"><button class="steel-button">G</button></div>
                                        <div class="row"><button class="steel-button">H</button></div>
                                        <div class="row"><button class="steel-button">L</button></div>
                                        <div class="row"><button class="steel-button">N</button></div>
                                        <div class="row"><button class="steel-button">O</button></div>
                                        <div class="row"><button class="steel-button">P</button></div>
                                        <div class="row"><button class="steel-button">R</button></div>
                                        <div class="row"><button class="steel-button">S</button></div>
                                        <div class="row"><button class="steel-button">T</button></div>
                                        <div class="row"><button class="steel-button">W</button></div>
                                    </div>
                                    <div class="col password-column" id="1">
                                        <div class="row"><button class="steel-button hidden">A</button></div>
                                        <div class="row"><button class="steel-button hidden">B</button></div>
                                        <div class="row"><button class="steel-button hidden">E</button></div>
                                        <div class="row"><button class="steel-button hidden">F</button></div>
                                        <div class="row"><button class="steel-button hidden">G</button></div>
                                        <div class="row"><button class="steel-button hidden">H</button></div>
                                        <div class="row"><button class="steel-button hidden">I</button></div>
                                        <div class="row"><button class="steel-button hidden">L</button></div>
                                        <div class="row"><button class="steel-button hidden">M</button></div>
                                        <div class="row"><button class="steel-button hidden">O</button></div>
                                        <div class="row"><button class="steel-button hidden">P</button></div>
                                        <div class="row"><button class="steel-button hidden">R</button></div>
                                        <div class="row"><button class="steel-button hidden">T</button></div>
                                        <div class="row"><button class="steel-button hidden">V</button></div>
                                    </div>
                                    <div class="col password-column" id="2">
                                        <div class="row"><button class="steel-button hidden">A</button></div>
                                        <div class="row"><button class="steel-button hidden">E</button></div>
                                        <div class="row"><button class="steel-button hidden">G</button></div>
                                        <div class="row"><button class="steel-button hidden">H</button></div>
                                        <div class="row"><button class="steel-button hidden">I</button></div>
                                        <div class="row"><button class="steel-button hidden">L</button></div>
                                        <div class="row"><button class="steel-button hidden">O</button></div>
                                        <div class="row"><button class="steel-button hidden">R</button></div>
                                        <div class="row"><button class="steel-button hidden">T</button></div>
                                        <div class="row"><button class="steel-button hidden">U</button></div>
                                        <div class="row"><button class="steel-button hidden">V</button></div>
                                    </div>
                                    <div class="col password-column" id="3">
                                        <div class="row"><button class="steel-button hidden">A</button></div>
                                        <div class="row"><button class="steel-button hidden">C</button></div>
                                        <div class="row"><button class="steel-button hidden">D</button></div>
                                        <div class="row"><button class="steel-button hidden">E</button></div>
                                        <div class="row"><button class="steel-button hidden">G</button></div>
                                        <div class="row"><button class="steel-button hidden">H</button></div>
                                        <div class="row"><button class="steel-button hidden">I</button></div>
                                        <div class="row"><button class="steel-button hidden">L</button></div>
                                        <div class="row"><button class="steel-button hidden">N</button></div>
                                        <div class="row"><button class="steel-button hidden">O</button></div>
                                        <div class="row"><button class="steel-button hidden">R</button></div>
                                        <div class="row"><button class="steel-button hidden">S</button></div>
                                        <div class="row"><button class="steel-button hidden">T</button></div>
                                        <div class="row"><button class="steel-button hidden">U</button></div>
                                    </div>
                                    <div class="col password-column" id="4">
                                        <div class="row"><button class="steel-button hidden">D</button></div>
                                        <div class="row"><button class="steel-button hidden">E</button></div>
                                        <div class="row"><button class="steel-button hidden">G</button></div>
                                        <div class="row"><button class="steel-button hidden">H</button></div>
                                        <div class="row"><button class="steel-button hidden">K</button></div>
                                        <div class="row"><button class="steel-button hidden">L</button></div>
                                        <div class="row"><button class="steel-button hidden">N</button></div>
                                        <div class="row"><button class="steel-button hidden">R</button></div>
                                        <div class="row"><button class="steel-button hidden">T</button></div>
                                        <div class="row"><button class="steel-button hidden">W</button></div>
                                        <div class="row"><button class="steel-button hidden">Y</button></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row console" id="commands">Select letters.</div>`);
    $('.password-column button.steel-button').on('click', this.selectButton);
  }
}
