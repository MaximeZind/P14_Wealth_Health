export function toCamelCase(inputString) {
    const words = inputString.trim().split(/\s+/);
  
    const camelWords = words.map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    });
  
    const camelField = camelWords.join('');
    return camelField;
  }