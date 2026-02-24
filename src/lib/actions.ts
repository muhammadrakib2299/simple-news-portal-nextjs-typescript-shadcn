"use server"

import { prisma } from "@/lib/prisma"

export async function subscribeToNewsletter(email: string) {
  const trimmed = email.trim().toLowerCase()

  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { success: false, error: "Please enter a valid email address." }
  }

  try {
    await prisma.subscriber.upsert({
      where: { email: trimmed },
      update: { active: true },
      create: { email: trimmed },
    })
    return { success: true }
  } catch {
    return { success: false, error: "Something went wrong. Please try again." }
  }
}

export async function submitContactMessage(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const { name, email, subject, message } = data

  if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
    return { success: false, error: "All fields are required." }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { success: false, error: "Please enter a valid email address." }
  }

  if (message.trim().length < 10) {
    return { success: false, error: "Message must be at least 10 characters." }
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
      },
    })
    return { success: true }
  } catch {
    return { success: false, error: "Something went wrong. Please try again." }
  }
}
