import { useDispatch } from 'react-redux';
import { Button, Form, Input,message } from 'antd';
import axios from "axios";

function Signup() {
    const dispatch=useDispatch();

    const signUp=async ({userId,password,nickname})=>{
        try{
        const result = await axios({
            method: "get",
            url: `http://localhost:3001/user/login`,
            headers: {
            Accpet: "application/json",
            },
            withCredentials: true,
            data: { userId, password ,nickname},
        });
        const userInfo=result.data;
        dispatch({type:"accountSlice/login",payload:userInfo});
        }catch(err){
        message.error(`failed post${userId}     ,     ${password}`);
        }
    };
    const onFinish = (values) => {
        signUp(values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return(
        <div>
            <h1>SiginUp</h1>
        <Form
        name="basic"
        labelCol={{
            span: 5,
        }}
        wrapperCol={{
            span: 16,
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Form.Item
            name="userId"
            label="userId"
            rules={[
            
            {
                required: true,
                message: 'Please input your userId!',
            },
            ]}
            >
                <Input />
            </Form.Item>

        <Form.Item
            name="password"
            label="Password"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            () => ({
                validator(_, value) {
                  const special_pattern = /[~!@#$%^&*()_+|<>?:{}]/;
                  if (!value|| (special_pattern.test(value) === true&&value.length>7)){
                  
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('비밀번호는 8자리 이상이고 특수 문자를 가져야합니다.'));
                },
              }),
            ]}
            hasFeedback
            >
                <Input.Password />
            </Form.Item>

        <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
            {
                required: true,
                message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
            }),
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            name="nickname"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[
            {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true,
            },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item  >
            <Button type="primary" htmlType="submit">
            Register
            </Button>
        </Form.Item>
        </Form>
        </div>
    )
}

export default Signup;