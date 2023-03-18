import { useState } from "react";
function Child({ name, children, depth }) {
    const [isVisible, setIsVisible] = useState(false)
    const [file, setFile] = useState(children)
    const [fileName, setFileName] = useState('')
    const [isFileFieldVisible, setIsFileFieldvisible] = useState(false)
    const [isFolderFieldVisible, setIsFolderFieldvisible] = useState(false)
    function handleAddFile(e) {
        e.preventDefault()
        const data = {
            name: fileName
        }
        setFile(prev => [...prev, data])
        setIsFileFieldvisible(false)
        setFileName("")
    }
    function handleAddFolder(e) {
        e.preventDefault()
        const data = {
            name: fileName,
            children: []
        }
        setFile(prev => [...prev, data])
        setIsFolderFieldvisible(false)
        setFileName("")
    }
    return <>
        {file ?
            <div style={{ marginLeft: `${depth}px` }}>
                <button className="btn" onClick={() => setIsVisible(!isVisible)} >
                    {isVisible ? "-" : "+"} {name}</button>
                <button className="action" onClick={() => setIsFileFieldvisible(!isFileFieldVisible)}>Add file</button>
                <button className="action" onClick={() => setIsFolderFieldvisible(!isFolderFieldVisible)}>Add folder</button>
                {isFileFieldVisible &&
                    <div>
                        <form onSubmit={handleAddFile} >
                            <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />
                        </form>
                    </div>
                }
                {isFolderFieldVisible &&
                    <div>
                        <form onSubmit={handleAddFolder} >
                            <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />
                        </form>
                    </div>
                }

            </div> :
            <div style={{ margin: `10px ${depth}px` }}>
                {name}
            </div>
        }
        {isVisible && file &&
            file.map(child => (
                <Child key={child.name} {...child} depth={depth + 10} />
            ))
        }
    </>
}
const FileTree = () => {
    const fileTree = [
        {
            name: "node_modules",
            children: [{
                name: ".bin",
                children: [{
                    name: "acron",

                }]
            }]
        },
        {
            name: "src",
            children: [{
                name: "components",
                children: [{
                    name: "Head.js",

                }]
            }]
        },
        {
            name: "assets",
            children: [
                {
                    name: "icons",
                    children: []
                },
                {
                    name: "images",
                    children: [
                        {
                            name: "Pic.jpeg"
                        },
                        {
                            name: "Pic2.png"
                        }
                    ]
                },

            ]
        },
        {
            name: "package.json"
        }
    ]
    return (
        <>
            <div className="App">
                {fileTree.map(element => (
                    <Child key={element.name}{...element} depth={10} />
                ))}
            </div>
        </>
    )
}

export default FileTree;