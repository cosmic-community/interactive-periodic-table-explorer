# Interactive Periodic Table Explorer

![Periodic Table Preview](https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=300&fit=crop&auto=format)

A beautiful, modern, and interactive periodic table built with Next.js and Cosmic CMS. Explore chemical elements with stunning visual design, detailed information, and smooth animations.

## Features

- 🧪 **Complete Periodic Table**: All 118 chemical elements with accurate data
- 🎨 **Modern Design**: Glass-morphism UI with color-coded element categories
- 📱 **Fully Responsive**: Perfect experience on desktop, tablet, and mobile
- 🔍 **Advanced Search**: Find elements by name, symbol, or atomic number
- 🏷️ **Category Filtering**: Filter by element types (metals, non-metals, noble gases, etc.)
- ℹ️ **Detailed Information**: Comprehensive element data and properties
- ✨ **Smooth Animations**: Engaging hover effects and transitions
- 🎓 **Educational Content**: Perfect for students and chemistry enthusiasts

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=68896c2e2dcc7fbc00c94eb9&clone_repository=688a37862dcc7fbc00c94ee3)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I want to build a beautiful modern looking periodic table"

### Code Generation Prompt

> "I want to build a beautiful modern looking periodic table"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling and responsive design
- **Cosmic CMS** - Headless CMS for content management
- **React** - Component-based UI library
- **CSS Grid** - Advanced layout for periodic table structure

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Cosmic credentials:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching All Elements
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all elements with their properties
const elements = await cosmic.objects
  .find({ type: 'elements' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Elements by Category
```typescript
// Get elements filtered by category
const metals = await cosmic.objects
  .find({ 
    type: 'elements',
    'metadata.category': 'alkali-metals'
  })
  .props(['id', 'title', 'slug', 'metadata'])
```

### Element Search
```typescript
// Search elements by name or symbol
const searchResults = await cosmic.objects
  .find({ 
    type: 'elements',
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { 'metadata.symbol': { $regex: searchTerm, $options: 'i' } }
    ]
  })
```

## Cosmic CMS Integration

This application uses Cosmic CMS to manage all periodic table data. The content model includes:

### Element Object Type
- **Title**: Element name (e.g., "Hydrogen", "Helium")
- **Slug**: URL-friendly identifier
- **Metadata**:
  - `symbol`: Chemical symbol (H, He, Li, etc.)
  - `atomic_number`: Atomic number (1, 2, 3, etc.)
  - `atomic_mass`: Atomic mass
  - `category`: Element category (alkali-metals, noble-gases, etc.)
  - `electron_configuration`: Electron configuration
  - `melting_point`: Melting point in Celsius
  - `boiling_point`: Boiling point in Celsius
  - `density`: Density
  - `discovery_year`: Year of discovery
  - `description`: Educational description
  - `uses`: Common uses and applications
  - `properties`: Additional properties

### Category Object Type
- **Title**: Category name (e.g., "Alkali Metals", "Noble Gases")
- **Slug**: URL-friendly identifier
- **Metadata**:
  - `color`: Display color for the category
  - `description`: Category description

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add your environment variables in Netlify dashboard
4. Set build command: `bun run build`
5. Set publish directory: `.next`
6. Deploy!

### Environment Variables for Production

Make sure to set these environment variables in your hosting platform:

- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

The application will automatically connect to your Cosmic bucket and display your periodic table data.

<!-- README_END -->