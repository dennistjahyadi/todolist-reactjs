import React from 'react';
import { Modal, Input } from 'antd';

class InputDialog extends React.Component {
  state = { visible: false, title: "", value: "" };

  showModal = (title="", defaultValue="") => {
    this.setState({
      visible: true,
      title,
      value: defaultValue
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
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
          onCancel={this.handleCancel}
        >
          <Input value={this.state.value} onChange={this.handleOnChange}></Input>
        </Modal>
      </div>
    );
  }
}

export default InputDialog