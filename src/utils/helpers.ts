/**
 * Format date string
 * @param {string} date - Date string
 * @returns {string} formatted date string
 */
export const formatDate = (date: string) => {
  const dateObj = new Date(date)
  const time = dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
  const formattedDate = `${dateObj.getMonth()}/${dateObj.getDate()}/${dateObj.getFullYear()} at ${time}`
  return formattedDate
}
