// // inputNode.js

// import { useState } from 'react';
// import { BaseNode } from './baseNode';


// export const InputNode = ({ id, data }) => {
//   const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
//   const [inputType, setInputType] = useState(data.inputType || 'Text');

//   const handleNameChange = (e) => {
//     setCurrName(e.target.value);
//   };

//   const handleTypeChange = (e) => {
//     setInputType(e.target.value);
//   };

//   return (
//     <BaseNode
//       title="Input"
//       subtitle="Pass data of different types into your workflow"
//       outputs={[{ id: `${id}-value` }]}
//     >
//       <label>
//         Name:
//         <input
//           type="text"
//           value={currName}
//           onChange={handleNameChange}
//         />
//       </label>

//       <br />

//       <label>
//         Type:
//         <select value={inputType} onChange={handleTypeChange}>
//           <option value="Text">Text</option>
//           <option value="File">File</option>
//         </select>
//       </label>
//     </BaseNode>
//   );
// }

// inputNode.js

// import { useState } from 'react';
// import { BaseNode } from './baseNode';


// export const InputNode = ({ id, data }) => {
//   const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
//   const [inputType, setInputType] = useState(data.inputType || 'Text');

//   const handleNameChange = (e) => {
//     setCurrName(e.target.value);
//   };

//   const handleTypeChange = (e) => {
//     setInputType(e.target.value);
//   };

//   return (
//     <BaseNode
//       title="Input"
//       subtitle="Pass data of different types into your workflow"
//       outputs={[{ id: `${id}-value` }]}
//     >
//       <label>
//         Name:
//         <input
//           type="text"
//           value={currName}
//           onChange={handleNameChange}
//         />
//       </label>

//       <br />

//       <label>
//         Type:
//         <select value={inputType} onChange={handleTypeChange}>
//           <option value="Text">Text</option>
//           <option value="File">File</option>
//         </select>
//       </label>
//     </BaseNode>
//   );
// }

// inputNode.js

import { useState } from 'react';
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      title="Input"
      subtitle="Pass data of different types into your workflow"
      outputs={[{ id: `${id}-value` }]}
    >
      <input
        type="text"
        className="vs-input"
        value={currName}
        onChange={handleNameChange}
      />

      <div className="vs-label">
        <span>Type</span>
        <span className="vs-badge">Dropdown</span>
      </div>
      
      <select 
        className="vs-select" 
        value={inputType} 
        onChange={handleTypeChange}
      >
        <option value="Text">Text</option>
        <option value="File">File</option>
      </select>
    </BaseNode>
  );
}