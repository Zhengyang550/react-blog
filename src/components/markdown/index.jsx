/**
 * @author zy
 * @date 2020/5/16
 * @Description:markdown编辑器
 */
import React from 'react';
import PropTypes from 'prop-types';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import {translateMarkdown} from '@/utils';

const MdEditor = props => {
    return (
        <SimpleMDE
            value={props.value}
            onChange={props.onChange}
            options={{
                autofocus: true,
                previewRender: translateMarkdown
            }}
        />
    )
};

MdEditor.prototype = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default MdEditor;
