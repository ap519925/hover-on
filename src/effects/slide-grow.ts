/**
 * Slide & Grow Effects
 * Sliding backgrounds and growing shapes for button fills
 */

export class SlideGrowEffect {
    private element: HTMLElement;
    private type: SlideGrowType;

    constructor(element: HTMLElement | string, type: SlideGrowType = 'slide-left', options: SlideGrowOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: SlideGrowOptions): void {
        const {
            bgColor = '#3498db',
            fillColor = '#ecf0f1',
            textColor = '#fff',
            hoverTextColor = '#3498db',
            duration = '0.35s'
        } = options;

        this.element.classList.add('slide-grow-btn', `sg-${this.type}`);
        this.element.style.setProperty('--sg-bg', bgColor);
        this.element.style.setProperty('--sg-fill', fillColor);
        this.element.style.setProperty('--sg-text', textColor);
        this.element.style.setProperty('--sg-hover-text', hoverTextColor);
        this.element.style.setProperty('--sg-duration', duration);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'slide-grow-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .slide-grow-btn {
        font-size: 1.25em; /* Scaled relative to parent */
        background: var(--sg-bg);
        color: var(--sg-text);
        border: 0.25rem solid var(--sg-bg);
        padding: 0.85em 0.75em;
        margin: 1rem;
        position: relative;
        z-index: 1;
        overflow: hidden;
        cursor: pointer;
        font-family: inherit;
        font-weight: bold;
        text-transform: uppercase;
        display: inline-block;
        text-decoration: none;
        transition: color var(--sg-duration);
      }
      
      .slide-grow-btn:hover {
        color: var(--sg-hover-text);
      }
      
      .slide-grow-btn::after {
        content: "";
        background: var(--sg-fill);
        position: absolute;
        z-index: -1;
        padding: 0.85em 0.75em;
        display: block;
      }
      
      /* Slides */
      .sg-slide-left::after,
      .sg-slide-right::after,
      .sg-slide-top::after,
      .sg-slide-bottom::after {
        transition: all var(--sg-duration);
      }
      
      .sg-slide-left:hover::after,
      .sg-slide-right:hover::after,
      .sg-slide-top:hover::after,
      .sg-slide-bottom:hover::after {
        left: 0; right: 0; top: 0; bottom: 0;
      }
      
      .sg-slide-left::after {
        top: 0; bottom: 0; left: -100%; right: 100%;
      }
      
      .sg-slide-right::after {
        top: 0; bottom: 0; left: 100%; right: -100%;
      }
      
      .sg-slide-top::after {
        left: 0; right: 0; top: -100%; bottom: 100%;
      }
      
      .sg-slide-bottom::after {
        left: 0; right: 0; top: 100%; bottom: -100%;
      }
      
      /* Grows */
      .sg-grow-box::after,
      .sg-grow-ellipse::after,
      .sg-grow-skew-fwd::after,
      .sg-grow-skew-bwd::after,
      .sg-grow-spin::after {
        transition: all 0.3s ease;
      }
      
      .slide-grow-btn[class*="grow"]:hover::after {
        transition: all 0.3s ease-out;
      }
      
      .sg-grow-box::after {
        left: 0; right: 0; top: 0; bottom: 0;
        transform: scale(0, 0);
      }
      .sg-grow-box:hover::after {
        transform: scale(1, 1);
      }
      
      .sg-grow-ellipse::after {
        border-radius: 50%;
        left: -50%; right: -50%;
        top: -150%; bottom: -150%;
        transform: scale(0, 0);
      }
      .sg-grow-ellipse:hover::after {
        transform: scale(1, 1);
      }
      
      .sg-grow-skew-fwd::after {
        left: -20%; right: -20%; top: 0; bottom: 0;
        transform: skewX(-45deg) scale(0, 1);
      }
      .sg-grow-skew-fwd:hover::after {
        transform: skewX(-45deg) scale(1, 1);
      }
      
      .sg-grow-skew-bwd::after {
        left: -20%; right: -20%; top: 0; bottom: 0;
        transform: skewX(45deg) scale(0, 1);
      }
      .sg-grow-skew-bwd:hover::after {
        transform: skewX(45deg) scale(1, 1);
      }
      
      .sg-grow-spin::after {
        left: 0; right: 0; top: 0; bottom: 0;
        transform: scale(0, 0) rotate(-180deg);
      }
      .sg-grow-spin:hover::after {
        transform: scale(1, 1) rotate(0deg);
      }
    `;
        document.head.appendChild(style);
    }
}

export type SlideGrowType = 'slide-left' | 'slide-right' | 'slide-top' | 'slide-bottom' | 'grow-box' | 'grow-ellipse' | 'grow-skew-fwd' | 'grow-skew-bwd' | 'grow-spin';

export interface SlideGrowOptions {
    bgColor?: string;
    fillColor?: string;
    textColor?: string;
    hoverTextColor?: string;
    duration?: string;
}
