/**
 * Card Hover Effects
 * Effects specifically designed for card components
 */

export class CardEffect {
  private element: HTMLElement;
  private type: CardEffectType;
  
  constructor(element: HTMLElement | string, type: CardEffectType = 'lift-shadow', options: CardEffectOptions = {}) {
    this.element = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement 
      : element;
    
    if (!this.element) {
      throw new Error('Element not found');
    }
    
    this.type = type;
    this.init(options);
  }
  
  private init(options: CardEffectOptions): void {
    const {
      duration = '400ms',
      shadowColor = 'rgba(0, 0, 0, 0.3)',
      liftAmount = '10px'
    } = options;
    
    this.element.classList.add('card-effect', `card-${this.type}`);
    this.element.style.setProperty('--card-duration', duration);
    this.element.style.setProperty('--card-shadow', shadowColor);
    this.element.style.setProperty('--card-lift', liftAmount);
    
    this.injectStyles();
  }
  
  private injectStyles(): void {
    const styleId = 'card-effect-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .card-effect {
        transition: all var(--card-duration, 400ms) ease;
      }
      
      /* Lift with Shadow */
      .card-lift-shadow {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .card-lift-shadow:hover {
        transform: translateY(calc(var(--card-lift, 10px) * -1));
        box-shadow: 0 20px 40px var(--card-shadow, rgba(0, 0, 0, 0.3));
      }
      
      /* Glow Border */
      .card-glow-border {
        border: 1px solid transparent;
      }
      
      .card-glow-border:hover {
        border-color: #4ecdc4;
        box-shadow: 0 0 20px rgba(78, 205, 196, 0.5);
      }
      
      /* Tilt 3D */
      .card-tilt-3d {
        transform-style: preserve-3d;
        perspective: 1000px;
      }
      
      .card-tilt-3d:hover {
        transform: rotateX(5deg) rotateY(5deg);
      }
    `;
    document.head.appendChild(style);
  }
  
  public changeType(type: CardEffectType): void {
    this.element.classList.remove(`card-${this.type}`);
    this.type = type;
    this.element.classList.add(`card-${this.type}`);
  }
  
  public destroy(): void {
    this.element.classList.remove('card-effect', `card-${this.type}`);
  }
}

export type CardEffectType = 
  | 'lift-shadow'
  | 'glow-border'
  | 'tilt-3d';

export interface CardEffectOptions {
  duration?: string;
  shadowColor?: string;
  liftAmount?: string;
}
