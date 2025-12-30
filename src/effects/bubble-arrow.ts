/**
 * Bubble Arrow Effect
 * Expanding bubble with arrow slide animation
 */

export class BubbleArrowEffect {
    private element: HTMLElement;

    constructor(element: HTMLElement | string, options: BubbleArrowOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.init(options);
    }

    private init(options: BubbleArrowOptions): void {
        const {
            primaryColor = '#FFAB9D',
            color = '#111'
        } = options;

        this.element.classList.add('bubble-arrow-btn');
        this.element.style.setProperty('--ba-primary', primaryColor);
        this.element.style.setProperty('--ba-color', color);

        // Inject SVG if missing
        if (!this.element.querySelector('svg')) {
            // Wrap existing text in span
            if (!this.element.querySelector('span')) {
                const text = this.element.textContent;
                this.element.textContent = '';
                const span = document.createElement('span');
                span.textContent = text;
                this.element.appendChild(span);
            }

            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute('width', '13px');
            svg.setAttribute('height', '10px');
            svg.setAttribute('viewBox', '0 0 13 10');
            svg.innerHTML = `
         <path d="M1,5 L11,5"></path>
         <polyline points="8 1 12 5 8 9"></polyline>
       `;
            this.element.appendChild(svg);
        }

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'bubble-arrow-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .bubble-arrow-btn {
        position: relative;
        margin: auto;
        padding: 19px 22px;
        transition: all .2s ease;
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        color: var(--ba-color);
        cursor: pointer;
        border: none;
        background: transparent;
      }
      
      .bubble-arrow-btn::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        border-radius: 28px;
        background: var(--ba-primary); /* Base color, opacity handled in pseudo or here */
        opacity: 0.5; /* rgba($primary,.5) simulation */
        width: 56px;
        height: 56px;
        transition: all .3s ease;
        z-index: -1;
      }
      
      .bubble-arrow-btn span {
        position: relative;
        font-size: 16px;
        line-height: 18px;
        font-weight: 900;
        letter-spacing: .25em;
        text-transform: uppercase;
        vertical-align: middle;
      }
      
      .bubble-arrow-btn svg {
        position: relative;
        top: 0;
        margin-left: 10px;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: var(--ba-color);
        stroke-width: 2;
        transform: translateX(-5px);
        transition: all .3s ease;
      }
      
      .bubble-arrow-btn:hover::before {
        width: 100%;
        opacity: 1; /* rgba($primary,1) */
      }
      
      .bubble-arrow-btn:hover svg {
        transform: translateX(0);
      }
      
      .bubble-arrow-btn:active {
        transform: scale(.96);
      }
    `;
        document.head.appendChild(style);
    }
}

export interface BubbleArrowOptions {
    primaryColor?: string;
    color?: string;
}
