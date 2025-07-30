import { getElementsForPeriodicTable } from '@/lib/cosmic'
import PeriodicTableContainer from '@/components/PeriodicTableContainer'
import Header from '@/components/Header'

export default async function HomePage() {
  const elements = await getElementsForPeriodicTable()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <PeriodicTableContainer 
          elements={elements}
          categories={[]} // We'll use hardcoded categories from the metadata
        />
      </div>
    </main>
  )
}