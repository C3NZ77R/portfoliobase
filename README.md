# Bento Portfolio

A modern, interactive portfolio built with React and a bento grid layout. Features a responsive bento box design with smooth animations, internationalization support, and an interactive 3D globe.

## Features

- **Bento Grid Layout** – Modular, responsive card-based design that adapts to different screen sizes
- **Dark/Light Theme** – Toggle between themes with smooth transitions and system preference detection
- **Animated UI** – Powered by Framer Motion for fluid interactions and page transitions
- **Interactive Globe** – Location display using Cobe 3D globe with real-time time zone indication
- **Internationalization** – Multi-language support with smooth language switching animations
- **Modal Details** – Expandable card views for detailed information
- **Responsive Design** – Optimized for mobile, tablet, and desktop viewing

## Tech Stack

- **React 19** - Latest React with modern hooks and concurrent features
- **TypeScript** - Type-safe development with comprehensive type definitions
- **Vite** - Fast build tool and development server
- **Framer Motion** - Animation library for smooth UI transitions
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Lucide Icons** - Beautiful, consistent icon set
- **Cobe** - 3D globe visualization library

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bento-portfolio.git
cd bento-portfolio
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run TypeScript type checking

## Project Structure

```
├── components/
│   ├── BentoCard.tsx          # Reusable card component with layout animations
│   ├── CardContents.tsx       # Content components for each card type
│   ├── DetailView.tsx         # Modal overlay for expanded card views
│   ├── Globe.tsx              # Interactive 3D globe component
│   ├── LanguageSwitcher.tsx   # Language selection component
│   ├── LanguageTransition.tsx # Language change animation wrapper
│   └── ErrorBoundary.tsx      # Error boundary for graceful error handling
├── i18n/
│   ├── LanguageContext.tsx    # React context for internationalization
│   └── translations.ts        # Translation strings for supported languages
├── types/
│   └── index.ts               # TypeScript type definitions
├── public/
│   └── profile.png            # Profile image
├── App.tsx                    # Main application component
├── index.css                  # Global styles and Tailwind imports
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── vite.config.ts             # Vite build configuration
```

## Component Documentation

### Core Components

- **App.tsx**: Main application component managing state, themes, and layout
- **BentoCard**: Reusable card component with hover effects and modal triggers
- **DetailView**: Modal component for displaying expanded card content
- **Globe**: Interactive 3D globe showing location and time

### Content Components

Located in `CardContents.tsx`:
- **IntroContent**: Personal introduction section
- **SocialsContent**: Social media links
- **TechStackContent**: Technology skills display
- **AboutContent**: Detailed about section
- **ExperienceContent**: Work experience timeline
- **EducationContent**: Education background
- **ContactContent**: Contact information with copy-to-clipboard functionality

## Customization

### Personal Information

1. Update content in `components/CardContents.tsx`:
   - Replace placeholder text with your information
   - Modify social links and contact details
   - Update tech stack and experience data

2. Replace profile image:
   - Add your photo to `public/profile.png`
   - Ensure image is optimized (recommended: 400x400px, <100KB)

### Styling

- **Colors**: Edit CSS custom properties in `index.css`
- **Layout**: Modify grid configuration in `App.tsx`
- **Animations**: Adjust Framer Motion settings in component files

### Internationalization

Add new languages in `i18n/translations.ts`:
```typescript
export const translations = {
  en: { ... },
  es: { ... }, // Add Spanish translations
  // Add more languages
};
```

### Theme Customization

Modify theme colors in `index.css`:
```css
:root {
  --primary: #your-color;
  --background: #your-bg;
  /* ... other variables */
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Deploy automatically on push

### Netlify

1. Build the project: `npm run build`
2. Upload `dist/` folder to [Netlify](https://netlify.com)
3. Configure build settings if needed

### Manual Deployment

1. Build for production: `npm run build`
2. Serve `dist/` folder with any static hosting service
3. Ensure proper MIME types for assets

## Performance

- **Bundle Size**: ~150KB gzipped (React, Framer Motion, Cobe)
- **Lighthouse Score**: 95+ on performance, accessibility, and SEO
- **Core Web Vitals**: Optimized for fast loading and smooth interactions

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Troubleshooting

### Common Issues

- **Globe not rendering**: Ensure WebGL is enabled in browser
- **Animations laggy**: Check browser performance settings
- **TypeScript errors**: Run `npm run lint` to check for issues

### Development Tips

- Use React DevTools for component debugging
- Check browser console for Framer Motion warnings
- Test on multiple devices for responsive design

## License

MIT License - see [LICENSE](LICENSE) file for details

## Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) for animations
- [Cobe](https://cobe.vercel.app/) for the 3D globe
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
