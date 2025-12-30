/**
 * Rainbow Background Effect
 * Animated sweeping gradient backgrounds
 */

export class RainbowEffect {
    private element: HTMLElement;
    private type: RainbowType;

    constructor(element: HTMLElement | string, type: RainbowType = 'smooth', options: RainbowOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: RainbowOptions): void {
        const {
            speed = '2s'
        } = options;

        this.element.classList.add('rainbow-btn', `rainbow-${this.type}`);
        this.element.style.setProperty('--rb-speed', speed);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'rainbow-effect-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .rainbow-btn {
        background-color: #343A40;
        border-radius: 4px;  
        color: #fff;
        cursor: pointer;
        padding: 8px 16px;
        text-decoration: none;
        display: inline-block;
        background-size: 200% auto;
        transition: 0.5s;
        border: none;
      }
      
      .rainbow-btn:hover {
        animation: slidebg var(--rb-speed, 2s) linear infinite;
        color: white;
      }
      
      /* 1. Standard Bright (Blue -> Yellow -> Red) */
      .rainbow-smooth:hover {
        background-image: linear-gradient(90deg, #00C0FF 0%, #FFCF00 49%, #FC4F4F 80%, #00C0FF 100%);
      }
      
      /* 2. Full Spectrum */
      .rainbow-spectrum:hover {
        background-image: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet, red);
      }
      
      /* 3. Warm Spectrum (No violet) */
      .rainbow-warm:hover {
        background-image: linear-gradient(to right, red, orange, yellow, green, blue, indigo, red);
      }
      
      /* 4. Discrete Blocks (Hard stops) */
      .rainbow-blocks:hover {
        background-image: linear-gradient(
          to right, 
          #E7484F, #E7484F 16.65%,
          #F68B1D 16.65%, #F68B1D 33.3%,
          #FCED00 33.3%, #FCED00 49.95%,
          #009E4F 49.95%, #009E4F 66.6%,
          #00AAC3 66.6%, #00AAC3 83.25%,
          #732982 83.25%, #732982 100%,
          #E7484F 100%
        );
      }
      
      @keyframes slidebg {
        to {
          background-position: 200% center;
        }
      }
    `;
        document.head.appendChild(style);
    }
}

export type RainbowType = 'smooth' | 'spectrum' | 'warm' | 'blocks';

export interface RainbowOptions {
    speed?: string;
    colors?: string[]; // Future enhancement
}
