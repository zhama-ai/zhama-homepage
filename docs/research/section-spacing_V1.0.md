# Section spacing — 2026-11-15

## Scope and decision

Use a shared outer section padding across the homepage, capability pages, industry story pages, solutions overview and internet solution content. Each adjacent content section contributes half the shared gap: desktop 64px per side (128px total), tablet up to 1100px 48px (96px total), mobile up to 700px 40px (80px total).

The homepage hero retains separate space for its carousel controls: 96px / 80px / 72px below the stage. Hero layouts, artwork dimensions, internal content gaps, copy and interactions are preserved. About company introduction retains its requested compact top offset (24px desktop / 16px mobile). Dense pricing, download, support and article layouts are outside this change.

## Public source

Read on 2026-11-15: [MDN — Mastering margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing). Adjacent block margins can collapse; padding does not. This supports using explicit section padding for predictable neighboring content gaps without resetting internal margins. Flex/grid and absolutely positioned layouts still need separate geometry inspection. The source informs the CSS mechanism, not a claim that these exact spacing values are universally best.

A Carbon spacing reference could not be retrieved (direct connection reset, proxy timeout); it was not used as evidence.

## Before and after

Homepage at 1280px before: body section content-container gaps were 100px, 116px and 171px. After: each is 128px. Hero-to-next-content gap changes from 212px to 160px while leaving carousel control space.

The section padding token resolves to 48px at 768px and 40px at both 640px and 390px. Bitmap transparent edges, perspective art and existing internal alignment can add optical space; illustration content was not cropped or moved to force every visible pixel gap to match.

Removed obsolete outer section overrides at individual responsive breakpoints. Existing card padding, heading-to-content spacing, grid gaps and scripts are unchanged.

## Verification

- `npm run check`: 134 Astro files, 0 errors, 0 warnings, 0 hints.
- `npm run build`: 96 Astro pages; 240 responsive images; 55 traditional Chinese clones; unused historical media remains excluded from the build.
- `npm run verify`: 17,851 checks; 142 regular pages; 27 redirects; 13,421 local references; 251 fragments; no failures.
- `git diff --check`: passed.
- Local browser checks: homepage at 1280px, 768px, 640px and 390px; all four body sections resolve to the shared padding, no document-level horizontal overflow.
- Desktop inner pages checked: knowledge capability, securities solution, solution overview, internet solution. Shared body section padding resolves to 64px; no document-level horizontal overflow.
- Mobile checked at 390px: knowledge capability and securities solution resolve to 40px; About company introduction remains 16px; pricing renders without document-level horizontal overflow.
- English homepage checked at 390px and 1280px; traditional Chinese homepage at 1280px: shared padding resolves correctly, no document-level horizontal overflow.
- Captured browser warning/error logs were empty on the inspected homepage/localized page tabs.
- Actual screenshots inspected for desktop homepage, mobile homepage transitions and securities story page. This is source, automated and agent browser verification, not a human usability test.

## Local visual records

- `review/home-section-spacing-full_V1.0.jpg`: full desktop homepage after visiting the lazy-loaded art.
- `review/home-section-spacing_V1.1.jpg`: desktop body section transition.
- `review/home-section-spacing-mobile_V1.0.jpg`: mobile body section transition.
