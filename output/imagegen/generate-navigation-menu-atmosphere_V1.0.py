import os, json, urllib.request, base64
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parent
out=root/'navigation-menu-atmosphere_V1.0.png'
web=root.parent.parent/'public/images/navigation/menu-atmosphere_V1.0.webp'
if out.exists() or web.exists():
    raise SystemExit('Artifact version already exists')
payload={'model':'gpt-image-2','prompt':(root/'navigation-menu-atmosphere-prompt_V1.0.txt').read_text(),'size':'1536x1024','quality':'high','n':1}
request=urllib.request.Request('https://sub2.zhama.com/v1/images/generations',data=json.dumps(payload).encode(),headers={'Authorization':'Bearer '+os.environ['SUB2API_API_KEY'],'Content-Type':'application/json'})
with urllib.request.urlopen(request,timeout=300) as response:
    result=json.load(response)
item=result['data'][0]
if item.get('b64_json'):
    content=base64.b64decode(item['b64_json'])
elif item.get('url'):
    with urllib.request.urlopen(item['url'],timeout=120) as response:
        content=response.read()
else:
    raise RuntimeError('Image API returned no image')
with out.open('xb') as target:
    target.write(content)
with Image.open(out) as image:
    image.verify()
with Image.open(out) as image:
    print('Saved:',out,'Format:',image.format,'Dimensions:',image.size)
    web.parent.mkdir(parents=True,exist_ok=True)
    with web.open('xb') as target:
        image.convert('RGB').resize((1024,683),Image.Resampling.LANCZOS).save(target,'WEBP',quality=86,method=6)
with Image.open(web) as image:
    print('Web asset:',web,'Format:',image.format,'Dimensions:',image.size,'Bytes:',web.stat().st_size)
