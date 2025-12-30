/**
 * Image Overlay Effects
 * Color overlays, zoom effects, and caption animations for images
 */

export class ImageOverlayEffect {
    private element: HTMLElement;
    private type: OverlayType;

    constructor(element: HTMLElement | string, type: OverlayType = 'fade', options: OverlayOptions = {}) {
        this.element = typeof element === 'string'
            ? document.querySelector(element) as HTMLElement
            : element;

        if (!this.element) {
            throw new Error('Element not found');
        }

        this.type = type;
        this.init(options);
    }

    private init(options: OverlayOptions): void {
        const {
            duration = '400ms',
            overlayColor = 'rgba(0, 0, 0, 0.5)',
            zoomScale = '1.1'
        } = options;

        this.element.classList.add('image-overlay-effect', `overlay-${this.type}`);
        this.element.style.setProperty('--overlay-duration', duration);
        this.element.style.setProperty('--overlay-color', overlayColor);
        this.element.style.setProperty('--overlay-zoom', zoomScale);

        this.injectStyles();
    }

    private injectStyles(): void {
        const styleId = 'image-overlay-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      .image-overlay-effect {
        position: relative;
        overflow: hidden;
        display: block;
      }
      
      .image-overlay-effect img {
        display: block;
        width: 100%;
        height: auto;
        transition: transform var(--overlay-duration, 400ms) ease;
      }
      
      .image-overlay-effect::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--overlay-color, rgba(0, 0, 0, 0.5));
        opacity: 0;
        transition: opacity var(--overlay-duration, 400ms) ease;
        z-index: 1;
      }
      
      /* Fade Overlay */
      .overlay-fade:hover::before {
        opacity: 1;
      }
      
      .overlay-fade:hover img {
        transform: scale(var(--overlay-zoom, 1.1));
      }
      
      /* Slide from Top */
      .overlay-slide-top::before {
        transform: translateY(-100%);
        opacity: 1;
      }
      
      .overlay-slide-top:hover::before {
        transform: translateY(0);
      }
      
      /* Slide from Bottom */
      .overlay-slide-bottom::before {
        transform: translateY(100%);
        opacity: 1;
      }
      
      .overlay-slide-bottom:hover::before {
        transform: translateY(0);
      }
      
      /* Slide from Left */
      .overlay-slide-left::before {
        transform: translateX(-100%);
        opacity: 1;
      }
      
      .overlay-slide-left:hover::before {
        transform: translateX(0);
      }
      
      /* Slide from Right */
      .overlay-slide-right::before {
        transform: translateX(100%);
        opacity: 1;
      }
      
      .overlay-slide-right:hover::before {
        transform: translateX(0);
      }
      
      /* Zoom */
      .overlay-zoom:hover img {
        transform: scale(var(--overlay-zoom, 1.1));
      }
      
      .overlay-zoom:hover::before {
        opacity: 0.3;
      }
      
      /* Blur */
      .overlay-blur:hover img {
        filter: blur(3px);
      }
      
      .overlay-blur:hover::before {
        opacity: 0.5;
      }
      
      /* Grayscale */
      .overlay-grayscale img {
        filter: grayscale(100%);
        transition: filter var(--overlay-duration, 400ms) ease;
      }
      
      .overlay-grayscale:hover img {
        filter: grayscale(0%);
      }
      
      /* Circle Reveal */
      .overlay-circle::before {
        clip-path: circle(0% at 50% 50%);
        opacity: 1;
      }
      
      .overlay-circle:hover::before {
        clip-path: circle(100% at 50% 50%);
      }
    `;
        document.head.appendChild(style);
    }

    public changeType(type: OverlayType): void {
        this.element.classList.remove(`overlay-${this.type}`);
        this.type = type;
        this.element.classList.add(`overlay-${this.type}`);
    }

    public destroy(): void {
        this.element.classList.remove('image-overlay-effect', `overlay-${this.type}`);
    }
}

export type OverlayType =
    | 'fade'
    | 'slide-top'
    | 'slide-bottom'
    | 'slide-left'
    | 'slide-right'
    | 'zoom'
    | 'blur'
    | 'grayscale'
    | 'circle';

export interface OverlayOptions {
    duration?: string;
    overlayColor?: string;
    zoomScale?: string;
}
