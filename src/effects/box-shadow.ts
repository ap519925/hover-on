/**
 * Box Shadow Effects
 * Simple hover effects using only box-shadow transitions
 */

export class BoxShadowEffect {
    private element: HTMLElement;
    private type: BoxShadowType;

    constructor(element: HTMLElement | string, type: BoxShadowType = 'fill', options: BoxShadowOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: BoxShadowOptions): void {
        const {
            color = '#a972cb',
            hoverColor = '#cb72aa' // Hue shifted approx
        } = options;

        this.element.classList.add('shadow-btn', `shadow-${this.type}`);
        this.element.style.setProperty('--sb-color', color);
        this.element.style.setProperty('--sb-hover', hoverColor);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'box-shadow-effect-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .shadow-btn {
        background: none;
        border: 2px solid;
        font: inherit;
        line-height: 1;
        margin: 0.5em;
        padding: 1em 2em;
        color: var(--sb-color);
        transition: 0.25s;
        cursor: pointer;
        display: inline-block;
        font-weight: 700;
        text-transform: uppercase;
      }
      
      .shadow-btn:hover,
      .shadow-btn:focus { 
        border-color: var(--sb-hover);
        color: #fff;
      }

      /* 1. Fill In */
      .shadow-fill:hover,
      .shadow-fill:focus {
        box-shadow: inset 0 0 0 2em var(--sb-hover);
      }

      /* 2. Pulse (Outside) */
      .shadow-pulse:hover, 
      .shadow-pulse:focus {
        animation: shadow-pulse 1s;
        box-shadow: 0 0 0 2em transparent;
      }

      @keyframes shadow-pulse {
        0% { box-shadow: 0 0 0 0 var(--sb-hover); }
      }

      /* 3. Close (Sides In) */
      .shadow-close:hover,
      .shadow-close:focus {
        box-shadow: 
          inset -3.5em 0 0 0 var(--sb-hover),
          inset 3.5em 0 0 0 var(--sb-hover);  
      }

      /* 4. Raise */
      .shadow-raise:hover,
      .shadow-raise:focus {
        box-shadow: 0 0.5em 0.5em -0.4em var(--sb-hover);
        transform: translateY(-0.25em);
      }

      /* 5. Fill Up */
      .shadow-up:hover,
      .shadow-up:focus {
        box-shadow: inset 0 -3.25em 0 0 var(--sb-hover);
      }

      /* 6. Slide */
      .shadow-slide:hover,
      .shadow-slide:focus {
        box-shadow: inset 6.5em 0 0 0 var(--sb-hover);
      }

      /* 7. Offset */
      .shadow-offset {  
        box-shadow: 
          0.3em 0.3em 0 0 var(--sb-color),
          inset 0.3em 0.3em 0 0 var(--sb-color);
      }
      .shadow-offset:hover,
      .shadow-offset:focus {
        box-shadow: 
          0 0 0 0 var(--sb-hover),
          inset 6em 3.5em 0 0 var(--sb-hover);
      }
    `;
        document.head.appendChild(style);
    }
}

export type BoxShadowType = 'fill' | 'pulse' | 'close' | 'raise' | 'up' | 'slide' | 'offset';

export interface BoxShadowOptions {
    color?: string;
    hoverColor?: string;
}
