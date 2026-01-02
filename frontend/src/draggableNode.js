// draggableNode.js

// export const DraggableNode = ({ type, label }) => {
//     const onDragStart = (event, nodeType) => {
//       const appData = { nodeType }
//       event.target.style.cursor = 'grabbing';
//       event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
//       event.dataTransfer.effectAllowed = 'move';
//     };
  
//     return (
//       <div
//         className={type}
//         onDragStart={(event) => onDragStart(event, type)}
//         onDragEnd={(event) => (event.target.style.cursor = 'grab')}
//         style={{ 
//           cursor: 'grab', 
//           minWidth: '80px', 
//           height: '60px',
//           display: 'flex', 
//           alignItems: 'center', 
//           borderRadius: '8px',
//           backgroundColor: '#1C2536',
//           justifyContent: 'center', 
//           flexDirection: 'column'
//         }} 
//         draggable
//       >
//           <span style={{ color: '#fff' }}>{label}</span>
//       </div>
//     );
//   };
  
export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="toolbar-node"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
      style={{ 
        cursor: 'grab',
        minWidth: '80px',
        width: '8px',
        height: '60px',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'column',
        gap: '8px',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
        padding: '16px',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)';
      }}
    >
      {icon && (
        <div style={{
          fontSize: '32px',
          marginBottom: '4px',
        }}>
          {icon}
        </div>
      )}
      <span style={{ 
        color: '#1f2937', 
        fontWeight: 500,
        fontSize: '14px',
        textAlign: 'center',
        lineHeight: '1.2',
      }}>
        {label}
      </span>
    </div>
  );
};