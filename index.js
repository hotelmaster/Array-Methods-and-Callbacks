import { fifaData } from './fifa.js';
console.log(fifaData);

console.log('its working');
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

// actually i needed to access/return/console.log these values, not use an index, the adv arr methods will do that for me

fifaData.forEach( (item) => {
    if(item.Year == 2014 && item.Stage == "Final") {
        console.log(item["Home Team Name"]);
        console.log(item["Away Team Name"]);
        console.log(item["Home Team Goals"]);
        console.log(item["Away Team Goals"]);
        if(item["Home Team Goals"] > item["Away Team Goals"]) {
            console.log(`Winner of the 2014 World Cup Final: ${item["Home Team Name"]}`);
        }
        else if(item["Away Team Goals"] > item["Home Team Goals"]) {
            console.log(`Winner of the 2014 World Cup Final: ${item["Away Team Name"]}`);
        }
    }
});

// this code is now obsolete...what was i thinking using an index...
console.log(fifaData[828]["Home Team Name"]); // home team name 2014 wcf
console.log(fifaData[828]["Away Team Name"]); // away team name 2014 wcf
console.log(fifaData[828]["Home Team Goals"]); // home team name 2014 wcf
console.log(fifaData[828]["Away Team Goals"]); // away team name 2014 wcf
console.log(fifaData[828]["Win conditions"]); // winner conditions 2014 wcf


/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {
    const finalsArray = data.filter((item) => { return item.Stage == "Final"; });

    return finalsArray;
};

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`,
and returns an array called `years` containing all of the years in the dataset */

// callBack as a parameter
function getYears(callBack) {
    // use map method to take all array elements returned from getFinals (stored as callBack) and only keep the years
    const years = callBack.map((item) => { return { "Year": item.Year }; });
    // return the array
    return years;
};

// call the higher-order function with cb function as argument
getYears(getFinals);

/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away)
           of each `finals` game. Return the name of all winning countries in an array called `winners` */

// parameter can be called cb
function getWinners(cb) {
    // using the array stored in cb we can check every item to determine the winner and return only the team name
    // to the new array returned by the map method
    let mapTheWinner = cb.map((item) => {
        // use ternary operator to determine which team name is returned as the winner
        return (item["Home Team Goals"] > item["Away Team Goals"]) ? (item["Home Team Name"]) : (item["Away Team Name"]);
    });
};
// invoke higher-order function
getWinners(getFinals);

/* Task 5: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of
   strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(cbWin, cbYrs) {
    // turn the year objects into single number items
    let mapYrsArr = cbYrs.map((item) => { return item.Year; });
    // use a for-loop to put corresponding year and winner into one object and every object into a new array
    // array to store the each object containing winner and year
    let comboArr = [];
    // store each winner and corresponding year into 1 object and push to comboArr
    for (let i = 0, i < cbWin.length; i++) {
        comboArr[i].push({ "Year": mapYrsArr[i], "Winner": cbWin[i] });
    }
    // now with array containing both winner and year, use map to change them into a string
    return comboArr.map((item) => { return `In ${comboArr.Year}, ${comboArr.Winner} won the world cup!`; });
};

getWinnersByYear(getWinners, getYears);

/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals
scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
    // sum up homeGoals with reduce method
    const sumHomeGoals = data.reduce((homeGoals, item) => { return homeGoals += item["Home Team Goals"]; }, 0);
    // sum up awayGoals with reduce method
    const sumAwayGoals = data.reduce((awayGoals, item) => { return awayGoals += item["Away Team Goals"]; }, 0);
    // return the averages
    return { "Average Home Team Goals": sumHomeGoals / data.length, "Average Away Team Goals": sumAwayGoals / data.length }
};

// 2 - 1, 2 - 0, 0 - 0

// function call
getAverageGoals(fifaData);

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` 
              and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
    // teamInitials is a string entered by the user, i.e. FRANCE has initials FRA

    // use filter method to find all fifa objects that match teamInitials parameter and include "World Cup" in the Stadium key
    const filterWcw = data.filter((item) => {
        (item["Home Team Initials"] == teamInitials || item["Away Team Initials"] == teamInitials) && item.Stadium.includes("World Cup")
    });
    // now use reduce method with a conditional in the arrow function
    const reduceWcw = filterWcw.reduce((wins, item) => {
        // inside arrow function, only return the item if they win
        // first check if teamInitials is home or away
        if (teamInitials == item["Home Team Initials"]) {
            if (item["Home Team Goals"] > item["Away Team Goals"]) {
                // exit the arrow function, back to reduce method
                return wins = wins + 1;
            }
        } else if (teamInitials == item["Away Team Initials"]) {
            if (item["Away Team Goals"] > item["Home Team Goals"]) {
                // back to reduce method, onto next array elements to determine a win or not a win
                return wins = wins + 1;
            }
        }
    }, 0);
    // return the array created by reduce method
    return reduceWcw;

};
// example of a call
getCountryWins(fifaData, "BEL");


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals( /* code here */ ) {

    /* code here */

};

getGoals();


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense( /* code here */ ) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */