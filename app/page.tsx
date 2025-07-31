import { cosmic } from '@/lib/cosmic'
import { Element, Category } from '@/types'
import Header from '@/components/Header'
import PeriodicTableContainer from '@/components/PeriodicTableContainer'
import CosmicBadge from '@/components/CosmicBadge'

async function getElements(): Promise<Element[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'elements' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return objects || []
  } catch (error) {
    // Type-safe error handling - check if error has status property
    if (error && typeof error === 'object' && 'status' in error && (error as any).status === 404) {
      return []
    }
    throw error
  }
}

async function getCategories(): Promise<Category[]> {
  // Return empty array as categories are handled by the element's category metafield
  return []
}

export default async function Home() {
  const [elements, categories] = await Promise.all([
    getElements(),
    getCategories()
  ])

  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <div className="main-layout no-scroll">
      <Header />
      
      <main className="content-area">
        <PeriodicTableContainer 
          elements={elements} 
          categories={categories}
        />
      </main>
      
      <CosmicBadge bucketSlug={bucketSlug} />
    </div>
  )
}