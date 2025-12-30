/**
 * Liquid Fill Effect
 * Navigation items with staggered rising liquid bubbles
 */

export class LiquidFillEffect {
    private element: HTMLElement;

    constructor(element: HTMLElement | string, options: LiquidFillOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.init(options);
    }

    private init(options: LiquidFillOptions): void {
        const {
            color = 'goldenrod',
            textColor = 'black'
        } = options;

        this.element.classList.add('liquid-fill-btn');
        this.element.style.setProperty('--lf-color', color);
        this.element.style.setProperty('--lf-hover-text', textColor);

        // Inject 4 spans if missing
        if (this.element.querySelectorAll('span').length < 4) {
            // Clear text to wrap it properly if needed, but here text is direct child.
            // We just append spans.
            for (let i = 1; i <= 4; i++) {
                const span = document.createElement('span');
                // We can't easily set CSS var in inline style without casting, so we rely on nth-child in CSS
                // Or we set style directly
                span.style.setProperty('--n', i.toString());
                this.element.appendChild(span);
            }
        }

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'liquid-fill-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .liquid-fill-btn {
        color: var(--lf-color);
        font-size: 16px;
        border: 0.3em solid var(--lf-color);
        border-radius: 0.5em;
        width: 12em;
        height: 3em;
        text-transform: uppercase;
        font-weight: bold;
        font-family: sans-serif;
        letter-spacing: 0.1em;
        text-align: center;
        line-height: 3em;
        position: relative;
        overflow: hidden;
        z-index: 1;
        transition: 0.5s;
        margin: 1em;
        cursor: pointer;
        display: inline-block;
        text-decoration: none;
      }
      
      .liquid-fill-btn span {
        position: absolute;
        width: 25%;
        height: 100%;
        background-color: var(--lf-color);
        transform: translateY(150%);
        border-radius: 50%;
        left: calc((var(--n) - 1) * 25%);
        transition: 0.5s;
        transition-delay: calc((var(--n) - 1) * 0.1s);
        z-index: -1;
      }
      
      .liquid-fill-btn:hover {
        color: var(--lf-hover-text);
      }
      
      .liquid-fill-btn:hover span {
        transform: translateY(0) scale(2);
      }
    `;
        document.head.appendChild(style);
    }
}

export interface LiquidFillOptions {
    color?: string;
    textColor?: string;
}
