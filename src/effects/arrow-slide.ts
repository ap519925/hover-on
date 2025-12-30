/**
 * Arrow Slide Effect
 * Implements a "Read More" button with a sliding arrow
 */

export class ArrowSlideEffect {
    private element: HTMLElement;

    constructor(element: HTMLElement | string, options: ArrowSlideOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.init(options);
    }

    private init(options: ArrowSlideOptions): void {
        const {
            arrowContent = '»', // Allow custom arrow or icon char
            duration = '0.5s'
        } = options;

        this.element.classList.add('arrow-slide-btn');
        this.element.style.setProperty('--as-arrow', `"${arrowContent}"`);
        this.element.style.setProperty('--as-time', duration);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'arrow-slide-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .arrow-slide-btn {
        border-radius: 4px;
        background-color: #5ca1e1; /* Default if not set by user styles */
        border: none;
        color: #fff;
        text-align: center;
        font-size: 1.25rem;
        padding: 16px;
        width: 220px;
        transition: all var(--as-time, 0.5s);
        cursor: pointer;
        margin: 10px;
        display: inline-block;
        position: relative;
        overflow: hidden; /* Recommended for safety */
      }
      
      .arrow-slide-btn::after {
        content: var(--as-arrow, '»');
        position: absolute;
        opacity: 0;  
        top: 50%;
        transform: translateY(-50%);
        right: -20px;
        transition: var(--as-time, 0.5s);
      }
      
      .arrow-slide-btn:hover {
        padding-right: 36px;
        padding-left: 8px;
        background-color: #4a90d0; /* Slight darken usually expected */
      }
      
      .arrow-slide-btn:hover::after {
        opacity: 1;
        right: 14px;
      }
    `;
        document.head.appendChild(style);
    }
}

export interface ArrowSlideOptions {
    arrowContent?: string;
    duration?: string;
}
