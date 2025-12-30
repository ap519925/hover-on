/**
 * CSS Button Collection
 * Collection of 5 CSS button/link hover effects
 */

export class CssButtonEffect {
    private element: HTMLElement;
    private type: CssButtonType;

    constructor(element: HTMLElement | string, type: CssButtonType = 'neon', options: CssButtonOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: CssButtonOptions): void {
        const {
            // Defaults aren't universally applied, but structured for future expansion
        } = options;

        this.element.classList.add('css-btn', `cb-${this.type}`);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'css-buttons-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .css-btn {
        width: 170px;
        padding-top: 30px;
        padding-bottom: 30px;
        text-align: center;
        color: #000;
        text-transform: uppercase;
        font-weight: 600;
        margin: 15px;
        cursor: pointer;
        display: inline-block;
        box-sizing: border-box;
        text-decoration: none;
        font-family: 'Roboto Condensed', sans-serif;
      }

      /* 1. Neon */
      .cb-neon {
        background-color: transparent;
        border: 3px solid #00d7c3;
        border-radius: 50px;
        transition: all .15s ease-in-out;
        color: #00d7c3;
      }
      .cb-neon:hover {
        box-shadow: 0 0 10px 0 #00d7c3 inset, 0 0 20px 2px #00d7c3;
        border: 3px solid #00d7c3;
      }

      /* 2. Angle BG */
      .cb-angle {
        color: #fff;
        border: 3px solid #c266d3;
        /* Note: Using hardcoded gradient as per req, can be variabilized if needed */
        background-image: linear-gradient(30deg, #c266d3 50%, transparent 50%);
        background-size: 500px;
        background-repeat: no-repeat;
        background-position: 0%;
        transition: background 300ms ease-in-out;
      }
      .cb-angle:hover {
        background-position: 100%;
        color: #c266d3;
      }

      /* 3. Shadow Offset */
      .cb-shadow {
        border: 2px solid #3c73ff;
        background-color: #3c73ff;
        border-radius: 20px;
        color: #fff;
        transition: .3s;
      }
      .cb-shadow:hover {
        box-shadow: 8px 8px #99bdff;
      }

      /* 4. Pulse */
      .cb-pulse {
        background-color: transparent;
        border: 3px solid #ff0251;
        color: #ff0251;
        transition: .3s;
      }
      .cb-pulse:hover {
        animation: cb-pulse 1s infinite;
      }

      /* 5. Gradient Slide */
      .cb-gradient {
        width: 200px;
        border-radius: 5px;
        background-color: #F4F200;
        background-image: linear-gradient(to bottom, #fff 0%,#F4F200 100%); 
        background-size: 300px;
        background-repeat: no-repeat;
        background-position: 0%;
        transition: background 300ms ease-in-out;
      }
      .cb-gradient:hover {
        background-position: -200%;
      }

      @keyframes cb-pulse {
        0% { transform: scale(1); }
        70% { transform: scale(.9); }
        100% { transform: scale(1); }
      }
    `;
        document.head.appendChild(style);
    }
}

export type CssButtonType = 'neon' | 'angle' | 'shadow' | 'pulse' | 'gradient';

export interface CssButtonOptions {
    // empty for now, relying on css classes
}
