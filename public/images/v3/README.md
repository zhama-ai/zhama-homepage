# public/images/v3/

This folder contains v3.0.0 marketing illustrations referenced from the homepage and the launch blog series.

All assets are SVG-based schematic illustrations meant as **brand-aligned placeholders**. Designers can swap any of them with rendered designs (PNG / WebP at the same filename, or update references to the new filename) without touching the React code.

| File | Used by | Purpose |
| --- | --- | --- |
| `hero-v3.svg` | Homepage Hero / Open Graph fallback | Headline visual: "One avatar, a whole team" |
| `per-user-flow.svg` | `PerUserIsolationSection` / blog #2 | Per-user scheduler diagram |
| `s3-layout.svg` | `S3DataIsolationSection` / blog #3 | Three-layer S3 namespace layout |
| `business-monitor.svg` | `BusinessMonitorSection` / blog #4 | Six-panel dashboard mockup |
| `mini-chat.svg` | `DesktopExperienceSection` / blog #6 | Main window + Mini Chat composition |
| `architecture-v3.svg` | `ArchitectureOverviewSection` / blog #1 | End-to-end v3.0.0 architecture overview |

Recommended dimensions for replacement art: **1200 × 630** (Open Graph compatible).

When replacing, prefer:
- WebP for primary use, PNG fallback;
- Keep the same filename (or update component references in `src/components/*Section.tsx`);
- For dark theme harmony, target a deep navy background (#0f172a) with the brand cyan → indigo → purple gradient.
