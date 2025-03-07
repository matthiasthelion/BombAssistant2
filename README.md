# BombAssistant

A companion application to assist with the game _Keep Talking and Nobody Explodes_.

Please check it out here:
[BombAssistant](https://dbarkowsky.github.io/BombAssistant/)

## About This Project
Years ago, I had played a lot of the game _Keep Talking and Nobody Explodes_. It's a cooperative video game where one person has a bomb and the other person has the manual that includes instructions on how to defuse that bomb. The players cannot see what the other player sees, so gameplay is all about good communication. Each bomb is made up of a series of modules, which are essentially little puzzles. Solve them all, and the bomb is defused.

I generally fell in the manual position, but, despite the systems my partner and I had developed, decoding the manual was often the aspect that slowed us down the most. **The goal of this app is to replace that manual**, letting the app do the hard thinking instead. 

I originally planned to do this in Java. I had just finished a course that used Java GUIs, and I wanted to practice that. The problem with Java is that is wouldn't be easily accessible for others. Instead, I chose to make a site that is essentially static but with functions that would _redraw_ portions of the page to give it that _React_ feel. The biggest benefit of this is that I could host it for free using GitHub's environments, allowing access from anywhere.

There is a healthy mix of jQuery in there just to make some selection tasks easier. 

## Module Descriptions
### Bomb
This manages the global settings that persist across all modules. This includes items like batteries, serial values, strikes, indicators, and parallel ports. These values are often used to determine instructions within modules, so they must be stored separately.

### Controller
The Controller sets up the main page and starts each module when selected.

### Simple Wires
Simple Wires requires the user to identify what wires are present in the game's module. It will then instruct the user on which wire should be cut. 

_This was the first module I made. I was a little turned off by the nested switch and if/else statements, but that seemed like the simplest option based on the number of possible outcomes. Each time a wire is selected, the page recalculates, using a series of if/else statements and switch statements to produce the correct wire._

### The Button
In The Button, the user selects the colour and word on the button. Depending on the bomb's global settings, they must either press and release the button or hold the button and release when the game timer shows a specific number, which depends on the coloured strip shown.

_The logic for this one was thankfully straightforward. My main gripe was with how best to style it. I wanted everything to work on desktop or mobile, and I'm not sure that I ever found a healthy medium between the two._

### Symbols
Users receive a list of symbols from the bomb holder. They select those symbols then read the correct order back to the bomb holder, who then has to select those symbols.

_This was the last module I did. There's a big chunk of data in this code that I didn't end up using, because I realized part way through that I could determine everything from the getColumns() function alone. I've left it there in case someone else might avoid retyping it. The biggest hurdle was filtering the buttons that would produce invalid combos. There are a few cases where multiple symbols appear in multiple columns, meaning I had to perform checks on each symbol for each column, and I'll admit it took a while to get that cleanly._

### Simon Says
The user selects the colours that are presented on the screen. This app generates the correct colours for the bomb holder to press in response. The correct colours depend on the bomb settings.

_Another straightforward module. I still have nightmares about the CSS here. It was all working with the webkit browsers, but Firefox did not seem to like my spacing when the rotation was added. This took time to fix._

### Who's On First
There will be a word presented on the game screen. Select that word in BombAssistant, then look to the Eye position. The bomb holder should relay the word in that position to the app user, who will then select it. A list of words will appear below, and the bomb holder should select the first available one.

_The big issue here was presentation. I'm still not 100% happy with it, but there are just so many word options that it's difficult to present them all. For reference, the actual manual takes two pages to display this module._

### Memory
Based on the number shown on the bomb module, the app user selects a number on the BombAssistant. The app will track position and values as they are entered, so it's important that the bomb holder relays which position/value they are selecting.

_Super simple interface and implementation. This was actually one we had a foolproof system for on paper, and it translated well._

### Morse Code
Based on the information provided by the bomb holder, the app user enters the short and long entries then submits that combination to get the matching letter. All possible words that match the entered letters will appear. Keep adding letters to narrow it down.

_We considered just learning morse code for this one. I also wanted to attempt a time-based input system, but it was finicky to differentiate between short and long presses._

### Complicated Wires
All cuttable wire combos are shown. Based on the bomb's configuration settings, the app user is informed to either cut or not cut a pool of wires. 

_I flip flopped between two possible visualizations. The first was to show a table, where users could just see if the appropriate cell was marked or not, indicating a cuttable wire. The second was a visual display where all wires were shown. I found this to be the more universally understandable option, even though I personally found it slower for me to process. This is also where I started using intervals to monitor the bomb's settings._


### Wire Sequences (ABC123)
The bomb holder will read the sequence to the app user (e.g. "Black A"). If that colour's button shows the correct letter, the bomb holder should cut that wire, and the app user will click the button to advance to the next acceptable option.

_This is another one we had down pat without the app. I tried to emulate that process. It's not flashy, but it works._

### Mazes
Based on the location of two circles, a maze configuation is identified. The app user then selects the square (start) and triangle (end). The app will calculate the proper path and produce the directions for the app user to read back to the bomb holder.

_I am most proud of this one for sure. It was also the one where I hit an issue with ES5 vs ES6 syntax that held me up for a long time. All the configurations are stored as 2D arrays of 0s and 1s. Each square on the maze is its own object, containing pointers to other squares if they are reachable. If not, boarders are drawn. The findPath() function is a recursive algorithm that finds the path from point A to point B. It works almost like a plant's feelers, spiraling out to grab a branch. It searches out routes until it finds a dead end, then it retracts and attempts another route from the last good node. Visually, I think it's also my favourite. The objects in the maze are drawn with an SVG overlay, which was a first for me as well._

### Passwords
This works like a Word Lock. The bomb holder should relay the letters to the app user in each column, and the app user should select them to reveal the possible letters in the next column. Repeat until there's only one possible word displayed below.

_I enjoyed this one a lot as well, but it's probably my least favourite in terms of code. There was so much looping involved to check which letters should be visible, then again to check with words are still valid. I'm sure there's a better way to do this, but I'm not looking to disturb it much now._

### Needy Knob
The Needy Knob only uses the four lights as highlighted in this app. The bomb holder should indicate which ones are lit and where the word UP is relative to the knob. The arrow in this app will point in the correct direction once everything is entered. The bomb holder should orient their arrow the same direction.

_I think this might be the second-cleanest look of all the modules. Fortunately, the rotation can be handled all within CSS, which was a lot easier than my original idea of using SVG drawing again._
