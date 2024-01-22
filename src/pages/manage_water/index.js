import { Button, ConfigProvider, Table } from "antd";
import { useNavigate } from "react-router";
import { get } from "../../api";
import { apiUrls } from "../../constant";
import { useEffect, useState } from "react";
import Toast from "../../components/Toast";
import { toast } from 'react-toastify';
import { FolderOpenOutlined } from '@ant-design/icons';

const ManageWater = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])

  const columns = [
    {
      title: 'Name',
      key: 'nama_sumur',
      dataIndex: 'nama_sumur',
    },
    {
      title: 'Address',
      key: 'alamat',
      dataIndex: 'alamat',
    },
    {
      title: 'Water Quality',
      key: 'class_data',
      dataIndex: 'class_data',
      render: (data, record) => {
        return (
          <div
            className={
              `
                ml-3 py-1 px-2  rounded-lg border border-solid text-xs text-center
                ${data === 0 ? 'border-[#52C41A] text-[#52C41A] bg-[#B7EB8F]/20' : ''}
                ${data === 1 ? 'border-[#2F54EB] text-[#2F54EB] bg-[#ADC6FF]/20' : ''}
                ${data === 2 ? 'border-[#FA9746] text-[#FA9746] bg-[#FFE89E]/20' : ''}
                ${data === 3 ? 'border-[#F5222D] text-[#F5222D] bg-[#FFA39E]/20' : ''}
              `
            }
          >
            {data === 0 ? 'Potable' : data === 1 ? 'Slightly Polluted' : data === 2 ? 'Fairly Polluted' : 'Heavily Polluted'}
          </div>
        );
      }
    },
    {
      title: 'Action',
      key: 'id',
      dataIndex: 'id',
      render: (data) => (
        <FolderOpenOutlined
          style={{ fontSize: '30px' }}
          className='text-[#FA9746] cursor-pointer'
          onClick={() => { navigate(`/manage-water/edit/${data}`) }}
        />
      ),
    },
  ];

  const fetchList = () => {
    get(apiUrls.WATER_QUALITY_URL).then(async response => {
      const { status } = response
      if (status === 200) {
        setData(response.data)
      } else {
        toast.error(<Toast message='Error' detailedMessage={response?.data?.detail} />);
      }
    })
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div>
      <div>
        <p className="text-[25px] font-bold">Manage Water Quality</p>
        <p className="text-[15px]"><span className="text-[#FA9746]">Manage Water Quality </span>/<span className="text-[#808080]"> List</span></p>
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
            Add Data
          </Button>
        </ConfigProvider>

        <Table
          className="mt-5"
          columns={columns}
          dataSource={data.items}
          pagination={data}
        />
      </div>
    </div>
  )
}

export default ManageWater;
