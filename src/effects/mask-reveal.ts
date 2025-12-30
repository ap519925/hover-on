/**
 * Mask Reveal Effect
 * Uses CSS masking and sprite sheets for ink/paint reveal effects
 */

export class MaskRevealEffect {
    private element: HTMLElement;
    private type: MaskRevealType;

    constructor(element: HTMLElement | string, type: MaskRevealType = 'nature', options: MaskRevealOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: MaskRevealOptions): void {
        const {
            maskUrl = this.getDefaultMaskUrl(this.type),
            steps = this.getDefaultSteps(this.type),
            duration = '0.7s',
            color = '#000',
            textColor = '#fff'
        } = options;

        this.element.classList.add('mask-btn');
        this.element.style.setProperty('--mask-url', `url(${maskUrl})`);
        this.element.style.setProperty('--mask-steps', steps.toString());
        this.element.style.setProperty('--mask-duration', duration);
        this.element.style.setProperty('--mask-color', color);
        this.element.style.setProperty('--mask-text-color', textColor);

        // Inject the duplicate text span required for the effect
        if (!this.element.querySelector('.mask-text-layer')) {
            const textStr = this.element.textContent || '';
            this.element.textContent = ''; // Clear text

            // Setup text layer (static background)
            const span = document.createElement('span');
            span.className = 'mask-text-layer';
            span.textContent = textStr;
            this.element.appendChild(span);

            // Setup button text (masked foreground)
            const btnText = document.createElement('span');
            btnText.className = 'mask-btn-text';
            btnText.textContent = textStr;
            this.element.appendChild(btnText);
        }

        this.injectStyles();
    }

    private getDefaultMaskUrl(type: MaskRevealType): string {
        switch (type) {
            case 'urban': return 'https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/urban-sprite.png';
            case 'nature':
            default: return 'https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/nature-sprite.png';
        }
    }

    private getDefaultSteps(type: MaskRevealType): number {
        switch (type) {
            case 'urban': return 29;
            case 'nature':
            default: return 22;
        }
    }

    private injectStyles(): void {
        const styleId = 'mask-reveal-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .mask-btn {
        position: relative;
        overflow: hidden;
        border: 1px solid #000;
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        transition: 0.5s;
        letter-spacing: 1px;
        border-radius: 8px;
        cursor: pointer;
        background: transparent;
        padding: 0;
        display: inline-block;
        min-width: 120px;
        min-height: 50px;
      }

      .mask-text-layer {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          color: #000;
          font-weight: bold;
          z-index: 0;
          white-space: nowrap;
          pointer-events: none;
      }

      .mask-btn-text {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 101%;
          height: 100%;
          font-weight: bold;
          background: var(--mask-color, #000);
          color: var(--mask-text-color, #fff);
          
          -webkit-mask: var(--mask-url);
          mask: var(--mask-url);
          -webkit-mask-size: calc(var(--mask-steps) * 100%) 100%;
          mask-size: calc(var(--mask-steps) * 100%) 100%;
          
          -webkit-animation: mask-out var(--mask-duration) steps(var(--mask-steps)) forwards;
          animation: mask-out var(--mask-duration) steps(var(--mask-steps)) forwards;
          z-index: 1;
          position: relative;
      }

      .mask-btn:hover .mask-btn-text {
        -webkit-animation: mask-in var(--mask-duration) steps(var(--mask-steps)) forwards;
        animation: mask-in var(--mask-duration) steps(var(--mask-steps)) forwards;
      }
      
      @keyframes mask-in {
        from { -webkit-mask-position: 0 0; mask-position: 0 0; }
        to { -webkit-mask-position: 100% 0; mask-position: 100% 0; }
      }
      
      @keyframes mask-out {
        from { -webkit-mask-position: 100% 0; mask-position: 100% 0; }
        to { -webkit-mask-position: 0 0; mask-position: 0 0; }
      }
    `;
        document.head.appendChild(style);
    }
}

export type MaskRevealType = 'nature' | 'urban';

export interface MaskRevealOptions {
    maskUrl?: string;
    steps?: number;
    duration?: string;
    color?: string;
    textColor?: string;
}
