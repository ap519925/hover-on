/**
 * Squishy Button Effects
 * Implements 3D pressable buttons with various themes
 */

export class SquishyButtonEffect {
    private element: HTMLElement;
    private type: SquishyButtonType;

    constructor(element: HTMLElement | string, type: SquishyButtonType = 'classic', options: SquishyButtonOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: SquishyButtonOptions): void {
        this.element.classList.add('squishy', `squishy-${this.type}`);
        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'squishy-button-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .squishy {
        position: relative;
        font-size: 1.25rem;
        padding: 0.75rem 2rem;
        font-weight: 600;
        border: none;
        cursor: pointer;
        transition: all 250ms;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
      }
      
      .squishy i, .squishy svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      /* Classic Squishy */
      .squishy-classic {
        background-color: #f0f0f0;
        color: #242424;
        border-radius: 0.5rem;
        box-shadow: 
          inset 0 1px 0 0 #f4f4f4,
          0 1px 0 0 #efefef,
          0 2px 0 0 #ececec,
          0 4px 0 0 #e0e0e0,
          0 5px 0 0 #dedede,
          0 6px 0 0 #dcdcdc,
          0 7px 0 0 #cacaca,
          0 7px 8px 0 #cecece;
      }

      .squishy-classic:hover {
        transform: translateY(4px);
        box-shadow: 
          inset 0 1px 0 0 #f4f4f4,
          0 1px 0 0 #efefef,
          0 1px 0 0 #ececec,
          0 2px 0 0 #e0e0e0,
          0 2px 0 0 #dedede,
          0 3px 0 0 #dcdcdc,
          0 4px 0 0 #cacaca,
          0 4px 6px 0 #cecece;
      }

      /* Neon Squishy */
      .squishy-neon {
        background-color: rgb(124 58 237);
        color: white;
        border-radius: 0.5rem;
        box-shadow:
          inset 0 1px 0 0 rgba(255,255,255,0.3),
          0 2px 0 0 rgb(109 40 217),
          0 4px 0 0 rgb(91 33 182),
          0 6px 0 0 rgb(76 29 149),
          0 8px 0 0 rgb(67 26 131),
          0 8px 16px 0 rgba(147,51,234,0.5);
        overflow: hidden;
      }

      .squishy-neon:hover {
        transform: translateY(4px);
        box-shadow:
          inset 0 1px 0 0 rgba(255,255,255,0.3),
          0 1px 0 0 rgb(109 40 217),
          0 2px 0 0 rgb(91 33 182),
          0 3px 0 0 rgb(76 29 149),
          0 4px 0 0 rgb(67 26 131),
          0 4px 8px 0 rgba(147,51,234,0.5);
      }
      
      /* Candy Squishy */
      .squishy-candy {
        background: linear-gradient(to bottom right, rgb(244 114 182), rgb(248 113 113));
        color: white;
        border-radius: 9999px;
        box-shadow:
          inset 0 1px 0 0 rgba(255,255,255,0.4),
          0 2px 0 0 #f472b6,
          0 4px 0 0 #f43f5e,
          0 6px 0 0 #e11d48,
          0 8px 0 0 #be123c,
          0 8px 16px 0 rgba(244,114,182,0.5);
      }

      .squishy-candy:hover {
        transform: translateY(4px);
        box-shadow:
          inset 0 1px 0 0 rgba(255,255,255,0.4),
          0 1px 0 0 #f472b6,
          0 2px 0 0 #f43f5e,
          0 3px 0 0 #e11d48,
          0 4px 0 0 #be123c,
          0 4px 8px 0 rgba(244,114,182,0.5);
      }

      /* Cosmic Squishy */
      .squishy-cosmic {
        background: linear-gradient(to right, rgb(49 46 129), rgb(88 28 135), rgb(88 28 135));
        color: white;
        border-radius: 0.5rem;
        box-shadow:
          inset 0 1px 0 0 rgba(255,255,255,0.2),
          0 2px 0 0 #312e81,
          0 4px 0 0 #1e1b4b,
          0 6px 0 0 #0f172a,
          0 8px 0 0 #020617,
          0 8px 16px 0 rgba(49,46,129,0.5);
        overflow: hidden;
      }
      
      .squishy-cosmic:hover {
        transform: translateY(4px);
        box-shadow:
          inset 0 1px 0 0 rgba(255,255,255,0.2),
          0 1px 0 0 #312e81,
          0 2px 0 0 #1e1b4b,
          0 3px 0 0 #0f172a,
          0 4px 0 0 #020617,
          0 4px 8px 0 rgba(49,46,129,0.5);
      }
      
      /* Tech Squishy */
      .squishy-tech {
        background-color: rgb(5 150 105);
        color: white;
        border-radius: 0.5rem;
        box-shadow:
          inset 0 1px 0 0 rgba(255,255,255,0.3),
          0 2px 0 0 #059669,
          0 4px 0 0 #047857,
          0 6px 0 0 #065f46,
          0 8px 0 0 #064e3b,
          0 8px 16px 0 rgba(5,150,105,0.5);
        overflow: hidden;
      }
      
      .squishy-tech::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
        transform: translateX(-100%);
        animation: squishy-shimmer 2s infinite;
      }
      
      .squishy-tech:hover {
        transform: translateY(4px);
        box-shadow:
          inset 0 1px 0 0 rgba(255,255,255,0.3),
          0 1px 0 0 #059669,
          0 2px 0 0 #047857,
          0 3px 0 0 #065f46,
          0 4px 0 0 #064e3b,
          0 4px 8px 0 rgba(5,150,105,0.5);
      }

      @keyframes squishy-shimmer {
        100% { transform: translateX(100%); }
      }
    `;
        document.head.appendChild(style);
    }
}

export type SquishyButtonType = 'classic' | 'neon' | 'candy' | 'cosmic' | 'tech';

export interface SquishyButtonOptions {
    // Options (e.g. override colors) could be added here
}
