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

  quickInit
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
  LiquidFillEffect
};