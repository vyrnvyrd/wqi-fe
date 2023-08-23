import { Input, Form, Select, Upload, InputNumber, ConfigProvider, Button } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router";
import Toast from "../../../components/Toast";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";

const ManageWaterForm = () => {
  const navigate = useNavigate()
  const [formInfoWater] = Form.useForm()
  const { TextArea } = Input;
  const { Dragger } = Upload;
  const [optKecamatan, setOptKecamatan] = useState([]);
  const [optKelurahan, setOptKelurahan] = useState([]);
  const optionsKota = [
    {
      value: '3273',
      label: 'KOTA BANDUNG'
    }
  ]

  const onSubmit = () => {
    console.log('here')
  }

  const onFinishFailed = () => {
    toast.error(<Toast message='Error' detailedMessage='Field wajib diisi!' />);
  }

  const setInitialValue = () => {
    formInfoWater.setFieldsValue({
      ...formInfoWater,
      kota: '3273'
    })
  }

  const getKecamatan = async () => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/3273.json`)
      .then(response => response.json())
      .then(districts => {
        setOptKecamatan([...districts.map(el => ({ value: el?.id, label: el?.name }))])
      });
  }

  const getKelurahan = async (id) => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`)
      .then(response => response.json())
      .then(villages => {
        setOptKelurahan([...villages.map(el => ({ value: el?.id, label: el?.name }))])
      });
  }

  useEffect(() => {
    setInitialValue();
    getKecamatan();
  })

  return (
    <div>
      <Form form={formInfoWater} layout="vertical" onFinishFailed={onFinishFailed}>
        <div>
          <p className="text-[25px] font-bold">Kelola Kualitas Air</p>
          <p className="text-[15px]"><span className="text-[#FA9746]">Kelola Kualitas Air </span>/<span className="text-[#808080]"> Tambah Data</span></p>
        </div>

        <div className="bg-[#EAF3FA] rounded-xl mt-10 p-3">
          <p className="font-bold">Info Sumur</p>
          <div className="grid grid-cols-2 gap-x-5 mt-4">
            <Form.Item
              label="Nama Sumur"
              className="font-bold"
              name="nama_sumur"
              rules={[{ required: true, message: 'Nama Sumur wajib diisi!' }]}
            >
              <Input
                className="font-normal h-[40px]"
                placeholder="Isi nama sumur"
              />
            </Form.Item>
            <Form.Item
              label="Kota"
              className="font-bold"
              name="kota"
            >
              <Select
                className="font-normal"
                disabled
                options={optionsKota}
              />
            </Form.Item>
            <Form.Item
              label="Kecamatan"
              className="font-bold"
              name='kecamatan'
              rules={[{ required: true, message: 'Kecamatan wajib diisi!' }]}
            >
              <Select
                className="font-normal"
                placeholder="Pilih kecamatan"
                options={optKecamatan}
                onChange={getKelurahan}
              />
            </Form.Item>
            <Form.Item
              label="Kelurahan"
              className="font-bold"
              name='kelurahan'
              rules={[{ required: true, message: 'Kelurahan wajib diisi!' }]}
            >
              <Select
                className="font-normal"
                placeholder="Pilih kelurahan"
                options={optKelurahan}
                disabled={!formInfoWater?.getFieldsValue()?.kecamatan}
              />
            </Form.Item>
            <Form.Item
              label="Alamat"
              className="font-bold"
              name="alamat"
              rules={[{ required: true, message: 'Alamat wajib diisi!' }]}
            >
              <TextArea
                className="font-normal"
                placeholder="Isi alamat"
                style={{ height: '181px' }}
              />
            </Form.Item>
            <Form.Item
              label="Unggah Dokumen"
              className="font-bold"
              name='dokumen'
              rules={[{ required: true, message: 'Dokumen wajib diisi!' }]}
            >
              <Dragger
                style={{ backgroundColor: 'white', padding: '5px' }}
                maxCount={1}
                accept=".pdf"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Klik atau seret file ke area ini untuk mengunggah</p>
                <p className="ant-upload-hint">
                  Dukungan untuk satu unggahan. Dilarang keras mengunggah data perusahaan atau file terlarang lainnya.
                </p>
              </Dragger>
            </Form.Item>
          </div>
        </div>
        <div className="bg-[#EAF3FA] rounded-xl mt-10 p-3">
          <p className="font-bold">Analisis Air</p>
          <div className="grid grid-cols-4 gap-x-5 mt-4">
            <Form.Item
              label="Zat Organik (mg/l)"
              className="font-bold"
              name='zat_organik'
              rules={[{ required: true, message: 'Zat organik wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Isi zat organik"
              />
            </Form.Item>
            <Form.Item
              label="Zat padat terlarut (mg/l)"
              className="font-bold"
              name='tds'
              rules={[{ required: true, message: 'Zat padat terlarut wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Isi zat padat terlarut"
              />
            </Form.Item>
            <Form.Item
              label="Mangan (mg/l)"
              className="font-bold"
              name='mangan'
              rules={[{ required: true, message: 'Mangan wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Isi mangan"
              />
            </Form.Item>
            <Form.Item
              label="Klorida (mg/l)"
              className="font-bold"
              name='klorida'
              rules={[{ required: true, message: 'Klorida wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Isi klorida"
              />
            </Form.Item>
            <Form.Item
              label="Kekeruhan (NTU)"
              className="font-bold"
              name='kekeruhan'
              rules={[{ required: true, message: 'Kekeruhan wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Isi kekeruhan"
              />
            </Form.Item>
            <Form.Item
              label="Fluorida (mg/l)"
              className="font-bold"
              name='fluorida'
              rules={[{ required: true, message: 'Fluorida wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Isi fluorida"
              />
            </Form.Item>
            <Form.Item
              label="pH (-)"
              className="font-bold"
              name='ph'
              rules={[{ required: true, message: 'pH wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Isi pH"
              />
            </Form.Item>
            <Form.Item
              label="Kesadahan (mg/l)"
              className="font-bold"
              name='kesadahan'
              rules={[{ required: true, message: 'Kesadahan wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Isi kesadahan"
              />
            </Form.Item>
            <Form.Item
              label="Sulfat (mg/l)"
              className="font-bold"
              name='sulfat'
              rules={[{ required: true, message: 'Sulfat wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Isi sulfat"
              />
            </Form.Item>
            <Form.Item
              label="Suhu (C)"
              className="font-bold"
              name='suhu'
              rules={[{ required: true, message: 'Suhu wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Isi suhu"
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#FA9746'
              },
            }}
          >
            <Button onClick={() => navigate('/manage-water')} type='text' className='button-cancel mr-5 font-bold h-[40px]'>
              Kembali
            </Button>
            <Button onClick={onSubmit} type='text' htmlType="submit" className='bg-[#F7B648] text-white font-bold h-[40px]'>
              Simpan
            </Button>
          </ConfigProvider>
        </div>
      </Form>
    </div>
  )
}

export default ManageWaterForm;