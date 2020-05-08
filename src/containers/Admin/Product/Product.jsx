
import React, { Component } from 'react'
import { Card, Button,Table, Select,Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'


const { Option } = Select;

export default class Product extends Component {
  render() {
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];
    
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    return (
      <Card 
        title={
          <div>
            <Select defaultValue="name">
              <Option value="name">按姓名搜索</Option>
              <Option value="desc">按描述搜索</Option>
            </Select>
            <Input style={{width:'25%',margin:'5px'}} placeholder="请输入搜索关键字" />
            <Button type='primary'>搜索</Button>
          </div>
        }
        extra={<Button type="primary"><PlusCircleOutlined />添加商品</Button>}
      >
      <Table dataSource={dataSource} columns={columns} />
    </Card>
    )
  }
}
