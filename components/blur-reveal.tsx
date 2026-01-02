"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation, type UseInViewOptions } from "framer-motion"

interface BlurRevealProps {
  children: React.ReactNode
  width?: "fit-content" | "100%"
  delay?: number
  duration?: number
  blurAmount?: number
  yOffset?: number
}

export const BlurReveal = ({
  children,
  width = "fit-content",
  delay = 0,
  duration = 0.8,
  blurAmount = 20,
  yOffset = 20,
}: BlurRevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, filter: `blur(${blurAmount}px)`, y: yOffset },
          visible: { opacity: 1, filter: "blur(0px)", y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
