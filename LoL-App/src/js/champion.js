export default class Champion {
    constructor(data){
        this.id = data.id;
        this.skinsData = data.skins;
        this.spellsData = data.spells;
        this.passiveData = data.passive;
        this.name = data.name;
        this.title = data.title;
        this.lore = data.lore;
        this.roles = data.tags;
        this.difficulty = data.info.difficulty !== 0 ? data.info.difficulty : "No disponible";
        this.baseHp = data.stats.hp;
        this.lvl18Hp = this.baseHp + (data.stats.hpperlevel * 17);
        this.baseMp = data.stats.mp;
        this.lvl18Mp = this.baseMp + (data.stats.mpperlevel * 17);
        this.baseAttack = data.stats.attackdamage;
        this.lvl18Attack = this.baseAttack + (data.stats.attackdamageperlevel * 17);
        this.baseAtkSpeed = data.stats.attackspeed;
        this.lvl18AtkSpeed = Math.round((this.baseAtkSpeed * (data.stats.attackspeedperlevel * 17 / 100) + this.baseAtkSpeed) * 1000) / 1000;
        this.atkRange = data.stats.attackrange;
        this.allyTips = data.allytips;
        this.enemyTips = data.enemytips;
    }
    
}