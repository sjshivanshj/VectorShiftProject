// outputNode.js

import { useState } from 'react';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      subtitle="Type '{{' in downstream nodes to leverage output fields" 
      inputs={[{ id: `${id}-value` }]}
    >
      
        <input
          type="text"
          className='vs-input'
          value={currName}
          onChange={handleNameChange}
        />

        <div className="vs-label">
        <span>Type</span>
        <span className="vs-badge">Dropdown</span>
      </div>

        <select 
        className="vs-select" 
        value={outputType} 
        onChange={handleTypeChange}
      >
        <option value="Text">Text</option>
        <option value="File">Image</option>
      </select>
    </BaseNode>
  );
}
