import React from 'react'
import TreeNode from '../components/TreeNode/TreeNode'
import { treeData } from './tree-data'
import useTree from '../hooks/useTree'

const RenderTreeNode = () => {
  const storageTreeData = localStorage.getItem('tree-data')
  const { tree, addNode, deleteNode, renameNode } = useTree( JSON.parse(storageTreeData) ?? treeData );

  React.useEffect(() => {
    if(tree)
      localStorage.setItem('tree-data', JSON.stringify(tree));
  }, [tree]);
  return (
    <div className='tree-node-structure'>
      {treeData ? <TreeNode 
        node={tree} 
        addNode={addNode}
        deleteNode={deleteNode}
        renameNode={renameNode}
      /> : 
      "No tree data found"}
    </div>
  )
}

export default RenderTreeNode
