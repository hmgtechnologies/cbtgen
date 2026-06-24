const $=id=>document.getElementById(id);
const logEl=$('log'), bar=$('bar');
function log(msg){logEl.textContent += `\n${msg}`; logEl.scrollTop=logEl.scrollHeight;}
function setProgress(n){bar.style.width=Math.max(0,Math.min(100,n))+'%';}
function cleanUrl(u){u=(u||'').trim(); if(!u)return ''; if(!/^https?:\/\//i.test(u))u='https://'+u; return u.endsWith('/')?u:u+'/';}
function phoneDigits(s){return String(s||'').replace(/\D/g,'')||'2348100866322';}
function slugify(s){return String(s||'client-cbt').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'client-cbt';}
function initials(s){return String(s||'CBT').split(/\s+/).map(x=>x[0]).join('').slice(0,3).toUpperCase()||'CBT';}
function escXml(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));}
function getData(){return{
  clientName:$('clientName').value.trim()||'Client School', platformName:$('platformName').value.trim()||'Client CBT Pro', shortName:$('shortName').value.trim()||'CBT', buildMode:$('buildMode').value, primaryColor:$('primaryColor').value||'#10b981', infoColor:$('infoColor').value||'#3b82f6', clientEmail:$('clientEmail').value.trim()||'info@example.com', clientPhone:$('clientPhone').value.trim()||'+234 810 086 6322', adminEmail:$('adminEmail').value.trim()||'admin@example.com', siteUrl:cleanUrl($('siteUrl').value), supabaseUrl:$('supabaseUrl').value.trim(), supabaseKey:$('supabaseKey').value.trim(), clientDescription:$('clientDescription').value.trim(), logoText:$('logoText').value.trim()||initials($('clientName').value)
};}
function logoSvg(d){return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${d.primaryColor}"/><stop offset="1" stop-color="${d.infoColor}"/></linearGradient></defs><rect width="512" height="512" rx="112" fill="#09090b"/><rect x="26" y="26" width="460" height="460" rx="92" fill="url(#g)" opacity=".18" stroke="${d.primaryColor}" stroke-width="10"/><circle cx="256" cy="222" r="104" fill="url(#g)"/><text x="256" y="252" text-anchor="middle" font-family="Arial, sans-serif" font-size="84" font-weight="900" fill="#fff">${escXml(d.logoText.slice(0,4).toUpperCase())}</text><text x="256" y="374" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="800" fill="#f4f4f5">CBT PRO</text></svg>`;}
function preview(){const d=getData(); $('previewName').textContent=d.platformName; $('previewDesc').textContent=d.clientDescription||'Secure CBT platform powered by HMG Concepts.'; $('logoPreview').innerHTML=logoSvg(d);}
$('previewBtn').onclick=preview; ['clientName','platformName','clientDescription','logoText','primaryColor','infoColor'].forEach(id=>$(id).addEventListener('input',preview)); preview();
function isTextFile(path){return /\.(html|css|js|json|md|txt|xml|sql|svg|webmanifest|yml|yaml|toml|mjs)$/i.test(path)||path==='_headers'||path==='.nojekyll'||path==='vercel.json';}
async function fetchTemplateFile(path){const res=await fetch('templates/base/'+path); if(!res.ok)throw new Error('Missing template file: '+path); return new Uint8Array(await res.arrayBuffer());}
function replaceText(text,d,path){const site=d.siteUrl||'https://example.com/'; const noSlash=site.replace(/\/$/,''); const digits=phoneDigits(d.clientPhone); const brand=d.platformName; const client=d.clientName;
  text=text
    .replace(/HMG Academy CBT Pro — Free Online Exam Platform/g, `${brand} — Online Exam Platform`)
    .replace(/HMG Academy CBT Pro/g, brand)
    .replace(/HMG Academy CBT/g, brand)
    .replace(/HMG CBT/g, d.shortName)
    .replace(/HMG Academy/g, client)
    .replace(/hmgacademyhub\.github\.io\/cbt-system/g, noSlash.replace(/^https?:\/\//,''))
    .replace(/https:\/\/hmgacademyhub\.github\.io\/cbt-system\/?/g, site)
    .replace(/https:\/\/cbtsystem-hmgacademy\.vercel\.app\/?/g, site)
    .replace(/hismarvellousgrace@gmail\.com/g, d.clientEmail)
    .replace(/buildingmyictcareer@gmail\.com/g, d.clientEmail)
    .replace(/\+234 810 086 6322/g, d.clientPhone)
    .replace(/\+234 907 790 7677/g, d.clientPhone)
    .replace(/2348100866322/g, digits)
    .replace(/2349077907677/g, digits)
    .replace(/#10b981/g, d.primaryColor)
    .replace(/#3b82f6/g, d.infoColor)
    .replace(/assets\/hmg-academy-logo\.png/g, 'assets/client-logo.svg')
    .replace(/hmg-academy-logo\.png/g, 'client-logo.svg');
  if(d.supabaseUrl) text=text.replace(/const SB_URL\s*=\s*'[^']*';/g, `const SB_URL='${d.supabaseUrl.replace(/'/g,'')}';`);
  if(d.supabaseKey) text=text.replace(/const SB_KEY\s*=\s*'[^']*';/g, `const SB_KEY='${d.supabaseKey.replace(/'/g,'')}';`);
  text=text.replace(/const ADMIN_EMAIL\s*=\s*'[^']*';/g, `const ADMIN_EMAIL = '${d.adminEmail.replace(/'/g,'')}';`);
  text=text.replace(/lower\('buildingmyictcareer@gmail\.com'\)/g, `lower('${d.adminEmail.replace(/'/g,'')}')`);
  if(path==='robots.txt') text=`User-agent: *\nAllow: /\nSitemap: ${site}sitemap.xml\n`;
  if(path==='sitemap.xml') text=text.replace(/https:\/\/[^<\s]+\/cbt-system\/?/g, site).replace(/https:\/\/[^<\s]+\/cbt-system\//g, site);
  return text;
}
function readManifest(){return fetch('templates/base/template-manifest.json').then(r=>r.json());}
function clientReadme(d){return `# ${d.platformName}\n\nGenerated by HMG CBT Platform Generator.\n\n## Client\n\n- Organisation: ${d.clientName}\n- Contact: ${d.clientEmail} · ${d.clientPhone}\n- Site URL: ${d.siteUrl||'Set after deployment'}\n- Powered by: HMG Concepts ecosystem\n\n## Architecture\n\nThis is a fullstack SaaS-style CBT platform:\n\n- Static frontend: HTML/CSS/JavaScript\n- Backend: Supabase Auth/Postgres/RLS/RPC\n- PWA: installable on Android, iOS, Windows, macOS and Chromebook\n- SEO: robots.txt, sitemap.xml, metadata and structured data\n- No paid AI API\n\n## Deployment\n\n1. Create a Supabase project.\n2. Run COMPLETE_SQL_SETUP.sql in Supabase SQL Editor.\n3. Deploy these files to Vercel, Cloudflare Pages, GitHub Pages or another static host.\n4. Open /deployment_validator.html.\n5. Create a teacher, create an exam, submit as student, verify results/certificate.\n\n## Security\n\nUse only the Supabase anon public key in frontend files. Never expose service_role keys.\n`;}
function buildScript(){return `import {cpSync, mkdirSync, rmSync, existsSync, readdirSync, statSync} from 'node:fs';\nimport {join} from 'node:path';\nconst out='dist'; if(existsSync(out))rmSync(out,{recursive:true,force:true}); mkdirSync(out,{recursive:true});\nconst skip=new Set(['package.json','scripts']);\nfor(const f of readdirSync('.')){ if(skip.has(f)||f.startsWith('.git'))continue; cpSync(f,join(out,f),{recursive:true}); }\nconsole.log('Built static CBT platform to dist/');\n`;}
function pkgJson(d){return JSON.stringify({name:slugify(d.platformName),version:'1.0.0',private:true,type:'module',scripts:{build:'node scripts/build.mjs',preview:'npx serve dist'},description:d.clientDescription||'Generated CBT platform',author:'Generated by HMG Concepts CBT Generator'},null,2);}
async function buildFiles(d){logEl.textContent='Loading template manifest...'; setProgress(2); const manifest=await readManifest(); const out={}; let i=0;
  for(const path of manifest){i++; if(path==='template-manifest.json')continue; const bytes=await fetchTemplateFile(path); let outPath=path; let outBytes=bytes;
    if(isTextFile(path)){let text=new TextDecoder().decode(bytes); text=replaceText(text,d,path); outBytes=new TextEncoder().encode(text);}
    out[outPath]=outBytes; if(i%5===0){log(`Processed ${i}/${manifest.length}: ${path}`); setProgress(5+(i/manifest.length)*70);} }
  out['assets/client-logo.svg']=new TextEncoder().encode(logoSvg(d));
  out['CLIENT_SETUP.md']=new TextEncoder().encode(clientReadme(d));
  out['BRANDING.json']=new TextEncoder().encode(JSON.stringify(d,null,2));
  if(d.buildMode==='modern'){
    out['package.json']=new TextEncoder().encode(pkgJson(d));
    out['scripts/build.mjs']=new TextEncoder().encode(buildScript());
    out['MODERN_BUILD_README.md']=new TextEncoder().encode(`# Modern build workflow\n\nRun:\n\n\`\`\`bash\nnpm run build\n\`\`\`\n\nDeploy the generated \`dist/\` folder to Vercel/Cloudflare/Netlify or any static host. No paid APIs required.\n`);
  }
  return out;
}
// CRC32 + ZIP store writer
const crcTable=(()=>{let c,t=[];for(let n=0;n<256;n++){c=n;for(let k=0;k<8;k++)c=(c&1)?(0xedb88320^(c>>>1)):(c>>>1);t[n]=c>>>0;}return t;})();
function crc32(buf){let c=0xffffffff;for(const b of buf)c=crcTable[(c^b)&255]^(c>>>8);return (c^0xffffffff)>>>0;}
function u16(n){return [n&255,(n>>>8)&255]} function u32(n){return [n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255]}
function dosTimeDate(date=new Date()){let time=(date.getHours()<<11)|(date.getMinutes()<<5)|Math.floor(date.getSeconds()/2);let day=((date.getFullYear()-1980)<<9)|((date.getMonth()+1)<<5)|date.getDate();return{time,day};}
function concat(parts){let len=parts.reduce((a,p)=>a+p.length,0), out=new Uint8Array(len), off=0; for(const p of parts){out.set(p,off);off+=p.length;} return out;}
function zipFiles(files){const locals=[], centrals=[]; let offset=0; const dt=dosTimeDate(); for(const [name,data] of Object.entries(files)){const fname=new TextEncoder().encode(name); const crc=crc32(data); const local=Uint8Array.from([...u32(0x04034b50),...u16(20),...u16(0),...u16(0),...u16(dt.time),...u16(dt.day),...u32(crc),...u32(data.length),...u32(data.length),...u16(fname.length),...u16(0),...fname,...data]); locals.push(local); const central=Uint8Array.from([...u32(0x02014b50),...u16(20),...u16(20),...u16(0),...u16(0),...u16(dt.time),...u16(dt.day),...u32(crc),...u32(data.length),...u32(data.length),...u16(fname.length),...u16(0),...u16(0),...u16(0),...u16(0),...u32(0),...u32(offset),...fname]); centrals.push(central); offset+=local.length;} const centralSize=centrals.reduce((a,c)=>a+c.length,0); const end=Uint8Array.from([...u32(0x06054b50),...u16(0),...u16(0),...u16(centrals.length),...u16(centrals.length),...u32(centralSize),...u32(offset),...u16(0)]); return concat([...locals,...centrals,end]);}
function downloadBlob(name,bytes,type='application/zip'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([bytes],{type}));a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
$('client-form').addEventListener('submit',async e=>{e.preventDefault(); const d=getData(); logEl.textContent='Starting generation...'; setProgress(0); try{const files=await buildFiles(d); log(`Adding ${Object.keys(files).length} files to ZIP...`); setProgress(85); const zip=zipFiles(files); const name=slugify(d.platformName)+'-'+d.buildMode+'-cbt-platform.zip'; downloadBlob(name,zip); setProgress(100); log(`✅ Generated ${name} (${Math.round(zip.length/1024)} KB).`); log('Next: extract ZIP, upload to GitHub, run COMPLETE_SQL_SETUP.sql in Supabase, deploy.');}catch(err){console.error(err); log('❌ '+err.message); setProgress(0);}});
