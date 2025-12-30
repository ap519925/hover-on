/**
 * Advanced Button Effects
 * Complex button interactions and animations
 */

export class AdvancedButtonEffect {
  private element: HTMLElement;
  private type: AdvancedButtonType;

  constructor(element: HTMLElement | string, type: AdvancedButtonType = 'spinner', options: AdvancedButtonOptions = {}) {
    this.element = typeof element === 'string'
      ? document.querySelector(element) as HTMLElement
      : element;

    if (!this.element) {
      throw new Error('Element not found');
    }

    this.type = type;
    this.init(options);
  }

  private init(options: AdvancedButtonOptions): void {
    const {
      primaryColor = '#00f3ff', // Default neon blue
      secondaryColor = '#ff00ff',
      duration = '0.3s',
      glowIntensity = '20px'
    } = options;

    this.element.classList.add('advanced-btn', `btn-${this.type}`);
    this.element.style.setProperty('--primary-color', primaryColor);
    this.element.style.setProperty('--secondary-color', secondaryColor);
    this.element.style.setProperty('--duration', duration);
    this.element.style.setProperty('--glow-intensity', glowIntensity);

    // Add specific child elements for certain effects
    if (this.type === 'spinner') {
      // Wrap content in a span if not already
      if (!this.element.querySelector('.btn-content')) {
        const text = this.element.textContent;
        this.element.textContent = '';
        const contentSpan = document.createElement('span');
        contentSpan.className = 'btn-content';
        contentSpan.textContent = text;
        this.element.appendChild(contentSpan);

        const loader = document.createElement('div');
        loader.className = 'btn-spinner-loader';
        this.element.appendChild(loader);
      }

      this.element.addEventListener('click', () => {
        this.element.classList.add('loading');
        setTimeout(() => this.element.classList.remove('loading'), 3000); // Demo reset
      });
    }

    this.injectStyles();
  }

  private injectStyles(): void {
    const styleId = 'advanced-button-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .advanced-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 2rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
        outline: none;
        /* overflow: hidden; Removed global overflow hidden as some effects need overflow visible */ 
      }

      /* Spinner */
      .btn-spinner .btn-content {
        transition: opacity 0.3s;
      }
      .btn-spinner.loading .btn-content {
        opacity: 0;
      }
      .btn-spinner-loader {
        position: absolute;
        width: 1.5em;
        height: 1.5em;
        border: 3px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s linear infinite;
        opacity: 0;
        transition: opacity 0.3s;
      }
      .btn-spinner.loading .btn-spinner-loader {
        opacity: 1;
      }
      
      @keyframes spin { 100% { transform: rotate(360deg); } }

      /* Burst */
      .btn-burst {
        overflow: hidden;
      }
      .btn-burst::after {
        content: "";
        position: absolute;
        top: 50%; left: 50%;
        width: 0; height: 0;
        background: rgba(255,255,255,0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.4s, height 0.4s;
      }
      .btn-burst:active::after {
        width: 200%; height: 200%;
        transition: 0s;
      }

      /* Neon */
      .btn-neon {
        background: transparent;
        border: 2px solid var(--primary-color, #0ff);
        color: var(--primary-color, #0ff);
        font-family: monospace;
        letter-spacing: 2px;
        box-shadow: 0 0 10px var(--primary-color, #0ff), inset 0 0 10px var(--primary-color, #0ff);
      }
      .btn-neon:hover {
        background: var(--primary-color, #0ff);
        color: #000;
        box-shadow: 0 0 20px var(--primary-color, #0ff), inset 0 0 20px var(--primary-color, #0ff);
      }

      /* Float Up (Magnetic) */
      .btn-float-up {
        transform: translateY(0);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      }
      .btn-float-up:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 25px rgba(0,0,0,0.2);
      }

      /* 1. Track Expand (btn-2) */
      .btn-track-expand {
        letter-spacing: 0;
        background: transparent;
        color: inherit;
        overflow: visible;
      }
      .btn-track-expand:hover {
        letter-spacing: 5px;
      }
      .btn-track-expand::before,
      .btn-track-expand::after {
        content: "";
        display: block;
        height: 1px;
        width: 0;
        background: currentColor;
        position: absolute;
        transition: width 0.3s ease-in-out;
        left: 50%;
        transform: translateX(-50%);
      }
      .btn-track-expand::before { top: 0; }
      .btn-track-expand::after { bottom: 0; }
      
      .btn-track-expand:hover::before,
      .btn-track-expand:hover::after {
        width: 100%;
      }

      /* 2. Retro 3D (btn-3) */
      .btn-retro-3d {
        background: #efefef;
        border: 1px solid #ccc;
        box-shadow: 0px 2px 0 #999, 2px 4px 6px #ddd;
        transition: all 150ms linear;
        color: #333;
      }
      .btn-retro-3d:hover {
        background: #e5e5e5;
        border: 1px solid rgba(0,0,0,0.05);
        box-shadow: 1px 1px 2px rgba(255,255,255,0.2);
        transform: translateY(2px);
      }

      /* 3. Shine Slide (btn-4) */
      .btn-shine-slide {
        border: 1px solid currentColor;
        overflow: hidden;
        position: relative;
        background: transparent;
      }
      .btn-shine-slide::after {
        background: #fff;
        content: "";
        height: 155px;
        left: -75px;
        opacity: .2;
        position: absolute;
        top: -50px;
        transform: rotate(35deg);
        transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
        width: 50px;
        z-index: 1;
      }
      .btn-shine-slide:hover::after {
        left: 120%;
      }

      /* 4. Outline Pulse (btn-5) */
      .btn-outline-pulse {
        border: 0 solid;
        box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
        outline: 2px solid;
        outline-color: rgba(0, 0, 0, .5);
        outline-offset: 0px;
        text-shadow: none;
        transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
      }
      .btn-outline-pulse:hover {
        border: 1px solid;
        box-shadow: inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2);
        outline-color: rgba(255, 255, 255, 0);
        outline-offset: 15px;
        text-shadow: 1px 1px 2px #427388;
      }
    `;
    document.head.appendChild(style);
  }
}

export type AdvancedButtonType = 'spinner' | 'burst' | 'revolve' | 'pressdown' | 'offset' | 'neon' | 'warp' | 'split-sides' | 'inside-out' | 'gradient-animated' | 'border-wipe' | 'float-up' | 'strikethrough' | '3d-flip' | 'popup' | 'track-expand' | 'retro-3d' | 'shine-slide' | 'outline-pulse';

export interface AdvancedButtonOptions {
  primaryColor?: string;
  secondaryColor?: string;
  duration?: string;
  glowIntensity?: string;
}
