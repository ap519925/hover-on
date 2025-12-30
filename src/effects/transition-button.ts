/**
 * Transition Button Effect
 * CSS3 Transition-based buttons (Block Shadow & Outline Fill)
 */

export class TransitionButtonEffect {
    private element: HTMLElement;
    private type: TransitionButtonType;

    constructor(element: HTMLElement | string, type: TransitionButtonType = 'block', options: TransitionButtonOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: TransitionButtonOptions): void {
        const {
            color = '#e74c3c', // Default red
            textColor = '#ecf0f1'
        } = options;

        this.element.classList.add('transition-btn', `tb-${this.type}`);
        this.element.style.setProperty('--tb-color', color);
        this.element.style.setProperty('--tb-text', textColor);

        // Derived colors logic (lighten/darken) - We use CSS filters or calc-mix if possible,
        // but standard CSS doesn't support 'lighten()' natively like Sass.
        // Instead, we'll use HSL calc or filters.
        // Simplest approach: Use CSS filters on pseudo elements or semi-transparent overlays.
        // Or just let the user provide shades if they want perfect control.
        // For now, I'll use `brightness()` filter which is widely supported.

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'transition-button-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .transition-btn {
        min-width: 130px;
        position: relative;
        display: inline-block;
        text-align: center;
        text-transform: uppercase; 
        padding: 15px;
        margin: 10px;
        font-weight: 600;
        transition: 0.5s;
        cursor: pointer;
        font-family: Arial, sans-serif;
      }

      /* BLOCK SHADOW STYLE (tr) */
      .tb-block {
        background-color: var(--tb-color);
        color: var(--tb-text);
      }
      
      .tb-block::before {
        position: absolute;
        content: "";
        /* 
           Simulate lighten/darken borders using semi-transparent white/black
           Top/Left = Light (white), Bottom/Right = Dark (black) 
        */
        border-top: 5px solid rgba(255,255,255,0.2);
        border-left: 5px solid rgba(255,255,255,0.2);
        border-right: 5px solid rgba(0,0,0,0.2);
        border-bottom: 5px solid rgba(0,0,0,0.2);
        
        top: 0px; right: 0px; bottom: 0px; left: 0px;	
        transition: 0.5s;
      }
      
      .tb-block:hover {
        /* box-shadow: 7px 7px darken, -7px -7px lighten */
        box-shadow: 
           7px 7px 0 rgba(0,0,0,0.2), 
          -7px -7px 0 rgba(255,255,255,0.2);
      }
      
      .tb-block:hover::before {
        border: 0px solid transparent;
      }

      /* OUTLINE FILL STYLE (qa) */
      .tb-outline {
        border: 5px solid var(--tb-color);
        color: var(--tb-color);
        background: transparent;
        padding: 10px 15px; /* Compense for border */
      }
      
      .tb-outline:hover {
        background-color: var(--tb-color);
        /* Use filter to darken bg slightly if we could, but here we just fill */
        /* To match request: darken bg, lighten border */
        box-shadow: inset 0 0 0 100px rgba(0,0,0,0.1); /* Darken bg simulation */
        border-color: rgba(255,255,255,0.2); /* "Lighten" border simulation */
        color: var(--tb-text);
      }
    `;
        document.head.appendChild(style);
    }
}

export type TransitionButtonType = 'block' | 'outline';

export interface TransitionButtonOptions {
    color?: string;
    textColor?: string;
}
