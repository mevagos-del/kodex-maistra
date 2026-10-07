import { SRD_52_SOURCE } from '../source';
import type { OfficialItemEntry } from '../types';

type GearSeed = [string,string,string,string,string,string?];
const seeds: GearSeed[] = [
 ['acid','Кислота','Acid','1 фунт','25 зм'],['alchemists-fire','Алхімічний вогонь','Alchemist’s Fire','1 фунт','50 зм'],
 ['ammunition','Боєприпаси','Ammunition','залежить від варіанта','залежить від варіанта'],['antitoxin','Антитоксин','Antitoxin','—','50 зм'],
 ['arcane-focus','Арканний фокус','Arcane Focus','залежить від варіанта','залежить від варіанта'],['backpack','Рюкзак','Backpack','5 фунтів','2 зм','30 фунтів у 1 кубічному футі'],
 ['ball-bearings','Кульки підшипника','Ball Bearings','2 фунти','1 зм'],['barrel','Бочка','Barrel','70 фунтів','2 зм','40 галонів рідини або 4 кубічні фути сухих речовин'],
 ['basket','Кошик','Basket','2 фунти','4 см','40 фунтів у 2 кубічних футах'],['bedroll','Спальник','Bedroll','7 фунтів','1 зм'],['bell','Дзвоник','Bell','—','1 зм'],
 ['blanket','Ковдра','Blanket','3 фунти','5 см'],['block-and-tackle','Таль','Block and Tackle','5 фунтів','1 зм'],['book','Книга','Book','5 фунтів','25 зм'],
 ['glass-bottle','Скляна пляшка','Bottle, Glass','2 фунти','2 зм','1,5 пінти'],['bucket','Відро','Bucket','2 фунти','5 мм','0,5 кубічного фута'],
 ['burglars-pack','Набір зломщика','Burglar’s Pack','42 фунти','16 зм'],['caltrops','Калтропи','Caltrops','2 фунти','1 зм'],['candle','Свічка','Candle','—','1 мм'],
 ['crossbow-bolt-case','Футляр для арбалетних болтів','Case, Crossbow Bolt','1 фунт','1 зм','20 болтів'],['map-scroll-case','Футляр для мапи або сувою','Case, Map or Scroll','1 фунт','1 зм','10 аркушів паперу або 5 аркушів пергаменту'],
 ['chain','Ланцюг','Chain','10 фунтів','5 зм'],['chest','Скриня','Chest','25 фунтів','5 зм','12 кубічних футів'],['climbers-kit','Набір скелелаза','Climber’s Kit','12 фунтів','25 зм'],
 ['fine-clothes','Вишуканий одяг','Clothes, Fine','6 фунтів','15 зм'],['travelers-clothes','Дорожній одяг','Clothes, Traveler’s','4 фунти','2 зм'],
 ['component-pouch','Сумка компонентів','Component Pouch','2 фунти','25 зм'],['costume','Костюм','Costume','4 фунти','5 зм'],['crowbar','Лом','Crowbar','5 фунтів','2 зм'],
 ['diplomats-pack','Набір дипломата','Diplomat’s Pack','39 фунтів','39 зм'],['druidic-focus','Друїдичний фокус','Druidic Focus','залежить від варіанта','залежить від варіанта'],
 ['dungeoneers-pack','Набір дослідника підземель','Dungeoneer’s Pack','55 фунтів','12 зм'],['entertainers-pack','Набір артиста','Entertainer’s Pack','58,5 фунта','40 зм'],
 ['explorers-pack','Набір мандрівника','Explorer’s Pack','55 фунтів','10 зм'],['flask','Фляга','Flask','1 фунт','2 мм','1 пінта'],
 ['grappling-hook','Кішка','Grappling Hook','4 фунти','2 зм'],['healers-kit','Набір цілителя','Healer’s Kit','3 фунти','5 зм'],
 ['holy-symbol','Святий символ','Holy Symbol','залежить від варіанта','залежить від варіанта'],['holy-water','Свята вода','Holy Water','1 фунт','25 зм'],
 ['hunting-trap','Мисливська пастка','Hunting Trap','25 фунтів','5 зм'],['ink','Чорнило','Ink','—','10 зм'],['ink-pen','Перо','Ink Pen','—','2 мм'],
 ['jug','Глечик','Jug','4 фунти','2 мм','1 галон'],['ladder','Драбина','Ladder','25 фунтів','1 см'],['lamp','Лампа','Lamp','1 фунт','5 см'],
 ['bullseye-lantern','Спрямований ліхтар','Lantern, Bullseye','2 фунти','10 зм'],['hooded-lantern','Закритий ліхтар','Lantern, Hooded','2 фунти','5 зм'],
 ['lock','Замок','Lock','1 фунт','10 зм'],['magnifying-glass','Збільшувальне скло','Magnifying Glass','—','100 зм'],['manacles','Кайдани','Manacles','6 фунтів','2 зм'],
 ['map','Мапа','Map','—','1 зм'],['mirror','Дзеркало','Mirror','1/2 фунта','5 зм'],['net','Сітка','Net','3 фунти','1 зм'],['oil','Олія','Oil','1 фунт','1 см'],
 ['paper','Папір','Paper','—','2 см'],['parchment','Пергамент','Parchment','—','1 см'],['perfume','Парфуми','Perfume','—','5 зм'],
 ['basic-poison','Проста отрута','Poison, Basic','—','100 зм'],['pole','Жердина','Pole','7 фунтів','5 мм'],['iron-pot','Залізний казанок','Pot, Iron','10 фунтів','2 зм','1 галон'],
 ['pouch','Мішечок','Pouch','1 фунт','5 см','6 фунтів у 0,2 кубічного фута'],['priests-pack','Набір священника','Priest’s Pack','29 фунтів','33 зм'],
 ['quiver','Сагайдак','Quiver','1 фунт','1 зм','20 стріл'],['portable-ram','Переносний таран','Ram, Portable','35 фунтів','4 зм'],['rations','Пайок','Rations','2 фунти','5 см'],
 ['robe','Мантія','Robe','4 фунти','1 зм'],['rope','Мотузка','Rope','5 фунтів','1 зм'],['sack','Мішок','Sack','1/2 фунта','1 мм','30 фунтів у 1 кубічному футі'],
 ['scholars-pack','Набір ученого','Scholar’s Pack','22 фунти','40 зм'],['shovel','Лопата','Shovel','5 фунтів','2 зм'],['signal-whistle','Сигнальний свисток','Signal Whistle','—','5 мм'],
 ['iron-spikes','Залізні кілки','Spikes, Iron','5 фунтів','1 зм'],['spyglass','Підзорна труба','Spyglass','1 фунт','1 000 зм'],['string','Мотузка тонка','String','—','1 см'],
 ['tent','Намет','Tent','20 фунтів','2 зм'],['tinderbox','Кресало','Tinderbox','1 фунт','5 см'],['torch','Смолоскип','Torch','1 фунт','1 мм'],
 ['vial','Пляшечка','Vial','—','1 зм','4 унції'],['waterskin','Бурдюк','Waterskin','5 фунтів (повний)','2 см','4 пінти'],
];

export const adventuringGear: OfficialItemEntry[] = seeds.map(([slug,nameUk,nameOriginal,weight,cost,capacity]) => ({
 entity:'item',slug,nameUk,nameOriginal,status:'official',source:SRD_52_SOURCE,itemType:'спорядження',category:'Пригодницьке спорядження',
 subcategory:/pack$/.test(slug)?'набори':/ammunition|quiver|bolt/.test(slug)?'боєприпаси':/lantern|lamp|candle|torch|tinderbox/.test(slug)?'світло':'інше спорядження',
 rarity:'звичайний',magical:false,attunement:false,weight,cost,capacity,properties:[],consumable:/acid|fire|antitoxin|water|oil|poison|rations|perfume/.test(slug),
}));
