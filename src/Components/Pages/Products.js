import { Space, Table, Tag, Switch, message, Popconfirm, notification, Select   } from 'antd';
import React, {useState, useEffect, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import {admin} from '../../api/admin'
import { DeleteFilled , EditFilled  , LikeOutlined , LoadingOutlined ,
  PlusOutlined , SmileOutlined , WarningOutlined} from '@ant-design/icons';

function Products(props) {

    const { t, i18n } = useTranslation();
    let lan = i18n.language
    const { Option } = Select;

    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [defaultCategory, setDefaultCategory] = useState('all');
    const [id, setId] = useState();
    const [img, setImg] = useState('');
    const [nameAz, setNameAz] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [nameDe, setNameDe] = useState('');
    const [price, setPrice] = useState('');
    const [year, setYear] = useState('');
    const [status, setStatus] = useState(true);
    const [category, setCategory] = useState('all');
    const [categoryAz, setCategoryAz] = useState('HAMISI');
    const [categoryEn, setCategoryEn] = useState('ALL');
    const [categoryDe, setCategoryDe] = useState('ALLES');
    
    const setKeys = (oldArray) => {
      let newArray = oldArray;  
      for (let i = 0; i < newArray.length; i++) {
        newArray[i].key = i + 1;
      }
      return newArray;
    }

    const getCategory = (value) => {

      setCategory(value);
      const thisCategory = categories.filter((c) => c.category == value)
      setCategoryAz(thisCategory[0].name_az)
      setCategoryEn(thisCategory[0].name_en)
      setCategoryDe(thisCategory[0].name_de)

    }

    const getProducts = async () => {

      await admin.get('products').then((res)=>{
          const data = setKeys(res.data)
          setData(data)
      }).finally(()=>{ })

      await admin.get('categories?status=on').then((res)=>{
        setCategories(res.data)
        setCategory(res.data[0].category)
        setCategoryAz(res.data[0].name_az)
        setCategoryEn(res.data[0].name_en)
        setCategoryDe(res.data[0].name_de)
      }).finally(()=>{ })
      
    }

    const columns = [
      {
        title: t('image'),
        dataIndex: 'img',
        key: 'img',
        render: (text) => <img src={text} style={{width: "70px", height: "auto"}}></img>,
      },
      {
        title: t('name'),
        dataIndex: `name_${lan}`,
        key: `name_${lan}`,
      },
      {
        title: t('category'),
        dataIndex: `category_${lan}`,
        key: `category_${lan}`,
      },
      {
        title: t('price'),
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: t('year'),
        dataIndex: 'year',
        key: 'year',
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

      await admin.put(`/products/${id}` , {
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

      await admin.delete(`/products/${id}`).then((res)=>{
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
        setDefaultCategory(categories[0].category);
        setStatus(true);
        setTimeout(() => { window.location.reload()}, 1000)
      })

    };

    const emptyAll = () => {
      setNameAz('');
      setNameEn('');
      setImg('');
      setNameDe('');
      setPrice('');
      setYear('');
      setStatus(true);
      // setDefaultCategory('all');
    }

    const getStatus = () => status ? 'on' : 'off';
    
    const add = async (values) => {

      const newObj = {
          category: category,
          category_az: categoryAz,
          category_en: categoryEn,
          category_de: categoryDe,
          name_az: nameAz,
          name_en: nameEn,
          name_de: nameDe,
          img: img,
          price: price,
          year: year,
          status: getStatus()
      }

      await  admin.post('/products' , {
          ...newObj
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
      setImg(thisObj[0].img);
      setNameDe(thisObj[0].name_de);
      setPrice(thisObj[0].price);
      setYear(thisObj[0].year);
      setStatus(status);
      setDefaultCategory(thisObj[0].category);

    }

    const edit = async () => {    
      
      await admin.put(`/products/${id}` , {
        category: category,
        category_az: categoryAz,
        category_en: categoryEn,
        category_de: categoryDe,
        name_az: nameAz,
        name_en: nameEn,
        name_de: nameDe,
        img: img,
        price: price,
        year: year,
        status: getStatus()
      }).then((res)=>{
          notification.open({
              message: t('successfullyChanged'),
              icon: <SmileOutlined style={{ color: '#108ee9' }} />,
          });
        }).finally(()=>{
          setId('');
          emptyAll('');
          setDefaultCategory(categories[0].category);
          setStatus(true);
          setTimeout(() => { window.location.reload()}, 1000)
      })

    }

    const handleSubmit = () => { !id ? add() : edit(); }

    useEffect(() => {
      getProducts();
    }, [defaultCategory])

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
            <label for="formPrice" className='fw-bold'>{t('price')}</label>
            <input className="form-control py-3 mt-3" onChange={(e) => { setPrice(e.target.value) }} id="formPrice" value={price}/> 
          </div>

          <div className="mt-4">
            <label for="formYear" className='fw-bold'>{t('year')}</label>
            <input className="form-control py-3 mt-3" onChange={(e) => { setYear(e.target.value) }} id="formYear" value={year}/> 
          </div>

          <div className='mt-5 pb-3'>

            <select  className='form-control' onChange={(e) => getCategory(e.target.value)}>

                  { categories?.map((cat , i)=> (
                    
                    defaultCategory == cat.category ? <option selected value={cat.category} key={i}>{cat['name_'+lan+'']}</option> : <option value={cat.category} key={i}>{cat['name_'+lan+'']}</option>

                  ))}

            </select>

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



export default Products

  
