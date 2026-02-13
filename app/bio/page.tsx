"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import type { PortfolioData } from "@/types/portfolio"

const EDITORIAL_EASE = [0.16, 1, 0.3, 1] as const
const DURATION_BASE = 0.7

function Reveal({
  children,
  delay = 0,
  y = 40,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION_BASE, delay, ease: EDITORIAL_EASE }}
    >
      {children}
    </motion.div>
  )
}

function BioPhoto({ src, alt, maxHeight = "500px" }: { src: string; alt: string; maxHeight?: string }) {
  return (
    <Reveal y={30}>
      <div className="mb-10 overflow-hidden border border-border">
        <img src={src} alt={alt} className="w-full h-auto object-cover" style={{ maxHeight }} />
      </div>
    </Reveal>
  )
}

function BioText({ children }: { children: React.ReactNode }) {
  return (
    <Reveal y={20}>
      <p
        className="mb-8"
        style={{
          fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)",
          fontSize: "1.05rem",
          lineHeight: 1.8,
        }}
      >
        {children}
      </p>
    </Reveal>
  )
}

export default function BioPage() {
  const { locale } = useLanguage()
  const [data, setData] = useState<PortfolioData | null>(null)

  useEffect(() => {
    fetch("/api/portfolio").then(res => res.json()).then(setData)
  }, [])

  if (!data) return null

  const { personalInfo, socials } = data

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="pt-32 md:pt-40 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION_BASE, delay: 0.2, ease: EDITORIAL_EASE }}
        >
          <h1
            className="text-[3rem] md:text-[4.5rem] lg:text-[6rem] leading-[0.95] mb-6"
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
            }}
          >
            Bio
          </h1>
          <div className="mb-16" style={{ height: "1px", backgroundColor: "var(--editorial-border, hsl(var(--border)))" }} />
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-8 md:col-start-3">

            <BioText>
              {locale === "en"
                ? "I'm 25 years old and I still haven't gotten used to hearing people call me by my first name. Hearing \"Hey, João\" or worse, \"João Vitor\" feels strange to me. That's because my last name is Moitinho, and it's just more convenient to go by that since there are so many Joãos out there. At the agency where I worked alone, there were four of us. The João who arrived first got to keep the first name. The rest of us were simply Moitinho, Guilherme, and Eduardo."
                : "Tenho 25 anos e ainda não me acostumei a ouvir as pessoas me chamarem pelo nome. Ouvir \"E aí, João\" ou pior, \"João Vitor\" me causa uma estranheza. Isso porque meu sobrenome é Moitinho, e acaba sendo mais conveniente ser chamado assim, já que existem muitos Joãos por aí. Só na agência em que trabalhei, éramos quatro. O João que chegou primeiro levava a alcunha de ser chamado pelo nome. Nós, os outros três, éramos apenas Moitinho, Guilherme e Eduardo."}
            </BioText>

            <BioText>
              {locale === "en"
                ? "I love looking up at the sky at night. Lately, I've been spending good minutes with my dad spotting Starlink satellites. He gets happy when he sees one and lets me know. Sweet."
                : "Gosto muito de olhar pro céu à noite. Tenho dedicado bons minutos com meu pai para observar os satélites da Starlink. Ele fica feliz quando avista um e me avisa. Fofo."}
            </BioText>

            <BioPhoto
              src="/bio-sky.jpg"
              alt={locale === "en" ? "Looking at the night sky" : "Olhando o céu à noite"}
            />

            <BioText>
              {locale === "en"
                ? "I dedicated this space to talk about analog things, away from technology. To express myself and encourage myself to live good moments with my parents, siblings, and friends — and to have done all of that far from this screen where I write this, and where you read it too."
                : "Dediquei esse espaço para falar de coisas analógicas, sem tecnologia. Para poder expressar e me encorajar a viver momentos legais com meus pais, irmãos e amigos e poder ter feito isso longe desse ambiente onde eu escrevo isso, e onde você também lê."}
            </BioText>

            <BioText>
              {locale === "en"
                ? "Don't mistake this desire for discouragement with my profession. I love what I do, but precisely because everything I mentioned above is my purpose. Without it, I wouldn't love anything at all."
                : "Não confunda esse desejo com desânimo pela minha profissão. Eu amo o que faço, mas justamente porque tenho tudo que disse acima como propósito. Sem isso, eu não amaria nada."}
            </BioText>

            <BioText>
              {locale === "en"
                ? "I'm very analytical, but also sentimental. I try to combine reason and emotion. My engineer side makes decisions based on optimization, performance, efficiency, and output. My emotional side can be the complete opposite of that."
                : "Sou muito analítico, mas também sentimental. Tento combinar razão e emoção. Meu lado engenheiro toma decisões baseadas em otimização, performance, economia e rendimento. Já o lado emotivo pode ser totalmente o contrário disso."}
            </BioText>

            <BioText>
              {locale === "en"
                ? "I carry my passions close to my chest — sometimes when she asks for affection and lies on top of me, and sometimes when she wants to play fetch and jumps up with her paws on my chest. Those are, respectively, Lola (11 years old) and Ágata (1.5 years old). And now with the presence of Frederico (2 months old). I love you all."
                : "Levo minhas paixões no peito às vezes quando pede carinho e deita em cima de mim, e às vezes quando quer brincar de bolinha e pula alto com as patas no meu peito. Essas são, respectivamente, Lola (11 anos) e Ágata (1,5 anos). E agora com a presença do Frederico (2 meses). Eu amo vocês."}
            </BioText>

            {/* Dogs photos side by side */}
            <Reveal y={30}>
              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="overflow-hidden border border-border">
                  <img src="/bio-lola.jpg" alt="Lola" className="w-full h-full object-cover" style={{ aspectRatio: "1/1" }} />
                </div>
                <div className="overflow-hidden border border-border">
                  <img src="/bio-agata.jpg" alt="Ágata" className="w-full h-full object-cover" style={{ aspectRatio: "1/1" }} />
                </div>
                <div className="overflow-hidden border border-border">
                  <img src="/bio-dogs.jpg" alt="Lola & Ágata" className="w-full h-full object-cover" style={{ aspectRatio: "1/1" }} />
                </div>
              </div>
            </Reveal>

            <BioText>
              {locale === "en"
                ? "Close to my chest, but also in my mind, because they are part of the purpose. They are Cícero, Kátia, Marina, Judite and Bruno. My family."
                : "Levo no peito, mas também na cabeça, pois fazem parte do propósito. São eles: Cícero, Kátia, Marina, Judite e Bruno. Minha família."}
            </BioText>

            <BioPhoto
              src="/bio-family.jpg"
              alt={locale === "en" ? "My family" : "Minha família"}
              maxHeight="550px"
            />

          </div>
        </div>
      </div>

      <Footer personalInfo={personalInfo} socials={socials} />
    </main>
  )
}
