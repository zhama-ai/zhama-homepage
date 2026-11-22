"""Add translucent surfaces and directional elevation to the approved UI art."""
from pathlib import Path
from copy import deepcopy
import re
import xml.etree.ElementTree as ET

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'public/images/anywhere/anywhere-workspace-poster_V1.17.webp'
OUTPUT = ROOT / 'output/imagegen/anywhere-workspace-depth_V1.18.png'
WEB = ROOT / 'public/images/anywhere/anywhere-workspace-depth_V1.18.webp'
FLOWS = {part: ROOT / f'src/assets/anywhere/workspace-{part}_V1.18.svg'
         for part in ('inputs', 'platform', 'transfer')}
for path in (OUTPUT, WEB, *FLOWS.values()):
    if path.exists():
        raise FileExistsError(path)

source = Image.open(SOURCE).convert('RGBA')
width, height = source.size
pixels = np.asarray(source).astype(float)
yy, xx = np.mgrid[:height, :width]
canvas = Image.new('RGBA', source.size)

# An ambient light footprint fades into the page rather than forming a pedestal.
footprint = Image.new('L', source.size)
ImageDraw.Draw(footprint).ellipse((525, 648, 1215, 713), fill=43)
footprint = footprint.filter(ImageFilter.GaussianBlur(23))
light = Image.new('RGBA', source.size, (68, 121, 151, 0))
light.putalpha(footprint)
canvas = Image.alpha_composite(canvas, light)

panels = [
    ((36, 303, 429, 397), 14, .58),
    ((565, 58, 1151, 664), 22, 1.0),
    ((1300, 152, 1578, 480), 17, .65),
    ((1593, 153, 1912, 480), 17, .65),
    ((1300, 501, 1587, 632), 13, .55),
    ((1605, 501, 1912, 632), 13, .55),
]
refined = pixels.copy()
for box, radius, elevation in panels:
    x0, y0, x1, y1 = box
    mask = Image.new('L', source.size)
    ImageDraw.Draw(mask).rounded_rectangle(box, radius, fill=255)
    inside = np.asarray(mask).astype(float) / 255
    local_x = np.clip((xx - x0) / (x1 - x0), 0, 1)
    local_y = np.clip((yy - y0) / (y1 - y0), 0, 1)
    luminance = pixels[:, :, :3].mean(axis=2)
    # Bright avatars, icons and chart marks retain their original opacity/color.
    material = inside * np.clip((122 - luminance) / 46, 0, 1)
    if elevation == 1:
        for cx, cy, r in ((627, 372, 34), (814, 372, 34), (1004, 372, 34)):
            material[(xx-cx)**2 + (yy-cy)**2 < r*r] = 0
    reflection = np.exp(-((local_x + .65*local_y - .14) / .60)**2)
    lift = reflection * (19 if elevation == 1 else 11) - local_y * 4
    tint = np.stack((lift * .86, lift, lift * 1.08), axis=2)
    refined[:, :, :3] += tint * material[:, :, None]
    glass_alpha = 230 - 19 * local_y - 6 * local_x
    refined[:, :, 3] = np.where(
        inside > 0,
        pixels[:, :, 3] * (1 - material * (1 - glass_alpha / 255)),
        refined[:, :, 3],
    )
    # A small key shadow and a wider ambient shadow share the same light source.
    for dx, dy, blur, opacity in ((8, 13, 8, .34), (18, 31, 23, .46)):
        shadow = ImageChops.offset(mask, round(dx*elevation), round(dy*elevation))
        shadow = shadow.filter(ImageFilter.GaussianBlur(blur*elevation))
        shadow = shadow.point(lambda value: round(value*opacity*elevation))
        layer = Image.new('RGBA', source.size, (0, 3, 8, 0))
        layer.putalpha(shadow)
        canvas = Image.alpha_composite(canvas, layer)

canvas = Image.alpha_composite(canvas, Image.fromarray(np.clip(refined, 0, 255).astype('uint8')))

# Broad, low contrast surface reflections keep the light source coherent.
edge_canvas = Image.new('RGBA', source.size)
for box, radius, elevation in panels:
    outline = Image.new('L', (width*3, height*3))
    ImageDraw.Draw(outline).rounded_rectangle(tuple(v*3 for v in box), radius*3,
                                             outline=255, width=4)
    outline = outline.resize(source.size, Image.Resampling.LANCZOS)
    x0, y0, x1, y1 = box
    fade = np.clip(1 - .7*(xx-x0)/(x1-x0) - .68*(yy-y0)/(y1-y0), 0, 1)
    alpha = np.asarray(outline).astype(float) * fade * (.36 if elevation == 1 else .22)
    rim = Image.new('RGBA', source.size, (181, 221, 241, 0))
    rim.putalpha(Image.fromarray(alpha.astype('uint8')))
    edge_canvas = Image.alpha_composite(edge_canvas, rim)
canvas = Image.alpha_composite(canvas, edge_canvas)
canvas.save(OUTPUT, 'PNG')
canvas.save(WEB, 'WEBP', quality=94, alpha_quality=100, method=6, exact=True)
for path in (OUTPUT, WEB):
    with Image.open(path) as image:
        image.load()
        assert image.size == (1948, 760) and image.mode == 'RGBA'
        assert image.getpixel((0, 0))[3] == 0
        assert image.getpixel((900, 100))[3] < 255
        print(path.resolve(), image.format, image.size, image.getextrema()[3])

# Each visible plane owns only its own motion, so no hidden copies run in parallel.
ET.register_namespace('', 'http://www.w3.org/2000/svg')
flow = ET.parse(ROOT / 'src/assets/anywhere/workspace-flow_V1.14.svg').getroot()
defs = next(child for child in flow if child.tag.endswith('defs'))
for part, destination in FLOWS.items():
    output = ET.Element(flow.tag, flow.attrib)
    chosen = []
    for child in flow:
        classes = set(child.get('class', '').split())
        keep = ('workspace-input-wiring' in classes or 'workspace-input-sweep' in classes) if part == 'inputs' else (
            'workspace-motion' in classes and 'workspace-input-sweep' not in classes
        ) if part == 'platform' else 'workspace-connector' in classes
        if keep:
            chosen.append(deepcopy(child))
    references = set(re.findall(r'url\(#([\w-]+)\)', ''.join(ET.tostring(child, encoding='unicode') for child in chosen)))
    needed_defs = ET.Element(defs.tag)
    for definition in defs:
        if definition.get('id') in references:
            needed_defs.append(deepcopy(definition))
    if len(needed_defs):
        output.append(needed_defs)
    output.extend(chosen)
    ET.indent(output, space=' ')
    with destination.open('x', encoding='utf-8') as stream:
        stream.write(ET.tostring(output, encoding='unicode') + '\n')
    print(destination.resolve())
