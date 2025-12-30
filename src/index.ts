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

// Helper to init all
const quickInit = () => {
  console.log('hover-on library loaded');
};

// Helper for Drupal integration - init effects from config rules
const initEffects = (rules: EffectRule[]) => {
  rules.forEach((rule) => {
    const elements = document.querySelectorAll(rule.selector);
    if (!elements.length) return;

    const effectClass = getEffectClass(rule.effect);
    if (!effectClass) {
      console.warn(`Unknown effect: ${rule.effect}`);
      return;
    }

    elements.forEach((el) => {
      try {
        new effectClass(el as HTMLElement, rule.type || '', rule.options || {});
      } catch (e) {
        console.error(`Error initializing effect ${rule.effect} on`, el, e);
      }
    });
  });
};

// Map effect names to classes
const getEffectClass = (effectName: string): any => {
  const effectMap: { [key: string]: any } = {
    'underline': UnderlineEffect,
    'background': BackgroundSweepEffect,
    'border': BorderEffect,
    'transform3d': Transform3DEffect,
    'icon': IconEffect,
    'text': TextEffect,
    'modern': ModernCSSEffect,
    'particle': ParticleEffect,
    'card': CardEffect,
    'classic': ClassicEffect,
    'advanced': AdvancedButtonEffect,
    'gallery': GalleryHoverEffect,
    'imageoverlay': ImageOverlayEffect,

    // New effects
    'squishy': SquishyButtonEffect,
    'complexborder': ComplexBorderEffect,
    'angled': AngledSweepEffect,
    'arrow': ArrowSlideEffect,
    'rainbow': RainbowEffect,
    'mask': MaskRevealEffect,
    'drawborder': DrawBorderEffect,
    'flip': FlipButtonEffect,
    'boxshadow': BoxShadowEffect,
    'fizzy': FizzyButtonEffect,
    'svgborder': SvgBorderEffect,
    'stripe': StripeButtonEffect,
    'gooey': GooeyButtonEffect,
    'fancyborder': FancyBorderEffect,
    'svgoval': SvgOvalEffect,
    'blend': BlendModeEffect,
    'slidegrow': SlideGrowEffect,
    'glow': GlowHoverEffect,
    'borderfill': BorderFillEffect,
    'transition': TransitionButtonEffect,
    'centerfill': CenterFillEffect,
    'bubblearrow': BubbleArrowEffect,
    'stylish': StylishButtonEffect,
    'cssbutton': CssButtonEffect,
    'liquid': LiquidFillEffect,
  };

  return effectMap[effectName.toLowerCase()];
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
  initEffects
};

// Default export
export default {
  init: quickInit,
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