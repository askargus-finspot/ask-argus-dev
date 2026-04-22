import DOMPurify from 'dompurify';

const SAFE_HTML_OPTIONS = {
  ALLOWED_TAGS: ['a', 'strong', 'b', 'em', 'i', 'br', 'code'],
  ALLOWED_ATTR: ['href', 'class', 'target', 'rel'],
  ALLOW_DATA_ATTR: false,
  ALLOW_ARIA_ATTR: false,
};

let sanitizer: ReturnType<typeof DOMPurify> | null = null;

const getSanitizer = () => {
  if (sanitizer) {
    return sanitizer;
  }

  const instance = DOMPurify();
  instance.addHook('afterSanitizeAttributes', (node) => {
    if (node.nodeName === 'A') {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener noreferrer');
    }
  });
  sanitizer = instance;
  return sanitizer;
};

export const sanitizeHtml = (html: string): string => {
  try {
    return getSanitizer().sanitize(html, SAFE_HTML_OPTIONS);
  } catch (error) {
    console.error('HTML sanitization failed', error);
    return '';
  }
};
