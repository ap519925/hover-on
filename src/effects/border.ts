/**
 * Border Animation Effects
 * Animated borders that draw, pulse, and glow on hover
 */

export class BorderEffect {
  private element: HTMLElement;
  private type: BorderType;
  
  constructor(element: HTMLElement | string, type: BorderType = 'draw', options: BorderOptions = {}) {
    this.element = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement 
      : element;
    
    if (!this.element) {
      throw new Error('Element not found');
    }
    
    this.type = type;
    this.init(options);
  }
  
  private init(options: BorderOptions): void {
    const {
      borderColor = 'currentColor',
      borderWidth = '2px',
      duration = '600ms',
      timingFunction = 'ease',
      glowColor,
      borderRadius = '0'
    } = options;
    
    this.element.classList.add('border-effect', `border-${this.type}`);
    this.element.style.setProperty('--border-color', borderColor);
    this.element.style.setProperty('--border-width', borderWidth);
    this.element.style.setProperty('--border-duration', duration);
    this.element.style.setProperty('--border-timing', timingFunction);
    this.element.style.setProperty('--border-radius', borderRadius);
    
    if (glowColor) {
      this.element.style.setProperty('--border-glow', glowColor);
    }
    
    this.injectStyles();
  }
  
  private injectStyles(): void {
    const styleId = 'border-effect-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .border-effect {
        position: relative;
        border-radius: var(--border-radius, 0);
      }
      
      /* Border Draw Effect */
      .border-draw::before,
      .border-draw::after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        transition: 
          width var(--border-duration, 600ms) var(--border-timing, ease),
          height var(--border-duration, 600ms) var(--border-timing, ease);
      }
      
      .border-draw::before {
        top: 0;
        left: 0;
        border-top: var(--border-width, 2px) solid var(--border-color, currentColor);
        border-left: var(--border-width, 2px) solid var(--border-color, currentColor);
        border-top-left-radius: var(--border-radius, 0);
      }
      
      .border-draw::after {
        bottom: 0;
        right: 0;
        border-bottom: var(--border-width, 2px) solid var(--border-color, currentColor);
        border-right: var(--border-width, 2px) solid var(--border-color, currentColor);
        border-bottom-right-radius: var(--border-radius, 0);
      }
      
      .border-draw:hover::before,
      .border-draw:hover::after {
        width: 100%;
        height: 100%;
      }
      
      /* Border Pulse */
      .border-pulse {
        border: var(--border-width, 2px) solid var(--border-color, currentColor);
        transition: all var(--border-duration, 300ms) var(--border-timing, ease);
      }
      
      .border-pulse:hover {
        animation: border-pulse-anim 1s ease-in-out infinite;
      }
      
      @keyframes border-pulse-anim {
        0%, 100% {
          border-color: var(--border-color, currentColor);
          box-shadow: 0 0 0 0 var(--border-color, currentColor);
        }
        50% {
          border-color: transparent;
          box-shadow: 0 0 0 8px transparent;
        }
      }
      
      /* Border Glow */
      .border-glow {
        border: var(--border-width, 2px) solid var(--border-color, currentColor);
        transition: box-shadow var(--border-duration, 400ms) var(--border-timing, ease);
      }
      
      .border-glow:hover {
        box-shadow: 
          0 0 10px var(--border-glow, var(--border-color, currentColor)),
          0 0 20px var(--border-glow, var(--border-color, currentColor)),
          0 0 30px var(--border-glow, var(--border-color, currentColor));
      }
      
      /* Border Spin */
      .border-spin {
        background: 
          linear-gradient(90deg, var(--border-color, currentColor) 50%, transparent 50%) top left,
          linear-gradient(90deg, var(--border-color, currentColor) 50%, transparent 50%) bottom right;
        background-size: 100% var(--border-width, 2px);
        background-repeat: no-repeat;
        transition: background-size var(--border-duration, 600ms) var(--border-timing, ease);
      }
      
      .border-spin::before,
      .border-spin::after {
        content: '';
        position: absolute;
        width: var(--border-width, 2px);
        height: 0;
        background-color: var(--border-color, currentColor);
        transition: height var(--border-duration, 600ms) var(--border-timing, ease);
      }
      
      .border-spin::before {
        top: 0;
        left: 0;
      }
      
      .border-spin::after {
        bottom: 0;
        right: 0;
      }
      
      .border-spin:hover {
        background-size: 0 var(--border-width, 2px);
      }
      
      .border-spin:hover::before,
      .border-spin:hover::after {
        height: 100%;
      }
      
      /* Border Gradient Rotate */
      .border-gradient::before {
        content: '';
        position: absolute;
        inset: calc(var(--border-width, 2px) * -1);
        border-radius: inherit;
        padding: var(--border-width, 2px);
        background: linear-gradient(45deg, 
          var(--border-color, currentColor), 
          transparent, 
          var(--border-color, currentColor));
        -webkit-mask: 
          linear-gradient(#fff 0 0) content-box, 
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0;
        transition: opacity var(--border-duration, 400ms) var(--border-timing, ease);
      }
      
      .border-gradient:hover::before {
        opacity: 1;
        animation: border-rotate 2s linear infinite;
      }
      
      @keyframes border-rotate {
        to {
          transform: rotate(360deg);
        }
      }
      
      /* Border Dash */
      .border-dash {
        border: var(--border-width, 2px) dashed var(--border-color, currentColor);
        background-image: 
          linear-gradient(90deg, var(--border-color, currentColor) 50%, transparent 50%),
          linear-gradient(90deg, var(--border-color, currentColor) 50%, transparent 50%),
          linear-gradient(0deg, var(--border-color, currentColor) 50%, transparent 50%),
          linear-gradient(0deg, var(--border-color, currentColor) 50%, transparent 50%);
        background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
        background-size: 15px var(--border-width, 2px), 15px var(--border-width, 2px), var(--border-width, 2px) 15px, var(--border-width, 2px) 15px;
        background-position: left top, right bottom, left bottom, right top;
        animation: border-dash-anim 1s linear infinite;
        animation-play-state: paused;
        border: none;
      }
      
      .border-dash:hover {
        animation-play-state: running;
      }
      
      @keyframes border-dash-anim {
        to {
          background-position: left 15px top, right -15px bottom, left bottom 15px, right top -15px;
        }
      }
      
      /* Border Corners */
      .border-corners::before,
      .border-corners::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border-color: var(--border-color, currentColor);
        border-style: solid;
        border-width: 0;
        transition: 
          width var(--border-duration, 400ms) var(--border-timing, ease),
          height var(--border-duration, 400ms) var(--border-timing, ease);
      }
      
      .border-corners::before {
        top: 0;
        left: 0;
        border-top-width: var(--border-width, 2px);
        border-left-width: var(--border-width, 2px);
      }
      
      .border-corners::after {
        bottom: 0;
        right: 0;
        border-bottom-width: var(--border-width, 2px);
        border-right-width: var(--border-width, 2px);
      }
      
      .border-corners:hover::before,
      .border-corners:hover::after {
        width: 100%;
        height: 100%;
      }
    `;
    document.head.appendChild(style);
  }
  
  public changeType(type: BorderType): void {
    this.element.classList.remove(`border-${this.type}`);
    this.type = type;
    this.element.classList.add(`border-${this.type}`);
  }
  
  public destroy(): void {
    this.element.classList.remove('border-effect', `border-${this.type}`);
  }
}

export type BorderType = 
  | 'draw' 
  | 'pulse' 
  | 'glow' 
  | 'spin' 
  | 'gradient' 
  | 'dash' 
  | 'corners';

export interface BorderOptions {
  borderColor?: string;
  borderWidth?: string;
  duration?: string;
  timingFunction?: string;
  glowColor?: string;
  borderRadius?: string;
}
