import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ROOT_FOLDER } from '../hooks/useFolder'
import AddFileButton from './AddFileButton'
import AddFolderButton from './AddFolderButton'


export default function FolderBreadcrumbs({ currentFolder })
{
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
    if (currentFolder) path = [...path, ...currentFolder.path]

    return (
        <Breadcrumb
            className="flex-grow-1"
            listProps={{ className: "pl-0 m-0" }}
        >
            {path.map((folder, index) => (
                <Breadcrumb.Item
                    key={folder.id}
                    linkAs={Link}
                    linkProps={{
                        to: {
                            pathname: folder.id ? `/folder/${folder.id}` : "/dashboard",
                            state: { folder: { ...folder, path: path.slice(1, index) } },
                        },
                    }}
                    className="text-truncate d-inline-block"
                    style={{ maxWidth: "150px" }}
                >
                    {folder.name}
                </Breadcrumb.Item>
            ))}
            {currentFolder && (
                <Breadcrumb.Item
                    className="text-truncate d-inline-block"
                    style={{ maxWidth: "200px" }}
                    active
                >
                    {currentFolder.name}
                </Breadcrumb.Item>
            )}
            <span style={{ flex: 1 }}></span>
            <AddFileButton currentFolder={currentFolder} />
            <AddFolderButton currentFolder={currentFolder} />
        </Breadcrumb>
    )
}
