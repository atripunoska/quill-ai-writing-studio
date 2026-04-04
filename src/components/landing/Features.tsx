import { LANDING_FEATURES } from '@/lib/constants';

export default function Features() {
  return (
    <div className='landing-features'>
      {LANDING_FEATURES.map((feature) => (
        <div key={feature.title} className='feature-card'>
          <div className='w-10 h-10 border border-border rounded-lg flex items-center justify-center mb-5 text-lg'>
            {feature.icon}
          </div>
          <h3 className='font-serif text-xl font-medium mb-2'>
            {feature.title}
          </h3>
          <p className='text-sm leading-relaxed text-ink-muted'>
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
