export default function SortControls() {
  return (
    <div className='flex gap-1.5'>
      {['Recent', 'Alphabetical'].map((label, i) => (
        <button
          key={label}
          className={`font-mono text-[0.65rem] tracking-widest uppercase px-3 py-1.5 border rounded-sm cursor-pointer transition-all ${
            i === 0
              ? 'bg-ink text-parchment border-ink'
              : 'bg-transparent text-ink-muted border-border hover:text-ink'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
