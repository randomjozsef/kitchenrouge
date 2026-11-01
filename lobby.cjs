'use strict';
const { randomInt } = require('node:crypto');
function createLobby({maxRooms=200,now=Date.now}={}) {
  const rooms=new Map(),members=new Map();const character=id=>['rook','frost','hop','ember'].includes(id)?id:'rook';
  const send=(socket,msg)=>{if(socket?.readyState===1&&socket.bufferedAmount<512*1024)socket.send(JSON.stringify(msg));};
  function leave(socket){const m=members.get(socket);if(!m)return;const r=rooms.get(m.code);members.delete(socket);if(!r)return;for(const peer of [r.host,r.guest])if(peer&&peer!==socket){members.delete(peer);send(peer,{type:'peer-left'});}rooms.delete(m.code);}
  function attach(socket){let windowStart=now(),count=0;socket.on('message',raw=>{try{if(now()-windowStart>1000){windowStart=now();count=0;}if(++count>90){socket.close(1008,'Rate limit');return;}if(raw.length>262144){socket.close(1009,'Too large');return;}const msg=JSON.parse(String(raw));if(!msg||typeof msg!=='object')return;
    if(msg.type==='create'){if(members.has(socket))return;if(rooms.size>=maxRooms){send(socket,{type:'error',message:'Server full. Try later.'});return;}const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let code;do{code=Array.from({length:6},()=>alphabet[randomInt(alphabet.length)]).join('');}while(rooms.has(code));rooms.set(code,{host:socket,guest:null,characterId:character(msg.characterId)});members.set(socket,{code,role:'host'});send(socket,{type:'created',code,characterId:character(msg.characterId)});return;}
    if(msg.type==='join'){if(members.has(socket))return;const code=String(msg.code||'').toUpperCase(),r=rooms.get(code);if(!/^[A-Z2-9]{6}$/.test(code)||!r||r.guest){send(socket,{type:'error',message:'Room not found or already full.'});return;}r.guest=socket;members.set(socket,{code,role:'guest'});send(socket,{type:'joined',code,characterId:character(msg.characterId),hostCharacterId:r.characterId});send(r.host,{type:'peer-ready',characterId:character(msg.characterId)});return;}
    if(msg.type==='leave'){leave(socket);send(socket,{type:'left'});return;}
    const m=members.get(socket);if(!m)return;const r=rooms.get(m.code);if(!r)return;
    if(msg.type==='input'&&m.role==='guest'){const allowed=['w','a','s','d','arrowup','arrowright','arrowdown','arrowleft'];const keys=Array.isArray(msg.keys)?[...new Set(msg.keys.filter(k=>allowed.includes(k)))].slice(0,8):[];send(r.host,{type:'input',keys,aim:Number.isInteger(msg.aim)&&msg.aim>=0&&msg.aim<=3?msg.aim:2});}
    if(msg.type==='snapshot'&&m.role==='host'&&msg.state&&typeof msg.state==='object')send(r.guest,{type:'snapshot',state:msg.state});
    if(msg.type==='ability-request'&&m.role==='guest')send(r.host,{type:'ability-request'});
    if(msg.type==='pause-request'&&m.role==='guest')send(r.host,{type:'pause-request'});
  }catch(_){send(socket,{type:'error',message:'Invalid message.'});}});socket.on('close',()=>leave(socket));socket.on('error',()=>leave(socket));}
  return {attach,rooms,members,leave};
}
module.exports={createLobby};
