import {connect} from 'react-redux'
import {Layout, Menu , Popconfirm , Button , Popover , Avatar} from 'antd';

import React from 'react';
import { LogOutUser } from '../../redux/actions';
const { Header } = Layout;

function AdminHeader(props) {
    const {user , LogOutUser} = props


    const text = <span>{user.first_name + ' ' + user.last_name}</span>;

    const content = (
    <div>
        <p>{user.email}</p>
    </div>
    );

    const items1 = ['1', '2', '3'].map((key) => ({
        key,
        label: `nav ${key}`,
    }));

    return (
        <Header className="header">
            <div className="logo" />
            <Menu theme="dark" direction='rtl' mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item>
                    <Popover placement="bottomLeft" title={text} content={content} trigger="click">
                         <Avatar src={user.avatar} />
                    </Popover>
                </Menu.Item>
                <Menu.Item>
                    <Popconfirm
                        placement="bottomLeft"
                        title={'Are you sure for logout?'}
                        onConfirm={()=>{LogOutUser()}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button>Log Out</Button>
                    </Popconfirm>
                </Menu.Item>
            </Menu>
           
        </Header>
    );
  }
  

const mapStateToProps = ({user}) => {
    return {
        user: user.data
    }
}
  
export default connect(mapStateToProps , {LogOutUser})(AdminHeader)
  
    




  