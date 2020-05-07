
import React, { Component } from 'react'
import { Card,Table, Button ,Modal,Form,Input} from "antd";
import { PlusCircleFilled } from '@ant-design/icons'
import {reqCategoryList} from '@/api'
import { connect } from 'react-redux';
import { saveCategory } from '@/redux/actions/category'

@connect(
  (state)=>({categoryList: state.categoryList}),
  {saveCategory}
)
 class Category extends Component {
  state = { 
    visible: false,
  };
  //展示弹窗
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  //确认的回调
  handleOk = () => {
    this.setState({visible: false,});
  };
  //取消的回调
  handleCancel = () => {
    this.setState({visible: false,});
  };

  //获取分类列表
  getCategoryList =async () =>{
    let result = await reqCategoryList()
    const { status,data } = result
    console.log(result);
    if (status === 0) {
      // 存入redux
      this.props.saveCategory(data)
      // this.setState({categoryList:data})
    }
  }
   componentDidMount(){
    this.getCategoryList()
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
        key: '1',
        align: 'center',
        render:() => <Button type="link">修改分类</Button>,
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
          title="新增分类" //弹窗标题
					visible={this.state.visible} //控制弹窗是否展示
					onOk={this.handleOk} //确认的回调
					onCancel={this.handleCancel} //取消的回调
					okText="确定"
					cancelText="取消"
        >
          <Form>
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