import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip } from 'antd';
import moment from 'moment';
// import groupBy from 'lodash/groupBy';
// import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import styles from './GlobalHeader.less';
import logo from '../../../public/images/vbee-logo.png';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    // this.triggerResizeEvent.cancel();
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    // this.triggerResizeEvent();
  };
  /* eslint-disable*/
  // @Debounce(600)
  // triggerResizeEvent() {
  //   const event = document.createEvent('HTMLEvents');
  //   event.initEvent('resize', true, false);
  //   window.dispatchEvent(event);
  // }
  render() {
    // const {
    //   currentUser,
    //   collapsed,
    //   fetchingNotices,
    //   isMobile,
    //   logo,
    //   onNoticeVisibleChange,
    //   onMenuClick,
    //   onNoticeClear,
    // } = this.props;
    const {
      collapsed,
      onCollapse
    } = this.props;
    const currentUser = {
      name: 'Sang Pham'
    }
    const menu = (
      <Menu className="menu">
        <Menu.Item>
          <Icon type="setting" />Setting
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />Logout
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="header">
        <Icon
          className="trigger"
          onClick={this.toggle}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
        />
        <div className="right">

          <Dropdown overlay={menu}>
            <span className="action account">
              <Avatar size="small" className="avatar" src={logo} />
              <span className="name">{currentUser.name}</span>
            </span>
          </Dropdown>
        </div>
      </div>
    );
  }
}
