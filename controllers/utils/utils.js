const wordsForRemoval = [
  "a", "at", "be", "can", "cant", "could", "couldnt",
  "do", "does", "how", "i", "in", "is", "many", "much", "of",
  "on", "or", "should", "shouldnt", "so", "such", "the",
  "them", "they", "to", "us", "we", "what", "who", "why",
  "with", "wont", "would", "wouldnt", "you", "and", "that", "one",
  "it", "are", "not", "for", "if", "as", "more", "was", "may", "often",
  "there", "their", "an", "typically", "both", "by", "but", "perhaps",
  "from", "than", "my", "someone", "something", "stuff", "thing", "also",
  "have", "need", "needed", "another", "which", "being", "able", "although",
  "include", "other", "very", "else", "two", "plus", "others", "all",
  "true", "false", "good", "best", "same", "every", "some", "no", "none", "these",
  "generally", "small", "wide", "big", "considered", "consider", "see", "were", "besides",
  "mostly", "called", "call", "while", "due", "example", "whether", "like", "liked",
  "three", "together", "facts", "fact", "among", "found", "knowledge", "defined", "between",
  "choose", "choosing", "understand", "understanding", "belief", "beliefs", "found", "name",
  "using", "use", "place", "certain", "present", "forms", "form", "since", "extreme", "extremely",
  "common", "numerous", '1', '100', '0', "neither", "he", "she", "this", "will"
]

const compareText = (iterations) => {
  const textArr = iterations.map((i) => i.text)
  const wordsUniqueToEachBlock = textArr.map((block) => [...new Set(block.toLowerCase().replace(/\W|_/g, ' ').split(' '))])
  const allUniqueWords = wordsUniqueToEachBlock.flat().toString().toLowerCase().replace(/\W|_/g, ' ')
  const wordArr = allUniqueWords.replace(new RegExp('\\b(' + wordsForRemoval.join("|") + ')\\b', 'gi'), ' ').split(' ')
  const wordCount = wordArr.reduce((obj, w) => { obj[w] ? obj[w]++ : obj[w] = 1; return obj }, {})
  return Object.keys(wordCount).filter((key) => key !== '').sort((a, b) => wordCount[b] - wordCount[a]).slice(0, 20)
}

const calculateStars = (value) => {
  if (value < -.5) return 1
  if (value >= -.5 && value < 0) return 2
  if (value <= .5 && value >= 0) return 3
  if (value > .5) return 4
}

export { 
  compareText,
  calculateStars
}