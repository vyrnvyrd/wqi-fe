import { images } from "../../constant";
import { Input, Form, Button, ConfigProvider } from "antd";
import Toast from "../../components/Toast";
import { toast } from 'react-toastify';
import { post } from "../../api";
import apiUrls from "../../constant/apiUrls";

const Login = () => {
  const [form] = Form.useForm();

  const onLogin = () => {
    if (!form?.getFieldsValue()?.username || !form?.getFieldsValue()?.password) {
      toast.error(<Toast message='Error' detailedMessage='Username/password is required!' />);
      return
    }

    const body = {
      username: form?.getFieldsValue()?.username,
      password: form?.getFieldsValue()?.password
    }
    post(apiUrls.LOGIN_URL, body).then(async response => {
      const { status } = response
      if (status === 200) {
        toast.success(<Toast message='Success' detailedMessage={response?.data?.detail} />);
        localStorage.setItem('authenticated', true)
      } else {
        toast.error(<Toast message='Error' detailedMessage={response?.data?.detail} />);
      }
    })
  }

  return (
    <div className={`h-screen flex bg-login-img justify-center items-center`}>
      <div className="bg-white w-[1300px] lg:grid lg:grid-cols-3 rounded-xl h-[650px]">
        <div className="flex justify-center items-center h-full">
          <div>
            <img src={images.logo} alt="img-login" className="m-auto"></img>
            <p className="text-center text-[30px] font-bold">Welcome Back</p>
            <Form className="mt-10" form={form}>
              <Form.Item
                rules={[{ required: true, message: 'Username is required!' }]}
                className="mb-4"
                name="username"
              >
                <Input placeholder="Username" className="h-[40px]"></Input>
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: 'Password is required!' }]}
                name='password'
              >
                <Input.Password placeholder="Password" className="h-[40px]"></Input.Password>
              </Form.Item>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#FA9746'
                  },
                }}
              >
                <Button onClick={onLogin} type='text' htmlType="submit" className='bg-[#F7B648] text-white font-bold w-full h-[40px] mt-5'>
                  Login
                </Button>
              </ConfigProvider>
            </Form>
          </div>
        </div>
        <div className="max-md:hidden col-span-2 flex justify-center items-center">
          <img src={images.img_login} alt="img-login" className="h-[80%]"></img>
        </div>
      </div>
    </div>
  )
}

export default Login;