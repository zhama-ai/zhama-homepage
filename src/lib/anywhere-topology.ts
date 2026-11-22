import type { Locale } from '../data/types';
import englishInputs from '../assets/anywhere/workspace-input-scene-en_V1.0.svg?raw';
import englishLabels from '../assets/anywhere/workspace-labels-en_V1.0.svg?raw';
import englishExecutionLabels from '../assets/anywhere/workspace-foreground-execution-en_V1.0.svg?raw';
import workspaceInputs from '../assets/anywhere/workspace-input-scene_V1.29.svg?raw';
import workspacePlatform from '../assets/anywhere/workspace-platform_V1.25.svg?raw';
import workspaceTransfer from '../assets/anywhere/workspace-transfer_V1.18.svg?raw';
import workspaceLabels from '../assets/anywhere/workspace-labels_V1.19.svg?raw';
import executionLabels from '../assets/anywhere/workspace-foreground-execution_V1.19.svg?raw';
import chineseOutcomes from '../assets/anywhere/workspace-outcomes-zh_V2.4.svg?raw';
import englishOutcomes from '../assets/anywhere/workspace-outcomes-en_V2.4.svg?raw';

export function renderAnywhereTopology(locale: Locale = 'zh') {
 const zh = locale === 'zh';
  const labels = zh ? workspaceLabels : englishLabels;
  const inputs = zh ? workspaceInputs : englishInputs;
  const execution = zh ? executionLabels : englishExecutionLabels;
  const poster = '/images/anywhere/anywhere-workspace-floating_V1.19.webp';
  let sceneId = 0;
  const scopedFlow = (flow: string, suffix: string) => flow.replace(/(id="|url\(#)([a-zA-Z][\w-]*)/g, (_, prefix, id) => `${prefix}${id}-${suffix}`);
  const scene = (alt: string, flow = '') => {
   const suffix = `${locale}-${++sceneId}`;
   return `<div class="workspace-plane-base"><div class="workspace-scene"><img src="${poster}" width="1948" height="760" alt="${alt}" loading="lazy" decoding="async"/>${scopedFlow(flow, suffix)}${labels}</div></div>`;
  };
  const foreground = (name: string, width: number, height: number, labels: string) => `<span class="workspace-foreground workspace-foreground--${name}" aria-hidden="true"><img src="/images/anywhere/workspace-foreground-${name}_V1.19.webp" width="${width}" height="${height}" alt="" loading="lazy" decoding="async"/>${labels}</span>`;
  return `<div class="anywhere-topology anywhere-topology--workspace" data-topology-motion="paused" data-topology-locale="${locale}">
   <div class="workspace-planes">
    ${scopedFlow(workspaceTransfer, `${locale}-transfer`)}
    <div class="anywhere-motion-crop anywhere-motion-crop--inputs" role="img" aria-label="${zh ? '任务入口：PC、Web、平板、移动端，以及微信、QQ、企业微信、钉钉、飞书与 OA，可通过文字或语音交办任务。' : 'Task entry through PC, web, tablet, mobile, WeChat, QQ, WeCom, DingTalk, Feishu and OA, using text or voice.'}">${scopedFlow(inputs, `${locale}-inputs`)}</div>
    <div class="anywhere-motion-crop anywhere-motion-crop--platform">${scene(zh ? '数字员工协同：结合企业知识库、技能和系统连接，完成资料整理、方案文书与项目协作。' : 'Digital employees combine enterprise knowledge, skills and system connections to organize materials, prepare documents and collaborate on projects.', workspacePlatform)}${foreground('execution', 550, 83, execution)}</div>
    <div class="anywhere-motion-crop anywhere-motion-crop--outputs">${scopedFlow(zh ? chineseOutcomes : englishOutcomes, `${locale}-outcomes`)}</div>
   </div>
  </div>`;
}
