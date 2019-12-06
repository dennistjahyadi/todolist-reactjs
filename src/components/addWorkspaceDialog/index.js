import React from 'react';
import { Modal, Input } from 'antd';
import WorkspaceAPI from '../../api/workspace';
import { connect } from 'react-redux'
import { createWorkspace } from "../../actions/workspace"

class AddWorkspaceDialog extends React.Component {
  state = { value: "" };


  handleOk = async e => {
    //const result = await WorkspaceAPI.create(this.state.value)
    this.props.createWorkspace(this.state.value)
    this.props.onComplete()
    this.setState({value: ""})
  };

  handleCancel = e => {
    this.setState({ visible: false });
  };
  
  handleOnChange = e => {
    this.setState({value: e.target.value})
  }

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.setState({visible: this.props.show})
  }

  render() {
    return (
      <div>
        <Modal
          title={"Add Workspace"}
          visible={this.props.show}
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

export default connect(null, mapDispatchToProps)(AddWorkspaceDialog)