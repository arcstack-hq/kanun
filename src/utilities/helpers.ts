/**
 * Pluralizes a word based on the count.
 * 
 * @param word 
 * @param count 
 * @returns 
 */
export const plural = (word: string, count: number): string => {
    return count === 1 ? word : `${word}s`
}