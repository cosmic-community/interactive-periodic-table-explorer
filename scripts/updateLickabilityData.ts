import { createBucketClient } from '@cosmicjs/sdk';
import * as fs from 'fs';
import * as path from 'path';

// CSV data mapping element symbols to lickability ratings
const lickabilityData: Record<string, string> = {
  'H': 'Sure, it\'s probably fine',
  'He': 'Sure, it\'s probably fine',
  'Li': 'Maybe not a good idea',
  'Be': 'You really shouldn\'t',
  'B': 'Sure, it\'s probably fine',
  'C': 'Sure, it\'s probably fine',
  'N': 'Sure, it\'s probably fine',
  'O': 'Sure, it\'s probably fine',
  'F': 'Maybe not a good idea',
  'Ne': 'Sure, it\'s probably fine',
  'Na': 'Maybe not a good idea',
  'Mg': 'Maybe not a good idea',
  'Al': 'Sure, it\'s probably fine',
  'Si': 'Maybe not a good idea',
  'P': 'Maybe not a good idea',
  'S': 'Maybe not a good idea',
  'Cl': 'Maybe not a good idea',
  'Ar': 'Sure, it\'s probably fine',
  'K': 'Sure, it\'s probably fine',
  'Ca': 'Sure, it\'s probably fine',
  'Sc': 'Sure, it\'s probably fine',
  'Ti': 'You really shouldn\'t',
  'V': 'You really shouldn\'t',
  'Cr': 'Sure, it\'s probably fine',
  'Mn': 'Sure, it\'s probably fine',
  'Fe': 'Sure, it\'s probably fine',
  'Co': 'Sure, it\'s probably fine',
  'Ni': 'Sure, it\'s probably fine',
  'Cu': 'Sure, it\'s probably fine',
  'Zn': 'Sure, it\'s probably fine',
  'Ga': 'Sure, it\'s probably fine',
  'Ge': 'Sure, it\'s probably fine',
  'As': 'You really shouldn\'t',
  'Se': 'You really shouldn\'t',
  'Br': 'Sure, it\'s probably fine',
  'Kr': 'Sure, it\'s probably fine',
  'Rb': 'Sure, it\'s probably fine',
  'Sr': 'Sure, it\'s probably fine',
  'Y': 'Sure, it\'s probably fine',
  'Zr': 'Sure, it\'s probably fine',
  'Nb': 'Sure, it\'s probably fine',
  'Mo': 'Sure, it\'s probably fine',
  'Ru': 'Sure, it\'s probably fine',
  'Rh': 'Sure, it\'s probably fine',
  'Pd': 'Sure, it\'s probably fine',
  'Ag': 'Sure, it\'s probably fine',
  'Cd': 'You really shouldn\'t',
  'In': 'Sure, it\'s probably fine',
  'Sn': 'Sure, it\'s probably fine',
  'Sb': 'Sure, it\'s probably fine',
  'Te': 'You really shouldn\'t',
  'I': 'Sure, it\'s probably fine',
  'Xe': 'Sure, it\'s probably fine',
  'Cs': 'Sure, it\'s probably fine',
  'Ba': 'Sure, it\'s probably fine',
  'La': 'Sure, it\'s probably fine',
  'Ce': 'Sure, it\'s probably fine',
  'Pr': 'Sure, it\'s probably fine',
  'Nd': 'Sure, it\'s probably fine',
  'Pm': 'Sure, it\'s probably fine',
  'Sm': 'Sure, it\'s probably fine',
  'Eu': 'Sure, it\'s probably fine',
  'Gd': 'Sure, it\'s probably fine',
  'Tb': 'Sure, it\'s probably fine',
  'Dy': 'Sure, it\'s probably fine',
  'Ho': 'Sure, it\'s probably fine',
  'Er': 'Sure, it\'s probably fine',
  'Tm': 'Sure, it\'s probably fine',
  'Yb': 'Sure, it\'s probably fine',
  'Lu': 'Sure, it\'s probably fine',
  'Hf': 'Sure, it\'s probably fine',
  'Ta': 'Sure, it\'s probably fine',
  'W': 'Sure, it\'s probably fine',
  'Re': 'Sure, it\'s probably fine',
  'Os': 'You really shouldn\'t',
  'Ir': 'Sure, it\'s probably fine',
  'Pt': 'Sure, it\'s probably fine',
  'Au': 'Sure, it\'s probably fine',
  'Hg': 'Sure, it\'s probably fine',
  'Tl': 'You really shouldn\'t',
  'Pb': 'You really shouldn\'t',
  'Bi': 'Sure, it\'s probably fine',
  'Fr': 'Please reconsider',
  'Ra': 'Please reconsider',
  'Ac': 'Please reconsider',
  'Th': 'Please reconsider',
  'Pa': 'Please reconsider',
  'U': 'Please reconsider',
  'Np': 'Please reconsider',
  'Pu': 'Please reconsider',
  'Am': 'Please reconsider',
  'Cm': 'Please reconsider',
  'Bk': 'Please reconsider',
  'Cf': 'Please reconsider',
  'Es': 'Please reconsider',
  'Fm': 'Please reconsider',
  'Md': 'Please reconsider',
  'No': 'Please reconsider',
  'Lr': 'Please reconsider',
  'Rf': 'Please reconsider',
  'Db': 'Please reconsider',
  'Sg': 'Please reconsider',
  'Bh': 'Please reconsider',
  'Hs': 'Please reconsider',
  'Mt': 'Please reconsider',
  'Ds': 'Please reconsider',
  'Rg': 'Please reconsider',
  'Cn': 'Please reconsider',
  'Nh': 'Please reconsider',
  'Fl': 'Please reconsider',
  'Mc': 'Please reconsider',
  'Lv': 'Please reconsider',
  'Ts': 'Please reconsider',
  'Og': 'Please reconsider'
};

