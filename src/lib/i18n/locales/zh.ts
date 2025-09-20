const zh = {
  common: {
    privacyPolicy: '隐私政策',
    termsOfService: '服务协议',
    lastUpdated: '最后更新日期：',
    email: '电子邮箱：',
    address: '地址：',
    contactUs: '联系我们',
  },
  theme: {
    light: '亮色',
    dark: '暗色',
    system: '跟随',
    switchTheme: '切换主题',
    currentTheme: '当前主题'
  },
  nav: {
    home: '首页',
    features: '核心价值',
    advantages: '场景案例',
    pricing: '价格',
    download: '联系我们',
    about: '关于我们',
    docs: '文档中心',
    contact: '联系我们',
    tryNow: '立即试用'
  },
  home: {
    hero: {
      title: 'TeGo-智能体操作系统',
      tagline: 'A1·基建驱动 · 万物皆智能体 · 全链路智能协作平台',
      description: '用AI驱动企业服务全面升级，构建一站式智能化业务平台，实现各业务流程的无缝连接与智能化管理，助力企业数字化转型。打造一站式智能体平台，全面打通从终端接入、智能开发到LLM网关的全链路能力，为企业提供完整的AI解决方案。',
      cta: '立即咨询',
      secondaryCta: '产品演示',
      imgAlt: 'TeGo-AI智能体操作系统 - 企业智能体综合服务平台'
    },
    features: {
      title: '核心价值',
      subtitle: '发现 TeGo 如何驱动企业智能化转型',
    },
  },
  featuresSection: {
    title: '四大核心组件',
    subtitle: 'TeGo 企业智能体综合服务平台架构，为企业提供完整的智能体运行与治理能力',
    tabs: {
      collection: 'TeGo-OS',
      analysis: 'TeGo-Engine',
      organization: 'TeGo-MCP',
      gateway: 'TeGo-LLM'
    },
    collection: {
      title: 'TeGo-OS 企业智能操作系统',
      description: '全终端智能体接入，涵盖推荐类、通用类、行业类等多种智能体类型。统一用户管理、权限控制、应用市场和令牌管理。提供触发器、API集成、插件管理等核心服务。',
      tags: ['智能体接入', '权限控制', 'API集成', '插件管理']
    },
    analysis: {
      title: 'TeGo-Engine 智能体开发平台',
      description: '可视化拖拽界面，支持流程引擎和节点管理。渠道管理和数据追踪，实现业务流程自动化。权限控制和负载均衡，确保企业级稳定运行。',
      tags: ['可视化拖拽', '流程引擎', '数据追踪', '负载均衡']
    },
    organization: {
      title: 'TeGo-MCP 路由与注册中心',
      description: 'MCP服务发现与注册，实现智能体服务的动态路由。Agent管理和对话服务，支持多智能体协同工作。向量索引和检索增强（RAG），提升智能问答能力。',
      tags: ['服务发现', '动态路由', '多智能体协同', 'RAG增强']
    },
    gateway: {
      title: 'TeGo-LLM 模型网关',
      description: '集成OpenAI、Gemini、QWen、DeepSeek等主流大模型。负载均衡、路由分发、流速控制、接入安全。支持本地LLM模型部署，提供多模态智能交互能力。',
      tags: ['主流大模型', '负载均衡', '流速控制', '多模态交互']
    },
    moreFeatures: {
      title: 'TeGo 平台技术优势',
      taskManagement: {
        title: '状态数据完整可控',
        description: '可视化追踪每个节点的输入输出，支持历史重放和错误断点恢复，便于调试和排查问题。强大的触发机制与调度能力，支持定时器、Webhook、事件驱动等多种触发方式。'
      },
      habitTracking: {
        title: '本地部署与插件扩展',
        description: '企业可以完全私有化部署，并支持自定义节点和集成插件，便于安全控制和个性化开发。高性能架构，异步处理和错误隔离，确保系统稳定运行。'
      },
      financeManagement: {
        title: '发明专利：MCP动态服务器统一管理',
        description: '一种基于模型上下文协议的动态服务器统一管理平台及方法。通过配置创建、启动、停止MCP服务器，根据数据库配置动态生成和注册工具，提供完整的CRUD API。'
      }
    }
  },
  downloadSection: {
    title: '立即加入 TeGo，开启企业智能化转型之路',
    enterprise: {
      title: '企业咨询',
      description: '获取定制化解决方案',
      button: '立即咨询'
    },
    ios: {
      title: '产品演示',
      description: '在线体验平台功能',
      button: '预约演示'
    },
    android: {
      title: '技术文档',
      description: '了解技术架构与API',
      button: '查看文档'
    },
    web: {
      title: '私有化部署',
      description: '支持本地部署与定制',
      button: '了解详情'
    },
    docs: {
      title: '文档中心',
      description: '完整的技术文档和开发指南',
      button: '查看文档'
    }
  },
  pricingSection: {
    title: 'TeGo 定价与版本',
    subtitle: '为不同阶段与规模的团队提供灵活的智能体运行与治理能力',
    community: {
      badge: '永久免费',
      name: '社区版',
      lead: '体验智能体生态的全部功能',
      desc: '用于轻度使用的单机部署版，永久免费。',
      featuresTitle: '功能包含',
      features: [
        '智能体上架、关联应用管理',
        '成员管理',
        '域名管理、证书绑定',
        '智能体搜索'
      ],
      price: '¥0',
      period: '永久免费',
      cta: '立即使用'
    },
    subscription: {
      ribbon: 'On-Premise',
      badge: '年度订阅',
      name: '订阅版',
      lead: '按年度订阅的私有化版本',
      desc: '价格低至 ¥50,000/年',
      featuresTitle: '包含「社区版全部特性」，并提供',
      features: [
        '高可用、并发支持',
        '私有化环境部署',
        '服务可用性监控',
        'K8S / DevOps',
        'Open API 支持',
        '一对一客户支持',
        '委托部署与代运维服务'
      ],
      price: '¥50,000',
      period: '年起',
      cta: '联系销售'
    },
    enterprise: {
      ribbon: 'On-Premise',
      badge: '企业旗舰',
      name: 'TeGo-AI智能体操作系统',
      lead: '打造企业级智能体运行与治理平台',
      desc: '支持私有化集群部署、企业私有。',
      featuresTitle: '包含「订阅版特性」，并提供',
      features: [
        '高自主保证，高安全保障',
        '自主品牌形象',
        '高品质售后服务',
        '配合审计、部署、POC 支持服务'
      ],
      price: '定制报价',
      period: '联系咨询',
      cta: '联系销售'
    }
  },
  advantagesSection: {
    title: 'TeGo 典型应用场景',
    subtitle: '通过实际案例展示TeGo平台在不同行业和场景中的应用价值',
    values: {
      remember: 'TeGo-OS',
      think: 'TeGo-Engine',
      do: 'TeGo-MCP',
      live: 'TeGo-LLM'
    },
    efficiency: {
      title: 'TeGo-OS 企业智能操作系统',
      points: [
        '全终端智能体接入，涵盖推荐类、通用类、行业类等多种智能体类型',
        '统一用户管理、权限控制、应用市场和令牌管理',
        '提供触发器、API集成、插件管理等核心服务'
      ]
    },
    knowledge: {
      title: 'TeGo-Engine 智能体开发平台',
      points: [
        '可视化拖拽界面，支持流程引擎和节点管理',
        '渠道管理和数据追踪，实现业务流程自动化',
        '权限控制和负载均衡，确保企业级稳定运行'
      ]
    },
    decision: {
      title: 'TeGo-MCP 路由与注册中心',
      points: [
        'MCP服务发现与注册，实现智能体服务的动态路由',
        'Agent管理和对话服务，支持多智能体协同工作',
        '向量索引和检索增强（RAG），提升智能问答能力'
      ]
    },
    gateway: {
      title: 'TeGo-LLM 模型网关',
      points: [
        '集成OpenAI、Gemini、QWen、DeepSeek等主流大模型',
        '负载均衡、路由分发、流速控制、接入安全',
        '支持本地LLM模型部署，提供多模态智能交互能力'
      ]
    },
    scenarios: {
      title: '典型应用场景',
      professional: {
        title: '对话即操作智能助手',
        description: 'AI搜索直达服务，从自然语言表达需求到自动完成服务调用，重构用户交互体验。用户只需说一句话，就能跳转到对应服务页面完成操作。'
      },
      personal: {
        title: '智能诊疗助手 - 解放医生双手',
        description: 'AI实时诊疗助手通过语音识别与自然语言理解技术，辅助医生高效完成问诊记录与病历生成，支持与HIS等医院信息系统集成。'
      },
      enterprise: {
        title: '自动研究报告生成 - 解放分析师双手',
        description: '自动采集财报、市场数据与新闻资讯，只需一键便可生成涵盖摘要、市场分析、图表与风险评估等内容的完整报告。'
      }
    },
    features: {
      multiPlatform: {
        title: 'TeGo-LLM 模型网关',
        description: '负载均衡、路由分发、流速控制、接入安全。集成OpenAI、Gemini、QWen、DeepSeek等主流大模型以及本地LLM模型'
      },
      dataSecurity: {
        title: '基础设施与数据安全',
        description: '支持Redis、PostgreSQL、MySQL、MinIO、ClickHouse等基础设施，提供企业级数据安全保障与私有化部署能力'
      }
    },
    cta: '立即体验'
  },
  aboutSection: {
    title: 'TeGo 核心优势',
    subtitle: '用 AI 基建<span class="text-accent-400">驱动企业智能化未来</span>',
    description: '深圳市扎马未来科技有限公司专注于企业级AI解决方案与智能服务，拥有发明专利和多行业验证经验',
    vision: {
      title: 'TeGo vs 其他平台的差异化优势',
      paragraphs: [
        '<span class="text-primary font-medium">全场景自动化</span>：面向"AI + 业务流程"的自动化执行平台，不仅仅是LLM应用搭建平台（偏AI App前端）',
        '<span class="text-primary font-medium">面向后端自动化+多系统集成</span>：高度模块化，支持JS编写逻辑、函数、条件、循环等，相比可视化为主的平台具有更高灵活度'
      ]
    },
    features: [
      {
        title: "发明专利：MCP动态服务器统一管理",
        description: "一种基于模型上下文协议的动态服务器统一管理平台及方法，实现智能实例管理、服务动态发现、服务自动生成"
      },
      {
        title: "行业验证：多源异构数据融合",
        description: "已服务多个客户业务场景，完成典型AI模型部署及ROI跟踪，支持项目级别「验证-迭代-复制」闭环"
      },
      {
        title: "差异化AI服务能力",
        description: "针对不同行业与场景挖掘特征与策略，构建差异化推荐/风控/预测模型。已覆盖工业智能、金融AI、运营优化、内容生成等"
      },
      {
        title: "运行时UI生成",
        description: "当AI在执行任务过程中需要用户提供额外信息或进行决策确认时，能即时、动态地生成交互界面，实现流畅智能的人机协作"
      }
    ],
    footer: {
      prefix: 'TeGo-AI智能体操作系统',
      suffix: '，用AI基建驱动企业智能化未来。'
    },
    typingPhrases: [
      "用AI基建驱动企业智能化未来",
      "构建真正贯穿\"感知—理解—执行\"的企业智能基础设施",
      "万物皆智能体，全链路智能协作"
    ]
  },
  appDownload: {
    title: '立即体验 TeGo-AI智能体操作系统',
    appLogo: {
      title: 'TeGo-AI',
      alt: 'TeGo-AI智能体操作系统 Logo'
    },
    appIntro: {
      slogan: 'A1·基建驱动 · 万物皆智能体 · 全链路智能协作平台',
      tagline: '深圳市扎马未来科技有限公司 - 企业级AI解决方案与智能服务提供商'
    },
    whyChoose: '为什么选择 TeGo 平台？',
    features: {
      dataCollection: {
        title: 'TeGo-Engine 智能体引擎',
        description: '全场景自动化，支持AI和非AI混合流程，代码级灵活性与流程可观测'
      },
      aiContent: {
        title: 'TeGo-MCP 零代码框架',
        description: '发明专利技术，@Tool装饰器快速定义智能体工具，动态服务器管理'
      },
      taskManagement: {
        title: 'TeGo-Market 应用市场',
        description: '标准化智能体组件，即插即用，支持多模态输入与版本管理'
      },
      finance: {
        title: 'TeGo-LLM 模型网关',
        description: '集成OpenAI、Gemini、QWen、DeepSeek等主流大模型，负载均衡与安全控制'
      }
    },
    targetUsers: {
      title: '服务客户',
      executive: '大型企业',
      researcher: '中小企业',
      student: '政府机构',
      planner: '技术团队'
    },
    download: {
      heading: '立即启动 TeGo-AI智能体操作系统，开启企业智能化转型',
      webapp: {
        title: '在线演示',
        action: '预约产品演示'
      },
      appSection: '企业服务',
      ios: {
        title: '企业咨询',
        subtitle: '定制解决方案',
        description: '获取专属企业智能化方案',
        action: '立即咨询'
      },
      android: {
        title: '技术文档',
        subtitle: '架构说明',
        description: '查看完整的技术架构和API文档',
        action: '查看文档'
      },
      qrCode: {
        notice: '扫描二维码联系我们',
        description: '扫描二维码，获取TeGo-AI智能体操作系统专业服务',
        alt: 'TeGo-AI 企业服务联系二维码'
      }
    },
    wechatBrowser: {
      topArrow: '点击右上角菜单',
      selectBrowser: '选择在浏览器中打开',
      message: '请在浏览器中打开以获得最佳体验',
      button: '我知道了',
      notice: '微信内置浏览器提醒',
      instruction: '请点击右上角菜单 选择在浏览器中打开'
    }
  },
  contactPage: {
    title: '联系我们',
    subtitle: '有任何问题或建议？我们很乐意为您提供帮助。请填写下面的表单，我们会尽快与您联系。',
    form: {
      title: {
        label: '标题',
        placeholder: '请输入您的问题或咨询主题'
      },
      email: {
        label: '邮箱地址',
        placeholder: '请输入您的邮箱地址'
      },
      phone: {
        label: '手机号',
        placeholder: '请输入您的手机号（可选）'
      },
      content: {
        label: '详细内容',
        placeholder: '请详细描述您的问题、建议或需求...'
      },
      submit: '提交信息',
      submitting: '提交中...'
    },
    successMessage: '感谢您的联系！我们已收到您的信息，会在24小时内回复您。',
    errorMessage: '提交失败，请稍后重试。如问题持续存在，请直接发送邮件至 contact@zhama.com',
    info: {
      email: {
        title: '邮箱联系'
      },
      response: {
        title: '响应时间',
        time: '我们通常在24小时内回复'
      }
    }
  },
  footer: {
    products: '产品与服务',
    enterprise: 'TeGo-AI智能体操作系统',
    api: 'MCP框架与API集成',
    support: '支持与资源',
    helpCenter: '技术文档',
    tutorials: '部署指南',
    faq: '企业服务',
    copyright: '© 2025 深圳市扎马未来科技有限公司 版权所有 TeGo-AI智能体操作系统',
    icp: '粤ICP备2025426259号-1'
  }
};

export default zh; 