/**
 * hover-on - Organized Effect Categories
 * Effects organized by use case: Navigation, Buttons, Cards, Images, Text, Icons
 */

import { UnderlineEffect, UnderlineType } from './effects/underline';
import { BackgroundSweepEffect, SweepType } from './effects/background-sweep';
import { BorderEffect, BorderType } from './effects/border';
import { AdvancedButtonEffect, AdvancedButtonType } from './effects/advanced-button';
import { Transform3DEffect, Transform3DType } from './effects/transform-3d';
import { IconEffect, IconEffectType } from './effects/icon';
import { ImageOverlayEffect, OverlayType } from './effects/image-overlay';
import { TextEffect, TextEffectType } from './effects/text';
import { GalleryHoverEffect } from './effects/gallery-hover';
import { ModernCSSEffect, ModernEffectType } from './effects/modern-css';
import { ClassicEffect, ClassicEffectType } from './effects/classic';

/**
 * Navigation Effects
 * Perfect for menu items, nav links, and navigation elements
 */
export const Navigation = {
  /**
   * Underline effects for nav links
   */
  underline: {
    slide: (element: HTMLElement | string) => 
      new UnderlineEffect(element, 'slide', { thickness: '2px' }),
    
    center: (element: HTMLElement | string) => 
      new UnderlineEffect(element, 'center', { thickness: '2px' }),
    
    bounce: (element: HTMLElement | string) => 
      new UnderlineEffect(element, 'bounce', { thickness: '2px' }),
    
    wave: (element: HTMLElement | string) => 
      new UnderlineEffect(element, 'wave', { thickness: '2px' }),
    
    double: (element: HTMLElement | string) => 
      new UnderlineEffect(element, 'double', { thickness: '2px' }),
    
    gradient: (element: HTMLElement | string) => 
      new UnderlineEffect(element, 'gradient', { thickness: '2px' })
  },
  
  /**
   * Background effects for nav items
   */
  background: {
    subtle: (element: HTMLElement | string) => 
      new BackgroundSweepEffect(element, 'left', { duration: '300ms' }),
    
    sweep: (element: HTMLElement | string) => 
      new BackgroundSweepEffect(element, 'right', { duration: '350ms' }),
    
    expand: (element: HTMLElement | string) => 
      new BackgroundSweepEffect(element, 'split', { duration: '400ms' })
  },
  
  /**
   * Border effects for nav items
   */
  border: {
    draw: (element: HTMLElement | string) => 
      new BorderEffect(element, 'draw', { borderWidth: '2px' }),
    
    pulse: (element: HTMLElement | string) => 
      new BorderEffect(element, 'pulse', { borderWidth: '2px' })
  }
};

/**
 * Button Effects
 * Perfect for CTAs, submit buttons, and action elements
 */
