export default class Champion{
    constructor(data){
        this.name = data.name;
        this.img = data.image.full;
        this.title = data.title;
        this.blurb = data.blurb;
        this.attack = data.info.attack;
    }
    
}