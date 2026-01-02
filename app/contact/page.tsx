"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import type { PortfolioData } from "@/types/portfolio"

export default function ContactPage() {
  const [data, setData] = useState<PortfolioData | null>(null)
  
  // Implicitly using locale context if needed, but Footer handles most contact info
  const { locale } = useLanguage()

  useEffect(() => {
    fetch("/api/portfolio").then(res => res.json()).then(setData)
  }, [])

  if (!data) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between">
      <Header />
       <div className="flex-1 flex flex-col items-center justify-center gap-12 py-24">
         
         <div className="text-center space-y-6 max-w-2xl px-6">
           <h1 className="text-4xl md:text-5xl font-medium">
             {locale === 'en' ? "Let's work together" : "Vamos trabalhar juntos"}
           </h1>
           <p className="text-xl text-muted-foreground">
             {locale === 'en' 
               ? "Have a project in mind? Let's discuss how we can help your business grow."
               : "Tem um projeto em mente? Vamos discutir como podemos ajudar seu negócio a crescer."}
           </p>
         </div>

         <div className="flex flex-col items-center gap-8">
            <a 
              href="https://wa.me/5541995034442" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-foreground text-background text-lg font-medium rounded-full hover:bg-foreground/90 transition-colors"
            >
              {locale === 'en' ? "Chat on WhatsApp" : "Conversar no WhatsApp"}
            </a>

            <div className="flex gap-8">
               {data.socials.map((social) => (
                 <a 
                   key={social.name}
                   href={social.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-foreground transition-colors text-lg"
                 >
                   {social.name}
                 </a>
               ))}
            </div>
         </div>
       </div>
       <Footer personalInfo={data.personalInfo} socials={data.socials} />
    </main>
  )
}
