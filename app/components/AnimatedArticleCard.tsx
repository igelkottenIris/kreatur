"use client"

import { motion } from "framer-motion"
import Link from 'next/link'
import Image from 'next/image'

interface Article {
  id: number
  documentId: string
  Title: string
  slug: string
  Content: string
  ReadTme: string
  MetaDescription: string
  MetaKeywords: string[]
  OgImage?: {
    id: number
    name: string
    alternativeText: string
    url: string
  }
}

interface AnimatedArticleCardProps {
  article: Article
  index: number
}

export function AnimatedArticleCard({ article, index }: AnimatedArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <article 
        className="group relative overflow-hidden rounded-lg bg-[#493a37]/40 backdrop-blur-md p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
        itemScope 
        itemType="http://schema.org/Article"
      >
        {/* SEO Metadata */}
        
        <meta itemProp="description" content={article.MetaDescription} />
        <meta itemProp="keywords" content={article.MetaKeywords.join(', ')} />
        {article.OgImage && (
          <meta 
            itemProp="image" 
            content={article.OgImage.url} 
          />
        )}

        <Link href={`/articles/${article.slug}`}>
          <div className="flex gap-6">
            {/* Image */}
            {article.OgImage && (
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={article.OgImage.url}
                  alt={article.OgImage.alternativeText || article.Title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 96px, 96px"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1">
              <h2 
                className="text-xl font-semibold text-[#f4f1f0] group-hover:text-[#c5bcba] transition-colors"
                itemProp="headline"
              >
                {article.Title}
              </h2>
              
              <p 
                className="mt-2 text-[#c5bcba] line-clamp-2"
                itemProp="abstract"
              >
                {article.MetaDescription}
              </p>

              <div className="mt-3 flex items-center gap-4">
                <span className="text-sm text-[#c5bcba]">
                  {article.ReadTme}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    </motion.div>
  )
}

