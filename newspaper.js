function createNewspaperLayout(text, containerId, options = {}) {
    const container = document.getElementById(containerId);
    container.style.columnCount = options.columns || 3;
    container.style.columnGap = options.columnGap || "20px";
  
    const headline = extractHeadline(text);
    const headlineElement = document.createElement("h2");
    headlineElement.textContent = headline;
    headlineElement.style.fontSize = options.headlineSize || "1.5em";
    container.appendChild(headlineElement);
  
    const remainingText = text.substring(headline.length + 1);
    const textParagraphs = remainingText.split("\n\n"); // Split by paragraphs
  
    textParagraphs.forEach(paragraph => {
      const textElement = document.createElement("p");
      textElement.textContent = paragraph;
      container.appendChild(textElement);
    });
  }
  
  function extractHeadline(text) {
    const sentences = text.split(". "); // Slightly better headline detection
    return sentences[0]; 
  }
