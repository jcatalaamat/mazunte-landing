/**
 * Date and time helper functions for Mazunte Connect
 */

/**
 * Format a date string to a readable format
 * @param dateString - ISO date string (e.g., "2025-01-15")
 * @returns Formatted date (e.g., "Jan 15, 2025" or "Today")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  // Check if date is today
  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  }

  // Check if date is tomorrow
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow'
  }

  // Format as "Mon, Jan 15"
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Format a time string
 * @param timeString - Time string (e.g., "18:00:00" or "18:00")
 * @returns Formatted time (e.g., "6:00 PM")
 */
export function formatTime(timeString: string | null | undefined): string {
  if (!timeString) return ''

  // Handle both "HH:mm:ss" and "HH:mm" formats
  const [hours, minutes] = timeString.split(':').map(Number)

  const date = new Date()
  date.setHours(hours, minutes, 0)

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

/**
 * Format date and time together
 * @param dateString - ISO date string
 * @param timeString - Time string
 * @returns Combined formatted string (e.g., "Today at 6:00 PM")
 */
export function formatDateTime(dateString: string, timeString: string | null | undefined): string {
  const formattedDate = formatDate(dateString)
  const formattedTime = timeString ? formatTime(timeString) : ''

  if (formattedTime) {
    return `${formattedDate} at ${formattedTime}`
  }

  return formattedDate
}

/**
 * Check if an event date is in the past
 * @param dateString - ISO date string
 * @returns True if the date is in the past
 */
export function isPast(dateString: string): boolean {
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return date < today
}

/**
 * Check if an event is upcoming (future or today)
 * @param dateString - ISO date string
 * @returns True if the date is today or in the future
 */
export function isUpcoming(dateString: string): boolean {
  return !isPast(dateString)
}

/**
 * Get relative day text
 * @param dateString - ISO date string
 * @returns "Today", "Tomorrow", or number of days
 */
export function getRelativeDay(dateString: string): string {
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)

  const diffTime = date.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays > 1 && diffDays <= 7) return `in ${diffDays} days`

  return formatDate(dateString)
}

/**
 * Sort events by date and time
 * @param events - Array of events with date and time fields
 * @returns Sorted array (earliest first)
 */
export function sortByDateTime<T extends { date: string; time?: string | null }>(
  events: T[]
): T[] {
  return [...events].sort((a, b) => {
    // Compare dates first
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime()
    }

    // If dates are equal, compare times
    if (a.time && b.time) {
      const [hoursA, minutesA] = a.time.split(':').map(Number)
      const [hoursB, minutesB] = b.time.split(':').map(Number)
      const timeA = hoursA * 60 + minutesA
      const timeB = hoursB * 60 + minutesB
      return timeA - timeB
    }

    return 0
  })
}
