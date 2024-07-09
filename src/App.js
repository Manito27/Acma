import React from 'react';
import { Breadcrumb, Layout, Menu, Dropdown, Avatar, Badge } from 'antd';
import { BellOutlined, UserOutlined, MailOutlined,WhatsAppOutlined } from '@ant-design/icons';
import Home from './Pages/Home/Home';
import mapiImage from './assets/img/mapi.png'; // Import the image

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

const items = [
  { key: '1', label: 'Home' },
  { key: '2', label: 'Concursos' },
  { key: '3', label: 'Avisos' },
  { key: '4', label: 'Serviços de Registro' }
];

const moreItems = [
  { key: '5', label: 'Relatórios' },
  { key: '6', label: 'Estatísticas' },
  { key: '7', label: 'Configurações Avançadas' },
  { key: '8', label: 'Suporte' }
];

const userMenu = (
  <Menu>
    <Menu.Item key="1">Perfil</Menu.Item>
    <Menu.Item key="2">Configurações</Menu.Item>
    <Menu.Item key="3">Sair</Menu.Item>
  </Menu>
);

const App = () => {
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFF',
          justifyContent: 'space-between'
        }}
      >
        <img src={mapiImage} alt="Mapi" style={{ width: '60px', marginLeft: '24px' }} />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{
            flex: 1,
            minWidth: 0,
            justifyContent: 'center',
            display: 'flex'
          }}
        >
          {items.map(item => (
            <Menu.Item key={item.key}>{item.label}</Menu.Item>
          ))}
          <SubMenu key="more" title="Mais">
            {moreItems.map(item => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </SubMenu>
        </Menu>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Badge count={25}>
            <BellOutlined style={{ fontSize: '20px', visibility:'hidden',marginRight: '24px' }} />
          </Badge>
           <Badge count={5}>
            <BellOutlined style={{ fontSize: '20px', marginRight: '24px' }} />
          </Badge>
          <MailOutlined style={{ fontSize: '20px', marginRight: '24px' }} />
          <Dropdown overlay={userMenu}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} style={{ marginRight: '8px' }} />
              <span>Username</span>
            </div>
          </Dropdown>
        </div>
      </Header>
      <Content
        style={{
          padding: '0 48px',
          marginTop:'2%'
        }}
      >
     
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: '#fff',
            borderRadius: '8px',
          }}
        >
          <Home/>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Econcurso ©{new Date().getFullYear()} Created by MAPI 
      </Footer>
      <a
        href="https://wa.me/15551234567" // Substitua pelo seu link de suporte do WhatsApp
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          width: '60px',
          height: '60px',
          bottom: '40px',
          right: '40px',
          backgroundColor: '#25D366', // Cor do WhatsApp
          borderRadius: '50%',
          textAlign: 'center',
          boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.3)',
          color: 'white',
          fontSize: '30px',
          zIndex: 1000
        }}
      >
        <WhatsAppOutlined style={{ marginTop: '16px' }} />
      </a>
    </Layout>
  );
};

export default App;
