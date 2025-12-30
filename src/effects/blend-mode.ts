/**
 * Blend Mode Fill Effect
 * expanding background with text color inversion using mix-blend-mode
 */

export class BlendModeEffect {
    private element: HTMLElement;
    private type: BlendModeType;

    constructor(element: HTMLElement | string, type: BlendModeType = 'partial', options: BlendModeOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: BlendModeOptions): void {
        const {
            color = '#000', // Fill color
            textColor = '#fff', // Base text color which will be diffed
            startWidth = '50%',
            duration = '0.85s',
            borderRadius = '0px'
        } = options;

        this.element.classList.add('blend-mode-btn');
        if (this.type === 'rounded') {
            this.element.classList.add('blend-rounded');
        }

        this.element.style.setProperty('--bm-color', color);
        this.element.style.setProperty('--bm-text', textColor);
        this.element.style.setProperty('--bm-start', this.type === 'rounded' ? '25%' : startWidth);
        this.element.style.setProperty('--bm-duration', duration);
        this.element.style.setProperty('--bm-radius', this.type === 'rounded' ? '50px' : borderRadius);

        // Wrap text if needed
        if (!this.element.querySelector('.blend-text')) {
            const text = this.element.textContent;
            this.element.textContent = '';
            const span = document.createElement('span');
            span.className = 'blend-text';
            span.textContent = text;
            this.element.appendChild(span);
        }

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'blend-mode-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .blend-mode-btn {
        margin: 10px;
        border: none;
        padding: 10px 44px;
        font-size: 24px; /* Scaled down slightly from original 36px */
        position: relative;
        cursor: pointer;
        display: inline-block;
        background: transparent;
        border-radius: var(--bm-radius);
      }
      
      .blend-mode-btn .blend-text {
        color: var(--bm-text);
        mix-blend-mode: difference;
        position: relative;
        z-index: 2;
        font-weight: bold;
      }
      
      .blend-mode-btn::before {
        transition: all var(--bm-duration) cubic-bezier(0.68, -0.55, 0.265, 1.55);
        content: '';
        width: var(--bm-start);
        height: 100%;
        background: var(--bm-color);
        position: absolute;
        top: 0;
        left: 0;
        border-radius: var(--bm-radius);
      }
      
      .blend-mode-btn:hover::before {
        width: 100%;
      }
    `;
        document.head.appendChild(style);
    }
}

export type BlendModeType = 'partial' | 'rounded';

export interface BlendModeOptions {
    color?: string;
    textColor?: string;
    startWidth?: string;
    duration?: string;
    borderRadius?: string;
}
