# Can You Lick It? - Interactive Periodic Table Game

![Periodic Table Preview](https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=2000&auto=format,compress)

A hilarious and educational game built with Next.js and Cosmic CMS where you guess which chemical elements are safe to lick and which ones would probably kill you. Learn chemistry through comedy while exploring all 118 elements!

## 🎮 Game Features

- 🎯 **Lickability Guessing Game**: Test your knowledge of elemental safety
- 📊 **Score Tracking**: Keep track of correct guesses and streaks  
- 🏆 **Achievement System**: Unlock achievements for consecutive correct guesses
- 😂 **Comedic Safety Ratings**: From "Sure, probably fine" to "Please reconsider"
- 🧪 **Educational**: Learn why elements are safe or dangerous through humor
- 📱 **Fully Responsive**: Perfect experience on all devices
- ✨ **Beautiful Design**: Glass-morphism UI with smooth animations

## 🎲 How to Play

1. **Click any element** on the periodic table
2. **Make your guess**: Is it safe to lick or not?
3. **See the answer**: Learn the actual safety rating with fun explanations
4. **Build your streak**: Get consecutive answers right for higher scores
5. **Unlock achievements**: Master the art of elemental lickability assessment

## 🏅 Safety Categories

- **🟢 Sure, probably fine**: Generally safe elements (like carbon in graphite)
- **🟡 Maybe not a good idea**: Proceed with caution 
- **🟠 You really shouldn't**: Definitely not recommended
- **🔴 Please reconsider**: Absolutely do not attempt (like plutonium!)

## Clone this Bucket and Code Repository

Want to create your own version of this hilarious chemistry game? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=68896c2e2dcc7fbc00c94eb9&clone_repository=688a37862dcc7fbc00c94ee3)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Original Content Model Prompt

> "I want to build a beautiful modern looking periodic table"

### Game Transformation Prompt

> "I want to turn this into a fun game of can you lick the element or not, where you have to guess which elements would be safe to consume and which would not be great or probably kill you. Do you think you can update this site into that more comedical fun game of a site while still keeping it looking good and informative?"

The app combines serious chemistry education with humor to make learning about elements memorable and entertaining.

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

## Cosmic CMS Integration

This application uses Cosmic CMS to manage all periodic table data and lickability assessments. The content model includes:

### Element Object Type
- **Title**: Element name (e.g., "Hydrogen", "Plutonium")
- **Slug**: URL-friendly identifier
- **Metadata**:
  - `element_name`: Full element name
  - `symbol`: Chemical symbol (H, Pu, etc.)
  - `atomic_number`: Atomic number (1, 94, etc.)
  - `category`: Element category (alkali-metals, actinides, etc.)
  - `can_i_lick_it`: Safety assessment with options:
    - "Sure, it's probably fine"
    - "Maybe not a good idea"  
    - "You really shouldn't"
    - "Please reconsider"

## Game Mechanics

### Scoring System
- **Correct Guess**: +10 points
- **Streak Bonus**: +5 additional points per consecutive correct answer
- **Wrong Guess**: Streak resets to 0

### Achievements
- **🔥 Hot Streak**: 5 consecutive correct guesses
- **⚡ Lightning Round**: 10 consecutive correct guesses  
- **🧪 Chemistry Master**: 25 consecutive correct guesses
- **☢️ Nuclear Physicist**: Correctly guess all actinides
- **💎 Precious Metals Expert**: Correctly guess all transition metals

## Educational Value

While the game is humorous, it teaches real chemistry concepts:

- **Elemental Properties**: Learn why certain elements are toxic or safe
- **Chemical Reactivity**: Understand how elements interact with biological systems
- **Atomic Structure**: Connect atomic number to chemical behavior
- **Safety Awareness**: Real-world laboratory and handling safety

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

## Contributing

This project is designed to be both educational and entertaining. If you have ideas for:

- New achievement types
- Funny element descriptions
- Additional game modes
- UI improvements

Feel free to contribute!

## Safety Disclaimer

⚠️ **Important**: This is an educational game for entertainment purposes only. DO NOT actually attempt to lick any chemical elements, especially metals, radioactive materials, or toxic substances. Always follow proper laboratory safety protocols when handling chemicals.

The "lickability" ratings are for educational and comedic purposes and should not be considered actual safety advice for chemical handling.

## License

This project is open source and available under the MIT License.

---

**Remember**: Just because the game says an element is "probably fine" to lick doesn't mean you should actually try it! Stay safe and enjoy learning chemistry through humor! 🧪😄

<!-- README_END -->