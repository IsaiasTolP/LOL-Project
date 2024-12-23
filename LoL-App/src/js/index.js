import BasicChampion from "./basic-champion.js";

const url = "https://ddragon.leagueoflegends.com/cdn/14.22.1/data/es_ES/champion.json";

const button = document.querySelector("button");
let champions = [];

async function initializeLeagueStats(){
    await fetch(url).then(response => response.json())
        .then(data => {
            const champsData = data.data;
            Object.keys(champsData).forEach(champKey => {
                const champion = new BasicChampion(champsData[champKey]);
                champions.push(champion);
            });
        });
    displayChamps();
}

button.addEventListener("click", () => {
    button.style.visibility = "hidden";
    initializeLeagueStats();
});

function displayChamps(){
    champions.forEach(element => {
        let img = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${element.id}_0.jpg`
        document.getElementById("body").innerHTML +=`
        <div class="card" onclick="window.location='html/detail.html?champion=${element.id}'">
            <div class="imgContainer">
                <img src="${img}">
                <div class="moreDet">
                    <span id="text">Más detalles</span>
                </div>
            </div>
            <div class="textContainer">
                <span class="name">${element.name}</span><br>
                <span class="title">${element.title}</span>
            </div>
        </div>`;
    });
}
