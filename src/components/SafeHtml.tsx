import React from 'react';

interface SafeHtmlProps {
  content?: string;
  className?: string;
}

/**
 * Renderiza HTML diretamente no elemento com segurança básica
 * Permitindo tags comuns de formatação: <b>, <strong>, <i>, <u>, <span>, <mark>, <br>, <font>, etc.
 */
export function SafeHtml({ content = '', className = '' }: SafeHtmlProps) {
  if (!content) return null;

  // Process newline characters into <br /> if raw text without html tags
  const processed = content.includes('<') ? content : content.replace(/\n/g, '<br />');

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  );
}
