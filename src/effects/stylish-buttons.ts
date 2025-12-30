/**
 * Stylish Button Collection
 * Collection of 6 stylish hover effects including shadows, gradients, and fills
 */

export class StylishButtonEffect {
    private element: HTMLElement;
    private type: StylishButtonType;

    constructor(element: HTMLElement | string, type: StylishButtonType = 'first', options: StylishButtonOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: StylishButtonOptions): void {
        const {
            color = '#e74c3c' // Default for 'first' type
        } = options;

        this.element.classList.add('stylish-btn', `sb-${this.type}`);
        this.element.style.setProperty('--sb-color', color);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'stylish-buttons-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .stylish-btn {
        box-sizing: border-box;
        appearance: none;
        background-color: transparent;
        border: 2px solid var(--sb-color);
        border-radius: 0.6em;
        color: var(--sb-color);
        cursor: pointer;
        display: inline-flex;
        align-self: center;
        font-size: 1rem;
        font-weight: 700;
        line-height: 1;
        margin: 20px;
        padding: 1.2em 2.8em;
        text-decoration: none;
        text-align: center;
        text-transform: uppercase;
        font-family: 'Montserrat', sans-serif;
        transition: all 300ms ease-in-out;
      }
      
      .stylish-btn:hover, .stylish-btn:focus {
        color: #fff;
        outline: 0;
      }

      /* 1. Inset Shadow Fill */
      .sb-first:hover {
        box-shadow: 0 0 40px 40px var(--sb-color) inset;
      }
      
      /* 2. Striped Gradient Slide */
      .sb-second {
        border-radius: 3em;
        /* Using a fixed color logic for demo or var */
        /* To make this customizable via --sb-color is hard due to complex gradient syntax. 
           We will use the passed color as base, but complex stripes might need specific implementation.
           For now, using the green theme from example fixed, or simple gradient. */
        --sb-stripe: #1abc9c;
        border-color: var(--sb-stripe);
        color: #fff;
        background-image: linear-gradient(to right, rgba(26, 188, 156, 0.6), rgba(26, 188, 156, 0.6) 5%, #1abc9c 5%, #1abc9c 10%, rgba(26, 188, 156, 0.6) 10%, rgba(26, 188, 156, 0.6) 15%, #1abc9c 15%, #1abc9c 20%, rgba(26, 188, 156, 0.6) 20%, rgba(26, 188, 156, 0.6) 25%, #1abc9c 25%, #1abc9c 30%, rgba(26, 188, 156, 0.6) 30%, rgba(26, 188, 156, 0.6) 35%, #1abc9c 35%, #1abc9c 40%, rgba(26, 188, 156, 0.6) 40%, rgba(26, 188, 156, 0.6) 45%, #1abc9c 45%, #1abc9c 50%, rgba(26, 188, 156, 0.6) 50%, rgba(26, 188, 156, 0.6) 55%, #1abc9c 55%, #1abc9c 60%, rgba(26, 188, 156, 0.6) 60%, rgba(26, 188, 156, 0.6) 65%, #1abc9c 65%, #1abc9c 70%, rgba(26, 188, 156, 0.6) 70%, rgba(26, 188, 156, 0.6) 75%, #1abc9c 75%, #1abc9c 80%, rgba(26, 188, 156, 0.6) 80%, rgba(26, 188, 156, 0.6) 85%, #1abc9c 85%, #1abc9c 90%, rgba(26, 188, 156, 0.6) 90%, rgba(26, 188, 156, 0.6) 95%, #1abc9c 95%, #1abc9c 100%);
        background-position: 0 0;
        background-size: 100%;
        transition: background 300ms ease-in-out;
      }
      .sb-second:hover {
        background-position: 100px;
      }
      
      /* 3. Inset Shadow Invert */
      .sb-third {
        /* Default blue theme */
        --sb-blue: #3498db;
        border-color: var(--sb-blue);
        color: #fff;
        box-shadow: 0 0 40px 40px var(--sb-blue) inset, 0 0 0 0 var(--sb-blue);
        transition: all 150ms ease-in-out;
      }
      .sb-third:hover {
        box-shadow: 0 0 10px 0 var(--sb-blue) inset, 0 0 10px 4px var(--sb-blue);
      }
      
      /* 4. Diagonal Gradient */
      .sb-fourth {
        --sb-yellow: #f1c40f;
        border-color: var(--sb-yellow);
        color: #fff;
        background-image: linear-gradient(45deg, var(--sb-yellow) 50%, transparent 50%);
        background-position: 100%;
        background-size: 400%;
        transition: background 300ms ease-in-out;
      }
      .sb-fourth:hover {
        background-position: 0;
      }
      
      /* 5. Center Expand (Curtain) */
      .sb-fifth {
        --sb-purple: #8e44ad;
        border-color: var(--sb-purple);
        border-radius: 0;
        color: var(--sb-purple);
        position: relative;
        overflow: hidden;
        z-index: 1;
        transition: color 150ms ease-in-out;
      }
      .sb-fifth:after {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 100%;
        background: var(--sb-purple);
        z-index: -1;
        transition: width 150ms ease-in-out;
      }
      .sb-fifth:hover {
        color: #fff;
      }
      .sb-fifth:hover:after {
        width: 110%;
      }
      
      /* 6. Vertical Fill */
      .sb-sixth {
        --sb-green: #2ecc71;
        border-radius: 3em;
        border-color: var(--sb-green);
        color: var(--sb-green);
        background-image: linear-gradient(to bottom, transparent 50%, var(--sb-green) 50%);
        background-position: 0% 0%;
        background-size: 210%;
        transition: background 150ms ease-in-out, color 150ms ease-in-out;
      }
      .sb-sixth:hover {
        color: #fff;
        background-position: 0 100%;
      }
    `;
        document.head.appendChild(style);
    }
}

export type StylishButtonType = 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'sixth';

export interface StylishButtonOptions {
    color?: string;
}
