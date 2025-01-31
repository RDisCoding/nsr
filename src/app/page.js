"use client"

import Layout from "./components/Layout"
import InfoCard from "./components/InfoCard"
import AIAssistButton from "./components/AIAssistButton"

export default function Home() {
  const cards = [
    { title: "Feature 1", description: "Description of feature 1", image: "/placeholder.svg" },
    { title: "Feature 2", description: "Description of feature 2", image: "/placeholder.svg" },
    { title: "Feature 3", description: "Description of feature 3", image: "/placeholder.svg" },
    { title: "Feature 4", description: "Description of feature 4", image: "/placeholder.svg" },
    { title: "Feature 5", description: "Description of feature 5", image: "/placeholder.svg" },
    { title: "Feature 6", description: "Description of feature 6", image: "/placeholder.svg" },
  ]

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Website</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((card, index) => (
          <InfoCard key={index} {...card} />
        ))}
      </div>
      <AIAssistButton />
    </Layout>
  )
}

