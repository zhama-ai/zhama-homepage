import type { Locale } from '../../../data/types';
import type { SolutionModule } from '../types';
import { ui } from '../../../lib/ui';

type ApplianceFeature = {
  icon: string;
  title: string;
  description: string;
};

type ApplianceScenario = ApplianceFeature & {
  id: 'private-network' | 'governance' | 'local-model' | 'scale-out';
  headline: string;
  points: string[];
};

export interface AppliancePage {
  name: string;
  headline: string;
  description: string;
  action: string;
  highlights: { value: string; label: string }[];
  scenarios: ApplianceScenario[];
  specs: { name: string; value: string }[];
  delivery: ApplianceFeature[];
  titles: {
    scenarios: string;
    specs: string;
    delivery: string;
  };
}

export const appliancePage: Record<Locale, AppliancePage> = {
  zh: {
    name: 'TeGo Station',
    headline: '算力、模型与软件，\n一体交付',
    description: '内置 GB10 算力、预装 TeGo 与本地大模型，为企业提供软硬件一体的本地部署方案。',
    action: ui.zh.contact,
    highlights: [
      { value: 'GB10', label: 'Grace Blackwell 超级芯片' },
      { value: '128 GB', label: 'LPDDR5x CPU / GPU 共享内存' },
      { value: '2 TB', label: 'M.2 NVMe SSD 本地存储' },
    ],
    scenarios: [
      {
        id: 'private-network', icon: 'key', title: '高数据安全要求',
        headline: '敏感资料处理，留在企业内网',
        description: '面向客户资料、内部文档等敏感业务数据，在企业内网部署本地模型与存储。将资料处理所需的模型服务与运行环境放在企业内部，让数字员工围绕内部业务材料开展工作。',
        points: ['客户资料与内部文档处理', '本地模型与存储一体部署', '按企业内网环境组织交付'],
      },
      {
        id: 'governance', icon: 'shield', title: '高安全与强监管',
        headline: '让业务执行，衔接组织管控',
        description: '面向金融、政务等对访问与执行有明确要求的业务，将数字员工纳入组织管理。围绕人员访问、执行授权与操作审计配置平台，让业务开展与组织管控相衔接。',
        points: ['访问权限按组织要求配置', '执行授权明确操作范围', '操作审计保留过程记录'],
      },
      {
        id: 'local-model', icon: 'cpu', title: '缺少本地大模型',
        headline: '从算力到应用，一体准备就绪',
        description: '尚未建设本地大模型环境，也可以从业务应用开始。算力设备、预部署本地模型、推理服务与 TeGo 一体交付，完成系统配置、场景验证和管理员移交，衔接后续使用与运维。',
        points: ['GB10 算力与本地存储', '预部署模型与推理服务', '预装平台、配置与售后支持'],
      },
      {
        id: 'scale-out', icon: 'network', title: '并发需求持续增长',
        headline: '业务逐步增长，算力随需扩展',
        description: '业务从少量任务逐步走向更多人员与并行处理，算力也需要随负载增长。支持多台一体机并联部署，通过增加设备扩展算力与并发处理能力，结合实际业务负载安排后续扩容。',
        points: ['多台一体机并联部署', '随业务负载增加设备', '扩展算力与并发处理能力'],
      },
    ],
    specs: [
      { name: '算力芯片', value: 'NVIDIA GB10 Grace Blackwell，20 核 Arm CPU' },
      { name: '统一系统内存', value: '128 GB LPDDR5x，CPU / GPU 共享' },
      { name: '本地存储', value: '2 TB M.2 NVMe SSD，支持自加密' },
      { name: '有线网络', value: '1 个 RJ-45 10 GbE 接口，ConnectX-7 Smart NIC' },
      { name: '无线连接', value: 'Wi-Fi 7，蓝牙 5.4' },
      { name: 'USB 与显示', value: '4 个 USB4 Type-C，1 个 HDMI 2.1a' },
      { name: '尺寸与重量', value: '150 × 150 × 50.5 mm，1.2 kg' },
      { name: '基础系统', value: '预装 NVIDIA DGX OS，支持 NVIDIA AI 软件栈与 CUDA 生态' },
    ],
    delivery: [
      {
        icon: 'cpu',
        title: 'GB10 算力硬件',
        description: 'GB10 一体机，单机配备 128 GB 共享内存、2 TB SSD 与供电附件，支持多机并联部署。',
      },
      {
        icon: 'layers',
        title: '预部署本地模型',
        description: '预部署本地大模型与推理服务，完成模型配置与调试。',
      },
      {
        icon: 'monitor',
        title: '预装 TeGo',
        description: '预装数字员工平台，完成组织、账号、权限与业务模板配置。',
      },
      {
        icon: 'check',
        title: '系统配置与售后',
        description: '完成系统配置、场景验证与管理员移交，提供售后支持。',
      },
    ],
    titles: {
      scenarios: '适用场景',
      specs: '硬件配置',
      delivery: '一体机交付内容',
    },
  },
  en: {
    name: 'TeGo Station',
    headline: 'Compute, models and software.\nDelivered together.',
    description: 'GB10 compute, preinstalled TeGo and local models in one appliance for enterprise deployment.',
    action: ui.en.contact,
    highlights: [
      { value: 'GB10', label: 'Grace Blackwell Superchip' },
      { value: '128 GB', label: 'LPDDR5x shared CPU / GPU memory' },
      { value: '2 TB', label: 'M.2 NVMe SSD local storage' },
    ],
    scenarios: [
      {
        id: 'private-network', icon: 'key', title: 'Sensitive business data',
        headline: 'Keep sensitive work within your network',
        description: 'Deploy local models and storage within the enterprise network to process customer records, internal documents and other sensitive business materials. Bring the model services and runtime into your own environment so digital employees can work with internal business content.',
        points: ['Customer records and internal documents', 'Local models and storage deployed together', 'Delivery aligned with your internal network'],
      },
      {
        id: 'governance', icon: 'shield', title: 'Security and regulatory requirements',
        headline: 'Connect business execution with organizational control',
        description: 'Bring digital employees into your organization’s management practices for finance, government and other work with defined access and execution requirements. Configure user access, execution authorization and audit records around the way your organization operates.',
        points: ['Access configured for your organization', 'Authorization defines the scope of execution', 'Audit records retain the operation history'],
      },
      {
        id: 'local-model', icon: 'cpu', title: 'No local model infrastructure',
        headline: 'Compute, models and applications, ready together',
        description: 'Start with business applications even without an existing local model environment. Compute hardware, predeployed models, inference services and TeGo arrive together, with system setup, scenario validation and administrator handover to support ongoing use and operations.',
        points: ['GB10 compute and local storage', 'Predeployed models and inference services', 'Platform installation, setup and support'],
      },
      {
        id: 'scale-out', icon: 'network', title: 'Growing concurrent demand',
        headline: 'Expand compute as your business grows',
        description: 'As adoption moves from a few tasks to more people and parallel workloads, compute needs grow too. Connect multiple appliances and add devices to expand compute and concurrent processing capacity, planning each expansion around actual business demand.',
        points: ['Multiple appliances deployed together', 'Add devices as workloads grow', 'Expand compute and concurrent processing'],
      },
    ],
    specs: [
      { name: 'Compute chip', value: 'NVIDIA GB10 Grace Blackwell, 20-core Arm CPU' },
      { name: 'Unified system memory', value: '128 GB LPDDR5x, shared by CPU and GPU' },
      { name: 'Local storage', value: '2 TB M.2 NVMe SSD with self-encryption' },
      { name: 'Wired networking', value: '1 RJ-45 10 GbE port, ConnectX-7 Smart NIC' },
      { name: 'Wireless connectivity', value: 'Wi-Fi 7, Bluetooth 5.4' },
      { name: 'USB and display', value: '4 USB4 Type-C ports, 1 HDMI 2.1a port' },
      { name: 'Dimensions and weight', value: '150 × 150 × 50.5 mm, 1.2 kg' },
      { name: 'Base system', value: 'Preinstalled NVIDIA DGX OS with support for the NVIDIA AI software stack and CUDA ecosystem' },
    ],
    delivery: [
      {
        icon: 'cpu',
        title: 'GB10 compute hardware',
        description: 'GB10 appliances with 128 GB of shared memory, a 2 TB SSD and power accessories per unit, supporting multi-appliance deployment.',
      },
      {
        icon: 'layers',
        title: 'Predeployed local models',
        description: 'Predeployed local models and inference services, configured and validated for delivery.',
      },
      {
        icon: 'monitor',
        title: 'Preinstalled TeGo',
        description: 'The digital employee platform with organization, account, permission and business template configuration.',
      },
      {
        icon: 'check',
        title: 'Setup and support',
        description: 'System setup, scenario validation, administrator handover and after-sales support.',
      },
    ],
    titles: {
      scenarios: 'Where it fits',
      specs: 'Hardware specifications',
      delivery: 'What’s included',
    },
  },
};

export default {
  slug: 'appliance',
  order: 7,
  category: 'deployment',
  copy: {
    zh: {
      slug: 'appliance',
      icon: 'cpu',
      name: appliancePage.zh.name,
      tag: '软硬一体机',
      title: appliancePage.zh.headline,
      description: appliancePage.zh.description,
      scope: '软件、硬件、本地大模型与算力一体交付。',
      image: 'enterprise-connections',
      tasks: [],
    },
    en: {
      slug: 'appliance',
      icon: 'cpu',
      name: appliancePage.en.name,
      tag: 'AI appliance',
      title: appliancePage.en.headline,
      description: appliancePage.en.description,
      scope: 'Software, hardware, local models and compute, delivered together.',
      image: 'enterprise-connections',
      tasks: [],
    },
  },
  navigation: {
    zh: {
      name: '一体机解决方案',
      description: '软件、硬件、大模型与算力一体交付。',
      icon: 'cpu',
    },
    en: {
      name: 'AI appliance solution',
      description: 'Software, hardware, large language models and compute in one appliance.',
      icon: 'cpu',
    },
  },
} satisfies SolutionModule;
