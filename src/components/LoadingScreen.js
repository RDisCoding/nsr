"use client"

import { motion } from "framer-motion"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <motion.div className="flex space-x-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {[1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className="w-4 h-4 bg-blue-600 rounded-full"
            animate={{
              y: [-10, 0, -10],
            }}
            transition={{
              duration: 0.6,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

