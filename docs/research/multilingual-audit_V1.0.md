# 多语言对齐与验证依据

访问日期：2026-11-21（Asia/Shanghai）。

- https://docs.astro.build/en/guides/internationalization/ ：已阅读前缀路由与语言对应路径。保留 zh、zh-Hant、en 三套相同路由，不把旧 ja 跳转当作第四种语言。
- https://www.w3.org/International/questions/qa-html-language-declarations ：已阅读 lang 继承与混合语言声明。核对 html lang、语言菜单、可见正文、aria/placeholder 与资源的实际语言；hreflang 不替代内容翻译。
- Google localized-versions 页面两次请求超时，未作为已阅读依据。

本次采用：以当前中文内容与已确认视觉为基线，核对英文语义与完整性；繁体同时处理 HTML、动态脚本、外部 SVG、位图及其响应式衍生图。先本地化原图再生成 srcset，避免浏览器按屏宽选回简体图。产品术语保留数字员工模板、数字员工、Agent、技能、工作区之间的区分。官网预约 CTA 统一预约交流 / Book a consultation，平台入口保持立即体验 / Try TeGo。

外部中文文档不伪造英文地址，以语言元数据标明。行业照片上的中国市场招牌、官方备案号、原样代码与品牌名称不作为漏译机械删除。资料与业务数据不提交公开搜索。自动化检查与目视检查分别记录，不宣称真人可用性测试或线上部署验证。
