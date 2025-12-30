/**
 * Complex Border Effects
 * Advanced border animations using pseudo-elements
 */

export class ComplexBorderEffect {
    private element: HTMLElement;
    private type: ComplexBorderType;

    constructor(element: HTMLElement | string, type: ComplexBorderType = 'shrink', options: ComplexBorderOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: ComplexBorderOptions): void {
        const {
            color = '#32323c',
            hoverColor = '#ffffff'
        } = options;

        this.element.classList.add('complex-border-base', `complex-${this.type}`);
        this.element.style.setProperty('--cb-color', color);
        this.element.style.setProperty('--cb-hover-color', hoverColor);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'complex-border-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .complex-border-base {
        position: relative;
        border: none;
        font-family: inherit;
        text-transform: uppercase;
        font-size: 18px;
        transition: color 0.5s, transform 0.2s, background-color 0.2s;
        outline: none;
        cursor: pointer;
        padding: 23px 33px;
        border: 3px solid transparent; /* space reserved */
        background: transparent;
        color: var(--cb-color, #333);
        margin: 10px;
        display: inline-block;
      }
      
      .complex-border-base:active {
        transform: translateY(3px);
      }
      
      .complex-border-base:hover {
        color: var(--cb-hover-color, #eee);
      }

      /* Shrink Border */
      .complex-shrink {
        color: var(--cb-color);
      }

      .complex-shrink::before {
        content: "";
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        width: 100%; height: 100%;
        border: 3px solid var(--cb-color);
        transition: opacity 0.3s, border 0.3s;
        border-radius: 3px;
      }
      
      .complex-shrink:hover::before {
        opacity: 0;
      }
      
      .complex-shrink::after {
        content: "";
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        width: 100%; height: 100%;
        background-color: transparent;
        border: 3px solid var(--cb-hover-color);
        opacity: 0;
        z-index: -1;
        transform: scaleX(1.1) scaleY(1.3);
        transition: transform 0.3s, opacity 0.3s;
        border-radius: 3px;
      }
      
      .complex-shrink:hover::after {
        opacity: 1;
        transform: scaleX(1) scaleY(1);
      }

      /* Material Bubble */
      .complex-bubble {
        overflow: hidden;
      }
      
      .complex-bubble::before {
        content: "";
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        border: 3px solid var(--cb-color);
        transition: opacity 0.3s;
        border-radius: 3px;
      }
      
      .complex-bubble:hover::before {
        opacity: 0;
      }
      
      .complex-bubble::after {
        content: "";
        position: absolute;
        top: 0; left: 0;
        width: 200px; height: 200px;
        background-color: var(--cb-color); /* Usually darker version */
        border-radius: 50%;
        transform: translate(-10px, -70px) scale(0.1);
        opacity: 0;
        z-index: -1;
        transition: transform 0.3s, opacity 0.3s;
        transform-origin: center;
      }
      
      .complex-bubble:hover::after {
        opacity: 1;
        transform: scale(1.5) translate(-10px, -70px);
      }
    `;
        document.head.appendChild(style);
    }
}

export type ComplexBorderType = 'shrink' | 'bubble';

export interface ComplexBorderOptions {
    color?: string;
    hoverColor?: string;
}
