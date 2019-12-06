import React from 'react';
import { Modal, Input } from 'antd';
import { connect } from 'react-redux'
import { createWorkspace } from "../../actions/workspace"

class AddWorkspaceDialog extends React.Component {
  state = { value: "", visible: false };
  
  showModal = () => this.setState({ visible: true, value: "" });
  handleOnChange = e => this.setState({value: e.target.value})
  handleCancel = e => this.setState({visible: false})

  handleOk = e => {
    this.props.createWorkspace(this.state.value)
    this.setState({value: "", visible: false})
  };

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <Modal
          title={"Add Workspace"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input value={this.state.value} onChange={this.handleOnChange}></Input>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createWorkspace: (workspace) => dispatch(createWorkspace(workspace))
  }
}

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(AddWorkspaceDialog)