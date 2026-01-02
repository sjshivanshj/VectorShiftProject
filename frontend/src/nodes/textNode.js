import { useState, useRef, useEffect } from 'react';
import { BaseNode } from './baseNode';

const extractVariables = (text) => {
  const regex = /\{\{(\w+)\}\}/g;
  const matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1]);
  }
  return matches;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  const variables = extractVariables(currText);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    // HEIGHT AUTO-GROW
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 180) + 'px';

    // WIDTH AUTO-GROW (based on text length)
    const charLength = currText.length || 10;
    const newWidth = Math.min(Math.max(charLength * 8, 140), 245);
    el.style.width = newWidth + 'px';

  }, [currText]);

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={variables.length > 0 ? [{ id: `${id}-vars` }] : []}
      outputs={[{ id: `${id}-output` }]}
    >
      <div className="vs-text-row"></div>
    {variables.length > 0 && (
  <div className="vs-text-vars">
    {variables.map(v => (
      <div key={v} className="vs-text-var">
        {v}
      </div>
    ))}
  </div>
)}
      <textarea
        ref={textareaRef}
        className="vs-text-input"
        value={currText}
        onChange={(e) => setCurrText(e.target.value)}
        rows={1}
      />
    </BaseNode>
  );
};

