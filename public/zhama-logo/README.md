# 扎马科技 Logo 矢量母版 V4

## 结论

本目录的 SVG 和 PDF 是轮廓路径文件，可无限缩放。文件中没有文字对象、字体名称、外部字体链接或嵌入位图。

SVG 是推荐的通用主母版；PDF 用于印刷交换。Adobe Illustrator 可以直接打开 SVG 或 PDF，并通过“另存为”生成真正的 .ai 文件。

## 文件

- `*-master.svg/pdf`：透明背景母版，深色字标。
- `*-light.svg/pdf`：浅色背景版本。
- `*-dark.svg/pdf`：深色背景版本。
- horizontal：横版。
- vertical：竖版。

## Codia 检查结果

Codia 编辑器提供“矢量化”功能，并支持 SVG、PDF Print、PSD、PNG 等格式导出。当前界面没有 .ai 导出项。它可以用于人工调整或再次矢量化，但不等同于 Adobe Illustrator。

## 生成 .ai

1. 在 Adobe Illustrator 桌面版打开 `zhama-horizontal-master.svg` 或 `zhama-vertical-master.svg`。
2. 检查画板、渐变和路径。
3. 选择“文件 → 另存为 → Adobe Illustrator (.ai)”。
4. 勾选创建 PDF 兼容文件。
5. 不要重新输入文字；所有字标必须保持轮廓路径。

## 质量说明

路径由统一 V3 母版轮廓追踪得到，保证横版、竖版和 Light/Dark 的字形一致。它解决了分辨率限制，但轮廓仍源自 AI 重绘位图。用于商标注册、超大型门头或精密印刷前，建议由品牌设计师检查节点并做一次人工几何校准。

