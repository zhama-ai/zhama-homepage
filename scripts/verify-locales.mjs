import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import { Converter } from 'opencc-js/cn2t';
import { marketingStructure } from '../shared/content-parity.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const languages = { zh: 'zh-CN', en: 'en', 'zh-Hant': 'zh-Hant' };
const convert = Converter({ from: 'cn', to: 'tw' });
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(item => item.isDirectory() ? walk(path.join(dir, item.name)) : [path.join(dir, item.name)]);
const nodesOf = source => { const nodes=[]; const visit=n=>{ nodes.push(n); for(const c of n.childNodes||[])visit(c); if(n.content)visit(n.content); }; visit(parse(source)); return nodes; };
const attr = (node, key) => node.attrs?.find(item => item.name === key)?.value;
const sourceFor = file => readFileSync(file, 'utf8');
const contentText = (tree, rootTag='main') => {
 const values=[];
 const visit=(n,skip=false,main=false)=>{
  const excluded=skip||['style','script','code','pre'].includes(n.tagName);
  const inMain=main||n.tagName===rootTag;
  if(n.nodeName==='#text'&&!excluded&&inMain) values.push(n.value);
  for(const c of n.childNodes||[])visit(c,excluded,inMain);
 };visit(tree);return values;
};
const failures=[];let checks=0, pages=0;
const check=(value,message)=>{checks++;if(!value)failures.push(message);};
const mediaSalt = 'webp-quality88-effort4-v1';
const mediaHashes = new Map();
let mediaSources;
const mediaHash = file => {
 if(!mediaHashes.has(file))mediaHashes.set(file,createHash('sha256').update(readFileSync(file)).update(mediaSalt).digest('hex').slice(0,16));
 return mediaHashes.get(file);
};
const localPath = value => {
 if(!value?.startsWith('/')||value.startsWith('//'))return;
 return new URL(value,'https://locale-check.invalid').pathname;
};
const assetLocale = url => {
 if(/(?:^|[\/_.-])zh-Hant(?=[\/_.-]|$)/i.test(url))return 'zh-Hant';
 if(/(?:^|[\/_.-])zh(?:-CN)?(?=[\/_.-]|$)/i.test(url))return 'zh';
 if(/(?:^|[\/_.-])en(?=[\/_.-]|$)/i.test(url))return 'en';
};
const allowedAsset = (url,language) => !assetLocale(url)||assetLocale(url)===language;
const originalSources = hash => {
 if(!mediaSources){
  mediaSources=new Map();
  for(const directory of [path.join(root,'public'),dist])for(const file of walk(directory)){
   if(!/\.(?:png|jpe?g|webp)$/i.test(file)||/[/\\](?:_media|_astro)[/\\]/.test(file))continue;
   const key=mediaHash(file),url='/'+path.relative(directory,file).split(path.sep).join('/');
   if(!mediaSources.has(key))mediaSources.set(key,new Set());
   mediaSources.get(key).add(url);
  }
 }
 return [...(mediaSources.get(hash)||[])];
};
const checkAsset = (url,language,label) => {
 const pathname=localPath(url);if(!pathname)return;
 check(allowedAsset(pathname,language),`${label}: wrong-language asset ${url}`);
 if(language==='zh-Hant'&&pathname.endsWith('.svg')){
  const target=path.join(dist,pathname);if(existsSync(target)){
   const svgNodes=nodesOf(sourceFor(target));
   for(const n of svgNodes.filter(n=>n.nodeName==='#text'&&n.parentNode?.tagName==='text'))check(convert(n.value)===n.value,`${label}: simplified SVG label ${url}`);
  }
 }
};
const checkMedia = (node,language,label) => {
 for(const key of ['src','poster','data-src','data-hero-src','data-hero-poster','data-static-src','data-animated-src'])checkAsset(attr(node,key),language,label);
 if(!['img','source'].includes(node.tagName))return;
 for(const {name,value} of node.attrs||[]){
  if(name!=='srcset'&&!/^data-.+-srcset$/.test(name))continue;
  const source=localPath(attr(node,name==='srcset'?'src':name.replace(/srcset$/,'src')));
  const original=source&&path.join(dist,source);
  const expectedHash=original&&existsSync(original)?mediaHash(original):undefined;
  for(const candidate of value.split(',')){
   const url=candidate.trim().split(/\s+/)[0],pathname=localPath(url);if(!pathname)continue;
   check(existsSync(path.join(dist,pathname)),`${label}: missing responsive candidate ${url}`);
   checkAsset(url,language,label);
   const hash=pathname.match(/^\/_media\/([a-f0-9]{16})-\d+\.webp$/)?.[1];
   if(!hash)continue;
   if(expectedHash)check(hash===expectedHash,`${label}: ${name} candidate does not match ${source}: ${url}`);
   else {
    const sources=originalSources(hash);
    check(sources.length>0,`${label}: untraceable responsive candidate ${url}`);
    check(sources.some(source=>allowedAsset(source,language)),`${label}: ${name} candidate comes from wrong-language artwork ${url}: ${sources.join(', ')}`);
   }
  }
 }
};
const fullDocument = value => typeof value==='string'&&/^\s*(?:<!doctype\s+html\b|<html\b)/i.test(value);
const embeddedDocuments = nodes => {
 const documents=new Map();
 const collect=(value,key)=>{
  if(fullDocument(value))documents.set(key,value);
  else if(Array.isArray(value))value.forEach((item,index)=>collect(item,`${key}[${index}]`));
  else if(value&&typeof value==='object')for(const [name,item] of Object.entries(value))collect(item,`${key}.${name}`);
 };
 let jsonIndex=0,iframeIndex=0;
 for(const node of nodes){
  if(node.tagName==='script'&&attr(node,'type')==='application/json'){
   const key=`application/json[${jsonIndex++}]`;
   try{collect(JSON.parse((node.childNodes||[]).map(n=>n.value||'').join('')),key);}
   catch{check(false,`${key}: invalid application JSON`);}
  }
  if(node.tagName==='iframe'){
   const source=attr(node,'srcdoc'),key=`iframe[${iframeIndex++}].srcdoc`;
   if(fullDocument(source))documents.set(key,source);
  }
 }
 return documents;
};
const checkEmbedded = (documents,originals,language,label) => {
 for(const [key,source] of documents){
  const location=`${label}: ${key}`,nodes=nodesOf(source),lang=attr(nodes.find(n=>n.tagName==='html'),'lang');
  check(language==='zh'?['zh','zh-CN'].includes(lang):lang===languages[language],`${location}: embedded HTML lang ${lang}`);
  if(language==='en')for(const value of contentText(nodes[0],'body'))check(!/\p{Script=Han}/u.test(value.replaceAll('扎马AI','')),`${location}: untranslated embedded content ${value.trim().slice(0,90)}`);
  for(const node of nodes){
   if(language==='en')for(const name of ['alt','aria-label','placeholder','title']){
    const value=attr(node,name);if(value)check(!/\p{Script=Han}/u.test(value),`${location}: embedded ${name} contains Chinese ${value.slice(0,90)}`);
   }
   checkMedia(node,language,location);
  }
  if(language==='zh-Hant'){
   const original=originals.get(key);
   check(Boolean(original),`${location}: missing source embedded HTML`);
   if(original){
    const originalNodes=nodesOf(original);
    check(contentText(nodes[0],'body').join('')===contentText(originalNodes[0],'body').map(value=>convert(value)).join(''),`${location}: Traditional embedded content must match one source conversion`);
    const labels=tree=>tree.flatMap(node=>(node.attrs||[]).filter(item=>['alt','aria-label','placeholder','title'].includes(item.name)).map(item=>`${item.name}\0${item.value}`));
    check(JSON.stringify(labels(nodes))===JSON.stringify(labels(originalNodes).map(value=>convert(value))),`${location}: Traditional embedded labels must match one source conversion`);
   }
  }
  checkEmbedded(embeddedDocuments(nodes),originals.has(key)?embeddedDocuments(nodesOf(originals.get(key))):new Map(),language,location);
 }
 if(language==='zh-Hant')for(const key of originals.keys())check(documents.has(key),`${label}: missing Traditional embedded HTML ${key}`);
};
const routes = {};
for(const language of Object.keys(languages)) routes[language]=walk(path.join(dist,language)).filter(file=>file.endsWith('.html')).map(file=>path.relative(path.join(dist,language),file));
for(const [language, paths] of Object.entries(routes)) for(const route of new Set(Object.values(routes).flat())) check(paths.includes(route), `${language} missing counterpart: ${route}`);
for(const [language, paths] of Object.entries(routes)) for(const route of paths) {
 const label=`${language}/${route}`; const nodes=nodesOf(sourceFor(path.join(dist,label)));
 if(nodes.some(n=>n.tagName==='meta'&&attr(n,'http-equiv')?.toLowerCase()==='refresh'))continue;
 pages++;
 const image=attr(nodes.find(n=>n.tagName==='meta'&&attr(n,'property')==='og:image'),'content');
 check(image && existsSync(path.join(dist,new URL(image).pathname)),`${label}: missing localized share image`);
 check(attr(nodes.find(n=>n.tagName==='html'),'lang')===languages[language],`${label}: html lang`);
 const page=route.replace(/index\.html$/,'');
 const canonical=attr(nodes.find(n=>n.tagName==='link'&&attr(n,'rel')==='canonical'),'href');
 check(canonical && new URL(canonical).pathname===`/${language}/${page}`,`${label}: canonical counterpart`);
 for(const [target,tag] of Object.entries(languages)) {
  const alternate=nodes.find(n=>n.tagName==='link'&&attr(n,'hreflang')===tag);
  check(alternate && new URL(attr(alternate,'href')).pathname===`/${target}/${page}`,`${label}: ${tag} alternate`);
  const link=nodes.find(n=>n.tagName==='a'&&attr(n,'data-language-option')!==undefined&&attr(n,'hreflang')===tag);
  check(link && attr(link,'href')===`/${target}/${page}`,`${label}: ${tag} language switch`);
  check(!link || (attr(link,'aria-current')==='true')===(target===language),`${label}: selected language`);
 }
 const inspect=(node,skip=false,main=false)=>{
  const excluded=skip||['style','script','code','pre'].includes(node.tagName)||attr(node,'data-language-option')!==undefined;
  const inMain=main||node.tagName==='main';
  if(!excluded && node.nodeName==='#text' && inMain) {
   if(language==='en')check(!/\p{Script=Han}/u.test(node.value.replaceAll('扎马AI','')),`${label}: untranslated content ${node.value.trim().slice(0,90)}`);

  }
  if(!excluded) for(const key of ['alt','aria-label','placeholder','title']) {
   const value=attr(node,key);if(!value)continue;
   if(language==='en')check(!/\p{Script=Han}/u.test(value),`${label}: ${key} contains Chinese ${value.slice(0,90)}`);

  }
  if(['a','button'].includes(node.tagName)) {
   const text=n=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join('');
   check(!/预约(?:产品)?演示|预约方案交流|Book a (?:product )?demo|Request a demo/i.test(text(node)),`${label}: inconsistent consultation CTA`);
  }
  const href=attr(node,'href');
  if(href?.startsWith('/') && /^\/(zh|en|zh-Hant)\//.test(href) && attr(node,'data-language-option')===undefined && !(node.tagName==='link'&&attr(node,'hreflang'))) check(href.startsWith(`/${language}/`),`${label}: cross-language link ${href}`);
  checkMedia(node,language,label);
  for(const c of node.childNodes||[])inspect(c,excluded,inMain);
 };inspect(nodes[0]);
 const originalNodes=language==='zh-Hant'?nodesOf(sourceFor(path.join(dist,'zh',route))):[];
 // Historical articles can have editorial differences; current marketing pages must retain the same business groups.
 if(language!=='zh' && !/^blog\/.+\/index\.html$/.test(route)) {
  const sourceNodes=language==='zh-Hant'?originalNodes:nodesOf(sourceFor(path.join(dist,'zh',route)));
  check(JSON.stringify(marketingStructure(nodes[0]))===JSON.stringify(marketingStructure(sourceNodes[0])),`${label}: translated business sections, headings, definitions or value blocks are missing`);
 }
 checkEmbedded(embeddedDocuments(nodes),embeddedDocuments(originalNodes),language,label);
 if(language==='zh-Hant')check(contentText(nodes[0]).join('')===contentText(originalNodes[0]).map(value=>convert(value)).join(''),`${label}: Traditional content must match the source conversion without gaps`);
}
console.log(JSON.stringify({checks,pages,routes:Object.fromEntries(Object.entries(routes).map(([k,v])=>[k,v.length])),failures},null,2));
process.exitCode=failures.length?1:0;
