const section = document.querySelector('section');

var day = moment().format('D');
var month = moment().format('M');
var datasource = 'https://query.wikidata.org/sparql?query=SELECT%20%3Fimg%20%3FsubjLabel%20%3FplaceLabel%20%3Fcoord%20%3Fbirth%20%3Fdeath%20%3Fgutenberg%20WHERE%20%7B%0A%20%20%3Fsubj%20wdt%3AP106%20wd%3AQ49757%3B%0A%20%20%20%20wdt%3AP19%20%3Fplace.%0A%20%20%3Fplace%20wdt%3AP17%20wd%3AQ183%3B%0A%20%20%20%20wdt%3AP625%20%3Fcoord.%0A%20%20%3Fsubj%20wdt%3AP569%20%3Fbirth.%0A%20%20OPTIONAL%20%7B%20%3Fsubj%20wdt%3AP1938%20%3Fgutenberg.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fsubj%20wdt%3AP18%20%3Fimg.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fsubj%20wdt%3AP570%20%3Fdeath.%20%7D%0A%20%20FILTER%28%28%28DAY%28%3Fbirth%29%29%20%3D%20' + day + '%20%29%20%26%26%20%28%28MONTH%28%3Fbirth%29%29%20%3D%20' + month + '%20%29%29%0ASERVICE%20wikibase%3Alabel%20%7B%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cde%22%20%7D%0A%7D&format=JSON'

let request = new XMLHttpRequest();
request.open('GET', datasource);
request.responseType = 'json';
request.send();
request.onload = function() {
  const superHeroes = request.response;
  showHeroes(superHeroes);
}

function showHeroes(jsonObj) {
    const heroes = jsonObj['results']['bindings'];
      
for (let i = 0; i < heroes.length; i++) {
    const myArticle = document.createElement('article');
    const myH2 = document.createElement('h2');
    const myImg = document.createElement('img');
    const myPara1 = document.createElement('p');
    const myPara2 = document.createElement('p');
    const myPara3 = document.createElement('p');
    const myPara4 = document.createElement('p');

    myH2.textContent = heroes[i]['subjLabel'].value;
    if (heroes[i]['img']) {
        myImg.src = heroes[i]['img'].value;
    }
    myPara1.textContent = 'Birthday: ' + moment(heroes[i]['birth'].value).format('Do MMMM YYYY');
    myPara2.textContent = 'Birthplace: ' + heroes[i]['placeLabel'].value;
    myPara3.textContent = 'Deathday: ' + moment(heroes[i]['death'].value).format('Do MMMM YYYY');
    myPara4.textContent = 'Time since Birthday: ' + moment(heroes[i]['birth'].value).from();

    myArticle.appendChild(myH2);
    myArticle.appendChild(myImg);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myPara4);

    section.appendChild(myArticle);
  }
}
