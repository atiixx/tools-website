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

  //TODO: change armor only once a day
  //TODO: make image directive to check for content (GPT)
  //TODO: Add additional armor stats
  //TODO: Save armor to local storage ?

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    let randomNumber: number = Math.floor(Math.random() * (300 - 0 + 1) + 0);
    this.fetchArmorSet(randomNumber);
  }

  fetchArmorSet(randomNumber: number) {
    this.http
      .get(`https://mhw-db.com/armor/sets/${randomNumber}`)
      .subscribe((data) => {
        const armor = data as ArmorData;
        if (
          armor.pieces.filter((armorPiece) => armorPiece.assets != null)
            .length == 0
        ) {
          let randomNumber: number = Math.floor(
            Math.random() * (300 - 0 + 1) + 0
          );
          this.fetchArmorSet(randomNumber);
        }
        armor.pieces.forEach((armorPiece) => {
          console.log(armorPiece);
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
        });

        this.sTodaysArmorset = armor.name;
      });
  }
}
