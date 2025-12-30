/**
 * Underline Hover Effects
 * Collection of animated underline effects for links and navigation
 */

export class UnderlineEffect {
  private element: HTMLElement;
  private type: UnderlineType;
  
  constructor(element: HTMLElement | string, type: UnderlineType = 'slide', options: UnderlineOptions = {}) {
    this.element = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement 
      : element;
    
    if (!this.element) {
      throw new Error('Element not found');
    }
    
    this.type = type;
    this.init(options);
  }
  
  private init(options: UnderlineOptions): void {
    const {
      color = 'currentColor',
      thickness = '2px',
      duration = '300ms',
      timingFunction = 'ease',
      offset = '4px'
    } = options;
    
    this.element.classList.add('underline-effect', `underline-${this.type}`);
    this.element.style.setProperty('--underline-color', color);
    this.element.style.setProperty('--underline-thickness', thickness);
    this.element.style.setProperty('--underline-duration', duration);
    this.element.style.setProperty('--underline-timing', timingFunction);
    this.element.style.setProperty('--underline-offset', offset);
    
    this.injectStyles();
  }
  
  private injectStyles(): void {
    const styleId = 'underline-effect-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .underline-effect {
        position: relative;
        text-decoration: none;
        display: inline-block;
      }
      
      .underline-effect::after {
        content: '';
        position: absolute;
        width: 100%;
        height: var(--underline-thickness, 2px);
        bottom: calc(var(--underline-offset, 4px) * -1);
        left: 0;
        background-color: var(--underline-color, currentColor);
        transition: transform var(--underline-duration, 300ms) var(--underline-timing, ease);
      }
      
      /* Slide from left */
      .underline-slide::after {
        transform: scaleX(0);
        transform-origin: left;
      }
      
      .underline-slide:hover::after {
        transform: scaleX(1);
      }
      
      /* Slide from center */
      .underline-center::after {
        transform: scaleX(0);
        transform-origin: center;
      }
      
      .underline-center:hover::after {
        transform: scaleX(1);
      }
      
      /* Slide from right */
      .underline-right::after {
        transform: scaleX(0);
        transform-origin: right;
      }
      
      .underline-right:hover::after {
        transform: scaleX(1);
      }
      
      /* Grow effect */
      .underline-grow::after {
        transform: scaleX(0) scaleY(0);
        transform-origin: center;
      }
      
      .underline-grow:hover::after {
        transform: scaleX(1) scaleY(1);
      }
      
      /* Bounce effect */
      .underline-bounce::after {
        transform: scaleX(0);
        transform-origin: left;
        transition: transform var(--underline-duration, 400ms) cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
      
      .underline-bounce:hover::after {
        transform: scaleX(1);
      }
      
      /* Wave effect */
      .underline-wave::after {
        transform: scaleX(0);
        transform-origin: left;
        transition: transform var(--underline-duration, 500ms) cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .underline-wave:hover::after {
        transform: scaleX(1);
        animation: wave 0.5s ease-in-out;
      }
      
      @keyframes wave {
        0%, 100% { transform: scaleX(1) translateY(0); }
        50% { transform: scaleX(1) translateY(-2px); }
      }
      
      /* Double underline */
      .underline-double::before,
      .underline-double::after {
        content: '';
        position: absolute;
        width: 100%;
        height: var(--underline-thickness, 2px);
        left: 0;
        background-color: var(--underline-color, currentColor);
        transition: transform var(--underline-duration, 300ms) var(--underline-timing, ease);
      }
      
      .underline-double::before {
        bottom: calc(var(--underline-offset, 4px) * -1 - 4px);
        transform: scaleX(0);
        transform-origin: right;
      }
      
      .underline-double::after {
        bottom: calc(var(--underline-offset, 4px) * -1);
        transform: scaleX(0);
        transform-origin: left;
      }
      
      .underline-double:hover::before,
      .underline-double:hover::after {
        transform: scaleX(1);
      }
      
      /* Gradient underline */
      .underline-gradient::after {
        background: linear-gradient(90deg, 
          var(--underline-color, currentColor) 0%, 
          transparent 100%);
        transform: scaleX(0);
        transform-origin: left;
      }
      
      .underline-gradient:hover::after {
        transform: scaleX(1);
      }
    `;
    document.head.appendChild(style);
  }
  
  public changeType(type: UnderlineType): void {
    this.element.classList.remove(`underline-${this.type}`);
    this.type = type;
    this.element.classList.add(`underline-${this.type}`);
  }
  
  public destroy(): void {
    this.element.classList.remove('underline-effect', `underline-${this.type}`);
  }
}

export type UnderlineType = 'slide' | 'center' | 'right' | 'grow' | 'bounce' | 'wave' | 'double' | 'gradient';

export interface UnderlineOptions {
  color?: string;
  thickness?: string;
  duration?: string;
  timingFunction?: string;
  offset?: string;
}
