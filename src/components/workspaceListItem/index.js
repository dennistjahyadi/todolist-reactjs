import React from 'react';
import { Icon, Layout, Collapse, Menu, Typography, Row, Col, Modal } from 'antd';
import TodoListItem from "../todoListItem"
import 'antd/dist/antd.css';
const { Panel } = Collapse;

class WorkspaceListItem extends React.Component {
  state = { visible: false, title: "", value: "" };

  handleEdit = () => {
    this.props.onClickEditWorkspace(this.props.item.id, this.props.item.name)
  }

  handleDelete = () => {
    this.props.onClickDeleteWorkspace(this.props.item.id)
  }

  constructor(props){
    super(props)
  }

  render() {
    const { item } = this.props

    return (
      <Row style={{...myStyle.rowColor, marginBottom: 10}}>
        <Col span={20}>
          <Collapse style={myStyle.rowColor}>
            <Panel header={item.name} key="1" style={myStyle.rowColor}>
              <TodoListItem/>
            </Panel>
          </Collapse>
        </Col>
        <Col span={4}>
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
export default WorkspaceListItem