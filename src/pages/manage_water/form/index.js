import { Input, Form, Select, Upload, InputNumber, ConfigProvider, Button } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useParams } from "react-router";
import Toast from "../../../components/Toast";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { post, get, put } from '../../../api'
import { apiUrls } from "../../../constant";

const ManageWaterForm = () => {
  const { id } = useParams()
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const [formInfoWater] = Form.useForm()
  const { TextArea } = Input;
  const { Dragger } = Upload;
  const [optKecamatan, setOptKecamatan] = useState([]);
  const [optKelurahan, setOptKelurahan] = useState([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState({});
  const [selectedKelurahan, setSelectedKelurahan] = useState({});
  const [idDokumen, setIdDokumen] = useState('');
  const [title, setTitle] = useState('Add Data');
  const [dataFile, setDataFile] = useState({})
  const [existingData, setExistingData] = useState({})
  const optionsKota = [
    {
      value: '3273',
      label: 'BANDUNG'
    }
  ]

  const onSubmit = () => {
    formInfoWater.validateFields().then((values) => {
      let body = {
        nama_sumur: formInfoWater?.getFieldsValue()?.nama_sumur,
        id_kota: optionsKota[0]?.value,
        nama_kota: optionsKota[0]?.label,
        id_kecamatan: selectedKecamatan?.value || existingData?.id_kecamatan,
        nama_kecamatan: selectedKecamatan?.label || existingData?.nama_kecamatan,
        id_kelurahan: selectedKelurahan?.value || existingData?.id_kelurahan,
        nama_kelurahan: selectedKelurahan?.label || existingData?.nama_kelurahan,
        alamat: formInfoWater?.getFieldsValue()?.alamat,
        id_dokumen: idDokumen || existingData?.id_dokumen,
        zat_organik: formInfoWater?.getFieldsValue()?.zat_organik,
        tds: formInfoWater?.getFieldsValue()?.tds,
        mangan: formInfoWater?.getFieldsValue()?.mangan,
        klorida: formInfoWater?.getFieldsValue()?.klorida,
        kekeruhan: formInfoWater?.getFieldsValue()?.kekeruhan,
        fluorida: formInfoWater?.getFieldsValue()?.fluorida,
        ph: formInfoWater?.getFieldsValue()?.ph,
        kesadahan: formInfoWater?.getFieldsValue()?.kesadahan,
        sulfat: formInfoWater?.getFieldsValue()?.sulfat,
        suhu: formInfoWater?.getFieldsValue()?.suhu
      };

      if (id) {
        put(`${apiUrls.WATER_QUALITY_URL}/${id}`, body).then(async response => {
          const { status } = response
          if (status === 200) {
            toast.success(<Toast message='Success' detailedMessage='Berhasil merubah data' />);
            navigate('/manage-water')
          } else {
            toast.error(<Toast message='Error' detailedMessage={response?.data?.detail} />);
          }
        })

        return
      }

      post(apiUrls.WATER_QUALITY_URL, body).then(async response => {
        const { status } = response
        if (status === 200) {
          toast.success(<Toast message='Success' detailedMessage='Berhasil menyimpan data' />);
          navigate('/manage-water')
        } else {
          toast.error(<Toast message='Error' detailedMessage={response?.data?.detail} />);
        }
      })
    }).catch(() => {
      return
    })
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
    const found = optKecamatan.findIndex(el => el?.value === id)
    formInfoWater.setFieldsValue({
      ...formInfoWater,
      kelurahan: null
    })
    if (found !== -1) {
      setSelectedKecamatan(optKecamatan[found])
    }

    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`)
      .then(response => response.json())
      .then(villages => {
        setOptKelurahan([...villages.map(el => ({ value: el?.id, label: el?.name }))])
      });
  }

  const onChangeKelurahan = async (id) => {
    const found = optKelurahan.findIndex(el => el?.value === id)
    if (found !== -1) {
      setSelectedKelurahan(optKelurahan[found])
    }
  }

  const uploadFile = async (opt) => {
    const { onSuccess, onError, file } = opt;

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64String = e.target.result.split(",")[1];
        const body = {
          file: base64String,
          title: file?.name
        }
        post(apiUrls.DOKUMEN_URL, body).then(async response => {
          const { status } = response
          if (status === 200) {
            setIdDokumen(response?.data?.id)
            onSuccess()
          } else {
            onError();
            toast.error(<Toast message='Error' detailedMessage={response?.data?.detail} />);
          }
        })
      };
      reader.readAsDataURL(file);
    }
  }

  const setTitlePage = () => {
    if (pathname.includes('edit')) {
      setTitle('Edit Data')
    }
  }

  const getDataById = () => {
    get(`${apiUrls.WATER_QUALITY_URL}/${id}`).then(async response => {
      const { status, data } = response
      if (status === 200) {
        const title = data?.file?.file?.split('/')
        setExistingData(data?.data)
        setDataFile({
          ...data?.file,
          title: title[1],
          id: data?.data?.id_dokumen
        })
        getKelurahan(data?.data?.id_kecamatan)
        formInfoWater.setFieldsValue({
          ...formInfoWater,
          nama_sumur: data?.data?.nama_sumur,
          kecamatan: data?.data?.id_kecamatan,
          kelurahan: data?.data?.id_kelurahan,
          alamat: data?.data?.alamat,
          zat_organik: data?.data?.zat_organik,
          tds: data?.data?.tds,
          mangan: data?.data?.mangan,
          klorida: data?.data?.klorida,
          fluorida: data?.data?.fluorida,
          ph: data?.data?.ph,
          kesadahan: data?.data?.kesadahan,
          sulfat: data?.data?.sulfat,
          suhu: data?.data?.suhu
        })
        setTimeout(() => {
          formInfoWater.setFieldsValue({
            ...formInfoWater,
            kekeruhan: data?.data?.kekeruhan,
          })
        }, 500)
      } else {
        toast.error(<Toast message='Error' detailedMessage={response?.data?.detail} />);
      }
    })
  }

  const downloadFile = () => {
    let query = {
      responseType: 'blob',
      query: {}
    }
    get(`${apiUrls.WATER_QUALITY_URL}/download/${dataFile?.id}`, query).then(async response => {
      const { status } = response
      if (status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]), { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${dataFile?.title}`);
        document.body.appendChild(link);
        link.click();
      } else {
        toast.error(<Toast message='Error' detailedMessage={response?.data?.detail} />);
      }
    })
  }

  useEffect(() => {
    setInitialValue();
    setTitlePage();
    getKecamatan();

    if (pathname.includes('edit')) {
      getDataById(id)
    }
  }, [])

  return (
    <div>
      <Form form={formInfoWater} layout="vertical" onFinishFailed={onFinishFailed}>
        <div>
          <p className="text-[25px] font-bold">Manage Water Quality</p>
          <p className="text-[15px]"><span className="text-[#FA9746]">Manage Water Quality </span>/<span className="text-[#808080]"> {title}</span></p>
        </div>

        <div className="bg-[#EAF3FA] rounded-xl mt-10 p-3">
          <p className="font-bold">Water Info</p>
          <div className="grid grid-cols-2 gap-x-5 mt-4">
            <Form.Item
              label="Name"
              className="font-bold"
              name="nama_sumur"
              rules={[{ required: true, message: 'Nama Sumur wajib diisi!' }]}
            >
              <Input
                className="font-normal h-[40px]"
                placeholder="Enter name"
              />
            </Form.Item>
            <Form.Item
              label="City"
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
              label="Subdistrict"
              className="font-bold"
              name='kecamatan'
              rules={[{ required: true, message: 'Kecamatan wajib diisi!' }]}
            >
              <Select
                className="font-normal"
                placeholder="Select subdistrict"
                options={optKecamatan}
                onChange={getKelurahan}
              />
            </Form.Item>
            <Form.Item
              label="Urban Village"
              className="font-bold"
              name='kelurahan'
              rules={[{ required: true, message: 'Kelurahan wajib diisi!' }]}
            >
              <Select
                className="font-normal"
                placeholder="Select urban village"
                onChange={onChangeKelurahan}
                options={optKelurahan}
                disabled={!formInfoWater?.getFieldsValue()?.kecamatan}
              />
            </Form.Item>
            <Form.Item
              label="Address"
              className="font-bold"
              name="alamat"
              rules={[{ required: true, message: 'Alamat wajib diisi!' }]}
            >
              <TextArea
                className="font-normal"
                placeholder="Enter address"
                style={{ height: '181px' }}
              />
            </Form.Item>
            <div className={`${id ? 'grid grid-cols-3 gap-5' : ''}`}>
              <Form.Item
                label="Upload Documents"
                className={`font-bold ${id ? 'col-span-2' : ''}`}
                name='dokumen'
                rules={[{ required: id ? false : true, message: 'Dokumen wajib diisi!' }]}
              >
                <Dragger
                  style={{ backgroundColor: 'white', padding: '5px' }}
                  maxCount={1}
                  accept=".pdf"
                  customRequest={uploadFile}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag files into this area to upload</p>
                  <p className="ant-upload-hint">
                    Support for single upload. Uploading company data or other prohibited files is strictly prohibited.
                  </p>
                </Dragger>
              </Form.Item>
              {
                id ?
                  <div>
                    <p className="mb-2 font-bold">Document Attachments</p>
                    <div className="bg-white rounded-lg my-auto h-[77%] flex justify-center items-center">
                      {
                        <a onClick={() => downloadFile(dataFile?.id)}>{dataFile?.title}</a>
                      }
                    </div>
                  </div> :
                  <></>
              }
            </div>
          </div>
        </div>
        <div className="bg-[#EAF3FA] rounded-xl mt-10 p-3">
          <p className="font-bold">Water Analysis</p>
          <div className="grid grid-cols-4 gap-x-5 mt-4">
            <Form.Item
              label="Organic (mg/l)"
              className="font-bold"
              name='zat_organik'
              rules={[{ required: true, message: 'Zat organik wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Enter organic"
              />
            </Form.Item>
            <Form.Item
              label="TDS (mg/l)"
              className="font-bold"
              name='tds'
              rules={[{ required: true, message: 'Zat padat terlarut wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Enter tds"
              />
            </Form.Item>
            <Form.Item
              label="Manganese (mg/l)"
              className="font-bold"
              name='mangan'
              rules={[{ required: true, message: 'Mangan wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Enter manganese"
              />
            </Form.Item>
            <Form.Item
              label="Chloride (mg/l)"
              className="font-bold"
              name='klorida'
              rules={[{ required: true, message: 'Klorida wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Enter chloride"
              />
            </Form.Item>
            <Form.Item
              label="Turbidity (NTU)"
              className="font-bold"
              name='kekeruhan'
              rules={[{ required: true, message: 'Kekeruhan wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Enter turbidity"
              />
            </Form.Item>
            <Form.Item
              label="Fluoride (mg/l)"
              className="font-bold"
              name='fluorida'
              rules={[{ required: true, message: 'Fluorida wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Enter fluoride"
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
                placeholder="enter ph"
              />
            </Form.Item>
            <Form.Item
              label="Total hardness (mg/l)"
              className="font-bold"
              name='kesadahan'
              rules={[{ required: true, message: 'Kesadahan wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Enter total hardness"
              />
            </Form.Item>
            <Form.Item
              label="Sulfate (mg/l)"
              className="font-bold"
              name='sulfat'
              rules={[{ required: true, message: 'Sulfat wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Enter sulfate"
              />
            </Form.Item>
            <Form.Item
              label="Temperature (C)"
              className="font-bold"
              name='suhu'
              rules={[{ required: true, message: 'Suhu wajib diisi!' }]}
            >
              <InputNumber
                className="font-normal h-[40px] w-full"
                placeholder="Enter temperature"
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
              Back
            </Button>
            <Button onClick={onSubmit} type='text' htmlType="submit" className='bg-[#F7B648] text-white font-bold h-[40px]'>
              Save
            </Button>
          </ConfigProvider>
        </div>
      </Form >
    </div >
  )
}

export default ManageWaterForm;