export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Can You Lick It? 🧪👅
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-2">
            The Ultimate Elemental Safety Guessing Game
          </p>
          <p className="text-white/80 max-w-2xl mx-auto">
            Test your chemistry knowledge by guessing which elements are safe to lick and which ones would probably kill you. 
            Learn about all 118 elements through humor, science, and questionable life choices!
          </p>
        </div>
      </div>
    </header>
  );
}