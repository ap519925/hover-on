/**
 * Modern CSS Effects
 * Modern CSS-based hover effects using backdrop-filter, clip-path, and CSS variables
 */

export class ModernCSSEffect {
    private element: HTMLElement;
    private type: ModernEffectType;

    constructor(element: HTMLElement | string, type: ModernEffectType = 'glass', options: ModernEffectOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: ModernEffectOptions): void {
        const {
            duration = '400ms',
            blurAmount = '10px',
            primaryColor = '#4ecdc4',
            secondaryColor = '#ff6b6b'
        } = options;

        this.element.classList.add('modern-css-effect', `modern-${this.type}`);
        this.element.style.setProperty('--modern-duration', duration);
        this.element.style.setProperty('--modern-blur', blurAmount);
        this.element.style.setProperty('--modern-primary', primaryColor);
        this.element.style.setProperty('--modern-secondary', secondaryColor);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'modern-css-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .modern-css-effect {
        transition: all var(--modern-duration, 400ms) ease;
      }
      
      /* Glassmorphism */
      .modern-glass {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(var(--modern-blur, 10px));
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .modern-glass:hover {
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(calc(var(--modern-blur, 10px) * 1.5));
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      }
      
      /* Neumorphism */
      .modern-neuro {
        background: #e0e0e0;
        box-shadow: 
          8px 8px 16px #bebebe,
          -8px -8px 16px #ffffff;
      }
      
      .modern-neuro:hover {
        box-shadow: 
          inset 8px 8px 16px #bebebe,
          inset -8px -8px 16px #ffffff;
      }
      
      /* Clip Path Morph */
      .modern-clip-morph {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
      
      .modern-clip-morph:hover {
        clip-path: polygon(10% 0, 100% 10%, 90% 100%, 0 90%);
      }
      
      /* Gradient Border */
      .modern-gradient-border {
        position: relative;
        background: white;
        border: 2px solid transparent;
        background-clip: padding-box;
      }
      
      .modern-gradient-border::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(
          45deg,
          var(--modern-primary, #4ecdc4),
          var(--modern-secondary, #ff6b6b)
        );
        border-radius: inherit;
        z-index: -1;
        opacity: 0;
        transition: opacity var(--modern-duration, 400ms) ease;
      }
      
      .modern-gradient-border:hover::before {
        opacity: 1;
      }
      
      /* Frosted Glass */
      .modern-frosted {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(5px);
      }
      
      .modern-frosted:hover {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(var(--modern-blur, 10px));
      }
      
      /* Mesh Gradient */
      .modern-mesh {
        background: 
          radial-gradient(at 40% 20%, var(--modern-primary, #4ecdc4) 0px, transparent 50%),
          radial-gradient(at 80% 0%, var(--modern-secondary, #ff6b6b) 0px, transparent 50%),
          radial-gradient(at 0% 50%, var(--modern-primary, #4ecdc4) 0px, transparent 50%);
        background-size: 100% 100%;
        transition: background-size var(--modern-duration, 400ms) ease;
      }
      
      .modern-mesh:hover {
        background-size: 150% 150%;
      }
      
      /* Color Mix */
      .modern-color-mix {
        background: color-mix(in srgb, var(--modern-primary, #4ecdc4) 50%, white);
      }
      
      .modern-color-mix:hover {
        background: color-mix(in srgb, var(--modern-secondary, #ff6b6b) 70%, white);
      }
      
      /* Backdrop Blur */
      .modern-backdrop {
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(0);
      }
      
      .modern-backdrop:hover {
        backdrop-filter: blur(var(--modern-blur, 10px));
      }
    `;
        document.head.appendChild(style);
    }

    public changeType(type: ModernEffectType): void {
        this.element.classList.remove(`modern-${this.type}`);
        this.type = type;
        this.element.classList.add(`modern-${this.type}`);
    }

    public destroy(): void {
        this.element.classList.remove('modern-css-effect', `modern-${this.type}`);
    }
}

export type ModernEffectType =
    | 'glass'
    | 'neuro'
    | 'clip-morph'
    | 'gradient-border'
    | 'frosted'
    | 'mesh'
    | 'color-mix'
    | 'backdrop';

export interface ModernEffectOptions {
    duration?: string;
    blurAmount?: string;
    primaryColor?: string;
    secondaryColor?: string;
}
