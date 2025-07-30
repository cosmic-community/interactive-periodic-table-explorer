import { getElementsForPeriodicTable, getAllCategories } from '@/lib/cosmic'
import PeriodicTableContainer from '@/components/PeriodicTableContainer'
import Header from '@/components/Header'

export default async function HomePage() {
  const [elements, categories] = await Promise.all([
    getElementsForPeriodicTable(),
    getAllCategories()
  ])

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <PeriodicTableContainer 
          elements={elements}
          categories={categories}
        />
      </div>
    </main>
  )
}