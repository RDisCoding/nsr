"use client"

import { useRef, useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import ImageSlider from "./components/ImageSlider"
import Features from "./components/Features"
import FAQ from "./components/FAQ"
import AboutUs from "./components/AboutUs"
import ThemeToggle from "./components/ThemeToggle"
import AIAssistButton from "./components/AIAssistButton"
import ScrollToTop from "./components/ScrollToTop"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const featuresRef = useRef(null)
  const faqRef = useRef(null)
  const aboutRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar
        onFeaturesClick={() => scrollToSection(featuresRef)}
        onFAQClick={() => scrollToSection(faqRef)}
        onAboutClick={() => scrollToSection(aboutRef)}
      />
      <main>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 py-20">
            <Hero />
            <ImageSlider />
          </div>
          <div ref={featuresRef}>
            <Features />
          </div>
          <div ref={faqRef}>
            <FAQ />
          </div>
        </div>
        <div ref={aboutRef}>
          <AboutUs />
        </div>
      </main>
      <ThemeToggle />
      <AIAssistButton />
      <ScrollToTop />
    </div>
  )
}