import { SRD_52_SOURCE } from '../source';
import type { OfficialItemEntry } from '../types';

export const magicItems: OfficialItemEntry[] = [
  {
    entity:'item',slug:'potion-of-healing',nameUk:'Зілля лікування',nameOriginal:'Potion of Healing',status:'official',source:SRD_52_SOURCE,
    itemType:'зілля',category:'Магічні предмети',subcategory:'зілля',rarity:'звичайний',magical:true,attunement:false,weight:'1/2 фунта',cost:'50 зм',consumable:true,
    properties:[{id:'potion-of-healing-effect',nameUk:'Лікування',sourceText:'Бонусною дією випий зілля або дай його іншій істоті в межах 5 футів. Істота відновлює 2к4 + 2 хіти.',scanLine:{Ефект:'2к4 + 2 хіти'}}],
    usage:{activation:'бонусна дія',range:'5 футів'},
  },
  {
    entity:'item',slug:'spell-scroll-cantrip',nameUk:'Сувій закляття (замовляння)',nameOriginal:'Spell Scroll (Cantrip)',status:'official',source:SRD_52_SOURCE,
    itemType:'сувій',category:'Магічні предмети',subcategory:'сувої',rarity:'звичайний',magical:true,attunement:false,weight:'—',cost:'30 зм',consumable:true,
    properties:[{id:'spell-scroll-cantrip-rule',nameUk:'Закляття на сувої',sourceText:'Якщо закляття є у списку заклять твого класу, можеш прочитати сувій і накласти замовляння зі звичайним часом накладання без матеріальних компонентів. СК ряткидка закляття дорівнює 13, бонус атаки закляттям — +5. Після завершення накладання сувій розсипається.',scanLine:{СК:'13',Атака:'+5'}}],
  },
  {
    entity:'item',slug:'spell-scroll-level-1',nameUk:'Сувій закляття (1 рівень)',nameOriginal:'Spell Scroll (Level 1)',status:'official',source:SRD_52_SOURCE,
    itemType:'сувій',category:'Магічні предмети',subcategory:'сувої',rarity:'звичайний',magical:true,attunement:false,weight:'—',cost:'50 зм',consumable:true,
    properties:[{id:'spell-scroll-level-1-rule',nameUk:'Закляття на сувої',sourceText:'Якщо закляття є у списку заклять твого класу, можеш прочитати сувій і накласти закляття 1 рівня зі звичайним часом накладання без матеріальних компонентів. СК ряткидка закляття дорівнює 13, бонус атаки закляттям — +5. Після завершення накладання сувій розсипається.',scanLine:{СК:'13',Атака:'+5'}}],
  },
];
