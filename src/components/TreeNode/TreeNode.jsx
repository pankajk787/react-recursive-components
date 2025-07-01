import React, { useState } from 'react'
import "./style.css"
const TreeNode = ({node, addNode, renameNode, deleteNode}) => {
  const [expanded, setExpanded] = useState(false);
  const [nameInputStatus, setNameInputStatus] = useState({open: false, action: null, nodeId: null });

  const handleNameInputAction = (nodeId, action) => {
    setNameInputStatus({open: true, action, nodeId});
    if(action === 'add-file' || action==="add-folder") {
      setExpanded(true);
    }
  }

  const onNameInputSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    if(nameInputStatus.action === 'add-file') {
      addNode(node.id, 'file', name);
    }
    else if(nameInputStatus.action === 'add-folder') {
      addNode(node.id, 'folder', name);
    }
    else {
      renameNode(node.id, name);
      setExpanded(false);
    }
    setNameInputStatus({open: false, action: null, nodeId: null});
  }

  const onNameInputCancel = () => {
    setNameInputStatus({open: false, action: null, nodeId: null});
  }

  return (
    <div style={{ marginLeft: node.is_root ? "0px": "18px", width: 'fit-content'}}>
      {
        node.type === 'folder' ? <>
            <div className='node folder'
              onClick={() => setExpanded((prev) => !prev)}
            >
                <span>{expanded ? '▼': '▶'} 📁</span>
                {(nameInputStatus.open && nameInputStatus.action==='rename' && nameInputStatus.nodeId === node.id) ? 
                  <NameInput action={nameInputStatus.action} defaultValue={node.name} onSubmit={onNameInputSubmit} onCancel={onNameInputCancel}/> : 
                  <span onDoubleClick={(e) => {
                    !node.is_root && handleNameInputAction(node.id, 'rename');
                    e.stopPropagation();
                  }}>{node.name}</span>}
                {
                  !nameInputStatus.open && 
                  <div className='node-action-btns'>
                    <button className='node-action-btn' onClick={(e) => {
                      handleNameInputAction(node.id, 'add-file');
                      e.stopPropagation();
                    }}>Add File</button>
                    <button className='node-action-btn' onClick={(e) => {
                      handleNameInputAction(node.id, 'add-folder');
                      e.stopPropagation();
                    }}>Add folder</button>
                    {!node.is_root && <button className='node-action-btn'
                      onClick={(e) => {
                        deleteNode(node.id);
                        e.stopPropagation();
                      }}
                    >Delete</button>}
                    {!node.is_root && <button className='node-action-btn' onClick={(e) => {
                      handleNameInputAction(node.id, 'rename');
                      e.stopPropagation();
                    }}>Rename</button>}
                  </div>
                }
            </div>
            
            {
              expanded &&
                (node.children || []).map(el => {
                    return <TreeNode node={el} key={el.id} addNode={addNode} renameNode={renameNode} deleteNode={deleteNode} />
                })
            }
        </> :
            <div className='node file'>
                <span>📄</span>
                {(nameInputStatus.open && nameInputStatus.action==='rename' && nameInputStatus.nodeId === node.id) ? 
                  <NameInput action={nameInputStatus.action} defaultValue={node.name} onSubmit={onNameInputSubmit} onCancel={onNameInputCancel}/> : 
                  <span onDoubleClick={(e) => {
                    handleNameInputAction(node.id, 'rename');
                    e.stopPropagation();
                  }}>{node.name}</span>}
                {
                  !nameInputStatus.open && 
                  <div className='node-action-btns'>
                    <button className='node-action-btn' onClick={(e) => {
                        deleteNode(node.id);
                        e.stopPropagation();
                      }}>Delete</button>
                    <button className='node-action-btn' onClick={(e) => {
                      handleNameInputAction(node.id, 'rename');
                      e.stopPropagation();
                    }}>Rename</button>
                  </div>
                }
            </div>
      }
      {
        (nameInputStatus.open && (nameInputStatus.action === 'add-file' || nameInputStatus.action === 'add-folder')) && 
          <NameInput action={nameInputStatus.action} onSubmit={onNameInputSubmit} onCancel={onNameInputCancel}/>
      }
    </div>
  )
}

const NameInput = ({action, onSubmit, onCancel, defaultValue}) => {
  const defaultVal = defaultValue ?? (action === 'add-file' ? `newfile-${new Date().getTime()}` : `newfolder-${new Date().getTime()}`)
  return (
    <form onSubmit={onSubmit} className='name-input-form'>
      <span>{action === 'add-file' ? "📄" : action === "add-folder" ? "📁" : null}</span>
      <input autoFocus type="text" name='name' required defaultValue={defaultVal}></input>
      <button className='btn name-input-submit-btn'>✓</button>
      <button type='button' className='btn name-input-cancel-btn' onClick={onCancel} title='Cancel'>✕</button>
    </form>
  )
}

export default React.memo(TreeNode);
