class WhosOnFirst {
  constructor() {
    this.draw();
    this.phase1Words();
  }

  // Returns object with all the word data
  getData = () => {
    return {
      blank: {
        eye: 'middle-right',
        text: `BLANK`,
        words: 'WAIT, RIGHT, OKAY, MIDDLE, BLANK, PRESS, READY, NOTHING, NO, WHAT, LEFT, UHHH, YES, FIRST'
      },
      c: {
        eye: 'top-right',
        text: `C`
      },
      cee: {
        eye: 'bottom-right',
        text: `CEE`
      },
      display: {
        eye: 'bottom-right',
        text: `DISPLAY`
      },
      done: {
        text: `DONE`,
        words: `SURE, UH HUH, NEXT, WHAT?, YOUR, UR, YOU'RE, HOLD, LIKE, YOU, U, YOU ARE, UH UH, DONE`
      },
      empty: {
        eye: 'bottom-left',
        text: `_____`
      },
      first: {
        eye: 'top-right',
        text: `FIRST`,
        words: 'LEFT, OKAY, YES, MIDDLE, NO, RIGHT, NOTHING, UHHH, WAIT, READY, BLANK, WHAT, PRESS, FIRST'
      },
      hold: {
        text: `HOLD`,
        words: `YOU ARE, U, DONE, UH UH, YOU, UR, SURE, WHAT?, YOU'RE, NEXT, HOLD, UH HUH, YOUR, LIKE`
      },
      holdon: {
        eye: 'bottom-right',
        text: `HOLD ON`
      },
      lead: {
        eye: 'bottom-right',
        text: `LEAD`
      },
      led: {
        eye: 'middle-left',
        text: `LED`
      },
      leed: {
        eye: 'bottom-left',
        text: `LEED`
      },
      left: {
        text: `LEFT`,
        words: 'RIGHT, LEFT, FIRST, NO, MIDDLE, YES, BLANK, WHAT, UHHH, WAIT, PRESS, READY, OKAY, NOTHING'
      },
      like: {
        text: `LIKE`,
        words: `YOU'RE, NEXT, U, UR, HOLD, DONE, UH UH, WHAT?, UH HUH, YOU, LIKE, SURE, YOU ARE, YOUR`
      },
      middle: {
        text: `MIDDLE`,
        words: 'BLANK, READY, OKAY, WHAT, NOTHING, PRESS, NO, WAIT, LEFT, MIDDLE, RIGHT, FIRST, UHHH, YES'
      },
      next: {
        text: `NEXT`,
        words: `WHAT?, UH HUH, UH UH, YOUR, HOLD, SURE, NEXT, LIKE, DONE, YOU ARE, UR, YOU'RE, U, YOU`
      },
      no: {
        eye: 'bottom-right',
        text: `NO`,
        words: 'BLANK, UHHH, WAIT, FIRST, WHAT, READY, RIGHT, YES, NOTHING, LEFT, PRESS, OKAY, NO, MIDDLE'
      },
      nothing: {
        eye: 'middle-left',
        text: `NOTHING`,
        words: 'UHHH, RIGHT, OKAY, MIDDLE, YES, BLANK, NO, PRESS, LEFT, WHAT, WAIT, FIRST, NOTHING, READY'
      },
      okay: {
        eye: 'top-right',
        text: `OKAY`,
        words: 'MIDDLE, NO, FIRST, YES, UHHH, NOTHING, WAIT, OKAY, LEFT, READY, BLANK, PRESS, WHAT, RIGHT'
      },
      press: {
        text: `PRESS`,
        words: 'RIGHT, MIDDLE, YES, READY, PRESS, OKAY, NOTHING, UHHH, BLANK, LEFT, FIRST, WHAT, NO, WAIT'
      },
      read: {
        eye: 'middle-right',
        text: `READ`
      },
      ready: {
        text: `READY`,
        words: 'YES, OKAY, WHAT, MIDDLE, LEFT, PRESS, RIGHT, BLANK, READY, NO, FIRST, UHHH, NOTHING, WAIT'
      },
      red: {
        eye: 'middle-right',
        text: `RED`
      },
      reed: {
        eye: 'bottom-left',
        text: `REED`
      },
      right: {
        text: `RIGHT`,
        words: 'YES, NOTHING, READY, PRESS, NO, WAIT, WHAT, RIGHT, MIDDLE, LEFT, UHHH, BLANK, OKAY, FIRST'
      },
      says: {
        eye: 'bottom-right',
        text: `SAYS`
      },
      see: {
        eye: 'bottom-right',
        text: `SEE`
      },
      sure: {
        text: `SURE`,
        words: `YOU ARE, DONE, LIKE, YOU'RE, YOU, HOLD, UH HUH, UR, SURE, U, WHAT?, NEXT, YOUR, UH UH`
      },
      their: {
        eye: 'middle-right',
        text: `THEIR`
      },
      there: {
        eye: 'bottom-right',
        text: `THERE`
      },
      theyare: {
        eye: 'middle-left',
        text: `THEY ARE`
      },
      theyre: {
        eye: 'bottom-left',
        text: `THEY'RE`
      },
      u: {
        text: `U`,
        words: `UH HUH, SURE, NEXT, WHAT?, YOU'RE, UR, UH UH, DONE, U, YOU, LIKE, HOLD, YOU ARE, YOUR`
      },
      uhhh: {
        text: `UHHH`,
        words: 'READY, NOTHING, LEFT, WHAT, OKAY, YES, RIGHT, NO, PRESS, BLANK, UHHH, MIDDLE, WAIT, FIRST'
      },
      uhhuh: {
        text: `UH HUH`,
        words: `UH HUH, YOUR, YOU ARE, YOU, DONE, HOLD, UH UH, NEXT, SURE, LIKE, YOU'RE, UR, U, WHAT?`
      },
      uhuh: {
        text: `UH UH`,
        words: `UR, U, YOU ARE, YOU'RE, NEXT, UH UH, DONE, YOU, UH HUH, LIKE, YOUR, SURE, HOLD, WHAT?`
      },
      ur: {
        eye: 'top-left',
        text: `UR`,
        words: `DONE, U, UR, UH HUH, WHAT?, SURE, YOUR, HOLD, YOU'RE, LIKE, NEXT, UH UH, YOU ARE, YOU`
      },
      wait: {
        text: `WAIT`,
        words: 'UHHH, NO, BLANK, OKAY, YES, LEFT, FIRST, PRESS, WHAT, WAIT, NOTHING, READY, RIGHT, MIDDLE'
      },
      what: {
        text: `WHAT`,
        words: 'UHHH, WHAT, LEFT, NOTHING, READY, BLANK, MIDDLE, NO, OKAY, FIRST, WAIT, YES, PRESS, RIGHT'
      },
      whatQ: {
        text: `WHAT?`,
        words: `YOU, HOLD, YOU'RE, YOUR, U, DONE, UH UH, LIKE, YOU ARE, UH HUH, UR, NEXT, WHAT?, SURE`
      },
      yes: {
        eye: 'middle-left',
        text: `YES`,
        words: 'OKAY, RIGHT, UHHH, MIDDLE, FIRST, WHAT, PRESS, READY, NOTHING, YES, LEFT, BLANK, NO, WAIT'
      },
      you: {
        eye: 'middle-right',
        text: `YOU`,
        words: `SURE, YOU ARE, YOUR, YOU'RE, NEXT, UH HUH, UR, HOLD, WHAT?, YOU, UH UH, LIKE, DONE, U`
      },
      youare: {
        eye: 'bottom-right',
        text: `YOU ARE`,
        words: `YOUR, NEXT, LIKE, UH HUH, WHAT?, DONE, UH UH, HOLD, YOU, U, YOU'RE, SURE, UR, YOU ARE`
      },
      your: {
        eye: 'middle-right',
        text: `YOUR`,
        words: `UH UH, YOU ARE, UH HUH, YOUR, NEXT, UR, SURE, U, YOU'RE, YOU, WHAT?, HOLD, LIKE, DONE`
      },
      youre: {
        eye: 'middle-right',
        text: `YOU'RE`,
        words: `YOU, YOU'RE, UR, NEXT, UH UH, YOU ARE, U, YOUR, WHAT?, UH HUH, SURE, DONE, LIKE, HOLD`
      }
    }
  }

