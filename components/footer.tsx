import Link from "next/link"

interface FooterProps {
  personalInfo: any
  socials: any[]
}

export function Footer({ personalInfo, socials }: FooterProps) {
  return (
    <footer id="contact" className="px-6 md:px-12 py-24 bg-foreground text-background mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter mb-12">
            Let's work<br />together.
          </h2>
          <div className="flex items-center gap-4 group">
            <Link 
              href={`mailto:${personalInfo.email}`}
              className="inline-block text-2xl md:text-4xl border-b border-background/30 hover:border-background transition-colors pb-2"
            >
              {personalInfo.email}
            </Link>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(personalInfo.email);
                // Optionally show a toast here, but for now we just verify functionality
              }}
              className="p-3 rounded-none border border-background/20 hover:bg-background hover:text-foreground transition-all opacity-0 group-hover:opacity-100"
              aria-label="Copy email"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><rect x="9" y="9" width="13" height="13" rx="0" ry="0"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-t border-background/20 pt-12">
          <div className="text-sm opacity-60">
            &copy; {new Date().getFullYear()} {personalInfo.name} {personalInfo.lastName}.<br />
            All rights reserved.
          </div>
          
          <div className="flex gap-8">
            {socials.map((social: any) => (
              <Link 
                key={social.name}
                href={social.url}
                className="text-lg hover:opacity-70 transition-opacity"
                target="_blank"
              >
                {social.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
