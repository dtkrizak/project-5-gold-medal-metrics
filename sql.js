var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./gold_medals.sqlite');

/*
Returns a SQL query string that will create the Country table with four columns: name (required), code (required), gdp, and population.
*/

const createCountryTable = () => {
  return 'CREATE TABLE Country (name TEXT NOT NULL, code TEXT NOT NULL, gdp INT, population INT);';
};

/*
Returns a SQL query string that will create the GoldMedal table with ten columns (all required): id, year, city, season, name, country, gender, sport, discipline, and event.
*/

const createGoldMedalTable = () => {
  return 'CREATE TABLE GoldMedal (id INT NOT NULL, year INT NOT NULL, city TEXT  NOT NULL, season TEXT NOT NULL, name TEXT NOT NULL, country TEXT NOT NULL, gender TEXT NOT NULL, sport TEXT NOT NULL, discipline TEXT NOT NULL, event TEXT NOT NULL, PRIMARY KEY(id));';
};

/*
Returns a SQL query string that will find the number of gold medals for the given country.
*/

const goldMedalNumber = country => {
    return `SELECT country, COUNT(*) AS count FROM GoldMedal WHERE country = ${country} GROUP BY country;`;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most summer medals, along with the number of medals aliased to 'count'.
*/

const mostSummerWins = country => {
  return `SELECT year, COUNT(*) AS count FROM GoldMedal WHERE country = ${country} AND season = summer GROUP BY year ORDER BY count DESC LIMIT 1;`;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most winter medals, along with the number of medals aliased to 'count'.
*/

const mostWinterWins = country => {
  return `SELECT year, COUNT(*) AS count FROM GoldMedal WHERE country = ${country} AND season = winter GROUP BY year ORDER BY count DESC LIMIT 1;`;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestYear = country => {
  return `SELECT year, COUNT(*) AS count FROM GoldMedal WHERE country = ${country} GROUP BY year ORDER BY count DESC LIMIT 1;`;
};

/*
Returns a SQL query string that will find the discipline this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestDiscipline = country => {
  return `SELECT discipline, COUNT(*) AS count FROM GoldMedals WHERE country = ${country} GROUP BY discipline ORDER BY count DESC LIMIT 1;`;
};

/*
Returns a SQL query string that will find the sport this country has 
won the most medals, along with the number of medals aliased to 'count'.v 
*/

const bestSport = country => {
  return `SELECT sport, COUNT(*) AS count FROM GoldMedals WHERE country = ${country} GROUP BY sport ORDER BY count DESC LIMIT 1;`;
};

/*
Returns a SQL query string that will find the event this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestEvent = country => {
  return `SELECT event, COUNT(*) AS count FROM GoldMedals WHERE country = ${country} GROUP BY event ORDER BY count DESC LIMIT 1;`;
};

/*
Returns a SQL query string that will find the number of male medalists.
*/

const numberMenMedalists = country => {
  return `SELECT country, COUNT(*) AS count FROM GoldMedals WHERE gender = male GROUP BY country;`;
};

/*
Returns a SQL query string that will find the number of female medalists.
*/

const numberWomenMedalists = country => {
  return `SELECT country, COUNT(*) AS count FROM GoldMedals WHERE gender = female GROUP BY country;`;
};

/*
Returns a SQL query string that will find the athlete with the most medals.
*/

const mostMedaledAthlete = country => {
  return `SELECT country, name, COUNT(name) AS count FROM GoldMedals WHERE country = ${country} ORDER BY count DESC LIMIT 1;`;
};

/*
Returns a SQL query string that will find the medals a country has won
optionally ordered by the given field in the specified direction.
*/

const orderedMedals = (country, field, sortAscending) => {
  if(field){
    let sortOrder;
    if(sortAscending){
      sortOrder = 'ASC';
    } else{
      sortOrder = 'DESC';
    }
    return `SELECT country, ${field}, COUNT(*) AS count FROM GoldMedals WHERE country = ${country} GROUP BY country ORDER BY ${field} ${sortOrder};`
  } else{
    return `SELECT country, COUNT(*) AS count FROM GoldMedals WHERE country = ${country} GROUP BY country;`;
  }
};

/*
Returns a SQL query string that will find the sports a country has
won medals in. It should include the number of medals, aliased as 'count',
as well as the percentage of this country's wins the sport represents,
aliased as 'percent'. Optionally ordered by the given field in the specified direction.
*/

const orderedSports = (country, field, sortAscending) => {
  let sortOrder;
  if (sortAscending) {
    sortOrder = 'ASC';
  } else {
    sortOrder = 'DESC';
  }
  if (field) {
    return `SELECT country, sport, ${field}, COUNT(*), (COUNT(sport)*100/(COUNT(*) FROM GoldMedal)) AS percent AS count FROM GoldMedals WHERE country = ${country} GROUP BY sport ORDER BY ${field} ${sortOrder};`
  } else {
    return `SELECT country, sport, COUNT(*) AS count, (COUNT(sport)*100/(SELECT COUNT(*) FROM GoldMedal)) AS percent FROM GoldMedals WHERE country = ${country} GROUP BY sport ORDER BY percent ${sortOrder};`;
  }
};

module.exports = {
  createCountryTable,
  createGoldMedalTable,
  goldMedalNumber,
  mostSummerWins,
  mostWinterWins,
  bestDiscipline,
  bestSport,
  bestYear,
  bestEvent,
  numberMenMedalists,
  numberWomenMedalists,
  mostMedaledAthlete,
  orderedMedals,
  orderedSports
};
