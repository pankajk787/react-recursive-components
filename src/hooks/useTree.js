import { useState } from "react"

const useTree = (treeData={}) => {
    const [data, setData] = useState(treeData);

    const addNode = (parent_id, type = 'file', name) => {
        function addTreeNode(parentId, currentNode) {
            if(currentNode.type === 'file') return;
            else if(parentId === currentNode.id) {
                const newNode = {
                    id: `${new Date().getTime()}`,
                    name,
                    type,
                    children: type ==='folder' ? [] : undefined 
                }
                if(currentNode.children) currentNode.children.push(newNode);
                else currentNode.children = [];
                return;
            }
            currentNode.children?.forEach(child => {
                addTreeNode(parentId, child )
            })
        }


        const currentNode = {...data};
        addTreeNode(parent_id, currentNode);
        setData(currentNode)
    }

    const deleteNode = (node_id) => {
        function deleteTreeNode(nodeId, currentNode, parentNode) {
            if(parentNode && parentNode.type !== 'folder') return;
            if(currentNode.id === nodeId) {
                parentNode.children = parentNode.children.filter(node => node.id !== nodeId)
                return;
            }
            parentNode = currentNode;
            if(currentNode.children) {
                currentNode.children.forEach(node => {
                    deleteTreeNode(nodeId, node, parentNode);
                })
            }
        }
        const parentNode = null;
        const currentNode = {...data};
        if(currentNode.id === node_id && currentNode.is_root) return;
        deleteTreeNode(node_id, currentNode, parentNode);
        setData(currentNode);
    }

    const renameNode = (node_id, new_name) => {
        function renameTreeNode(node_id, currentNode) {
            if(currentNode.id === node_id) {
                currentNode.name = new_name;
                return;
            }
            if(currentNode.children) {
                currentNode.children.forEach((node) => {
                    renameTreeNode(node_id, node);
                })
            }
        }
        const currentNode = {...data};
        renameTreeNode(node_id, currentNode);
        setData(currentNode);
    }

    return { tree: data, addNode, deleteNode, renameNode };
}

export default useTree;