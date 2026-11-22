# 首页第二屏任务执行 V1.5

这份工程复现首页第二屏的中英文视频。只调整深蓝透明表面、冰蓝原生边框、局部青光和业务配色；沿用 V1.4 的全部界面内容、1600 × 1000 逻辑坐标、2× 捕获尺寸和 18 秒 GSAP 时间轴。

## 运行条件

- Node.js 22 及以上、FFmpeg、Chromium。
- macOS 安装的 Hiragino Sans GB 字体，字体由 CSS 本地解析，工程不分发字体文件。其他系统须核对字形和文本换行。
- HyperFrames 固定为 0.9.52，已写入两个语言工程的 package.json。

## 桌面视频

从仓库根目录运行，按语言串行执行。若相同文件已存在，先为本轮选择新版本号；以下命令不会覆盖已有成品。

```sh
for locale in zh en; do
  target="public/images/hero/task-execution-${locale}_V1.5.webm"
  test ! -e "$target" || exit 1
  (cd "artwork/hero-task-execution_V1.5/$locale" && npm run render -- --workers 2 --output "../../../$target") || exit 1
done
```

输出为 3200 × 2000、30 fps、18 秒、CRF 10 的透明 VP9 WebM。PNG 捕获必须保留完整 alpha；不启用 optimizeForSpeed，也不降低捕获分辨率。

## 移动端视频和海报

桌面视频完成后，从仓库根目录按语言串行执行：

```sh
for locale in zh en; do
  desktop="public/images/hero/task-execution-${locale}_V1.5.webm"
  compact="public/images/hero/task-execution-${locale}-compact_V1.5.webm"
  poster="public/images/hero/task-execution-${locale}-poster_V1.5.webp"
  ffmpeg -n -threads 1 -c:v libvpx-vp9 -i "$desktop" -vf scale=1600:1000:flags=lanczos -c:v libvpx-vp9 -pix_fmt yuva420p -crf 10 -b:v 0 -deadline good -cpu-used 2 -row-mt 1 -tile-columns 2 -threads 2 -auto-alt-ref 0 -an "$compact" || exit 1
  posterScratch="/tmp/tego-task-poster-${locale}_V1.5.png"
  ffmpeg -n -threads 1 -c:v libvpx-vp9 -ss 15 -i "$desktop" -frames:v 1 "$posterScratch" || exit 1
  node artwork/hero-task-execution_V1.5/create-poster.mjs "$posterScratch" "$poster" || exit 1
done
```

以上命令可从成品桌面视频复现移动端视频与第 15 秒成果海报。移动端保留 1600 × 1000、30 fps、18 秒与透明度。

本机 FFmpeg 没有 libwebp 编码器，因此使用 FFmpeg 保留 alpha 解码成 PNG，再由站点已有依赖 Sharp 无损编码 WebP；脚本以独占创建方式保存海报，拒绝覆盖现有文件。

本轮中文 compact 与海报使用以上桌面转码路径。英文 compact 与海报直接读取完整的透明 PNG 捕获序列，减少一次有损转码；第 450 帧对应 15 秒。实际执行命令如下：

```sh
ffmpeg -n -framerate 30 -threads 1 -start_number 0 -i /tmp/tego-execution-capture-en_V1.5/frame_%06d.png -vf scale=1600:1000:flags=lanczos -frames:v 540 -c:v libvpx-vp9 -pix_fmt yuva420p -crf 10 -b:v 0 -deadline good -cpu-used 2 -row-mt 1 -tile-columns 2 -threads 2 -auto-alt-ref 0 -metadata:s:v:0 alpha_mode=1 -an public/images/hero/task-execution-en-compact_V1.5.webm
node artwork/hero-task-execution_V1.5/create-poster.mjs /tmp/tego-execution-capture-en_V1.5/frame_000450.png public/images/hero/task-execution-en-poster_V1.5.webp
```

该 PNG 目录是本轮捕获期间的硬链接保护目录，编码与验证完成后已清理；五个透明关键帧留在内部审阅缓存。英文桌面视频的 15 秒强制 alpha 解码也已核对，成果内容与原始海报保持相同状态。

## 检查

每个语言工程的运行检查：

```sh
(cd artwork/hero-task-execution_V1.5/zh && npm run check -- --at 0,1.5,7.9,15,17.9 --json)
(cd artwork/hero-task-execution_V1.5/en && npm run check -- --at 0,1.5,7.9,15,17.9 --json)
```

最终媒体尺寸、时长、文件大小、SHA-256、alpha 与解码检查结果记录在同目录的 media-validation_V1.5.json。主站组件 HeroTaskDemo.astro 继续使用原有延迟加载、手机资源选择和轮播播放调度。

## 本轮工具选择记录

2026-11-16 的 freshness 检查发现 0.9.56。新版本中文完整检查通过，layout 与 contrast 使用指定的五个时间点，motion 和 craft 另有各自内部采样。新版本单 worker 渲染采用 streaming 编码，并因原有 cursor drop-shadow 回退到 screenshot；本轮约五分钟仅捕获 72 帧，且流式帧没有落盘，不能复用。

本轮停止未完成的新管线，回到 V1.4 已用的 0.9.52、两 worker 捕获，并按语言串行完成渲染。机器当时有很高的系统负载，因此该观察不能单独证明新版本存在性能回归。工程保留原 pin，未改动历史版本。

## 设计与编码依据

- 已认可的首页第一屏样式：src/styles/hero-workspace-theme.css。选中区采用 #00deff38 的局部光、#006bd9ed / #062d78c7 的深蓝渐变与 #a4dcff66 边框。
- V1.4 已阅读并验证的像素密度和字体加载依据继续适用：https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio 与 https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API。
- V1.4 的透明 VP9 编码依据继续适用：https://ffmpeg.org/ffmpeg-codecs.html#libvpx。浏览器透明 WebM 保持 4:2:0 色度格式，没有用整幅滤镜或锐化代替清晰度。
