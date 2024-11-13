export function capitalize(str: string): string {
  if (!str) return '' // Manejo de strings vacíos

  return str
    .split(' ') // Divide la cadena por espacios
    .map(word => capitalizeFirstLetter(word)) // Capitaliza cada palabra
    .join(' ') // Vuelve a unir las palabras con espacios
}

function capitalizeFirstLetter(word: string): string {
  if (!word) return ''
  
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}