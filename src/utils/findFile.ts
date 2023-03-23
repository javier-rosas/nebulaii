import { ProcessedFiles } from '@/types/ProcessedFiles'

// helper function to calculate match score based on filename and description
function getMatchScore(fileName: string, description: string, searchTerms: string[]) {
  const fileWords = fileName.split(' ').concat(description.split(' '));
  const matchCount = searchTerms.reduce((count, term) => {
    return count + fileWords.filter(word => word.includes(term)).length;
  }, 0);
  return matchCount / searchTerms.length;
}

export function findFile(searchInput: string, processedFiles: ProcessedFiles) {
  const searchTerms = searchInput.trim().toLowerCase().split(' ');

  const matchingFiles = processedFiles.filter(file => {
    const fileName = file.filename.toLowerCase();
    const description = file.description.toLowerCase();
    const fileWords = fileName.split(' ').concat(description.split(' '));

    // check if all search terms are included in the filename or description
    return searchTerms.every(term => fileWords.includes(term));
  });

  // sort matching files by relevance
  const sortedFiles = matchingFiles.sort((a, b) => {
    const aMatchScore = getMatchScore(a.filename, a.description, searchTerms);
    const bMatchScore = getMatchScore(b.filename, b.description, searchTerms);
    return bMatchScore - aMatchScore;
  });

  // return the most relevant file, or null if no matching file is found
  return sortedFiles.length > 0 ? sortedFiles[0] : null;
}
