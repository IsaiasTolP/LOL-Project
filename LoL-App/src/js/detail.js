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
}

async function getChampImages(champ) {
    let imageIdx = 0;
    let imagesUrls = [];
    while (true) {
        let imgUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_${imageIdx}.jpg`;
        try {
            let response = await fetch(imgUrl);
            if (response.ok) {
                imagesUrls.push(imgUrl);
                imageIdx++;
            }
            else {
                break;
            }
        }
        catch (error){
            console.log("Error", error);
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
    <div id="carousel"><span id="champName">${champ.name}</span><br><span id="champTitle">${champ.title}</span></div>`;
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
