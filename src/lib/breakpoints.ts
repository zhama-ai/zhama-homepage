/**
 * Width breakpoints that scripts react to. Each value matches the CSS rule it pairs with:
 * - mobileNav: the header switches to the menu button at 1100 px and below (navigation.css).
 * - compact: phone layout at 700 px and below (header height, hero carousel, task scene).
 * - continuityStack: the digital-employee continuity artwork stacks at 900 px and below.
 */
export const breakpoints = { compact: 700, continuityStack: 900, mobileNav: 1100 } as const;

export const media = {
  compact: `(max-width: ${breakpoints.compact}px)`,
  continuityStack: `(max-width: ${breakpoints.continuityStack}px)`,
  desktopNav: `(min-width: ${breakpoints.mobileNav + 1}px)`,
  desktopHover: `(min-width: ${breakpoints.mobileNav + 1}px) and (hover: hover) and (pointer: fine)`,
} as const;
