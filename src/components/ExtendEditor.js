import React, { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { h } from 'snabbdom'
import { Boot, i18nChangeLanguage } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

i18nChangeLanguage('en')

// 渲染函数
function fn(elem, children, editor) {
    console.log(111)
    // elem 即当前节点
    // children 是下级节点
    // editor 即编辑器实例
    const vnode = h('div', {}, children)
    return vnode
}
const conf = {
    type: 'paragraph', // 节点 type ，重要！！！
    renderElem: fn,
}
// 注册到 wangEditor
Boot.registerRenderElem(conf)

function MyEditor() {
    // 存储 editor 实例
    const [editor, setEditor] = useState(null)

    // editor 配置
    const editorConfig = {}
    editorConfig.placeholder = '请输入内容...'
    editorConfig.onCreated = (editor) => {
        // 记录 editor 实例，重要 ！
        // 有了 editor 实例，就可以执行 editor API
        setEditor(editor)
    }

    return (
        <React.Fragment>
            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                {/* 渲染 toolbar */}
                <Toolbar
                    editor={editor}
                    defaultConfig={{}}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />

                {/* 渲染 editor */}
                <Editor
                    defaultConfig={editorConfig}
                    defaultContent={[]}
                    mode="default"
                    style={{ height: '500px' }}
                />
            </div>
        </React.Fragment>
    )
}

export default MyEditor
