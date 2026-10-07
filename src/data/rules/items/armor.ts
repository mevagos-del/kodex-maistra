import { SRD_52_SOURCE } from '../source';
import type { OfficialItemEntry } from '../types';

type ArmorSeed = [string,string,string,'легкі'|'середні'|'важкі'|'щит',string,string,string,string?,boolean?];
const seeds: ArmorSeed[] = [
 ['padded-armor','Стеганий обладунок','Padded Armor','легкі','11 + модифікатор Спритності','8 фунтів','5 зм',undefined,true],
 ['leather-armor','Шкіряний обладунок','Leather Armor','легкі','11 + модифікатор Спритності','10 фунтів','10 зм'],
 ['studded-leather-armor','Шипований шкіряний обладунок','Studded Leather Armor','легкі','12 + модифікатор Спритності','13 фунтів','45 зм'],
 ['hide-armor','Шкуряний обладунок','Hide Armor','середні','12 + модифікатор Спритності (макс. 2)','12 фунтів','10 зм'],
 ['chain-shirt','Кольчужна сорочка','Chain Shirt','середні','13 + модифікатор Спритності (макс. 2)','20 фунтів','50 зм'],
 ['scale-mail','Лускатий обладунок','Scale Mail','середні','14 + модифікатор Спритності (макс. 2)','45 фунтів','50 зм',undefined,true],
 ['breastplate','Кіраса','Breastplate','середні','14 + модифікатор Спритності (макс. 2)','20 фунтів','400 зм'],
 ['half-plate-armor','Напівлати','Half Plate Armor','середні','15 + модифікатор Спритності (макс. 2)','40 фунтів','750 зм',undefined,true],
 ['ring-mail','Кільчастий обладунок','Ring Mail','важкі','14','40 фунтів','30 зм',undefined,true],
 ['chain-mail','Кольчуга','Chain Mail','важкі','16','55 фунтів','75 зм','13',true],
 ['splint-armor','Ламелярний обладунок','Splint Armor','важкі','17','60 фунтів','200 зм','15',true],
 ['plate-armor','Латний обладунок','Plate Armor','важкі','18','65 фунтів','1 500 зм','15',true],
 ['shield','Щит','Shield','щит','+2','6 фунтів','10 зм'],
];

export const armor: OfficialItemEntry[] = seeds.map(([slug,nameUk,nameOriginal,armorCategory,armorClass,weight,cost,strengthRequirement,stealthDisadvantage]) => ({
 entity:'item',slug,nameUk,nameOriginal,status:'official',source:SRD_52_SOURCE,itemType:armorCategory === 'щит' ? 'щит' : 'обладунок',
 category:'Обладунки',subcategory:armorCategory,rarity:'звичайний',magical:false,attunement:false,weight,cost,properties:[],armorCategory,
 armorClass,dexterityModifier:armorClass.includes('Спритності') ? (armorClass.includes('макс. 2') ? 'модифікатор Спритності, максимум +2' : 'повний модифікатор Спритності') : undefined,
 strengthRequirement,stealthDisadvantage,shield:armorCategory === 'щит',shieldBonus:armorCategory === 'щит' ? '+2' : undefined,
}));
