"""Build the task-entry motion artwork using existing vector channel symbols."""
from pathlib import Path
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[2]
target = root / 'src/assets/anywhere/workspace-input-scene_V1.23.svg'
if target.exists():
    raise FileExistsError(target)
ET.register_namespace('', 'http://www.w3.org/2000/svg')

def animation(attribute, values, times, **attributes):
    params = {'attributeName': attribute, 'values': values, 'keyTimes': times,
              'dur': '10s', 'repeatCount': 'indefinite', **attributes}
    return '<animate ' + ' '.join(f'{name}="{value}"' for name, value in params.items()) + '/>'

def lift(distance, start, end):
    return f'<animateTransform attributeName="transform" type="translate" values="0 {distance};0 {distance};0 0;0 0;0 {distance}" keyTimes="0;{start};{end};.94;1" dur="10s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;.22 .7 .2 1;0 0 1 1;.4 0 .8 1"/>'

devices = [
 ('PC', 90, '<rect x="-20" y="-18" width="40" height="28" rx="3"/><path d="M0 10V18M-13 18H13M-23 23H23"/>'),
 ('Web', 186, '<rect x="-22" y="-18" width="44" height="34" rx="4"/><path d="M-22-8H22"/><path d="M-15-13H-14M-9-13H-8M-3-13H-2" stroke-width="2.6"/>'),
 ('平板', 278, '<rect x="-15" y="-23" width="30" height="43" rx="4"/><path d="M-2 14H2"/>'),
 ('移动端', 371, '<rect x="-11" y="-23" width="22" height="43" rx="4"/><path d="M-4-17H4M-2 14H2"/>'),
]
device_markup = []
for index, (label, x, shape) in enumerate(devices):
    begin = .015 + index * .008
    end = begin + .045
    device_markup.append(f'''<g transform="translate({x} 135)">
     <g class="input-device" fill="url(#input-display)" stroke="#8fa9c0" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      {shape}
      {lift(7, f'{begin:.3f}', f'{end:.3f}')}
      {animation('stroke', '#8fa9c0;#8fa9c0;#b1deff;#8fa9c0;#8fa9c0', f'0;{begin:.3f};{end:.3f};.18;1')}
     </g>
    </g><text x="{x}" y="183" class="input-device-label" text-anchor="middle">{label}</text>''')

channels = [('weixin','微信'),('qq','QQ'),('wecom','企业微信'),('dingtalk','钉钉'),('feishu','飞书'),(None,'OA')]
channel_markup = []
for index, (filename, label) in enumerate(channels):
    x = [51,118,186,255,322,389][index]
    if filename:
        logo = ET.parse(root / f'output/motion/work-anywhere_V1.6/assets/{filename}.svg').getroot()
        viewbox = logo.get('viewBox')
        fill = logo.get('fill', 'none')
        paths = ''.join(ET.tostring(child, encoding='unicode') for child in logo)
        icon = f'<svg x="-18" y="-18" width="36" height="36" viewBox="{viewbox}" fill="{fill}">{paths}</svg>'
    else:
        icon = '<g fill="#929ee4"><rect x="-16" y="-16" width="14" height="14" rx="4"/><rect x="2" y="-16" width="14" height="14" rx="4"/><rect x="-16" y="2" width="14" height="14" rx="4"/><rect x="2" y="2" width="14" height="14" rx="4"/></g>'
    begin = .025 + index * .008
    end = begin + .04
    channel_markup.append(f'''<g transform="translate({x} 460)"><g class="input-channel">
      {icon}
      {animation('opacity', '.72;.72;1;.82;.82', f'0;{begin:.3f};{end:.3f};.20;1')}
      {lift(5, f'{begin:.3f}', f'{end:.3f}')}
     </g></g><text x="{x}" y="509" class="input-channel-label" text-anchor="middle">{label}</text>''')

wave = []
for index in range(19):
    height = [5,10,7,15,20,12,25,17,29,18,23,14,20,10,15,8,11,6,4][index]
    peak = .55 + (index % 5) * .11
    wave.append(f'<g transform="translate({96+index*5} 333)"><rect x="0" y="{-height/2}" width="2.4" height="{height}" rx="1.2" fill="#58c2ef"><animateTransform attributeName="transform" type="scale" values="1 .2;1 .2;1 {peak:.2f};1 .3;1 1;1 .4;1 .2;1 .2" keyTimes="0;.02;.045;.065;.085;.11;.13;1" dur="10s" repeatCount="indefinite"/></rect></g>')

