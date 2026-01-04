# hover-on-lib

A comprehensive library of navigation and button hover effects with a framework-agnostic core and integrations for Drupal, React, Vue, and vanilla JS.

## 🚀 Installation

```bash
npm install hover-on-lib
```

## 📖 Quick Start

### Automatic Initialization via CSS Classes (New in v1.4.0)

You can now apply hover effects simply by adding a class to your HTML elements. No JavaScript code required!

Just use the class format: `hover-on-[effect]-[type]` or `hover-on-[effect]` for single-type effects.

```html
<!-- Simple Effects -->
<button class="hover-on-glow">Glow Button</button>
<button class="hover-on-squishy">Squishy Button</button>

<!-- Typed Effects -->
<a href="#" class="hover-on-underline-slide">Slide Underline</a>
<div class="hover-on-card-lift">Lift Card</div>
<div class="hover-on-modern-glass">Glass Effect</div>
<div class="hover-on-border-draw">Draw Border</div>
```

The library automatically observes the DOM, so these classes work on both static and dynamically added elements.

### Vanilla JavaScript (Manual Initialization)

```javascript
import { UnderlineEffect, BackgroundSweepEffect, Transform3DEffect } from 'hover-on-lib';

// Add underline effect to navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  new UnderlineEffect(link, 'slide', {
    color: '#4ecdc4',
    thickness: '2px'
  });
});

// Add sweep effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  new BackgroundSweepEffect(btn, 'left', {
    color: '#ff6b6b'
  });
});

// Add 3D lift effect to cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  new Transform3DEffect(card, 'lift', {
    translateZ: '30px'
  });
});
```

### Quick Init Helpers

```javascript
import { quickInit } from 'hover-on-lib';

// Apply underline effects to all nav links
quickInit.navLinks({ color: '#4ecdc4' });

// Apply button hover effects
quickInit.buttons('left', { color: '#ff6b6b' });

// Apply 3D effects to cards
quickInit.cards('lift', { translateZ: '30px' });
```

### Using initEffects

```javascript
import { initEffects } from 'hover-on-lib';

const effects = initEffects([
  {
    selector: 'nav a',
    effect: 'underline',
    type: 'slide',
    options: { color: '#4ecdc4' }
  },
  {
    selector: '.btn',
    effect: 'background',
    type: 'left',
    options: { color: '#ff6b6b' }
  },
  {
    selector: '.card',
    effect: 'transform3d',
    type: 'lift',
    options: { translateZ: '30px' }
  }
]);

// Later, destroy all effects
import { destroyEffects } from 'hover-on-lib';
destroyEffects(effects);
```

## 🎨 Available Effects

### 1. **Underline Effects**
```javascript
import { UnderlineEffect } from 'hover-on-lib';

new UnderlineEffect(element, 'slide', {
  color: '#4ecdc4',
  thickness: '2px',
  duration: '300ms'
});
```

**Types:** `slide`, `center`, `left-right`, `fade`, `grow`

---

### 2. **Background Sweep Effects**
```javascript
import { BackgroundSweepEffect } from 'hover-on-lib';

new BackgroundSweepEffect(element, 'left', {
  color: '#ff6b6b',
  duration: '400ms'
});
```

**Types:** `left`, `right`, `top`, `bottom`, `center`, `diagonal`, `radial`

---

### 3. **Border Effects**
```javascript
import { BorderEffect } from 'hover-on-lib';

new BorderEffect(element, 'draw', {
  color: '#4ecdc4',
  width: '2px',
  duration: '600ms'
});
```

**Types:** `draw`, `spin`, `pulse`, `glow`, `corners`

---

### 4. **3D Transform Effects**
```javascript
import { Transform3DEffect } from 'hover-on-lib';

new Transform3DEffect(element, 'lift', {
  perspective: '1000px',
  translateZ: '20px',
  duration: '400ms'
});
```

**Types:** `lift`, `flip-h`, `flip-v`, `tilt`, `tilt-follow`, `pop`, `rotate`, `swing`, `cube-spin`, `float`, `skew`

---

### 5. **Icon Effects**
```javascript
import { IconEffect, createSocialIcon } from 'hover-on-lib';

new IconEffect(element, 'rotate', {
  color: '#4ecdc4',
  hoverColor: '#ff6b6b',
  duration: '300ms'
});

// Create social media icon with effect
const githubIcon = createSocialIcon('github', 'https://github.com/username', 'grow');
document.body.appendChild(githubIcon);
```

**Types:** `rotate`, `bounce`, `pulse`, `shake`, `flip`, `grow`, `spin`, `float`

---

### 6. **Image Overlay Effects**
```javascript
import { ImageOverlayEffect } from 'hover-on-lib';

new ImageOverlayEffect(element, 'fade', {
  overlayColor: 'rgba(0, 0, 0, 0.5)',
  zoomScale: '1.1',
  duration: '400ms'
});
```

**Types:** `fade`, `slide-top`, `slide-bottom`, `slide-left`, `slide-right`, `zoom`, `blur`, `grayscale`, `circle`

---

### 7. **Text Effects**
```javascript
import { TextEffect } from 'hover-on-lib';

new TextEffect(element, 'gradient', {
  primaryColor: '#4ecdc4',
  secondaryColor: '#ff6b6b',
  duration: '400ms'
});
```

**Types:** `gradient`, `glitch`, `neon`, `wave`, `split`, `shadow`, `blur`

---