export const Buttons = {
  /**
   * Background sweep effects
   */
  sweep: {
    left: (element: HTMLElement | string) => 
      new BackgroundSweepEffect(element, 'left'),
    
    right: (element: HTMLElement | string) => 
      new BackgroundSweepEffect(element, 'right'),
    
    top: (element: HTMLElement | string) => 
      new BackgroundSweepEffect(element, 'top'),
    
    bottom: (element: HTMLElement | string) => 
      new BackgroundSweepEffect(element, 'bottom'),
    
    radial: (element: HTMLElement | string) => 
      new BackgroundSweepEffect(element, 'radial'),
    
    diagonal: (element: HTMLElement | string) => 
      new BackgroundSweepEffect(element, 'diagonal-tl'),
    
    split: (element: HTMLElement | string) => 
      new BackgroundSweepEffect(element, 'split'),
    
    curtain: (element: HTMLElement | string) => 
      new BackgroundSweepEffect(element, 'curtain'),
    
    corner: (element: HTMLElement | string) => 
      new BackgroundSweepEffect(element, 'corner')
  },
  
  /**
   * Border effects
   */
  border: {
    draw: (element: HTMLElement | string) => 
      new BorderEffect(element, 'draw'),
    
    glow: (element: HTMLElement | string) => 
      new BorderEffect(element, 'glow'),
    
    gradient: (element: HTMLElement | string) => 
      new BorderEffect(element, 'gradient'),
    
    dash: (element: HTMLElement | string) => 
      new BorderEffect(element, 'dash')
  },
  
  /**
   * 3D transform effects
   */
  transform: {
    lift: (element: HTMLElement | string) => 
      new Transform3DEffect(element, 'lift'),
    
    pop: (element: HTMLElement | string) => 
      new Transform3DEffect(element, 'pop'),
    
    tilt: (element: HTMLElement | string) => 
      new Transform3DEffect(element, 'tilt')
  },
  
  /**
   * Advanced button effects
   */
  advanced: {
    spinner: (element: HTMLElement | string) => 
      new AdvancedButtonEffect(element, 'spinner'),
    
    burst: (element: HTMLElement | string) => 
      new AdvancedButtonEffect(element, 'burst'),
    
    revolve: (element: HTMLElement | string) => 
      new AdvancedButtonEffect(element, 'revolve'),
    
    pressdown: (element: HTMLElement | string) => 
      new AdvancedButtonEffect(element, 'pressdown'),
    
    offset: (element: HTMLElement | string) => 
      new AdvancedButtonEffect(element, 'offset'),
    
    neon: (element: HTMLElement | string) => 
      new AdvancedButtonEffect(element, 'neon'),
    
    warp: (element: HTMLElement | string) => 
      new AdvancedButtonEffect(element, 'warp'),
    
    splitSides: (element: HTMLElement | string) => 
      new AdvancedButtonEffect(element, 'split-sides'),
    
    insideOut: (element: HTMLElement | string) => 
      new AdvancedButtonEffect(element, 'inside-out'),
    
    gradientAnimated: (element: HTMLElement | string) => 
      new AdvancedButtonEffect(element, 'gradient-animated'),
    
    borderWipe: (element: HTMLElement | string) => 
      new AdvancedButtonEffect(element, 'border-wipe'),
    
    floatUp: (element: HTMLElement | string) => 
      new AdvancedButtonEffect(element, 'float-up'),
    
    strikethrough: (element: HTMLElement | string) => 
      new AdvancedButtonEffect(element, 'strikethrough'),
    
    flip3d: (element: HTMLElement | string) => 
      new AdvancedButtonEffect(element, '3d-flip'),
    
    popup: (element: HTMLElement | string) => 
      new AdvancedButtonEffect(element, 'popup')
  }
};

/**
 * Card Effects
 * Perfect for product cards, team members, blog posts
 */
export const Cards = {
  /**
   * 3D transform effects
   */
  transform: {
    lift: (element: HTMLElement | string) => 
      new Transform3DEffect(element, 'lift', { translateZ: '20px' }),
    
    tilt: (element: HTMLElement | string) => 
      new Transform3DEffect(element, 'tilt'),
    
    tiltFollow: (element: HTMLElement | string) => 
      new Transform3DEffect(element, 'tilt-follow'),
    
    flip: (element: HTMLElement | string) => 
      new Transform3DEffect(element, 'flip-h'),
    
    pop: (element: HTMLElement | string) => 
      new Transform3DEffect(element, 'pop'),
    
    float: (element: HTMLElement | string) => 
      new Transform3DEffect(element, 'float'),
    
    swing: (element: HTMLElement | string) => 
      new Transform3DEffect(element, 'swing')
  },
  
  /**
   * Border effects
   */
  border: {
    draw: (element: HTMLElement | string) => 
      new BorderEffect(element, 'draw', { borderWidth: '3px' }),
    
    glow: (element: HTMLElement | string) => 
      new BorderEffect(element, 'glow', { glowColor: '#4ecdc4' }),
    
    corners: (element: HTMLElement | string) => 
      new BorderEffect(element, 'corners')
  }
};

/**
 * Image Effects
 * Perfect for galleries, portfolios, featured images
 */
export const Images = {
  /**
   * Gallery hover effect (your original!)
   */
  gallery: (element: HTMLElement | string, options?: any) => 
    new GalleryHoverEffect(element, options),
  
  /**
   * Overlay effects
   */
  overlay: {
    fade: (element: HTMLElement | string, caption?: string) => 
      new ImageOverlayEffect(element, 'fade', { captionText: caption }),
    
    slideUp: (element: HTMLElement | string, caption?: string) => 
      new ImageOverlayEffect(element, 'slide-up', { captionText: caption }),
    
    slideDown: (element: HTMLElement | string, caption?: string) => 
      new ImageOverlayEffect(element, 'slide-down', { captionText: caption }),
    
    zoom: (element: HTMLElement | string, caption?: string) => 
      new ImageOverlayEffect(element, 'zoom', { captionText: caption }),
    
    circle: (element: HTMLElement | string, caption?: string) => 
      new ImageOverlayEffect(element, 'circle', { captionText: caption }),
    
    reveal: (element: HTMLElement | string, caption?: string) => 
      new ImageOverlayEffect(element, 'reveal', { captionText: caption }),
    
    grayscale: (element: HTMLElement | string) => 
      new ImageOverlayEffect(element, 'grayscale'),
    
    flip: (element: HTMLElement | string) => 
      new ImageOverlayEffect(element, 'flip')
  }
};

