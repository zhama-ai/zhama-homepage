export type SiteLocale = 'zh' | 'en';

export const legacySource = {
  "repository": "https://github.com/zhama-ai/zhama-homepage",
  "commit": "e61f09338aa2534916dc3b4822555b90927b4a40",
  "retrievedAt": "2026-11-12",
  "officialSite": "https://zhama.com",
  "articleCount": 36,
  "articleBodyPolicy": "Historical article body retained; local image paths and provenance frontmatter added."
} as const;

export const legalContent = {
  "zh": {
    "privacy": {
      "title": "隐私政策",
      "lastUpdated": "最后更新日期：2026年11月21日",
      "quickLinksLabel": "隐私与数据管理",
      "deletionLink": "注销账号与删除数据",
      "contactLink": "联系隐私支持",
      "sections": {
        "introduction": {
          "title": "适用范围与服务提供者",
          "content": "深圳市扎马星辰科技有限公司（以下简称“我们”）提供 Zhama 官网、TeGo 数字员工协作平台及 ZhaMa（扎马AI）公版移动应用。本政策说明这些服务如何访问、收集、使用、存储、提供和删除个人信息。",
          "content2": "使用不同服务器、数字分身、模型或扩展服务时，实际处理方和处理地点可能不同。企业私有部署及第三方自建服务器由相应部署方管理；请同时查看其隐私说明。我们仅在提供您使用的功能、保障服务安全或履行法定义务所需的范围内处理数据。"
        },
        "collection": {
          "title": "我们处理哪些信息及其用途",
          "content": "我们按实际使用的功能处理以下数据；设备权限并不意味着我们会读取或上传设备上的全部内容：",
          "items": [
            {
              "title": "账号与身份验证：",
              "content": "用户名、用户ID、昵称、邮箱、手机号及登录验证信息，用于注册、登录、账号管理与安全验证。通过 Google 或 Apple 登录时，处理相应服务提供的账号标识、您授权提供的姓名和邮箱（可能是 Apple 隐藏邮箱地址）及登录验证信息。绑定 Apple 登录会关联当前账号；用于账号删除时撤销 Apple 授权的凭据会加密保存在当前服务器。我们不会获取您的 Google 或 Apple 账号密码。"
            },
            {
              "title": "聊天与数字分身内容：",
              "content": "您发送的消息、提示词、AI回复、会话记录、记忆及知识库内容，用于回答问题、执行您发起的任务、保存历史及跨设备访问。相关内容会传输至所连接的服务器，并按当前数字分身配置交由相应模型或工具处理。"
            },
            {
              "title": "附件与音视频：",
              "content": "您选择或拍摄的照片、视频、文件及主动录制的语音、会议音频，用于附件分析、语音识别、转写和会议内容整理。云端处理需要上传对应内容；录音失败或上传未完成时，原始音频可能暂存在设备，供您重试或自行清理。"
            },
            {
              "title": "按需授权的设备数据：",
              "content": "在使用相应功能并给予授权后，处理工具请求涉及的位置、联系人和日历事件，用于您使用的助理功能。读取结果可能返回所连接的数字分身服务器。公版不使用后台定位权限，也不请求广泛读取整个照片或视频库的权限。"
            },
            {
              "title": "Apple 健康（HealthKit）：",
              "content": "默认关闭。仅在您于“设置 → 系统权限”主动开启分身查询，并在 Apple 健康中允许相应读取权限后，数字分身才能按您的指令读取步数、心率、睡眠及运动记录，包括查询涉及的时间、数据来源，以及运动记录中的距离和能量消耗。查询结果会返回您当前连接的服务器，并可由该分身配置的 AI 模型处理，用于回答本次个人健康与运动信息整理问题；相关结果可能随聊天和工具记录保存，适用下文的数据删除规则。不用于医疗诊断或治疗、广告、营销、用户画像或与该健康功能无关的数据挖掘，不会写入 Apple 健康。请在开启前了解当前服务器和模型服务方。"
            },
            {
              "title": "订阅与交易：",
              "content": "购买产品、订阅状态、订单或交易标识及购买凭证，用于验证购买、恢复权益及处理账单问题。银行卡等付款信息由 Apple App Store 或 Google Play 处理，我们不通过应用内购买界面收取您的完整银行卡信息。"
            },
            {
              "title": "通知与运行信息：",
              "content": "Firebase 安装标识、FCM 推送令牌或极光注册 ID（取决于安装渠道）、设备及操作系统信息、应用版本、IP地址和必要的请求或错误日志，用于通知送达、设备绑定、故障处理、账号与服务安全。通知内容可能包含任务或消息摘要，请自行管理锁屏通知展示。"
            },
            {
              "title": "官网咨询与访问：",
              "content": "您在联系表单或邮件中提交的联系方式、问题内容及必要的请求信息，用于回复咨询。经同意后，官网使用百度统计分析页面访问、来源渠道、设备环境及体验、下载、咨询等操作，涉及 Cookie、IP 地址、浏览器与设备信息、访问路径和推广渠道标识。可通过页脚的“访问统计设置”允许或停止后续采集。官网的自定义统计事件不包含咨询表单内容、姓名或联系方式；网页统计与公版移动应用的数据用途分别管理。"
            }
          ],
          "usageIntro": "公版移动应用的数据用途与限制：",
          "usageItems": [
            "用于账号、聊天、附件、会议、数字分身工具、订阅和通知等您使用的应用功能，以及保障这些功能安全运行。",
            "不用于广告追踪、定向营销或额外的用户行为分析；公版移动应用未启用 Firebase Analytics。",
            "您可以不使用录音、位置、联系人、日历、相机或附件功能，并在系统设置中撤销相应权限；相关功能将受到影响。",
            "请勿在缺少合法授权的情况下上传他人的会议录音、联系人或其他个人信息。"
          ]
        },
        "permissions": {
          "title": "设备权限与用户控制",
          "items": [
            "麦克风：用于语音输入和用户主动开始的会议录音。会议录制期间，Android会显示持续通知；切换应用后可继续当前录音，您可返回会议页停止。应用不会在开机时自动开始录音。",
            "相机与文件选择：用于扫码、拍摄或选取您指定的附件。Google Play公版使用系统选择器选择照片、视频或文件，不申请整个媒体库的广泛访问权限。",
            "位置、通讯录与日历：在对应功能需要并经您授权后使用。Google Play 版本不提供短信或通话记录读取、无障碍跨应用自动操作和应用内 APK 安装更新；Android 官网/OSS 下载版本及私有品牌可在您主动授权后提供相册读取、短信/通话及设备自动操作等能力，实际功能以设备系统和部署配置为准。",
            "Apple 健康：可随时在应用“设置 → 系统权限”关闭分身查询，并在 Apple 健康 App 中管理或撤销每类数据的读取权限。关闭后不再通过该功能读取；此前已返回服务器或保存到聊天中的结果不会因此自动删除，可删除相关聊天或联系 contact@zhama.com 申请删除。",
            "通知：用于接收消息、任务和服务状态提醒。可在应用或系统设置中管理通知；关闭通知不等于注销账号。"
          ]
        },
        "sharing": {
          "title": "第三方服务与信息提供",
          "content": "我们不出售或出租个人信息。为提供您使用的服务，可能向以下服务方提供完成相应功能所需的数据：",
          "items": [
            {
              "title": "Google Firebase Cloud Messaging（FCM）：",
              "content": "官方 iOS 和 Google Play 版本通过 FCM 提供推送通知，涉及安装标识、推送令牌及通知投递所需信息。iOS 通知还通过 Apple 推送通知服务（APNs）送达。FCM 不等同于启用 Google Analytics。"
            },
            {
              "title": "极光推送（JPush）：",
              "content": "官方 Android 官网/OSS 下载版本及私有品牌使用极光推送，由深圳市和讯华谷信息技术有限公司提供。为完成设备注册、消息投递及通知点击，SDK 会处理设备/应用标识、极光注册 ID、设备型号、操作系统、应用版本、网络/IP 信息及通知数据；推送在登录后启动，并向系统申请通知权限。您可通过系统通知权限管理提醒。我们不使用极光的广告营销或额外用户行为分析功能。第三方说明：https://www.jiguang.cn/license/privacy。"
            },
            {
              "title": "登录与应用商店：",
              "content": "启用 Google 或 Apple 登录时，由相应服务完成身份验证；Apple 登录绑定及注销还需要验证和撤销相应授权。Apple App Store 及 Google Play 提供应用分发、购买、订阅和支付验证服务。我们处理对应的账号授权信息、交易标识及验证结果。"
            },
            {
              "title": "AI模型、语音与工具服务：",
              "content": "根据您所连接服务器及数字分身的配置，聊天、附件或音频可能传输给相应AI模型、语音识别或工具提供方。主动开启并授权的 HealthKit 查询结果也可能由当前服务器及所配置的 AI 模型处理，仅用于您发起的健康与运动查询。例如，配置腾讯云语音识别时，音频及必要请求信息会传输给腾讯云。实际服务方随配置变化，请在使用前了解所选服务及其政策。"
            },
            {
              "title": "云基础设施与存储：",
              "content": "托管、数据库及对象存储服务方按照相应服务安排处理账号、内容、附件和必要运行数据，用于存储、传输及维护服务。"
            },
            {
              "title": "法律要求：",
              "content": "依法履行监管、司法或安全义务时，可能在必要范围内提供信息。发生涉及个人信息转移的合并或业务变更时，我们会按适用要求告知。"
            }
          ],
          "linksLabel": "相关服务方隐私说明",
          "links": [
            {
              "title": "百度统计隐私政策",
              "url": "https://tongji.baidu.com/web/help/article?id=330&type=0"
            },
            {
              "title": "Firebase隐私与数据处理",
              "url": "https://firebase.google.com/support/privacy"
            },
            {
              "title": "Google隐私政策",
              "url": "https://policies.google.com/privacy"
            },
            {
              "title": "Apple隐私政策",
              "url": "https://www.apple.com/legal/privacy/"
            },
            {
              "title": "腾讯云隐私政策",
              "url": "https://www.tencentcloud.com/document/product/301/17345"
            }
          ]
        },
        "security": {
          "title": "数据安全与处理地点",
          "content": "我们通过访问控制、身份验证及必要的技术措施保护个人信息。公版默认公共服务使用HTTPS等加密传输；用户自行连接的服务器及扩展服务的传输方式由其部署配置决定，请使用可信、支持加密连接的服务。数据的存储和处理地点取决于所连接的服务器、云服务和模型提供方，可能涉及跨境处理。请在选择服务及上传信息前了解相关处理安排；适用法律要求单独告知或取得同意时，应完成相应程序。没有任何系统能够保证绝对安全。"
        },
        "retention": {
          "title": "数据保留与删除范围",
          "content": "账号及云端会话、附件、记忆和知识库等个人数据，按您使用相应功能及保存内容的需要保留。您可以删除支持单独删除的内容，或发起注销账号，删除与该账号关联的个人数据和推送绑定。我们不会将停用或退出登录当作账号删除。",
          "content2": "共享组织资源或属于其他用户的数据需要先确认归属，必要时转移管理权限，避免误删他人数据。第三方服务独立保存的交易或安装记录适用其保留规则；例如Firebase安装标识的清理适用其官方数据处理说明。如特定数据依法必须保留，我们会说明数据类别、目的、依据和必要期限，限于相应用途，并在期限届满后删除或匿名化。"
        },
        "deletion": {
          "title": "注销 ZhaMa / TeGo 账号与删除数据",
          "intro": "即使已经卸载应用，您也可以通过下列邮件途径要求删除账号及相关个人数据，无须重新安装应用。",
          "steps": [
            "应用内自动注销：登录当前服务器，打开“设置”→“注销账号”，按页面要求核对账号并确认。符合注销条件时，服务器自动删除账号及关联个人数据并退出登录。",
            "通过邮件发起：发送邮件至contact@zhama.com，主题填写“ZhaMa / TeGo账号注销”。请提供注册邮箱或用户名、所连接的服务器地址，以及希望删除账号及关联数据的说明。请勿发送密码、验证码或完整付款信息。",
            "我们会进行必要的身份核验，并回复处理进度和结果。若存在共享资源、组织管理权限或其他需处理的事项，我们会说明原因和后续步骤；也可通过同一邮箱寻求帮助。",
            "注销将影响同一服务器上该账号在其他客户端的登录及数据访问。请先导出需要保留的个人内容，并在Apple或Google的订阅管理中检查、取消不再需要的自动续订；注销账号不代替应用商店的订阅管理。"
          ],
          "data": "删除范围包括该账号的个人资料、登录凭据与会话、个人聊天和附件、记忆与知识库、个人工作空间及推送绑定等关联个人数据。共享资源按归属处理，第三方或依法保留的数据适用上一节说明。",
          "timing": "应用内注销成功后即可退出该账号。对于邮件请求，我们会在30天内回复，并说明身份核验、处理情况和预计完成时间；需要补充信息或依法保留的数据会一并说明。",
          "emailAction": "发送账号注销请求",
          "emailHref": "mailto:contact@zhama.com?subject=ZhaMa%20%2F%20TeGo%20account%20deletion",
          "emailLabel": "隐私与注销联系邮箱："
        },
        "rights": {
          "title": "您的其他数据权利",
          "content": "在适用法律允许的范围内，您可以通过应用提供的功能或contact@zhama.com申请访问、更正、导出、删除部分个人信息或撤回授权，不必为每一次数据删除都注销整个账号。我们会核验身份并根据实际数据范围及适用要求处理。",
          "items": [
            "查看、更正个人资料及账号信息。",
            "删除支持单独删除的会话、附件或其他个人内容，或联系支持说明需要删除的数据。",
            "在系统设置中撤销设备权限及通知授权。",
            "就数据处理、第三方服务或个人信息副本提出询问。"
          ]
        },
        "children": {
          "title": "未成年人隐私",
          "content": "公版服务面向13岁及以上用户，不面向13岁以下儿童。未成年人应在适用要求下由监护人指导使用。若发现未满13岁的儿童向我们提供了个人信息，请通过contact@zhama.com联系我们处理。"
        },
        "changes": {
          "title": "政策更新",
          "content": "功能、第三方服务或数据处理方式发生变化时，我们会更新本政策及页面日期；涉及个人权益的重大变化时，将按适用要求进行提示或另行征求同意。"
        },
        "contact": {
          "title": "联系隐私支持",
          "content": "如需咨询隐私、行使数据权利或发起账号注销，请联系：",
          "items": [
            "邮箱：contact@zhama.com",
            "服务提供者：深圳市扎马星辰科技有限公司"
          ],
          "response": "我们会在30天内回复您的请求，核验身份后告知处理情况。请勿通过邮件发送密码或验证码。"
        }
      }
    },
    "terms": {
      "title": "服务协议",
      "lastUpdated": "最后更新日期：2025年3月23日",
      "sections": {
        "acceptance": {
          "title": "接受条款",
          "content": "欢迎使用TeGo 数字员工协作平台。通过访问和使用我们的服务，您表示同意受本服务条款的约束。如果您不同意这些条款，请不要使用我们的服务。",
          "content2": "我们保留随时修改这些条款的权利。您继续使用服务将被视为接受修改后的条款。"
        },
        "service": {
          "title": "服务描述",
          "content": "TeGo 数字员工协作平台是一个企业级多智能体自主协作平台，提供以下服务：",
          "items": [
            "多智能体协同调度与管理",
            "LAMP智能协作框架",
            "DAG并发调度引擎",
            "A2A开放协议支持",
            "私有化部署解决方案"
          ],
          "modification": "我们保留随时修改、暂停或终止任何服务的权利，恕不另行通知。"
        },
        "account": {
          "title": "用户账户",
          "content": "为了使用某些服务，您需要创建一个账户。您同意：",
          "promises": [
            "提供准确、完整的注册信息",
            "维护账户信息的准确性",
            "保护账户密码的安全性",
            "对账户下的所有活动承担责任"
          ],
          "restrictions": "您不得：",
          "restrictionItems": [
            "与他人共享账户凭据",
            "创建虚假账户",
            "违反任何适用法律或法规"
          ]
        },
        "conduct": {
          "title": "用户行为准则",
          "content": "使用我们的服务时，您不得从事以下活动：",
          "prohibited": [
            "上传恶意软件或有害代码",
            "侵犯他人的知识产权",
            "发送垃圾邮件或未经请求的通信",
            "干扰或破坏服务的正常运行",
            "尝试未经授权访问系统或数据"
          ]
        },
        "ip": {
          "title": "知识产权",
          "content": "服务中的所有内容，包括但不限于文本、图形、界面、代码等，均受知识产权法保护。",
          "userContent": "您保留对上传内容的所有权，但授予我们使用、修改和显示此类内容的许可。"
        },
        "disclaimer": {
          "title": "免责声明",
          "content": "我们的服务按\"现状\"提供，不提供任何明示或暗示的保证。我们不保证服务将：",
          "reasons": [
            "不间断或无错误地运行",
            "满足您的特定需求",
            "与第三方服务完全兼容",
            "完全安全或免受未经授权的访问"
          ]
        },
        "changes": {
          "title": "条款变更",
          "content": "我们保留随时修改这些条款的权利。重大变更将通过电子邮件或服务通知您。继续使用服务即表示接受修改后的条款。"
        },
        "disputes": {
          "title": "争议解决",
          "content": "因使用本服务产生的任何争议应通过友好协商解决。如协商不成，应提交有管辖权的法院解决。"
        },
        "contact": {
          "title": "联系信息",
          "content": "如您对这些条款有任何疑问，请通过以下方式联系我们：",
          "methods": [
            "邮箱：contact@zhama.com",
            "电话：18819810701",
            "地址：深圳市南山区科技园"
          ]
        }
      }
    }
  },
  "en": {
    "privacy": {
      "title": "Privacy Policy",
      "lastUpdated": "Last updated: November 21, 2026",
      "quickLinksLabel": "Privacy and data controls",
      "deletionLink": "Delete your account and data",
      "contactLink": "Contact privacy support",
      "sections": {
        "introduction": {
          "title": "Scope and service provider",
          "content": "Shenzhen Zhama Xingchen Technology Co., Ltd. (\"we\") provides the Zhama website, the TeGo digital employee collaboration platform, and the public ZhaMa mobile app (also named 扎马AI). This policy explains how these services access, collect, use, store, disclose and delete personal information.",
          "content2": "The processor and processing location can vary with the server, digital avatar, model or extension you choose. Enterprise private deployments and third-party self-hosted servers are managed by their operators; please also review their privacy notices. We process data as needed to provide the features you use, secure the service or meet legal obligations."
        },
        "collection": {
          "title": "Information we process and why",
          "content": "The data processed depends on the features you use. A device permission does not mean that we read or upload all content on the device:",
          "items": [
            {
              "title": "Account and authentication: ",
              "content": "Usernames, user IDs, display names, email addresses, phone numbers and login verification information support registration, sign-in, account management and security. Google or Apple sign-in processes the provider account identifier, the name and email you authorize the provider to supply (which may be an Apple private relay address), and sign-in verification information. Linking Apple associates that identity with your current account. Credentials needed to revoke Apple authorization upon account deletion are stored encrypted on your connected server. We do not receive your Google or Apple account password."
            },
            {
              "title": "Chats and digital avatar content: ",
              "content": "Messages, prompts, AI responses, conversation history, memories and knowledge-base content support answers, tasks you initiate, history and access across devices. Content is transmitted to the connected server and processed by the models or tools configured for the digital avatar."
            },
            {
              "title": "Attachments and audio/video: ",
              "content": "Photos, videos and files you select or capture, and voice or meeting audio you actively record, support attachment analysis, speech recognition, transcription and meeting summaries. Cloud processing requires uploading the relevant content. Failed or incomplete recordings may remain on your device so you can retry or remove them."
            },
            {
              "title": "Device data authorized for a feature: ",
              "content": "After you authorize the relevant feature, location, contacts and calendar events involved in a tool request are processed for that assistant feature. Results may be returned to the connected digital avatar server. The public app does not use background location permission or request broad access to your photo or video library."
            },
            {
              "title": "Apple Health (HealthKit): ",
              "content": "Off by default. Your avatar can read steps, heart rate, sleep and workout records at your request only after you enable avatar queries in Settings → System permissions and allow the corresponding read permissions in Apple Health. Results can include the relevant times and data sources, and workout distance and energy burned. Query results are returned to your connected server and may be processed by the AI model configured for that avatar to answer your personal health and fitness organization request. Results may be retained in chat and tool records under the deletion rules below. They are not used for medical diagnosis or treatment, advertising, marketing, profiling or data mining unrelated to this health feature. The app does not write to Apple Health. Review the connected server and model provider before enabling this feature."
            },
            {
              "title": "Subscriptions and transactions: ",
              "content": "Products purchased, subscription status, order or transaction identifiers and purchase receipts support purchase validation, entitlement restoration and billing support. Apple App Store or Google Play handles payment details; we do not collect full payment card details through in-app purchases."
            },
            {
              "title": "Notifications and operational data: ",
              "content": "Firebase installation IDs, FCM registration tokens or JPush registration IDs (depending on the distribution channel), device and operating-system details, app version, IP addresses and necessary request or error logs support delivery, device binding, troubleshooting and account or service security. Notifications may contain task or message summaries; manage lock-screen previews as needed."
            },
            {
              "title": "Website inquiries and visits: ",
              "content": "Contact details and messages submitted by form or email, together with necessary request information, support replies to inquiries. With consent, the website uses Baidu Tongji to measure page visits, traffic sources, device environments and actions such as product trial, download and inquiry interactions. This involves cookies, IP addresses, browser and device information, page paths and campaign identifiers. Use “Analytics preferences” in the footer to allow or stop future collection. Our custom analytics events exclude inquiry form contents, names and contact details. Website statistics are managed separately from the public mobile app."
            }
          ],
          "usageIntro": "Purposes and limits for the public mobile app:",
          "usageItems": [
            "Data supports the account, chat, attachment, meeting, digital avatar tool, subscription and notification features you use, and their secure operation.",
            "We do not use this data for advertising tracking, targeted marketing or additional user-behavior analytics. Firebase Analytics is not enabled in the public mobile app.",
            "You may choose not to use recording, location, contacts, calendar, camera or attachment features and revoke device permissions in system settings. The corresponding features will be affected.",
            "Do not upload recordings, contacts or other personal information about others without a lawful basis or necessary authorization."
          ]
        },
        "permissions": {
          "title": "Device permissions and controls",
          "items": [
            "Microphone: Voice input and meetings you actively start recording. Android displays an ongoing notification during meeting recording. An active recording can continue when you switch apps; return to the meeting page to stop it. Recording does not start automatically at boot.",
            "Camera and file selection: Scanning, capture and attachments you select. The Google Play public app uses system pickers for photos, videos or files and does not request broad media-library access.",
            "Location, contacts and calendar: Used after authorization when needed for the relevant feature. The Google Play build excludes SMS/call-log reading, accessibility-driven cross-app automation and in-app APK installation updates. Official Android website/OSS downloads and private brands can offer photo-library access, SMS/call features and device automation after you actively authorize them; availability depends on the device and deployment.",
            "Apple Health: Turn avatar queries off at any time in Settings → System permissions, and manage or revoke individual read permissions in Apple Health. Turning the feature off prevents further reads through it but does not automatically delete results already returned to the server or saved in chats. Delete the relevant chats or request deletion at contact@zhama.com.",
            "Notifications: Messages, task updates and service status. Manage them in the app or system settings. Turning off notifications does not delete an account."
          ]
        },
        "sharing": {
          "title": "Service providers and disclosures",
          "content": "We do not sell or rent personal information. The following providers may receive the information needed to deliver the features you use:",
          "items": [
            {
              "title": "Google Firebase Cloud Messaging (FCM): ",
              "content": "Official iOS and Google Play builds use FCM for notifications, involving installation IDs, registration tokens and delivery information. iOS also uses Apple Push Notification service (APNs). FCM does not mean that Google Analytics is enabled."
            },
            {
              "title": "JPush (Aurora): ",
              "content": "Official Android website/OSS downloads and private brands use JPush, provided by Shenzhen Hexun Huagu Information Technology Co., Ltd. For device registration, delivery and notification taps, the SDK processes device/app identifiers, JPush registration IDs, device model, operating system, app version, network/IP information and notification data. Push starts after sign-in and requests notification permission from the system. You can manage alerts through system notification permissions. We do not enable its advertising, marketing or additional user-behavior analytics features. Provider notice: https://www.jiguang.cn/license/privacy."
            },
            {
              "title": "Sign-in and app stores: ",
              "content": "Google or Apple provides authentication when its sign-in option is enabled. Apple linking and account deletion also require verification or revocation of the corresponding authorization. Apple App Store and Google Play provide distribution, purchases, subscriptions and payment verification. We process the corresponding authorization information, transaction identifiers and validation results."
            },
            {
              "title": "AI, speech and tool providers: ",
              "content": "Depending on the connected server and digital avatar configuration, chats, attachments or audio may be sent to the configured AI model, speech-recognition or tool provider. HealthKit query results that you actively enable and authorize may also be processed by the connected server and configured AI model, solely for the health and fitness query you initiate. For example, a configuration using Tencent Cloud speech recognition sends audio and necessary request information to Tencent Cloud. Providers vary by configuration; review the selected service and its policy before use."
            },
            {
              "title": "Cloud infrastructure and storage: ",
              "content": "Hosting, database and object-storage providers process accounts, content, attachments and necessary operational data under the relevant service arrangements for storage, transmission and maintenance."
            },
            {
              "title": "Legal requirements: ",
              "content": "We may disclose necessary information to meet regulatory, judicial or security obligations. We will provide required notice of a merger or business change involving a transfer of personal information."
            }
          ],
          "linksLabel": "Related provider privacy notices",
          "links": [
            {
              "title": "Baidu Tongji privacy policy",
              "url": "https://tongji.baidu.com/web/help/article?id=330&type=0"
            },
            {
              "title": "Firebase privacy and data processing",
              "url": "https://firebase.google.com/support/privacy"
            },
            {
              "title": "Google Privacy Policy",
              "url": "https://policies.google.com/privacy"
            },
            {
              "title": "Apple Privacy Policy",
              "url": "https://www.apple.com/legal/privacy/"
            },
            {
              "title": "Tencent Cloud Privacy Policy",
              "url": "https://www.tencentcloud.com/document/product/301/17345"
            }
          ]
        },
        "security": {
          "title": "Security and processing locations",
          "content": "We use access controls, authentication and necessary technical measures to protect personal information. Default public services use encrypted transport such as HTTPS. Transport for servers and extensions you connect yourself depends on their deployment; use trusted services with encrypted connections. Storage and processing locations depend on the connected server, cloud service and model provider and may involve international processing. Review these arrangements before selecting a service or uploading information. Separate notice or consent must be provided where applicable requirements call for it. No system can guarantee absolute security."
        },
        "retention": {
          "title": "Retention and deletion scope",
          "content": "Accounts and personal cloud data such as conversations, attachments, memories and knowledge bases are retained as needed for the features and content you choose to keep. You may delete supported individual content or request account deletion to remove associated personal data and push bindings. Deactivation or sign-out is not account deletion.",
          "content2": "Ownership of shared organizational resources or other users’ data must be checked, and administrative responsibility transferred where necessary, to avoid deleting others’ data. Transaction or installation records held independently by providers follow their retention rules; Firebase installation-ID removal, for example, follows its official data-processing notice. If a legal requirement requires particular data to be retained, we will explain the categories, purpose, basis and necessary period, limit its use accordingly, and delete or anonymize it when that period ends."
        },
        "deletion": {
          "title": "Delete your ZhaMa / TeGo account and data",
          "intro": "You can request account and associated personal-data deletion by email even after uninstalling the app. You do not need to reinstall it.",
          "steps": [
            "Automatic in-app deletion: Sign in to the relevant server, open Settings → Delete account, and verify the account and confirm as prompted. When the deletion conditions are met, the server automatically deletes the account and associated personal data and signs you out.",
            "Request by email: Write to contact@zhama.com with the subject “ZhaMa / TeGo account deletion”. Include your registered email or username, the connected server address, and a request to delete the account and associated data. Do not send passwords, verification codes or full payment details.",
            "We will perform necessary identity checks and respond with progress and the outcome. If shared resources, organizational administration or other matters require attention, we will explain the reason and next steps. The same email provides support.",
            "Deletion affects this account’s sign-in and data access in other clients on the same server. Export personal content you need first, and review or cancel unwanted auto-renewing subscriptions in Apple or Google subscription settings. Account deletion does not replace app-store subscription management."
          ],
          "data": "Deletion covers associated personal information including profile, credentials and sessions, personal chats and attachments, memories and knowledge bases, personal workspaces and push bindings. Shared resources follow ownership rules; provider-held or legally retained data follows the section above.",
          "timing": "Successful in-app deletion signs you out of that account. For email requests, we will respond within 30 days with the verification status, processing details and expected completion time, including any further information needed or legally required retention.",
          "emailAction": "Email an account deletion request",
          "emailHref": "mailto:contact@zhama.com?subject=ZhaMa%20%2F%20TeGo%20account%20deletion",
          "emailLabel": "Privacy and deletion email: "
        },
        "rights": {
          "title": "Other data rights",
          "content": "Where applicable requirements allow, use the app’s controls or contact@zhama.com to request access, correction, export, deletion of specific personal information or withdrawal of authorization without deleting the whole account for every request. We will verify identity and handle the request based on the data involved and applicable requirements.",
          "items": [
            "View and correct profile and account information.",
            "Delete conversations, attachments or other content with available controls, or describe the data to be deleted to support.",
            "Revoke device permissions and notification authorization in system settings.",
            "Ask about processing, service providers or copies of personal information."
          ]
        },
        "children": {
          "title": "Children and teens",
          "content": "The public service is intended for users aged 13 and above, not children under 13. Teens should use it with guardian guidance where required. If you learn that a child under 13 has provided personal information to us, contact contact@zhama.com so we can address it."
        },
        "changes": {
          "title": "Policy updates",
          "content": "We will update this policy and its date when features, providers or processing practices change. Material changes affecting personal rights will receive notice or separate consent where required."
        },
        "contact": {
          "title": "Contact privacy support",
          "content": "For privacy questions, data-rights requests or account deletion, contact:",
          "items": [
            "Email: contact@zhama.com",
            "Service provider: Shenzhen Zhama Xingchen Technology Co., Ltd."
          ],
          "response": "We will respond within 30 days and explain processing after verifying identity. Do not email passwords or verification codes."
        }
      }
    },
    "terms": {
      "title": "Terms of Service",
      "lastUpdated": "Last Updated: March 23, 2025",
      "sections": {
        "acceptance": {
          "title": "Acceptance of Terms",
          "content": "Welcome to the TeGo digital employee collaboration platform. By accessing or using our services, you agree to these Terms of Service. If you do not agree, please do not use the services.",
          "content2": "We may update these terms from time to time. Your continued use of the services means you accept the updated terms."
        },
        "service": {
          "title": "Service Description",
          "content": "The TeGo digital employee collaboration platform is an enterprise AI workforce platform that provides:",
          "items": [
            "Multi-agent orchestration and management",
            "LAMP-based agent collaboration",
            "DAG scheduling engine",
            "A2A open protocol support",
            "On-prem deployment options"
          ],
          "modification": "We reserve the right to modify, suspend or terminate any service at any time without prior notice."
        },
        "account": {
          "title": "User Accounts",
          "content": "To use certain services, you need to create an account. You agree to:",
          "promises": [
            "Provide accurate and complete registration information",
            "Maintain the accuracy of account information",
            "Protect the security of your account password",
            "Take responsibility for all activities under your account"
          ],
          "restrictions": "You may not:",
          "restrictionItems": [
            "Share account credentials with others",
            "Create false accounts",
            "Violate any applicable laws or regulations"
          ]
        },
        "conduct": {
          "title": "User Conduct Guidelines",
          "content": "When using our services, you may not engage in the following activities:",
          "prohibited": [
            "Upload malware or harmful code",
            "Infringe on others' intellectual property rights",
            "Send spam or unsolicited communications",
            "Interfere with or disrupt the normal operation of services",
            "Attempt unauthorized access to systems or data"
          ]
        },
        "ip": {
          "title": "Intellectual Property",
          "content": "All content in the service, including but not limited to text, graphics, interfaces, and code, is protected by intellectual property laws.",
          "userContent": "You retain ownership of uploaded content but grant us a license to use, modify, and display such content."
        },
        "disclaimer": {
          "title": "Disclaimer",
          "content": "Our services are provided \"as is\" without any express or implied warranties. We do not guarantee that the services will:",
          "reasons": [
            "Operate uninterrupted or error-free",
            "Meet your specific needs",
            "Be fully compatible with third-party services",
            "Be completely secure or free from unauthorized access"
          ]
        },
        "changes": {
          "title": "Terms Changes",
          "content": "We reserve the right to modify these terms at any time. We will notify you of material changes by email or through the service. Continued use of the services means you accept the updated terms."
        },
        "disputes": {
          "title": "Dispute Resolution",
          "content": "Any dispute arising from use of the services should first be resolved through good-faith discussion. If no resolution is reached, the dispute shall be submitted to a court with jurisdiction."
        },
        "contact": {
          "title": "Contact Information",
          "content": "If you have questions about these terms, please contact us at:",
          "methods": [
            "Email: contact@zhama.com",
            "Phone: 18819810701",
            "Address: Shenzhen Science and Technology Park, Nanshan District"
          ]
        }
      }
    }
  }
} as const;

