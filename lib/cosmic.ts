import { createBucketClient } from '@cosmicjs/sdk';
import { Element, Category, CosmicResponse, ElementCategory } from '@/types';

// Initialize Cosmic client
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Error handling helper
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all elements from Cosmic
export async function getAllElements(): Promise<Element[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'elements' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Element[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching elements:', error);
    throw new Error('Failed to fetch elements');
  }
}

// Fetch elements by category
export async function getElementsByCategory(category: ElementCategory): Promise<Element[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'elements',
        'metadata.category': category
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Element[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching elements by category:', error);
    throw new Error('Failed to fetch elements by category');
  }
}

// Search elements by name or symbol
export async function searchElements(searchTerm: string): Promise<Element[]> {
  if (!searchTerm.trim()) {
    return getAllElements();
  }

  try {
    const response = await cosmic.objects
      .find({ 
        type: 'elements',
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { 'metadata.symbol': { $regex: searchTerm, $options: 'i' } }
        ]
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Element[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error searching elements:', error);
    throw new Error('Failed to search elements');
  }
}

// Fetch single element by slug
export async function getElementBySlug(slug: string): Promise<Element | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'elements',
        slug
      })
      .depth(1);
    
    const element = response.object as Element;
    
    if (!element || !element.metadata) {
      return null;
    }
    
    return element;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching element:', error);
    throw new Error('Failed to fetch element');
  }
}

// Fetch all categories
export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

// Get elements sorted by atomic number for proper periodic table display
export async function getElementsForPeriodicTable(): Promise<Element[]> {
  try {
    const elements = await getAllElements();
    
    // Sort by atomic number for proper periodic table order
    return elements.sort((a, b) => {
      const atomicNumberA = a.metadata.atomic_number || 0;
      const atomicNumberB = b.metadata.atomic_number || 0;
      return atomicNumberA - atomicNumberB;
    });
  } catch (error) {
    console.error('Error fetching elements for periodic table:', error);
    throw new Error('Failed to fetch periodic table data');
  }
}

// Get bucket slug for client-side components
export async function getBucketSlug(): Promise<string> {
  return process.env.COSMIC_BUCKET_SLUG as string;
}