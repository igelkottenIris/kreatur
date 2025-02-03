import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Layout from "./components/Layout"
import Link from "next/link"
import { getProjects, getArticles } from "@/lib/strapi"
import { MotionDiv } from './components/MotionWrapper'

interface Project {
  id: number
  attributes: {
    Title: string
    Description: string
    media: {
      data: Array<{
        attributes: {
          url: string
          alternativeText: string
        }
      }>
    }
    amount: string
    count: string
  }
}

interface Article {
  id: number
  documentId: string
  Title: string
  slug: string
  Content: string
  ReadTme: string
  DatePublished: string
  MetaDescription: string
  MetaKeywords: string[]
  OgImage: {
    id: number
    name: string
    alternativeText: string
    url: string
  }
}

export default async function Page() {
  let projects: Project[] = []
  let articles: Article[] = []

  try {
    const [projectsData, articlesData] = await Promise.all([
      getProjects(),
      getArticles()
    ])
    
    if (projectsData) {
      projects = projectsData
      console.log('Projects loaded:', projects.length)
    }
    
    if (articlesData) {
      articles = articlesData
      console.log('Articles loaded:', articles.length)
    }
  } catch (error) {
    console.error("Error fetching data:", error)
  }

  return (
    <Layout>
      <div className="relative">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#f4f1f0] mb-4">our most prized belongings</h2>
          <p className="text-xl text-[#c5bcba]">
            
          </p>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl bg-[#2c2321]/40 backdrop-blur-xl shadow-2xl border border-[#493a37]/30 overflow-hidden mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#493a37]/30 to-[#2c2321]/20 pointer-events-none" />
          <div className="relative p-6 sm:p-8 md:p-10">
            <h2 className="mb-8 text-3xl font-semibold text-[#f4f1f0]">featured projects</h2>
            {projects && projects.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                  project?.attributes && (
                    <MotionDiv
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="group relative overflow-hidden border-none bg-gradient-to-br from-[#c5bcba] to-[#f4f1f0] shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#968784]/20 to-[#67524e]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <CardContent className="relative space-y-4 p-6">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <h3 className="text-xl font-semibold tracking-tight text-[#2c2321]">
                              {project.attributes.Title}
                            </h3>
                            <p className="mt-2 text-sm text-[#493a37]">{project.attributes.Description}</p>
                          </motion.div>
                          <div className="flex items-center justify-between gap-4 text-sm font-medium text-[#2c2321]">
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              className="rounded-full bg-[#968784]/30 px-3 py-1 text-[#2c2321]"
                            >
                              {project.attributes.amount}
                            </motion.span>
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              className="rounded-full bg-[#c5bcba]/30 px-3 py-1 text-[#2c2321]"
                            >
                              {project.attributes.count}
                            </motion.span>
                          </div>
                        </CardContent>
                      </Card>
                    </MotionDiv>
                  )
                ))}
              </div>
            ) : (
              <p className="text-center text-[#3f3937]">empty...</p>
            )}
            <div className="text-center mt-8">
              <Link href="/projects" className="text-[#c5bcba] hover:text-[#f4f1f0] transition-colors">
                {'>'} view all projects
              </Link>
            </div>
          </div>
        </MotionDiv>

        {/* Article List */}
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl bg-transparent overflow-hidden mb-16"
        >

          <div className="relative p-6 sm:p-8 md:p-10">
            <h2 className="mb-8 text-2xl font-medium text-[#f4f1f0]">articles</h2>
            {articles && articles.length > 0 ? (
              <div className="space-y-4">
                {articles.map((article, index) => (
                  <MotionDiv
                    key={article.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="group relative overflow-hidden rounded-lg bg-transparent backdrop-blur-md p-4 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#67524e]/20 to-[#493a37]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-[#f4f1f0] group-hover:text-[#c5bcba]">
                          {article.Title}
                        </h3>
                        <p className="mt-1 text-sm text-[#c5bcba]">
                          {new Date(article.DatePublished).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <span className="rounded-full bg-transparent px-3 py-1 text-sm font-medium text-[#f4f1f0]">
                        {article.ReadTme}
                      </span>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            ) : (
              <p className="text-center text-[#3f3937]">empty...</p>
            )}
            <div className="text-center mt-8">
              <Link href="/articles" className="text-[#c5bcba] hover:text-[#f4f1f0] transition-colors">
                {'>'} view all articles
              </Link>
            </div>
          </div>
        </MotionDiv>
      </div>
    </Layout>
  )
}
