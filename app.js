const section = document.querySelector('div.row');

// get current date
moment.locale("de")
var day = moment().format('D');
var month = moment().format('M');

// add current date to wikidata query
var datasource = 'https://query.wikidata.org/sparql?query=SELECT%20%3Fimg%20%3FsubjLabel%20%3FplaceLabel%20%3Fbirth%20%3Fdeath%20%3Fgutenberg%20WHERE%20%7B%0A%20%20%3Fsubj%20wdt%3AP106%20wd%3AQ49757%3B%0A%20%20%20%20wdt%3AP19%20%3Fplace.%0A%20%20%3Fplace%20wdt%3AP17%20wd%3AQ183%3B%0A%20%20%20%20wdt%3AP625%20%3Fcoord.%0A%20%20%3Fsubj%20wdt%3AP569%20%3Fbirth.%0A%20%20OPTIONAL%20%7B%20%3Fsubj%20wdt%3AP1938%20%3Fgutenberg.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fsubj%20wdt%3AP18%20%3Fimg.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fsubj%20wdt%3AP570%20%3Fdeath.%20%7D%0A%20%20FILTER%28%28%28DAY%28%3Fbirth%29%29%20%3D%20' + day + '%20%29%20%26%26%20%28%28MONTH%28%3Fbirth%29%29%20%3D%20' + month + '%20%29%29%0ASERVICE%20wikibase%3Alabel%20%7B%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cde%22%20%7D%0A%7D&format=JSON'

// JSON request
$.getJSON(datasource, function(birthdayPoets){ // Note the data variable!
  showPoets(birthdayPoets);
});

function showPoets(jsonObj) {
    const poets = jsonObj['results']['bindings'];

for (let i = 0; i < poets.length; i++) {
    const myPoet = document.createElement('div');
    myPoet.className = "col-md-6";
    const poetName = document.createElement('h2');
    const poetImg = document.createElement('img');
    const poetBirth = document.createElement('p');
    const poetPlace = document.createElement('p');
    const poetDeath = document.createElement('p');

    poetName.textContent = poets[i]['subjLabel'].value;
    
    if (poets[i]['img']) {
      poetImg.src = poets[i]['img'].value;
    }
    else {
      poetImg.src = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
    }
    poetBirth.textContent = 'Geburtstag: ' + moment(poets[i]['birth'].value).format('Do MMMM YYYY') + ' (' + moment(poets[i]['birth'].value).from() + ').';
    poetPlace.textContent = 'Geburtsort: ' + poets[i]['placeLabel'].value + '.';
    if (poets[i]['death']) {
      poetDeath.textContent = 'Todestag: ' + moment(poets[i]['death'].value).format('Do MMMM YYYY') + '.';
    }

    myPoet.appendChild(poetName);
    myPoet.appendChild(poetImg);
    myPoet.appendChild(poetBirth);
    myPoet.appendChild(poetPlace);
    myPoet.appendChild(poetDeath);

    section.appendChild(myPoet);
  }
}
