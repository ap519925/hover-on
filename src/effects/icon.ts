/**
 * Icon Effects
 * Animated icon hover effects with rotation, bounce, and color changes
 */

export class IconEffect {
    private element: HTMLElement;
    private type: IconEffectType;

    constructor(element: HTMLElement | string, type: IconEffectType = 'rotate', options: IconEffectOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: IconEffectOptions): void {
        const {
            duration = '300ms',
            color = '#4ecdc4',
            hoverColor = '#ff6b6b',
            scale = '1.2'
        } = options;

        this.element.classList.add('icon-effect', `icon-effect-${this.type}`);
        this.element.style.setProperty('--icon-duration', duration);
        this.element.style.setProperty('--icon-color', color);
        this.element.style.setProperty('--icon-hover-color', hoverColor);
        this.element.style.setProperty('--icon-scale', scale);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'icon-effect-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .icon-effect {
        display: inline-block;
        transition: all var(--icon-duration, 300ms) ease;
        color: var(--icon-color, currentColor);
      }
      
      /* Rotate */
      .icon-effect-rotate:hover {
        transform: rotate(360deg);
        color: var(--icon-hover-color, #ff6b6b);
      }
      
      /* Bounce */
      .icon-effect-bounce:hover {
        animation: icon-bounce 0.6s ease;
      }
      
      @keyframes icon-bounce {
        0%, 100% { transform: translateY(0); }
        25% { transform: translateY(-10px); }
        50% { transform: translateY(0); }
        75% { transform: translateY(-5px); }
      }
      
      /* Pulse */
      .icon-effect-pulse:hover {
        animation: icon-pulse 0.8s ease infinite;
      }
      
      @keyframes icon-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(var(--icon-scale, 1.2)); }
      }
      
      /* Shake */
      .icon-effect-shake:hover {
        animation: icon-shake 0.5s ease;
      }
      
      @keyframes icon-shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      /* Flip */
      .icon-effect-flip:hover {
        transform: rotateY(180deg);
      }
      
      /* Grow */
      .icon-effect-grow:hover {
        transform: scale(var(--icon-scale, 1.2));
        color: var(--icon-hover-color, #ff6b6b);
      }
      
      /* Spin */
      .icon-effect-spin:hover {
        animation: icon-spin 1s linear infinite;
      }
      
      @keyframes icon-spin {
        to { transform: rotate(360deg); }
      }
      
      /* Float */
      .icon-effect-float:hover {
        animation: icon-float 2s ease-in-out infinite;
      }
      
      @keyframes icon-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
    `;
        document.head.appendChild(style);
    }

    public changeType(type: IconEffectType): void {
        this.element.classList.remove(`icon-effect-${this.type}`);
        this.type = type;
        this.element.classList.add(`icon-effect-${this.type}`);
    }

    public destroy(): void {
        this.element.classList.remove('icon-effect', `icon-effect-${this.type}`);
    }
}

export type IconEffectType =
    | 'rotate'
    | 'bounce'
    | 'pulse'
    | 'shake'
    | 'flip'
    | 'grow'
    | 'spin'
    | 'float';

export interface IconEffectOptions {
    duration?: string;
    color?: string;
    hoverColor?: string;
    scale?: string;
}

/**
 * Helper function to create social media icons with hover effects
 */
export function createSocialIcon(
    platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'github',
    url: string,
    effect: IconEffectType = 'grow'
): HTMLElement {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'social-icon';

    const icon = document.createElement('i');
    icon.className = `fab fa-${platform}`;
    link.appendChild(icon);

    new IconEffect(icon, effect);

    return link;
}