  // Draw phase 1 words
  phase1Words = () => {
    // Clear area of page (#word-buttons)
    $('#word-buttons').html('');
    $('#word-buttons').append(`<div class="row" id="word-row"></div>`);

    // Get data
    const words = this.getData();
    console.log('WhosOnFirst.phase2Words(): words', words);
    
    // For each word, if has attribute eye, insert button
    Object.keys(words).forEach(word => {
      console.log(word);
      if (words[word].eye){
        $('#word-row').append(`<div class="col-lg-3 col-4"><button class="steel-button word-button wof-button" value="${word}">${words[word].text}</button></div>`)
      }
    });

    // Add action listener
    $('.word-button').on('click', this.placeEye);

    $('#instructions').html('Select word seen on bomb screen.');
  }

  // Draw phase 2 words
  phase2Words = () => {
    // Clear area of page (#word-buttons)
    $('#word-buttons').html('');
    $('#word-buttons').append(`<div class="row" id="word-row"></div>`);

    // Get data
    const words = this.getData();
    console.log('WhosOnFirst.phase1Words(): words', words);
    
    // For each word, if has attribute eye, insert button
    Object.keys(words).forEach(word => {
      console.log(word);
      if (words[word].words){
        $('#word-row').append(`<div class="col-lg-3 col-4"><button class="steel-button word-button wof-button" value="${word}">${words[word].text}</button></div>`)
      }
    });

    // Add action listener
    $('.word-button').on('click', this.printWords);
  }

