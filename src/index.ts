import { ModernCSSEffect } from './effects/modern-css';
import { CardEffect } from './effects/card';
import { ClassicEffect } from './effects/classic';
import { AdvancedButtonEffect } from './effects/advanced-button';
import { TextEffect } from './effects/text';
import { ImageOverlayEffect } from './effects/image-overlay';
import { IconEffect } from './effects/icon';
import { BorderEffect } from './effects/border';
import { Transform3DEffect } from './effects/transform-3d';
import { ParticleEffect } from './effects/particle';
import { GalleryHoverEffect } from './effects/gallery-hover';
import { UnderlineEffect } from './effects/underline';
import { BackgroundSweepEffect } from './effects/background-sweep';

// New Effects
import { SquishyButtonEffect } from './effects/squishy-button';
import { ComplexBorderEffect } from './effects/complex-border';
import { AngledSweepEffect } from './effects/angled-sweep';
import { ArrowSlideEffect } from './effects/arrow-slide';
import { RainbowEffect } from './effects/rainbow';
import { MaskRevealEffect } from './effects/mask-reveal';
import { DrawBorderEffect } from './effects/draw-border';
import { FlipButtonEffect } from './effects/flip-button';
import { BoxShadowEffect } from './effects/box-shadow';
import { FizzyButtonEffect } from './effects/fizzy-button';
import { SvgBorderEffect } from './effects/svg-border';
import { StripeButtonEffect } from './effects/stripe-button';
import { GooeyButtonEffect } from './effects/gooey-button';
import { FancyBorderEffect } from './effects/fancy-border';
import { SvgOvalEffect } from './effects/svg-oval';
import { BlendModeEffect } from './effects/blend-mode';
import { SlideGrowEffect } from './effects/slide-grow';
import { GlowHoverEffect } from './effects/glow-hover';
import { BorderFillEffect } from './effects/border-fill';
import { TransitionButtonEffect } from './effects/transition-button';
import { CenterFillEffect } from './effects/center-fill';
import { BubbleArrowEffect } from './effects/bubble-arrow';
import { StylishButtonEffect } from './effects/stylish-buttons';
import { CssButtonEffect } from './effects/css-buttons';
import { LiquidFillEffect } from './effects/liquid-fill';

// Configuration for all effects
// Defines the class reference and whether it requires a 'type' argument
const EFFECT_CONFIGS: Record<string, { class: any, hasType: boolean }> = {
  // Multi-type effects (constructor: element, type, options)
  'classic': { class: ClassicEffect, hasType: true },
  'modern': { class: ModernCSSEffect, hasType: true },
  'card': { class: CardEffect, hasType: true },
  'border': { class: BorderEffect, hasType: true },
  'text': { class: TextEffect, hasType: true },
  'icon': { class: IconEffect, hasType: true },
  'transform3d': { class: Transform3DEffect, hasType: true },
  'particle': { class: ParticleEffect, hasType: true },
  'gallery': { class: GalleryHoverEffect, hasType: true },
  'imageoverlay': { class: ImageOverlayEffect, hasType: true },
  'background': { class: BackgroundSweepEffect, hasType: true },
  'underline': { class: UnderlineEffect, hasType: true },
  'advanced': { class: AdvancedButtonEffect, hasType: true },

  // Single-type effects (constructor: element, options)
  'squishy': { class: SquishyButtonEffect, hasType: false },
  'complexborder': { class: ComplexBorderEffect, hasType: false },
  'angled': { class: AngledSweepEffect, hasType: false },
  'arrow': { class: ArrowSlideEffect, hasType: false },
  'rainbow': { class: RainbowEffect, hasType: false },
  'mask': { class: MaskRevealEffect, hasType: false },
  'drawborder': { class: DrawBorderEffect, hasType: false },
  'flip': { class: FlipButtonEffect, hasType: false },
  'boxshadow': { class: BoxShadowEffect, hasType: false },
  'fizzy': { class: FizzyButtonEffect, hasType: false },
  'svgborder': { class: SvgBorderEffect, hasType: false },
  'stripe': { class: StripeButtonEffect, hasType: false },
  'gooey': { class: GooeyButtonEffect, hasType: false },
  'fancyborder': { class: FancyBorderEffect, hasType: false },
  'svgoval': { class: SvgOvalEffect, hasType: false },
  'blend': { class: BlendModeEffect, hasType: false },
  'slidegrow': { class: SlideGrowEffect, hasType: false },
  'glow': { class: GlowHoverEffect, hasType: false },
  'borderfill': { class: BorderFillEffect, hasType: false },
  'transition': { class: TransitionButtonEffect, hasType: false },
  'centerfill': { class: CenterFillEffect, hasType: false },
  'bubblearrow': { class: BubbleArrowEffect, hasType: false },
  'stylish': { class: StylishButtonEffect, hasType: false },
  'cssbutton': { class: CssButtonEffect, hasType: false },
  'liquid': { class: LiquidFillEffect, hasType: false },
};

/**
 * Automatically initializes effects based on CSS classes.
 * Looks for classes in the format: .hover-on-{effectName}[-{type}]
 * Example: .hover-on-glow, .hover-on-classic-fade
 */
