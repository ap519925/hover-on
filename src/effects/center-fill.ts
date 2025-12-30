/**
 * Center Fill Effect
 * Expands a background fill from the center outwards
 */

export class CenterFillEffect {
    private element: HTMLElement;
    private type: CenterFillType;

    constructor(element: HTMLElement | string, type: CenterFillType = 'light', options: CenterFillOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: CenterFillOptions): void {
        const {
            color = '#FF0072', // primary default
            textColor = '#FF0072',
            hoverTextColor = '#FFF'
        } = options;

        this.element.classList.add('center-fill-btn', `cf-${this.type}`);
        this.element.style.setProperty('--cf-color', color);
        this.element.style.setProperty('--cf-text', textColor);
        this.element.style.setProperty('--cf-hover-text', hoverTextColor);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'center-fill-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .center-fill-btn {
        font-size: 18px;
        letter-spacing: 2px;
        text-transform: uppercase;
        display: inline-block;
        text-align: center;
        width: 270px;
        font-weight: bold;
        padding: 14px 0px;
        border: 3px solid var(--cf-color);
        border-radius: 2px;
        position: relative;
        box-shadow: 0 2px 10px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.1);
        text-decoration: none;
        transition: 0.3s ease all;
        z-index: 1;
        cursor: pointer;
        background: transparent;
        color: var(--cf-text);
      }
      
      .center-fill-btn::before {
        transition: 0.5s all ease;
        position: absolute;
        top: 0;
        left: 50%;
        right: 50%;
        bottom: 0;
        opacity: 0;
        content: '';
        background-color: var(--cf-color);
        z-index: -1;
      }
      
      .center-fill-btn:hover,
      .center-fill-btn:focus {
        color: var(--cf-hover-text);
      }
      
      .center-fill-btn:hover::before,
      .center-fill-btn:focus::before {
        transition: 0.5s all ease;
        left: 0;
        right: 0;
        opacity: 1;
      }
    `;
        document.head.appendChild(style);
    }
}

export type CenterFillType = 'light' | 'dark'; // Inherited logic via colors, kept for API consistency

export interface CenterFillOptions {
    color?: string;
    textColor?: string;
    hoverTextColor?: string;
}
