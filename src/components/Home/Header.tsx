import logo from '../../assets/png/zyra-logo.png'

const navItems = [
  { label: 'Home', href: '#top' },
  { label: 'Work', href: '#works' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  return (
    <header className="flex w-full justify-center px-4 py-4 sm:py-5">
      <div className="flex max-w-full items-center gap-4 rounded-full border border-black/10 bg-white px-5 py-2 shadow-[0_18px_45px_rgba(14,13,12,0.14)] sm:gap-7">
        <a href="#top" className="flex font-bold items-center gap-2 whitespace-nowrap text-[15px]  tracking-[-0.03em] text-black">
          <img src={logo} alt="" className="h-5 w-5 object-contain" aria-hidden="true" />
          ZYRA
        </a>

        <span className="hidden h-7 w-px bg-black/10 sm:block" aria-hidden="true" />

        <nav className="hidden items-center gap-8 text-[15px] font-medium text-[#1d1d1d] sm:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-orange">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="whitespace-nowrap rounded-full bg-[#111111] px-5 py-3 text-[15px] font-medium text-white transition hover:bg-orange hover:text-black"
        >
          Book a Call ↗
        </a>
      </div>
    </header>
  )
}
