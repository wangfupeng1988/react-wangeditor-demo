import React, { useState } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { h } from 'snabbdom'
import { Boot, SlateTransforms } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

// 插件
function widthMention(editor) {
    const newEditor = editor
    const { isVoid, isInline } = editor

    newEditor.isVoid = (elem) => {
        const { type } = elem
        if (type === 'mention') return true
        return isVoid(elem)
    }

    newEditor.isInline = elem => {
        const { type } = elem
        if (type === 'mention') return true
        return isInline(elem)
      }

    return newEditor
}
Boot.registerPlugin(widthMention)

// 渲染函数
function fn(elem, children, editor) {
    console.log('elem----', elem)
    // console.log('children----', children)
    const vnode = h(
        'div', 
        {
            style: {
                backgroundColor: 'yellow',
                display: 'inline-block',
                margin: '0 10px'
            },
            props: { contentEditable: false  }
        }, 
        [
            h('span', { style: { color: 'red' } }, `@${elem.title}`)
        ]
    )
    return vnode
}
const conf = {
    type: 'mention',
    renderElem: fn,
}
Boot.registerRenderElem(conf)

function MyEditor() {
    const [editor, setEditor] = useState(null)

    // editor 配置
    const editorConfig = {}
    editorConfig.placeholder = '请输入内容...'
    editorConfig.onCreated = (editor) => {
        setEditor(editor)

        window.editor = editor // 方便调试
    }

    function insertMention() {
        const node = {
            type: 'mention',
            title: '张三',
            children: [{text: ''}]
        }
        SlateTransforms.insertNodes(editor, node)
        // editor.insertNode(node)
    }

    return (
        <>
            <button onClick={insertMention}>insert mention</button>
            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={{}}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    defaultContent={[]}
                    mode="default"
                    style={{ height: '500px' }}
                />
            </div>
        </>
    )
}

export default MyEditor
