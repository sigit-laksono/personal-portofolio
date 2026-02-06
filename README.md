# Professional Portfolio - Muhammad Sigit Laksono

Modern, performant, and accessible professional portfolio website built with Bootstrap 5 and vanilla JavaScript. Fully static site optimized for AWS Amplify hosting.

## 🚀 Features

- **Modern Design**: Clean, professional layout with Bootstrap 5
- **Vanilla JavaScript**: No jQuery dependencies for better performance
- **Responsive**: Mobile-first design that works on all devices
- **Accessible**: WCAG compliant with ARIA labels and keyboard navigation
- **Performant**: Optimized images, lazy loading, and minified assets
- **SEO Optimized**: Proper meta tags, Open Graph, and structured data
- **Static Site**: Pure HTML/CSS/JS for easy deployment

## 📋 Sections

- **About**: Professional summary and introduction
- **Experience**: Work history with detailed descriptions
- **Education**: Academic background
- **Skills**: Technical skills organized by category
- **Projects**: Portfolio showcase with 3 featured projects
- **Community**: Community involvement and training activities
- **Certifications**: Professional certifications and achievements

## 🛠️ Tech Stack

### Core Technologies
- HTML5 (Semantic markup)
- CSS3 with SCSS preprocessor
- Vanilla JavaScript (ES6+)
- Bootstrap 5.3.0

### Build Tools
- Gulp 4.0 (Task runner)
- Sass (CSS preprocessor)
- npm scripts

### Third-Party Libraries
- Font Awesome 6.4.0 (Icons)
- Devicons (Technology icons)
- Simple Line Icons
- Google Fonts (Saira Extra Condensed, Open Sans)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-portofolio
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## 🔧 Development

### Available Scripts

- `npm run build` - Build CSS and JavaScript (production)
- `npm run build:full` - Build with image optimization
- `npm run build:images` - Generate responsive images and optimize
- `npm run dev` - Start development server with live reload
- `npm run sass` - Compile SCSS to CSS
- `npm run watch` - Watch for file changes
- `npm run serve` - Serve with BrowserSync

### Development Workflow

1. Start development server:
```bash
npm run dev
```

2. Edit files in:
   - `scss/` - SCSS source files
   - `js/` - JavaScript source files
   - `index.html` - Main HTML file

3. Build for production:
```bash
npm run build
```

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── resume.css          # Compiled CSS
│   └── resume.min.css      # Minified CSS (production)
├── scss/
│   ├── resume.scss         # Main SCSS entry point
│   ├── _variables.scss     # CSS variables and theme
│   ├── _mixins.scss        # SCSS mixins
│   ├── _global.scss        # Global styles
│   ├── _components.scss    # Component styles
│   ├── _sections.scss      # Section-specific styles
│   ├── _nav.scss           # Navigation styles
│   ├── _projects.scss      # Projects section styles
│   └── _bootstrap-overrides.scss  # Bootstrap customization
├── js/
│   ├── navigation.js       # Navigation module
│   ├── lazy-loading.js     # Image lazy loading
│   ├── resume.js           # Main initialization
│   └── *.min.js            # Minified versions (production)
├── img/
│   ├── profile.*           # Profile images (WebP + JPG)
│   └── projects/           # Project screenshots
├── Docs/                   # Documentation files
├── scripts/                # Build scripts
├── vendor/                 # Third-party libraries
├── gulpfile.js             # Gulp configuration
└── package.json            # Project dependencies
```

## 🎨 Customization

### Colors and Theme

Edit `scss/_variables.scss` to customize colors, fonts, and spacing:

```scss
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --text-color: #212529;
  // ... more variables
}
```

### Content

Edit `index.html` to update:
- Personal information
- Work experience
- Education
- Skills
- Projects
- Certifications

### Projects

Add new projects in the Projects section:
1. Add project images to `img/projects/`
2. Update HTML in the Projects section
3. Follow the existing project card structure

## 🚀 Deployment

### AWS Amplify

1. Connect your repository to AWS Amplify
2. Use the provided `amplify.yml` configuration
3. Deploy automatically on push

### Build Settings

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: /
    files:
      - '**/*'
```

### Static Hosting

The site is fully static and can be hosted on:
- AWS Amplify
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## ⚡ Performance

- Lighthouse Performance Score: >90
- Page Load Time: <3 seconds
- Optimized images with WebP format
- Lazy loading for below-fold images
- Minified CSS and JavaScript
- CDN for third-party libraries

## ♿ Accessibility

- WCAG 2.1 Level AA compliant
- ARIA labels on all interactive elements
- Keyboard navigation support
- Skip-to-content link
- Proper heading hierarchy
- Alt text on all images
- Focus indicators

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is licensed under the MIT License.

Original template by [Start Bootstrap](https://startbootstrap.com/template-overviews/resume/)
Refactored and enhanced by Muhammad Sigit Laksono

## 🙏 Acknowledgments

- Original template: [Start Bootstrap - Resume](https://startbootstrap.com/template-overviews/resume/)
- Bootstrap framework
- Font Awesome icons
- Google Fonts

## 📞 Contact

Muhammad Sigit Laksono
- Email: sigitlaksono926@gmail.com
- LinkedIn: [m-sigitlaksono](https://www.linkedin.com/in/m-sigitlaksono/)
- GitHub: [M-Sigit](https://github.com/M-Sigit)

---

**Note**: This portfolio has been completely refactored from Bootstrap 4 + jQuery to Bootstrap 5 + vanilla JavaScript with enhanced performance, accessibility, and modern best practices.
