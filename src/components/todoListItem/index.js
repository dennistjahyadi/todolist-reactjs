import React from 'react';
import { Typography } from 'antd';
import 'antd/dist/antd.css';
const { Paragraph } = Typography;

class TodoListItem extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
    <div>
      <Paragraph onClick={this.props.onClickTodoItems}>{this.props.todo}</Paragraph>
    </div>
    );
  }
}
export default TodoListItem