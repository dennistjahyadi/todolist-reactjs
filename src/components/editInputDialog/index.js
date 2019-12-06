import React from 'react';
import { Modal, Input } from 'antd';
import { connect } from 'react-redux'
import { editWorkspace } from "../../actions/workspace"

class editInputDialog extends React.Component {
  state = { value: "" };

  showModal = (id, title="", defaultValue="") => {
    this.setState({
      id,
      visible: true,
      title,
      value: defaultValue
    });
  };

  handleOk = e => {
    this.props.editWorkspace(this.state.id, this.state.value)
    this.setState({value: "", visible: false})
  };

  handleCancel = e => {
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
    editWorkspace: (id, name) => dispatch(editWorkspace(id, name))
  }
}

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(editInputDialog)