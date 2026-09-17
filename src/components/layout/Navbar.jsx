import { useState } from 'react'
import { FaFilm } from 'react-icons/fa'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'

const navigationLinks = [
  { label: 'Home', to: '/' },
  { label: 'Movies', to: '/movies' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const linkClassName = ({ isActive }) =>
    `transition-colors hover:text-white ${
      isActive ? 'text-white' : 'text-slate-400'
    }`

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-lg">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
        aria-label="Main navigation"
      >
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-white"
          onClick={closeMenu}
        >
          <span className="grid size-9 place-items-center rounded-xl bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20">
            <FaFilm aria-hidden="true" />
          </span>
          MovieExplorer
        </NavLink>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navigationLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClassName}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg text-slate-200 transition hover:bg-white/10 md:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? (
            <HiX className="size-6" aria-hidden="true" />
          ) : (
            <HiMenuAlt3 className="size-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-slate-950 px-5 py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-amber-400 text-slate-950'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`
                }
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
