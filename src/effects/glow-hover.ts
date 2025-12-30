/**
 * Glow Hover Effect
 * Animated rainbow glow/border filter effect
 */

export class GlowHoverEffect {
    private element: HTMLElement;

    constructor(element: HTMLElement | string, options: GlowHoverOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.init(options);
    }

    private init(options: GlowHoverOptions): void {
        const {
            bg = '#111',
            textColor = '#fff',
            borderRadius = '10px'
        } = options;

        this.element.classList.add('glow-hover-btn');
        this.element.style.setProperty('--gh-bg', bg);
        this.element.style.setProperty('--gh-text', textColor);
        this.element.style.setProperty('--gh-radius', borderRadius);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'glow-hover-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .glow-hover-btn {
        width: 220px;
        height: 50px;
        border: none;
        outline: none;
        color: var(--gh-text);
        background: var(--gh-bg);
        cursor: pointer;
        position: relative;
        z-index: 0;
        border-radius: var(--gh-radius);
        font-family: inherit;
        font-size: 16px;
        font-weight: bold;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        margin: 10px;
      }
      
      .glow-hover-btn:before {
        content: '';
        background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
        position: absolute;
        top: -2px;
        left:-2px;
        background-size: 400%;
        z-index: -1;
        filter: blur(5px);
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        animation: glowing 20s linear infinite;
        opacity: 0;
        transition: opacity .3s ease-in-out;
        border-radius: var(--gh-radius);
      }
      
      .glow-hover-btn:active {
        color: #000;
        font-weight: bold;
      }
      
      .glow-hover-btn:active:after {
        background: transparent;
      }
      
      .glow-hover-btn:hover:before {
        opacity: 1;
      }
      
      .glow-hover-btn:after {
        z-index: -1;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: var(--gh-bg);
        left: 0;
        top: 0;
        border-radius: var(--gh-radius);
      }
      
      @keyframes glowing {
        0% { background-position: 0 0; }
        50% { background-position: 400% 0; }
        100% { background-position: 0 0; }
      }
    `;
        document.head.appendChild(style);
    }
}

export interface GlowHoverOptions {
    bg?: string;
    textColor?: string;
    borderRadius?: string;
}
