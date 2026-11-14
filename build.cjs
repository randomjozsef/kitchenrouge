'use strict';
// Keep the delivered HTML usable even when opened without sibling script files.
const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'public'),page=path.join(root,'index.html');
let html=fs.readFileSync(page,'utf8');
for(const name of ['coop','game']){
 const source=fs.readFileSync(path.join(root,name+'.js'),'utf8');
 if(/<\/script/i.test(source))throw Error('Unexpected script closing tag in '+name);
 const tag='<script id="'+name+'-bundle">\n'+source+'\n</script>';
 const re=new RegExp('<script(?: src="'+name+'\\.js"| id="'+name+'-bundle")[^>]*>[\\s\\S]*?<\\/script>');
 if(!re.test(html))throw Error('Missing script slot: '+name);
 html=html.replace(re,()=>tag);
}
fs.writeFileSync(page,html);
console.log('Built self-contained public/index.html');
