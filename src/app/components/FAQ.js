"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from 'lucide-react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "What is DotSlash8?",
      answer: "DotSlash8 is a modern web application that showcases the latest web technologies and design trends.",
    },
    {
      question: "How do I get started with DotSlash8?",
      answer: "You can explore our features, read about our mission, and sign up for an account to get started.",
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 14-day free trial for all new users to explore our premium features.",
    },
  ]

  return (
    <section className="py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex justify-between items-center w-full p-4 text-left"
            >
              <span className="font-medium">{faq.question}</span>
              {openIndex === index ? (
                <Minus className="h-5 w-5 text-blue-500" />
              ) : (
                <Plus className="h-5 w-5 text-blue-500" />
              )}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 text-gray-600 dark:text-gray-300">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}