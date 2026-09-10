"use client";

import React from "react";

interface RichLessonContentProps {
  content: string;
  className?: string;
}

export default function RichLessonContent({
  content,
  className = "",
}: RichLessonContentProps) {
  if (!content) return null;

  // Normalizar saltos de línea
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className={`space-y-4 text-slate-300 text-base leading-relaxed ${className}`}>
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Check for centered block: <center>...</center> or [center]...[/center]
        const centerMatch =
          trimmed.match(/^<center>([\s\S]*?)<\/center>$/i) ||
          trimmed.match(/^\[center\]([\s\S]*?)\[\/center\]$/i);
        if (centerMatch) {
          return (
            <div
              key={bIdx}
              className="text-center mx-auto my-3 py-2 px-4 bg-slate-800/40 rounded-2xl max-w-2xl text-slate-200 font-medium"
            >
              {renderFormattedInline(centerMatch[1])}
            </div>
          );
        }

        // Check for heading: ### or ##
        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={bIdx}
              className="text-xl font-gobold text-secondary-400 uppercase tracking-wide pt-2"
            >
              {renderFormattedInline(trimmed.replace(/^###\s+/, ""))}
            </h3>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={bIdx}
              className="text-2xl font-gobold text-white uppercase tracking-wide pt-3 border-b border-slate-800 pb-2"
            >
              {renderFormattedInline(trimmed.replace(/^##\s+/, ""))}
            </h2>
          );
        }

        // Check for blockquote / Bible verse quote: > quote
        if (trimmed.startsWith(">")) {
          const quoteLines = trimmed
            .split("\n")
            .map((l) => l.replace(/^>\s*/, ""))
            .join(" ");
          return (
            <blockquote
              key={bIdx}
              className="border-l-4 border-secondary-500 bg-secondary-950/30 pl-5 pr-4 py-3 rounded-r-2xl my-3 text-secondary-200 italic font-serif text-lg leading-relaxed shadow-sm"
            >
              {renderFormattedInline(quoteLines)}
            </blockquote>
          );
        }

        // Check for bullet list: multiple lines starting with • or - or *
        const lines = trimmed.split("\n");
        const isList = lines.length > 1 && lines.every((l) => /^[-•*]\s+/.test(l.trim()));
        if (isList) {
          return (
            <ul key={bIdx} className="space-y-2 pl-2 my-2">
              {lines.map((line, lIdx) => (
                <li key={lIdx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-400 mt-2 flex-shrink-0" />
                  <span className="text-slate-300">
                    {renderFormattedInline(line.trim().replace(/^[-•*]\s+/, ""))}
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        // Normal paragraph with possible single line-breaks
        return (
          <p key={bIdx} className="leading-relaxed">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {renderFormattedInline(line)}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Parses inline formatting tags:
 * - <center>...</center>
 * - **bold** or <b>bold</b>
 * - *italic* or <i>italic</i>
 * - <u>underline</u>
 */
function renderFormattedInline(text: string): React.ReactNode {
  if (!text) return null;

  const inlineRegex = /(<center>[\s\S]*?<\/center>|<b>[\s\S]*?<\/b>|<strong>[\s\S]*?<\/strong>|\*\*[\s\S]*?\*\*|<i>[\s\S]*?<\/i>|<em>[\s\S]*?<\/em>|\*[\s\S]*?\*|<u>[\s\S]*?<\/u>)/gi;

  const parts = text.split(inlineRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    // Center inline
    if (/^<center>[\s\S]*?<\/center>$/i.test(part)) {
      const inner = part.replace(/^<center>/i, "").replace(/<\/center>$/i, "");
      return (
        <span key={idx} className="block text-center mx-auto my-1 font-semibold text-secondary-300">
          {renderFormattedInline(inner)}
        </span>
      );
    }

    // Bold tags
    if (/^<b>[\s\S]*?<\/b>$/i.test(part) || /^<strong>[\s\S]*?<\/strong>$/i.test(part)) {
      const inner = part.replace(/^<b(>|lock>)|<strong(>|lock>)/i, "").replace(/<\/(b|strong)>$/i, "");
      return (
        <strong key={idx} className="font-bold text-white">
          {renderFormattedInline(inner)}
        </strong>
      );
    }
    if (/^\*\*[\s\S]*?\*\*$/.test(part)) {
      const inner = part.slice(2, -2);
      return (
        <strong key={idx} className="font-bold text-white">
          {renderFormattedInline(inner)}
        </strong>
      );
    }

    // Italic tags
    if (/^<i>[\s\S]*?<\/i>$/i.test(part) || /^<em>[\s\S]*?<\/em>$/i.test(part)) {
      const inner = part.replace(/^<(i|em)>/i, "").replace(/<\/(i|em)>$/i, "");
      return (
        <em key={idx} className="italic text-slate-200">
          {renderFormattedInline(inner)}
        </em>
      );
    }
    if (/^\*[\s\S]*?\*$/.test(part) && part.length > 2) {
      const inner = part.slice(1, -1);
      return (
        <em key={idx} className="italic text-slate-200">
          {renderFormattedInline(inner)}
        </em>
      );
    }

    // Underline tags
    if (/^<u>[\s\S]*?<\/u>$/i.test(part)) {
      const inner = part.replace(/^<u>/i, "").replace(/<\/u>$/i, "");
      return (
        <span key={idx} className="underline decoration-secondary-500 decoration-2 underline-offset-4">
          {renderFormattedInline(inner)}
        </span>
      );
    }

    return part;
  });
}
