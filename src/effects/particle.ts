/**
 * Particle Effects
 * Particle burst and animation effects
 */

export class ParticleEffect {
  private element: HTMLElement;
  private type: ParticleEffectType;
  
  constructor(element: HTMLElement | string, type: ParticleEffectType = 'burst', options: ParticleEffectOptions = {}) {
    this.element = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement 
      : element;
    
    if (!this.element) {
      throw new Error('Element not found');
    }
    
    this.type = type;
    this.init(options);
  }
  
  private init(options: ParticleEffectOptions): void {
    const {
      particleCount = 20,
      particleColor = '#4ecdc4',
      duration = '1000ms'
    } = options;
    
    this.element.classList.add('particle-effect', `particle-${this.type}`);
    this.element.style.setProperty('--particle-count', particleCount.toString());
    this.element.style.setProperty('--particle-color', particleColor);
    this.element.style.setProperty('--particle-duration', duration);
    
    this.injectStyles();
    this.setupParticles(particleCount);
  }
  
  private injectStyles(): void {
    const styleId = 'particle-effect-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .particle-effect {
        position: relative;
      }
      
      .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--particle-color, #4ecdc4);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
      }
      
      .particle-burst:hover .particle {
        animation: particle-burst var(--particle-duration, 1000ms) ease-out;
      }
      
      @keyframes particle-burst {
        0% {
          opacity: 1;
          transform: translate(0, 0) scale(1);
        }
        100% {
          opacity: 0;
          transform: translate(var(--tx), var(--ty)) scale(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  private setupParticles(count: number): void {
    if (this.type === 'burst') {
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const angle = (360 / count) * i;
        const tx = Math.cos(angle * Math.PI / 180) * 100;
        const ty = Math.sin(angle * Math.PI / 180) * 100;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        this.element.appendChild(particle);
      }
    }
  }
  
  public changeType(type: ParticleEffectType): void {
    this.element.classList.remove(`particle-${this.type}`);
    this.type = type;
    this.element.classList.add(`particle-${this.type}`);
  }
  
  public destroy(): void {
    this.element.classList.remove('particle-effect', `particle-${this.type}`);
    this.element.querySelectorAll('.particle').forEach(p => p.remove());
  }
}

export type ParticleEffectType = 'burst';

export interface ParticleEffectOptions {
  particleCount?: number;
  particleColor?: string;
  duration?: string;
}
