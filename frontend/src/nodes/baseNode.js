// baseNode.js
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import './node.css';

export const BaseNode = ({
  id,
  title,
  subtitle,
  inputs = [],
  outputs = [],
  children,
  className = '',
}) => {
  const removeNode = useStore((state) => state.removeNode);
  
  return (
    
    <div className={`vs-node ${className}`}>

    

      {/* HEADER */}
      <div className="vs-node-header">
        <div className="vs-node-header-left">
           <div className="vs-node-icon">⇨</div>
          <span className="vs-node-title">{title}</span>
        </div>
        {/* <span className="vs-node-close">×</span> */}
        <button
          className="vs-node-close"
          onClick={() => removeNode(id)}>×</button>
      </div>

      {/* SUBTITLE */}
      <div className="vs-node-subtitle">
        {subtitle}
      </div>

      {/* BODY */}
      <div className="vs-node-body">
        {children}
      </div>

      {/* HANDLES */}
      {inputs.map((input, i) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{ top: `${((i + 1) * 100) / (inputs.length + 1)}%`, }}
        />
      ))}

      {outputs.map((output, i) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{ top: 90 + i * 24 }}
        />
      ))}
    </div>
  );
};


