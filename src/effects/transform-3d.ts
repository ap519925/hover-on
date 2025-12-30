/**
 * 3D Transform Effects
 * Perspective-based hover effects including flip, lift, and tilt
 */

export class Transform3DEffect {
  private element: HTMLElement;
  private type: Transform3DType;
  
  constructor(element: HTMLElement | string, type: Transform3DType = 'lift', options: Transform3DOptions = {}) {
    this.element = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement 
      : element;
    
    if (!this.element) {
      throw new Error('Element not found');
    }
    
    this.type = type;
    this.init(options);
  }
  
  private init(options: Transform3DOptions): void {
    const {
      duration = '400ms',
      timingFunction = 'ease',
      perspective = '1000px',
      translateZ = '20px',
      rotateAmount = '10deg',
      shadowColor = 'rgba(0, 0, 0, 0.3)'
    } = options;
    
    this.element.classList.add('transform-3d-effect', `transform-3d-${this.type}`);
    this.element.style.setProperty('--transform-duration', duration);
    this.element.style.setProperty('--transform-timing', timingFunction);
    this.element.style.setProperty('--transform-perspective', perspective);
    this.element.style.setProperty('--transform-z', translateZ);
    this.element.style.setProperty('--transform-rotate', rotateAmount);
    this.element.style.setProperty('--transform-shadow', shadowColor);
    
    this.injectStyles();
    
    if (this.type === 'tilt-follow') {
      this.setupTiltFollow();
    }
  }
  
  private injectStyles(): void {
    const styleId = 'transform-3d-effect-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .transform-3d-effect {
        transform-style: preserve-3d;
        transition: transform var(--transform-duration, 400ms) var(--transform-timing, ease);
      }
      
      /* Lift Effect */
      .transform-3d-lift {
        transform: perspective(var(--transform-perspective, 1000px)) translateZ(0);
      }
      
      .transform-3d-lift:hover {
        transform: perspective(var(--transform-perspective, 1000px)) translateZ(var(--transform-z, 20px));
        box-shadow: 0 20px 40px var(--transform-shadow, rgba(0, 0, 0, 0.3));
      }
      
      /* Flip Horizontal */
      .transform-3d-flip-h {
        transform: perspective(var(--transform-perspective, 1000px)) rotateY(0deg);
      }
      
      .transform-3d-flip-h:hover {
        transform: perspective(var(--transform-perspective, 1000px)) rotateY(180deg);
      }
      
      /* Flip Vertical */
      .transform-3d-flip-v {
        transform: perspective(var(--transform-perspective, 1000px)) rotateX(0deg);
      }
      
      .transform-3d-flip-v:hover {
        transform: perspective(var(--transform-perspective, 1000px)) rotateX(180deg);
      }
      
      /* Tilt */
      .transform-3d-tilt {
        transform: perspective(var(--transform-perspective, 1000px)) rotateX(0deg) rotateY(0deg);
      }
      
      .transform-3d-tilt:hover {
        transform: perspective(var(--transform-perspective, 1000px)) 
          rotateX(var(--transform-rotate, 10deg)) 
          rotateY(var(--transform-rotate, 10deg))
          translateZ(10px);
      }
      
      /* Tilt Follow (mouse tracking) */
      .transform-3d-tilt-follow {
        transform: perspective(var(--transform-perspective, 1000px)) rotateX(0deg) rotateY(0deg);
      }
      
      /* Pop */
      .transform-3d-pop {
        transform: perspective(var(--transform-perspective, 1000px)) scale(1) translateZ(0);
      }
      
      .transform-3d-pop:hover {
        transform: perspective(var(--transform-perspective, 1000px)) scale(1.1) translateZ(var(--transform-z, 20px));
        box-shadow: 0 15px 30px var(--transform-shadow, rgba(0, 0, 0, 0.3));
      }
      
      /* Rotate 3D */
      .transform-3d-rotate {
        transform: perspective(var(--transform-perspective, 1000px)) rotateZ(0deg);
      }
      
      .transform-3d-rotate:hover {
        transform: perspective(var(--transform-perspective, 1000px)) 
          rotateZ(5deg) 
          translateZ(var(--transform-z, 20px));
      }
      
      /* Swing */
      .transform-3d-swing:hover {
        animation: swing-3d 0.6s ease-in-out;
      }
      
      @keyframes swing-3d {
        0%, 100% { transform: perspective(var(--transform-perspective, 1000px)) rotateY(0deg); }
        25% { transform: perspective(var(--transform-perspective, 1000px)) rotateY(-10deg); }
        75% { transform: perspective(var(--transform-perspective, 1000px)) rotateY(10deg); }
      }
      
      /* Cube Spin */
      .transform-3d-cube-spin:hover {
        animation: cube-spin 1s ease-in-out;
      }
      
      @keyframes cube-spin {
        0% { transform: perspective(var(--transform-perspective, 1000px)) rotateY(0deg) rotateX(0deg); }
        50% { transform: perspective(var(--transform-perspective, 1000px)) rotateY(180deg) rotateX(90deg); }
        100% { transform: perspective(var(--transform-perspective, 1000px)) rotateY(360deg) rotateX(0deg); }
      }
      
      /* Float */
      .transform-3d-float:hover {
        animation: float-3d 2s ease-in-out infinite;
      }
      
      @keyframes float-3d {
        0%, 100% {
          transform: perspective(var(--transform-perspective, 1000px)) translateY(0px) translateZ(0);
        }
        50% {
          transform: perspective(var(--transform-perspective, 1000px)) translateY(-10px) translateZ(10px);
          box-shadow: 0 15px 25px var(--transform-shadow, rgba(0, 0, 0, 0.2));
        }
      }
      
      /* Skew */
      .transform-3d-skew {
        transform: perspective(var(--transform-perspective, 1000px)) skewX(0deg) skewY(0deg);
      }
      
      .transform-3d-skew:hover {
        transform: perspective(var(--transform-perspective, 1000px)) 
          skewX(-5deg) 
          skewY(2deg) 
          translateZ(10px);
      }
    `;
    document.head.appendChild(style);
  }
  
  private setupTiltFollow(): void {
    this.element.addEventListener('mousemove', (e) => {
      const rect = this.element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      this.element.style.transform = `
        perspective(${this.element.style.getPropertyValue('--transform-perspective') || '1000px'})
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(10px)
      `;
    });
    
    this.element.addEventListener('mouseleave', () => {
      this.element.style.transform = `
        perspective(${this.element.style.getPropertyValue('--transform-perspective') || '1000px'})
        rotateX(0deg)
        rotateY(0deg)
        translateZ(0)
      `;
    });
  }
  
  public changeType(type: Transform3DType): void {
    this.element.classList.remove(`transform-3d-${this.type}`);
    this.type = type;
    this.element.classList.add(`transform-3d-${this.type}`);
    
    if (type === 'tilt-follow') {
      this.setupTiltFollow();
    }
  }
  
  public destroy(): void {
    this.element.classList.remove('transform-3d-effect', `transform-3d-${this.type}`);
  }
}

export type Transform3DType = 
  | 'lift' 
  | 'flip-h' 
  | 'flip-v' 
  | 'tilt' 
  | 'tilt-follow' 
  | 'pop' 
  | 'rotate' 
  | 'swing' 
  | 'cube-spin' 
  | 'float' 
  | 'skew';

export interface Transform3DOptions {
  duration?: string;
  timingFunction?: string;
  perspective?: string;
  translateZ?: string;
  rotateAmount?: string;
  shadowColor?: string;
}
