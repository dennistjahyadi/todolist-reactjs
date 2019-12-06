import React from 'react';
import { Form, Icon, Input, Button, Row, Col, Modal } from 'antd';
import { Redirect } from "react-router-dom";
import AuthAPI from "../../api/auth"
import 'antd/dist/antd.css';
import './index.css';

class LoginScreen extends React.Component {
  state = { username: "", password: "", redirect: false };

  // handleChange = e => {
  //   this.state({
  //     [e.target.id]: e.target.value
  //   })
  // }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try{
          const result = await AuthAPI.login(values.username, values.password)
          sessionStorage.setItem('userLoggedIn', JSON.stringify({ id: result.id, username: result.username, token: result.token }))
          this.setState({redirect: true})
        }catch(err){
          sessionStorage.removeItem('userLoggedIn')
          this.setState({redirect: false})
          this.loginFailed()
        }
      }
    });
  };

  loginFailed = () => {
    Modal.error({
      title: 'Login Failed',
      content: 'Wrong username or password',
    });
  }

  componentDidMount(){
    if(AuthAPI.isLoggedIn()) this.setState({redirect: true})
    else this.setState({redirect: false})
  }

  render() {
    if(this.state.redirect){
      return (<Redirect to={"/"}/>)
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
        <Col>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
            
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedLoginScreen = Form.create({ name: 'login_form' })(LoginScreen);

export default WrappedLoginScreen