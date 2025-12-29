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
export { GalleryHoverEffect, GalleryHoverOptions } from './effects/gallery-hover';
export { UnderlineEffect, UnderlineType, UnderlineOptions } from './effects/underline';
export { BackgroundSweepEffect, SweepType, SweepOptions } from './effects/background-sweep';
export { BorderEffect, BorderType, BorderOptions } from './effects/border';
export { Transform3DEffect, Transform3DType, Transform3DOptions } from './effects/transform-3d';
export { IconEffect, IconEffectType, IconEffectOptions, createSocialIcon } from './effects/icon';
export { ImageOverlayEffect, OverlayType, OverlayOptions } from './effects/image-overlay';
export { TextEffect, TextEffectType, TextEffectOptions } from './effects/text';
export { TextEffect, TextEffectType, TextEffectOptions } from "./effects/text";

// Export organized categories (RECOMMENDED WAY)
export { Navigation, Buttons, Cards, Images, Text, Icons, Modern, Classic, Presets } from './categories';
export { CardEffect, CardEffectType, CardEffectOptions } from './effects/card';

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
  },
  
  /**
   * Apply border effects
   */
  borders: (type: string = 'draw', selector: string = '.bordered', options?: any) => {
    return initEffects([{
      selector,
      effect: 'border',
      type,
      options
    }]);
  },
  
  /**
   * Apply icon effects
   */
  icons: (type: string = 'glow', selector: string = '.icon', options?: any) => {
    return initEffects([{
      selector,
      effect: 'icon',
      type,
      options
    }]);
  },
  
  /**
   * Apply social media icons
   */
  socialIcons: (selector: string = '.social-icon', options?: any) => {
    return initEffects([{
      selector,
      effect: 'icon',
      type: 'glow',
      options
    }]);
  },
  
  /**
   * Apply image overlay effects
   */
  images: (type: string = 'fade', selector: string = '.hover-image', options?: any) => {
    return initEffects([{
      selector,
      effect: 'image-overlay',
      type,
      options
    }]);
  },
  
  /**
   * Apply text effects
   */
  text: (type: string = 'glow', selector: string = '.hover-text', options?: any) => {
    return initEffects([{
      selector,
      effect: 'text',
      type,
      options
    }]);
  }
};

  
  /**
   * Apply particle effects
   */
  particles: (type: string = 'burst', selector: string = '.particle', options?: any) => {
    return initEffects([{
      selector,
      effect: 'particle',
      type,
      options
    }]);
  },
  
  /**
   * Apply card effects
   */
  cards2: (type: string = 'lift-shadow', selector: string = '.card', options?: any) => {
    return initEffects([{
      selector,
      effect: 'card',
      type,
      options
    }]);
  }
};
