import type { APIRoute } from 'astro';
import { releaseBuilds, studioVersions } from '../../shared/release-builds.mjs';
import { releaseData } from '../../shared/release-store.mjs';
import { serializeStructuredData } from '../lib/seo';

const escapeHtml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

/**
 * Internal build list: every client brand, TeGo Studio and the server offline
 * packages with their SHA256 files. Not part of the public site (noindex), so it
 * keeps its own minimal stylesheet. Other releases load the static JSON emitted
 * by src/pages/releases/builds/.
 */
export const GET: APIRoute = async () => {
  const data = await releaseData();
  const initial = releaseBuilds(data);
  const options = (values: string[]) => values.map(value => `<option value="${escapeHtml(value)}"></option>`).join('');
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta name="color-scheme" content="light dark">
<title>构建清单 · TeGo</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>
:root{--bg:#f6f8fb;--surface:#fff;--text:#172033;--muted:#586579;--border:#dce3ec;--link:#1755ba;--accent:#2662d9;--warning:#8a4100}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font:15px/1.6 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
main{max-width:1680px;margin:0 auto;padding:48px 32px}
header{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-bottom:24px}
h1{font-size:clamp(26px,3vw,36px);line-height:1.25;letter-spacing:-.03em;margin:0}
h2{font-size:22px;margin:28px 0 14px}
form{display:flex;align-items:flex-end;gap:10px;flex-wrap:wrap}
label{display:flex;flex-direction:column;gap:5px;color:var(--muted);font-size:13px}
input{width:170px;min-height:44px;padding:10px 12px;border:1px solid var(--border);border-radius:8px;color:var(--text);background:var(--surface);font:inherit}
button{min-height:44px;flex-shrink:0;padding:10px 18px;border:1px solid var(--border);border-radius:8px;color:var(--text);background:var(--surface);font:inherit;cursor:pointer}
button:hover{border-color:var(--accent);color:var(--accent)}
button:disabled{cursor:wait;opacity:.65}
:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
#status{margin:0 0 16px;font-size:14px;color:var(--warning)}
#status:empty{display:none}
.table-wrap{overflow:auto;max-height:76vh;border:1px solid var(--border);border-radius:12px;background:var(--surface)}
table{width:100%;min-width:1120px;table-layout:fixed;border-collapse:separate;border-spacing:0}
.server-table{min-width:800px}
.server-table thead th:first-child{width:240px}
.studio-table{min-width:640px}
th,td{border-bottom:1px solid var(--border);border-right:1px solid var(--border);padding:20px;text-align:left;vertical-align:top}
th:last-child,td:last-child{border-right:0}
tbody tr:last-child>*{border-bottom:0}
thead th{position:sticky;top:0;z-index:2;background:var(--surface);box-shadow:0 1px 0 var(--border)}
thead th:first-child{width:180px;z-index:3}
tr>:first-child{position:sticky;left:0;background:var(--surface)}
tbody th{z-index:1;font-size:14px;font-weight:600}
.versions{display:block;color:var(--muted);font-size:12px;font-weight:400;margin-top:8px}
.artifact+.artifact{margin-top:18px;padding-top:16px;border-top:1px dashed var(--border)}
.artifact-info{display:flex;flex-wrap:wrap;gap:8px;color:var(--muted);font-size:12px;margin-bottom:8px}
.version{font-weight:600;color:var(--text)}
a{display:block;color:var(--link);overflow-wrap:anywhere;text-decoration-thickness:1px;text-underline-offset:3px;font:13px/1.7 ui-monospace,SFMono-Regular,Consolas,monospace}
a:hover{text-decoration-thickness:2px}
.sha256{display:block;color:var(--muted);overflow-wrap:anywhere;font:12px/1.6 ui-monospace,SFMono-Regular,Consolas,monospace}
.empty{color:var(--muted)}
@media (max-width:640px){main{padding:28px 16px}header{align-items:flex-start;flex-direction:column;gap:16px}th,td{padding:16px}thead th:first-child{width:150px}}
@media (prefers-color-scheme:dark){:root{--bg:#101722;--surface:#172131;--text:#edf2fa;--muted:#aab8cd;--border:#35445a;--link:#8bbaff;--accent:#8bbaff;--warning:#ffbd8a}}
</style>
</head>
<body>
<main>
<header>
<h1 id="title">构建清单 · ${escapeHtml(initial.version)}</h1>
<form id="version-form">
<label for="version">TeGo 版本<input id="version" name="version" list="tego-versions" value="${escapeHtml(initial.version)}" autocomplete="off" spellcheck="false"></label>
<label for="studio-version">Studio 版本<input id="studio-version" name="studioVersion" list="studio-versions" value="${escapeHtml(initial.studio.version ?? '')}" autocomplete="off" spellcheck="false"></label>
<button type="submit" id="query">查询</button>
<button type="button" id="latest">最新版本</button>
</form>
<datalist id="tego-versions">${options(data.index.versions)}</datalist>
<datalist id="studio-versions">${options(studioVersions(data))}</datalist>
</header>
<p id="status" role="status" aria-live="polite"></p>
<h2>客户端</h2>
<div class="table-wrap" role="region" aria-label="客户端" tabindex="0">
<table aria-label="客户端"><thead id="client-head"></thead><tbody id="client-body"></tbody></table>
</div>
<h2>TeGo Studio <span id="studio-release" class="versions"></span></h2>
<div class="table-wrap" role="region" aria-label="TeGo Studio" tabindex="0">
<table class="studio-table" aria-label="TeGo Studio"><thead><tr><th scope="col">平台 / 架构</th><th scope="col">安装包</th></tr></thead><tbody id="studio-body"></tbody></table>
</div>
<h2>服务端离线包</h2>
<div class="table-wrap" role="region" aria-label="服务端离线包" tabindex="0">
<table class="server-table" aria-label="服务端离线包"><thead><tr><th scope="col">产品 / 包类型</th><th scope="col">Linux AMD64 / x86_64</th><th scope="col">Linux ARM64 / aarch64</th></tr></thead><tbody id="server-body"></tbody></table>
</div>
</main>
<script type="application/json" id="initial-builds">${serializeStructuredData(initial)}</script>
<script>
(() => {
  const $ = id => document.getElementById(id);
  const form = $('version-form'), versionInput = $('version'), studioInput = $('studio-version');
  const status = $('status'), buttons = [$('query'), $('latest')];
  const initial = JSON.parse($('initial-builds').textContent);
  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const artifact = (version, label, url, sha256) => {
    const block = element('div', '', 'artifact');
    const info = element('div', '', 'artifact-info');
    info.append(element('span', version, 'version'), element('span', label));
    const link = element('a', url);
    link.href = url;
    block.append(info, link);
    if (sha256) block.append(element('code', sha256, 'sha256'));
    return block;
  };
  const heading = (text, scope) => { const cell = element('th', text); cell.scope = scope; return cell; };
  const emptyCell = () => { const cell = element('td'); cell.append(element('span', '-', 'empty')); return cell; };
  function renderClients(data) {
    $('title').textContent = '构建清单 · ' + data.version;
    versionInput.value = data.version;
    const row = element('tr');
    row.append(heading('平台 / 架构', 'col'));
    for (const brand of data.brands) {
      const cell = heading(brand.name, 'col');
      cell.append(element('span', '桌面 ' + (brand.desktopVersion || '-') + ' · 移动 ' + (brand.mobileVersion || '-'), 'versions'));
      row.append(cell);
    }
    $('client-head').replaceChildren(row);
    $('client-body').replaceChildren(...data.rows.map(entry => {
      const tr = element('tr');
      tr.append(heading(entry.label, 'row'));
      for (const cell of entry.cells) {
        if (!cell.links.length) { tr.append(emptyCell()); continue; }
        const td = element('td');
        for (const item of cell.links) td.append(artifact(item.version, [item.arch.toUpperCase(), item.format].filter(Boolean).join(' · '), item.url));
        tr.append(td);
      }
      return tr;
    }));
    $('server-body').replaceChildren(...data.server.rows.map(entry => {
      const tr = element('tr');
      tr.append(heading(entry.label, 'row'));
      for (const cell of entry.cells) {
        if (!cell.url) { tr.append(emptyCell()); continue; }
        const td = element('td');
        td.append(artifact(data.server.version, '离线包', cell.url, cell.sha256), artifact(data.server.version, 'SHA256', cell.checksumUrl));
        tr.append(td);
      }
      return tr;
    }));
  }
  function renderStudio(studio) {
    $('studio-release').textContent = studio.version || '-';
    studioInput.value = studio.version || '';
    $('studio-body').replaceChildren(...studio.rows.map(entry => {
      const tr = element('tr');
      tr.append(heading(entry.label, 'row'));
      if (!entry.links.length) { tr.append(emptyCell()); return tr; }
      const td = element('td');
      for (const item of entry.links) td.append(artifact(item.version, item.format, item.url));
      tr.append(td);
      return tr;
    }));
  }
  const normalize = value => {
    const text = value.trim();
    if (!text) return '';
    const match = text.match(/^v?(\\d+\\.\\d+\\.\\d+(?:-[A-Za-z0-9.-]+)?)$/);
    if (!match) throw new Error('请输入有效版本号，例如 v4.34.0。');
    return 'v' + match[1];
  };
  async function fetchJson(path, version) {
    const response = await fetch(path, { cache: 'no-store', signal: AbortSignal.timeout(30000) });
    if (response.status === 404) throw new Error('未收录版本 ' + version + '。');
    if (!response.ok) throw new Error('构建清单读取失败（HTTP ' + response.status + '），请重试。');
    return response.json();
  }
  async function load(version, studioVersion, updateUrl) {
    buttons.forEach(button => { button.disabled = true; });
    status.textContent = '';
    try {
      const tego = version ? normalize(version) : '';
      const studio = studioVersion ? normalize(studioVersion) : '';
      const [builds, studioMatrix] = await Promise.all([
        tego ? fetchJson('/releases/builds/' + encodeURIComponent(tego) + '.json', tego) : initial,
        studio ? fetchJson('/releases/builds/studio/' + encodeURIComponent(studio) + '.json', studio) : null,
      ]);
      renderClients(builds);
      renderStudio(studioMatrix || builds.studio);
      if (updateUrl) {
        const url = new URL(location.href);
        if (tego) url.searchParams.set('version', builds.version); else url.searchParams.delete('version');
        if (studio) url.searchParams.set('studioVersion', studioMatrix.version); else url.searchParams.delete('studioVersion');
        history.replaceState(null, '', url);
      }
    } catch (error) {
      status.textContent = error instanceof Error && error.message ? error.message : '构建清单读取失败，请重试。';
    } finally {
      buttons.forEach(button => { button.disabled = false; });
    }
  }
  form.addEventListener('submit', event => { event.preventDefault(); load(versionInput.value, studioInput.value, true); });
  $('latest').addEventListener('click', () => load('', '', true));
  const params = new URLSearchParams(location.search);
  renderClients(initial);
  renderStudio(initial.studio);
  if (params.get('version') || params.get('studioVersion')) load(params.get('version') || '', params.get('studioVersion') || '', false);
})();
</script>
</body>
</html>
`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
};
