import {useState, useRef, useEffect} from 'react';
import {BaseNode} from './baseNode';

const extractVariables = (text) => {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
        matches.push(match[1]);
    }
    return matches;
};

export const TextNode = ({id, data}) => {
    const [currText, setCurrText] = useState(data?.text || '{{input}}');
    const textareaRef = useRef(null);

    const variables = extractVariables(currText);

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;

        // HEIGHT AUTO-GROW
        el.style.height = 'auto';
        el.style.height = Math.min(el.scrollHeight, 200) + 'px';

        // WIDTH AUTO-GROW (based on content)
        // Create a temporary element to measure text width
        const temp = document.createElement('div');
        temp.style.cssText = `
      position: absolute;
      visibility: hidden;
      white-space: pre-wrap;
      word-wrap: break-word;
      font-size: 14px;
      font-family: inherit;
      padding: 11px;
      max-width: 400px;
    `;
        temp.textContent = currText || 'placeholder';
        document.body.appendChild(temp);

        const contentWidth = temp.offsetWidth;
        document.body.removeChild(temp);

        // Set width with min and max constraints
        const minWidth = 140;
        const maxWidth = 400;
        const newWidth = Math.min(Math.max(contentWidth + 20, minWidth), maxWidth);
        el.style.width = newWidth + 'px';

    }, [currText]);

    return (
        <BaseNode
            id={id}
            title="Text"
            inputs={variables.map((v) => ({id: `${id}-${v}`}))}
            outputs={[{id: `${id}-output`}]}
            className="vs-text-node"
        >
            <div className="vs-text-row">
                {/* Variables column on the left */}
                {variables.length > 0 && (
                    <div className="vs-text-vars">
                        {variables.map((v) => (
                            <div key={v} className="vs-text-var">
                                {v}
                            </div>
                        ))}
                    </div>
                )}

                {/* Textarea on the right */}
                <textarea
                    ref={textareaRef}
                    className="vs-text-input"
                    value={currText}
                    onChange={(e) => setCurrText(e.target.value)}
                    rows={1}
                />
            </div>
        </BaseNode>
    );
};

