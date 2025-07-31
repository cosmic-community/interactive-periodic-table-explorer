export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            Interactive Periodic Table Explorer
          </h1>
          <p className="text-sm md:text-base text-white/80">
            Discover the Elements • Click any element to explore
          </p>
        </div>
      </div>
    </header>
  )
}