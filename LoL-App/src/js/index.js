import Champion from "./champion.js";

const url = "https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json";

const button = document.querySelector("button");
let champions = [];

button.addEventListener("click", () => {
    button.style.visibility = "hidden";
});

fetch(url).then(response => response.json())
    .then(data => {
        const champsData = data.data;
        Object.keys(champsData).forEach(champKey => {
            const champion = new Champion(champsData[champKey]);
            champions.push(champion);
        });
    });

function displayChamps(){
    let img = `https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${champions[0].img}`
    document.getElementById("body").innerHTML +=`
    <div class="card">
        <div class="imgContainer">
            <img src="${img}">
        </div>
        <div class="textContainer">
            <span>Escritura</span>
        </div>
    </div>`;

}
window.displayChamps = displayChamps; // Pongo la función en el espacio de nombres global para acceder desde HTML
