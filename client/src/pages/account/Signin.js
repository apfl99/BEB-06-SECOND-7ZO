
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Button, message, Form, Input } from 'antd';
import axios from "axios";
/*req
{
”message” : “success”,
”access_token”: “Token”(string)
}

res
*/
function Signin() {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const logIn=async ({userId,password})=>{
    try{
      const result = await axios({
        method: "get",
        url: `http://localhost:3001/user/login`,
        headers: {
          Accpet: "application/json",
        },
        withCredentials: true,
        data: { userId, password },
      });
      const userInfo=result.data;
      dispatch({type:"accountSlice/login",payload:userInfo});
    }catch(err){
      message.error(`failed post${userId}     ,     ${password}`);
    }
  };

  const onFinish = (values) => {
    logIn(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    
    <Form
      name="basic"
      labelCol={{
        span: 8,
        
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off" 
      style={{marginTop:'5vh'}}
    >
      <Form.Item
        label="UserID"
        name="userId"
        rules={[
          {
            required: true,
            message: '아이디를 입력해주세요!',
          },
          
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: '비밀번호를 입력해주세요!',
          },
          
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 12,
        }}
      >
        <Button type="primary" onClick={()=>navigate('/signup')}>
          회원가입
        </Button>
        <Button type="primary" htmlType="submit" >
          로그인
        </Button>
      </Form.Item>
      
    </Form>
    
  )
}
  
export default Signin;