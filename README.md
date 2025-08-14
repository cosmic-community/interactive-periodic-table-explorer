# Interactive Periodic Table Explorer

An interactive periodic table application powered by Cosmic CMS that lets you explore chemical elements and test your knowledge with the fun "Can I Lick It?" game mode.

## Features

- 🧪 **Interactive Periodic Table**: Click on any element to view detailed information
- 🎮 **"Can I Lick It?" Game**: Test your knowledge of element safety in a fun guessing game
- 🏆 **Achievement System**: Unlock achievements as you play and learn
- 🔍 **Search & Filter**: Find elements by name, symbol, or category
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🎯 **Educational Content**: Learn about atomic properties, categories, and safety information

## Game Modes

### Explore Mode
Browse the periodic table freely, view element details, and see safety ratings for each element.

### Guess Mode  
Test your chemistry knowledge! Guess whether elements are safe to lick based on their properties. Earn points for correct guesses and unlock achievements.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Content Management**: Cosmic CMS
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- A Cosmic CMS account and bucket

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd interactive-periodic-table-explorer
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local` file with your Cosmic CMS credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key  
COSMIC_WRITE_KEY=your-write-key
```

5. Run the development server:
```bash
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Data Management

### Updating Element Lickability Data

To update the "Can I Lick It" classifications for all elements using CSV data:

1. Ensure your environment variables are set up correctly
2. Run the update script:
```bash
bun run update-lickability
```

This script will:
- Fetch all elements from your Cosmic CMS
- Update each element's lickability rating based on the predefined CSV data
- Provide progress updates and error handling
- Skip elements that don't have corresponding data

### Content Structure

The app uses the following Cosmic CMS Object Types:

#### Elements Object Type
- **Slug**: `elements`
- **Fields**:
  - Element Name (text)
  - Symbol (text, max 3 characters)  
  - Atomic Number (number)
  - Category (select dropdown)
  - Can I Lick It (select dropdown)

#### Categories
Elements are classified into standard periodic table categories:
- Reactive nonmetal
- Noble gas  
- Alkali metal
- Alkaline earth metal
- Metalloid
- Halogen
- Post-transition metal
- Transition metal
- Lanthanide
- Actinide
- And predicted categories for synthetic elements

#### Lickability Ratings
- 🟢 **"Sure, it's probably fine"** - Generally safe elements
- 🟡 **"Maybe not a good idea"** - Proceed with caution
- 🟠 **"You really shouldn't"** - Definitely not recommended  
- 🔴 **"Please reconsider"** - Absolutely do not attempt

## Game Features

### Scoring System
- Base points for correct guesses
- Streak multipliers (up to 3x for 25+ streaks)
- Bonus points for difficult elements

### Achievements
Unlock various achievements like:
- 🎯 First Guess
- 🔥 Hot Streak (5 consecutive)  
- ⚡ Lightning Round (10 consecutive)
- 🧪 Chemistry Master (25 consecutive)
- 💎 Precious Metals Expert
- 🛡️ Safety First
- And many more!

## Development

### Project Structure
```
/app                 # Next.js app directory
/components          # React components
/hooks              # Custom React hooks  
/lib                # Utility functions and API clients
/scripts            # Data management scripts
/types.ts           # TypeScript type definitions
```

### Key Components
- `PeriodicTable`: Main periodic table grid layout
- `ElementCard`: Individual element display cards  
- `ElementModal`: Detailed element information popup
- `LickGuessModal`: Game mode guessing interface
- `GameStats`: Score tracking and achievement display

### Scripts
- `bun dev` - Start development server
- `bun build` - Build for production
- `bun type-check` - Run TypeScript checks
- `bun update-lickability` - Update element safety data

## Safety Disclaimer

⚠️ **Important**: This is an educational application for entertainment purposes only. DO NOT actually attempt to lick any chemical elements. Always follow proper laboratory safety protocols when handling chemicals.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`) 
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Educational data sourced from various chemistry references
- Built with [Cosmic CMS](https://cosmicjs.com) for content management
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Powered by [Next.js](https://nextjs.org)