import { readdirSync, unlinkSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareTraditionalPages } from './prepare-traditional.mjs';
import { optimizeMedia } from './optimize-media.mjs';
import { prepareSeoPublication } from './prepare-seo.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const dist=path.join(root,'dist');
const traditional = prepareTraditionalPages(dist);
console.log(`繁體中文靜態頁面準備完成：${traditional.pages} 頁、${traditional.feeds} 個訂閱源、${traditional.scripts} 個本地化腳本。`);
// Localize originals before deriving srcsets, so every responsive candidate has the same language.
const media = await optimizeMedia(dist, path.join(root, '.astro/media-cache'));
console.log('响应式图片构建完成：' + JSON.stringify(media));
const seo = prepareSeoPublication(dist, process.env.PUBLIC_SITE_URL);
console.log('搜索索引发布完成：' + JSON.stringify(seo));
const walk=directory=>readdirSync(directory,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(directory,entry.name)):[path.join(directory,entry.name)]);
const files=walk(dist);
const references=files.filter(file=>/\.(html|css|js|json|xml|svg)$/.test(file)).map(file=>readFileSync(file,'utf8')).join('\n');
let removed=0;
// 历史素材保留在源工程；静态发布仅携带实际引用的配图。
for(const file of files.filter(file=>file.includes('/images/')||file.includes('/artwork/')||/\/social-card.*\.png$/.test(file))){
 const asset='/'+path.relative(dist,file).split(path.sep).join('/');
 if(!references.includes(asset)){unlinkSync(file);removed++;}
}
console.log(`发布素材清理完成，排除 ${removed} 项未引用的历史素材。`);