/**
 * Text Effects
 * Perfect for headings, titles, callouts
 */
export const Text = {
  /**
   * Glow and sparkle effects
   */
  glow: {
    sparkle: (element: HTMLElement | string) => 
      new TextEffect(element, 'sparkle'),
    
    glow: (element: HTMLElement | string) => 
      new TextEffect(element, 'glow'),
    
    neon: (element: HTMLElement | string) => 
      new TextEffect(element, 'neon')
  },
  
  /**
   * Animation effects
   */
  animate: {
    wave: (element: HTMLElement | string) => 
      new TextEffect(element, 'wave'),
    
    squiggly: (element: HTMLElement | string) => 
      new TextEffect(element, 'squiggly'),
    
    rotateLetters: (element: HTMLElement | string) => 
      new TextEffect(element, 'rotate-letters'),
    
    scaleLetters: (element: HTMLElement | string) => 
      new TextEffect(element, 'scale-letters')
  },
  
  /**
   * Color effects
   */
  color: {
    gradient: (element: HTMLElement | string) => 
      new TextEffect(element, 'gradient'),
    
    splitColor: (element: HTMLElement | string) => 
      new TextEffect(element, 'split-color')
  },
  
  /**
   * Special effects
   */
  special: {
    glitch: (element: HTMLElement | string) => 
      new TextEffect(element, 'glitch'),
    
    scramble: (element: HTMLElement | string) => 
      new TextEffect(element, 'scramble'),
    
    typing: (element: HTMLElement | string, speed?: number) => 
      new TextEffect(element, 'typing', { typingSpeed: speed || 100 })
  }
};

/**
 * Icon Effects
 * Perfect for social media, feature icons, UI elements
 */
export const Icons = {
  /**
   * Basic hover effects
   */
  basic: {
    glow: (element: HTMLElement | string) => 
      new IconEffect(element, 'glow'),
    
    rotate: (element: HTMLElement | string) => 
      new IconEffect(element, 'rotate'),
    
    bounce: (element: HTMLElement | string) => 
      new IconEffect(element, 'bounce'),
    
    shake: (element: HTMLElement | string) => 
      new IconEffect(element, 'shake'),
    
    pulse: (element: HTMLElement | string) => 
      new IconEffect(element, 'pulse')
  },
  
  /**
   * Animation effects
   */
  animate: {
    spin: (element: HTMLElement | string) => 
      new IconEffect(element, 'spin'),
    
    flip: (element: HTMLElement | string) => 
      new IconEffect(element, 'flip'),
    
    float: (element: HTMLElement | string) => 
      new IconEffect(element, 'float')
  },
  
  /**
   * Color effects
   */
  color: {
    fill: (element: HTMLElement | string) => 
      new IconEffect(element, 'color-fill'),
    
    reveal: (element: HTMLElement | string) => 
      new IconEffect(element, 'reveal')
  }
};

/**
 * Preset Combinations
 * Pre-configured effect combinations for common use cases
 */
export const Presets = {
  /**
   * Modern minimal navigation
   */
  modernNav: (selector: string) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => Navigation.underline.slide(el as HTMLElement));
  },
  
  /**
   * Professional buttons
   */
  professionalButtons: (selector: string) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => Buttons.sweep.radial(el as HTMLElement));
  },
  
  /**
   * Interactive cards
   */
  interactiveCards: (selector: string) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => Cards.transform.lift(el as HTMLElement));
  },
  
  /**
   * Portfolio gallery
   */
  portfolioGallery: (selector: string, hoverText: string = 'VIEW') => {
    return new GalleryHoverEffect(selector, {
      hoverTextContent: hoverText,
      fontSize: '8vw'
    });
  },
  
  /**
   * Social media icons
   */
  socialIcons: (selector: string) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => Icons.basic.glow(el as HTMLElement));
  },
  
  /**
   * Attention-grabbing headings
   */
  attentionHeadings: (selector: string) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => Text.glow.sparkle(el as HTMLElement));
  }
};

