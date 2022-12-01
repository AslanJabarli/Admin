import { Button, Checkbox, Form, Input , Card , Col , Row} from 'antd';
import React , {useEffect} from 'react';
import { connect } from 'react-redux';
import { LoginUser , LogOutUser } from '../../redux/actions';


const Login = (props) => {
  const [form] = Form.useForm()
  const {LoginUser} = props
    

  useEffect(()=>{
    form.setFieldsValue({
        email:'eve.holt@reqres.in',
        password:'cityslicka'
    })
  }, [])

  const onFinish = (values) => {
    LoginUser(values.email , values.password , values.remember)
  };

//   "email": "eve.holt@reqres.in",
//     "password": "cityslicka"

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='myCard'>
            <Row>
                <Col xs={24}><h1 className='text-center'>Login</h1></Col>
                <Col span={12} offset={6} >
                    <Form
                        form={form}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input defaultValue={'eve.holt@reqres.in'} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                        
                            rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            ]}
                        >
                            <Input.Password defaultValue={'cityslicka'} />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
    </div>
  );
};




export default connect(null , {LoginUser , LogOutUser})(Login)
  
