/**
 * Gallery Hover Effect with Mix-Blend-Mode
 * Creates a stunning fixed text overlay that appears on hover with blend mode effects
 * Perfect for portfolio galleries and image grids
 */

export class GalleryHoverEffect {
  private container: HTMLElement;
  private hoverText: HTMLElement | null = null;
  
  constructor(container: HTMLElement | string, options: GalleryHoverOptions = {}) {
    this.container = typeof container === 'string' 
      ? document.querySelector(container) as HTMLElement 
      : container;
    
    if (!this.container) {
      throw new Error('Container element not found');
    }
    
    this.init(options);
  }
  
  private init(options: GalleryHoverOptions): void {
    const {
      hoverTextContent = 'VIEW',
      fontSize = '8vw',
      fontFamily = 'Poppins, sans-serif',
      fontWeight = '800',
      blendMode = 'difference',
      transitionDuration = '250ms'
    } = options;
    
    // Add classes to container
    this.container.classList.add('gallery-hover-container');
    
    // Create hover text overlay
    this.hoverText = document.createElement('div');
    this.hoverText.className = 'hover-text-overlay';
    this.hoverText.innerHTML = `<h2>${hoverTextContent}</h2>`;
    document.body.appendChild(this.hoverText);
    
    // Add CSS dynamically
    this.injectStyles(fontSize, fontFamily, fontWeight, blendMode, transitionDuration);
    
    // Setup event listeners
    this.setupEventListeners();
  }
  
  private injectStyles(fontSize: string, fontFamily: string, fontWeight: string, blendMode: string, duration: string): void {
    const styleId = 'gallery-hover-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .gallery-hover-container {
        position: relative;
        display: block;
        width: 100%;
      }
      
      .gallery-hover-row {
        display: flex;
        flex-wrap: wrap;
        margin: -15px;
      }
      
      .gallery-hover-row:hover .gallery-hover-col {
        opacity: 0.1;
      }
      
      .gallery-hover-col {
        position: relative;
        width: 100%;
        flex: 0 0 50%;
        max-width: 50%;
        transition: opacity ${duration} linear;
        padding: 15px;
      }
      
      .gallery-hover-row .gallery-hover-col:hover {
        opacity: 1;
      }
      
      .gallery-hover-item {
        position: relative;
        display: block;
        width: 100%;
        overflow: hidden;
        border-radius: 6px;
        cursor: pointer;
      }
      
      .gallery-hover-item img {
        display: block;
        width: 100%;
        height: auto;
        transition: transform ${duration} linear;
      }
      
      .gallery-hover-col:hover .gallery-hover-item img {
        transform: scale(1.1) rotate(-3deg);
      }
      
      .hover-text-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 100;
        pointer-events: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        mix-blend-mode: ${blendMode};
      }
      
      .hover-text-overlay h2 {
        font-family: ${fontFamily};
        font-weight: ${fontWeight};
        font-size: ${fontSize};
        line-height: 1;
        color: #fff;
        opacity: 0;
        transform: scale(0.8);
        transition: transform ${duration} linear, opacity ${duration} ease;
        margin: 0;
      }
      
      .gallery-hover-col:hover ~ .hover-text-overlay h2 {
        opacity: 1;
        transform: scale(1);
      }
      
      @media (max-width: 767px) {
        .gallery-hover-col {
          flex: 0 0 100%;
          max-width: 100%;
        }
        .hover-text-overlay h2 {
          font-size: 12vw;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  private setupEventListeners(): void {
    const cols = this.container.querySelectorAll('.gallery-hover-col');
    
    cols.forEach(col => {
      col.addEventListener('mouseenter', () => {
        if (this.hoverText) {
          const h2 = this.hoverText.querySelector('h2');
          if (h2) {
            h2.style.opacity = '1';
            h2.style.transform = 'scale(1)';
          }
        }
      });
      
      col.addEventListener('mouseleave', () => {
        if (this.hoverText) {
          const h2 = this.hoverText.querySelector('h2');
          if (h2) {
            h2.style.opacity = '0';
            h2.style.transform = 'scale(0.8)';
          }
        }
      });
    });
  }
  
  public destroy(): void {
    if (this.hoverText) {
      this.hoverText.remove();
    }
  }
}

export interface GalleryHoverOptions {
  hoverTextContent?: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  blendMode?: 'difference' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten';
  transitionDuration?: string;
}
