# Banner task execution V1.4

Preserve the approved V1.3 content, geometry, 18-second timing and animation scripts. Improve fine-text raster density for a Retina browser with a perspective transform.

- Root capture: 3200 × 2000. Existing 1600 × 1000 scene is scaled uniformly by 2 before rasterization.
- Export: transparent VP9 WebM, 30 fps, CRF 10, no audio.
- Gray secondary text receives a limited contrast adjustment; no font-size or layout change.
- Poster: exact 15-second frame, transparent lossless WebP.
- Render font: local HiraginoSansGB-W3 from `/System/Library/Fonts/Hiragino Sans GB.ttc` on macOS. This project contains no distributed font file. Match that installed face to reproduce glyph metrics.
- Renderer: HyperFrames 0.9.52. Run `npm run check` and `npm run render -- --output <absolute-output-path>` from this directory. Use a new output filename for each revision.

## Sources read on 2026-11-15

- https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API — explicit font readiness before capture; actual glyph face additionally checked through Chrome CDP.
- https://ffmpeg.org/ffmpeg-codecs.html#libvpx — quality and CRF options for VP9. Transparent WebM retains browser-compatible 4:2:0; higher source density reduces fine-text loss without sharpening artifacts.

This revision changes media fidelity only. Homepage CSS, product copy and carousel playback management remain outside its scope.
