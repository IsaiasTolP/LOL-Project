import Champion from "./champion.js";

const url = "https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json";

const button = document.querySelector("button");

button.addEventListener("click", () => {
    button.style.visibility = "hidden";
});

fetch(url).then(response => response.json())
    .then(data => {
        const champsData = data.data;
        Object.keys(champsData).forEach(champKey => {
            const champion = new Champion(champsData[champKey]);
            // console.log(champion.attack);
        });
    });

function displayChamps(){
    document.getElementById("body").innerHTML +=
    `<p>Escritura curiosa</p>`;
}
window.displayChamps = displayChamps; // Pongo la función en el espacio de nombres global para acceder desde HTML
