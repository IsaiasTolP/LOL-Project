import Champion from "./champion.js";

function getUrlChamp() {
    const param = new URLSearchParams(window.location.search);
    const champId = param.get('champion');
    return champId;
}

const champId = getUrlChamp();
const url = `https://ddragon.leagueoflegends.com/cdn/14.20.1/data/es_ES/champion/${champId}.json`;

async function loadChampDetails() {
    const response = await fetch(url);
    const data = await response.json();
    const champData = data.data;
    const champ = new Champion(champData[champId]);
    displayChampionImages(champ);
}

async function getChampImages(champ) {
    let imagesUrls = [];
    for (let skin of champ.skinsData) {
        let imgUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_${skin.num}.jpg`;
        imagesUrls.push(imgUrl);
    }
    return imagesUrls;
}

function hideLoadingScreen(){
    document.getElementById("loadingScreen").style.visibility = "hidden";
    document.getElementById("main").style.visibility = "visible";
}

let currSlide = 0;
let slides = [];

async function displayChampionImages(champ) {
    const imagesUrls = await getChampImages(champ);

    displayChampionInfo(champ);
    document.getElementById("champImg").innerHTML +=`
    <div id="carousel"><span id="champName">${champ.name}</span><span id="champTitle">${champ.title}</span></div>`;
    for(let i = 0; i < imagesUrls.length; i++){
        let img = document.createElement('img');
        img.src = imagesUrls[i];
        img.classList.add('carouselItem');
        if (i === 0) {
            img.classList.add('active');
        }
        document.getElementById("carousel").appendChild(img);
        
    }
    slides = document.querySelectorAll(".carouselItem");

    hideLoadingScreen();
    showSlide(currSlide);
    autoSlide();
}

function displayChampionInfo(champ) {
    let pluralText = ""
    if (champ.roles.length > 1) {
        pluralText = "es"
    }
    document.getElementById("champInfo").innerHTML +=`
    <h4 id="champLore">${champ.lore}</h4>
    <div id="gameplayInfo">
        <div id="stats">
            <p>🤩Rol${pluralText}: ${champ.roles.join(", ")}</p>
            <p>🎯Dificultad: ${champ.difficulty}</p>
            <p>💚Vida base: ${champ.baseHp} --> Nivel 18: ${champ.lvl18Hp}</p>
            <p>🧙🏻‍♂️Maná base: ${champ.baseMp} --> Nivel 18: ${champ.lvl18Mp}</p>
            <p>⚔️Ataque base: ${champ.baseAttack} --> Nivel 18: ${champ.lvl18Attack}</p>
            <p>⚡Velocidad de ataque base: ${champ.baseAtkSpeed} --> Nivel 18: ${champ.lvl18AtkSpeed}</p>
            <p>🤺Rango de ataque: ${champ.atkRange}</p>
        </div>
    </div>
    <h2>Habilidades</h2>
    <div id="skills"></div>`;
    
    const spellTypes = ["Q", "W", "E", "Definitiva"];
    let i = 0;
    for(let spell of champ.spellsData) {
        document.getElementById("skills").innerHTML +=`
        <div class="spell">
            <p>Habilidad ${spellTypes[i]}</p>
            <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/spell/${spell.id}.png">
            <p>${spell.name}</p>
        </div>`
        i++;
    }
    document.getElementById("skills").innerHTML +=`
    <div class="passive">
        <p>Pasiva</p>
        <img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/passive/${champ.passiveData.image.full}">
        <p>${champ.passiveData.name}</p>
    </div>`;
}

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function moveSlide(step) {
    currSlide = (currSlide + step + slides.length) % slides.length;
    showSlide(currSlide);
}

function autoSlide() {
    setInterval(function() {
        moveSlide(1);
    }, 3000);
}

loadChampDetails();
