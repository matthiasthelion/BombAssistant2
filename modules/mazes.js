class Mazes {
  circles; // Array length 2. Holds two coordinates.
  redTriangle; // String holding one coordinate.
  whiteSquare; // String holding one coordinate.
  squares; // Root object containing square objects. Each object has a tag (A1), contents (circle, triangle, square), and four links (up, down, left, right)
  configurations; // 3D array of possible square configurations. 1D = 9 possible configs, 2D = 36 squares on board, 3D = 4 directions of links (0,1,2,3 = up,down,left,right) + circle boolean
  optimalPath; // List of square tags that makes for the optimal path through maze.
  directions; // List of directions, from white square to red triangle  e.g. ['LEFT', 'UP', 'RIGHT', 'DOWN']
  shortdir; // List of directions, shortened version
  dirindex; // Index of directions
  drawTracker; // Tracks what SVG elements have been drawn, used when resizing window.

  constructor() {
    this.draw();
    this.directions = [];
    this.dirindex = [];
    this.shortdir = [];
    this.squares = this.initSquares();
    this.configurations = this.populateConfigs();
    $('.maze-square').on('click', this.squareSelected);
    this.drawTracker = {
      circles: {visible: false},
      lines: {visible: false},
      triangle: {visible: false, id: null},
      square: {visible: false, id: null}
    }
    console.log(this.squares);
    console.log(this.configurations);
    window.addEventListener('resize', this.redrawSVG);
  }

  // Populates the squares with default status. All links closed.
  initSquares = () => {
    // Get list of maze-squares for id attribute
    let domSquares = [];
    $('.maze-square').each(function () {
      domSquares.push($(this).attr('id'));
    });

    // Populate
    let squareObjects = {};
    domSquares.forEach((square) => {
      squareObjects[square] = {
        tag: square,
        contents: null,
        up: null,
        down: null,
        left: null,
        right: null,
      };
    });

    return squareObjects;
  };

  

  // Fill configurations array
  populateConfigs = () => {
    let configsArray = [];
    // Maze 0
    configsArray.push([
      [0, 1, 0, 1, 0], // A
      [1, 1, 0, 0, 1],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 1, 0],
      [1, 0, 0, 1, 0],
      [0, 0, 1, 1, 0], // B
      [0, 1, 0, 1, 0],
      [1, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 1, 0, 0], // C
      [1, 0, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [1, 0, 1, 1, 0],
      [0, 1, 1, 0, 0],
      [1, 0, 0, 1, 0],
      [0, 1, 0, 1, 0], // D
      [1, 0, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 0],
      [0, 0, 1, 1, 0], // E
      [0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0], // F
      [0, 1, 1, 0, 0],
      [1, 1, 1, 0, 1],
      [1, 1, 1, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0],
    ]);

    // Maze 1
    configsArray.push([
      [0, 0, 0, 1, 0], // A
      [0, 1, 0, 1, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 1, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 1, 1, 1, 0], // B
      [1, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1],
      [0, 1, 0, 0, 0],
      [1, 0, 0, 1, 0],
      [0, 0, 1, 0, 0], // C
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 0, 1, 0], // D
      [1, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 1, 0],
      [0, 1, 1, 1, 0], // E
      [1, 0, 0, 1, 1],
      [0, 0, 1, 1, 0],
      [0, 1, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0], // F
      [0, 1, 1, 0, 0],
      [1, 1, 1, 0, 1],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0],
    ]);

    // Maze 2
    configsArray.push([
      [0, 1, 0, 1, 0], // A
      [1, 0, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 0, 1, 0],
      [0, 0, 1, 1, 0], // B
      [0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 0, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0], // C
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 0, 0, 0], // D
      [1, 0, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [1, 1, 0, 0, 1],
      [1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 0, 1, 0], // E
      [1, 0, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 0, 1, 0],
      [0, 1, 1, 0, 0], // F
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 1],
      [1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0],
    ]);

    // Maze 3
    configsArray.push([
      [0, 1, 0, 1, 1], // A
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 1],
      [1, 1, 0, 1, 0],
      [1, 0, 0, 1, 0],
      [0, 1, 1, 0, 0], // B
      [1, 1, 0, 0, 0],
      [1, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 1, 0], // C
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0], // D
      [0, 0, 1, 1, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0], // E
      [0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 1, 0, 0], // F
      [1, 1, 1, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0],
    ]);

    // Maze 4
    configsArray.push([
      [0, 0, 0, 1, 0], // A
      [0, 1, 0, 1, 0],
      [1, 1, 0, 1, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 1, 1, 0], // B
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0],
      [1, 0, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 1, 0],
      [0, 0, 1, 1, 0], // C
      [0, 0, 1, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0], // D
      [0, 1, 1, 1, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [1, 0, 1, 1, 0],
      [0, 0, 1, 1, 1],
      [0, 1, 1, 1, 0], // E
      [1, 0, 1, 0, 0],
      [0, 1, 0, 1, 1],
      [1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0], // F
      [1, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0],
    ]);

    // Maze 5
    configsArray.push([
      [0, 1, 0, 0, 0], // A
      [1, 1, 0, 0, 0],
      [1, 1, 0, 1, 0],
      [1, 0, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 1, 0],
      [0, 1, 0, 1, 0], // B
      [1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0], // C
      [1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 1, 0], // D
      [0, 1, 0, 1, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 1, 1, 1], // E
      [1, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 1, 1, 0, 0], // F
      [1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [1, 0, 1, 0, 0],
    ]);

    // Maze 6
    configsArray.push([
      [0, 1, 0, 1, 0], // A
      [1, 1, 0, 0, 0],
      [1, 0, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 0, 1, 0],
      [0, 0, 1, 1, 1], // B
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 0, 1, 1, 0], // C
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 1, 0, 1, 0],
      [1, 0, 0, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0], // D
      [1, 0, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 0, 1, 0], // E
      [1, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [1, 0, 1, 1, 0],
      [0, 1, 1, 0, 0], // F
      [1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0],
    ]);

    // Maze 7
    configsArray.push([
      [0, 1, 0, 0, 0], // A
      [1, 1, 0, 1, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 0, 1, 0],
      [0, 1, 0, 1, 0], // B
      [1, 0, 1, 1, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 1, 0],
      [0, 1, 0, 0, 0],
      [1, 0, 1, 1, 0],
      [0, 0, 1, 1, 0], // C
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 1],
      [1, 0, 0, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 1], // D
      [1, 0, 0, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 0, 1, 0], // E
      [1, 0, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [1, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0], // F
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ]);

    // Maze 8
    configsArray.push([
      [0, 1, 0, 0, 0], // A
      [1, 1, 0, 0, 0],
      [1, 1, 0, 1, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 1],
      [1, 0, 0, 1, 0],
      [0, 1, 0, 1, 0], // B
      [1, 1, 0, 0, 0],
      [1, 0, 1, 1, 0],
      [0, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 0, 1, 1, 0], // C
      [0, 1, 0, 1, 1],
      [1, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 0, 1, 0],
      [0, 0, 1, 1, 0], // D
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 1, 1, 0], // E
      [1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 1, 1, 0, 0],
      [1, 0, 0, 1, 0],
      [0, 1, 1, 0, 0], // F
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
    ]);
    console.log(`Mazes: populateConfigs()`);
    return configsArray;
  };

  // Activates on square selected and decides what to do with that info
  squareSelected = () => {
    // Get tag from selected square
    let selectedTag = $(event.target).attr('id');
    console.log(`Mazes: squareSelected() - ${selectedTag}`);

    // Function to draw maze borders
    const configureSquares = (selectedConfig) => {
      console.log(`Mazes: configureSquares()`);
      let arrayIndex = 0;
      // Get all keys from squares object
      const tagArray = Object.keys(this.squares).sort();
      console.log('tagarray', tagArray);
      console.log('configs', this.configurations[selectedConfig]);

      // For each tag, compare against configs array. A 1 means there's a connecting square.
      // Uses hex to set square tags.
      tagArray.forEach((tag) => {
        const element = document.getElementById(tag);
        const tagValue = parseInt(tag, 16);
        const border = 'solid 1px black';
        //square.up == the square above it. Can I do this in hex? Yes, +-1 up/down, +-10 left right
        if (this.configurations[selectedConfig][arrayIndex][0] === 1)
          this.squares[tag].up = parseInt(tagValue - 1)
            .toString(16)
            .toUpperCase();
        else element.style.borderTop = border;

        if (this.configurations[selectedConfig][arrayIndex][1] === 1)
          this.squares[tag].down = parseInt(tagValue + 1)
            .toString(16)
            .toUpperCase();
        else element.style.borderBottom = border;

        if (this.configurations[selectedConfig][arrayIndex][2] === 1)
          this.squares[tag].left = parseInt(tagValue - 16)
            .toString(16)
            .toUpperCase();
        else element.style.borderLeft = border;

        if (this.configurations[selectedConfig][arrayIndex][3] === 1)
          this.squares[tag].right = parseInt(tagValue + 16)
            .toString(16)
            .toUpperCase();
        else element.style.borderRight = border;

        arrayIndex++;
      });
    };

    // If circles haven't been selected yet
    if (this.circles === undefined) {
      // Which maze is it?
      // Maze 0
      if (selectedTag === 'A2' || selectedTag === 'F3') {
        configureSquares(0);
        this.circles = ['A2', 'F3'];
      }

      // Maze 1
      if (selectedTag === 'B4' || selectedTag === 'E2') {
        configureSquares(1);
        this.circles = ['B4', 'E2'];
      }

      // Maze 2
      if (selectedTag === 'D4' || selectedTag === 'F4') {
        configureSquares(2);
        this.circles = ['D4', 'F4'];
      }

      // Maze 3
      if (selectedTag === 'A1' || selectedTag === 'A4') {
        configureSquares(3);
        this.circles = ['A1', 'A4'];
      }

      // Maze 4
      if (selectedTag === 'D6' || selectedTag === 'E3') {
        configureSquares(4);
        this.circles = ['D6', 'E3'];
      }

      // Maze 5
      if (selectedTag === 'C5' || selectedTag === 'E1') {
        configureSquares(5);
        this.circles = ['C5', 'E1'];
      }

      // Maze 6
      if (selectedTag === 'B1' || selectedTag === 'B6') {
        configureSquares(6);
        this.circles = ['B1', 'B6'];
      }

      // Maze 7
      if (selectedTag === 'C4' || selectedTag === 'D1') {
        configureSquares(7);
        this.circles = ['C4', 'D1'];
      }

      // Maze 8
      if (selectedTag === 'A5' || selectedTag === 'C2') {
        configureSquares(8);
        this.circles = ['A5', 'C2'];
      }

      // If circles was populated, draw them on the maze.
      if (this.circles) {
        this.circles.forEach((circle) => {
          this.drawCircle(circle);
        });
        $('#instructions').html(`Place the white square.`);
      }

      console.log(`Mazes: squareSelected()`, this.squares);
      // If no white square has been selected
    } else if (this.whiteSquare === undefined) {
      this.whiteSquare = selectedTag;
      console.log('white square', this.whiteSquare);
      this.drawSquare(this.whiteSquare);
      $('#instructions').html(`Place the red triangle.`);
      // If no red triangle has been selected
    } else if (this.redTriangle === undefined) {
      this.redTriangle = selectedTag;
      console.log('red triangle', this.redTriangle);
      this.drawTriangle(this.redTriangle);
      this.optimalPath = this.findPath(
        this.whiteSquare,
        this.redTriangle
      ).split(',');
      console.log('optimal path', this.optimalPath);
      this.drawPath();
      this.printDirections(this.shortdir);
      $('#instructions').html(`Follow the directions below.`);
    }
  };

  // Finds optimal path through maze. Stores as list of square tags.
  findPath = (currentLocation, destination, previousLocation = '') => {
    console.log(`Mazes: findPath()`, `${currentLocation} to ${destination}`);
    let returnString = '';

    // If we somehow end up at a null, skip everything.
    if (currentLocation !== null) {
      // If this is the destination, start the recursive return.
      if (currentLocation === destination) {
        console.log('found it', currentLocation);
        return currentLocation;
      } else {
        // see if each direction is neither null nor last visited, repeat
        if (
          this.squares[currentLocation].up !== null &&
          this.squares[this.squares[currentLocation].up].tag !==
            previousLocation
        ) {
          console.log('up', currentLocation);
          // Recursive call to next direction
          returnString = this.findPath(
            this.squares[this.squares[currentLocation].up].tag,
            destination,
            currentLocation
          );
          // If identifying string is present, it didn't find the end, so don't return this path.
          if (!returnString.includes('$$$'))
            return currentLocation + ',' + returnString;
        }

        if (
          this.squares[currentLocation].down !== null &&
          this.squares[this.squares[currentLocation].down].tag !==
            previousLocation
        ) {
          console.log('down', currentLocation);
          returnString = this.findPath(
            this.squares[this.squares[currentLocation].down].tag,
            destination,
            currentLocation
          );
          if (!returnString.includes('$$$'))
            return currentLocation + ',' + returnString;
        }

        if (
          this.squares[currentLocation].left !== null &&
          this.squares[this.squares[currentLocation].left].tag !==
            previousLocation
        ) {
          console.log('left', currentLocation);
          returnString = this.findPath(
            this.squares[this.squares[currentLocation].left].tag,
            destination,
            currentLocation
          );
          if (!returnString.includes('$$$'))
            return currentLocation + ',' + returnString;
        }

        if (
          this.squares[currentLocation].right !== null &&
          this.squares[this.squares[currentLocation].right].tag !==
            previousLocation
        ) {
          console.log('right', currentLocation);
          returnString = this.findPath(
            this.squares[this.squares[currentLocation].right].tag,
            destination,
            currentLocation
          );
          if (!returnString.includes('$$$'))
            return currentLocation + ',' + returnString;
        }
      }
    }
    // If can no longer search in any direction, send back identifying string.
    return '$$$';
  };

  // Draw circle in the square provided
  drawCircle = (id) => {
    console.log(`drawCircle() - ${id}`);
    let square = document.getElementById(id).getBoundingClientRect();
    let circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    circle.setAttribute('cx', square.left + square.width / 2);
    circle.setAttribute('cy', square.top + square.height / 2);
    circle.setAttribute('r', square.height / 2 - 5);
    circle.setAttribute(
      'style',
      'stroke: green; stroke-width: 4px; fill: none;'
    );
    document.getElementById('svg-canvas').append(circle);
    this.drawTracker.circles.visible = true;
    this.drawTracker.circles.id = id;
  };

  // Draw triangle in the square provided
  drawTriangle = (id) => {
    console.log(`drawTriangle() - ${id}`);
    const square = document.getElementById(id).getBoundingClientRect();
    const triangle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polygon'
    );
    const centreWidth = square.left + square.width / 2;
    const centreHeight = square.top + square.height / 2;
    const triangleSize = 8;
    triangle.setAttribute(
      'points',
      `${centreWidth},${centreHeight + triangleSize} ${
        centreWidth - triangleSize
      },${centreHeight - triangleSize} ${centreWidth + triangleSize},${
        centreHeight - triangleSize
      }`
    );
    triangle.setAttribute('style', 'fill: red;');
    document.getElementById('svg-canvas').append(triangle);
    this.drawTracker.triangle.visible = true;
    this.drawTracker.triangle.id = id;
  };

  // Draw square in the square provided
  drawSquare = (id) => {
    console.log(`drawSquare() - ${id}`);
    const square = document.getElementById(id).getBoundingClientRect();
    const littleSquare = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polygon'
    );
    const centreWidth = square.left + square.width / 2;
    const centreHeight = square.top + square.height / 2;
    const littleSquareSize = 8;
    littleSquare.setAttribute(
      'points',
      `${centreWidth + littleSquareSize},${centreHeight + littleSquareSize} ${
        centreWidth - littleSquareSize
      },${centreHeight + littleSquareSize} ${centreWidth - littleSquareSize},${
        centreHeight - littleSquareSize
      } ${centreWidth + littleSquareSize},${centreHeight - littleSquareSize}`
    );
    littleSquare.setAttribute(
      'style',
      'stroke: black; stroke-width: 3px; fill: none;'
    );
    document.getElementById('svg-canvas').append(littleSquare);
    this.drawTracker.square.visible = true;
    this.drawTracker.square.id = id;
  };

  // Based on optimal path, draws SVG line through squares
  drawPath = () => {
    console.log('drawPath()');
    for (let i = 0; i < this.optimalPath.length - 1; i++) {
      this.drawLine(this.optimalPath[i], this.optimalPath[i + 1]);
      this.addDirection(this.optimalPath[i], this.optimalPath[i + 1]);
    }
    this.shortdir.push (this.directions[this.directions.length - 1] + this.dirindex[this.dirindex.length-1]);
    this.drawTracker.lines.visible = true;
  };

  // Draw an individual line between two elements, based on id
  drawLine = (id1, id2) => {
    console.log(`drawLine() - id1: ${id1}, id2: ${id2}`);
    const square1 = document.getElementById(id1).getBoundingClientRect();
    const square2 = document.getElementById(id2).getBoundingClientRect();
    const newLine = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'line'
    );
    newLine.setAttribute('x1', square1.left + square1.width / 2);
    newLine.setAttribute('y1', square1.top + square1.height / 2);
    newLine.setAttribute('x2', square2.left + square2.width / 2);
    newLine.setAttribute('y2', square2.top + square2.height / 2);
    newLine.setAttribute('style', 'stroke: blue; stroke-width: 2px;');
    document.getElementById('svg-canvas').prepend(newLine);
  };

  // Redraws SVG on screen resize
  redrawSVG = () => {
    console.log('Resize detected');
    document.getElementById('svg-canvas').innerHTML = '';

    if (this.drawTracker.circles.visible) {
      this.circles.forEach((circle) => {
        this.drawCircle(circle);
      });
    }

    if (this.drawTracker.square.visible){
      this.drawSquare(this.drawTracker.square.id);
    }

    if (this.drawTracker.triangle.visible){
      this.drawTriangle(this.drawTracker.triangle.id);
    }

    if (this.drawTracker.lines.visible){
      this.drawPath();
    }
  }

  // Adds direction string to directions list
  addDirection = (id1, id2) => {
    const currentSquare = this.squares[id1];

    if (currentSquare.up === id2) this.directions.push('U');

    if (currentSquare.down === id2) this.directions.push('D');

    if (currentSquare.left === id2) this.directions.push('L');

    if (currentSquare.right === id2) this.directions.push('R');

    if((this.directions.length === 1) || (this.directions[this.directions.length - 1] != this.directions[this.directions.length - 2])) {
      this.dirindex.push(1);
      if (this.directions.length > 1) {
        this.shortdir.push (this.directions[this.directions.length - 2] + this.dirindex[this.dirindex.length-2]);
      }
    } else {
      this.dirindex.push((this.dirindex[this.dirindex.length-1])+1);
    }
  };

  // Prints directions to screen
  printDirections = (directions) => {
    console.log('printDirections', directions);
    $('#commands').html(`Directions: ${directions.join(' ')}`);
  };

  draw() {
    console.log('Mazes.draw(): drawing in canvas');
    $('#canvas')
      .html(` <div class="row console" id="instructions">Select one circle location.</div>
      <div class="container-fluid" id="maze-container">
        <div class="row">
          <div class="col-1 p-0">
            <div class="maze-header maze-sidebar text-right"></div>
            <div class="maze-sidebar text-right">1</div>
            <div class="maze-sidebar text-right">2</div>
            <div class="maze-sidebar text-right">3</div>
            <div class="maze-sidebar text-right">4</div>
            <div class="maze-sidebar text-right">5</div>
            <div class="maze-sidebar text-right">6</div>
          </div>
          <div class="col-11">
            <div class="row py-0 mt-2">
              <div class="col maze-header text-center">A</div>
              <div class="col maze-header text-center">B</div>
              <div class="col maze-header text-center">C</div>
              <div class="col maze-header text-center">D</div>
              <div class="col maze-header text-center">E</div>
              <div class="col maze-header text-center">F</div>
            </div>
            <div class="row">
              <div id="maze" class="col p-0 mt-0">
                <div class="row">
                  <div class="col maze-square" id="A1"></div>
                  <div class="col maze-square" id="B1"></div>
                  <div class="col maze-square" id="C1"></div>
                  <div class="col maze-square" id="D1"></div>
                  <div class="col maze-square" id="E1"></div>
                  <div class="col maze-square" id="F1"></div>
                </div>
                <div class="row">
                  <div class="col maze-square" id="A2"></div>
                  <div class="col maze-square" id="B2"></div>
                  <div class="col maze-square" id="C2"></div>
                  <div class="col maze-square" id="D2"></div>
                  <div class="col maze-square" id="E2"></div>
                  <div class="col maze-square" id="F2"></div>
                </div>
                <div class="row">
                  <div class="col maze-square" id="A3"></div>
                  <div class="col maze-square" id="B3"></div>
                  <div class="col maze-square" id="C3"></div>
                  <div class="col maze-square" id="D3"></div>
                  <div class="col maze-square" id="E3"></div>
                  <div class="col maze-square" id="F3"></div>
                </div>
                <div class="row">
                  <div class="col maze-square" id="A4"></div>
                  <div class="col maze-square" id="B4"></div>
                  <div class="col maze-square" id="C4"></div>
                  <div class="col maze-square" id="D4"></div>
                  <div class="col maze-square" id="E4"></div>
                  <div class="col maze-square" id="F4"></div>
                </div>
                <div class="row">
                  <div class="col maze-square" id="A5"></div>
                  <div class="col maze-square" id="B5"></div>
                  <div class="col maze-square" id="C5"></div>
                  <div class="col maze-square" id="D5"></div>
                  <div class="col maze-square" id="E5"></div>
                  <div class="col maze-square" id="F5"></div>
                </div>
                <div class="row">
                  <div class="col maze-square" id="A6"></div>
                  <div class="col maze-square" id="B6"></div>
                  <div class="col maze-square" id="C6"></div>
                  <div class="col maze-square" id="D6"></div>
                  <div class="col maze-square" id="E6"></div>
                  <div class="col maze-square" id="F6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <svg id="svg-canvas"></svg>
      </div>
      <div class="row console" id="commands">Follow instructions above.</div>`);
  }
}


