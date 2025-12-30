/**
 * hover-on
 * A comprehensive library of navigation and button hover effects
 * 
 * Framework-agnostic core with integrations for Drupal, React, Vue, and vanilla JS
 * 
 * @author Union Web Services, Inc.
 * @license MIT
 */

// Export all effect classes
export { GalleryHoverEffect } from './effects/gallery-hover';
export type { GalleryHoverOptions } from './effects/gallery-hover';
export { UnderlineEffect } from './effects/underline';
export type { UnderlineType, UnderlineOptions } from './effects/underline';
export { BackgroundSweepEffect } from './effects/background-sweep';
export type { SweepType, SweepOptions } from './effects/background-sweep';
export { BorderEffect } from './effects/border';
export type { BorderType, BorderOptions } from './effects/border';
export { Transform3DEffect } from './effects/transform-3d';
export type { Transform3DType, Transform3DOptions } from './effects/transform-3d';
export { IconEffect, createSocialIcon } from './effects/icon';
export type { IconEffectType, IconEffectOptions } from './effects/icon';
export { ImageOverlayEffect } from './effects/image-overlay';
export type { OverlayType, OverlayOptions } from './effects/image-overlay';
export { TextEffect } from './effects/text';
export type { TextEffectType, TextEffectOptions } from './effects/text';
export { AdvancedButtonEffect } from './effects/advanced-button';
export type { AdvancedButtonType, AdvancedButtonOptions } from './effects/advanced-button';
export { ModernCSSEffect } from './effects/modern-css';
export type { ModernEffectType, ModernEffectOptions } from './effects/modern-css';
export { ClassicEffect } from './effects/classic';
export type { ClassicEffectType, ClassicEffectOptions } from './effects/classic';
export { CardEffect } from './effects/card';
export type { CardEffectType, CardEffectOptions } from './effects/card';
export { ParticleEffect } from './effects/particle';
export type { ParticleEffectType, ParticleEffectOptions } from './effects/particle';

// Export organized categories (RECOMMENDED WAY)
export { Navigation, Buttons, Cards, Images, Text, Icons, Modern, Classic, Presets } from './categories';

// Version
export const VERSION = '1.0.0';

/**
 * Initialize effects on elements matching a selector
 */
export function initEffects(config: EffectConfig[]): EffectInstance[] {
  const instances: EffectInstance[] = [];

  config.forEach(({ selector, effect, type, options }) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      let instance: any;

      switch (effect) {
        case 'gallery':
          instance = new GalleryHoverEffect(element as HTMLElement, options);
          break;
        case 'underline':
          instance = new UnderlineEffect(element as HTMLElement, type as any, options);
          break;
        case 'background':
          instance = new BackgroundSweepEffect(element as HTMLElement, type as any, options);
          break;
        case 'border':
          instance = new BorderEffect(element as HTMLElement, type as any, options);
          break;
        case 'transform3d':
          instance = new Transform3DEffect(element as HTMLElement, type as any, options);
          break;
        case 'icon':
          instance = new IconEffect(element as HTMLElement, type as any, options);
          break;
        case 'image-overlay':
          instance = new ImageOverlayEffect(element as HTMLElement, type as any, options);
          break;
        case 'text':
          instance = new TextEffect(element as HTMLElement, type as any, options);
          break;
        case 'particle':
          instance = new ParticleEffect(element as HTMLElement, type as any, options);
          break;
        case 'card':
          instance = new CardEffect(element as HTMLElement, type as any, options);
          break;
      }

      if (instance) {
        instances.push({
          element: element as HTMLElement,
          instance,
          effect,
          type
        });
      }
    });
  });

  return instances;
}

/**
 * Destroy all effect instances
 */
export function destroyEffects(instances: EffectInstance[]): void {
  instances.forEach(({ instance }) => {
    if (instance && typeof instance.destroy === 'function') {
      instance.destroy();
    }
  });
}

// Types
export interface EffectConfig {
  selector: string;
  effect: 'gallery' | 'underline' | 'background' | 'border' | 'transform3d' | 'icon' | 'image-overlay' | 'text' | 'particle' | 'card';
  type?: string;
  options?: any;
}

export interface EffectInstance {
  element: HTMLElement;
  instance: any;
  effect: string;
  type?: string;
}

/**
 * Quick initialization helper for common patterns
 */
export const quickInit = {
  /**
   * Apply underline effects to all links in nav
   */
  navLinks: (options?: any) => {
    return initEffects([{
      selector: 'nav a',
      effect: 'underline',
      type: 'slide',
      options
    }]);
  },

  /**
   * Apply button hover effects
   */
  buttons: (type: string = 'left', options?: any) => {
    return initEffects([{
      selector: 'button, .btn, .button',
      effect: 'background',
      type,
      options
    }]);
  },

  /**
   * Apply 3D effects to cards
   */
  cards: (type: string = 'lift', options?: any) => {
    return initEffects([{
      selector: '.card',
      effect: 'transform3d',
      type,
      options
    }]);
  }
};