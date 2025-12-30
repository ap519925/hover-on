/**
 * Border Fill Effect
 * Sequential border expansion followed by background fill
 */

export class BorderFillEffect {
    private element: HTMLElement;
    private type: BorderFillType;

    constructor(element: HTMLElement | string, type: BorderFillType = 'from-top', options: BorderFillOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: BorderFillOptions): void {
        const {
            primaryColor = '#fff', // --inv
            secondaryColor = '#96B7C4' // --def (matches background)
        } = options;

        this.element.classList.add('border-fill-btn', `bf-${this.type}`);
        this.element.style.setProperty('--bf-inv', primaryColor);
        this.element.style.setProperty('--bf-def', secondaryColor);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'border-fill-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .border-fill-btn {
        position: relative;	
        padding: 1.4rem 4.2rem;
        padding-right: 3.1rem;
        font-size: 1.4rem;
        color: var(--bf-inv);
        letter-spacing: 1.1rem;
        text-transform: uppercase;
        transition: all 500ms cubic-bezier(0.77, 0, 0.175, 1);	
        cursor: pointer;
        user-select: none;
        display: inline-block;
        background: transparent;
        z-index: 1; /* For stacking background */
      }
      
      .border-fill-btn::before, .border-fill-btn::after {
        content: '';
        position: absolute;	
        transition: inherit;
        z-index: -1;
      }
      
      .border-fill-btn:hover {
        color: var(--bf-def);
        transition-delay: .5s;
      }
      
      .border-fill-btn:hover::before {
        transition-delay: 0s;
      }
      
      .border-fill-btn:hover::after {
        background: var(--bf-inv);
        transition-delay: .35s;
      }
      
      /* From Top */
      .bf-from-top::before, 
      .bf-from-top::after {
        left: 0;
        height: 0;
        width: 100%;
      }
      .bf-from-top::before {
        bottom: 0;	
        border: 1px solid var(--bf-inv);
        border-top: 0;
        border-bottom: 0;
      }
      .bf-from-top::after {
        top: 0;
        height: 0;
      }
      .bf-from-top:hover::before,
      .bf-from-top:hover::after {
        height: 100%;
      }
      
      /* From Left */
      .bf-from-left::before, 
      .bf-from-left::after {
        top: 0;
        width: 0;
        height: 100%;
      }
      .bf-from-left::before {
        right: 0;
        border: 1px solid var(--bf-inv);
        border-left: 0;
        border-right: 0;	
      }
      .bf-from-left::after {
        left: 0;
      }
      .bf-from-left:hover::before,
      .bf-from-left:hover::after {
        width: 100%;
      }
      
      /* From Right */
      .bf-from-right::before, 
      .bf-from-right::after {
        top: 0;
        width: 0;
        height: 100%;
      }
      .bf-from-right::before {
        left: 0;
        border: 1px solid var(--bf-inv);
        border-left: 0;
        border-right: 0;	
      }
      .bf-from-right::after {
        right: 0;
      }
      .bf-from-right:hover::before,
      .bf-from-right:hover::after {
        width: 100%;
      }
      
      /* From Center */
      .bf-from-center::before {
        top: 0;
        left: 50%;
        height: 100%;
        width: 0;
        border: 1px solid var(--bf-inv);
        border-left: 0;
        border-right: 0;
      }
      .bf-from-center::after {
        bottom: 0;
        left: 0;
        height: 0;
        width: 100%;
        background: var(--bf-inv);
      }
      .bf-from-center:hover::before {
        left: 0;
        width: 100%;
      }
      .bf-from-center:hover::after {
        top: 0;
        height: 100%;
      }
      
      /* From Bottom */
      .bf-from-bottom::before, 
      .bf-from-bottom::after {
        left: 0;
        height: 0;
        width: 100%;
      }
      .bf-from-bottom::before {
        top: 0;	
        border: 1px solid var(--bf-inv);
        border-top: 0;
        border-bottom: 0;
      }
      .bf-from-bottom::after {
        bottom: 0;
        height: 0;
      }
      .bf-from-bottom:hover::before,
      .bf-from-bottom:hover::after {
        height: 100%;
      }
    `;
        document.head.appendChild(style);
    }
}

export type BorderFillType = 'from-top' | 'from-left' | 'from-right' | 'from-center' | 'from-bottom';

export interface BorderFillOptions {
    primaryColor?: string;
    secondaryColor?: string;
}
