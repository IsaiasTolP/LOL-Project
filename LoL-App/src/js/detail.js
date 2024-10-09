import Champion from "./champion.js";

function getUrlChamp() {
    const param = new URLSearchParams(window.location.search);
    const champID = param.get('champion');
    return champID;
}

const champID = getUrlChamp();
const url = "https://ddragon.leagueoflegends.com/cdn/14.20.1/data/es_ES/champion.json";

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
}

async function getChampImages(champ) {
    let imageIdx = 0;
    let imagesUrls = [];
    while (true) {
        let imgUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_${imageIdx}.jpg`;
        let response = await fetch(imgUrl);
        if (response.ok) {
            imagesUrls.push(imgUrl);
            imageIdx++;
        }
        else {
            imageIdx++;
            break;
        }
    }
    return imagesUrls
}

function hideLoadingScreen(){
    document.getElementById("loadingScreen").style.visibility = "hidden";
    document.getElementById("main").style.visibility = "visible";
}

let currSlide = 0;
let slides = [];

async function displayChampionDetails(champ) {
    const imagesUrls = await getChampImages(champ);
    
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

    let pluralText = ""
    if (champ.roles.length > 1) {
        pluralText = "es"
    }
    document.getElementById("champInfo").innerHTML +=`
    <h4>${champ.blurb}</h4>
    <div id="stats">
        <p>Rol${pluralText}: ${champ.roles.join(", ")}</p>
        <p>Dificultad: ${champ.difficulty}</p>
        <p>Vida base: ${champ.baseHp} --> Nivel 18: ${champ.lvl18Hp}</p>
        <p>Maná base: ${champ.baseMp} --> Nivel 18: ${champ.lvl18Mp}</p>
        <p>Ataque base: ${champ.baseAttack} --> Nivel 18: ${champ.lvl18Attack}</p>
        <p>Velocidad de ataque base: ${champ.baseAtkSpeed} --> Nivel 18: ${champ.lvl18AtkSpeed}</p>
        <p>Rango de ataque: ${champ.atkRange}</p>
    </div>
    <div id="skills">
        <p>Aquí las skills</p>
    </div>`;

    hideLoadingScreen();
    showSlide(currSlide);
    autoSlide();
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
    }, 5000);
}

loadChampDetails();
