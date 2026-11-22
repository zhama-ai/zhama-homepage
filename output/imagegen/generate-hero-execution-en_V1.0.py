import os,json,urllib.request,base64,pathlib
from PIL import Image
root=pathlib.Path(__file__).resolve().parent
out=root/'hero-execution-en_V1.0.png'
if out.exists():raise SystemExit('Version already exists')
payload={'model':'gpt-image-2','prompt':(root/'hero-execution-en-prompt_V1.0.txt').read_text(),'size':'1920x960','quality':'high','n':1}
request=urllib.request.Request('https://sub2.zhama.com/v1/images/generations',data=json.dumps(payload).encode(),headers={'Authorization':'Bearer '+os.environ['SUB2API_API_KEY'],'Content-Type':'application/json'})
with urllib.request.urlopen(request,timeout=300) as response:result=json.load(response)
item=result['data'][0]
if item.get('b64_json'):content=base64.b64decode(item['b64_json'])
elif item.get('url'):
 with urllib.request.urlopen(item['url'],timeout=120) as response:content=response.read()
else:raise RuntimeError('No image returned')
with out.open('xb')as f:f.write(content)
im=Image.open(out)
print('Saved:',out,'Format:',im.format,'Dimensions:',im.size)
web=root.parent.parent/'public/images/hero/execution-loop-en_V1.0.webp'
if web.exists():raise SystemExit('Web version already exists')
im.save(web,'WEBP',quality=93,method=6)
print('Web asset:',web,'Bytes:',web.stat().st_size)
