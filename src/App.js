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


const { Header, Content, Footer } = Layout;

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
    <Layout style={{ minHeight: '100vh' }}>
      {/* Navbar */}
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#1565C0', // Azul mais escuro e elegante
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // Sombra suave
          padding: '0 24px',
          height: '64px',
          lineHeight: '64px'
        }}
      >
        <div style={{ 
          fontWeight: 'bold', 
          fontSize: '24px', 
          color: '#fff',
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
          letterSpacing: '1px'
        }}>
          Acma
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
          <Menu.Item key="home" style={{ fontWeight: '500' }}>Página Inicial</Menu.Item>
          <Menu.Item key="servicos" style={{ fontWeight: '500' }}>Serviços</Menu.Item>
          <Menu.Item key="cursos" style={{ fontWeight: '500' }}>Cursos</Menu.Item>
          <Menu.Item key="Consulta" style={{ fontWeight: '500' }}>Consultar Certificado</Menu.Item>
          <Menu.Item key="SalaOnline" style={{ fontWeight: '500' }}>Sala Online</Menu.Item>
          <Menu.Item key="sobre" style={{ fontWeight: '500' }}>Sobre Nós</Menu.Item>
          <Menu.Item key="inscricao" style={{ fontWeight: '500' }}>Inscrição</Menu.Item>
        </Menu>
      </Header>

      {/* Conteúdo */}
      <Content
        style={{
          padding: '0 48px',
          marginTop: '2%',
          flex: 1,
          marginBottom: '64px' // Espaço para o footer fixo
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
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

      {/* Rodapé fixo */}
      <Footer
        style={{
          textAlign: 'center',
          backgroundColor: '#1565C0', // Mesmo azul da navbar
          color: '#fff',
          padding: '16px 20px',
          fontWeight: '500',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div>
          Acma ©{new Date().getFullYear()} - Acama LDA | 
          <span style={{ marginLeft: '8px', opacity: '0.8' }}>
            Todos os direitos reservados
          </span>
        </div>
      </Footer>

      {/* Botão do WhatsApp */}
      <a
        href="https://wa.me/+258869926990"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          width: '60px',
          height: '60px',
          bottom: '80px',
          right: '30px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          color: 'white',
          fontSize: '30px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s',
          ':hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)'
          }
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
          bottom: '10px',
          right: '30px',
          backgroundColor: '#007BFF',
          borderRadius: '50%',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          color: 'white',
          fontSize: '30px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s',
          ':hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)'
          }
        }}
      >
        <MailOutlined />
      </a>
    </Layout>
  );
};

export default App;