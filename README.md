# Portfolio - Binod Prasad Joshi

> A modern, dynamic portfolio website showcasing cloud engineering expertise, backend development skills, and professional achievements.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-FF0055?style=flat-square)](https://www.framer.com/motion/)

**Live Demo:** https://binodprasadjoshi.com.np/

---

## ✨ Features

### 🎨 **Modern UI/UX**
- **Animated Background**: Interactive particle system with mouse repulsion physics
- **Smooth Scroll Animations**: Sections fade in and slide up as you scroll
- **Glassmorphism Design**: Transparent cards with backdrop blur effects
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)

### 🎯 **Core Sections**
- **Hero Section**: Dynamic introduction with animated background
- **About**: Personal narrative, AWS certifications, and career aspirations
- **Skills**: Interactive orbital visualization of technical skills
- **Experience**: Timeline showcasing professional journey
- **Projects**: Highlighted cloud and backend projects with GitHub links
- **Blog**: Featured articles from [awspathway.com](https://awspathway.com)
- **Certifications**: AWS certifications and achievements
- **Contact**: Professional contact information and links

### 🚀 **Technical Highlights**
- **Static Navbar**: Always visible with active section detection
- **Hover Animations**: Cards with lift effects, border glow, and color themes
- **Performance Optimized**: Built with Next.js 16 for blazing-fast page loads
- **SEO Ready**: Proper meta tags and semantic HTML structure
- **Type Safe**: Fully typed with TypeScript

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16.1 (App Router) |
| **Language** | TypeScript 5.0 |
| **Styling** | Tailwind CSS 4.0 |
| **Animations** | Framer Motion 12.0 |
| **Icons** | Lucide React |
| **Components** | Radix UI primitives |
| **Utilities** | clsx, tailwind-merge, class-variance-authority |

---

## 📦 Installation

### Prerequisites
- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Binod231/Portfolio-Bin.git
   cd Portfolio-Bin
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

---

## 🎯 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on `http://localhost:3000` |
| `npm run build` | Build production-ready app |
| `npm start` | Start production server (after build) |
| `npm run lint` | Run ESLint for code quality |

---

## 📁 Project Structure

```
binod-portfolio/
├── public/                  # Static assets
│   ├── favicon.ico         # Site favicon
│   ├── portfoilo.jpeg      # Profile photo
│   └── icons/              # AWS service icons
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── sections/       # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Blog.tsx
│   │   │   ├── Certifications.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/             # Reusable UI components
│   │       ├── Navbar.tsx
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── SectionWrapper.tsx
│   │       ├── RevealOnScroll.tsx
│   │       ├── GlobeBackground.tsx
│   │       └── ThreeDPhoto.tsx
│   ├── data/
│   │   └── portfolio.ts    # Centralized portfolio data
│   ├── lib/
│   │   └── utils.ts        # Utility functions
│   └── types/
│       └── index.ts        # TypeScript type definitions
├── tailwind.config.ts      # Tailwind configuration
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

---

## ✏️ Customization Guide

### 1. **Update Personal Information**

Edit `src/data/portfolio.ts`:

```typescript
export const portfolio = {
  personal: {
    name: "Your Name",
    role: "Your Role",
    email: "your.email@example.com",
    links: {
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      resume: "https://your-resume-link.com",
    },
    photo: "/your-photo.jpg",
  },
  // ... add your skills, experience, projects, etc.
};
```

### 2. **Modify Colors & Theme**

Edit `src/app/globals.css` to change color scheme:

```css
:root {
  --background: 224 71% 4%;      /* Dark background */
  --foreground: 213 31% 91%;     /* Light text */
  --primary: 217 91% 60%;        /* Blue accent */
  /* ... */
}
```

### 3. **Add New Sections**

Create a new section component in `src/components/sections/`:

```typescript
// src/components/sections/YourSection.tsx
export default function YourSection() {
  return (
    <SectionWrapper id="your-section">
      {/* Your content */}
    </SectionWrapper>
  );
}
```

Add it to `src/app/page.tsx` and `src/components/ui/Navbar.tsx`.

### 4. **Update Blog Posts**

Edit the `blogs` array in `src/data/portfolio.ts`:

```typescript
blogs: [
  {
    title: "Your Blog Title",
    description: "Brief description",
    date: "Month Year",
    tags: ["Tag1", "Tag2"],
    url: "https://yourblog.com/post-slug",
    color: "blue" // or "orange", "emerald"
  },
]
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Click **Deploy**

Vercel will automatically:
- Detect Next.js project
- Install dependencies
- Build and deploy
- Provide a live URL

### Manual Production Build

```bash
npm run build
npm start
```

---

## 🎨 Key Features Breakdown

### Interactive Background
- Physics-based particle system
- Mouse repulsion effect
- Smooth animations using `requestAnimationFrame`

### Section Animations
- Powered by Framer Motion
- Trigger on scroll (every time, not just once)
- Fade in + slide up effect

### Navbar
- Static position (always visible)
- Active section highlighting based on scroll position
- Responsive mobile menu

### Card Designs
- Transparent backgrounds with glassmorphism
- Hover effects: lift, border glow, gradient line
- Color-coded themes (blue, purple, emerald, etc.)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Binod Prasad Joshi**
- AWS Certified Solutions Architect & Developer
- Cloud & Backend Engineer at Karnovation Inc.
- Portfolio: [Coming Soon]
- GitHub: [@Binod231](https://github.com/Binod231)
- LinkedIn: [Binod Prasad Joshi](https://www.linkedin.com/in/binod-prasad-joshi-549067281)

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)
- Hosted on [Vercel](https://vercel.com/)

---

## 📞 Support

If you have any questions or need help customizing this portfolio:
- Open an issue on GitHub
- Email: joshibinodprasad77@gmail.com

---

<div align="center">
  Made with ❤️ by Binod Prasad Joshi
</div>

