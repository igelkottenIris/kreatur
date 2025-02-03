import Layout from "../components/Layout"
import { getArticles } from "@/lib/strapi"
import { AnimatedPageHeader } from "../components/AnimatedPageHeader"
import { AnimatedArticleCard } from "../components/AnimatedArticleCard"

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

interface ApiArticle {
  id: number
  documentId: string
  Title: string
  slug: string
  Content: string
  ReadTme: string
  MetaDescription: string
  MetaKeywords: string[]
  createdAt: string
  updatedAt: string
  publishedAt: string
  OgImage?: {
    id: number
    name: string
    alternativeText: string
    url: string
  }
}

export default async function ArticlesPage() {
  let articles: Article[] = []
  
  try {
    const articlesData = await getArticles()
    if (Array.isArray(articlesData)) {
      articles = articlesData.map((article: ApiArticle) => ({
        id: article.id,
        documentId: article.documentId,
        Title: article.Title,
        slug: article.slug,
        Content: article.Content,
        ReadTme: article.ReadTme,
        MetaDescription: article.MetaDescription,
        MetaKeywords: article.MetaKeywords,
        OgImage: article.OgImage ? {
          id: article.OgImage.id,
          name: article.OgImage.name,
          alternativeText: article.OgImage.alternativeText,
          url: article.OgImage.url
        } : undefined
      }))
      console.log('Fetched articles:', articles)
    } else {
      console.error("Invalid response format:", articlesData)
    }
  } catch (error) {
    console.error("Error fetching articles:", error)
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <AnimatedPageHeader title="Latest Articles" />
        {articles && articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map((article, index) => (
              article && (
                <AnimatedArticleCard 
                  key={article.id || Math.random()} 
                  article={{
                    id: article.id,
                    documentId: article.documentId,
                    Title: article.Title || 'Untitled',
                    slug: article.slug,
                    Content: article.Content,
                    ReadTme: article.ReadTme,
                    MetaDescription: article.MetaDescription || 'No description available',
                    MetaKeywords: article.MetaKeywords,
                    OgImage: article.OgImage
                  }} 
                  index={index} 
                />
              )
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Unable to load articles at this time. Please try again later.
          </p>
        )}
      </div>
    </Layout>
  )
}
