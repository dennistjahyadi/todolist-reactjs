import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import WorkspaceListItem from '../../components/workspaceListItem';
import { connect } from 'react-redux'
import { getAllWorkspace } from "../../actions/workspace"

const { Sider } = Layout;

//  props:
//  onClickAddWorkspace: function|required
//  onClickEditWorkspace: function|required () => { return (id, name) }
//  onClickDeleteWorkspace: function|required () => { return (id) }
//  onClickAddTodo: function|required () => { return workspaceId }
//  onClickLogout: function|required
//  onClickTodo: function|required () => { return (workspace, todo)}
//  workspaces: Array|required
class SideBar extends React.Component {

  handleAddWorkspace = () => this.props.onClickAddWorkspace()
  handleEditWorkspace = (id, name) => this.props.onClickEditWorkspace(id, name)
  handleDeleteWorkspace = (id) => this.props.onClickDeleteWorkspace(id)
  handleAddTodo = (workspaceId) => this.props.onClickAddTodo(workspaceId)
  handleLogout = () => this.props.onClickLogout()
  handleClickTodo = (todo) => this.props.onClickTodo(todo)
  
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.getAllWorkspace()
  }

  render() {
    return (
      <Sider style={{ background: "white"}}>
        <Menu theme="light">
          {this.props.workspaces.map(item => {
            return <WorkspaceListItem key={item.id} item={item} 
            onClickTodo={this.handleClickTodo}
            onClickDeleteWorkspace={this.handleDeleteWorkspace} 
            onClickEditWorkspace={this.handleEditWorkspace}
            onClickAddTodo={this.handleAddTodo}/>
          })}
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
    getAllWorkspace: () => dispatch(getAllWorkspace())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)