
import React, { Component } from 'react'
import { Card,Table, Button ,Modal,Form,Input, message} from "antd";
import { PlusCircleFilled } from '@ant-design/icons'
import { connect } from 'react-redux';
import { saveCategoryAsync } from '@/redux/actions/category'
import { reqAddCategory ,reqUpdateCategory} from '@/api'

@connect(
  (state)=>({categoryList: state.categoryList}),
  {saveCategoryAsync}
)
 class Category extends Component {
  state = { 
    visible: false,
  };
  //展示弹窗
  showModal = (categoryObj) => {
    const {categoryName} = this.refs
    // 给实例添加 ，_id,name,isReset
    this._id  = ''
    this.name =''
    this.isReset = false
    //获取 Form实例： 
    const {_id,name } = categoryObj
    //判断是否为修改
    if (_id && name) {
      //在实例保存 _id和name
      this._id = _id
      this.name = name
      this.isReset = true
    }
    if (categoryName) {
      categoryName.setFieldsValue({category:this.name})
    }

    this.setState({
      visible: true,
    });
  };
  //确认的回调
  handleOk = async () => {
    // 1.获取表单输入数据
    const {categoryName} = this.refs
    const {category} =  categoryName.getFieldsValue()
    // 2.校验数据 : 
    if (!category || !category.trim()) {
      message.error('分类名不能为空！')
    }else{  // 输入的不能为空
      // 3.发送请求添加一个分类 /发送请求修改分类
      let result
      if (this.isReset) {
        result = await reqUpdateCategory(this._id,category)
      }else{
        result = await reqAddCategory(category)
      }
      const {status,msg} = result
      if (status === 0) {
        message.success(this.isReset? '修改分类成功' :'添加分类成功！')
        //重新更新数据并保存
        this.props.saveCategoryAsync()
        //隐藏弹窗
        this.setState({visible: false,});
        //重置表单
        categoryName.resetFields()
      }else{
        message.error(msg)
      }
    }

  };
  //取消的回调
  handleCancel = () => {
    const { categoryName} = this.refs
    categoryName.resetFields()
    this.setState({visible: false,});
  };

   componentDidMount(){
     //获取分类列表
    this.props.saveCategoryAsync()
  }

  render() {
    const dataSource = this.props.categoryList 
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        dateIndex:'name',
        key: '1',
        align: 'center',
        render:(categoryObj) => {
          return <Button onClick={()=>{this.showModal(categoryObj)}} type="link">修改分类</Button>
        },
        width:'20%'
      }
    ];
    return (
      <div>
        {/*Card 组件*/}
        <Card 
          extra={
            <Button type="primary" onClick={this.showModal}> 
              <PlusCircleFilled />添加
            </Button>}
        >
          <Table
            dataSource={dataSource} 
            columns={columns} 
            bordered
            rowKey="_id" //配置唯一标识
            pagination={
              {pageSize:4}
            }
          />
        </Card>
        {/* Modal 组件 */}
        <Modal
          title={this.isReset? '修改分类' :"新增分类"} //弹窗标题
					visible={this.state.visible} //控制弹窗是否展示
					onOk={this.handleOk} //确认的回调
					onCancel={this.handleCancel} //取消的回调
					okText="确定"
					cancelText="取消"
        >
          <Form ref="categoryName" initialValues={{category:this.name}}>
						<Form.Item
							name="category"
							rules={[
								{required:true,message:'分类名必须输入'}
							]}
						>
							<Input placeholder="请输入分类名"/>
						</Form.Item>
					</Form>
        </Modal>
      </div>
    )
  }
}
export default Category