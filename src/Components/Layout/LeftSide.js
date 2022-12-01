import React from 'react'
import { Link } from "react-router-dom";
import { Layout, Menu  , Button , Select} from 'antd';
import {
    AuditOutlined,
    HomeOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    OrderedListOutlined,
    CodeSandboxOutlined
  } from "@ant-design/icons";

import { useTranslation } from 'react-i18next';
import Categories from '../Pages/Categories';

const { Option } = Select;

const { Sider } = Layout;




export default function LeftSide() {

    
const { t, i18n } = useTranslation();
let resources = i18n.logger.options.resources
let lang = i18n.language

const changeLang = (lang) => {
    console.log(lang)
    localStorage.setItem('locale' , lang)
    i18n.changeLanguage(lang)
}

console.log(Object.keys(resources))

  return (
    <Sider width={200} className="site-layout-background">

        <div className='d-flex w-100'>
        <Select onChange={(e)=> {console.log(e);  changeLang(e)}} defaultValue={lang} className='w-100'>
            {Object.keys(resources).map((l , index)=>{
                return (
                    <Option value={l}>{l.toUpperCase()}</Option>
                )
            })}
        </Select>
                {/* {Object.keys(resources).map((l , index)=>{
                    return (
                    <Button key={index} type={l === lang ? 'primary' : ''} onClick={()=> {i18n.changeLanguage(l)} }>
                       {l}
                    </Button>
                    )
                })} */}
        </div>

        <Menu
          mode="inline"
          theme='dark'
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{
            height: '100%',
            borderRight: 0,
          }}
        >
            <Menu.Item key="2">
                <Link to={`/`}>
                <HomeOutlined />
                <span>Ana səhifə</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="3">
                <Link to={`/categories`}>
                <i className="fa fa-bars me-3"></i>
                <span>{t('categories')}</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="4">
                <Link to={`/products`}>
                <i className="fa fa-shopping-cart me-3"></i>
                <span>{t('products')}</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="5">
                <Link to={`/main-slider`}>
                <i className="fa fa-desktop me-3"></i>
                <span>{t('mainSlider')}</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="6">
                <Link to={`/orders`}>
                <i className="fa fa-shopping-cart me-3"></i>
                <span>{t('orders')}</span>
                </Link>
            </Menu.Item>

        </Menu>
    
    </Sider>

  )
}
