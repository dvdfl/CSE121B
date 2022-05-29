//main.js
import ScoreCard from './score_card.js'

//create event handler for game selection dropdown element
const selectEl = document.getElementById("game_list");
const handler = function () {
    console.log(selectEl.value);
    ScoreCard.init(selectEl.value);
}
// attach event handler to ewent
selectEl.addEventListener('change', handler);
  
// load cards for first item on dropdown by default when page loaded
handler();