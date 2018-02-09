// Sum of all multiples of 3 or 5 less than 1000 (JavaScript)

//initially sets "sum" to 0
var sum = 0;

//creates a range from 0 to 1000 and increases by 1 after each loop
for (var i = 0; i <= 1000; i++){

    //condition states "if current iteration is a multiple of 3 or 5 AND has no remainder"...
    if (i % 3 === 0 || i % 5 === 0) 
    {
        //...then add it to the current sum
        sum += i;  
    }
}

//and display the final total
console.log(sum);
