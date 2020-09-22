import React, {useRef} from "react";
import SimpleMDE from "react-simplemde-editor";
import PropTypes from "prop-types";
import {translateMarkdown} from '@/utils';
import useMount from '@/hooks/use_mount';
import * as uploadService from '@/service/upload';
import * as authService from '@/service/auth';

const MdEditor = props => {

    //获取md编辑器实例对象
    const instance = useRef();

    // 获取inlineAttachment
    const inlineAttachment = window.inlineAttachment;

    //图片上传配置
    const inlineAttachmentConfig = {
        uploadUrl: uploadService.getUploadUrl(),   // 设置图片上传的地址
        jsonFieldName: 'data.filename',            // 返回结果中图片地址对应的字段名称
        progressText:'![图片上传中...]()',
        errorText:'图片上传失败',
        extraHeaders: {
            Accept: 'application/json, text/javascript, */*; q=0.01',
            'Authorization': authService.getToken(),
        },
    };

    //第一次加载
    useMount(()=> {
        console.log('编辑器实例', instance);
        // 在已有的 SimpleMDE 对象的基础上再增加图片拖拽
        inlineAttachment.editors.codemirror4.attach(instance.current.simpleMde.codemirror, inlineAttachmentConfig);
    });


    return (
        <SimpleMDE
            ref={instance}
            value={props.value}
            onChange={props.onChange}
            options={{
                autofocus: true,
                previewRender: translateMarkdown,      // 自定义预览渲染
                toolbar: [
                    'bold',
                    'italic',
                    'heading',
                    '|',
                    'quote',
                    'code',
                    'table',
                    'horizontal-rule',
                    'unordered-list',
                    'ordered-list',
                    '|',
                    'link',
                    'image',
                    '|',
                    'side-by-side',
                    'fullscreen',
                    '|',
                    {
                        name: 'guide',
                        action() {
                            const win = window.open(
                                'https://github.com/riku/Markdown-Syntax-CN/blob/master/syntax.md',
                                '_blank',
                            );
                            if (win) {
                                // Browser has allowed it to be opened
                                win.focus();
                            }
                        },
                        className: 'fa fa-info-circle',
                        title: 'Markdown 语法！',
                    },
                ],
            }}
        />
    )
};

MdEditor.prototype = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default MdEditor;
