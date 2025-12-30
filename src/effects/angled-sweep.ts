/**
 * Angled Sweep Effect
 * Implements a diagonal sweeping fill effect (aka "Cool Beans")
 */

export class AngledSweepEffect {
    private element: HTMLElement;

    constructor(element: HTMLElement | string, options: AngledSweepOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.init(options);
    }

    private init(options: AngledSweepOptions): void {
        const {
            primaryColor = 'indigo',
            secondaryColor = 'yellow',
            textColor = 'yellow',
            hoverTextColor = 'indigo',
            angle = '10deg',
            duration = '0.2s'
        } = options;

        this.element.classList.add('angled-sweep-btn');

        this.element.style.setProperty('--as-primary', primaryColor);
        this.element.style.setProperty('--as-secondary', secondaryColor);
        this.element.style.setProperty('--as-text', textColor);
        this.element.style.setProperty('--as-hover-text', hoverTextColor);
        this.element.style.setProperty('--as-angle', angle);
        this.element.style.setProperty('--as-duration', duration);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'angled-sweep-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .angled-sweep-btn {
        border: 2px solid var(--as-primary, indigo);
        border-radius: 3rem;
        color: var(--as-text, yellow);
        font-family: inherit;
        font-size: 2rem;
        font-weight: 100;
        overflow: hidden;
        padding: 1rem 2rem;
        position: relative;
        text-decoration: none;
        transition: transform 0.2s ease-in-out, border 0.2s;
        will-change: transform;
        z-index: 0;
        background: transparent;
        cursor: pointer;
        display: inline-block;
      }
      
      .angled-sweep-btn::after {
        background-color: var(--as-secondary, yellow);
        border-radius: 3rem;
        content: '';
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        transform: translate(-100%, 0) rotate(var(--as-angle, 10deg));
        transform-origin: top left;
        transition: transform var(--as-duration, 0.2s) ease-out;
        will-change: transform;
        z-index: -1;
      }
      
      .angled-sweep-btn:hover::after {
        transform: translate(0, 0);
      }
      
      .angled-sweep-btn:hover {
        border: 2px solid transparent;
        color: var(--as-hover-text, indigo);
        transform: scale(1.05);
      }
    `;
        document.head.appendChild(style);
    }
}

export interface AngledSweepOptions {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    hoverTextColor?: string;
    angle?: string;
    duration?: string;
}
