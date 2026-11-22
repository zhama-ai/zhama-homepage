"""Generate and validate localized product-interface artwork through the configured image service."""
import base64
import concurrent.futures
import json
import os
from pathlib import Path
import ssl
import urllib.request
import certifi
from PIL import Image

PROJECT = Path(__file__).resolve().parent.parent
PROMPTS = json.loads((PROJECT / 'artwork/product-experience-prompts_V1.0.json').read_text())
CONTEXT = ssl.create_default_context(cafile=certifi.where())
STYLE = '''Use case: ui-mockup. Final high-fidelity marketing product interface for TeGo enterprise digital employees, landscape 1536x1024. STRICTLY TWO-DIMENSIONAL SOFTWARE UI DESIGN, like a carefully crafted Figma screen. Straight-on orthographic front view. Pixel-sharp typesetting, fully readable actual content, calm spacing, coherent alignment, refined thin interface dividers, no placeholder lines. One connected workspace, with visual emphasis on its central business output. Fill most of the image with the interface; outer margins at most 3 percent. Main palette: dark midnight navy #091522 / #102334, off-white text #edf4fa, subdued brand blue #3977bd; restrained mint and amber data accents. Outer canvas a perfectly smooth solid #060b12 matching a dark website. No marketing headline outside the application. All typography is part of the software interface. NO 3D, perspective, isometric view, thickness, extruded edges, glassmorphism, metal, plastic, material reflection, robots, cartoon, holograms, glow, decorative light rays, random cards, rounded-square icon collage, loading indicators, skeleton UI, unreadable fake text, watermark, logos of competitors, compliance badges, or decorative line above the image. Use flat normal desktop UI, selective short readable content, not a wall of dense tiny text. Create a finished design, no mockup labels.'''

def generate(job):
    slug, locale = job
    target = PROJECT / f'output/imagegen/product-{slug}-{locale}_V2.2.png'
    if target.exists():
        with Image.open(target) as img:
            img.verify()
        return {'slug': slug, 'locale': locale, 'status': 'preserved', 'path': str(target)}
    target.parent.mkdir(parents=True, exist_ok=True)
    spec = PROMPTS[slug]
    prompt = STYLE + '\nStrict content rule: Never add scope dropdowns or Full business scope. Resource rows must show scope categories only. Revocable must be a plain textual action, never an off toggle. No dropdowns or invented unrestricted settings.  Do not add ANY calendar date, year, timestamp, clock time, customer company name, named responsible person, resource counts, user counts, approval counts, generic explanatory footnote, or decorative horizontal line above or below a section heading. Omit all of those fields entirely. Show only supplied business content and states. Keep the body typesetting clean and readable. No extra metrics. ' + '\nComposition: ' + spec['scene'] + '\nLanguage: ' + ('Simplified Chinese' if locale == 'zh' else 'English') + '. Use these exact texts selectively, with main labels large and easily readable. Never repeat irrelevant text:\n' + spec[locale]
    payload = {'model': 'gpt-image-2', 'prompt': prompt, 'size': '1536x1024', 'quality': 'high', 'n': 1}
    request = urllib.request.Request('https://sub2.zhama.com/v1/images/generations', data=json.dumps(payload).encode(), headers={'Authorization': 'Bearer ' + os.environ['SUB2API_API_KEY'], 'Content-Type': 'application/json'})
    with urllib.request.urlopen(request, context=CONTEXT, timeout=420) as response:
        result = json.load(response)
    item = result['data'][0]
    if item.get('b64_json'):
        data = base64.b64decode(item['b64_json'])
    elif item.get('url'):
        with urllib.request.urlopen(item['url'], context=CONTEXT, timeout=120) as response:
            data = response.read()
    else:
        raise RuntimeError(f'No image returned for {slug}/{locale}')
    with target.open('xb') as handle:
        handle.write(data)
    with Image.open(target) as img:
        img.verify()
    with Image.open(target) as img:
        metadata = {'slug': slug, 'locale': locale, 'status': 'generated', 'path': str(target.resolve()), 'format': img.format, 'width': img.width, 'height': img.height, 'mode': img.mode}
    return metadata

if __name__ == '__main__':
    jobs = [('governance', 'en')]
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        futures = {pool.submit(generate, job): job for job in jobs}
        for future in concurrent.futures.as_completed(futures):
            job = futures[future]
            try:
                print(json.dumps(future.result(), ensure_ascii=False), flush=True)
            except Exception as error:
                print(json.dumps({'slug': job[0], 'locale': job[1], 'status': 'failed', 'error': type(error).__name__}, ensure_ascii=False), flush=True)
