# Changelog

All notable changes to hover-on-lib will be documented in this file.

## [1.3.0] - 2025-12-30

### Added
- **8 New Advanced Effects** in examples showcase:
  - `GooeyButtonEffect` - Morphing liquid blob animations with SVG filters (blobs, diagonal)
  - `LiquidFillEffect` - Staggered wave rising animation
  - `RainbowEffect` - Animated rainbow gradients (smooth, spectrum, warm, blocks)
  - `DrawBorderEffect` - Sequential hand-drawn border animation
  - `FlipButtonEffect` - 3D card flip revealing hidden message
  - `MaskRevealEffect` - Paint splash reveal using sprite sheets (nature, urban)
  - `AngledSweepEffect` - Diagonal slide with scale effect
  - `GlowHoverEffect` - Animated rainbow border glow

- **Core Exports**:
  - Added `UnderlineEffect` and `BackgroundSweepEffect` to main library exports
  - Added `initEffects()` helper function for Drupal integration

- **Drupal Module Enhancements**:
  - Updated settings form with complete effect documentation
  - Added 30+ effect types with usage examples
  - Collapsible reference guide for effect types
  - Updated README with advanced effect examples
  - Version synced to 1.3.0

### Fixed
- Color contrast issues across all examples for better accessibility
- Morphing Goo effect conflicting inline styles
- Wave Rising effect color transitions
- Complex Borders initialization and styling
- SVG Border effect visibility with proper dark background
- Text effects null-safe initialization

### Changed
- Updated package description to highlight 30+ effects
- Enhanced keywords for better NPM discoverability
- Improved examples page organization with "More Awesome Effects" section
- Customized all example button text and colors for real-world use cases
- Author updated to Anthony Phillips (BlueDrop Solutions LLC)

### Documentation
- Expanded Drupal module README with comprehensive examples
- Added effect types reference in settings form
- Updated examples with proper code snippets and live demos

## [1.2.1] - Previous Release
- Initial published version with core effects
- Drupal module integration
- Basic examples page
