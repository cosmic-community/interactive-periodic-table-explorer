export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Interactive Periodic Table Explorer
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-2">
            Discover the Elements of the Universe
          </p>
          <p className="text-white/80 max-w-2xl mx-auto">
            Explore all 118 elements with detailed information, interactive filtering, and beautiful visualizations. 
            Click on any element to learn more about its properties, uses, and history.
          </p>
        </div>
      </div>
    </header>
  )
}