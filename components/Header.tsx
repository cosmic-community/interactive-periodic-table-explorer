export default function Header() {
  return (
    <header className="text-center py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow-lg">
          Interactive Periodic Table
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto text-shadow">
          Explore the beauty of chemistry with our modern, interactive periodic table. 
          Click on any element to discover its properties and fascinating details.
        </p>
      </div>
    </header>
  )
}