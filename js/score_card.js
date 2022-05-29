const ScoreCard = {
    getOptionsList(options, listType) {
        // create input element to display based on the type of scoring
        let recordingEl = "";
        if (listType == 'bool') {
                recordingEl = "<input type=checkbox>";
        }
        else if (listType == 'numeric') {
            recordingEl = "<input type=number>";
        }
        else{
            recordingEl = "<input type=text>";
        }
        // create a list items using map method with input template
        const listElements = options.map(i=> `<li>${i}` + recordingEl + '</li>')
        // generate HTML for list and items
        const listElementsHtml = '<ul class=options>' + listElements.join("") + "</ul>";
        //return HTML
        return listElementsHtml;
    },
    createScoreCards : function (game, data){
        // get container element
        const mainEl = document.querySelector("main");
        // clear main container
        mainEl.innerHTML = '';
        // find game info on the data
        const gameInfo = data[game];
        //check if data for the game exists
        if (gameInfo) {
            // set game title on the page
            const gameNameEl = document.getElementById("game_title");
            gameNameEl.textContent = game;
            // process all the the possible cards needed for the game
            gameInfo.cards.forEach((card) => {
                // create list container element and card title
                const cardDiv = document.createElement("div");
                cardDiv.className = "card";
                cardDiv.innerHTML = `<h3>${card.name}</h3>`;
                // get the list of items to record for the card and add them to the screen
                const list = this.getOptionsList(card.options, card.type);
                cardDiv.innerHTML += list;
                mainEl.appendChild(cardDiv)
            });
        }
    },
    init: async function(game) {
        // fetch game score cards data from API or other exteran or local source
        const sourceUrl = "./js/data.txt";
        const response = await fetch(sourceUrl);
        // if response is successful extract the data as JSON object and create cards
        if (response.ok) {
            const data = await response.json();
            this.createScoreCards(game, data);
        }
    }
};

export default ScoreCard;