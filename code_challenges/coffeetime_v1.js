
// I want you to tell me how far it is from a desk to the coffee machine. 
// My office layout is laid out in a grid - every cell is either a wall, which is impassible, or a desk 
// (employees can walk through other employees desks to get to a coffee machine). Here is a sample office:

// X : Wall
// - : desk
// C : Coffee

// --C-
// -XX-
// XC--

// This office has 3 rows and 4 columns. The distance from the desk at (2,1) is 3, since it can reach the coffee machine in row 1 in three steps.

// The function I'd like you to implement has this signature.  This is a .NET signature, so you may adjust it if you are using a different 
// language:

// public static int DistanceToCoffee(int numRows, int numColumns, Tuple<int, int> DeskLocation, List<Tuple<int, int>> coffeeLocations, 
// List<Tuple<int, int>> walls)



///////////////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



// STEP 1: BREADTH-FIRST SEARCH TO DETERMINE COORDINATES OF EACH TYPE OF OBSTACLE

// Create an object/dictionary to store coordinates for each type of obstacle/location
var DeskLocations = [];  
var CoffeeLocations = [];
var WallLocations = [];


// Procedure for the breadth-first search:
    // Pull the first location off of the queue
    // Loop through the locations that are 1 "move" away from the location you just pulled off the queue (in this example, the tiles to the North, South, East, and West of the current tile)
    // If one of these locations is the goal, we're done!
    // Otherwise, if and only if the location has not yet been visited and is valid (ie. is on the board and is not an "obstacle"), add that new location to the end of the queue.
    // Repeat the process...(pull the first location off of the queue, etc.)


// Pathfinding function

// Start location will be in the following format:
// [distanceFromTop, distanceFromLeft]
var queue;
var steps = 0;
var addStep = function (){
    steps += 1;
};

var findShortestPath = function(startCoordinates, office) {
    var distanceFromTop = startCoordinates[0];
    var distanceFromLeft = startCoordinates[1];
    var position = (distanceFromTop,distanceFromLeft); // position on the office grid
    
    // Location object: 
    //Each "location" will store its coordinates and the shortest path required to arrive there
    var location = {
        distanceFromTop: distanceFromTop,
        distanceFromLeft: distanceFromLeft,
        path: [],
        position: [],
        status: 'Start'
    };
    
    // Initialize the queue with the start location already inside
    var queue = [location];
    
    // Counting function to keep track of steps to coffee from the starting point

    
    // Loop through the grid searching for the goal
    while (queue.length > 0) {
        // Take the first location off the queue
        var currentLocation = queue.shift();
        
        // Explore North
        var newLocation = exploreInDirection(currentLocation, 'North', office);
        if (newLocation.status === 'Coffee') {
            CoffeeLocations.push(position);
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            DeskLocations.push(position);
            queue.push(newLocation);
            addStep();
        }

        // Explore East
        var newLocation = exploreInDirection(currentLocation, 'East', office);
        if (newLocation.status === 'Coffee') {
            CoffeeLocations.push(position);
            addStep();
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            DeskLocations.push(position);
            queue.push(newLocation);
            addStep();
        }
        
        // Explore South
        var newLocation = exploreInDirection(currentLocation, 'South', office);
        if (newLocation.status === 'Coffee') {
            CoffeeLocations.push(position);
            addStep();
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            DeskLocations.push(position);
            queue.push(newLocation);
            addStep();
        }
        
        // Explore West
        var newLocation = exploreInDirection(currentLocation, 'West', office);
        if (newLocation.status === 'Coffee') {
            CoffeeLocations.push(position);
            addStep();
            return newLocation.path;
        } else if (newLocation.status === 'Valid') {
            DeskLocations.push(position);
            queue.push(newLocation);
            addStep();
        }
    }

    // If no valid path found:
    WallLocations.push(position);
    return false;
};

// This function will check a location's status (a location is "valid" if it is on the grid, is not a wall,
// and has not yet been visited by our algorithm).
// Returns "Valid", "Invalid", "Blocked", or "Coffee"

var locationStatus = function(location, office) {
    var gridSize = office.length;
    var dft = location.distanceFromTop;
    var dfl = location.distanceFromLeft;
    
    if (location.distanceFromLeft < 0 ||
        location.distanceFromLeft >= gridSize ||
        location.distanceFromTop < 0 ||
        location.distanceFromTop >= gridSize) {

        // location is not on the grid--return false
        return 'Invalid';
    } else if (office[dft][dfl] === 'Coffee') {
        return 'Coffee';
    } else if (office[dft][dfl] !== 'Desk') {
        // location is either an obstacle or has been visited
        return 'Wall';
    } else {
        return 'Valid';
    }
};

// Explores the grid from the given location in the given direction
var exploreInDirection = function(currentLocation, direction, office) {
    var newPath = currentLocation.path.slice();
    newPath.push(direction);
    
    var dft = currentLocation.distanceFromTop;
    var dfl = currentLocation.distanceFromLeft;
    
    if (direction === 'North') {
        dft -= 1;
    } else if (direction === 'East') {
        dfl += 1;
    } else if (direction === 'South') {
        dft += 1;
    } else if (direction === 'West') {
        dfl -= 1;
    }
    
    var newLocation = {
        distanceFromTop: dft,
        distanceFromLeft: dfl,
        path: newPath,
        status: 'Unknown'
    };
    newLocation.status = locationStatus(newLocation, office);
    
    // If this new location is valid, mark it as 'Visited'
    if (newLocation.status === 'Valid') {
        office[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
    }
    
    return newLocation;
};


// OK. We have the functions we need--let's run them to get our shortest path!


// STEP 2: CONSTRUCT A GRID
// Grid constructor function //

var gridSize = 4; // Create a 4x4 office grid
var office = []; // Store the coordinates in an array

for (var i=0; i<gridSize; i++) {  // Iterate through the array — any blank space is labeled as a "Desk"
    office[i] = [];
    for (var j=0; j<gridSize; j++) {
        office[i][j] = "Desk";
    }
}

// Fill the grid with a start point, a goal (coffee), and obstacles (walls) -- ((first index is "distance from top row", second index is "distance from left-most column"))
office[0][0] = "Start";
office[2][2] = "Coffee";

office[1][1] = "Wall";
office[1][2] = "Wall";
office[1][3] = "Wall";
office[3][1] = "Wall";

// console.log(office);

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


console.log(findShortestPath([0,0], office), steps);