"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Layout from "../components/Layout"

// Replace this with your actual endpoint
const API_ENDPOINT = "https://your-api-endpoint.com/submit-form"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [notification, setNotification] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setNotification(null)

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      })

      if (response.ok) {
        setNotification("Message sent successfully!")
        setFormState({ name: "", email: "", message: "" })
      } else {
        const errorData = await response.json()
        setNotification(`Failed to send message: ${errorData.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setNotification("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-[#f4f1f0] mb-8"
        >
          Contact Us
        </motion.h1>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#c5bcba] mb-1">
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              className="w-full bg-[#493a37]/40 text-[#f4f1f0] border-[#67524e] focus:border-[#c5bcba] focus:ring-[#c5bcba]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#c5bcba] mb-1">
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full bg-[#493a37]/40 text-[#f4f1f0] border-[#67524e] focus:border-[#c5bcba] focus:ring-[#c5bcba]"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#c5bcba] mb-1">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              className="w-full bg-[#493a37]/40 text-[#f4f1f0] border-[#67524e] focus:border-[#c5bcba] focus:ring-[#c5bcba]"
              rows={4}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#c5bcba] text-[#2c2321] hover:bg-[#968784] transition-colors duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
          {notification && (
            <div
              className={`mt-4 p-2 ${notification.includes("successfully") ? "bg-green-500" : "bg-red-500"} text-white rounded`}
            >
              {notification}
            </div>
          )}
        </motion.form>
      </div>
    </Layout>
  )
}

