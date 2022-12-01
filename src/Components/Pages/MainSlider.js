import { Space, Table, Tag, Switch, message, Popconfirm, notification   } from 'antd';
import React, {useState, useEffect, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import {admin} from '../../api/admin'
import { DeleteFilled , EditFilled  , LikeOutlined , LoadingOutlined ,
  PlusOutlined , SmileOutlined , WarningOutlined} from '@ant-design/icons';

function MainSlider(props) {

    const { t, i18n } = useTranslation();
    let lan = i18n.language

    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [img, setImg] = useState('');
    const [nameAz, setNameAz] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [nameDe, setNameDe] = useState('');
    const [textAz, setTextAz] = useState('');
    const [textEn, setTextEn] = useState('');
    const [textDe, setTextDe] = useState('');
    const [status, setStatus] = useState(true);
    
    const setKeys = (oldArray) => {
      let newArray = oldArray;  
      for (let i = 0; i < newArray.length; i++) {
        newArray[i].key = i + 1;
      }
      return newArray;
    }

    const getData = async () => {

      await admin.get('main-slider').then((res)=>{
          const data = setKeys(res.data)
          setData(data)
      }).finally(()=>{ })
      
    }

    const columns = [
      {
        title: t('image'),
        dataIndex: 'img',
        key: 'img',
        render: (text) => <img src={text} style={{width: "100px", height: "auto"}}></img>,
      },
      {
        title: t('name'),
        dataIndex: `name_${lan}`,
        key: `name_${lan}`,
      },
      {
        title: t('text'),
        dataIndex: `text_${lan}`,
        key: `text_${lan}`,
      },
      {
        title: t('action'),
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            
            { record.status == "on" ? <Switch checked onChange={(e) => { changeStatus(e, record.id) }} /> : <Switch onChange={(e) => { changeStatus(e, record.id) }} /> }

            <a href="#form" onClick={() => { startEditing(record.id); }} className="btn btn-success ms-3 me-3">
                {t('edit')}
            </a>

            <Popconfirm
              title={t('confirmationMessage')}
              onConfirm={() => { remove(record.id) }}
              okText={t('yes')}
              cancelText={t('no')}
            >
              <button type="button" className="btn btn-danger">
                  {t('delete')}
              </button>
            </Popconfirm>
          
          </Space>
        ),
      },
    ];

    const changeStatus = async (e, id) => {

      const thisObj = await data.filter((c) => c.id == id);
      let status;
      e ? status = await 'on' : status = 'off'; 

      await admin.put(`/main-slider/${id}` , {
          ...thisObj[0],
          status: status
      }).then((res)=>{
          notification.open({
              message: t('successfullyChanged'),
              icon: <SmileOutlined style={{ color: '#108ee9' }} />,
          });
        }).finally(()=>{ setTimeout(() => { window.location.reload()}, 1000) })

    };

    const remove = async (id) => {

      await admin.delete(`/main-slider/${id}`).then((res)=>{
          notification.open({
            message: t('successfullyDeleted'),
            icon: <WarningOutlined style={{ color: '#108ee9' }} />,
          });
      }).catch(()=>{
          notification.open({
            message: t('errorOccured'),
            icon: <WarningOutlined style={{ color: '#108ee9' }} />,
          });
      }).finally(()=>{ 
        setId('');
        emptyAll('');
        setStatus(true);
        setTimeout(() => { window.location.reload()}, 1000)
      })

    };

    const emptyAll = () => {
      setNameAz('');
      setNameEn('');
      setNameDe('');
      setImg('');
      setTextAz('');
      setTextEn('');
      setTextDe('');
    }

    const getStatus = () => status ? 'on' : 'off';
    
    const add = async (values) => {

      await  admin.post('/main-slider' , {
          name_az: nameAz,
          name_en: nameEn,
          name_de: nameDe,
          img: img,
          text_az: textAz,
          text_en: textEn,
          text_de: textDe,
          status: getStatus()
        }).then((res)=>{
            notification.open({
                message: t('successfullyAdded'),
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            });
          }).finally(()=>{
            emptyAll();
            setTimeout(() => { window.location.reload()}, 1000)
        })
  
    }

    const startEditing = (id) => {

      const thisObj = data.filter((c) => c.id == id);
      let status;
      thisObj[0].status == 'on' ? status = true : status = false;

      setId(id);

      setNameAz(thisObj[0].name_az);
      setNameEn(thisObj[0].name_en);
      setNameDe(thisObj[0].name_de);
      setImg(thisObj[0].img);
      setTextAz(thisObj[0].text_az);
      setTextEn(thisObj[0].text_en);
      setTextDe(thisObj[0].text_de);
      setStatus(status);

    }

    const edit = async () => {    
      
      await admin.put(`/main-slider/${id}` , {
          name_az: nameAz,
          name_en: nameEn,
          name_de: nameDe,
          img: img,
          text_az: textAz,
          text_en: textEn,
          text_de: textDe,
          status: getStatus()
      }).then((res)=>{
          notification.open({
              message: t('successfullyChanged'),
              icon: <SmileOutlined style={{ color: '#108ee9' }} />,
          });
        }).finally(()=>{
          setId('');
          emptyAll('');
          setStatus(true);
          setTimeout(() => { window.location.reload()}, 1000)
      })

    }

    const handleSubmit = () => { !id ? add() : edit(); }

    useEffect(() => {
      getData();
    }, [])

    return (
      <div className="products">

        <Table id="table" columns={columns} dataSource={data} />

        <form id="form" className='form mt-5 pt-5'>

          <div className="">
            <label for="formImg" className='fw-bold'>{t('image')}</label>
            <input className="form-control py-3 mt-3" onChange={(e) => { setImg(e.target.value) }} id="formImg" value={img}/>  
          </div>
          
          <div className="mt-4">
            <label for="formNameAz" className='fw-bold'>{t('name')} - AZ</label>
            <input className="form-control py-3 mt-3" onChange={(e) => { setNameAz(e.target.value) }} id="formNameAz" value={nameAz}/> 
          </div>

          <div className="mt-4">
            <label for="formNameEn" className='fw-bold'>{t('name')} - EN</label>
            <input className="form-control py-3 mt-3" onChange={(e) => { setNameEn(e.target.value) }} id="formNameEn" value={nameEn}/> 
          </div>

          <div className="mt-4">
            <label for="formNameDe" className='fw-bold'>{t('name')} - DE</label>
            <input className="form-control py-3 mt-3" onChange={(e) => { setNameDe(e.target.value) }} id="formNameDe" value={nameDe}/> 
          </div>

          <div className="mt-4">
            <label for="formTextAz" className='fw-bold'>{t('text')} - AZ</label>
            <input className="form-control py-3 mt-3" onChange={(e) => { setTextAz(e.target.value) }} id="formTextAz" value={textAz}/> 
          </div>

          <div className="mt-4">
            <label for="formTextEn" className='fw-bold'>{t('text')} - EN</label>
            <input className="form-control py-3 mt-3" onChange={(e) => { setTextEn(e.target.value) }} id="formTextEn" value={textEn}/> 
          </div>

          <div className="mt-4">
            <label for="formTextDe" className='fw-bold'>{t('text')} - DE</label>
            <input className="form-control py-3 mt-3" onChange={(e) => { setTextDe(e.target.value) }} id="formTextDe" value={textDe}/> 
          </div>

          <div className="mt-4">
            { status ? <Switch checked onChange={(e) => { setStatus(e) }}  className="me-3" /> : <Switch onChange={(e) => { setStatus(e) }}  className="me-3" />} Status
          </div>  

          <a href="#table" className={`btn mt-4 fw-bold w-100 py-3 ${id ? 'btn-success' : 'btn-primary'}`} onClick={() => { handleSubmit() }}>
              {id ? t('edit') : t('add')}
          </a>

        </form>

      </div>
    );
}



export default MainSlider

  
