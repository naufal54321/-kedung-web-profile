export function truncateText(text, maxWords = 15) {
  if (!text) return ''
  const words = text.split(' ')
  return words.length > maxWords
    ? words.slice(0, maxWords).join(' ') + '...'
    : text
}