export const releaseCatalogs = {
  "desktop": {
    "schemaVersion": 1,
    "brand": "tego",
    "kind": "desktop",
    "version": "v5.13.0",
    "releaseDate": "2026-11-11T21:43:29Z",
    "platforms": {
      "linux": {
        "arm64": {
          "AppImage": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/linux/arm64/TeGo_5.13.0_aarch64.AppImage",
          "deb": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/linux/arm64/TeGo_5.13.0_arm64.deb"
        },
        "x64": {
          "AppImage": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/linux/x64/TeGo_5.13.0_amd64.AppImage",
          "deb": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/linux/x64/TeGo_5.13.0_amd64.deb"
        }
      },
      "macos": {
        "arm64": {
          "dmg": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/macos/arm64/TeGo_5.13.0_aarch64.dmg"
        },
        "x64": {
          "dmg": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/macos/x64/TeGo_5.13.0_x64.dmg"
        }
      },
      "windows": {
        "x64": {
          "exe": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/windows/x64/TeGo-5.13.0-windows-x64-setup.exe"
        },
        "x86": {
          "exe": "https://cdn.zhama.com.cn/releases/tego/desktop/v3.9.8/windows/x86/TeGo-3.9.8-windows-x86-setup.exe"
        }
      },
      "kylin": {
        "arm64": {
          "flatpak": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/kylin/arm64/tego-ai-studio-5.13.0-arm64.flatpak",
          "tar": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/kylin/arm64/tego-ai-studio-5.13.0-arm64.tar"
        }
      }
    },
    "targetVersions": {
      "linux/arm64": "v5.13.0",
      "linux/x64": "v5.13.0",
      "macos/arm64": "v5.13.0",
      "macos/x64": "v5.13.0",
      "windows/x64": "v5.13.0",
      "windows/x86": "v3.9.8",
      "kylin/arm64": "v5.13.0"
    },
    "targetDates": {
      "linux/arm64": "2026-11-11T21:36:20Z",
      "linux/x64": "2026-11-11T21:33:33Z",
      "macos/arm64": "2026-11-11T21:20:00Z",
      "macos/x64": "2026-11-11T21:33:38Z",
      "windows/x64": "2026-11-11T21:36:22Z",
      "windows/x86": "2026-05-21T21:34:46Z",
      "kylin/arm64": "2026-11-11T21:43:29Z"
    }
  },
  "mobile": {
    "schemaVersion": 1,
    "brand": "tego",
    "kind": "mobile",
    "version": "v5.13.0",
    "releaseDate": "2026-11-11T21:28:07Z",
    "platforms": {
      "android": {
        "downloads": {
          "apk": "https://cdn.zhama.com.cn/releases/tego/mobile/v5.13.0/android/tego-5.13.0-release.apk"
        }
      },
      "ios": {
        "downloads": {
          "testflight": "https://testflight.apple.com/join/JF7CaFqa"
        }
      }
    },
    "targetVersions": {
      "android": "v5.13.0",
      "ios": "v5.13.0"
    },
    "targetDates": {
      "android": "2026-11-11T21:25:46Z",
      "ios": "2026-11-11T21:28:07Z"
    }
  },
  "studio": {
    "schemaVersion": 1,
    "brand": "tego",
    "kind": "studio",
    "version": "v5.13.0",
    "releaseDate": "2026-11-11T21:31:21Z",
    "platforms": {
      "macos": {
        "arm64": {
          "dmg": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/macos/arm64/Tego-Studio-5.13.0-mac-arm64.dmg",
          "zip": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/macos/arm64/Tego-Studio-5.13.0-mac-arm64.zip"
        },
        "x64": {
          "dmg": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/macos/x64/Tego-Studio-5.13.0-mac-x64.dmg",
          "zip": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/macos/x64/Tego-Studio-5.13.0-mac-x64.zip"
        }
      },
      "windows": {
        "x64": {
          "exe": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/windows/x64/Tego-Studio-5.13.0-win-x64.exe"
        }
      },
      "linux": {
        "x64": {
          "tar.gz": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/linux/x64/Tego-Studio-5.13.0-linux-x64.tar.gz",
          "AppImage": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/linux/x64/Tego-Studio-5.13.0-linux-x86_64.AppImage"
        },
        "arm64": {
          "AppImage": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/linux/arm64/Tego-Studio-5.13.0-linux-arm64.AppImage",
          "tar.gz": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/linux/arm64/Tego-Studio-5.13.0-linux-arm64.tar.gz"
        }
      }
    },
    "targetVersions": {
      "macos/arm64": "v5.13.0",
      "macos/x64": "v5.13.0",
      "windows/x64": "v5.13.0",
      "linux/x64": "v5.13.0",
      "linux/arm64": "v5.13.0"
    },
    "targetDates": {
      "macos/arm64": "2026-11-11T21:30:50Z",
      "macos/x64": "2026-11-11T21:30:59Z",
      "windows/x64": "2026-11-11T21:31:07Z",
      "linux/x64": "2026-11-11T21:31:12Z",
      "linux/arm64": "2026-11-11T21:31:21Z"
    }
  }
} as const;

