import React from 'react';
import { Layout, Button, Menu, Breadcrumb, Icon, Typography, List, Checkbox, Modal } from 'antd';
import AuthAPI from "../../api/auth"
import { Redirect } from "react-router-dom";
import 'antd/dist/antd.css';
import './index.css';
import InputDialog from '../../components/inputDialog';
import { connect } from 'react-redux'
import { deleteWorkspace } from "../../actions/workspace"
import { deleteTodo, getCurrentTodo } from "../../actions/todo"
import { deleteTodoDetails, toggleCompleteTodoDetails } from "../../actions/todoDetails"
import SideBar from '../../components/sideBar';
import HomeContent from '../../components/HomeContent';
import { getAllTodoDetails } from "../../actions/todoDetails"

const { confirm } = Modal;
class HomeScreen extends React.Component {
  state = { redirect: false, currentTodoId: null }

  showDeleteConfirm = (table, id) => {
    const { deleteWorkspace, deleteTodo, deleteTodoDetails } = this.props
    confirm({
      title: 'Are you sure delete this?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        if(table === "workspaces") deleteWorkspace(id)
        else if(table === "todos") deleteTodo(id)
        else if(table === "todoDetails") deleteTodoDetails(id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleAddWorkspace = () => this.inputDialogRef.showModal("create", "workspaces", null, "Add Workspace", "", null )
  handleEditWorkspace = (id, name) => this.inputDialogRef.showModal("edit", "workspaces", id, "Edit Workspace", name, null )
  handleDeleteWorkspace = (id) => this.showDeleteConfirm("workspaces", id)
  handleEditTodo = (todoId, content) => this.inputDialogRef.showModal("edit", "todos", todoId, "Edit Todo", content, null )
  handleDeleteTodo = (id) => this.showDeleteConfirm("todos", id)
  handleEditTodoDetails = (todoDetailsId, content) => this.inputDialogRef.showModal("edit", "todoDetails", todoDetailsId, "Edit Todo Details", content, null )
  handleDeleteTodoDetails = (id) => this.showDeleteConfirm("todoDetails", id)
  handleOnToggleComplete = (id, isCompleted) => this.props.toggleCompleteTodoDetails(id, isCompleted)

  handleAddTodo = (workspaceId) => {
    const extraData = { workspaceId }
    this.inputDialogRef.showModal("create", "todos", null, "Add Todo", "", extraData)
  }
  handleAddTodoDetails = (todoId) => {
    const extraData = { todoId }
    this.inputDialogRef.showModal("create", "todoDetails", null, "Add Todo Details", "", extraData )
  }

  handleRedirect = () => {
    if(AuthAPI.isLoggedIn()) this.setState({redirect: false})
    else this.setState({redirect: true})
  }

  handleLogout = () => {
    AuthAPI.logout()
    this.setState({redirect: true})
  }
  
  handleClickTodo = (todo) => { 
    this.fetchAllTodoDetails(todo.id)
  }

  fetchAllTodoDetails = (todoId) => {
    if(todoId) {
      this.props.getAllTodoDetails(todoId)
      this.props.getCurrentTodo(todoId)
    }
  }

  constructor(props){
    super(props)
    this.inputDialogRef = null
    this.todoId = this.props.match.params.todoId
  }

  componentDidMount(){
    this.handleRedirect()
    this.fetchAllTodoDetails(this.todoId)
  }

  render() {
    if(this.state.redirect){
      return (<Redirect to={"/login"}/>)
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar 
          onClickAddWorkspace={this.handleAddWorkspace}
          onClickEditWorkspace={this.handleEditWorkspace}
          onClickDeleteWorkspace={this.handleDeleteWorkspace}
          onClickAddTodo={this.handleAddTodo}
          onClickTodo={this.handleClickTodo}
          onClickLogout={this.handleLogout}
        />
      
        <Layout>
          <HomeContent 
            todoId={this.state.currentTodoId}
            onClickEditTodo={this.handleEditTodo}
            onClickDeleteTodo={this.handleDeleteTodo}
            onClickAddTodoDetails={this.handleAddTodoDetails}
            onClickEditTodoDetails={this.handleEditTodoDetails}
            onClickDeleteTodoDetails={this.handleDeleteTodoDetails}
            onToggleComplete={this.handleOnToggleComplete}/>
        </Layout>
        <InputDialog ref={i => this.inputDialogRef = i} />
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentTodo: (todo) => dispatch(getCurrentTodo(todo)),
    deleteWorkspace: (id) => dispatch(deleteWorkspace(id)),
    deleteTodo: (id) => dispatch(deleteTodo(id)),
    deleteTodoDetails: (id) => dispatch(deleteTodoDetails(id)),
    toggleCompleteTodoDetails: (id, isCompleted) => dispatch(toggleCompleteTodoDetails(id, isCompleted)),
    getAllTodoDetails: (todoId) => dispatch(getAllTodoDetails(todoId))
  }
}

export default connect(null, mapDispatchToProps)(HomeScreen)