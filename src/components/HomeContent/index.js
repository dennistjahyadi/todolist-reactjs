import React from 'react';
import { Layout, Button, Breadcrumb, Typography, List, Checkbox, Icon } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import { getAllTodoDetails } from "../../actions/todoDetails"

const { Content } = Layout;
const { Title } = Typography;

//  props:
//  onClickEditTodo: function|required () => { return (todoId, content) }
//  onClickDeleteTodo: function|required () => { return (todoId) }
//  onClickAddTodoDetails: function|required () => { return (todoId) }
//  onClickEditTodoDetails: function|required () => { return (todoDetailsId) }
//  onClickDeleteTodoDetails: function|required () => { return (todoDetailsId) }
//  todo: object|required
//  workspace: string|required
class HomeContent extends React.Component {
  state = { todoDetails: [] }

  handleEditTodo = () => this.props.onClickEditTodo(this.props.currentTodo.id, this.props.currentTodo.content)
  handleDeleteTodo = () => this.props.onClickDeleteTodo(this.props.currentTodo.id)
  handleAddTodoDetails = () => this.props.onClickAddTodoDetails(this.props.currentTodo.id)
  handleEditTodoDetails = (todoDetailsId, content) => this.props.onClickEditTodoDetails(todoDetailsId, content)
  handleDeleteTodoDetails = (todoDetailsId) => this.props.onClickDeleteTodoDetails(todoDetailsId)
  fetchData = () => (this.props.currentTodo.id)? this.props.getAllTodoDetails(this.props.currentTodo.id) : null
  
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.fetchData()
  }

  render() {
    if(!this.props.currentTodo || !this.props.currentWorkspace) return null
    return (
      <Content style={{ margin: '25px', minHeight: 360, background: '#fff'  }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Workspace: {this.props.currentWorkspace.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Title level={2}>
          {this.props.currentTodo.content}
          <Button onClick={this.handleEditTodo} type="primary" shape="circle" icon="edit" style={{marginLeft: 10}}></Button>
          <Button onClick={this.handleDeleteTodo} type="danger" shape="circle" icon="delete" style={{marginLeft: 10}}></Button>
        </Title>
        <Button onClick={this.handleAddTodoDetails} type="primary" icon="add" style={{backgroundColor: "green", borderColor: "green"}}>Add Todo Items</Button>
        {this.state.todoDetails.map(item => {
          const editButton = <Icon type="edit" style={{color: "blue"}} onClick={() => this.handleEditTodoDetails(item.id, item.content)}/>
          const deleteButton = <Icon type="delete" style={{color: "red"}} onClick={() => this.handleDeleteTodoDetails(item.id)}/>
          return(
            <List.Item style={{ display: "flex", marginLeft: 100}} 
              actions={[editButton, deleteButton]}>
              <Checkbox>{item.title}</Checkbox>
            </List.Item>
          )
        })}
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
    return {
    todoDetails: state.todoDetails.list,
    currentWorkspace: state.workspace.currentWorkspace,
    currentTodo: state.todo.currentTodo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTodoDetails: (todoId) => dispatch(getAllTodoDetails(todoId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeContent)