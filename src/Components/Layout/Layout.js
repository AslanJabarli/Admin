import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminHeader from '../Layout/Header'
import LeftSide from './LeftSide';

const { Header, Content, Sider } = Layout;



const MyLayout = (props) => {
    let location = useLocation()
    let urlName = location.pathname.split('/')

    console.log(urlName)
    console.log(urlName)

    return  (
      <Layout>
        <AdminHeader/>
        <Layout>
          <LeftSide/>
          <Layout
            style={{
              padding: '0 24px 24px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              {urlName.map((name)=>{
                return name.length > 0 && <Breadcrumb.Item>{name.toLocaleUpperCase('en')}</Breadcrumb.Item>
              })}
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
}

export default MyLayout;

