export const treeData = {
    name: 'root',
    is_root: true,
    id: "1",
    type: 'folder',
    children: [
        {
            name: 'Folder 1',
            id: "2",
            type: 'folder',
            children: [
                {
                    name: 'Sub folder 1.1',
                    id: "3",
                    type: 'folder',
                    children: [
                        {
                            name: 'File 1.1.1.txt',
                            id: "4",
                            type: 'file'
                        },
                        {
                            name: 'File 1.1.2.txt',
                            id: "5",
                            type: 'file'
                        }
                    ]
                },
                {
                    name: 'Sub folder 1.2',
                    id: "6",
                    type: 'folder',
                    children: [
                        {
                            name: 'File 1.2.1.js',
                            id: "7",
                            type: 'file'
                        }
                    ]
                }
            ]
        }, 
        {
            name: 'Folder 2',
            id: "8",
            type: 'folder',
            children: [
                {
                    name: 'Sub folder 2.1',
                    id: "9",
                    type: 'folder',
                    children: [
                        {
                            name: 'Sub folder 2.1.1',
                            id: "10",
                            type: 'folder',
                            children: [
                                {
                                    name: 'File 2.1.1.1.txt',
                                    id: "11",
                                    type: 'file',
                                }
                            ]
                        },
                        {
                            name: 'Sub folder 2.1.2',
                            id: "12",
                            type: 'folder',
                            children: []
                        }
                    ]
                }
            ]
        }, 
        {
            name: "File 1",
            id: "13",
            type: 'file'
        },
        {
            name: "Folder 3",
            id: "14",
            type: 'folder',
            children: [
                {
                    name: 'File 3.1',
                    id: "15",
                    type: 'file'
                }
            ]
        },
        {
            name: "File at root",
            id: "16",
            type: 'file'
        },
    ]
}