/**
 * Advanced Button Effects
 * Special button effects including spinner, burst, pressdown, and more
 */

export class AdvancedButtonEffect {
  private element: HTMLElement;
  private type: AdvancedButtonType;
  
  constructor(element: HTMLElement | string, type: AdvancedButtonType = 'spinner', options: AdvancedButtonOptions = {}) {
    this.element = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement 
      : element;
    
    if (!this.element) {
      throw new Error('Element not found');
    }
    
    this.type = type;
    this.init(options);
  }
  
  private init(options: AdvancedButtonOptions): void {
    const {
      duration = '400ms',
      primaryColor = '#4ecdc4',
      secondaryColor = '#ff6b6b',
      glowIntensity = '20px'
    } = options;
    
    this.element.classList.add('advanced-button-effect', `advanced-btn-${this.type}`);
    this.element.style.setProperty('--advanced-duration', duration);
    this.element.style.setProperty('--advanced-primary', primaryColor);
    this.element.style.setProperty('--advanced-secondary', secondaryColor);
    this.element.style.setProperty('--advanced-glow', glowIntensity);
    
    this.injectStyles();
  }
  
  private injectStyles(): void {
    const styleId = 'advanced-button-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .advanced-button-effect {
        position: relative;
        overflow: hidden;
        transition: all var(--advanced-duration, 400ms) ease;
      }
      