### 8. **Advanced Button Effects**
```javascript
import { AdvancedButtonEffect } from 'hover-on-lib';

new AdvancedButtonEffect(element, 'spinner', {
  primaryColor: '#4ecdc4',
  secondaryColor: '#ff6b6b',
  duration: '400ms'
});
```

**Types:** `spinner`, `burst`, `revolve`, `pressdown`, `offset`, `neon`, `warp`, `split-sides`, `inside-out`, `gradient-animated`, `border-wipe`, `float-up`, `strikethrough`, `3d-flip`, `popup`

---

### 9. **Modern CSS Effects**
```javascript
import { ModernCSSEffect } from 'hover-on-lib';

new ModernCSSEffect(element, 'glass', {
  blurAmount: '10px',
  primaryColor: '#4ecdc4',
  duration: '400ms'
});
```

**Types:** `glass`, `neuro`, `clip-morph`, `gradient-border`, `frosted`, `mesh`, `color-mix`, `backdrop`

---

### 10. **Classic Effects**
```javascript
import { ClassicEffect } from 'hover-on-lib';

new ClassicEffect(element, 'fade', {
  color: '#4ecdc4',
  duration: '300ms'
});
```

**Types:** `fade`, `brighten`, `darken`, `grow`, `shrink`, `rotate`, `skew`, `shadow`, `glow`, `underline`, `overline`, `bg-color`, `border-color`, `slide-up`, `slide-down`, `slide-left`, `slide-right`

---

### 11. **Card Effects**
```javascript
import { CardEffect } from 'hover-on-lib';

new CardEffect(element, 'lift', {
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  duration: '400ms'
});
```

**Types:** `lift`, `tilt`, `glow`, `border-glow`

---

### 12. **Particle Effects**
```javascript
import { ParticleEffect } from 'hover-on-lib';

new ParticleEffect(element, 'confetti', {
  particleCount: 30,
  colors: ['#4ecdc4', '#ff6b6b', '#ffd93d']
});
```

**Types:** `confetti`, `sparkle`, `trail`

---

### 13. **Gallery Hover Effect**
```javascript
import { GalleryHoverEffect } from 'hover-on-lib';

new GalleryHoverEffect(containerElement, {
  hoverTextContent: 'VIEW',
  fontSize: '8vw',
  blendMode: 'difference'
});
```

## 🎯 HTML Structure Examples

### Gallery Hover
```html
<div class="gallery-hover-container">
  <div class="gallery-hover-row">
    <div class="gallery-hover-col">
      <a href="#" class="gallery-hover-item">
        <img src="image1.jpg" alt="Image 1">
      </a>
    </div>
    <div class="gallery-hover-col">
      <a href="#" class="gallery-hover-item">
        <img src="image2.jpg" alt="Image 2">
      </a>
    </div>
  </div>
</div>

<script type="module">
  import { GalleryHoverEffect } from 'hover-on-lib';
  new GalleryHoverEffect('.gallery-hover-container');
</script>
```

### Navigation with Underline
```html
<nav>
  <a href="#home">Home</a>
  <a href="#about">About</a>
  <a href="#contact">Contact</a>
</nav>

<script type="module">
  import { quickInit } from 'hover-on-lib';
  quickInit.navLinks({ color: '#4ecdc4' });
</script>
```

### Buttons with Sweep Effect
```html
<button class="btn">Click Me</button>
<button class="btn">Learn More</button>

<script type="module">
  import { quickInit } from 'hover-on-lib';
  quickInit.buttons('left', { color: '#ff6b6b' });
</script>
```

## 🔧 TypeScript Support

Full TypeScript support with type definitions included:

```typescript
import { 
  UnderlineEffect, 
  UnderlineType, 
  UnderlineOptions 
} from 'hover-on-lib';

const options: UnderlineOptions = {
  color: '#4ecdc4',
  thickness: '2px',
  duration: '300ms'
};

const type: UnderlineType = 'slide';
new UnderlineEffect(element, type, options);
```

## 🌐 CDN Usage

```html
<!-- UMD build -->
<script src="https://unpkg.com/hover-on-lib@1.0.0/dist/hover-on.umd.js"></script>

<script>
  // Effects are available on the global HoverOn object
  const { UnderlineEffect, quickInit } = window.HoverOn;
  
  quickInit.navLinks({ color: '#4ecdc4' });
</script>
```

## 📦 What's Included

- ✅ **Framework-agnostic** - Works with vanilla JS, React, Vue, Angular, etc.
- ✅ **TypeScript support** - Full type definitions included
- ✅ **Tree-shakeable** - Import only what you need
- ✅ **Zero dependencies** - Lightweight and fast
- ✅ **Modern CSS** - Uses latest CSS features (backdrop-filter, clip-path, etc.)
- ✅ **Accessible** - Respects user preferences (prefers-reduced-motion)

## 🎨 Customization

All effects accept options for customization:

```javascript
new UnderlineEffect(element, 'slide', {
  color: '#4ecdc4',           // Custom color
  thickness: '3px',           // Custom thickness
  duration: '500ms',          // Custom duration
  timingFunction: 'ease-out'  // Custom easing
});
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © BlueDrop Solutions LLC

## 🔗 Links

- **npm:** https://www.npmjs.com/package/hover-on-lib
- **GitHub:** https://github.com/ap519925/hover-on
- **Issues:** https://github.com/ap519925/hover-on/issues

## 💡 Examples

Check out the `/examples` directory for more detailed usage examples and demos.

---

Made with ❤️ by BlueDrop Solutions LLC
