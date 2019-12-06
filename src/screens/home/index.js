import React from 'react';
import { Layout, Button, Menu, Breadcrumb, Icon, Typography, List, Checkbox, Modal } from 'antd';
import AuthAPI from "../../api/auth"
import { Redirect } from "react-router-dom";
import 'antd/dist/antd.css';
import './index.css';
import WorkspaceListItem from '../../components/workspaceListItem';
import AddWorkspaceDialog from '../../components/addWorkspaceDialog';
import EditInputDialog from '../../components/editInputDialog';
import { connect } from 'react-redux'
import { getAllWorkspace, deleteWorkspace, editWorkspace } from "../../actions/workspace"

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
  state = { redirect: false }

  showDeleteConfirm = (id) => {
    const { deleteWorkspace } = this.props
    confirm({
      title: 'Are you sure delete this?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteWorkspace(id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleAddWorkspace = () => this.addWorkspaceDialogRef.showModal()
  handleEditWorkspace = (id, name) => this.editInputDialogRef.showModal(id, "Edit Workspace", name)

  handleRedirect = () => {
    if(AuthAPI.isLoggedIn()) this.setState({redirect: false})
    else this.setState({redirect: true})
  }

  handleLogout = () => {
    AuthAPI.logout()
    this.setState({redirect: true})
  }

  constructor(props){
    super(props)
    this.addWorkspaceDialogRef = null
    this.editInputDialogRef = null
  }

  componentDidMount(){
    this.handleRedirect()
    this.props.getAllWorkspace()
  }

  render() {
    if(this.state.redirect){
      return (<Redirect to={"/login"}/>)
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider style={{ background: "white"}}>
          <Menu theme="light">
            <List
              itemLayout="horizontal"
              dataSource={this.props.workspaces}
              renderItem={item => (
                  <WorkspaceListItem item={item} onClickDeleteWorkspace={this.showDeleteConfirm} onClickEditWorkspace={this.handleEditWorkspace}/>
              )}
            />
            <Menu.Item key="123" onClick={this.handleAddWorkspace}>
              <Icon style={{color: "green"}} type="file-add" />
              <span style={{color: "green"}}>Add Workspace</span>
            </Menu.Item>
            <Menu.Item key="9" onClick={this.handleLogout}>
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
        <EditInputDialog ref={i => this.editInputDialogRef = i} />

        <AddWorkspaceDialog  ref={i => this.addWorkspaceDialogRef = i}/>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    workspaces: state.workspace.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllWorkspace: () => dispatch(getAllWorkspace()),
    deleteWorkspace: (id) => dispatch(deleteWorkspace(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)