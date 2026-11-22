import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root=process.cwd(), base=process.env.AUDIT_ORIGIN||'http://localhost:4350';
const target=path.resolve(process.argv[2]||'output/qa/multilingual_V1.0');
const screenshotScope=process.env.SCREENSHOT_SCOPE||'all';
if(!['all','key','none'].includes(screenshotScope))throw new Error(`Invalid SCREENSHOT_SCOPE: ${screenshotScope}`);
if(existsSync(target))throw new Error(`Choose a new version; directory exists: ${target}`);
mkdirSync(target,{recursive:true});
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const routes=[];
for(const locale of ['zh','en','zh-Hant'])for(const file of walk(path.join(root,'dist',locale)).filter(f=>f.endsWith('.html'))){
 const source=readFileSync(file,'utf8');if(/http-equiv="refresh"/i.test(source))continue;
 routes.push('/'+path.relative(path.join(root,'dist'),file).replace(/index\.html$/,'').split(path.sep).join('/'));
}
const browser=await chromium.launch({channel:'chrome',headless:true});
const all=[];let completed=0;
const keyRoute=route=>/^\/(zh|en|zh-Hant)\/(?:$|product\/.+|solutions\/.+|pricing\/|contact\/|resources\/|releases\/)/.test(route)&&!route.includes('submitted');
const tasks=routes.flatMap(route=>(keyRoute(route)?[1440,768,390,320]:[1440,390]).map(width=>({route,width})));
const worker=async()=>{
 const context=await browser.newContext({reducedMotion:'reduce',deviceScaleFactor:1});
 const page=await context.newPage();
 for(;;){const task=tasks.shift();if(!task)break;const {route,width}=task;
  const errors=[],badRequests=[]; const onError=e=>errors.push(e.message);const onConsole=m=>{if(m.type()==='error'&&!(route.endsWith('/404/')&&m.text()==='Failed to load resource: the server responded with a status of 404 (Not Found)'))errors.push(m.text());};
  const onResponse=r=>{if(r.status()>=400&&r.url().startsWith(base)&&!(route.endsWith('/404/')&&r.url()===base+route&&r.status()===404))badRequests.push({url:r.url(),status:r.status()});};
  page.on('pageerror',onError);page.on('console',onConsole);page.on('response',onResponse);
  let result;
  try{
   await page.setViewportSize({width,height:900});const response=await page.goto(base+route,{waitUntil:'load',timeout:30000});
   await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img[src]').forEach(i=>i.loading='eager');await Promise.all([...document.images].filter(i=>i.getAttribute('src')).map(i=>i.decode().catch(()=>{})));});
   result=await page.evaluate(()=>{
    const visible=n=>{const s=getComputedStyle(n),r=n.getBoundingClientRect();return s.visibility!=='hidden'&&s.display!=='none'&&r.width>1&&r.height>1&&n.getClientRects().length>0;};
    const images=[...document.images].filter(i=>i.getAttribute('src')).map(i=>({src:i.getAttribute('src'),currentSrc:i.currentSrc,loaded:i.complete&&i.naturalWidth>0}));
    const overflow=[];const walker=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){
     const n=walker.currentNode,p=n.parentElement;if(!p||!n.textContent.trim()||p.closest('svg,pre,code,[aria-hidden="true"]')||!visible(p))continue;
     const range=document.createRange();range.selectNodeContents(n);
     for(const r of range.getClientRects()){
      if(r.width<1||r.height<1||r.left>=-1&&r.right<=innerWidth+1)continue;
      let scroll=false;for(let a=p;a&&a.tagName!=='MAIN';a=a.parentElement){if(['auto','scroll'].includes(getComputedStyle(a).overflowX)&&a.scrollWidth>a.clientWidth){scroll=true;break;}}
      if(!scroll)overflow.push({text:n.textContent.trim().slice(0,100),tag:p.tagName,class:p.className,left:Math.round(r.left),right:Math.round(r.right)});
     }
    }
    const main=document.querySelector('main');const cjk=[];
    if(document.documentElement.lang==='en'){
     const w=document.createTreeWalker(main,NodeFilter.SHOW_TEXT);while(w.nextNode()){const n=w.currentNode;if(!n.parentElement.closest('script,style,pre,code')&&/\p{Script=Han}/u.test(n.textContent.replaceAll('扎马AI','')))cjk.push(n.textContent.trim().slice(0,100));}
    }
    return {lang:document.documentElement.lang,title:document.title,h1:main.querySelector('h1')?.textContent.trim(),documentWidth:document.documentElement.scrollWidth,viewport:innerWidth,images,overflow:[...new Map(overflow.map(x=>[x.text,x])).values()],cjk};
   });
   result.status=response.status();
   result.expectedStatus=route.endsWith('/404/')?404:200;
   if((width===1440||width===390)&&(screenshotScope==='all'||screenshotScope==='key'&&keyRoute(route))){const name=route.slice(1).replaceAll('/','_')||'root';const file=`${name}-${width}_V1.0.png`;await page.screenshot({path:path.join(target,file),fullPage:true,animations:'disabled'});result.screenshot=file;}
  }catch(error){result={error:error.message};}
  all.push({route,width,...result,errors:[...new Set(errors)],badRequests});
  page.off('pageerror',onError);page.off('console',onConsole);page.off('response',onResponse);
  completed++;if(completed%30===0)console.log(`Checked ${completed} views`);
 }
 await context.close();
};
await Promise.all([worker(),worker(),worker()]);await browser.close();
const issues=all.filter(r=>r.error||r.status!==r.expectedStatus||r.documentWidth>r.width+1||r.overflow?.length||r.cjk?.length||r.errors.length||r.badRequests.length||r.images?.some(i=>!i.loaded));
const summary={origin:base,routes:routes.length,views:all.length,issues:issues.length,results:all,findings:issues};
writeFileSync(path.join(target,'browser-audit_V1.0.json'),JSON.stringify(summary,null,2),{flag:'wx'});
console.log(JSON.stringify({target,routes:routes.length,views:all.length,issues:issues.length,findings:issues.map(({route,width,error,status,documentWidth,overflow,cjk,errors,badRequests,images})=>({route,width,error,status,documentWidth,overflow,cjk,errors,badRequests,broken:images?.filter(i=>!i.loaded)}))},null,2));
process.exitCode=issues.length?1:0;
