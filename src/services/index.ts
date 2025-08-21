import { Project, Testimonial } from '@/lib/types'
import { promises as fs } from 'fs'
import path from 'path'

// Function to get all projects
const getAllProjects = async (): Promise<Project[]> => {
  try {
    const filePath = path.join(process.cwd(), '/content/project.json')
    const fileContents = await fs.readFile(filePath, 'utf-8')
    const projects: Project[] = JSON.parse(fileContents)

    // Sort projects by priority
    projects.sort((a, b) => a.priority - b.priority)

    return projects
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

const getAllTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const testimonialsPath = path.join(process.cwd(), '/content/testimonials.json')
    const fileContents = await fs.readFile(testimonialsPath, 'utf-8')
    const testimonials: Testimonial[] = JSON.parse(fileContents)
    // Sort testimonials by date
    testimonials.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return testimonials
  } catch (error) {
    // Handle errors
    console.error('Error:', error)
    return []
  }
}

export { getAllProjects, getAllTestimonials }
