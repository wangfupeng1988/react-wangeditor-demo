import React, { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

function MyEditor() {
    const [editor, setEditor] = useState(null) // 存储 editor 实例
    // const defaultContent = []
    // const [defaultContent, setDefaultContent] = useState([])
    const [defaultHtml, setDefaultHtml] = useState('<p><br></p>')
    const [isEditorShow, setIsEditorShow] = useState(false)

    // 模拟 ajax 请求
    setTimeout(() => {
        // setDefaultContent([
        //     {
        //         type: "paragraph",
        //         children: [{ text: "ajax 异步获取的内容" }],
        //     }
        // ])
        setDefaultHtml('<p>hello&nbsp;<strong>world</strong>.</p>\n<p><br></p>')
        setIsEditorShow(true)
    }, 1000)

    const toolbarConfig = { }
    const editorConfig = {
        placeholder: '请输入内容...',
        onCreated(editor) { setEditor(editor) }
    }

    // 及时销毁 editor
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    function insertText() {
        if (editor == null) return
        console.log(editor.insertText('hello'))
    }

    return (
        <>
            <button onClick={insertText}>insert text</button>
            {isEditorShow && <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    // defaultContent={defaultContent}
                    defaultHtml={defaultHtml}
                    mode="default"
                    style={{ height: '500px' }}
                />
            </div>}
            {!isEditorShow && <p>loading</p>}
        </>
    )
}

export default MyEditor
