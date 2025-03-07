class Symbols {
  selectedSymbols; // id attributes of all selected symbols

  constructor() {
    this.draw();
    this.selectedSymbols = [];
    $('.symbol-button').on('click', this.symbolSelected);
  }

  // Adds selected class to symbol and call update function
  symbolSelected = () => {
    // Toggle selected or not (avoid img inside button)
    if ($(event.target).is('img')){
      $(event.target).closest('button').toggleClass('selected');
    } else {
      $(event.target).toggleClass('selected');
    }

    // Call update of all buttons
    this.update();
  };

  // Assessed currently selected symbols, updates disabled symbols, sees if order can be decided
  update = () => {
    // Get all selected
    const currentlySelected = this.getSelected();

    // Update class variable
    this.selectedSymbols = [];
    currentlySelected.forEach(button => {
      this.selectedSymbols.push(button.id);
    });
    console.log(`Symbols.update(): selectedSymbols`,this.selectedSymbols);

    // Disable invalid buttons
    this.filterButtons();

    // Determine order of selected symbols
    const list = this.determineOrder();

    // Print to order stack
    this.printOrder(list);
  };

  // Toggles a single symbol on or off depending on whether linked symbols are selected
  toggleDisabled = (id) => {
    $(`#${id}`).toggleClass('disabled');
  };

  // Goes through all symbol buttons. Disables impossible options
  filterButtons = () => {
    const symbols = this.getSymbols();
    const columns = this.getColumns();

    Object.keys(symbols).forEach(symbol => {
      // Do all selected tags exist in symbol array?
      let exists;
      Object.keys(columns).forEach(column => {
        if (columns[column].includes(symbol)){
          if (exists)
            return;
          exists = this.selectedSymbols.every(selectedSymbol => {
            return columns[column].includes(selectedSymbol);
          });
        }
      });

      // If yes, remove 'disabled' 
      if (exists){
        $(`#${symbol}`).removeAttr('disabled');
        return;
      } else {       
        // If no, disable button
        $(`#${symbol}`).attr('disabled', true);
        // If selected, it should not be disabled no matter what
        if ($(`#${symbol}`).hasClass('selected')){
          $(`#${symbol}`).removeAttr('disabled');
        }
      }
      
      
    });
  }

  // Determines order of selected symbols
  determineOrder = () => {
    // Which column are we in?
    const columns = this.getColumns();
    let selectedColumn;

    Object.keys(columns).forEach(column => {
      const fullMatch = this.selectedSymbols.every(symbol => {
        return columns[column].includes(symbol);
      });

      if (fullMatch){
        selectedColumn = column;
      }
    });

    // Proceed through column, adding values if selected
    let list = [];
    columns[selectedColumn].forEach(element => {
      if (this.selectedSymbols.includes(element))
        list.push(element);
    })
    return list;
  }

  // Gets all selected symbols
  getSelected = () => {
    return document.querySelectorAll('.symbol-button.selected');
  };

  // Prints order to order stack
  printOrder = (list) => {
    console.log('Symbols.printOrder(): list', list);
    $('#order').html('');

    list.forEach(symbol => {
      $('#order').append(`<div class="col g-1 order-col"><img class="symbol-img" src="./images/symbols/${symbol}.png" alt=""></div>`);
    });
  };

  // Returns data of object of all symbols and their relations. Order not relevant.
  // Only keys used currently... Keeping data anyway.
  getSymbols = () => {
    return {
      ae: ['six', 'euro', 'tracks', 'pitchfork', 'nwithhat', 'omega'],
      at: ['balloon', 'upsidedowny', 'squigglyn', 'squidknife', 'hookn', 'leftc'],
      balloon: ['at', 'upsidedowny', 'squigglyn', 'squidknife', 'hookn', 'leftc', 'euro', 'cursive', 'hollowstar', 'questionmark'],
      bt: ['six', 'paragraph', 'squidknife', 'doublek', 'questionmark', 'smileyface', 'pitchfork', 'rightc', 'dragon', 'filledstar'],
      copyright: ['pumpkin', 'cursive', 'doublek', 'meltedthree', 'upsidedowny', 'hollowstar'],
      cursive: ['pumpkin', 'copyright', 'doublek', 'meltedthree', 'upsidedowny', 'hollowstar', 'euro', 'balloon', 'leftc', 'hookn', 'questionmark'],
      doublek: ['pumpkin', 'cursive', 'copyright', 'meltedthree', 'upsidedowny', 'hollowstar', 'six', 'paragraph', 'squidknife', 'bt', 'questionmark', 'smileyface'],
      dragon: ['pitchfork', 'smileyface', 'bt', 'rightc', 'paragraph', 'filledstar'],
      euro: ['balloon', 'leftc', 'cursive', 'hollowstar', 'hookn', 'questionmark', 'six', 'tracks', 'ae', 'pitchfork', 'nwithhat', 'omega'],
      filledstar: ['pitchfork', 'smileyface', 'bt', 'rightc', 'paragraph', 'dragon'],
      hollowstar: ['euro', 'balloon', 'leftc', 'cursive', 'hookn', 'questionmark', 'copyright', 'pumpkin', 'doublek', 'meltedthree', 'upsidedowny'],
      hookn: ['balloon', 'at', 'upsidedowny', 'squigglyn', 'squidknife', 'leftc', 'euro', 'cursive', 'hollowstar', 'hookn', 'questionmark'],
      leftc: ['balloon', 'at', 'upsidedowny', 'squigglyn', 'squidknife', 'hookn', 'euro', 'cursive', 'hollowstar', 'questionmark'],
      meltedthree: ['copyright', 'pumpkin', 'cursive', 'doublek', 'upsidedowny', 'hollowstar'],
      nwithhat: ['six', 'euro', 'tracks', 'ae', 'pitchfork', 'omega'],
      omega: ['six', 'euro', 'tracks', 'ae', 'pitchfork', 'nwithhat'],
      paragraph: ['six', 'bt', 'squidknife', 'doublek', 'questionmark', 'smileyface', 'pitchfork', 'rightc', 'dragon', 'filledstar'],
      pitchfork: ['smileyface', 'bt', 'rightc', 'paragraph', 'dragon', 'filledstar', 'six', 'euro', 'tracks', 'ae', 'nwithhat', 'omega'],
      pumpkin: ['copyright', 'cursive', 'doublek', 'meltedthree', 'upsidedowny', 'hollowstar'],
      questionmark: ['euro', 'balloon', 'leftc', 'cursive', 'hollowstar', 'hookn', 'six', 'paragraph', 'bt', 'squidknife', 'doublek', 'smileyface'],
      rightc: ['pitchfork', 'smileyface', 'bt', 'paragraph', 'dragon', 'filledstar'],
      six: ['paragraph', 'bt', 'squidknife', 'doublek', 'questionmark', 'smileyface', 'euro', 'tracks', 'ae', 'pitchfork', 'nwithhat', 'omega'],
      smileyface: ['six', 'paragraph', 'bt', 'squidknife', 'doublek', 'questionmark', 'pitchfork', 'bt', 'rightc', 'dragon', 'filledstar'],
      squidknife: ['balloon', 'at', 'upsidedowny', 'squigglyn', 'hookn', 'leftc', 'six', 'paragraph', 'bt', 'doublek', 'questionmark', 'smileyface'],
      squigglyn: ['balloon', 'at', 'upsidedowny', 'squidknife', 'hookn', 'leftc'],
      tracks: ['six', 'euro', 'ae', 'pitchfork', 'nwithhat', 'omega'],
      upsidedowny: ['balloon', 'at', 'squigglyn', 'squidknife', 'hookn', 'leftc', 'copyright', 'pumpkin', 'cursive', 'doublek', 'meltedthree','hollowstar']
    }
  }

  // Returns data of object of all available columns. Order is relevant.
  getColumns = () => {
    return {
      1: ['balloon', 'at', 'upsidedowny', 'squigglyn', 'squidknife', 'hookn', 'leftc'],
      2: ['euro', 'balloon', 'leftc', 'cursive', 'hollowstar', 'hookn', 'questionmark'],
      3: ['copyright', 'pumpkin', 'cursive', 'doublek', 'meltedthree', 'upsidedowny', 'hollowstar'],
      4: ['six', 'paragraph', 'bt', 'squidknife', 'doublek', 'questionmark', 'smileyface'],
      5: ['pitchfork', 'smileyface', 'bt', 'rightc', 'paragraph', 'dragon', 'filledstar'],
      6: ['six', 'euro', 'tracks', 'ae', 'pitchfork', 'nwithhat', 'omega']
    }
  }

  draw() {
    console.log('Symbols.draw(): drawing in canvas');
    $('#canvas').html(`
      <div class="row console" id="instructions">Select symbols. Read order.</div>
      <div class="container-fluid">
      <h5>Order (First -> Last)</h5>
      <div class="container row py-1 px-3" id="order"></div>
      <h5>Symbols</h5>
      <div class="container row py-1 px-3">
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="ae"><img class="symbol-img" src="./images/symbols/ae.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="at"><img class="symbol-img" src="./images/symbols/at.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="balloon"><img class="symbol-img" src="./images/symbols/balloon.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="bt"><img class="symbol-img" src="./images/symbols/bt.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="copyright"><img class="symbol-img" src="./images/symbols/copyright.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="cursive"><img class="symbol-img" src="./images/symbols/cursive.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="doublek"><img class="symbol-img" src="./images/symbols/doublek.png" alt=""></button></div> 
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="dragon"><img class="symbol-img" src="./images/symbols/dragon.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="euro"><img class="symbol-img" src="./images/symbols/euro.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="filledstar"><img class="symbol-img" src="./images/symbols/filledstar.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="hollowstar"><img class="symbol-img" src="./images/symbols/hollowstar.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="hookn"><img class="symbol-img" src="./images/symbols/hookn.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="leftc"><img class="symbol-img" src="./images/symbols/leftc.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="meltedthree"><img class="symbol-img" src="./images/symbols/meltedthree.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="nwithhat"><img class="symbol-img" src="./images/symbols/nwithhat.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="omega"><img class="symbol-img" src="./images/symbols/omega.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="paragraph"><img class="symbol-img" src="./images/symbols/paragraph.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="pitchfork"><img class="symbol-img" src="./images/symbols/pitchfork.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="pumpkin"><img class="symbol-img" src="./images/symbols/pumpkin.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="questionmark"><img class="symbol-img" src="./images/symbols/questionmark.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="rightc"><img class="symbol-img" src="./images/symbols/rightc.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="six"><img class="symbol-img" src="./images/symbols/six.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="smileyface"><img class="symbol-img" src="./images/symbols/smileyface.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="squidknife"><img class="symbol-img" src="./images/symbols/squidknife.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="squigglyn"><img class="symbol-img" src="./images/symbols/squigglyn.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="tracks"><img class="symbol-img" src="./images/symbols/tracks.png" alt=""></button></div>
        <div class="col-4 col-sm-2 p-1"><button class="steel-button symbol-button" id="upsidedowny"><img class="symbol-img" src="./images/symbols/upsidedowny.png" alt=""></button></div>
      </div>
    </div>
    `);
  }
}
