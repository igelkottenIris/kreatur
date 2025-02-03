"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface Project {
  id: number
  attributes: {
    title: string
    description: string
    media: {
      data: Array<{
        attributes: {
          url: string
          alternativeText: string
        }
      }>
    }
    videos: {
      data: Array<{
        attributes: {
          url: string
        }
      }>
    }
    audio: {
      data: Array<{
        attributes: {
          url: string
        }
      }>
    }
    icon: {
      data: {
        attributes: {
          url: string
          alternativeText: string
        }
      }
    }
    cover: {
      data: {
        attributes: {
          url: string
          alternativeText: string
        }
      }
    }
  }
}

interface AnimatedProjectCardProps {
  project: Project
  index: number
}

export function AnimatedProjectCard({ project, index }: AnimatedProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group relative overflow-hidden border-none bg-gradient-to-br from-[#c5bcba] to-[#f4f1f0] shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Cover Image */}
        {project.attributes.cover?.data && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={project.attributes.cover.data.attributes.url}
              alt={project.attributes.cover.data.attributes.alternativeText || project.attributes.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-br from-[#968784]/20 to-[#67524e]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <CardContent className="relative space-y-4 p-6">
          <div className="flex items-center gap-3">
            {project.attributes.icon?.data && (
              <div className="relative h-6 w-6 flex-shrink-0">
                <Image
                  src={project.attributes.icon.data.attributes.url}
                  alt={project.attributes.icon.data.attributes.alternativeText || ""}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <h3 className="text-xl font-semibold tracking-tight text-[#2c2321]">
              {project.attributes.title}
            </h3>
          </div>
          
          <div className="mt-2 text-sm text-[#493a37]">
            {project.attributes.description}
          </div>

          {/* Media Indicators */}
          <div className="flex items-center gap-3 text-sm text-[#493a37]">
            {project.attributes.media?.data?.length > 0 && (
              <span className="flex items-center gap-1">
                <span>📷</span>
                {project.attributes.media.data.length}
              </span>
            )}
            {project.attributes.videos?.data?.length > 0 && (
              <span className="flex items-center gap-1">
                <span>🎥</span>
                {project.attributes.videos.data.length}
              </span>
            )}
            {project.attributes.audio?.data?.length > 0 && (
              <span className="flex items-center gap-1">
                <span>🎵</span>
                {project.attributes.audio.data.length}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

