/**
 * Text Effects
 * Animated text hover effects including gradient, glitch, and typewriter
 */

export class TextEffect {
    private element: HTMLElement;
    private type: TextEffectType;

    constructor(element: HTMLElement | string, type: TextEffectType = 'gradient', options: TextEffectOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: TextEffectOptions): void {
        const {
            duration = '400ms',
            primaryColor = '#4ecdc4',
            secondaryColor = '#ff6b6b',
            glitchIntensity = '5px'
        } = options;

        this.element.classList.add('text-effect', `text-effect-${this.type}`);
        this.element.style.setProperty('--text-duration', duration);
        this.element.style.setProperty('--text-primary', primaryColor);
        this.element.style.setProperty('--text-secondary', secondaryColor);
        this.element.style.setProperty('--text-glitch', glitchIntensity);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'text-effect-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .text-effect {
        display: inline-block;
        transition: all var(--text-duration, 400ms) ease;
      }
      
      /* Gradient Text */
      .text-effect-gradient {
        background: linear-gradient(
          45deg,
          var(--text-primary, #4ecdc4),
          var(--text-secondary, #ff6b6b)
        );
        background-size: 200% 200%;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: gradient-shift 3s ease infinite;
      }
      
      .text-effect-gradient:hover {
        animation-duration: 1s;
      }
      
      @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      /* Glitch Effect */
      .text-effect-glitch {
        position: relative;
      }
      
      .text-effect-glitch:hover::before,
      .text-effect-glitch:hover::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      
      .text-effect-glitch:hover::before {
        left: var(--text-glitch, 5px);
        text-shadow: -2px 0 var(--text-primary, #4ecdc4);
        animation: glitch-1 0.3s infinite;
      }
      
      .text-effect-glitch:hover::after {
        left: calc(var(--text-glitch, 5px) * -1);
        text-shadow: 2px 0 var(--text-secondary, #ff6b6b);
        animation: glitch-2 0.3s infinite;
      }
      
      @keyframes glitch-1 {
        0%, 100% { clip-path: inset(40% 0 61% 0); }
        20% { clip-path: inset(92% 0 1% 0); }
        40% { clip-path: inset(43% 0 1% 0); }
        60% { clip-path: inset(25% 0 58% 0); }
        80% { clip-path: inset(54% 0 7% 0); }
      }
      
      @keyframes glitch-2 {
        0%, 100% { clip-path: inset(54% 0 7% 0); }
        20% { clip-path: inset(25% 0 58% 0); }
        40% { clip-path: inset(43% 0 1% 0); }
        60% { clip-path: inset(92% 0 1% 0); }
        80% { clip-path: inset(40% 0 61% 0); }
      }
      
      /* Neon Glow */
      .text-effect-neon {
        color: var(--text-primary, #4ecdc4);
        text-shadow: 0 0 10px var(--text-primary, #4ecdc4);
      }
      
      .text-effect-neon:hover {
        text-shadow: 
          0 0 10px var(--text-primary, #4ecdc4),
          0 0 20px var(--text-primary, #4ecdc4),
          0 0 30px var(--text-primary, #4ecdc4),
          0 0 40px var(--text-secondary, #ff6b6b);
      }
      
      /* Wave Animation */
      .text-effect-wave:hover {
        animation: wave 1s ease-in-out infinite;
      }
      
      @keyframes wave {
        0%, 100% { transform: translateY(0); }
        25% { transform: translateY(-5px); }
        75% { transform: translateY(5px); }
      }
      
      /* Split Color */
      .text-effect-split {
        background: linear-gradient(
          to right,
          var(--text-primary, #4ecdc4) 50%,
          var(--text-secondary, #ff6b6b) 50%
        );
        background-size: 200% 100%;
        background-position: 100% 0;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: background-position var(--text-duration, 400ms) ease;
      }
      
      .text-effect-split:hover {
        background-position: 0 0;
      }
      
      /* Shadow Lift */
      .text-effect-shadow:hover {
        text-shadow: 
          3px 3px 0 var(--text-primary, #4ecdc4),
          6px 6px 0 var(--text-secondary, #ff6b6b);
        transform: translate(-3px, -3px);
      }
      
      /* Blur In */
      .text-effect-blur {
        filter: blur(0);
        opacity: 1;
      }
      
      .text-effect-blur:hover {
        animation: blur-in 0.6s ease;
      }
      
      @keyframes blur-in {
        0% { filter: blur(0); opacity: 1; }
        50% { filter: blur(5px); opacity: 0.5; }
        100% { filter: blur(0); opacity: 1; }
      }
    `;
        document.head.appendChild(style);
    }

    public changeType(type: TextEffectType): void {
        this.element.classList.remove(`text-effect-${this.type}`);
        this.type = type;
        this.element.classList.add(`text-effect-${this.type}`);
    }

    public destroy(): void {
        this.element.classList.remove('text-effect', `text-effect-${this.type}`);
    }
}

export type TextEffectType =
    | 'gradient'
    | 'glitch'
    | 'neon'
    | 'wave'
    | 'split'
    | 'shadow'
    | 'blur';

export interface TextEffectOptions {
    duration?: string;
    primaryColor?: string;
    secondaryColor?: string;
    glitchIntensity?: string;
}
