# Chabad of North Fulton - New Website

A beautiful, modern website for Chabad of North Fulton built with React, Tailwind CSS, and Framer Motion animations.

## 🚀 Features

- **Modern Design**: Clean, professional design with beautiful animations
- **Responsive**: Fully responsive design that works on all devices
- **Fast Performance**: Optimized for speed and user experience
- **Accessible**: Built with accessibility best practices
- **SEO Friendly**: Proper meta tags and semantic HTML

## 📱 Pages

- **Home**: Hero section, features, stats, and call-to-action
- **About**: Mission, vision, values, timeline, and contact information
- **Gallery**: Photo gallery with filtering and lightbox modal
- **Donate**: Donation page with embed form placeholder
- **Dedications**: Sports complex dedication opportunities

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Smooth animations and transitions
- **React Router**: Client-side routing
- **Lucide React**: Beautiful icons
- **Google Fonts**: Inter and Playfair Display fonts

## 🎨 Design Features

- **Custom Color Palette**: Primary orange theme with secondary grays
- **Typography**: Professional font pairing with proper hierarchy
- **Animations**: Smooth scroll animations and hover effects
- **Components**: Reusable, modular components
- **Responsive Grid**: Flexible layouts for all screen sizes

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chabadnf
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation component
│   └── Footer.js       # Footer component
├── pages/              # Page components
│   ├── Home.js         # Home page
│   ├── About.js        # About page
│   ├── Gallery.js      # Gallery page
│   ├── Donate.js       # Donate page
│   └── Dedications.js  # Dedications page
├── App.js              # Main app component
├── index.js            # Entry point
└── index.css           # Global styles and Tailwind
```

## 🎯 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
- Primary colors: Orange theme (`primary-50` to `primary-900`)
- Secondary colors: Gray theme (`secondary-50` to `secondary-900`)

### Content
- Update text content in each page component
- Replace placeholder images with actual photos
- Add your donation form embed code in `Donate.js`

### Styling
- Modify `src/index.css` for global styles
- Update component-specific styles in each component
- Customize animations in `tailwind.config.js`

## 🔧 Configuration

### Donation Form Integration
To add your donation form:

1. Replace the placeholder in `src/pages/Donate.js` (around line 95)
2. Add your embed code in the designated area
3. Style the form container as needed

### Contact Information
Update contact details in:
- `src/components/Footer.js`
- `src/pages/About.js`
- `src/pages/Donate.js`
- `src/pages/Dedications.js`

### Social Media Links
Update social media links in `src/components/Footer.js`

## 📸 Images

The gallery currently uses placeholder images from Unsplash. Replace with:
- Community event photos
- Facility images
- Program photos
- Staff and member photos

## 🚀 Deployment

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Vercel
1. Import your GitHub repository
2. Vercel will auto-detect React settings
3. Deploy with default settings

### Other Platforms
The build folder contains static files that can be deployed to any web hosting service.

## 📞 Support

For questions or customization requests, contact:
- Email: info@chabadnf.org
- Phone: (555) 123-4567

## 📄 License

This project is created for Chabad of North Fulton. All rights reserved.

---

**Built with ❤️ for the Chabad of North Fulton community** 