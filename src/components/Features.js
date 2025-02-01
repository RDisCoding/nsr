"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Features() {
  const features = [
    {
      title: "Modern Design",
      description: "Sleek and responsive interface for optimal user experience.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "AI-Powered",
      description: "Leverage the power of AI to enhance productivity.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Secure & Fast",
      description: "Built with the latest security standards and optimized for speed.",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <section className="py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            <Image
              src={feature.image || "/placeholder.svg"}
              alt={feature.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
            <div className="absolute bottom-0 p-4 text-white">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}