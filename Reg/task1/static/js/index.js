/**
 * (?:exp)	匹配exp,不捕获匹配的文本，也不给此分组分配组号
 * 
 */

const validTel = () => {
    let id = document.querySelector('#inNum')
    let reg = /^(?:13\d|15[89]|18[0-9])-?\d{5}(\d{3}|\*{3})$/
    if (reg.test(id.value)) {
      confirm('您输入的是有效的手机号码')
      id.value = ''
    } else {
      confirm('您输入的手机号码格式不对，请重新输入...')
      id.value = ''
    }
  }
  /**
   * 后向引用
   */
const validStr = () => {
  let id = document.querySelector('#inStr')
  let reg = /\b(\w+)\b\s+\1\b/
  if (reg.test(id.value)) {
    confirm('您输入的字符串符合验证规则')
    id.value = ''
  } else {
    confirm('您输入的字符串不符合验证规则，请重新输入...')
    id.value = ''
  }
}
