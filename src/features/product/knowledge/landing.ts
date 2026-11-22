import type { LandingTranslations } from '../landing-types';

export default {
  zh: {
    hero: {
      "lines": [
        "让结论回到原文"
      ],
      "summary": "按调用人权限检索企业知识，将带来源的片段用于答复与文稿；结论可定位原文，便于核对业务依据。"
    },
    pain: {
      title: '资料不断积累，工作不必反复从头开始',
      items: [
        '制度在文档里、经验在项目里，业务人员需要的依据却常常找不齐。',
        '同一问题反复查资料、问同事，已有方案难以直接用于下一项工作。',
        '文稿有结论却没有出处，复核时仍要重新翻找材料。',
      ],
    },
    concept: {
      title: '从企业资料到工作依据，让知识贯穿任务过程',
      body: '按知识库和文件夹归集资料，经解析、分片与索引后用于检索。数字员工在授权范围内查找相关内容，结合项目背景回答问题、编制材料，并通过引用保留原文线索。',
      labels: ['归集资料', '检索知识', '引用撰写', '原文复核'],
    },
    features: [
      { icon: 'book', title: '把制度与经验归入同一知识体系', body: '按知识库和文件夹管理制度、档案与历史方案，支持批量上传、版本查看、同名替换和重新处理。' },
      { icon: 'layers', title: '让文档内容成为可检索的片段', body: '按配置解析和清洗文档，建立内容分片与检索索引，维护片段启停状态，让更新后的资料继续服务业务。' },
      { icon: 'search', title: '围绕业务问题调好检索结果', body: '组合关键词、语义或混合检索，配置召回权重与阈值，通过检索测试查看命中内容并核对结果。' },
      { icon: 'file', title: '把原文依据带进回答与文稿', body: '将命中的资料用于问答和写作，通过引用定位原文片段与上下文，让业务复核沿着依据展开。' },
      { icon: 'folder', title: '在项目中延续背景与成果', body: '在项目空间保留工作背景、资料和成果。项目资料检索限定在对应项目和成员范围，为下一轮工作接续上下文。' },
      { icon: 'key', title: '按访问范围使用企业知识', body: '管理个人与共享知识库，按成员、部门和库内角色授权，数字员工按调用人权限检索。' },
      {"icon": "workflow", "title": "入库任务可跟踪，失败可续办", "body": "上传后查看解析、分段与索引任务，按配置使用 OCR 与图片处理；失败保留原因与尝试记录，支持重试、重新处理及原文件替换。"},
      {"icon": "wrench", "title": "知识内容随业务持续维护", "body": "查看原文件、阅读段落与检索切片，修改、增加、删除或停用不适用的段落；内容模型、嵌入模型与检索参数分别配置。"},
      {"icon": "layers", "title": "知识、项目与记忆各司其职", "body": "企业知识服务长期维护与跨任务复用；项目索引只服务当前项目和成员；工作记忆延续员工与使用者的上下文，三者不自动合并访问范围。"},
    ],
    scenarios: [
      { title: '制度答复有出处，方案编制有依据', body: '检索适用制度与业务规范，整理答复或方案正文，并关联原文片段。业务人员从引用回看依据，核对办理要求与材料内容。', flow: ['匹配适用制度', '带依据形成文稿', '回看原文复核'] },
      { title: '把做过的项目变成下一次工作的起点', body: '查找同类项目的历史方案与交付资料，在新项目内延续可用材料与背景，结合当前目标继续完善成果。', flow: ['查找同类项目', '带入资料与背景', '完善当前成果'] },
    ],
    benefits: [
      { title: '答复有企业依据', body: '制度、规范与业务资料进入实际工作。' },
      { title: '经验接续使用', body: '历史方案与项目成果成为下一项工作的材料。' },
      { title: '复核直达原文', body: '从引用定位片段与上下文，便于核对结论。' },
      { title: '知识使用有边界', body: '按知识授权与项目范围提供相关资料。' },
    ],
    closing: '让企业积累的知识，成为今天能用的工作能力',
    related: ['collaboration', 'governance'],
  },
  en: {
    hero: {
      lines: ['Put knowledge to work', 'Keep every answer sourced'],
      summary: 'Search authorized knowledge and carry cited passages into answers and drafts, with links to original sources.',
    },
    pain: {
      title: 'Build on what the company already knows',
      items: [
        'Policies live in documents and experience lives in projects, while the evidence a colleague needs remains scattered.',
        'Repeated searches and questions keep past proposals from becoming a practical starting point.',
        'A conclusion without its sources sends reviewers back through the same files.',
      ],
    },
    concept: {
      title: 'Carry enterprise evidence through the task',
      body: 'Organize materials by library and folder, then parse, chunk and index them for retrieval. Digital employees find authorized content, combine it with project context, and retain references when preparing answers and documents.',
      labels: ['Organize sources', 'Retrieve knowledge', 'Draft with evidence', 'Review originals'],
    },
    features: [
      { icon: 'book', title: 'Organize policies and experience together', body: 'Manage policies, archives and past proposals by library and folder, with bulk upload, file versions, replacement and reprocessing.' },
      { icon: 'layers', title: 'Turn documents into searchable passages', body: 'Parse and clean documents, build chunks and indexes, and manage active passages as source materials change.' },
      { icon: 'search', title: 'Tune retrieval around business questions', body: 'Use keyword, semantic or hybrid retrieval. Configure weights and thresholds, then test queries to review the returned passages.' },
      { icon: 'file', title: 'Keep evidence with answers and drafts', body: 'Use retrieved material in answers and documents. References lead to the original passage and surrounding context for review.' },
      { icon: 'folder', title: 'Carry project context forward', body: 'Retain project background, files and deliverables. Project retrieval stays within the relevant project and its members.' },
      { icon: 'key', title: 'Use knowledge within authorized boundaries', body: 'Manage personal and shared libraries by member, department and library role. Digital employees retrieve according to the caller’s permissions.' },
      {"icon": "workflow", "title": "Track ingestion and recover failed processing", "body": "Follow parsing, chunking and indexing jobs after upload, with OCR and image handling as configured. Failed jobs retain reasons and attempts for retry, reprocessing or source-file replacement."},
      {"icon": "wrench", "title": "Maintain knowledge as business content changes", "body": "Review source files, reading passages and retrieval chunks. Edit, add, remove or disable unsuitable passages. Configure content models, embedding models and retrieval settings separately."},
      {"icon": "layers", "title": "Give knowledge, project content and memory distinct roles", "body": "Enterprise knowledge supports maintained sources and reuse across tasks. Project indexing serves that project and its members. Work memory continues employee-user context; their access scopes do not merge automatically."},
    ],
    scenarios: [
      { title: 'Policy answers and proposals with evidence', body: 'Find applicable policies and business standards, prepare an answer or proposal, and attach the relevant passages. Reviewers follow references to check the requirements and supporting material.', flow: ['Find applicable policies', 'Draft with evidence', 'Review original passages'] },
      { title: 'Make past projects a useful starting point', body: 'Find proposals and deliverables from similar projects. Bring useful materials and context into the new project, then adapt the work to its current objective.', flow: ['Find similar projects', 'Carry materials forward', 'Refine the deliverable'] },
    ],
    benefits: [
      { title: 'Company-grounded answers', body: 'Put internal policies, standards and business material into the work.' },
      { title: 'Reusable experience', body: 'Use previous proposals and deliverables as working material.' },
      { title: 'Sources within reach', body: 'Follow references to passages and context when checking a conclusion.' },
      { title: 'Defined knowledge access', body: 'Provide material within library permissions and project boundaries.' },
    ],
    closing: 'Turn accumulated knowledge into working capability',
    related: ['collaboration', 'governance'],
  },
} satisfies LandingTranslations;
