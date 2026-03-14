# Taller Crecer Jugando

Sitio web de terapia gestalt, constelaciones familiares y Rolfing. Construido con Astro.

## Páginas

- `/` - Inicio (hero, servicios, about)
- `/about` - Sobre nosotros (Patricia Medina Alonso, trayectoria, Rolfing)
- `/contact` - Página de contacto
- `/galeria` - Galería de imágenes
- `/privacy` - Política de privacidad

## Estructura

```
src/
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Layout.astro
│   └── ContactModal.astro
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── contact.astro
│   ├── galeria.astro
│   └── privacy.astro
├── css/
│   └── style.css
└── js/
    └── main.js
```

## Colores (CSS Variables)

```css
--primary-color: #6a8fa0
--secondary-color: #d3c7a5
--accent-color: #9db4b8
--light-color: #f8f5f1
--dark-color: #2c3e50
```

## Imágenes

Las imágenes del sitio están en `public/images/`:
- `terapia-gestalt-logo.png` - Logo del header
- `gestalt.png`, `constelaciones.png`, `rolfing.png` - Imágenes de servicios
- `pm3.jpg` - Patricia Medina Alonso
- `taller.jpg` - Foto de Ida Rolf

## Formularios

- **Modal de contacto**: Se abre desde el botón "Reservar Turno" en el header
- **Página de contacto**: `/contact`

Los formularios usan Formspree (`https://formspree.io/f/mwvrvbep`) y envian sin redirigir.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Los archivos generados van en `dist/`.
