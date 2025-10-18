import React from 'react';
import { Layout, Menu } from 'antd';
import { WhatsAppOutlined, MailOutlined } from '@ant-design/icons';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Servicos from './Pages/Servicos/Servicos';
import CursosInternacionais from './Pages/Cursos/CursosInternacionais';
import Sobre from './Pages/Sobre/Sobre';
import Contactos from './Pages/Contactos/Contactos';
import Suporte from './Pages/Suporte/Suporte';
import Inscricao from './Pages/Inscricao/F_nscricao';
import Consulta from './Pages/Consulta/Consulta';
import SalaOnline from './Pages/Sala/SalaOnline';

const { Header, Content } = Layout;

const App = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.keyPath.length > 1) {
      navigate(`/${e.keyPath.reverse().join('/')}`);
    } else {
      navigate(`/${e.key}`);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Navbar */}
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#1565C0',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          padding: '0 48px',
          height: '64px',
        }}
      >
        <div style={{ 
          fontWeight: 'bold', 
          fontSize: '28px', 
          color: '#fff',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          letterSpacing: '1.5px',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/')}
        >
          ACMA
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          style={{
            flex: 1,
            minWidth: 0,
            justifyContent: 'flex-end',
            display: 'flex',
            backgroundColor: 'transparent',
            border: 'none',
            lineHeight: '64px'
          }}
          onClick={handleMenuClick}
        >
          <Menu.Item key="home" style={{ fontWeight: '500', fontSize: '15px' }}>
            Página Inicial
          </Menu.Item>
          <Menu.Item key="servicos" style={{ fontWeight: '500', fontSize: '15px' }}>
            Serviços
          </Menu.Item>
          <Menu.Item key="cursos" style={{ fontWeight: '500', fontSize: '15px' }}>
            Cursos
          </Menu.Item>
          <Menu.Item key="Consulta" style={{ fontWeight: '500', fontSize: '15px' }}>
            Consultar Certificado
          </Menu.Item>
          <Menu.Item key="SalaOnline" style={{ fontWeight: '500', fontSize: '15px' }}>
            Sala Online
          </Menu.Item>
          <Menu.Item key="eventos" style={{ fontWeight: '500', fontSize: '15px' }}>
            Eventos
          </Menu.Item>
          <Menu.Item key="sobre" style={{ fontWeight: '500', fontSize: '15px' }}>
            Sobre Nós
          </Menu.Item>
          <Menu.Item key="inscricao" style={{ fontWeight: '500', fontSize: '15px' }}>
            Inscrição
          </Menu.Item>
        </Menu>
      </Header>

      {/* Conteúdo */}
      <Content
        style={{
          padding: 0,
          margin: 0,
          flex: 1,
        }}
      >
        <div
          style={{
            padding: '32px 48px',
            minHeight: 'calc(100vh - 64px)',
            background: '#fff'
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/cursos" element={<CursosInternacionais />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contactos" element={<Contactos />} />
            <Route path="/suporte" element={<Suporte />} />
            <Route path="/inscricao" element={<Inscricao />} />
            <Route path="/Consulta" element={<Consulta />} />
            <Route path="/SalaOnline" element={<SalaOnline />} />
          </Routes>
        </div>
      </Content>

      {/* Botão do WhatsApp */}
      <a
        href="https://wa.me/+258869926990"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          width: '60px',
          height: '60px',
          bottom: '90px',
          right: '30px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
          color: 'white',
          fontSize: '30px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 211, 102, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)';
        }}
      >
        <WhatsAppOutlined />
      </a>

      {/* Botão de Email */}
      <a
        href="mailto:geral@acmaconsultancy.com"
        style={{
          position: 'fixed',
          width: '60px',
          height: '60px',
          bottom: '20px',
          right: '30px',
          backgroundColor: '#007BFF',
          borderRadius: '50%',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0, 123, 255, 0.4)',
          color: 'white',
          fontSize: '30px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 123, 255, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.4)';
        }}
      >
        <MailOutlined />
      </a>
    </Layout>
  );
};

export default App;