  // Puts eye in square following button press
  placeEye = () => {
    console.log(`WhosOnFirst.placeEye(${$(event.target).attr('value')})`);
    const words = this.getData();
    const buttonValue = $(event.target).attr('value');

    // Clear eye boxes
    $('.eye-box').html('');

    // Insert eye into correct box
    const eyeBoxID = words[buttonValue].eye;
    $(`#${eyeBoxID}`).html(`<img src="./images/eye.png">`);

    // Draw phase 2 word buttons
    this.phase2Words();

    // Update instructions
    $('#instructions').html(`Select word in same position as the eye.`);
  }

  // Draw and populate words to read following button press
  printWords = () => {
    console.log(`WhosOnFirst.printWords(${$(event.target).attr('value')})`);

    const words = this.getData();
    const buttonValue = $(event.target).attr('value');

    // Clear eye boxes
    $('.eye-box').html('');

    // Insert words into word-buttons div
    const wordsToPrint = words[buttonValue].words;
    $('#word-buttons').html(``);
    $('#word-buttons').append(`<p id="wof-words">${wordsToPrint}</p>`);
    $('#word-buttons').append(`<button class="my-3 steel-button word-button wof-button" id="phase1Go">REPEAT</button>`);

    // Event listener to get back to phase 1.
    document.getElementById('phase1Go').addEventListener('click', this.phase1Words);

    // Update instructions
    $('#instructions').html(`Defuser selects first available word:`);
  }

  draw() {
    console.log('WhosOnFirst.draw(): drawing in canvas');
    $('#canvas').html(`
      <div class="row console" id="instructions">Select word seen on bomb screen.</div>
      <div class="steel-plate container-fluid">
        <div class="row">
          <div class="col-sm-9 my-3" id="word-buttons">
          </div>
          <div class="col-sm-3">
            <div class="my-3" id="eye-container">
              <div class="row"><p id="eye-text">EYE</p></div>
              <div class="row">
                <div class="col eye-box" id="top-left"></div>
                <div class="col eye-box" id="top-right"></div>
              </div>
              <div class="row">
                <div class="col eye-box" id="middle-left"></div>
                <div class="col eye-box" id="middle-right"></div>
              </div>
              <div class="row">
                <div class="col eye-box" id="bottom-left"></div>
                <div class="col eye-box" id="bottom-right"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  }
}
