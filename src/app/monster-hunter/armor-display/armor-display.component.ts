import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';

interface ArmorData {
  id: number;
  bonus: any;
  rank: string;
  name: string;
  pieces: ArmorPiecesData[];
}

interface ArmorPiecesData {
  armorSet: number;
  assets: { imageFemale: string; imageMale: string };
  attibutes: any;
  crafting: any;
  defense: {
    base: number;
    max: number;
    augmented: number;
  };
  id: number;
  name: string;
  rank: string;
  rarity: number;
  type: string;
  resistances: {
    fire: number;
    water: number;
    ice: number;
    thunder: number;
    dragon: number;
  };
  skills: {
    id: number;
    level: number;
    modifiers: any;
    skill: number;
    description: string;
    skillName: string;
  }[];
  slots: any[];
}

@Component({
  selector: 'app-armor-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './armor-display.component.html',
  styleUrl: './armor-display.component.scss',
})
export class ArmorDisplayComponent {
  sTodaysArmorset: string = '';
  mHead: string = '';
  mBody: string = '';
  mLegs: string = '';
  mFeet: string = '';
  mArms: string = '';
  fHead: string = '';
  fBody: string = '';
  fLegs: string = '';
  fFeet: string = '';
  fArms: string = '';
  sRank: string = '';
  aSkills: string[] = [];
  aResistances: string[] = [];
  defense: number = 0;

  //TODO: change armor only once a day
  //TODO: Add additional armor stats
  //TODO: Save armor to local storage ?

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.callFetchArmorSetOnceADay();
  }
  callFetchArmorSetOnceADay() {
    const nextMidnightStr = localStorage.getItem('nextFetchArmorSetCall');
    const nextMidnight = nextMidnightStr
      ? new Date(nextMidnightStr)
      : this.calculateNextMidnight();
    const now = new Date();

    if (now >= nextMidnight) {
      let randomNumber: number = this.getRandomNumber();
      try {
        this.fetchArmorSet(randomNumber);
        const newNextMidnight = this.calculateNextMidnight();
        localStorage.setItem(
          'nextFetchArmorSetCall',
          newNextMidnight.toISOString()
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  private calculateNextMidnight(): Date {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setDate(now.getDate() + 1);
    nextMidnight.setHours(0, 0, 0, 0);
    localStorage.setItem('nextFetchArmorSetCall', nextMidnight.toISOString());
    return nextMidnight;
  }

  fetchArmorSet(randomNumber: number) {
    this.http
      .get(`https://mhw-db.com/armor/sets/${randomNumber}`)
      .subscribe((data) => {
        const armor = data as ArmorData;
        const hasAssets =
          armor.pieces.filter((armorPiece) => armorPiece.assets != null)
            .length > 0;
        if (!hasAssets) {
          let randomNumber: number = this.getRandomNumber();
          this.fetchArmorSet(randomNumber);
          return;
        }
        this.setAssetURLs(armor);
        this.calculateSkills(armor);
        this.calculateResistances(armor);
        this.calculateDefense(armor);
        this.getRank(armor);
        this.sTodaysArmorset = armor.name;
      });
  }
  getRandomNumber(): number {
    return Math.floor(Math.random() * (1676 - 0 + 1) + 0);
  }
  getRank(armor: ArmorData) {
    if (armor.rank == 'master') {
      this.sRank = 'MR';
    }
    if (armor.rank == 'high') {
      this.sRank = 'HR';
    }
    if (armor.rank == 'low') {
      this.sRank = 'LR';
    }
  }

  calculateDefense(armor: ArmorData) {
    let defense: number = 0;
    for (let armorPiece of armor.pieces) {
      if (armorPiece.defense) {
        defense = defense + armorPiece.defense.base;
      }
    }
    this.defense = defense;
  }
  calculateResistances(armor: ArmorData) {
    let dragonRes: number = 0;
    let fireRes: number = 0;
    let iceRes: number = 0;
    let thunderRes: number = 0;
    let waterRes: number = 0;

    for (let armorPiece of armor.pieces) {
      if (armorPiece.resistances) {
        dragonRes = dragonRes + armorPiece.resistances.dragon;
        fireRes = fireRes + armorPiece.resistances.fire;
        iceRes = iceRes + armorPiece.resistances.ice;
        thunderRes = thunderRes + armorPiece.resistances.thunder;
        waterRes = waterRes + armorPiece.resistances.water;
      }
    }

    this.aResistances.push('Dragon: ' + dragonRes);
    this.aResistances.push('Fire: ' + fireRes);
    this.aResistances.push('Ice: ' + iceRes);
    this.aResistances.push('Thunder: ' + thunderRes);
    this.aResistances.push('Water: ' + waterRes);
  }
  calculateSkills(armor: ArmorData) {
    let skills: Map<string, number> = new Map();
    for (let armorPiece of armor.pieces) {
      for (let skill of armorPiece.skills) {
        skills.set(skill.skillName, skill.level);
      }
    }
    console.log(skills.entries());
    skills.forEach((value, key) => {
      this.aSkills.push(key + ': ' + value);
    });
  }
  setAssetURLs(armor: ArmorData) {
    for (let armorPiece of armor.pieces) {
      if (armorPiece.assets == null) {
        continue;
      }
      if (armorPiece.type === 'head') {
        this.mHead = armorPiece.assets.imageMale
          ? armorPiece.assets.imageMale
          : '';
        this.fHead = armorPiece.assets.imageFemale
          ? armorPiece.assets.imageFemale
          : '';
      } else if (armorPiece.type === 'chest') {
        this.mBody = armorPiece.assets.imageMale
          ? armorPiece.assets.imageMale
          : '';
        this.fBody = armorPiece.assets.imageFemale
          ? armorPiece.assets.imageFemale
          : '';
      } else if (armorPiece.type === 'waist') {
        this.mLegs = armorPiece.assets.imageMale
          ? armorPiece.assets.imageMale
          : '';
        this.fLegs = armorPiece.assets.imageFemale
          ? armorPiece.assets.imageFemale
          : '';
      } else if (armorPiece.type === 'legs') {
        this.mFeet = armorPiece.assets.imageMale
          ? armorPiece.assets.imageMale
          : '';
        this.fFeet = armorPiece.assets.imageFemale
          ? armorPiece.assets.imageFemale
          : '';
      } else if (armorPiece.type === 'gloves') {
        this.mArms = armorPiece.assets.imageMale
          ? armorPiece.assets.imageMale
          : '';
        this.fArms = armorPiece.assets.imageFemale
          ? armorPiece.assets.imageFemale
          : '';
      }
    }
  }

  onImageChecked(hasPixels: boolean) {
    if (hasPixels) {
      console.log('Image has pixels');
    } else {
      console.log('Image is empty');
    }
  }
}
