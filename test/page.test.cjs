'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
test('Delivered HTML starts without sibling scripts or ResizeObserver and wires every main menu action',()=>{
 const html=fs.readFileSync(path.join(__dirname,'../public/index.html'),'utf8');
 assert(!/<script[^>]+src=/.test(html),'No external game scripts needed');
 const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,'IDs are unique');
 const noop=()=>{},ctx=new Proxy({},{get:()=>noop,set:()=>true});
 function element(){return{dataset:{},hidden:false,value:'',textContent:'',children:[],clientWidth:700,clientHeight:420,getContext:()=>ctx,addEventListener:noop,setAttribute:noop,focus:noop,append(...v){this.children.push(...v)},replaceChildren(){this.children=[]},click(){assert.equal(typeof this.onclick,'function');this.onclick()}};}
 const els=Object.fromEntries(ids.map(id=>[id,element()]));
 const box={console,document:{getElementById:id=>els[id]||null,createElement:element,documentElement:{},addEventListener:noop},window:{addEventListener:noop},localStorage:{getItem(){throw Error('Storage blocked')},setItem(){throw Error('Storage blocked')}},requestAnimationFrame:noop,devicePixelRatio:1,performance:{now:()=>0},getComputedStyle:()=>({getPropertyValue:()=> '#009de0'})};
 vm.createContext(box);for(const m of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))vm.runInContext(m[1],box);
 assert.equal(els['startup-status'].hidden,true);
 for(const [button,view] of [['menu-help','help'],['menu-settings','settings'],['menu-host','characters'],['menu-join','characters']]){els[button].click();assert.equal(els['view-'+view].hidden,false);els['menu-back'].click();assert.equal(els['menu-home'].hidden,false)}
 els['menu-solo'].click();for(let id of ['frost','hop','ember','rook']){els['choose-'+id].click();assert.equal(els['char-name'].textContent,id[0].toUpperCase()+id.slice(1))}els['char-confirm'].click();assert.equal(els['menu-screen'].hidden,true);assert.equal(els['play-screen'].hidden,false);els.choices.children.at(-1).click();assert.equal(els.panel.hidden,true);
});
