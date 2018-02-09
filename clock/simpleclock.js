window.onload = updateClock();

function updateClock(){
    
    //creates new clock object//
    var currentTime = new Date ( );
    
    //grabs the current time to display//
    var currentHours = currentTime.getHours ( );
    var currentMinutes = currentTime.getMinutes ( );
    var currentSeconds = currentTime.getSeconds ( );
    
    //decides whether to add a leading zero for single-digit minutes and seconds//
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
    
    //includes AM/PM on display//
    var timeOfDay = (currentHours < 12 ) ? "AM" : "PM";
    
    //converts hours to 12-hour format//
    currentHours = (currentHours > 12 ) ? currentHours - 12 : currentHours;
    
    //OR converts hours to 24-hour format//
    currentHours = (currentHours == 0 ) ? 12 : currentHours;
    
    //concatinates everything together into one readable string//
    var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
    
    //inserts the clock display onto our page & updates the current time//
    document.getElementById("flip-clock").firstChild.nodeValue
    }
    
    // firstChild.nodeValue = currentTimeString;
// }
};