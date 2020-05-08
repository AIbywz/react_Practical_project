//创建 保存title 的 action（动作）

import {SAVE_TITLE} from '../actions_type'

//创建 保存 title 的 action
export const saveTitle = (title)=> ({type:SAVE_TITLE,data:title})