/**
 * Modern CSS Effects
 * Advanced effects using modern CSS features
 */
export const Modern = {
  /**
   * Clip-path effects
   */
  clipPath: {
    reveal: (element: HTMLElement | string) => 
      new ModernCSSEffect(element, 'clip-path-reveal'),
    
    diamond: (element: HTMLElement | string) => 
      new ModernCSSEffect(element, 'clip-path-diamond')
  },
  
  /**
   * Filter effects
   */
  filter: {
    brightness: (element: HTMLElement | string) => 
      new ModernCSSEffect(element, 'filter-brightness'),
    
    contrast: (element: HTMLElement | string) => 
      new ModernCSSEffect(element, 'filter-contrast')
  },
  
  /**
   * Backdrop effects
   */
  backdrop: {
    blur: (element: HTMLElement | string) => 
      new ModernCSSEffect(element, 'backdrop-blur'),
    
    glassMorphism: (element: HTMLElement | string) => 
      new ModernCSSEffect(element, 'glass-morphism')
  },
  
  /**
   * Animation effects
   */
  animate: {
    staircase: (element: HTMLElement | string) => 
      new ModernCSSEffect(element, 'staircase'),
    
    lightFlare: (element: HTMLElement | string) => 
      new ModernCSSEffect(element, 'light-flare'),
    
    ripple: (element: HTMLElement | string) => 
      new ModernCSSEffect(element, 'ripple'),
    
    shatter: (element: HTMLElement | string) => 
      new ModernCSSEffect(element, 'shatter')
  },
  
  /**
   * 3D effects
   */
  threeD: {
    tilt: (element: HTMLElement | string) => 
      new ModernCSSEffect(element, '3d-tilt'),
    
    unfold: (element: HTMLElement | string) => 
      new ModernCSSEffect(element, 'unfold'),
    
    parallax: (element: HTMLElement | string) => 
      new ModernCSSEffect(element, 'parallax')
  },
  
  /**
   * Special effects
   */
  special: {
    zoomLift: (element: HTMLElement | string) => 
      new ModernCSSEffect(element, 'zoom-lift'),
    
    gradientBorder: (element: HTMLElement | string) => 
      new ModernCSSEffect(element, 'gradient-border'),
    
    focusDim: (element: HTMLElement | string) => 
      new ModernCSSEffect(element, 'focus-dim'),
    
    magnetic: (element: HTMLElement | string) => 
      new ModernCSSEffect(element, 'magnetic')
  }
};

/**
 * Classic Effects
 * Traditional 2D transforms and animations
 */
export const Classic = {
  /**
   * Scale effects
   */
  scale: {
    grow: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'grow'),
    
    shrink: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'shrink'),
    
    pulse: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'pulse'),
    
    pulseGrow: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'pulse-grow'),
    
    pulseShrink: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'pulse-shrink'),
    
    push: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'push'),
    
    pop: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'pop')
  },
  
  /**
   * Rotate effects
   */
  rotate: {
    simple: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'rotate'),
    
    growRotate: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'grow-rotate')
  },
  
  /**
   * Float effects
   */
  float: {
    up: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'float'),
    
    down: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'sink'),
    
    hover: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'hover'),
    
    hang: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'hang')
  },
  
  /**
   * Skew effects
   */
  skew: {
    simple: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'skew'),
    
    forward: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'skew-forward'),
    
    backward: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'skew-backward')
  },
  
  /**
   * Wobble effects
   */
  wobble: {
    horizontal: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'wobble-horizontal'),
    
    vertical: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'wobble-vertical'),
    
    bottomRight: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'wobble-bottom-right'),
    
    topRight: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'wobble-top-right'),
    
    skew: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'wobble-skew')
  },
  
  /**
   * Buzz effects
   */
  buzz: {
    simple: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'buzz'),
    
    out: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'buzz-out')
  },
  
  /**
   * Direction effects
   */
  direction: {
    forward: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'forward'),
    
    backward: (element: HTMLElement | string) => 
      new ClassicEffect(element, 'backward')
  }
};
