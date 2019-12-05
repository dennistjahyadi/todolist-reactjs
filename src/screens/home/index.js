import React from 'react';
import { Layout, Button, Menu, Breadcrumb, Icon, Typography, List, Checkbox, Modal } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import InputDialog from '../../components/inputDialog';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const { Title } = Typography;
const { confirm } = Modal;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Desigdsafdsan Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Designsdfasdfssfd Title 4',
  },
];
class HomeScreen extends React.Component {

  showEditDialog = () => {
    this.inputDialogRef.showModal("Edit")
  }
  
  showAddDialog = () => {
    this.inputDialogRef.showModal("Add")
  }

  showDeleteConfirm = () => {
    
    confirm({
      title: 'Are you sure delete this?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  constructor(props){
    super(props)
    this.inputDialogRef = null
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <Menu theme="dark">
            <SubMenu key="sub1" title="User">
              <SubMenu key="sub22" title="List">
                <Menu.Item key="42">Bill</Menu.Item>
                <Menu.Item key="52">Alex</Menu.Item>
              </SubMenu>
              <Menu.Item style={{color:"green"}} onClick={this.showAddDialog}>Add Todo</Menu.Item>
              <Menu.Item style={{color:"blue"}} onClick={this.showEditDialog}>Rename workspace</Menu.Item>
              <Menu.Item style={{color:"red"}} onClick={this.showDeleteConfirm}>Delete workspace</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title="Team">
              <SubMenu key="sub222" title="List">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="621">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item style={{color:"green"}}>Add Todo</Menu.Item>
              <Menu.Item style={{color:"blue"}}>Rename workspace</Menu.Item>
              <Menu.Item key="5" style={{color:"red"}}>Delete workspace</Menu.Item>
            </SubMenu>
            <Menu.Item key="123">
              <Icon style={{color: "green"}} type="file-add" />
              <span style={{color: "green"}}>Add Workspace</span>
            </Menu.Item>
            <Menu.Item key="9">
              <Icon style={{color: "red"}} type="logout" />
              <span style={{color: "red"}}>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '25px', minHeight: 360, background: '#fff'  }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Workspace: User</Breadcrumb.Item>
            </Breadcrumb>
            <Title level={2}>
              h1. Ant Design 
              <Button type="primary" shape="circle" icon="edit" style={{marginLeft: 10}}></Button>
              <Button type="danger" shape="circle" icon="delete" style={{marginLeft: 10}}></Button>
            </Title>
            <Button type="primary" icon="add" style={{backgroundColor: "green", borderColor: "green"}}>Add Todo Items</Button>
            <List
              itemLayout="vertical"
              dataSource={data}
              renderItem={item => (
                <List.Item style={{ display: "flex", marginLeft: 100}} actions={[<a key="list-edit">edit</a>, <a key="list-delete">delete</a>]}>
                  <Checkbox>{item.title}</Checkbox>
                </List.Item>
              )}
            />
          </Content>
        </Layout>
        <InputDialog ref={i => this.inputDialogRef = i}/>
      </Layout>
    )
  }
}

export default HomeScreen