// Convert display values to keys for Cosmic
const lickabilityValueToKey: Record<string, string> = {
  'Sure, it\'s probably fine': 'sure_probably_fine',
  'Maybe not a good idea': 'maybe_not_good_idea',
  'You really shouldn\'t': 'you_really_shouldnt',
  'Please reconsider': 'please_reconsider'
};

interface Element {
  id: string;
  slug: string;
  title: string;
  metadata: {
    element_name: string;
    symbol: string;
    atomic_number: number;
    category: any;
    can_i_lick_it?: any;
  };
}

async function updateLickabilityData() {
  // Initialize Cosmic client
  const cosmic = createBucketClient({
    bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
    readKey: process.env.COSMIC_READ_KEY as string,
    writeKey: process.env.COSMIC_WRITE_KEY as string,
    apiEnvironment: "staging"
  });

  try {
    console.log('🔬 Starting lickability data update...');
    
    // Fetch all elements
    console.log('📡 Fetching all elements from Cosmic...');
    const response = await cosmic.objects
      .find({ type: 'elements' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);

    const elements = response.objects as Element[];
    console.log(`✨ Found ${elements.length} elements to update`);

    let updatedCount = 0;
    let skippedCount = 0;

    // Process each element
    for (const element of elements) {
      const symbol = element.metadata.symbol;
      const newLickabilityValue = lickabilityData[symbol];
      
      if (!newLickabilityValue) {
        console.log(`⚠️  No lickability data found for ${symbol} (${element.metadata.element_name})`);
        skippedCount++;
        continue;
      }

      // Convert display value to key
      const newLickabilityKey = lickabilityValueToKey[newLickabilityValue];
      
      if (!newLickabilityKey) {
        console.log(`⚠️  Invalid lickability value for ${symbol}: ${newLickabilityValue}`);
        skippedCount++;
        continue;
      }

      try {
        // Update the element with new lickability data
        console.log(`🔄 Updating ${symbol} (${element.metadata.element_name}) -> "${newLickabilityValue}"`);
        
        await cosmic.objects.updateOne(element.id, {
          metadata: {
            ...element.metadata,
            can_i_lick_it: newLickabilityKey
          }
        });

        updatedCount++;
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (updateError) {
        console.error(`❌ Failed to update ${symbol}:`, updateError);
      }
    }

    console.log('\n🎉 Update complete!');
    console.log(`✅ Successfully updated: ${updatedCount} elements`);
    console.log(`⏭️  Skipped: ${skippedCount} elements`);
    
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the update script
if (require.main === module) {
  updateLickabilityData().then(() => {
    console.log('🏁 Script finished successfully');
    process.exit(0);
  }).catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });
}

export { updateLickabilityData };