/**
 * @author zy
 * @date 2020/5/16
 * @Description:markdown编辑器  https://github.com/ilibs/react-simplemde-editor
 */
import React from 'react';
import loadScript from '@/components/import_script';
import 'easymde/dist/easymde.min.css';

//引入inlineAttachment
const SimpleMDE = loadScript([
    '//cdnjs.cloudflare.com/ajax/libs/codemirror/4.0.3/codemirror.js',
    process.env.PUBLIC_URL + '/inline_attachment/inline-attachment.js',
    process.env.PUBLIC_URL + '/inline_attachment/codemirror-4.inline-attachment.js',
], () => import('./md_editor.jsx'));


const Component = (props) => {
    return <SimpleMDE {...props}/>
};

export default Component;