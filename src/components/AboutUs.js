"use client"

import { motion } from "framer-motion"

export default function AboutUs() {
  return (
    <section className="bg-[#010104] dark:bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center text-[#ffffff] dark:text-white mb-12"
        >
          About Us
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-[#ffffff] dark:text-gray-300 mb-4">Our Mission</h3>
            <p className="text-[#ffffff] dark:text-gray-400">To provide innovative solutions that empower businesses and individuals to thrive in the digital age.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-[#ffffff] dark:text-gray-300 mb-4">Our Vision</h3>
            <p className="text-[#ffffff] dark:text-gray-400">To become the leading platform for cutting-edge technology solutions, driving positive change worldwide.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-[#ffffff] dark:text-gray-300 mb-4">Our Values</h3>
            <p className="text-[#ffffff] dark:text-gray-400">Innovation, integrity, and excellence in everything we do, putting our customers first.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}