import React , {useState , useEffect} from 'react'
import {Row , Col , PageHeader , Table , Form , notification , Card ,message,  Button, Input, Switch,  Upload , Space  , Popconfirm , Tooltip} from 'antd'
import { DeleteFilled , EditFilled  , LikeOutlined , LoadingOutlined ,
    PlusOutlined , SmileOutlined , WarningOutlined} from '@ant-design/icons';
import admin from '../../api/admin'


export default function Categories() {
    const [form] = Form.useForm();
    const [data, setData] = useState([])
    const [on, setOn] = useState(false)
    const [id, setId] = useState()
    const [loading, setLoading] = useState(false)
    let langs = ['az' , 'en', 'de']
    const [imageUrl, setImageUrl] = useState();



   
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
      

  
    const handleChange = async (info) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
  
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        let base64 = await getBase64(info.file.originFileObj);
        setLoading(false);

        // toBase64(info.file.originFileObj, (url) => {
        //   setImageUrl(url);
        // });
      }
    };
  

    useEffect(() => {
       getData()
    }, []);

    const getData = async () =>{
        setLoading(true)
       await admin.get('/categories').then((res)=>{
            setData(res.data.map((d)=>{
              return {
                  ...d,
                  name: d[`name_${localStorage.getItem('locale')}`]
              }
            }))
       }).finally(()=>{
        setLoading(false)
      })
    }

    const onFinish = async (values) => {
      setLoading(true)
      let obj = {
        status : on ? 'on' : 'off',
        category : values.category
      }

      langs.forEach((s)=>{
        obj[`name_${s}`] = values[`name_${s}`]
      })

      if(id){
        await  admin.put(`/categories/${id}` , obj).then((res)=>{
            notification.open({
                message: 'Successfully edited',
                description: `Category name: ${res.data.name_az}$`,
                icon: <LikeOutlined style={{ color: '#108ee9' }} />,
            });
            setId(null)
            getData()
            onCancel()
          }).finally(()=>{
            setLoading(false)
        })
      }
      else{
        await  admin.post('/categories' , obj).then((res)=>{
            notification.open({
                message: 'Successfully added',
                description: `Category name: ${res.data.name_az}`,
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            });
            getData()
            onCancel()
          }).finally(()=>{
            setLoading(false)
          })
      }
    };
    
    const onFinishFailed = () => {
     message.error('Submit failed!');
    };

    const deleteData = async (id) =>{
        setLoading(true)
       await admin.delete(`/categories/${id}`).then((res)=>{
            notification.open({
                message: 'Successfully deleted',
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            });
            getData()
        }).catch(()=>{
            notification.open({
                message: 'Some error ocurred',
                icon: <WarningOutlined style={{ color: '#108ee9' }} />,
            });
        }).finally(()=>{
            setLoading(false)
        })
    } 

    const editData = (id) =>{
        setId(id)
        let editedData = data.find(s => s.id === id)
        console.log(editedData)
        form.setFieldsValue(editedData)
        setOn(editedData.status  === 'on' ?  true : false)
    }
        
    const onCancel = () => {
       form.resetFields()
       setOn(false)
    };

    const columns = [
        {
          title: 'Ad',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Actions',
          dataIndex: 'id',
          key: 'id',
          render(id){
            return (
                <div className='d-flex'>

                    <Tooltip title="Edit">
                          <Button onClick={()=>{editData(id)}  } type='primary' className='me-2' shape="circle" icon={<EditFilled />} />
                    </Tooltip>

                     <Popconfirm
                        placement="bottomLeft"
                        title={'Are you sure for delete?'}
                        onConfirm={ ()=>{deleteData(id)} }
                        okText="Yes"
                        cancelText="No"
                    >
                         <Tooltip title="Delete">
                            <Button type='text' className='bg-danger text-white' shape="circle" icon={<DeleteFilled />} />
                         </Tooltip>
                     </Popconfirm>
                </div>
            )
          }
        },
    ];

    const TableData = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Joe Black',
          age: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Jim Green',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
        {
          key: '4',
          name: 'Jim Red',
          age: 32,
          address: 'London No. 2 Lake Park',
        },
    ];

    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </div>
      );


  return (
    <div>
        <Row gutter={[16,16]}>
            <Col xs={24}>
                <PageHeader
                    className="site-page-header"
                    onBack={false}
                    title="Categories"
                />
            </Col>
            <Col xs={12}>
                <Card>
                    <Table loading={loading} columns={columns} dataSource={data} />
                </Card>
            </Col>
            <Col xs={12}>
                <Card>
                  
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        >
                        {
                          langs.map((l)=>(
                            <Form.Item
                              name={`name_${l}`}
                              rules={[{ required: true ,  message: 'Input doldurulmalidir'  }, { type: 'string', min: 3 , message: 'Minimum 3 char olmalidir' }]}
                            >
                                <Input placeholder={`Lang ${l.toUpperCase()}`} />
                            </Form.Item>
                          ))
                        }

                            <Form.Item
                              name={`category`}
                              rules={[{ required: true ,  message: 'Input doldurulmalidir'  }, { type: 'string', min: 3 , message: 'Minimum 3 char olmalidir' }]}
                            >
                                <Input placeholder={`Category slug`} />
                            </Form.Item>

                        <Switch checked={on} onChange={(e) => { setOn(e) }}  className="me-3 my-3" />

                        <Form.Item>
                            <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button onClick={onCancel}>
                                Cancel
                            </Button>
                            </Space>
                        </Form.Item>
                    </Form> 
                </Card>
            </Col>
        </Row>
    </div>
  )
}
