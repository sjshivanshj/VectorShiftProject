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
      // Call the save endpoint instead of parse
      const response = await fetch('http://localhost:8000/pipelines/save', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      // Display pipeline ID if it's a DAG
      if (result.metadata.is_dag) {
        alert(
          `Pipeline Saved Successfully! ✓\n\n` +
          `Pipeline ID: ${result.pipeline_id}\n` +
          `Nodes: ${result.metadata.num_nodes}\n` +
          `Edges: ${result.metadata.num_edges}\n` +
          `Is DAG: Yes`
        );
      } else {
        alert(
          `Pipeline Summary:\n` +
          `Nodes: ${result.metadata.num_nodes}\n` +
          `Edges: ${result.metadata.num_edges}\n` +
          `Is DAG: No\n\n` +
          `Note: Pipeline was not saved (not a valid DAG)`
        );
      }
    } catch (err) {
      alert('Error submitting pipeline');
      console.error(err);
    }
  };

  return (
    <button className="vs-submit-btn" onClick={handleSubmit}>Submit</button>
  );
};
