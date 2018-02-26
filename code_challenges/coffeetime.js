
// I want you to tell me how far it is from a desk to the coffee machine. My office layout is laid out in a grid - every cell is either a wall, which is impassible, or a desk (employees can walk through other employees desks to get to a coffee machine). Here is a sample office:

// X : Wall
// - : desk
// C : Coffee

// --C-
// -XX-
// XC--

// This office has 3 rows and 4 columns. The distance from the desk at (2,1) is 3, since it can reach the coffee machine in row 1 in three steps.

// The function I'd like you to implement has this signature.  This is a .NET signature, so you may adjust it if you are using a different language:

// public static int DistanceToCoffee(int numRows, int numColumns, Tuple<int, int> DeskLocation, List<Tuple<int, int>> coffeeLocations, List<Tuple<int, int>> walls)

///////////////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



// STEP 1: CONSTRUCT A GRID
// Grid constructor function //

var gridSize = 4; // Create a 4x4 office grid
var office = []; // Store the coordinates in an array

for (var i=0; i<gridSize; i++) {  // Iterate through the array — any blank space is labeled as a "Desk"
    office[i] = [];
    for (var j=0; j<gridSize; j++) {
        office[i][j] = "Desk";
    }
}

// Fill the grid with a start point, a goal (coffee), and obstacles (walls)
office[0][0] = "Start";
office[2][2] = "Coffee";

office[1][1] = "Wall";
office[1][2] = "Wall";
office[1][3] = "Wall";
office[3][1] = "Wall";

console.log(office);

// Visual representation

//  |S|-|-|-|-|
//  |-|W|W|W|-|
//  |-|-|C|-|-|
//  |-|W|-|-|-|

// Solution structure:
// function DistanceToCoffee([numRows, numColumns], numSteps)
//     DeskLocation([numRows, numColumns])
//     CoffeeLocations([numRows, numColumns])
//     Walls([numRows, numColumns])

// STEP 2: BREADTH-FIRST SEARCH TO DETERMINE COORDINATES OF EACH TYPE OF OBSTACLE

var q = [(0,0)]; // We need to add new locations to the queue as we discover them -- this is a sort of to-do list of places to explore, starting with locations closest to the start point so that we can later find the shortest path to our goal

// Create an object/dictionary to store coordinates for each type of obstacle/location
var DeskLocations = {};  
var CoffeeLocations = {};
var WallLocations = {};

// Procedure for the BFS:
// Pull the first location off of the queue
// Loop through the locations that are 1 "move" away from the location you just pulled off the queue (in this example, the tiles to the North, South, East, and West of the current tile)
// If one of these locations is the goal, we're done!
// Otherwise, if and only if the location has not yet been visited and is valid (ie. is on the board and is not an "obstacle"), add that new location to the end of the queue.
// Repeat the process...(pull the first location off of the queue, etc.)

for (var i=0; i<gridSize; i++) {  // Iterate through each set of coordinates to where everything is in the office
    office[i] = [];
    for (var j=0; j<gridSize; j++) {
        office[i][j] = "Desk";
    }
}

while (office[i]<gridSize) {

};

