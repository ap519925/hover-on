/**
 * Fizzy Button Effect
 * Particle-based loading and completion button
 */

export class FizzyButtonEffect {
    private element: HTMLElement;
    private isAnimating: boolean = false;

    constructor(element: HTMLElement | string, options: FizzyButtonOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.init(options);
    }

    private init(options: FizzyButtonOptions): void {
        const {
            primaryColor = '#00C4FF',
            secondaryColor = '#fff',
            particleCount = 50
        } = options;

        this.element.classList.add('fizzy-btn-wrapper');
        this.element.style.setProperty('--fizzy-primary', primaryColor);
        this.element.style.setProperty('--fizzy-secondary', secondaryColor);

        // Structure required: 
        // .button_inner > .text + .icon + .tick + .spot-container
        const originalText = this.element.textContent || 'Download';
        this.element.textContent = '';

        const inner = document.createElement('div');
        inner.className = 'button_inner';

        const textSpan = document.createElement('span');
        textSpan.className = 't';
        textSpan.textContent = originalText;

        const icon = document.createElement('span'); // Using span for icon if no icon library
        icon.className = 'l icon-download';
        icon.innerHTML = '⬇';

        const tick = document.createElement('span');
        tick.className = 'tick';
        tick.innerHTML = '✔';

        inner.appendChild(icon);
        inner.appendChild(textSpan);
        inner.appendChild(tick);

        // Particle container
        const particleContainer = document.createElement('div');
        particleContainer.className = 'b_l_quad';
        for (let i = 0; i < particleCount; i++) {
            const spot = document.createElement('div');
            spot.className = 'button_spots';
            particleContainer.appendChild(spot);
        }
        inner.appendChild(particleContainer);

        this.element.appendChild(inner);

        this.injectStyles();

        // Interaction
        this.element.addEventListener('click', () => {
            if (!this.isAnimating) {
                this.toggleState();
            }
        });
    }

    public toggleState(): void {
        this.isAnimating = true;
        this.element.classList.toggle('active');
        // Reset after animation (approx 6s total execution)
        if (this.element.classList.contains('active')) {
            setTimeout(() => {
                this.isAnimating = false;
                // Optionally revert or keep state
            }, 6000);
        } else {
            this.isAnimating = false;
        }
    }

    private injectStyles(): void {
        const styleId = 'fizzy-button-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .fizzy-btn-wrapper {
        position: relative;
        display: inline-block;
        width: 200px;
        height: 50px;
        margin: 20px;
      }

      .button_inner {
        border-radius: 2px;
        position: absolute;
        width: 200px;
        height: 50px;
        left: 0; right: 0; top: 0; bottom: 0;
        margin: auto;
        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.04);
        font-weight: 100;
        font-size: 14px;
        cursor: pointer;
        border: 2px solid #FFFFFF;
        background: #2C3940;
        color: white;
        text-align: center;
        transition: all .3s, box-shadow .2s, transform .2s .2s;
        overflow: hidden; /* Added to keep particles contained initially */
      }
      
      .button_inner:hover {
        background: white;
        color: #2C3940;
      }
      
      .button_inner span.t {
        position: relative;
        top: 14px; /* Centering tweak */
        transition: left .4s .1s;
        left: 0;
      }
      
      .button_inner:hover span.t {
        left: 10px;
      }
      
      .button_inner .l {
        position: relative;
        left: -10px;
        top: 14px;
        color: var(--fizzy-primary);
        font-size: 18px;
        opacity: 0;
        transition: opacity .3s;
      }
      
      .button_inner:hover .l {
        opacity: 1;
      }

      /* Active / Loading State */
      .fizzy-btn-wrapper.active .button_inner {
        background: transparent;
        transform: rotate(90deg);
        width: 100px; /* Compress to circle/spinner */
        border-radius: 100px;
        box-shadow: 0px 0px 0px 440px rgba(0,0,0,0);
        animation: finalbox .4s 4.42s cubic-bezier(0.39, 2.01, 0.27, 0.75) forwards;
        border-color: #2C3940;
      }
      
      .fizzy-btn-wrapper.active .button_inner span.t {
          opacity: 0;
          top: 20px;
      }
      
      .fizzy-btn-wrapper.active .button_inner .l {
         left: 14px;
         opacity: 1;
         top: 11px;
         animation: down 1s .25s infinite, final .2s 4s forwards;
      }
      
      .tick {
        position: absolute;
        left: 0; right: 0;
        margin: auto;
        top: 12px;
        font-size: 20px;
        transform: scale(0) rotate(-90deg);
        color: var(--fizzy-primary);
        animation: tick .3s 4.7s forwards;
      }
      
      .button_spots {
         position: absolute;
         width: 4px; height: 4px;
         border-radius: 50%;
         background: var(--fizzy-primary);
         opacity: 0;
      }
      
      /* Simple particle animation for compatibility */
      .fizzy-btn-wrapper.active .button_spots {
          animation: spew 1s .3s forwards, rotate 4s linear infinite;
      }
      
      @keyframes down {
        from { top: 0px; }
        to { top: 15px; opacity: 0; }
      }
      
      @keyframes final {
        to { opacity: 0; }
      }
      
      @keyframes finalbox {
        to { width: 50px; background: white; text-align: center; } /* Circle finish */
      }
      
      @keyframes tick {
        to { transform: scale(1) rotate(0deg); }
      }
      
      @keyframes spew {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; transform: translateY(50px) scale(0); }
      }
      
      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
        document.head.appendChild(style);
    }
}

export interface FizzyButtonOptions {
    primaryColor?: string;
    secondaryColor?: string;
    particleCount?: number;
}
