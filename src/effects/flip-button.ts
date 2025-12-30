/**
 * Flip Button Effect
 * Implements a 3D flip effect showing different text on the back
 */

export class FlipButtonEffect {
    private element: HTMLElement;

    constructor(element: HTMLElement | string, options: FlipButtonOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.init(options);
    }

    private init(options: FlipButtonOptions): void {
        const {
            frontText = this.element.textContent || 'Front',
            backText = 'Back',
            duration = '0.5s',
            frontColor = '#323237',
            backColor = '#adadaf',
            textColor = '#fff'
        } = options;

        this.element.classList.add('btn-flip');
        this.element.setAttribute('data-front', frontText);
        this.element.setAttribute('data-back', backText);

        // Clear content as pseudo-elements handle it
        this.element.textContent = '';

        this.element.style.setProperty('--flip-speed', duration);
        this.element.style.setProperty('--flip-front-bg', frontColor);
        this.element.style.setProperty('--flip-back-bg', backColor);
        this.element.style.setProperty('--flip-text', textColor);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'flip-button-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .btn-flip {
        opacity: 1;
        outline: 0;
        line-height: 40px;
        position: relative;
        text-align: center;
        letter-spacing: 1px;
        display: inline-block;
        text-decoration: none;
        font-family: 'Open Sans', sans-serif;
        text-transform: uppercase;
        color: var(--flip-text, #fff);
        min-width: 100px;
        cursor: pointer;
      }
      
      .btn-flip:hover::after {
        opacity: 1;
        transform: translateY(0) rotateX(0);
      }
      
      .btn-flip:hover::before {
        opacity: 0;
        transform: translateY(50%) rotateX(90deg);
      }
      
      .btn-flip::after {
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        color: #323237;
        display: block;
        transition: var(--flip-speed, 0.5s);
        position: absolute;
        background: var(--flip-back-bg, #adadaf);
        content: attr(data-back);
        transform: translateY(-50%) rotateX(90deg);
      }
      
      .btn-flip::before {
        top: 0;
        left: 0;
        opacity: 1;
        color: var(--flip-back-bg, #adadaf);
        display: block;
        padding: 0 30px;
        line-height: 40px;
        transition: var(--flip-speed, 0.5s);
        position: relative;
        background: var(--flip-front-bg, #323237);
        content: attr(data-front);
        transform: translateY(0) rotateX(0);
      }
    `;
        document.head.appendChild(style);
    }
}

export interface FlipButtonOptions {
    frontText?: string;
    backText?: string;
    duration?: string;
    frontColor?: string;
    backColor?: string;
    textColor?: string;
}
