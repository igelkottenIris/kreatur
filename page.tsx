import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Layout from "./components/Layout"
import Link from "next/link"
import { getProjects, getArticles } from "@/lib/strapi"

interface Project {
  id: number
  attributes: {
    title: string
    description: string
    amount: string
    count: string
  }
}

interface Article {
  id: number
  attributes: {
    title: string
    publishedAt: string
    readTime: string
  }
}

export default async function Page() {
  let projects: Project[] = []
  let articles: Article[] = []

  try {
    projects = await getProjects()
    articles = await getArticles()
  } catch (error) {
    console.error("Error fetching data:", error)
  }

  return (
    <Layout>
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#f4f1f0] mb-4">well, at least something was created</h2>
          <p className="text-xl text-[#c5bcba]">
            with love
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl bg-[#2c2321]/40 backdrop-blur-xl shadow-2xl border border-[#493a37]/30 overflow-hidden mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#493a37]/30 to-[#2c2321]/20 pointer-events-none" />
          <div className="relative p-6 sm:p-8 md:p-10">
            <h2 className="mb-8 text-3xl font-semibold text-[#f4f1f0]">Featured Projects</h2>
            {projects.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                  <motion.div
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
                            {project.attributes.title}
                          </h3>
                          <p className="mt-2 text-sm text-[#493a37]">{project.attributes.description}</p>
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
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-[#c5bcba]">No projects available at the moment.</p>
            )}
            <div className="text-center mt-8">
              <Link href="/projects" className="text-[#c5bcba] hover:text-[#f4f1f0] transition-colors">
                View All Projects
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Article List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="mb-6 text-2xl font-semibold text-[#f4f1f0]">Latest Articles</h2>
          {articles.length > 0 ? (
            <div className="space-y-4">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-lg bg-[#493a37]/40 backdrop-blur-md p-4 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#67524e]/20 to-[#493a37]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-[#f4f1f0] group-hover:text-[#c5bcba]">
                        {article.attributes.title}
                      </h3>
                      <p className="mt-1 text-sm text-[#c5bcba]">
                        {new Date(article.attributes.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#2c2321]/50 px-3 py-1 text-sm font-medium text-[#f4f1f0]">
                      {article.attributes.readTime}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[#c5bcba]">No articles available at the moment.</p>
          )}
          <div className="text-center mt-8">
            <Link href="/articles" className="text-[#c5bcba] hover:text-[#f4f1f0] transition-colors">
              View All Articles
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}

