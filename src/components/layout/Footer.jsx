import { FaFilm, FaGithub } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2 font-semibold text-slate-200">
          <FaFilm className="text-amber-400" aria-hidden="true" />
          MovieExplorer
        </div>
        <p>© 2026 MovieExplorer</p>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 self-start transition hover:text-white sm:self-auto"
          aria-label="MovieExplorer on GitHub"
        >
          <FaGithub className="size-4" aria-hidden="true" />
          GitHub
        </a>
      </div>
    </footer>
  )
}

export default Footer
