import Layout from "../components/Layout"
import { getProjects } from "@/lib/strapi"
import { AnimatedPageHeader } from "../components/AnimatedPageHeader"
import { AnimatedProjectCard } from "../components/AnimatedProjectCard"

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

export default async function ProjectsPage() {
  const projects: Project[] = await getProjects()

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <AnimatedPageHeader title="Our Projects" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <AnimatedProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
