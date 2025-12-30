/**
 * Stripe Button Effect
 * Animated striped footer with infinite scroll
 */

export class StripeButtonEffect {
    private element: HTMLElement;

    constructor(element: HTMLElement | string, options: StripeButtonOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.init(options);
    }

    private init(options: StripeButtonOptions): void {
        const {
            color = '#666',
            hoverColor = '#fff',
            bgColor = '#fff',
            hoverBgColor = '#666',
            stripeHeight = '7px'
        } = options;

        this.element.classList.add('stripe-btn');
        this.element.style.setProperty('--sb-color', color);
        this.element.style.setProperty('--sb-hover-color', hoverColor);
        this.element.style.setProperty('--sb-bg', bgColor);
        this.element.style.setProperty('--sb-hover-bg', hoverBgColor);
        this.element.style.setProperty('--sb-height', stripeHeight);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'stripe-button-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .stripe-btn {
        display: block;
        text-decoration: none;
        text-transform: uppercase;
        padding: 16px 36px 22px;
        background-color: var(--sb-bg);
        color: var(--sb-color);
        border: 2px solid var(--sb-color);
        border-radius: 6px;
        margin-bottom: 16px;
        transition: all .5s ease;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        font-family: sans-serif;
        font-weight: bold;
      }
      
      .stripe-btn:after {
        content: '';
        display: block;
        height: var(--sb-height);
        width: 100%;
        background-image: repeating-linear-gradient(
            45deg,
            var(--sb-color),
            var(--sb-color) 1px,
            transparent 2px,
            transparent 5px
        );
        backface-visibility: hidden;
        border-top: 1px solid var(--sb-color);
        position: absolute;
        left: 0;
        bottom: 0;
        background-size: var(--sb-height) var(--sb-height);
      }
      
      .stripe-btn:hover {
        background-color: var(--sb-hover-bg);
        color: var(--sb-hover-color);
        border-color: var(--sb-hover-bg); /* Usually border matches active bg color */
      }
      
      .stripe-btn:hover:after {
        background-image: repeating-linear-gradient(
            45deg,
            var(--sb-hover-color),
            var(--sb-hover-color) 1px,
            transparent 2px,
            transparent 5px
        );
        border-top: 1px solid var(--sb-hover-bg);
        animation: stripe-slide 12s infinite linear forwards;
      }
      
      @keyframes stripe-slide {
        0% { background-position: 0% 0; }
        100% { background-position: 100% 0; }
      }
    `;
        document.head.appendChild(style);
    }
}

export interface StripeButtonOptions {
    color?: string;
    hoverColor?: string;
    bgColor?: string;
    hoverBgColor?: string;
    stripeHeight?: string;
}
