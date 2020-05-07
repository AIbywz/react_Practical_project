//创建 保存title 的 action（动作）

import {SAVE_CATEGORY} from '../actions_type'

//创建 保存 title 的 action
export const saveCategory = (categoryArr)=> ({type:SAVE_CATEGORY,data:categoryArr})