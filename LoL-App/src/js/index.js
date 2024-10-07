import Champion from "./champion.js";

const url = "https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json";

const button = document.querySelector("button");
let champions = [];

async function initializeLeagueStats(){
    await fetch(url).then(response => response.json())
        .then(data => {
            const champsData = data.data;
            Object.keys(champsData).forEach(champKey => {
                const champion = new Champion(champsData[champKey]);
                champions.push(champion);
            });
        });
    await displayChamps();
}

button.addEventListener("click", () => {
    button.style.visibility = "hidden";
    initializeLeagueStats();
});

function displayChamps(){
    champions.forEach(element => {
        let img = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${element.id}_0.jpg`
        document.getElementById("body").innerHTML +=`
        <div class="card">
            <div class="imgContainer">
                <img src="${img}">
                <div class="stats">
                    Attack: ${element.attack}<br>
                    Defense: ${element.defense}<br>
                    Magic: ${element.magic}<br>
                    Difficulty: ${element.difficulty}<br>
                </div>
            </div>
            <div class="textContainer">
                <span class="name">${element.name}</span><br>
                <span class="title">${element.title}</span>
            </div>
        </div>`;
    });
}
