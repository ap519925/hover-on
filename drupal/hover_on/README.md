# Hover On Drupal Module

Integrates the [Hover On Library](https://github.com/ap519925/hover-on) into Drupal.

## Installation

1. Copy this `hover_on` directory to your Drupal site's modules directory (e.g., `web/modules/custom/hover_on`).
2. Enable the module via the Extend menu or Drush:
   ```bash
   drush en hover_on
   ```

## Configuration

1. Navigate to **Administration > Configuration > User Interface > Hover On Effects Settings**.
2. Define your rules in the textarea using the format:
   `Selector | Effect | Type | Color`

### Basic Examples
```
nav.primary-nav a | underline | slide | #4ecdc4
.button | background | left | #ff6b6b
.card | transform3d | lift
.icon | icon | rotate | #6c5ce7
```

### Advanced Effects Examples
```
# Morphing Goo Effect
.cta-button | gooey | blobs | #ff3366

# Wave Rising Liquid Fill
.menu-item | liquid | | #00d4ff

# Animated Rainbow Gradient
.special-btn | rainbow | spectrum |

# Paint Splash Reveal
.reveal-button | mask | nature | #e74c3c

# Diagonal Slide Effect
.action-btn | angled | | #e67e22

# 3D Card Flip
.flip-card | flip | |

# Sequential Border Draw
.outline-btn | drawborder | | #9b59b6

# Neon Glow
.glow-btn | glow | | #fff

# Squishy Button
.squishy-btn | squishy | neon |

# Fizzy Particles
.particle-btn | fizzy | |

# SVG Border Animation
.svg-btn | svgborder | | #54a0ff
```

### Available Effects

**Core Effects:** underline, background, border, transform3d, icon, text, modern, particle, card, classic, advanced, gallery, imageoverlay

**Advanced Effects:** squishy, complexborder, angled, rainbow, mask, drawborder, flip, fizzy, svgborder, stripe, gooey, liquid, glow, borderfill, centerfill

The module will automatically load the necessary libraries and apply the effects to the selectors you define. See the configuration page for a complete reference of effect types.
