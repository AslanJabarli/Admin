import { Space, Table, Tag, Switch, message, Popconfirm, notification, Button, Modal } from 'antd';
import React, {useState, useEffect, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import {admin} from '../../api/admin'
import { DeleteFilled , EditFilled  , LikeOutlined , LoadingOutlined ,
  PlusOutlined , SmileOutlined , WarningOutlined} from '@ant-design/icons';

function Orders(props) {

    const { t, i18n } = useTranslation();
    let lan = i18n.language

    const [data, setData] = useState([]);
    const [modalProducts, setModalProducts] = useState([]);
    const [open, setOpen] = useState(false);
    
    const setKeys = (oldArray) => {
      let newArray = oldArray;  
      for (let i = 0; i < newArray.length; i++) {
        newArray[i].key = i + 1;
      }
      return newArray;
    }

    const getData = async () => {

      await admin.get('orderedProducts').then((res)=>{
          const data = setKeys(res.data)
          setData(data)
      }).finally(()=>{ })
      
    }

    const columns = [
      {
        title: t('name'),
        dataIndex: `username`,
        key: `username`,
      },
      {
        title: t('surname'),
        dataIndex: `surname`,
        key: `surname`,
      },
      {
        title: t('date'),
        dataIndex: `date`,
        key: `date`,
      },
      {
        title: t('length'),
        dataIndex: `length`,
        key: `length`,
      },
      {
        title: t('subtotal'),
        dataIndex: `subtotal`,
        key: `subtotal`,
      },
      {
        title: t('action'),
        key: 'action',
        render: (_, record) => (
          <Space size="middle">

            <button type="button" className="btn btn-primary" onClick={() => { showModal(record.products) }}>
                <i className="fa fa-eye"></i>
            </button>

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

    const showModal = (products) => {
      setModalProducts(products);
      setOpen(true)
      console.log(products);
    }

    const remove = async (id) => {

      await admin.delete(`/orderedProducts/${id}`).then((res)=>{
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
        setTimeout(() => { window.location.reload()}, 1000)
      })

    };

    useEffect(() => {
      getData();
    }, [])

    return (
      <div className="orders">

        <Table id="table" columns={columns} dataSource={data} />

        <Modal
          title={t('orders')}
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
        >
          
          <div>

              {
                  modalProducts?.map((pro, i) => (

                    <div className="d-flex justify-content-start align-items-center mt-5">
                      
                      <img src={pro[0].img} style={{width: "100px", height: "auto"}}></img>
                      
                      <p key={i} className="ms-5 my-0">
                        <strong>{t('name')}: </strong>
                        {pro[0][`name_${lan}`]}
                      </p>

                      <p key={i} className="ms-5 my-0">
                        <strong>{t('length')}: </strong>
                        {pro.length}
                      </p>

                    </div>  
                    
                  ))
              }

          </div>

        </Modal>

      </div>
    );
}



export default Orders

  
