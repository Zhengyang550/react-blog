import {FolderOutlined} from '@ant-design/icons';
import year from './year/menu_config';
import tag from './tag/menu_config';

export default {
    title: '归档',
    icon: FolderOutlined,
    path: 'archives',
    subMenus: [year,tag]
}
