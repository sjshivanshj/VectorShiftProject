import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ListPipelinesButton } from './listPipelines';

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
        <SubmitButton />
        <ListPipelinesButton />
      </div>
    </div>
  );
}

export default App;
