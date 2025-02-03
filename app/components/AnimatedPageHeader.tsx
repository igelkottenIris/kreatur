"use client"

import { motion } from "framer-motion"

interface AnimatedPageHeaderProps {
  title: string
}

export function AnimatedPageHeader({ title }: AnimatedPageHeaderProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl font-bold text-[#f4f1f0] mb-8"
    >
      {title}
    </motion.h1>
  )
}

