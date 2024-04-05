function createNewspaperLayout(text, containerId, options = {}) {
  const container = document.getElementById(containerId);
  container.style.columnCount = options.columns || 3;
  container.style.columnGap = options.columnGap || "20px";

  let currentColumn = 0;
  const columns = createColumnElements(options.columns || 3);
  container.append(...columns);

  const sections = splitContent(text); 

  sections.forEach(section => {
    if (typeof section === "string") {
      columns[currentColumn].append(createTextElement(section));
    } else {
      columns[currentColumn].append(createImageElement(section));
    }
    currentColumn = (currentColumn + 1) % columns.length; 
  });

  adjustColumnHeights(columns); 
}

function splitContent(text) {
  const sections = [];
  let currentSection = "";

  text.split("\n\n").forEach(paragraph => {
    if (paragraph.startsWith("[image")) {
      sections.push(parseImageSection(paragraph));
      currentSection = "";
    } else {
      currentSection += paragraph + "\n";
    }
  });

  if (currentSection) {
    sections.push(currentSection.trim());
  }

  return sections;
}

function parseImageSection(text) {
  const openingBracket = text.indexOf("[image src='");
  if (openingBracket !== -1) {
    const closingBracket = text.indexOf("'", openingBracket + 14);
    const src = text.substring(openingBracket + 14, closingBracket);
    const altText = text.substring(closingBracket + 7).split("'")[0];
    return { src, alt: altText };
  }
  return null; 
}

function createColumnElements(count) {
  const columns = [];
  for (let i = 0; i < count; i++) {
    const column = document.createElement("div");
    column.style.width = "100%";
    columns.push(column);
  }
  return columns;
}

function createTextElement(text) {
  const textElement = document.createElement("p");
  textElement.textContent = text;
  return textElement;
}

function createImageElement(section) {
  const imageElement = document.createElement("img");
  imageElement.src = section.src; 
  imageElement.alt = section.alt || "Image"; 
  return imageElement;
}

function adjustColumnHeights(columns) {
  const maxHeight = Math.max(...columns.map(col => col.offsetHeight));
  columns.forEach(col => col.style.height = maxHeight + "px");
}
