type SectionLabelProps = {
  children: string
  tone?: 'green' | 'blue' | 'orange' | 'pink'
}

const tones = {
  green: 'bg-emerald-500',
  blue: 'bg-blue-500',
  orange: 'bg-orange',
  pink: 'bg-rose-500',
}

export function SectionLabel({ children, tone = 'orange' }: SectionLabelProps) {
  return (
    <p className="mb-3 flex items-center gap-2 text-[11px] font-medium text-muted">
      <span className={`h-1.5 w-1.5 rounded-full ${tones[tone]}`} />
      {children}
    </p>
  )
}
