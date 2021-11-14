import React, { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

function MyEditor() {
    const [editor, setEditor] = useState(null) // 存储 editor 实例
    // const defaultContent = []
    const [defaultContent, setDefaultContent] = useState([])
    const [isAjaxDone, setIsAjaxDone] = useState(false)

    // 模拟 ajax 请求
    setTimeout(() => {
        setDefaultContent([
            {
                type: "paragraph",
                children: [{ text: "ajax 异步获取的内容" }],
            }
        ])
        setIsAjaxDone(true)
    }, 1000)

    const toolbarConfig = {
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        // excludeKeys: [ /* 隐藏哪些菜单 */ ],
    }
    const editorConfig = {
        placeholder: '请输入内容...',
        onCreated: (editor) => {
            // 记录 editor 实例，重要 ！
            // 有了 editor 实例，就可以执行 editor API
            setEditor(editor)
        },
        onChange: (editor) => {
            // editor 选区或者内容变化时，获取当前最新的的 content
            console.log('changed', editor.children)
        }
    }

    // 及时销毁 editor ，重要！！！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    function getEditorText() {
        if (editor == null) return
        console.log(editor.getText())
    }

    return (
        <>
            <button onClick={getEditorText}>getText</button>
            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                {/* 渲染 toolbar */}
                {isAjaxDone && <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />}

                {/* 渲染 editor */}
                {isAjaxDone && <Editor
                    defaultConfig={editorConfig}
                    defaultContent={defaultContent}
                    mode="default"
                    style={{ height: '500px' }}
                />}
            </div>
        </>
    )
}

export default MyEditor
