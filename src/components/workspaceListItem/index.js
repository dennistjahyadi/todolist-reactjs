import React from 'react';
import { Icon, Layout, Collapse, Menu, Typography, Row, Col, Modal } from 'antd';
import TodoListItem from "../todoListItem"
import 'antd/dist/antd.css';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const { Title } = Typography;
const { confirm } = Modal;
const { Panel } = Collapse;

class WorkspaceListItem extends React.Component {
  state = { visible: false, title: "", value: "" };

  constructor(props){
    super(props)
  }

  render() {
    const { item } = this.props
    return (
    <div>
      <Row style={{...myStyle.rowColor, marginBottom: 10}}>
        <Col span={20}>
          <Collapse style={myStyle.rowColor}>
            <Panel header={item.name} key="1" style={myStyle.rowColor}>
              <TodoListItem/>
            </Panel>
          </Collapse>
        </Col>
        <Col span={4}>
          <Icon type="edit" style={{color: "blue"}} onClick={this.props.onClickEditWorkspace}/>
            <br/>
          <Icon type="delete" style={{color: "red"}} onClick={this.props.onClickDeleteWorkspace}/>
        </Col>
      </Row>
    </div>
    );
  }
}
const myStyle = {
  rowColor: { backgroundColor: "white", borderColor: "white" }
};
export default WorkspaceListItem