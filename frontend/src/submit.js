// submit.js

import { useStore } from './store';
import './submit.css';


export const SubmitButton = () => {
  const { nodes, edges } = useStore();

  const handleSubmit = async () => {
    const pipeline = {
      nodes,
      edges,
    };

    const formData = new FormData();
    formData.append('pipeline', JSON.stringify(pipeline));

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      alert(
        `Pipeline Summary:\n` +
        `Nodes: ${result.num_nodes}\n` +
        `Edges: ${result.num_edges}\n` +
        `Is DAG: ${result.is_dag ? 'Yes' : 'No'}`
      );
    } catch (err) {
      alert('Error submitting pipeline');
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
      <button className="vs-submit-btn" onClick={handleSubmit}>Submit</button>
    </div>
  );
};
