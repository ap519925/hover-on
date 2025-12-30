/**
 * Gooey Button Effect
 * Liquid blob hover effect using SVG filters
 */

export class GooeyButtonEffect {
    private element: HTMLElement;
    private type: GooeyButtonType;

    constructor(element: HTMLElement | string, type: GooeyButtonType = 'blobs', options: GooeyButtonOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: GooeyButtonOptions): void {
        const {
            color = '#06c8d9',
            hoverColor = '#fff'
        } = options;

        this.element.classList.add('gooey-btn', `gooey-${this.type}`);
        this.element.style.setProperty('--goo-color', color);
        this.element.style.setProperty('--goo-hover-color', hoverColor);

        // Inject Blobs
        if (this.type === 'blobs') {
            if (!this.element.querySelector('.gooey-blobs')) {
                const blobsContainer = document.createElement('div');
                blobsContainer.className = 'gooey-blobs';
                for (let i = 0; i < 3; i++) {
                    blobsContainer.appendChild(document.createElement('div'));
                }
                this.element.appendChild(blobsContainer);
            }
        }

        this.injectSvgFilter();
        this.injectStyles();
    }

    private injectSvgFilter(): void {
        const filterId = 'goo-filter-svg';
        if (document.getElementById(filterId)) return;

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.id = filterId;
        svg.setAttribute('style', 'display: block; height: 0; width: 0;');

        svg.innerHTML = `
        <defs>
            <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
        </defs>
      `;
        // Note: Replaced feBlend with feComposite operator="atop" as per second snippet for better edge blending

        document.body.appendChild(svg);
    }

    private injectStyles(): void {
        const styleId = 'gooey-button-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .gooey-btn {
        color: var(--goo-color);
        font-weight: 700;
        font-size: 1.3em;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 2px;
        padding: 1.2em 3.4em;
        position: relative;
        transition: all 700ms ease;
        cursor: pointer;
        display: inline-block;
        background: transparent;
        z-index: 1;
        /* filter: url(#goo); Applied to specific children to avoid text blur */
      }
      
      /* Type: Blobs (3 blobs bottom up) */
      .gooey-blobs {
        height: 100%;
        filter: url(#goo);
        position: absolute;
        top: 0;
        left: 0;
        bottom: -3px;
        right: -1px;
        z-index: -1;
        overflow: hidden;
      }
      
      .gooey-blobs div {
        background-color: var(--goo-color);
        width: 34%;
        height: 100%;
        border-radius: 100%;
        position: absolute;
        transform: scale(1.4) translateY(125%) translateZ(0);
        transition: all 700ms ease;
      }
      
      .gooey-blobs div:nth-child(1) { left: -5%; }
      .gooey-blobs div:nth-child(2) { left: 30%; transition-delay: 60ms; }
      .gooey-blobs div:nth-child(3) { left: 66%; transition-delay: 25ms; }
      
      .gooey-blobs:hover div {
        transform: scale(1.4) translateY(0) translateZ(0);
      }
      
      .gooey-blobs-btn:hover {
         color: var(--goo-hover-color);
         border: 4px solid var(--goo-color);
      }
      
      /* Type: Diagonal (2 blobs scale in) */
      .gooey-diagonal {
          border-radius: 1em;
          background: var(--goo-color); /* Base bg */
          color: var(--goo-hover-color); /* Inverted for start */
          overflow: visible; /* Needed for diagonal blobs outside */
          filter: url(#goo); /* Wrapper needs filter */
      }
      
      .gooey-diagonal::before,
      .gooey-diagonal::after {
        width: 4.4em;
        height: 2.95em;
        position: absolute;
        content: "";
        display: inline-block;
        background: var(--goo-color);
        border-radius: 50%;
        transition: transform 1s ease;
        transform: scale(0);
        z-index: -1;
      }
      
      .gooey-diagonal::before { top: -25%; left: 20%; }
      .gooey-diagonal::after { bottom: -25%; right: 20%; }
      
      .gooey-diagonal:hover::before,
      .gooey-diagonal:hover::after {
        transform: none;
      }
    `;
        document.head.appendChild(style);
    }
}

export type GooeyButtonType = 'blobs' | 'diagonal';

export interface GooeyButtonOptions {
    color?: string;
    hoverColor?: string;
}
