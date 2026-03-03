export function linkifyText(text: string): string {
  const urlPattern = /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;

  let result = text;

  result = result.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');

  result = result.replace(urlPattern, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-luxury-gold hover:text-bright-gold underline transition-colors duration-200">${url}</a>`;
  });

  return result;
}

export function processContentWithLinks(content: string): string {
  const lines = content.split('\n');
  const processedLines = lines.map(line => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('###')) {
      const headingText = trimmedLine.substring(3).trim();
      return `<h3 class="text-xl font-bold text-bright-gold mb-3 mt-6">${linkifyText(headingText)}</h3>`;
    }

    if (trimmedLine.startsWith('##')) {
      const headingText = trimmedLine.substring(2).trim();
      return `<h2 class="text-2xl font-bold text-bright-gold mb-4 mt-6">${linkifyText(headingText)}</h2>`;
    }

    if (trimmedLine.startsWith('#')) {
      const headingText = trimmedLine.substring(1).trim();
      return `<h1 class="text-3xl font-bold text-bright-gold mb-4 mt-6">${linkifyText(headingText)}</h1>`;
    }

    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      const listItemText = trimmedLine.substring(2).trim();
      return `<li class="ml-6 mb-2 list-disc">${linkifyText(listItemText)}</li>`;
    }

    if (trimmedLine.startsWith('1. ') || /^\d+\.\s/.test(trimmedLine)) {
      const listItemText = trimmedLine.replace(/^\d+\.\s/, '').trim();
      return `<li class="ml-6 mb-2 list-decimal">${linkifyText(listItemText)}</li>`;
    }

    if (trimmedLine === '') {
      return '<br />';
    }

    return `<p class="mb-4">${linkifyText(trimmedLine)}</p>`;
  });

  return processedLines.join('\n');
}
