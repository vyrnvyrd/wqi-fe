import { Button, ConfigProvider, Table } from "antd";
import { useNavigate } from "react-router";

const ManageWater = () => {
  const navigate = useNavigate()

  const columns = [
    {
      title: 'Nama Sumur',
      dataIndex: 'nama_sumur',
    },
    {
      title: 'Alamat Sumur',
      dataIndex: 'alamat',
    },
    {
      title: 'Kualitas Air',
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
            {record?.status_view}
          </div>
        );
      }
    },
    {
      title: 'Action',
      dataIndex: 'id',

    },
  ];
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

        <Table
          className="mt-5"
          columns={columns}
        />
      </div>
    </div>
  )
}

export default ManageWater;
