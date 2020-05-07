
import React, { Component } from 'react'
import { Card,Table, Button ,Modal,Form,Input} from "antd";
import { PlusCircleFilled } from '@ant-design/icons'

export default class Category extends Component {
  state = { visible: false };
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

  render() {
    const dataSource = [
      {
        key: '1',
        name: '儿童玩具',
        cz: '修改'
      },
      {
        key: '2',
        name: '成人用品',
        cz:'修改'
      },
    ];
    
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: 'cz',
        key: 'cz',
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
            pagination={
              {pageSize:5}
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
