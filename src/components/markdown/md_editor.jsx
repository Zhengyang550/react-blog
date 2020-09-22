import React, {useRef} from "react";
import SimpleMDE from "react-simplemde-editor";
import PropTypes from "prop-types";
import {translateMarkdown} from '@/utils';
import useMount from '@/hooks/use_mount';
import * as uploadService from '@/service/upload';
import * as authService from '@/service/auth';
import {message} from "antd";

const MdEditor = props => {

    //获取md编辑器实例对象
    const mdeInstance = useRef();

    //获取input实例
    const uploadInput = useRef();

    // 获取inlineAttachment
    const inlineAttachment = window.inlineAttachment;

    //图片上传配置
    const inlineAttachmentConfig = {
        uploadUrl: uploadService.getUploadUrl(),   // 设置图片上传的地址
        jsonFieldName: 'data',                      // 上床成功后图片文件名所在字段
        extraHeaders: {
            Accept: 'application/json, text/javascript, */*; q=0.01',
            'Authorization': authService.getToken(),
        },
        //重写 请求返回状态吗200时的回调函数  注意这里不可以写成lamda表达式，不然会丢失this
        onFileUploadResponse: function (xhr) {
            console.log(xhr,this);
            //获取响应信息
            let result = JSON.parse(xhr.responseText);
            //获取文件名称
            let filename = result[this.settings.jsonFieldName];
            if (result && result.code === 200) {
                let newValue;
                if (typeof this.settings.urlText === 'function') {
                    newValue = this.settings.urlText.call(this, filename, result);
                } else {
                    newValue = this.settings.urlText.replace(this.filenameTag, uploadService.getDownloadUrl(filename));
                }
                let text = this.editor.getValue().replace(this.lastValue, newValue);
                this.editor.setValue(text);
                this.settings.onFileUploaded.call(this, filename);
            }
        }
    };

    //第一次加载
    useMount(() => {
        // 在已有的 SimpleMDE 对象的基础上再增加图片拖拽
        inlineAttachment.editors.codemirror4.attach(mdeInstance.current.simpleMde.codemirror, inlineAttachmentConfig);

        console.log(mdeInstance.current);
        //监听文件change事件
        uploadInput.current.addEventListener("change", () => {
            let formData = new FormData();
            let files = uploadInput.current.files;
            if(files.length < 0){
                return;
            }
            if(files.length > 1){
                message.info('一次只可以上传一张图片');
                return;
            }
            formData.append("file", files[0]);
            uploadService.uploadFile(formData).then((res)=> {
                // //获取文件名称
                let newValue = `![](/file/${uploadService.getDownloadUrl(res.data)})`;
            })
        })
    });


    return (
        <>
            {/* 图片上传 */}
            <input style={{display:'none'}} accept='image/gif,image/jpeg,image/jpg,image/png' type='file' id='uploadInput' ref={uploadInput}/>

            <SimpleMDE
                ref={mdeInstance}
                value={props.value}
                onChange={props.onChange}
                options={{
                    autofocus: true,
                    spellChecker: false,
                    autosave: {
                        enabled: true,
                        uniqueId: "demo",  //必须设置
                        delay: 10000,      //时间间隔默认 10s
                    },
                    previewRender: translateMarkdown,      // 自定义预览渲染
                    inputStyle: 'contenteditable',
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
                        // 'image',
                        {
                            name: 'image',
                            action: editor => {
                                let upload = document.getElementById('uploadInput');
                                upload.click();
                            },
                            className: 'fa fa-image',
                            title: 'Insert Image',
                            default: true
                        },
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
        </>
    )
};

MdEditor.prototype = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default MdEditor;