export interface ReleaseDownload {
  product: 'desktop' | 'mobile' | 'studio';
  platform: string;
  architecture: string;
  format: string;
  url: string;
  version: string;
  releasedAt: string;
}

export const releaseDownloads: ReleaseDownload[] = [
  {
    "product": "desktop",
    "platform": "linux",
    "architecture": "arm64",
    "format": "AppImage",
    "url": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/linux/arm64/TeGo_5.13.0_aarch64.AppImage",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:36:20Z"
  },
  {
    "product": "desktop",
    "platform": "linux",
    "architecture": "arm64",
    "format": "deb",
    "url": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/linux/arm64/TeGo_5.13.0_arm64.deb",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:36:20Z"
  },
  {
    "product": "desktop",
    "platform": "linux",
    "architecture": "x64",
    "format": "AppImage",
    "url": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/linux/x64/TeGo_5.13.0_amd64.AppImage",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:33:33Z"
  },
  {
    "product": "desktop",
    "platform": "linux",
    "architecture": "x64",
    "format": "deb",
    "url": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/linux/x64/TeGo_5.13.0_amd64.deb",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:33:33Z"
  },
  {
    "product": "desktop",
    "platform": "macos",
    "architecture": "arm64",
    "format": "dmg",
    "url": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/macos/arm64/TeGo_5.13.0_aarch64.dmg",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:20:00Z"
  },
  {
    "product": "desktop",
    "platform": "macos",
    "architecture": "x64",
    "format": "dmg",
    "url": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/macos/x64/TeGo_5.13.0_x64.dmg",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:33:38Z"
  },
  {
    "product": "desktop",
    "platform": "windows",
    "architecture": "x64",
    "format": "exe",
    "url": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/windows/x64/TeGo-5.13.0-windows-x64-setup.exe",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:36:22Z"
  },
  {
    "product": "desktop",
    "platform": "windows",
    "architecture": "x86",
    "format": "exe",
    "url": "https://cdn.zhama.com.cn/releases/tego/desktop/v3.9.8/windows/x86/TeGo-3.9.8-windows-x86-setup.exe",
    "version": "v3.9.8",
    "releasedAt": "2026-05-21T21:34:46Z"
  },
  {
    "product": "desktop",
    "platform": "kylin",
    "architecture": "arm64",
    "format": "flatpak",
    "url": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/kylin/arm64/tego-ai-studio-5.13.0-arm64.flatpak",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:43:29Z"
  },
  {
    "product": "desktop",
    "platform": "kylin",
    "architecture": "arm64",
    "format": "tar",
    "url": "https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/kylin/arm64/tego-ai-studio-5.13.0-arm64.tar",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:43:29Z"
  },
  {
    "product": "mobile",
    "platform": "android",
    "architecture": "",
    "format": "apk",
    "url": "https://cdn.zhama.com.cn/releases/tego/mobile/v5.13.0/android/tego-5.13.0-release.apk",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:25:46Z"
  },
  {
    "product": "mobile",
    "platform": "ios",
    "architecture": "",
    "format": "testflight",
    "url": "https://testflight.apple.com/join/JF7CaFqa",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:28:07Z"
  },
  {
    "product": "studio",
    "platform": "macos",
    "architecture": "arm64",
    "format": "dmg",
    "url": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/macos/arm64/Tego-Studio-5.13.0-mac-arm64.dmg",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:30:50Z"
  },
  {
    "product": "studio",
    "platform": "macos",
    "architecture": "arm64",
    "format": "zip",
    "url": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/macos/arm64/Tego-Studio-5.13.0-mac-arm64.zip",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:30:50Z"
  },
  {
    "product": "studio",
    "platform": "macos",
    "architecture": "x64",
    "format": "dmg",
    "url": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/macos/x64/Tego-Studio-5.13.0-mac-x64.dmg",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:30:59Z"
  },
  {
    "product": "studio",
    "platform": "macos",
    "architecture": "x64",
    "format": "zip",
    "url": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/macos/x64/Tego-Studio-5.13.0-mac-x64.zip",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:30:59Z"
  },
  {
    "product": "studio",
    "platform": "windows",
    "architecture": "x64",
    "format": "exe",
    "url": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/windows/x64/Tego-Studio-5.13.0-win-x64.exe",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:31:07Z"
  },
  {
    "product": "studio",
    "platform": "linux",
    "architecture": "x64",
    "format": "tar.gz",
    "url": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/linux/x64/Tego-Studio-5.13.0-linux-x64.tar.gz",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:31:12Z"
  },
  {
    "product": "studio",
    "platform": "linux",
    "architecture": "x64",
    "format": "AppImage",
    "url": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/linux/x64/Tego-Studio-5.13.0-linux-x86_64.AppImage",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:31:12Z"
  },
  {
    "product": "studio",
    "platform": "linux",
    "architecture": "arm64",
    "format": "AppImage",
    "url": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/linux/arm64/Tego-Studio-5.13.0-linux-arm64.AppImage",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:31:21Z"
  },
  {
    "product": "studio",
    "platform": "linux",
    "architecture": "arm64",
    "format": "tar.gz",
    "url": "https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/linux/arm64/Tego-Studio-5.13.0-linux-arm64.tar.gz",
    "version": "v5.13.0",
    "releasedAt": "2026-11-11T21:31:21Z"
  }
];

