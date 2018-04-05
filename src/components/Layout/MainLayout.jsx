import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Scrollbar from 'react-custom-scrollbars';
import styles from './MainLayout.scss';
// import { router } from '../../containers/App/config';
import { router, routeIcons, menu } from './config';
import logo from '../../../public/images/vbee-logo.png';
import logoIco from '../../../public/images/favicon.ico';
import GlobalHeader from './GlobalHeader';

const {
  Header, Content, Footer, Sider,
} = Layout;
const { SubMenu } = Menu;

class MainLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="logo">
              <div className="brand">
                {this.state.collapsed ? (
                  <img src={logoIco} width={21} height={21} alt="logo_ico" />
                ) : (
                  <img src={logo} width={70} height={21} alt="logo" />
                )}
              </div>
            </div>
          </Link>

          <Menu theme="dark" mode="inline">
            <Menu.Item selected key={router.home}>
              <Link to={router.home}>
                <Icon type={routeIcons.home} />
                <span>{menu.home}</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={router.apps}>
              <Link to={router.apps}>
                <Icon type={routeIcons.apps} />
                <span>{menu.apps}</span>
              </Link>
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <GlobalHeader
              collapsed={this.state.collapsed}
              onCollapse={this.toggle}
            />
          </Header>
          {this.props.children}
          <Footer
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Vbee Logs ©2018
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
