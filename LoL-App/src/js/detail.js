import Champion from "./champion.js";

const url = "https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json";

function getUrlChamp() {
    const param = new URLSearchParams(window.location.search);
    const champion = param.get('champion');
    return champion;
}

const champID = getUrlChamp();


async function loadChampDetails() {
    try{
        const response = await fetch(url);
        const data = await response.json();
        const champ = new Champion(data.data[champID]);
        displayChampionDetails(champ);
    }
    catch (error){
        console.error("Error al cargar los datos", error);
    }
    finally {
        hideLoadingScreen();
    }
}

function hideLoadingScreen(){
    document.getElementById("loadingScreen").style.visibility = "hidden";
}

function displayChampionDetails(champ) {
    document.getElementById("text").textContent = champ.name;
}

loadChampDetails();
