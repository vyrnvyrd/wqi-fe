import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router";
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
  const isAuthenticated = localStorage.getItem('authenticated')
  const dataUser = JSON.parse(localStorage.getItem('data'))

  const onClick = ({ key }) => {
    localStorage.clear()
    navigate('/')
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
  }, [])

  return (
    <div>
      <div className="mr-[20px] w-screen fixed bg-[#2B468B] h-[70px] border-b-2 border-amber-500 flex justify-end items-center z-10">
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <div className="mr-[40px] flex text-white">
            <Avatar size={50} className="bg-white" icon={<UserOutlined className="text-[#FA9746]" />} />
            <div className="ml-[15px] my-auto">
              <p className="font-bold">{dataUser?.username}</p>
              <p className="text-[14px]">{dataUser?.role}</p>
            </div>
            <DownOutlined className="ml-[70px] text-[#FA9746] my-auto text-[20px] cursor-pointer" />
          </div>
        </Dropdown>
      </div>
      <div
        className={`md:bg-[#2B468B] ${isExpand ? 'md:w-[300px]' : 'md:w-[80px]'} md:fixed md:h-screen border-r-2 border-amber-500 transition-all duration-500 ease-in-out z-10`}
        onMouseEnter={() => setIsExpand(true)}
        onMouseLeave={() => setIsExpand(false)}
      >
        <div className="flex justify-center mt-[20px]">
          <img src={images.logo_2} className="w-[50px]"></img>
        </div>
        <div className={`mt-[50px] mx-[18px] ${pathname === '/manage-water' ? 'text-[#2B468B]' : 'text-white'}`}
          onClick={() => navigate('/manage-water')}
        >
          <div className={
            `flex cursor-pointer 
            ${pathname === '/manage-water' ? 'bg-white rounded-lg py-2' : ''}
            ${isExpand ? 'w-full' : 'w-[40px]'}`
          }>
            <div className="w-[50px] flex justify-center">
              <FileTextOutlined className="text-[30px]" />
            </div>
            {
              isExpand ?
                <p className="ml-[20px] my-auto truncate">Kelola Kualitas Air</p> :
                <></>
            }
          </div>
        </div>
      </div>
      <div className="ml-[100px] mr-[20px] pt-[80px] pb-[30px] h-screen overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Base;