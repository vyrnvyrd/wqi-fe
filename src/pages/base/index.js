import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { images } from "../../constant";
import { Avatar, Dropdown } from "antd";
import { UserOutlined, DownOutlined, FileTextOutlined } from '@ant-design/icons';

const Base = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isExpand, setIsExpand] = useState(false);
  const [items, setItems] = useState([{
    key: 'logout',
    label: 'Logout'
  }]);

  const onClick = ({ key }) => {
    localStorage.clear()
    navigate('/')
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated')
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
  }, [])

  return (
    <div>
      <div className="mr-[20px] w-screen fixed bg-[#2B468B] h-[70px] border-b-2 border-amber-500 flex justify-end items-center">
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <div className="mr-[40px] flex text-white">
            <Avatar size={50} className="bg-white" icon={<UserOutlined className="text-[#FA9746]" />} />
            <div className="ml-[15px] my-auto">
              <p className="font-bold">Firna Firdiani</p>
              <p className="text-[14px]">Admin</p>
            </div>
            <DownOutlined className="ml-[70px] text-[#FA9746] my-auto text-[20px] cursor-pointer" />
          </div>
        </Dropdown>
      </div>
      <div
        className={`md:bg-[#2B468B] md:w-[80px] ${isExpand ? 'md:w-[300px]' : ''} md:fixed md:h-screen border-r-2 border-amber-500 transition-all duration-500 ease-in-out`}
        onMouseEnter={() => setIsExpand(!isExpand)}
        onMouseLeave={() => setIsExpand(!isExpand)}
      >
        <div className="flex justify-center mt-[20px]">
          <img src={images.logo_2} className="w-[50px]"></img>
        </div>
        <div className={`mt-[50px] mx-[17px] ${pathname === '/manage-water' ? 'text-[#2B468B]' : 'text-white'}`}>
          <div className={
            `flex cursor-pointer 
            ${pathname === '/manage-water' ? 'bg-white rounded-lg py-2' : ''}
            ${isExpand ? 'w-full' : 'w-[40px]'}`
          }>
            <div className="w-[50px] flex justify-center">
              <FileTextOutlined className="text-[40px]" />
            </div>
            {
              isExpand ?
                <p className="ml-[20px] my-auto truncate">Manage Water Quality</p> :
                <></>
            }
          </div>
        </div>
      </div>
      <div className="ml-[90px] pt-[80px] pb-[30px] h-screen overflow-auto z-5">
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tess</div>
        <div>tessaaaaa</div>
      </div>
    </div>
  )
}

export default Base;