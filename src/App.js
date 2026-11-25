import React, { useState } from 'react';
import { Button, ConfigProvider, Drawer, Layout, Menu } from 'antd';
import {
  MailOutlined,
  MenuOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import logo from './assets/img/Logotipo.png';
import Home from './Pages/Home/Home';
import Eventos from './Pages/Home/Eventos';
import Servicos from './Pages/Servicos/Servicos';
import CursosInternacionais from './Pages/Cursos/CursosInternacionais';
import Sobre from './Pages/Sobre/Sobre';
import Contactos from './Pages/Contactos/Contactos';
import Suporte from './Pages/Suporte/Suporte';
import Inscricao from './Pages/Inscricao/F_nscricao';
import Consulta from './Pages/Consulta/Consulta';
import SalaOnline from './Pages/Sala/SalaOnline';
import Login from './Pages/Login/Login';
import MainUtente from './Pages/Utente/MainUtente';
import MainAdmin from './Pages/admin/MainAdmin';

const { Content, Footer, Header } = Layout;

const navItems = [
  { key: 'home', label: 'Início', path: '/' },
  { key: 'servicos', label: 'Serviços', path: '/servicos' },
  { key: 'cursos', label: 'Cursos', path: '/cursos' },
  { key: 'eventos', label: 'Eventos', path: '/eventos' },
  { key: 'sobre', label: 'Sobre', path: '/sobre' },
];

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeItem = navItems.find(({ path }) =>
    path === '/' ? pathname === '/' || pathname === '/home' : pathname.toLowerCase().startsWith(path.toLowerCase())
  );
  const isUtenteArea = pathname.toLowerCase().startsWith('/utente');
  const isAdminArea = pathname.toLowerCase().startsWith('/admin');
  const isPrivateArea = isUtenteArea || isAdminArea;
  const userRole = window.sessionStorage.getItem('acma-user-role');
  const menuItems = navItems.map(({ key, label }) => ({ key, label }));

  const navigateFromMenu = ({ key }) => {
    const item = navItems.find((navItem) => navItem.key === key);
    if (item) navigate(item.path);
    setMobileMenuOpen(false);
  };

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#1c5fbd',
        colorInfo: '#1c5fbd',
        colorText: '#17304b',
        colorTextSecondary: '#637a92',
        colorBorder: '#dce7f3',
        colorBgLayout: '#f5f8fc',
        borderRadius: 10,
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        controlHeight: 44,
      },
      components: {
        Button: { fontWeight: 600, primaryShadow: 'none' },
        Menu: { itemBorderRadius: 8, itemSelectedColor: '#1c5fbd', itemSelectedBg: '#edf4ff' },
      },
    }}>
      <Layout className="site-layout">
        {!isPrivateArea && <>
        <Header className="site-header">
          <div className="header-inner">
            <Link to="/" className="brand" aria-label="ACMA, página inicial">
              <img className="brand-logo brand-logo--header" src={logo} alt="ACMA LDA" />
            </Link>

            <nav className="desktop-nav" aria-label="Navegação principal">
              <Menu
                mode="horizontal"
                selectedKeys={activeItem ? [activeItem.key] : []}
                items={menuItems}
                onClick={navigateFromMenu}
              />
            </nav>

            <div className="header-actions">
              <Button className="header-register" onClick={() => navigate('/inscricao')}>
                Inscrever-se
              </Button>
              <Button type="primary" className="header-login" onClick={() => navigate('/login')}>
                Entrar
              </Button>
              <Button
                className="mobile-menu-trigger"
                aria-label="Abrir menu"
                icon={<MenuOutlined />}
                onClick={() => setMobileMenuOpen(true)}
              />
            </div>
          </div>
        </Header>

        <Drawer
          title={<span className="drawer-brand">ACMA <small>Consultoria &amp; Formação</small></span>}
          placement="right"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          width={320}
        >
          <Menu
            mode="vertical"
            selectedKeys={activeItem ? [activeItem.key] : []}
            items={menuItems}
            onClick={navigateFromMenu}
          />
          <div className="drawer-actions">
            <Button block onClick={() => { navigate('/inscricao'); setMobileMenuOpen(false); }}>
              Inscrever-se
            </Button>
            <Button block type="primary" onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>
              Entrar
            </Button>
          </div>
        </Drawer>
        </>}

        <Content className={isPrivateArea ? 'site-content user-content' : 'site-content'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/cursos" element={<CursosInternacionais />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contactos" element={<Contactos />} />
            <Route path="/suporte" element={<Suporte />} />
            <Route path="/inscricao" element={<Inscricao />} />
            <Route path="/Consulta" element={<Consulta />} />
            <Route path="/SalaOnline" element={<SalaOnline />} />
            <Route path="/login" element={<Login />} />
            <Route path="/utente/*" element={userRole === 'utente' ? <MainUtente /> : <Navigate to="/login" replace />} />
            <Route path="/admin/*" element={userRole === 'admin' ? <MainAdmin /> : <Navigate to="/login" replace />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Content>

        {!isPrivateArea && <>
        <Footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-brand-block">
              <Link to="/" className="footer-brand" aria-label="ACMA, página inicial">
                <img className="brand-logo brand-logo--footer" src={logo} alt="ACMA LDA" />
              </Link>
              <p>Consultoria, formação profissional e soluções para empresas em Moçambique.</p>
            </div>
            <div className="footer-links">
              <strong>Explore</strong>
              <Link to="/servicos">Serviços</Link>
              <Link to="/cursos">Cursos</Link>
            </div>
            <div className="footer-links">
              <strong>Contactos</strong>
              <a href="tel:+258869926990"><PhoneOutlined /> +258 86 992 6990</a>
              <a href="mailto:geral@acmaconsultancy.com"><MailOutlined /> geral@acmaconsultancy.com</a>
              <span>Maputo, Moçambique</span>
              <Link to="/contactos">Fale connosco</Link>
              <Link to="/suporte">Suporte</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} ACMA Consultoria, Lda.</span>
            <span>Qualidade, segurança e desenvolvimento profissional.</span>
          </div>
        </Footer>

        <a
          className="contact-float contact-float-whatsapp"
          href="https://wa.me/258869926990"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar a ACMA por WhatsApp"
        >
          <WhatsAppOutlined />
        </a>
        </>}
      </Layout>
    </ConfigProvider>
  );
};

export default App;
