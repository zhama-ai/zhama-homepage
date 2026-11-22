import {existsSync,mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import path from 'node:path';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const target=path.resolve(process.argv[2]||'output/qa/multilingual-interactions_V1.0');
if(existsSync(target))throw Error(`Choose a new version: ${target}`);mkdirSync(target,{recursive:true});
const base=process.env.AUDIT_ORIGIN||'http://localhost:4350';
const browser=await chromium.launch({channel:'chrome',headless:true});const records=[];
const check=(condition,label,detail)=>{records.push({label,passed:Boolean(condition),detail});};
for(const locale of ['zh','en','zh-Hant'])for(const width of [1440,390]){
 const prefix=`${locale}/${width}`;
 const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let posts=0;await page.route('**/api/contact',route=>{posts++;return route.fulfill({status:400,contentType:'application/json',body:'{"success":false,"message":"Validation rejected"}'});});
 try{
 await page.goto(`${base}/${locale}/#solutions`,{waitUntil:'load'});
 await page.locator('.language-link').click();
 for(const to of ['zh','en','zh-Hant']){
  const link=page.locator(`[data-language-option][href^="/${to}/"]`);check((await link.getAttribute('href'))===`/${to}/#solutions`,`${prefix}: language switch keeps current anchor`,to);
 }
 await page.keyboard.press('Escape');
 if(width===390){await page.locator('.menu-toggle').click();check(await page.locator('#mobile-nav').evaluate(e=>!e.inert&&e.classList.contains('is-open')),`${prefix}: mobile navigation opens`);await page.keyboard.press('Escape');check(await page.locator('#mobile-nav').evaluate(e=>e.inert),`${prefix}: mobile navigation closes`);}
 await page.goto(`${base}/${locale}/download/`);
 for(const tab of await page.locator('[data-download-filter]').all()){
  const filter=await tab.getAttribute('data-download-filter');await tab.click();check(await tab.getAttribute('aria-selected')==='true',`${prefix}: download product selected`,filter);
  const visible=await page.locator('[data-download-product]:visible').evaluateAll(es=>es.map(e=>e.getAttribute('data-download-product')));check(visible.length>0&&(filter==='all'||visible.every(x=>x===filter)),`${prefix}: download filter results`,{filter,visible});
 }
 await page.goto(`${base}/${locale}/faq/`);await page.locator('[data-faq-query]').fill('qzzntx907');check(await page.locator('[data-faq-empty]').isVisible(),`${prefix}: localized FAQ empty state`);await page.locator('[data-faq-reset]').click();check(await page.locator('[data-faq-item]:visible').count()>0,`${prefix}: FAQ reset restores questions`);
 const first=page.locator('[data-faq-item]').first();await first.locator('summary').click();check(await first.getAttribute('open')!==null,`${prefix}: FAQ answer opens`);
 await page.goto(`${base}/${locale}/releases/?version=2.8.0`);
 await page.waitForFunction(()=>document.querySelector('#release-items')?.getAttribute('aria-busy')==='false');
 const versions=await page.locator('#release-version option').evaluateAll(es=>es.map(e=>e.value));
 for(const version of [...new Set([versions[0],versions.at(-1)])]){
  await page.locator('#release-version').selectOption(version);await page.waitForFunction(()=>document.querySelector('#release-items')?.getAttribute('aria-busy')==='false');
  check(await page.locator('#release-items a[href]').count()>0,`${prefix}: release manifest renders downloads`,version);
  await page.locator('.language-link').click();const links=await page.locator('[data-language-option]').evaluateAll(es=>es.map(e=>e.getAttribute('href')));check(links.every(x=>new URL(x,base).searchParams.get('version')===version),`${prefix}: release language switch keeps version`,links);await page.keyboard.press('Escape');
 }
 await page.goto(`${base}/${locale}/contact/`);await page.locator('#enquiry-reply-trigger').click();check(await page.locator('#enquiry-calendar').isVisible(),`${prefix}: contact calendar opens`);
 const month=await page.locator('#enquiry-calendar-month').textContent().catch(()=>null);await page.locator('.reply-month-next').click();check(await page.locator('#enquiry-calendar').isVisible(),`${prefix}: contact calendar next month`,month);await page.locator('.reply-calendar-done').click();
 await page.locator('button[type="submit"]').click();check(posts===0,`${prefix}: invalid form stays local without a submission`);
 const unknown=await page.goto(`${base}/${locale}/route-not-present/`);check(unknown.status()===404,`${prefix}: missing page status`);check(await page.locator('html').getAttribute('lang')===(locale==='zh'?'zh-CN':locale),`${prefix}: missing page language`);
 check(errors.length===0,`${prefix}: interactive runtime errors`,errors);
 }catch(e){check(false,`${prefix}: interaction run`,e.message);}
 await context.close();
}
// Every release manifest is part of the public local graph; inspect all, without downloading installers.
const index=JSON.parse(readFileSync('public/releases/index.json','utf8'));
for(const file of index.files){const response=await fetch(base+'/releases/'+file.path.replace(/^\/?releases\//,''));let value;try{value=await response.json();}catch{}
 check(response.ok&&value&&typeof value==='object','Release manifest available',file.path);
}
await browser.close();const failures=records.filter(r=>!r.passed);writeFileSync(path.join(target,'interaction-audit_V1.0.json'),JSON.stringify({checks:records.length,failures,records},null,2),{flag:'wx'});console.log(JSON.stringify({target,checks:records.length,failures},null,2));process.exitCode=failures.length?1:0;
