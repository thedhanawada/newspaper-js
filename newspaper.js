function createNewspaperLayout(options) {
  const container = document.getElementById(options.containerId);
  container.classList.add('newspaper-container');

  const header = createHeader(options.title, options.subtitle, options.date);
  container.appendChild(header);

  const content = createContent(options.sections);
  container.appendChild(content);

  const footer = createFooter(options.footer);
  container.appendChild(footer);

  const advertisementSection = createAdvertisementSection(options.advertisements);
  container.appendChild(advertisementSection);

  const subscribeSection = createSubscribeSection();
  container.appendChild(subscribeSection);
}

function createHeader(title, subtitle, date) {
  const header = document.createElement('header');
  
  const titleElement = document.createElement('h1');
  titleElement.textContent = title;
  header.appendChild(titleElement);

  if (subtitle) {
      const subtitleElement = document.createElement('h2');
      subtitleElement.textContent = subtitle;
      header.appendChild(subtitleElement);
  }

  const dateElement = document.createElement('p');
  dateElement.classList.add('date');
  dateElement.textContent = date;
  header.appendChild(dateElement);

  return header;
}

function createContent(sections) {
  const content = document.createElement('div');
  content.classList.add('content');

  sections.forEach(section => {
      const sectionElement = createSection(section);
      content.appendChild(sectionElement);
  });

  return content;
}

function createSection(section) {
  const sectionElement = document.createElement('section');

  const titleElement = document.createElement('h3');
  titleElement.textContent = section.title;
  sectionElement.appendChild(titleElement);

  const columnsElement = document.createElement('div');
  columnsElement.classList.add('columns');

  section.articles.forEach(article => {
      const articleElement = createArticle(article);
      columnsElement.appendChild(articleElement);
  });

  sectionElement.appendChild(columnsElement);

  return sectionElement;
}

function createArticle(article) {
  const articleElement = document.createElement('article');

  if (article.title) {
      const titleElement = document.createElement('h4');
      titleElement.textContent = article.title;
      articleElement.appendChild(titleElement);
  }

  if (article.image) {
      const imageElement = document.createElement('img');
      imageElement.src = article.image;
      imageElement.alt = article.imageAlt || '';
      articleElement.appendChild(imageElement);
  }

  if (article.content) {
      const contentElement = document.createElement('p');
      contentElement.textContent = article.content;
      articleElement.appendChild(contentElement);
  }

  return articleElement;
}

function createFooter(content) {
  const footer = document.createElement('footer');
  footer.innerHTML = content;
  return footer;
}

function createAdvertisementSection(advertisements) {
  const section = document.createElement('section');
  section.classList.add('advertisement-section');

  advertisements.forEach(ad => {
      const adElement = document.createElement('div');
      adElement.classList.add('advertisement');
      adElement.innerHTML = ad;
      section.appendChild(adElement);
  });

  return section;
}

function createSubscribeSection() {
  const section = document.createElement('section');
  section.classList.add('subscribe-section');

  const title = document.createElement('h3');
  title.textContent = 'Subscribe to Our Newspaper';
  section.appendChild(title);

  const form = document.createElement('form');
  form.innerHTML = `
      <input type="text" name="name" placeholder="Your Name" required>
      <input type="email" name="email" placeholder="Your Email" required>
      <button type="submit">Subscribe</button>
  `;
  section.appendChild(form);

  return section;
}