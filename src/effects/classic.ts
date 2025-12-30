/**
 * Classic Effects
 * Traditional hover effects that have stood the test of time
 */

export class ClassicEffect {
    private element: HTMLElement;
    private type: ClassicEffectType;

    constructor(element: HTMLElement | string, type: ClassicEffectType = 'fade', options: ClassicEffectOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: ClassicEffectOptions): void {
        const {
            duration = '300ms',
            color = '#4ecdc4'
        } = options;

        this.element.classList.add('classic-effect', `classic-${this.type}`);
        this.element.style.setProperty('--classic-duration', duration);
        this.element.style.setProperty('--classic-color', color);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'classic-effect-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .classic-effect {
        transition: all var(--classic-duration, 300ms) ease;
      }
      
      /* Fade */
      .classic-fade {
        opacity: 1;
      }
      
      .classic-fade:hover {
        opacity: 0.7;
      }
      
      /* Brighten */
      .classic-brighten {
        filter: brightness(1);
      }
      
      .classic-brighten:hover {
        filter: brightness(1.2);
      }
      
      /* Darken */
      .classic-darken {
        filter: brightness(1);
      }
      
      .classic-darken:hover {
        filter: brightness(0.8);
      }
      
      /* Grow */
      .classic-grow:hover {
        transform: scale(1.05);
      }
      
      /* Shrink */
      .classic-shrink:hover {
        transform: scale(0.95);
      }
      
      /* Rotate */
      .classic-rotate:hover {
        transform: rotate(5deg);
      }
      
      /* Skew */
      .classic-skew:hover {
        transform: skew(-5deg, -2deg);
      }
      
      /* Shadow */
      .classic-shadow:hover {
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }
      
      /* Glow */
      .classic-glow:hover {
        box-shadow: 0 0 20px var(--classic-color, #4ecdc4);
      }
      
      /* Underline */
      .classic-underline {
        position: relative;
      }
      
      .classic-underline::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--classic-color, #4ecdc4);
        transition: width var(--classic-duration, 300ms) ease;
      }
      
      .classic-underline:hover::after {
        width: 100%;
      }
      
      /* Overline */
      .classic-overline {
        position: relative;
      }
      
      .classic-overline::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--classic-color, #4ecdc4);
        transition: width var(--classic-duration, 300ms) ease;
      }
      
      .classic-overline:hover::before {
        width: 100%;
      }
      
      /* Background Color */
      .classic-bg-color:hover {
        background-color: var(--classic-color, #4ecdc4);
        color: white;
      }
      
      /* Border Color */
      .classic-border-color {
        border: 2px solid transparent;
      }
      
      .classic-border-color:hover {
        border-color: var(--classic-color, #4ecdc4);
      }
      
      /* Slide Up */
      .classic-slide-up:hover {
        transform: translateY(-5px);
      }
      
      /* Slide Down */
      .classic-slide-down:hover {
        transform: translateY(5px);
      }
      
      /* Slide Left */
      .classic-slide-left:hover {
        transform: translateX(-5px);
      }
      
      /* Slide Right */
      .classic-slide-right:hover {
        transform: translateX(5px);
      }
    `;
        document.head.appendChild(style);
    }

    public changeType(type: ClassicEffectType): void {
        this.element.classList.remove(`classic-${this.type}`);
        this.type = type;
        this.element.classList.add(`classic-${this.type}`);
    }

    public destroy(): void {
        this.element.classList.remove('classic-effect', `classic-${this.type}`);
    }
}

export type ClassicEffectType =
    | 'fade'
    | 'brighten'
    | 'darken'
    | 'grow'
    | 'shrink'
    | 'rotate'
    | 'skew'
    | 'shadow'
    | 'glow'
    | 'underline'
    | 'overline'
    | 'bg-color'
    | 'border-color'
    | 'slide-up'
    | 'slide-down'
    | 'slide-left'
    | 'slide-right';

export interface ClassicEffectOptions {
    duration?: string;
    color?: string;
}
