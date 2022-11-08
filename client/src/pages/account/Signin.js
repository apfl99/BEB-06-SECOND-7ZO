import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
//import axios from "axios";
import { logIn } from "../../api/apiindex";
/*req
{
”message” : “success”,
"data":{ user_id, password }
}

res
{message: "success", accessToken : accessToken, userInfo : userData}
userData  = { 
        login_id: user_id,
        nickname: nickname,
        password: password,
        address: "",
        token_amount : 0,
        eth_amount : 0 
    }
*/
function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /** 로그인 함수*/
  /*const logIn=async ({user_id,password})=>{
    try{
      const result = await axios({
        method: "post",
        url: `http://localhost:3001/user/login`,
        headers: {
          Accpet: "application/json",
        },
        withCredentials: true,
        data: { user_id, password },
      });
      const response=result.data;
      const userInfo={...response.userInfo,accessToken:response.accessToken};
      console.log(userInfo);
      dispatch({type:"accountSlice/login",payload:userInfo});
    }catch(err){
      message.error(`failed post${user_id}     ,     ${password}`);
    }
  };*/
  /** form제출 성공시*/
  const onFinish = async (values) => {
    const userInfo = await logIn(values);
    dispatch({ type: "accountSlice/login", payload: userInfo });
    navigate("/");
  };
  /** form제출 실패시*/
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
      style={{ marginTop: "5vh" }}
    >
      <Form.Item
        label="UserID"
        name="user_id"
        rules={[
          {
            required: true,
            message: "아이디를 입력해주세요!",
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
            message: "비밀번호를 입력해주세요!",
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
        <Button type="primary" onClick={() => navigate("/signup")}>
          회원가입
        </Button>
        <Button type="primary" htmlType="submit">
          로그인
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Signin;
