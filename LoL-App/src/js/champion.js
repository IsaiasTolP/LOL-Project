export default class Champion{
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.img = data.image.sprite;
        this.title = data.title;
        this.blurb = data.blurb;
        this.attack = data.info.attack !== 0 ? data.info.attack : "No disponible";
        this.defense = data.info.defense !== 0 ? data.info.defense : "No disponible";
        this.magic = data.info.magic; // Hay campeones sin magia asi que no lo tocamos
        this.difficulty = data.info.difficulty !== 0 ? data.info.difficulty : "No disponible";
    }
    
}