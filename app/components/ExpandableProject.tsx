"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Project {
  title: string
  description: string
  metrics: {
    amount: string
    count: string
  }
}

export function ExpandableProject({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border-b border-[#493a37] py-4">
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full text-left focus:outline-none">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-[#f4f1f0] group-hover:text-[#c5bcba]">{project.title}</h3>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-[#c5bcba]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-[#c5bcba]" />
          )}
        </div>
        <p className="mt-1 text-sm text-[#c5bcba]">{project.description}</p>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-[#c5bcba]"
          >
            <div className="flex justify-between">
              <span>Amount: {project.metrics.amount}</span>
              <span>Count: {project.metrics.count}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

