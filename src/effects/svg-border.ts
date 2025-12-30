/**
 * SVG Border Effect
 * Uses SVG dash-array animation to draw borders
 */

export class SvgBorderEffect {
    private element: HTMLElement;

    constructor(element: HTMLElement | string, options: SvgBorderOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.init(options);
    }

    private init(options: SvgBorderOptions): void {
        const {
            color = '#fff',
            thickness = '2',
            duration = '1s',
            text = this.element.textContent || 'Button',
            rx = 0, // border radius for rect
            ry = 0
        } = options;

        this.element.classList.add('svg-border-btn');
        this.element.textContent = ''; // clear text

        // Create SVG container structure
        // We need to know dimensions. If dynamic, we might need ResizeObserver.
        // For now, we assume fixed or we use 100% and a viewBox calculator if possible.
        // Easier approach: Use absolute positioning for SVG over the button.

        // We can't easily animate stroke-dasharray if we don't know the path length.
        // But we can approximate using 100% width/height rects.

        const w = this.element.offsetWidth || 180;
        const h = this.element.offsetHeight || 60;

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('class', 'border-svg');
        // We'll use a rect instead of polyline for easier resizing support
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute('x', '1');
        rect.setAttribute('y', '1');
        rect.setAttribute('width', 'calc(100% - 2px)');
        rect.setAttribute('height', 'calc(100% - 2px)');
        rect.setAttribute('rx', rx.toString());
        rect.setAttribute('ry', ry.toString());
        rect.setAttribute('class', 'hl-line');

        svg.appendChild(rect);

        const span = document.createElement('span');
        span.textContent = text;

        this.element.appendChild(svg);
        this.element.appendChild(span);

        // CSS Variables for styling
        this.element.style.setProperty('--svg-color', color);
        this.element.style.setProperty('--svg-time', duration);
        this.element.style.setProperty('--svg-thick', thickness + 'px');

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'svg-border-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .svg-border-btn {
        position: relative;
        cursor: pointer;
        background: transparent;
        border: 0 solid var(--svg-color); /* Fallback */
        outline: none;
        transition: background 1s ease-in-out;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0; /* Let SVG decide or use absolute */
        min-width: 180px;
        min-height: 60px;
        overflow: hidden; /* Contains SVG */
      }
      
      .svg-border-btn span {
        position: relative;
        z-index: 1;
        color: white;
        font-family: sans-serif;
        font-weight: 100;
        font-size: 18px;
      }
      
      .border-svg {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        fill: none;
      }
      
      .hl-line {
        stroke: var(--svg-color, #fff);
        stroke-width: var(--svg-thick, 2px);
        /* Large dasharray to cover perimeter. 1000 is safe for small buttons. */
        stroke-dasharray: 150 480; 
        stroke-dashoffset: 150;
        transition: stroke-dashoffset var(--svg-time, 1s) ease-in-out;
      }
      
      .svg-border-btn:hover {
        background: rgba(255,255,255,0.1); 
      }
      
      .svg-border-btn:hover .hl-line {
        stroke-dashoffset: -480;
      }
    `;
        document.head.appendChild(style);
    }
}

export interface SvgBorderOptions {
    color?: string;
    thickness?: string;
    duration?: string;
    text?: string;
    rx?: number;
    ry?: number;
}
