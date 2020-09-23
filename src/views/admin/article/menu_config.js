import {BookOutlined} from '@ant-design/icons';
import Edit from './edit/menu_config';
import Add from './add/menu_config';
import Manager from './manager/menu_config';

export default {
    title: '文章管理',
    icon: BookOutlined,
    path: 'article',
    subMenus: [Manager,Edit,Add],
}
