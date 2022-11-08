import { useDispatch } from 'react-redux';
import { Button, Form, Input,Modal } from 'antd';

import { signUp } from '../../api/userapi';

/*req
{
”message” : “success”,
"data":{ user_id, password ,nickname}
}

res
{message: "success", accessToken : accessToken, userInfo : userData}
userData  = { 
        login_id: user_id,
        nickname: nickname,
        password: password,
        address: "",
        token_amount : ,
        eth_amount :  
        privateKey :
    }
*/
function Signup() {
    const dispatch=useDispatch();

    
    
    const success = (message) => {
        Modal.success({
          content: `회원가입에 성공 했습니다. 아래는 privateKey로 서명에 필요하니 잊어버리지 마십쇼\n ${message}`,
        });
      };
    const onFinish = async (values) => {
        const userInfo=await signUp(values);
        dispatch({type:"accountSlice/login",payload:userInfo});
        success(userInfo.privateKey);

      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return(
        <div style={{marginTop:"10vh"}}>
        <h1 style={{margin:"8vh"}} align="center">Enjoy 7ZO!</h1>
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
            name="user_id"
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
        <Form.Item  align="center">
            <Button type="primary" htmlType="submit">
            Register!
            </Button>
        </Form.Item>
        </Form>
        </div>
    )
}

export default Signup;