scene = f'''<svg xmlns="http://www.w3.org/2000/svg" class="topology-links workspace-flow workspace-input-scene" viewBox="0 0 477 570" aria-hidden="true" focusable="false" font-family="'PingFang SC','Microsoft YaHei',sans-serif">
 <style>
  .input-animated{{display:none}}
  .input-motion-active .input-animated{{display:inline}}
  .input-motion-active .input-static{{display:none}}
  .input-device-label{{font-size:18px;fill:#9db2c7}}
  .input-channel-label{{font-size:17px;fill:#a9bdd0}}
  @media(prefers-reduced-motion:reduce){{.input-animated{{display:none!important}}.input-static{{display:inline!important}}}}
 </style>
 <defs>
  <linearGradient id="input-display" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#20405d" stop-opacity=".6"/><stop offset="1" stop-color="#0a1726" stop-opacity=".2"/></linearGradient>
  <linearGradient id="input-surface" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#233e58"/><stop offset=".5" stop-color="#14293e"/><stop offset="1" stop-color="#102034"/></linearGradient>
  <linearGradient id="input-edge" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#9bb7cf" stop-opacity=".7"/><stop offset=".48" stop-color="#3a6489" stop-opacity=".7"/><stop offset="1" stop-color="#72afdb" stop-opacity=".35"/></linearGradient>
  <linearGradient id="input-wire" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#5083af" stop-opacity=".18"/><stop offset=".5" stop-color="#589bce" stop-opacity=".55"/><stop offset="1" stop-color="#5083af" stop-opacity=".18"/></linearGradient>
  <radialGradient id="input-send-glow"><stop stop-color="#168cdd" stop-opacity=".65"/><stop offset="1" stop-color="#168cdd" stop-opacity="0"/></radialGradient>
  <filter id="input-shadow" x="-30%" y="-70%" width="160%" height="260%"><feDropShadow dx="0" dy="13" stdDeviation="12" flood-color="#00040a" flood-opacity=".65"/></filter>
  <filter id="input-soft-light" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="15"/></filter>
  <filter id="input-signal-light" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="2"/></filter>
  <clipPath id="input-text-reveal"><rect x="88" y="282" width="285" height="37"><animateTransform attributeName="transform" type="translate" values="-292 0;-292 0;0 0;0 0;-292 0;-292 0" keyTimes="0;.02;.12;.94;.97;1" dur="10s" repeatCount="indefinite"/></rect></clipPath>
 </defs>
 <text x="40" y="49" fill="#bfd1e1" font-size="25" font-weight="500">任务入口</text>
 <g fill="none" stroke="url(#input-wire)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M90 200V210Q90 218 98 218H363Q371 218 371 210V200M186 200V218M278 200V218M225 218V254"/>
  <path d="M51 428V412Q51 404 59 404H381Q389 404 389 412V428M118 428V404M186 428V404M255 428V404M322 428V404M225 404V354"/>
 </g>
 <g class="input-animated" fill="#a6dfff">
  <g opacity="0">{animation('opacity','0;0;.9;.9;0;0','0;.025;.04;.10;.115;1')}
   <circle r="2.7"><animateMotion path="M225 218V254" dur="10s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;.04;.1075;1"/></circle>
  </g>
  <g opacity="0">{animation('opacity','0;0;.9;.9;0;0','0;.01;.025;.10;.115;1')}
   <circle r="2.7"><animateMotion path="M225 404V354" dur="10s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;.0125;.1075;1"/></circle>
  </g>
 </g>
 {''.join(device_markup)}
 {''.join(channel_markup)}
 <g class="input-animated" opacity="0"><ellipse cx="225" cy="306" rx="192" ry="35" fill="#137bce" filter="url(#input-soft-light)"/>{animation('opacity','0;0;.23;.23;0;0','0;.025;.09;.15;.23;1')}</g>
 <g class="input-command">
  <rect x="12" y="254" width="425" height="100" rx="17" fill="url(#input-surface)" stroke="url(#input-edge)" stroke-width="1.4" filter="url(#input-shadow)"/>
  <g fill="none" stroke="#b0cde4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
   <rect x="42" y="288" width="13" height="22" rx="6.5"/>
   <path d="M36 302V304C36 319 61 319 61 304V302M48.5 316V324M42 324H55"/>
   <path d="M77 284V324" stroke="#688aa9" stroke-opacity=".5"/>
  </g>
  <text class="input-static" x="94" y="311" fill="#e2eef9" font-size="20" font-weight="500">整理项目资料，生成建设方案</text>
  <g class="input-animated">
   <text x="94" y="311" fill="#e2eef9" font-size="20" font-weight="500" clip-path="url(#input-text-reveal)">整理项目资料，生成建设方案</text>
   <g opacity="0">{animation('opacity','0;0;.7;.7;0;0','0;.025;.04;.10;.13;1')}{''.join(wave)}</g>
   <g opacity="0"><path d="M94 290V315" stroke="#84d4ff" stroke-width="1.4"/><animateTransform attributeName="transform" type="translate" values="0 0;0 0;260 0;260 0" keyTimes="0;.02;.12;1" dur="10s" repeatCount="indefinite"/>{animation('opacity','0;0;1;1;0;0','0;.02;.025;.12;.13;1')}</g>
  </g>
  <g transform="translate(405 304)">
   <g class="input-animated" opacity="0"><circle r="29" fill="url(#input-send-glow)"/>{animation('opacity','0;0;.65;0;0','0;.135;.155;.205;1')}</g>
   <g fill="none" stroke="#85bfe9" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M-13-1L11-12L3 13L-1 3L-13-1ZM-1 3L11-12"/>
    <animateTransform attributeName="transform" type="scale" values="1;1;.90;1.04;1;1" keyTimes="0;.138;.15;.165;.19;1" dur="10s" repeatCount="indefinite"/>
    {animation('stroke','#85bfe9;#85bfe9;#d1efff;#85bfe9;#85bfe9','0;.13;.155;.21;1')}
   </g>
  </g>
  <animateTransform attributeName="transform" type="translate" values="0 3;0 3;0 -2;0 -2;0 0;0 0;0 3" keyTimes="0;.02;.09;.14;.21;.94;1" dur="10s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1;.22 .7 .2 1;0 0 1 1;.3 0 .5 1;0 0 1 1;.4 0 .8 1"/>
 </g>
</svg>
'''
with target.open('x') as stream:
    stream.write(scene)
ET.parse(target)
print(target.resolve(), target.stat().st_size)