const autoInit = () => {
  // Helper to process a single element
  const processElement = (el: Element) => {
    if (el.hasAttribute('data-hover-on-initialized')) return;

    el.classList.forEach((cls) => {
      if (!cls.startsWith('hover-on-')) return;

      const remaining = cls.substring('hover-on-'.length);
      // Try exact match first (e.g. 'glow')
      let effectKey = remaining;
      let type: string | undefined = undefined;

      if (!EFFECT_CONFIGS[effectKey]) {
        // Try to split hyphenated names to find effect and type
        // e.g. 'classic-fade' -> effect: 'classic', type: 'fade'
        const parts = remaining.split('-');
        // We iterate from the end to support multi-word effect names if any exist
        // But simplified: assume effect is first part, type is rest?
        // Actually some effects might have hyphens.
        // Let's iterate keys to find a match at the start.
        const matchingKey = Object.keys(EFFECT_CONFIGS).find(key => remaining.startsWith(key + '-'));

        if (matchingKey) {
          effectKey = matchingKey;
          type = remaining.substring(matchingKey.length + 1);
        }
      }

      const config = EFFECT_CONFIGS[effectKey];
      if (config) {
        try {
          if (config.hasType && type) {
            new config.class(el as HTMLElement, type);
          } else if (config.hasType && !type) {
            // If effect expects type but none provided, use default (by passing undefined or empty?)
            // Most effects default their type in constructor, so we can pass undefined or just initialized without type arg if possible.
            // But constructor signatures vary. Safer to let constructor default.
            new config.class(el as HTMLElement);
          } else {
            // Single type effect
            new config.class(el as HTMLElement);
          }
          el.setAttribute('data-hover-on-initialized', 'true');
          // Stop processing other classes for this element to avoids conflicts? 
          // Or allow multiple effects? Allowing multiple might be cool.
        } catch (e) {
          console.error(`Error auto-initializing effect ${effectKey} on`, el, e);
        }
      }
    });
  };

  // Process existing elements
  document.querySelectorAll('[class*="hover-on-"]').forEach(processElement);

  // Watch for new elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          if (node.matches('[class*="hover-on-"]')) {
            processElement(node);
          }
          // Also check children
          node.querySelectorAll('[class*="hover-on-"]').forEach(processElement);
        }
      });

      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (mutation.target instanceof HTMLElement) {
          processElement(mutation.target);
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });
};

// Helper to init all - now calls autoInit
const quickInit = () => {
  console.log('hover-on library loaded');
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', autoInit);
    } else {
      autoInit();
    }
  }
};

// Helper for Drupal integration - init effects from config rules
const initEffects = (rules: EffectRule[]) => {
  rules.forEach((rule) => {
    const elements = document.querySelectorAll(rule.selector);
    if (!elements.length) return;

    const config = EFFECT_CONFIGS[rule.effect.toLowerCase()];
    if (!config) {
      console.warn(`Unknown effect: ${rule.effect}`);
      return;
    }

    elements.forEach((el) => {
      try {
        if (config.hasType) {
          new config.class(el as HTMLElement, rule.type || undefined, rule.options || {});
        } else {
          new config.class(el as HTMLElement, rule.options || {});
        }
      } catch (e) {
        console.error(`Error initializing effect ${rule.effect} on`, el, e);
      }
    });
  });
};

// Map effect names to classes (Deprecated but kept for compatibility if used externally)
const getEffectClass = (effectName: string): any => {
  return EFFECT_CONFIGS[effectName.toLowerCase()]?.class;
};

// Type for Drupal effect rules
interface EffectRule {
  selector: string;
  effect: string;
  type?: string;
  options?: any;
}

// Export individual classes for tree-shaking
export {
  ModernCSSEffect,
  CardEffect,
  ClassicEffect,
  AdvancedButtonEffect,
  TextEffect,
  ImageOverlayEffect,
  IconEffect,
  BorderEffect,
  Transform3DEffect,
  ParticleEffect,
  GalleryHoverEffect,
  UnderlineEffect,
  BackgroundSweepEffect,

  // New Exports
  SquishyButtonEffect,
  ComplexBorderEffect,
  AngledSweepEffect,
  ArrowSlideEffect,
  RainbowEffect,
  MaskRevealEffect,
  DrawBorderEffect,
  FlipButtonEffect,
  BoxShadowEffect,
  FizzyButtonEffect,
  SvgBorderEffect,
  StripeButtonEffect,
  GooeyButtonEffect,
  FancyBorderEffect,
  SvgOvalEffect,
  BlendModeEffect,
  SlideGrowEffect,
  GlowHoverEffect,
  BorderFillEffect,
  TransitionButtonEffect,
  CenterFillEffect,
  BubbleArrowEffect,
  StylishButtonEffect,
  CssButtonEffect,
  LiquidFillEffect,

  quickInit,
  initEffects,
  autoInit // Export the new function
};

// Default export
export default {
  init: quickInit,
  autoInit,
  ModernCSSEffect,
  CardEffect,
  ClassicEffect,
  AdvancedButtonEffect,
  TextEffect,
  ImageOverlayEffect,
  IconEffect,
  BorderEffect,
  Transform3DEffect,
  ParticleEffect,
  GalleryHoverEffect,
  UnderlineEffect,
  BackgroundSweepEffect,

  SquishyButtonEffect,
  ComplexBorderEffect,
  AngledSweepEffect,
  ArrowSlideEffect,
  RainbowEffect,
  MaskRevealEffect,
  DrawBorderEffect,
  FlipButtonEffect,
  BoxShadowEffect,
  FizzyButtonEffect,
  SvgBorderEffect,
  StripeButtonEffect,
  GooeyButtonEffect,
  FancyBorderEffect,
  SvgOvalEffect,
  BlendModeEffect,
  SlideGrowEffect,
  GlowHoverEffect,
  BorderFillEffect,
  TransitionButtonEffect,
  CenterFillEffect,
  BubbleArrowEffect,
  StylishButtonEffect,
  CssButtonEffect,
  LiquidFillEffect,

  initEffects
};