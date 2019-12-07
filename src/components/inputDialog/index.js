import React from 'react';
import { Modal, Input } from 'antd';
import { connect } from 'react-redux'
import { createWorkspace, editWorkspace } from "../../actions/workspace"
import { createTodo, editTodo } from "../../actions/todo"
import { createTodoDetails, editTodoDetails } from "../../actions/todoDetails"

class InputDialog extends React.Component {
  state = { visible: false, title: "", value: "" };

  /**
   * @param {string} type: create|edit
   * @param {string} table: workspaces|todos|todoDetails
   * @param {string} id 
   * @param {string} title
   * @param {string} defaultValue
   * @param {object} extraData
   */
  showModal = (type, table, id=null,  title="", defaultValue="", extraData={}) => {
    this.setState({
      id, type, table,
      visible: true,
      title,
      value: defaultValue,
      extraData
    });
  };

  handleOk = e => {
    const { id, type, table, extraData, value } = this.state
    if(type==="create"){
      if(table === "workspaces"){
        this.props.createWorkspace(value)
      }else if(table === "todos"){
        this.props.createTodo(extraData.workspaceId, value)
      }else if(table === "todoDetails"){
        this.props.createTodoDetails(extraData.todoId, value)
      }
    }else if(type === "edit"){
      if(table === "workspaces"){
        this.props.editWorkspace(id, value)
      }else if(table === "todos"){
        this.props.editTodo(id, value)
      }else if(table === "todoDetails"){
        this.props.editTodoDetails(id, value)
      }
    }
    this.setState({ visible: false });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  
  handleOnChange = e => {
    this.setState({value: e.target.value})
  }

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <Modal
          title={this.state.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <Input value={this.state.value} onChange={this.handleOnChange}></Input>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createWorkspace: (workspace) => dispatch(createWorkspace(workspace)),
    editWorkspace: (id, name) => dispatch(editWorkspace(id, name)),
    createTodo: (workspaceId, content) => dispatch(createTodo(workspaceId, content)),
    editTodo: (id, content) => dispatch(editTodo(id, content)),
    createTodoDetails: (todoId, content) => dispatch(createTodoDetails(todoId, content)),
    editTodoDetails: (id, content) => dispatch(editTodoDetails(id, content))
  }
}

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(InputDialog)