      /* Spinner Animation */
      .advanced-btn-spinner::before,
      .advanced-btn-spinner::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200%;
        height: 200%;
        background: conic-gradient(
          transparent,
          var(--advanced-primary, #4ecdc4),
          transparent 30%
        );
        transform: translate(-50%, -50%) rotate(0deg);
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .advanced-btn-spinner:hover::before,
      .advanced-btn-spinner:hover::after {
        opacity: 1;
        animation: spinner-rotate 2s linear infinite;
      }
      
      .advanced-btn-spinner::after {
        animation-delay: -1s;
      }
      
      @keyframes spinner-rotate {
        to { transform: translate(-50%, -50%) rotate(360deg); }
      }
      
      /* Button Burst */
      .advanced-btn-burst::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: var(--advanced-primary, #4ecdc4);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s, opacity 0.6s;
        opacity: 0;
      }
      
      .advanced-btn-burst:hover::before {
        width: 300%;
        height: 300%;
        opacity: 0;
      }
      
      /* Border Revolve */
      .advanced-btn-revolve {
        border: 2px solid transparent;
        background-image: 
          linear-gradient(white, white),
          linear-gradient(45deg, 
            var(--advanced-primary, #4ecdc4), 
            var(--advanced-secondary, #ff6b6b)
          );
        background-origin: border-box;
        background-clip: padding-box, border-box;
      }
      
      .advanced-btn-revolve:hover {
        animation: border-revolve 2s linear infinite;
      }
      
      @keyframes border-revolve {
        to {
          background-image: 
            linear-gradient(white, white),
            linear-gradient(405deg, 
              var(--advanced-primary, #4ecdc4), 
              var(--advanced-secondary, #ff6b6b)
            );
        }
      }
      
      /* Pressdown Effect */
      .advanced-btn-pressdown {
        box-shadow: 
          0 4px 0 var(--advanced-primary, #4ecdc4),
          0 8px 10px rgba(0, 0, 0, 0.2);
        transform: translateY(0);
        transition: all 0.1s ease;
      }
      
      .advanced-btn-pressdown:hover {
        transform: translateY(4px);
        box-shadow: 
          0 0 0 var(--advanced-primary, #4ecdc4),
          0 4px 6px rgba(0, 0, 0, 0.2);
      }
      
      .advanced-btn-pressdown:active {
        transform: translateY(8px);
        box-shadow: 
          0 0 0 var(--advanced-primary, #4ecdc4),
          0 0 0 rgba(0, 0, 0, 0.2);
      }
      
      /* Offset Border */
      .advanced-btn-offset {
        box-shadow: 
          0 0 0 2px var(--advanced-primary, #4ecdc4);
      }
      
      .advanced-btn-offset::before {
        content: '';
        position: absolute;
        top: -6px;
        left: -6px;
        right: -6px;
        bottom: -6px;
        border: 2px solid var(--advanced-secondary, #ff6b6b);
        opacity: 0;
        transition: opacity var(--advanced-duration, 400ms) ease;
      }
      
      .advanced-btn-offset:hover::before {
        opacity: 1;
      }
      
      /* Neon Glow */
      .advanced-btn-neon {
        border: 2px solid var(--advanced-primary, #4ecdc4);
        color: var(--advanced-primary, #4ecdc4);
        background: transparent;
        text-shadow: 0 0 10px var(--advanced-primary, #4ecdc4);
      }
      
      .advanced-btn-neon:hover {
        background: var(--advanced-primary, #4ecdc4);
        color: white;
        box-shadow: 
          0 0 var(--advanced-glow, 20px) var(--advanced-primary, #4ecdc4),
          inset 0 0 var(--advanced-glow, 20px) var(--advanced-primary, #4ecdc4);
        text-shadow: none;
      }
      
      /* Warp/Liquid Effect */
      .advanced-btn-warp:hover {
        animation: warp 0.8s ease-in-out;
      }
      
      @keyframes warp {
        0%, 100% { border-radius: 8px; }
        25% { border-radius: 50% 8px 50% 8px; }
        50% { border-radius: 8px 50% 8px 50%; }
        75% { border-radius: 50% 8px 50% 8px; }
      }
      
      /* Split Sides Effect */
      .advanced-btn-split-sides::before,
      .advanced-btn-split-sides::after {
        content: '';
        position: absolute;
        top: 0;
        width: 2px;
        height: 100%;
        background: var(--advanced-primary, #4ecdc4);
        transition: all var(--advanced-duration, 400ms) ease;
      }
      
      .advanced-btn-split-sides::before {
        left: 0;
      }
      
      .advanced-btn-split-sides::after {
        right: 0;
      }
      
      .advanced-btn-split-sides:hover::before {
        left: -10px;
      }
      
      .advanced-btn-split-sides:hover::after {
        right: -10px;
      }
      
      /* Inside Out Effect */
      .advanced-btn-inside-out::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        width: 0;
        height: 100%;
        background: var(--advanced-primary, #4ecdc4);
        transform: translateX(-50%);
        transition: width var(--advanced-duration, 400ms) ease;
        z-index: -1;
      }
      
      .advanced-btn-inside-out:hover::before {
        width: 100%;
      }
      
      /* Gradient Animated */
      .advanced-btn-gradient-animated {
        background: linear-gradient(
          45deg,
          var(--advanced-primary, #4ecdc4),
          var(--advanced-secondary, #ff6b6b),
          var(--advanced-primary, #4ecdc4)
        );
        background-size: 200% 200%;
        animation: gradient-shift 3s ease infinite;
      }
      
      .advanced-btn-gradient-animated:hover {
        animation-duration: 1s;
      }
      
      @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      /* Border Wipe */
      .advanced-btn-border-wipe {
        border: 2px solid transparent;
        background-clip: padding-box;
      }
      
      .advanced-btn-border-wipe::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 2px solid var(--advanced-primary, #4ecdc4);
        clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
        transition: clip-path var(--advanced-duration, 600ms) ease;
      }
      
      .advanced-btn-border-wipe:hover::before {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
      
      /* Float Up */
      .advanced-btn-float-up {
        transition: transform var(--advanced-duration, 400ms) ease;
      }
      
      .advanced-btn-float-up:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
      }
      
      /* Strikethrough */
      .advanced-btn-strikethrough {
        position: relative;
      }
      
      .advanced-btn-strikethrough::after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0;
        height: 2px;
        background: var(--advanced-primary, #4ecdc4);
        transition: width var(--advanced-duration, 400ms) ease;
      }
      
      .advanced-btn-strikethrough:hover::after {
        width: 100%;
      }
      
      /* 3D Flip */
      .advanced-btn-3d-flip {
        transform-style: preserve-3d;
        perspective: 1000px;
      }
      
      .advanced-btn-3d-flip:hover {
        transform: rotateY(180deg);
      }
      
      /* Popup */
      .advanced-btn-popup:hover {
        animation: popup 0.5s ease;
      }
      
      @keyframes popup {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
      }
    `;
    document.head.appendChild(style);
  }
  
  public changeType(type: AdvancedButtonType): void {
    this.element.classList.remove(`advanced-btn-${this.type}`);
    this.type = type;
    this.element.classList.add(`advanced-btn-${this.type}`);
  }
  
  public destroy(): void {
    this.element.classList.remove('advanced-button-effect', `advanced-btn-${this.type}`);
  }
}

export type AdvancedButtonType = 
  | 'spinner'
  | 'burst'
  | 'revolve'
  | 'pressdown'
  | 'offset'
  | 'neon'
  | 'warp'
  | 'split-sides'
  | 'inside-out'
  | 'gradient-animated'
  | 'border-wipe'
  | 'float-up'
  | 'strikethrough'
  | '3d-flip'
  | 'popup';

export interface AdvancedButtonOptions {
  duration?: string;
  primaryColor?: string;
  secondaryColor?: string;
  glowIntensity?: string;
}
