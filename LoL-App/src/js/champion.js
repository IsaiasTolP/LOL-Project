export default class Champion{
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.img = data.image.sprite;
        this.title = data.title;
        this.blurb = data.blurb;
        this.attack = data.info.attack;
    }
    
}