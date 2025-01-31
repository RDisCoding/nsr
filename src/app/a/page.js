"use client"

import { motion } from "framer-motion"

export default function PageA() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-4xl font-bold text-gray-800 mb-4" variants={itemVariants}>
        Page A
      </motion.h1>
      <motion.p className="text-gray-600" variants={itemVariants}>
        This is the content for page A.
      </motion.p>
    </motion.div>
  )
}

