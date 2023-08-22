import { Button, ConfigProvider } from "antd";
import { useNavigate } from "react-router";

const ManageWater = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div>
        <p className="text-[25px] font-bold">Kelola Kualitas Air</p>
        <p className="text-[15px]"><span className="text-[#FA9746]">Kelola Kualitas Air </span>/<span className="text-[#808080]"> Daftar</span></p>
      </div>
      <div className="bg-[#EAF3FA] rounded-xl mt-10 p-7">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#FA9746'
            },
          }}
        >
          <Button onClick={() => navigate('/manage-water/create')} type='text' htmlType="submit" className='bg-[#F7B648] text-white font-bold h-[40px]'>
            Tambah Data
          </Button>
        </ConfigProvider>
      </div>
    </div>
  )
}

export default ManageWater;
