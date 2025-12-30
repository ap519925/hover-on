/**
 * SVG Oval Button Effect
 * Complex SVG animation where a circle collapses and borders draw in
 */

export class SvgOvalEffect {
    private element: HTMLElement;

    constructor(element: HTMLElement | string, options: SvgOvalOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.init(options);
    }

    private init(options: SvgOvalOptions): void {
        const {
            color = '#fff',
            textColor = '#000',
            hoverTextColor = '#fff'
        } = options;

        this.element.classList.add('svg-oval-btn');
        this.element.style.setProperty('--so-color', color);
        this.element.style.setProperty('--so-text', textColor);
        this.element.style.setProperty('--so-hover-text', hoverTextColor);

        // Inject Structure
        // .btn--svg__label + svg.circle + svg.border
        // We use innerHTML for simplicity given the complex paths
        const text = this.element.textContent || 'Hover me';
        this.element.textContent = '';

        const label = document.createElement('span');
        label.className = 'svg-oval-label';
        label.textContent = text;
        this.element.appendChild(label);

        // Circle SVG
        const circleSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        circleSvg.setAttribute('class', 'svg-oval-circle');
        circleSvg.setAttribute('width', '190');
        circleSvg.setAttribute('viewBox', '0 0 60 60');
        circleSvg.innerHTML = `<circle fill="${color}" cx="30" cy="30" r="28.7"></circle>`;
        this.element.appendChild(circleSvg);

        // Border SVG
        const borderSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        borderSvg.setAttribute('class', 'svg-oval-border');
        borderSvg.setAttribute('width', '190');
        borderSvg.setAttribute('viewBox', '2 29.3 56.9 13.4');
        borderSvg.setAttribute('preserveAspectRatio', 'none');

        // Paths
        borderSvg.innerHTML = `
      <g class="svg-oval-border-left">
        <path fill="none" stroke="${color}" stroke-width="0.5" stroke-miterlimit="1" d="M30.4,41.9H9c0,0-6.2-0.3-6.2-5.9S9,30.1,9,30.1h21.4"/>
      </g>
      <g class="svg-oval-border-right">
        <path fill="none" stroke="${color}" stroke-width="0.5" stroke-miterlimit="1" d="M30.4,41.9h21.5c0,0,6.1-0.4,6.1-5.9s-6-5.9-6-5.9H30.4"/>
      </g>
    `;
        this.element.appendChild(borderSvg);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'svg-oval-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .svg-oval-btn {
        position: relative;
        height: 42px;
        width: 190px;
        overflow: hidden;
        border-radius: 21px;
        display: inline-block;
        background: transparent;
        cursor: pointer;
        padding: 0;
        border: none;
      }
      
      .svg-oval-label {
        font-family: sans-serif;
        font-weight: bold;
        text-align: center;
        color: var(--so-text);
        z-index: 3;
        width: 100%;
        transition: color 0.5s ease-in-out;
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
      }
      
      .svg-oval-circle,
      .svg-oval-border {
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
      }
      
      .svg-oval-circle circle {
        transition: transform 0.5s ease-in-out;
        transform: scale(1.1);
        transform-origin: 50% 50%;
      }
      
      .svg-oval-border-left path,
      .svg-oval-border-right path {
        stroke-dasharray: 61.82 61.82;
        transition: stroke-dashoffset 0s ease-in-out 0.5s; /* Delay reset */
      }
      
      .svg-oval-border-left path { stroke-dashoffset: -61.82; }
      .svg-oval-border-right path { stroke-dashoffset: 61.82; }
      
      /* Hover State */
      .svg-oval-btn:hover .svg-oval-circle circle {
        transform: scale(0);
      }
      
      .svg-oval-btn:hover .svg-oval-label {
        color: var(--so-hover-text);
      }
      
      .svg-oval-btn:hover .svg-oval-border-left path,
      .svg-oval-btn:hover .svg-oval-border-right path {
        stroke-dashoffset: 0;
        transition: stroke-dashoffset 0.5s ease-in-out 0.25s; /* Delay start */
      }
    `;
        document.head.appendChild(style);
    }
}

export interface SvgOvalOptions {
    color?: string;
    textColor?: string;
    hoverTextColor?: string;
}
