class MorseCode {
  currentInputs; // List of short (-) and long (+) input presses for current letter
  letterInputs; // List of letters already submitted
  chosenWords; // Possible words based on letterInputs

  constructor() {
    this.currentInputs = [];
    this.letterInputs = [];
    this.chosenWords = [];
    this.draw();
    $('#short').on('click', this.short);
    $('#long').on('click', this.long);
    $('#submit').on('click', this.submit);
  }

  // Returns an array of objects with letter and morse properties
  getLetters = () => {
    return [
      {
        letter: 'a',
        morse: '-+',
      },
      {
        letter: 'b',
        morse: '+---',
      },
      {
        letter: 'c',
        morse: '+-+-',
      },
      {
        letter: 'd',
        morse: '+--',
      },
      {
        letter: 'e',
        morse: '-',
      },
      {
        letter: 'f',
        morse: '--+-',
      },
      {
        letter: 'g',
        morse: '++-',
      },
      {
        letter: 'h',
        morse: '----',
      },
      {
        letter: 'i',
        morse: '--',
      },
      {
        letter: 'j',
        morse: '-+++',
      },
      {
        letter: 'k',
        morse: '+-+',
      },
      {
        letter: 'l',
        morse: '-+--',
      },
      {
        letter: 'm',
        morse: '++',
      },
      {
        letter: 'n',
        morse: '+-',
      },
      {
        letter: 'o',
        morse: '+++',
      },
      {
        letter: 'p',
        morse: '-++-',
      },
      {
        letter: 'q',
        morse: '++-+',
      },
      {
        letter: 'r',
        morse: '-+-',
      },
      {
        letter: 's',
        morse: '---',
      },
      {
        letter: 't',
        morse: '+',
      },
      {
        letter: 'u',
        morse: '--+',
      },
      {
        letter: 'v',
        morse: '---+',
      },
      {
        letter: 'w',
        morse: '-++',
      },
      {
        letter: 'x',
        morse: '+--+',
      },
      {
        letter: 'y',
        morse: '+-++',
      },
      {
        letter: 'z',
        morse: '++--',
      },
    ];
  };

  // Returns array of objects with word and frequency properties
  getWords = () => {
    return [
      {
        word: 'shell',
        frequency: '3.505',
      },
      {
        word: 'halls',
        frequency: '3.515',
      },
      {
        word: 'slick',
        frequency: '3.522',
      },
      {
        word: 'trick',
        frequency: '3.532',
      },
      {
        word: 'boxes',
        frequency: '3.535',
      },
      {
        word: 'leaks',
        frequency: '3.542',
      },
      {
        word: 'strobe',
        frequency: '3.545',
      },
      {
        word: 'bistro',
        frequency: '3.552',
      },
      {
        word: 'flick',
        frequency: '3.555',
      },
      {
        word: 'bombs',
        frequency: '3.565',
      },
      {
        word: 'break',
        frequency: '3.572',
      },
      {
        word: 'brick',
        frequency: '3.575',
      },
      {
        word: 'steak',
        frequency: '3.582',
      },
      {
        word: 'sting',
        frequency: '3.592',
      },
      {
        word: 'vector',
        frequency: '3.595',
      },
      {
        word: 'beats',
        frequency: '3.600',
      },
    ];
  };

  // Short button is pressed
  short = () => {
    this.currentInputs.push('-');
    // Print the currentInputs to the screen
    this.printInputs();
  };

  // Long button is pressed
  long = () => {
    this.currentInputs.push('+');
    // Print the currentInputs to the screen
    this.printInputs();
  };

  // Prints currentInputs to Morse Input field
  printInputs = () => {
    $('#morse-input').html(`${this.currentInputs.join(' ')}`);
  };

  // Submit button is pressed
  submit = () => {
    // Put currentInputs together as a string
    const inputString = this.currentInputs.join('');
    // Find the letter with a matching morse string
    const letters = this.getLetters();
    const matchingLetter = letters.find((letter) => {
      return letter.morse === inputString;
    });
    console.log('MorseCode.submit() - matching letter', matchingLetter);
    if (matchingLetter !== undefined) {
      // Add that letter to the letterInputs list
      this.letterInputs.push(matchingLetter.letter);

      // Print the letterInputs to the screen
      $('#entered-letters').html(`${this.letterInputs.join(' ')}`);

      // Choose words that may match the letterInputs
      this.chooseWords();
      // Write commands to the screen
      this.writeWords();
    } else {
      // Display error that nothing matched that morse code
      console.log('MorseCode.submit() - no matching letter');
    }

    // Clear Morse Input
    $('#morse-input').html('');
    this.currentInputs = [];
  };

  // Write possible words to commands
  writeWords = () => {
    // Clear existing table body
    $('#table-body').html('');
    // Append chosenWords
    this.chosenWords.forEach((word) => {
      $('#table-body').append(`
      <tr>
        <td>${word.word}</td>
        <td>${word.frequency} MHz</td>
      </tr>
    `);
    });
  };

  // Choose possible words, based on letterInputs
  chooseWords = () => {
    // Get words
    const words = this.getWords();
    // Reset list
    this.chosenWords = [];
    // For each word...
    words.forEach((word) => {
      // Check if each letter is present. Only true if all are there.
      const isPossible = this.letterInputs.every((letter) =>
        word.word.includes(letter)
      );
      // Add word to list
      if (isPossible) this.chosenWords.push(word);
    });
  };

  draw() {
    console.log('MorseCode.draw(): drawing in canvas');
    $('#canvas').html(`
      <div class="row console" id="instructions">
        Press short and long button to enter flashes. <br />
        Press Submit to translate morse code to a letter. <br />
        Watch the bottom for possible word matches.
      </div>
      <div class="steel-plate container-fluid">
        <div class="morse-container row">
          <div class="col-md-7">
            <div class="row">
              <div class="col-6 console">
                <p class="h6 m-0">Morse Input</p>
              </div>
              <div class="col-6 console">
                <p class="h6 m-0">Entered Letters</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6 console"><div id="morse-input"></div></div>
              <div class="col-6 console">
                <div id="entered-letters"></div>
              </div>
            </div>
            <div class="row my-3">
              <div class="col">
                <button id="short" class="steel-button my-1">Short</button>
              </div>
              <div class="col">
                <button id="long" class="steel-button my-1">Long</button>
              </div>
              <div class="col">
                <button id="submit" class="steel-button my-1">Submit</button>
              </div>
            </div>
          </div>
          <div class="col-md-5">
            <table class="table table-small console">
              <thead>
                <tr>
                  <th scope="col">Possible Words</th>
                  <th scope="col">Frequency</th>
                </tr>
              </thead>
              <tbody id="table-body">
                <tr>
                  <td>Example</td>
                  <td>5.235 MHz</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `);
  }
}
