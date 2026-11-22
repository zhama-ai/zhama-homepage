# Task execution clarity review V1.4

Reviewed on 2026-11-15. Scope: second homepage banner media fidelity; preserve approved content, timing and geometry.

## Output

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| `task-execution-en_V1.4.webm` | 3,910,903 | adc651b69c67be6e3e9756a67ccb7e9ceccf6177adf7a27a1a5ee5db3b71fa74 |
| `task-execution-en-compact_V1.4.webm` | 1,714,999 | f48a2c632f042a25e8ad79be54e31c38395a812c6bcb06252c2928c670103e49 |
| `task-execution-en-poster_V1.4.webp` | 318,442 | 5727423737e2d281df9d021172bfcd430676c7117a9a3ca943ed5e01e2af1cbe |

- Desktop video: 3200 × 2000, transparent VP9, 30 fps, 18.000 seconds, 540 decoded frames, no audio, HyperFrames 0.9.52 CRF 10 delivery export.
- Compact video: 1600 × 1000, transparent VP9, 30 fps, 18.000 seconds, 540 decoded frames. Created from the new render using Lanczos downsampling, CRF 10, screen-content tuning, good deadline, CPU-used 2, row multithreading, two tile-column exponent, and disabled alternate reference frames.
- Poster: exact 15-second source frame, 3200 × 2000, transparent lossless WebP.
- `HeroTaskDemo.astro` chooses compact with `source media="(max-width: 700px)"`, followed by the desktop source. Existing delayed hydration already fills both sources. No playback scheduler or CSS change.

## Checks

- Animation scripts are byte-identical to V1.3. Only root raster density, local-font loading and six secondary-text contrast rules changed.
- Checked source frames at 0, 1.5, 7.9, 15 and 17.9 seconds for input, execution, results and loop reset. Inspected actual VP9-decoded 15-second frames for both desktop and compact exports.
- Actual font face checked via Chrome CDP for execution headings/details and metric numbers/labels: HiraginoSansGB-W3, loaded, no failed font requests. Font is resolved locally from `/System/Library/Fonts/Hiragino Sans GB.ttc`. No font file is distributed in this project or public output.
- HyperFrames `check`: overall true; runtime, layout, motion and contrast have zero errors and zero warnings. Lint has 1 warning and craft has 3 warnings; all sections have zero errors.
- Accepted checker observations: local-font portability, small UI text relative to video-height heuristic, silent autoplay, transient typed input reading time. Approved typography and timing were intentionally preserved. The typed request remains readable later as the persistent user message. This check does not constitute a human readability study.
- FFprobe decoded all 540 frames. All video exports have ALPHA_MODE=1. Forced libvpx decoding produced RGBA PNGs with corner alpha=0; both posters also have corner alpha=0.
- Native Chrome source-selection probe: 390px requests only the compact video; 1280px requests only the desktop video. Both play without media errors.
- Independent headless playback, seconds 2–5: compact 0/90 dropped frames; desktop 1/90. This is a local probe rather than a physical-phone performance result; final integrated browser playback is checked separately by the main task.
- `git diff --check` passes for this revision. Website build, integrated carousel regression and final commit are owned by the main task.

## Sources actually read

Access date for all sources: 2026-11-15.

- https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio — explains physical pixels versus CSS pixels and increasing raster backing density without changing layout. Adopted a 2× capture canvas while retaining the original scene coordinates. This is a density principle, not evidence that every device needs 3200px; compact delivery reduces mobile decoding area by 75%.
- https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API — explicit `document.fonts.load` and readiness checks before capture. Adopted readiness checks and CDP face inspection to distinguish missing-font fallback from raster softness. Font redistribution is not needed for this local rendering workflow.
- https://ffmpeg.org/ffmpeg-codecs.html#libvpx — VP9 quality/CRF, screen tuning and encoding options. Adopted low-loss CRF 10 and screen tuning for compact exports. Transparent browser-compatible VP9 retains 4:2:0 chroma; no artificial sharpening or unsupported 4:4:4 transparency claim.

Full local check logs and font/media probes are retained under `/tmp/tego-crisp-*`, `/tmp/tego-execution-font-probe-*`, and `/tmp/tego-motion-en-state_V1.4`. No external feedback or issue was sent.
