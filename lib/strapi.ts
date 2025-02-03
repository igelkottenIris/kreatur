import qs from "qs"

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  try {
    const mergedOptions = {
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_API_TOKEN ? {
          "Authorization": `Bearer ${STRAPI_API_TOKEN}`
        } : {}),
      },
      ...options,
    }

    const queryString = qs.stringify(urlParamsObject, {
      encodeValuesOnly: true, // prettify URL
    })
    
    const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ""}`
    console.log('Fetching from:', requestUrl) // Debug log

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(requestUrl, {
      ...mergedOptions,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      })
      return { data: [] }
    }

    const data = await response.json()
    console.log(`API Response for ${path}:`, data) // Add this debug log
    return data
  } catch (error) {
    console.error(`Fetch error for ${path}:`, error)
    return { data: [] }
  }
}

export async function getProjects() {
  const projects = await fetchAPI("/projects", {
    populate: '*'  // Change to use wildcard instead of specific fields
  })
  return projects.data || []
}

export async function getArticles() {
  const articles = await fetchAPI("/articles", {
    populate: '*',
    sort: ['DatePublished:desc']  // Changed from datePublished to DatePublished to match your model
  })
  return articles.data || []
}

export async function getArticleBySlug(slug: string) {
  const articles = await fetchAPI("/articles", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: '*'  // Simplified populate
  })
  return articles.data?.[0] || null
}
