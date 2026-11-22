"""Generate localized integration artwork using the configured image service."""
import base64, concurrent.futures, json, os, ssl, sys, urllib.request
from pathlib import Path
from PIL import Image
import certifi
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'output/imagegen'
OUT.mkdir(parents=True,exist_ok=True)
STYLE='''Use case: ads-marketing / infographic-diagram. A polished, restrained enterprise software website hero illustration. Landscape 1536x1024. Create ONE integrated composition, NOT a set of scattered cards or three equal blocks. Sophisticated two-dimensional digital product illustration, crisp typesetting and fine line icons. Dark midnight navy background exactly #070c13, navy and cool blue surfaces, near-white labels, selective cyan and a hint of indigo. No physical thickness, plastic, glass, hardware, robots, human portrait, floating cubes, ring platform, neon web, glowing spaghetti, dashboard analytics or invented metrics. No grain. No decorative horizontal rule above any title. No page number, footer, footnote, explanatory subtitle, watermark or slogan. Outer 5% is clean dark background; illustration fills remaining area.
Composition: A single LARGE central digital-employee task workspace occupying about 58% of the composition, with a small line icon of a person at its heading. A compact source rail is integrated along its left edge; a single readable document and a small CRM follow-up record emerge together from its lower-right edge with careful overlap. The source rail, main task and outgoing document share common alignment, slim flat navy surfaces, consistent soft directional shadows and clear visual grouping; not separate floating boxes. The central task is the dominant focal point, not a big letter or logo. The source rail contains three connected resource icons for CRM, project documents and database. Inside the main task, a short task request and two substantive actions form finished readable work, no fake text, loading bars, placeholder strokes or skeletons. A compact tool dock is attached to the workspace bottom, labelled MCP and RESTful API. One restrained blue directional path brings source data into the workspace, one cyan return path exits into the CRM follow-up record, and a lower short path indicates results going back to the business system. The connector must not cross any text. The outgoing white-blue document has a recognizable folded corner, readable heading and two substantive lines, NOT a blank page. Keep visual density controlled, ample internal spacing. Main title around 48px; resource labels around 30px; substantive task content around 30px. All typography horizontal, no skew or perspective. No tiny extra labels. This is a conceptual product illustration, not a screenshot: no app chrome, browser bar, menu, buttons or config fields. Use ONLY supplied text, no extra text.'''
TEXT={
'zh':'''Use Simplified Chinese only except technical identifiers. Exact text and placement:
left resource rail: "企业系统", "CRM", "项目资料", "数据库".
central task heading: "数字员工"; task request: "整理客户沟通，准备项目方案"; two actions: "归集客户与项目资料", "调用工具，执行授权动作".
bottom attached tool dock: "MCP", "RESTful API".
outgoing document: "项目方案", "实施安排", "交付事项".
CRM follow-up record: "CRM 跟进", "沟通纪要", "后续事项".
return path small label: "成果回到业务系统".
''',
'en':'''Use English only. Exact text and placement:
left resource rail: "Business systems", "CRM", "Project files", "Database".
central task heading: "Digital employee"; task request: "Prepare the customer proposal"; two actions: "Collect customer and project context", "Use tools for authorized actions".
bottom attached tool dock: "MCP", "RESTful API".
outgoing document: "Project proposal", "Implementation plan", "Deliverables".
CRM follow-up record: "CRM follow-up", "Meeting notes", "Next actions".
return path small label: "Results back to business systems".
'''}
TEXT['zh-Hant']='Use Traditional Chinese only except technical identifiers. Exact text and placement:\nleft resource rail: "企業系統", "CRM", "專案資料", "資料庫".\ncentral task heading: "數字員工"; task request: "整理客戶溝通，準備專案方案"; two actions: "歸集客戶與專案資料", "呼叫工具，執行授權動作".\nbottom attached tool dock: "MCP", "RESTful API".\noutgoing document: "專案方案", "實施安排", "交付事項".\nCRM follow-up record: "CRM 跟進", "溝通紀要", "後續事項".\nreturn path small label: "成果回到業務系統".\n'
VERSION=os.environ.get('TEGO_ART_VERSION','V1.0')
CTX=ssl.create_default_context(cafile=certifi.where())
def generate(locale):
 path=OUT/f'integrations-connected-work-{locale}_{VERSION}.png'
 if path.exists():raise FileExistsError(str(path))
 prompt=STYLE+'\n'+TEXT[locale]
 promptpath=ROOT/f'artwork/integrations_V1.0/prompt-{locale}_{VERSION}.txt'
 with promptpath.open('x') as f:f.write(prompt)
 data=json.dumps({'model':'gpt-image-2','prompt':prompt,'size':'1536x1024','quality':'high','n':1}).encode()
 req=urllib.request.Request('https://sub2.zhama.com/v1/images/generations',data=data,headers={'Authorization':'Bearer '+os.environ['SUB2API_API_KEY'],'Content-Type':'application/json'})
 with urllib.request.urlopen(req,context=CTX,timeout=420) as response:r=json.load(response)
 item=r['data'][0]
 if item.get('b64_json'):binary=base64.b64decode(item['b64_json'])
 elif item.get('url'):
  with urllib.request.urlopen(item['url'],context=CTX,timeout=120) as response:binary=response.read()
 else:raise RuntimeError('Image service returned no image')
 with path.open('xb') as f:f.write(binary)
 with Image.open(path) as im:
  im.verify()
 with Image.open(path) as im:print(json.dumps({'path':str(path.resolve()),'format':im.format,'size':im.size},ensure_ascii=False),flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
 for result in pool.map(generate,sys.argv[1:] or ['zh','en','zh-Hant']):pass
