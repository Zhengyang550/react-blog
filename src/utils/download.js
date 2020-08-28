import { getToken } from '@/service/auth'

/**
 * 文件下载
 * @author zy
 * @date 2020/8/28
 */
export default function download(url) {
  const $a = document.createElement('a')
  const token = getToken()
  $a.href =  url;
  document.body.appendChild($a)
  $a.click();
  document.body.removeChild($a)
}
