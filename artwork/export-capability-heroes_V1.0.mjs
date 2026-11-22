import { chromium } from '/Users/guoyongxu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
const root=fileURLToPath(new URL('../',import.meta.url));
const origin=process.env.CAPABILITY_PREVIEW_ORIGIN||'http://localhost:4350';
const slugs=['integrations','collaboration','knowledge','governance'];
const version=process.env.CAPABILITY_ART_VERSION||'V3.0';
for(const slug of slugs)for(const locale of ['zh','en']){const file=path.join(root,`public/images/product/${slug}/experience-hero-${locale}_${version}.webp`);if(fs.existsSync(file))throw Error(`Preserve existing artwork: ${file}`);}
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const slug of slugs)for(const locale of ['zh','en']){
  const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:3});
  await page.goto(`${origin}/${locale}/product/${slug}/`,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  await page.addStyleTag({content:'html,body,main,.capability-product{background:transparent!important}.cp-flow{animation:none!important}'});
  const buffer=await page.locator('.cp-hero .cp-art').screenshot({omitBackground:true});
  const file=path.join(root,`public/images/product/${slug}/experience-hero-${locale}_${version}.webp`);
  await sharp(buffer).webp({quality:94}).toFile(file);
  console.log(path.relative(root,file),await sharp(file).metadata().then(({width,height})=>({width,height})));
  await page.close();
 }
}finally{await browser.close();}