export { legacyPageRoutes as legacyRoutes } from '../../shared/seo-routes.mjs';
import { legacyPageRoutes as legacyRoutes, legacyTarget } from '../../shared/seo-routes.mjs';

export const preservedLegacyPaths = [
  "download",
  "blog",
  "contact",
  "privacy",
  "terms"
] as const;

export function legacyDestination(locale: SiteLocale, route: (typeof legacyRoutes)[number]): string {
  return legacyTarget(locale, route);
}

export const releaseArchive = {
  "indexUrl": "/releases/index.json",
  "defaultVersion": "v5.13.0",
  "versions": [
    "v5.13.0",
    "v5.12.0",
    "v5.11.0",
    "v5.10.0",
    "v5.9.1",
    "v5.9.0",
    "v5.8.1",
    "v5.8.0",
    "v5.7.1",
    "v5.6.0",
    "v5.5.1",
    "v5.5.0",
    "v5.3.0",
    "v5.2.0",
    "v5.1.0",
    "v5.0.0",
    "v4.38.0",
    "v4.37.1",
    "v4.37.0",
    "v4.36.0",
    "v4.35.0",
    "v4.34.1",
    "v4.34.0",
    "v4.33.1",
    "v4.33.0",
    "v4.32.0",
    "v4.31.0",
    "v4.30.5",
    "v4.30.4",
    "v4.30.3",
    "v4.30.2",
    "v4.30.1",
    "v4.29.7",
    "v4.29.6",
    "v4.29.4",
    "v4.29.3",
    "v4.29.2",
    "v4.29.0",
    "v4.28.0",
    "v4.27.0",
    "v4.26.0",
    "v4.25.16",
    "v4.25.13",
    "v4.25.12",
    "v4.25.11",
    "v4.25.9",
    "v4.25.7",
    "v4.25.6",
    "v4.25.5",
    "v4.25.4",
    "v4.25.3",
    "v4.25.2",
    "v4.25.0",
    "v4.24.2",
    "v4.24.0",
    "v4.23.0",
    "v4.22.0",
    "v4.21.0",
    "v4.9.0",
    "v4.8.0",
    "v4.7.0",
    "v4.6.0",
    "v4.5.6",
    "v4.5.5",
    "v4.5.4",
    "v4.5.3",
    "v4.5.2",
    "v4.5.0-rc.2",
    "v3.43.2",
    "v3.9.8",
    "v2.14.0"
  ],
  "fileCount": 191
} as const;
