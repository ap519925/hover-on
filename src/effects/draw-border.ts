/**
 * Draw Border Effect
 * Sequentially draws borders around an element
 */

export class DrawBorderEffect {
    private element: HTMLElement;

    constructor(element: HTMLElement | string, options: DrawBorderOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.init(options);
    }

    private init(options: DrawBorderOptions): void {
        const {
            color = '#58afd1',
            hoverColor = '#ffe593',
            width = '2px', // Renamed from thickness to width in original req
            duration = '0.25s'
        } = options;

        this.element.classList.add('draw-border-btn');
        this.element.style.setProperty('--db-color', color);
        this.element.style.setProperty('--db-hover-color', hoverColor);
        this.element.style.setProperty('--db-width', width);
        this.element.style.setProperty('--db-duration', duration);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'draw-border-style-new';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .draw-border-btn {
        box-shadow: inset 0 0 0 var(--db-width) var(--db-color);
        color: var(--db-color);
        transition: color var(--db-duration) calc(var(--db-duration) / 3);
        position: relative;
        background: none;
        border: none;
        cursor: pointer;
        padding: 1em 2em;
        font-weight: 700;
        text-transform: uppercase;
      }
      
      .draw-border-btn::before,
      .draw-border-btn::after {
        border: 0 solid transparent;
        box-sizing: border-box;
        content: '';
        pointer-events: none;
        position: absolute;
        width: 0; height: 0;
        top: 0; left: 0;
      }

      .draw-border-btn::before {
        border-top-width: var(--db-width);
        border-right-width: var(--db-width);
      }
      
      .draw-border-btn::after {
        border-bottom-width: var(--db-width);
        border-left-width: var(--db-width);
      }
      
      .draw-border-btn:hover {
        color: var(--db-hover-color);
      }
      
      .draw-border-btn:hover::before,
      .draw-border-btn:hover::after {
        border-color: var(--db-hover-color);
        transition: border-color 0s, width var(--db-duration), height var(--db-duration);
        width: 100%;
        height: 100%;
      }
      
      .draw-border-btn:hover::before {
        transition-delay: 0s, 0s, var(--db-duration);
      }
      
      .draw-border-btn:hover::after {
        transition-delay: 0s, var(--db-duration), 0s;
      }
    `;
        document.head.appendChild(style);
    }
}

export interface DrawBorderOptions {
    color?: string;
    hoverColor?: string;
    width?: string;
    duration?: string;
}
