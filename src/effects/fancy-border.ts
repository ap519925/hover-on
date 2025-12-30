/**
 * Fancy Border Effect
 * Cross-hair style animated border collapse
 */

export class FancyBorderEffect {
    private element: HTMLElement;

    constructor(element: HTMLElement | string, options: FancyBorderOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.init(options);
    }

    private init(options: FancyBorderOptions): void {
        const {
            color = '#e55743',
            offset = '10px',
            borderSize = '2px'
        } = options;

        this.element.classList.add('fancy-btn');
        this.element.style.setProperty('--fb-color', color);
        this.element.style.setProperty('--fb-offset', offset);
        this.element.style.setProperty('--fb-size', borderSize);

        // Inject helper divs
        // .button__horizontal, .button__vertical
        if (!this.element.querySelector('.fancy-horizontal')) {
            const h = document.createElement('div');
            h.className = 'fancy-horizontal';
            const v = document.createElement('div');
            v.className = 'fancy-vertical';

            this.element.appendChild(h);
            this.element.appendChild(v);
        }

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'fancy-border-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .fancy-btn {
        display: inline-block;
        position: relative;
        padding: 1.5em 3em;
        appearance: none;
        border: 0;
        background: transparent;
        color: var(--fb-color);
        text-transform: uppercase;
        letter-spacing: .25em;
        outline: none;
        cursor: pointer;
        font-weight: bold;
        border-radius: 0;
        box-shadow: inset 0 0 0 var(--fb-size) var(--fb-color);
        transition: background .8s ease;
      }
      
      .fancy-btn:hover {
        background: rgba(100, 0, 0, .03);
      }
      
      .fancy-horizontal,
      .fancy-vertical {
        position: absolute;
        top: var(--horizontal-offset, 0);
        right: var(--vertical-offset, 0);
        bottom: var(--horizontal-offset, 0);
        left: var(--vertical-offset, 0);
        transition: transform .8s ease;
        will-change: transform;
        pointer-events: none;
      }
      
      .fancy-horizontal::before,
      .fancy-vertical::before {
        content: '';
        position: absolute;
        border: inherit;
      }
      
      .fancy-horizontal {
        --vertical-offset: calc(var(--fb-offset) * -1);
        border-top: var(--fb-size) solid var(--fb-color);
        border-bottom: var(--fb-size) solid var(--fb-color);
      }
      
      .fancy-horizontal::before {
        top: calc(var(--vertical-offset) - var(--fb-size));
        bottom: calc(var(--vertical-offset) - var(--fb-size));
        left: calc(var(--vertical-offset) * -1);
        right: calc(var(--vertical-offset) * -1);
      }
      
      .fancy-btn:hover .fancy-horizontal {
        transform: scaleX(0);
      }
      
      .fancy-vertical {
        --horizontal-offset: calc(var(--fb-offset) * -1);
        border-left: var(--fb-size) solid var(--fb-color);
        border-right: var(--fb-size) solid var(--fb-color);
      }
      
      .fancy-vertical::before {
        top: calc(var(--horizontal-offset) * -1);
        bottom: calc(var(--horizontal-offset) * -1);
        left: calc(var(--horizontal-offset) - var(--fb-size));
        right: calc(var(--horizontal-offset) - var(--fb-size));
      }
      
      .fancy-btn:hover .fancy-vertical {
        transform: scaleY(0);
      }
    `;
        document.head.appendChild(style);
    }
}

export interface FancyBorderOptions {
    color?: string;
    offset?: string;
    borderSize?: string;
}
