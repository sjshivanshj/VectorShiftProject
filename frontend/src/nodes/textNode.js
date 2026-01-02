// textNode.js

import { useState } from 'react';
import {BaseNode} from './baseNode';

const extractVariables = (text) => {
  const regex = /{{\s*([\w-]+)\s*}}/g;
  const vars = new Set();
  let match;

  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }

  return Array.from(vars);
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const variables = extractVariables(currText);

  const inputs = variables.map((v) => ({
    id: `${id}-${v}`,
  }));

  return (
    <BaseNode
      title="Text"
      inputs={inputs}
      
      outputs={[{ id: `${id}-output` }]}
    >
   <div className="vs-text-wrapper">
        {/* <label className="vs-text-label">Text</label> */}
        <textarea
          // type="text"
          // className="vs-text-input"
          // value={currText}
          // onChange={(e) => setCurrText(e.target.value)}
          className="vs-text-input" 
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          rows={1}
        />
      </div>
    </BaseNode>
  );
};