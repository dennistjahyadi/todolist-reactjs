import React from 'react';
import { Icon, Button, Collapse, List, Typography, Row, Col, Menu } from 'antd';
import TodoListItem from "../todoListItem"
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import { getAllTodo } from "../../actions/todo"
import { Link } from "react-router-dom";
const { Panel } = Collapse;
const { Text } = Typography;
class WorkspaceListItem extends React.Component {
  state = { visible: false, title: "", value: "" };

  handleEdit = () => {
    this.props.onClickEditWorkspace(this.props.item.id, this.props.item.name)
  }

  handleDelete = () => {
    this.props.onClickDeleteWorkspace(this.props.item.id)
  }

  handleAddTodo = () => {
    this.props.onClickAddTodo(this.props.item.id)
  }

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.getAllTodo(this.props.item.id)
  }

  render() {
    const { item } = this.props

    return (
      <Row style={{...myStyle.rowColor, marginBottom: 10}}>
        <Col span={21}>
          <Collapse style={myStyle.rowColor}>
            <Panel header={item.name} key="1" style={myStyle.rowColor}>
              <Button onClick={this.handleAddTodo}><Icon type="plus" style={{color: "green"}} /> Add Todo</Button>
              {(this.props.item)?this.props.item.Todos.map(todo => {
                const url = "/todo/" + todo.id
                return (
                <List.Item key={todo.id}>
                  <Link to={url}>
                    <Text onClick={() => this.props.onClickTodo(todo)} style={{display: "flex"}} >{todo.content}</Text>
                  </Link>
                </List.Item>
                )
              }) : null }
              
              <TodoListItem/>
            </Panel>
          </Collapse>
        </Col>
        <Col span={3}>

          <Icon type="edit" style={{color: "blue"}} onClick={this.handleEdit}/>
            <br/>
          <Icon type="delete" style={{color: "red"}} onClick={this.handleDelete}/>
        </Col>
      </Row>
    );
  }
}
const myStyle = {
  rowColor: { backgroundColor: "white", borderColor: "white" }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTodo: (workspaceId) => dispatch(getAllTodo(workspaceId))
  }
}

export default connect(null, mapDispatchToProps)(WorkspaceListItem)
