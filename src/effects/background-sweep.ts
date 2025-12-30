/**
 * Background Sweep Effects
 * Animated background transitions for buttons and navigation items
 */

export class BackgroundSweepEffect {
  private element: HTMLElement;
  private type: SweepType;
  
  constructor(element: HTMLElement | string, type: SweepType = 'left', options: SweepOptions = {}) {
    this.element = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement 
      : element;
    
    if (!this.element) {
      throw new Error('Element not found');
    }
    
    this.type = type;
    this.init(options);
  }
  
  private init(options: SweepOptions): void {
    const {
      backgroundColor = '#000',
      hoverColor = '#fff',
      duration = '400ms',
      timingFunction = 'ease'
    } = options;
    
    this.element.classList.add('bg-sweep-effect', `bg-sweep-${this.type}`);
    this.element.style.setProperty('--bg-sweep-color', backgroundColor);
    this.element.style.setProperty('--bg-sweep-hover', hoverColor);
    this.element.style.setProperty('--bg-sweep-duration', duration);
    this.element.style.setProperty('--bg-sweep-timing', timingFunction);
    
    this.injectStyles();
  }
  
  private injectStyles(): void {
    const styleId = 'bg-sweep-effect-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .bg-sweep-effect {
        position: relative;
        overflow: hidden;
        z-index: 1;
        transition: color var(--bg-sweep-duration, 400ms) var(--bg-sweep-timing, ease);
      }
      
      .bg-sweep-effect::before {
        content: '';
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--bg-sweep-hover, #fff);
        transition: transform var(--bg-sweep-duration, 400ms) var(--bg-sweep-timing, ease);
      }
      
      /* Sweep from left */
      .bg-sweep-left::before {
        transform: translateX(-100%);
      }
      
      .bg-sweep-left:hover::before {
        transform: translateX(0);
      }
      
      /* Sweep from right */
      .bg-sweep-right::before {
        transform: translateX(100%);
      }
      
      .bg-sweep-right:hover::before {
        transform: translateX(0);
      }
      
      /* Sweep from top */
      .bg-sweep-top::before {
        transform: translateY(-100%);
      }
      
      .bg-sweep-top:hover::before {
        transform: translateY(0);
      }
      
      /* Sweep from bottom */
      .bg-sweep-bottom::before {
        transform: translateY(100%);
      }
      
      .bg-sweep-bottom:hover::before {
        transform: translateY(0);
      }
      
      /* Sweep diagonal top-left */
      .bg-sweep-diagonal-tl::before {
        transform: translate(-100%, -100%);
      }
      
      .bg-sweep-diagonal-tl:hover::before {
        transform: translate(0, 0);
      }
      
      /* Sweep diagonal bottom-right */
      .bg-sweep-diagonal-br::before {
        transform: translate(100%, 100%);
      }
      
      .bg-sweep-diagonal-br:hover::before {
        transform: translate(0, 0);
      }
      
      /* Radial sweep from center */
      .bg-sweep-radial::before {
        transform: scale(0);
        border-radius: 50%;
        transition: transform var(--bg-sweep-duration, 500ms) var(--bg-sweep-timing, ease);
      }
      
      .bg-sweep-radial:hover::before {
        transform: scale(2.5);
      }
      
      /* Split from center */
      .bg-sweep-split::before,
      .bg-sweep-split::after {
        content: '';
        position: absolute;
        z-index: -1;
        top: 0;
        width: 50%;
        height: 100%;
        background-color: var(--bg-sweep-hover, #fff);
        transition: transform var(--bg-sweep-duration, 400ms) var(--bg-sweep-timing, ease);
      }
      
      .bg-sweep-split::before {
        left: 0;
        transform: translateX(-100%);
      }
      
      .bg-sweep-split::after {
        right: 0;
        transform: translateX(100%);
      }
      
      .bg-sweep-split:hover::before {
        transform: translateX(0);
      }
      
      .bg-sweep-split:hover::after {
        transform: translateX(0);
      }
      
      /* Curtain effect */
      .bg-sweep-curtain::before,
      .bg-sweep-curtain::after {
        content: '';
        position: absolute;
        z-index: -1;
        left: 0;
        width: 100%;
        height: 50%;
        background-color: var(--bg-sweep-hover, #fff);
        transition: transform var(--bg-sweep-duration, 400ms) var(--bg-sweep-timing, ease);
      }
      
      .bg-sweep-curtain::before {
        top: 0;
        transform: translateY(-100%);
      }
      
      .bg-sweep-curtain::after {
        bottom: 0;
        transform: translateY(100%);
      }
      
      .bg-sweep-curtain:hover::before {
        transform: translateY(0);
      }
      
      .bg-sweep-curtain:hover::after {
        transform: translateY(0);
      }
      
      /* Corner sweep */
      .bg-sweep-corner::before {
        clip-path: polygon(0 0, 0 0, 0 100%);
        transition: clip-path var(--bg-sweep-duration, 500ms) var(--bg-sweep-timing, ease);
      }
      
      .bg-sweep-corner:hover::before {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
    `;
    document.head.appendChild(style);
  }
  
  public changeType(type: SweepType): void {
    this.element.classList.remove(`bg-sweep-${this.type}`);
    this.type = type;
    this.element.classList.add(`bg-sweep-${this.type}`);
  }
  
  public destroy(): void {
    this.element.classList.remove('bg-sweep-effect', `bg-sweep-${this.type}`);
  }
}

export type SweepType = 
  | 'left' 
  | 'right' 
  | 'top' 
  | 'bottom' 
  | 'diagonal-tl' 
  | 'diagonal-br' 
  | 'radial' 
  | 'split' 
  | 'curtain' 
  | 'corner';

export interface SweepOptions {
  backgroundColor?: string;
  hoverColor?: string;
  duration?: string;
  timingFunction?: string;
}
