// // BaseNode.js

// baseNode.js
import { Handle, Position } from 'reactflow';
import './node.css';

export const BaseNode = ({
  title,
  subtitle,
  inputs = [],
  outputs = [],
  children,
}) => {
  return (
    <div className="vs-node">

      {/* HEADER */}
      <div className="vs-node-header">
        <div className="vs-node-header-left">
           <div className="vs-node-icon">⇨</div>
          <span className="vs-node-title">{title}</span>
        </div>
        <span className="vs-node-close">×</span>
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
          style={{ top: 70 + i * 24 }}
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



// import { Handle, Position } from 'reactflow';
// import './node.css';

// /*
//   BaseNode
//   ----------
//   Common wrapper for all nodes.

//   Props:
//   - title: string (Node title)
//   - inputs: array of { id, top? }  -> left handles
//   - outputs: array of { id, top? } -> right handles
//   - children: JSX (custom node content)
//   - style: optional style override (for dynamic sizing)
// */

// export const BaseNode = ({
//   title,
//   inputs = [],
//   outputs = [],
//   children,
//   style = {},
// }) => {
//   return (
//     <div
//       style={{
//         width: 200,
//         minHeight: 80,
//         border: '1px solid #333',
//         borderRadius: 8,
//         padding: 10,
//         backgroundColor: '#fff',
//         boxSizing: 'border-box',
//         ...style,
//       }}
//     >
//       {/* LEFT (INPUT) HANDLES */}
//       {inputs.map((input, index) => (
//         <Handle
//           key={input.id}
//           type="target"
//           position={Position.Left}
//           id={input.id}
//           style={{
//             top: input.top ?? `${((index + 1) * 100) / (inputs.length + 1)}%`,
//           }}
//         />
//       ))}

//       {/* RIGHT (OUTPUT) HANDLES */}
//       {outputs.map((output, index) => (
//         <Handle
//           key={output.id}
//           type="source"
//           position={Position.Right}
//           id={output.id}
//           style={{
//             top: output.top ?? `${((index + 1) * 100) / (outputs.length + 1)}%`,
//           }}
//         />
//       ))}

//       {/* NODE TITLE */}
//       <div
//         style={{
//           fontWeight: 'bold',
//           marginBottom: 8,
//           textAlign: 'center',
//         }}
//       >
//         {title}
//       </div>

//       {/* NODE CONTENT */}
//       <div>
//         {children}
//       </div>
//     </div>
//   );
// };
