import { LickabilityBadgeProps, LICKABILITY_OPTIONS } from '@/types';

export default function LickabilityBadge({ 
  rating, 
  size = 'md', 
  showText = true 
}: LickabilityBadgeProps) {
  const lickabilityInfo = LICKABILITY_OPTIONS[rating] || {
    value: 'Unknown',
    color: '#6b7280',
    emoji: '❓',
    description: 'Safety information not available'
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  return (
    <div 
      className={`inline-flex items-center gap-1 rounded-full text-white font-medium ${sizeClasses[size]}`}
      style={{ backgroundColor: lickabilityInfo.color }}
      title={lickabilityInfo.description}
    >
      <span>{lickabilityInfo.emoji}</span>
      {showText && (
        <span className="whitespace-nowrap">
          {lickabilityInfo.value}
        </span>
      )}
    </div>
  );
}