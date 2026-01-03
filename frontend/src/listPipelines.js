// listPipelines.js

import { useState } from 'react';
import './submit.css';

export const ListPipelinesButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [pipelines, setPipelines] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleListPipelines = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/pipelines/list');
      const result = await response.json();
      
      setPipelines(result.pipelines);
      setShowModal(true);
    } catch (err) {
      alert('Error fetching pipelines');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPipeline = async (pipelineId) => {
    try {
      const response = await fetch(`http://localhost:8000/pipelines/${pipelineId}`);
      const result = await response.json();
      
      // Display pipeline details
      alert(
        `Pipeline Details:\n\n` +
        `ID: ${result.id}\n` +
        `Created: ${new Date(result.created_at).toLocaleString()}\n` +
        `Nodes: ${result.metadata.num_nodes}\n` +
        `Edges: ${result.metadata.num_edges}\n` +
        `Is DAG: ${result.metadata.is_dag ? 'Yes' : 'No'}`
      );
    } catch (err) {
      alert('Error fetching pipeline details');
      console.error(err);
    }
  };

  return (
    <>
      <button className="vs-submit-btn" onClick={handleListPipelines} disabled={loading}>
        {loading ? 'Loading...' : 'List Pipelines'}
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Saved Pipelines ({pipelines.length})</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              {pipelines.length === 0 ? (
                <p className="no-pipelines">No pipelines saved yet.</p>
              ) : (
                <div className="pipelines-list">
                  {pipelines.map((pipeline) => (
                    <div key={pipeline.id} className="pipeline-item">
                      <div className="pipeline-info">
                        <div className="pipeline-id">{pipeline.id}</div>
                        <div className="pipeline-meta">
                          <span>📅 {new Date(pipeline.created_at).toLocaleString()}</span>
                          <span>📊 {pipeline.metadata.num_nodes} nodes, {pipeline.metadata.num_edges} edges</span>
                          <span className={pipeline.metadata.is_dag ? 'dag-yes' : 'dag-no'}>
                            {pipeline.metadata.is_dag ? '✓ DAG' : '✗ Not DAG'}
                          </span>
                        </div>
                      </div>
                      <button 
                        className="view-btn"
                        onClick={() => handleViewPipeline(pipeline.id)}
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

