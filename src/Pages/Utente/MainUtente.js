import React from 'react';
import logo from '../../assets/img/Logotipo.png';
import { Avatar, Button, Card, Drawer, Layout, Menu } from 'antd';
import {
  ArrowRightOutlined,
  FileProtectOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CertificadosUtente from './CertificadosUtente';
import SalaOnline from '../Sala/SalaOnline';
import { clearAuthSession, getCurrentUser } from '../../services/api';

const { Content, Header } = Layout;

const menuItems = [
  { key: 'inicio', icon: <HomeOutlined />, label: 'Início' },
  { key: 'certificados', icon: <FileProtectOutlined />, label: 'Certificados' },
  { key: 'sala-online', icon: <VideoCameraOutlined />, label: 'Sala Online' },
];

const UtenteInicio = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const displayName = [user.nome, user.apelido].filter(Boolean).join(' ') || user.username || user.email || 'Utente';

  return (
    <div className="utente-dashboard">
      <header className="utente-welcome">
        <div>
          <span className="eyebrow">Área do utente</span>
          <h1>Olá, {displayName}</h1>
          <p>Consulte os seus certificados ou volte ao site principal da ACMA.</p>
        </div>
        <span className="utente-session-badge"><UserOutlined /> Sessão autenticada</span>
      </header>

      <section className="utente-shortcuts" aria-label="Acessos rápidos">
        <Card className="utente-shortcut-card" bordered={false}>
          <span className="utente-shortcut-icon"><FileProtectOutlined /></span>
          <span className="utente-shortcut-label">Os seus documentos</span>
          <h2>Certificados</h2>
          <p>Pesquise certificados associados ao seu e-mail e NUIT.</p>
          <Button type="primary" onClick={() => navigate('/utente/certificados')}>
            Ver certificados associados <ArrowRightOutlined />
          </Button>
        </Card>

        <Card className="utente-shortcut-card utente-shortcut-card--soft" bordered={false}>
          <span className="utente-shortcut-icon"><VideoCameraOutlined /></span>
          <span className="utente-shortcut-label">Formação à distância</span>
          <h2>Sala Online</h2>
          <p>Aceda às ligações das aulas e prepare uma sessão online.</p>
          <Button onClick={() => navigate('/utente/sala-online')}>
            Abrir sala online <ArrowRightOutlined />
          </Button>
        </Card>

      </section>

      <Card className="utente-profile-card" bordered={false}>
        <Avatar size={48} icon={<UserOutlined />} />
        <div>
          <strong>{displayName}</strong>
          <span>{user.email || user.username || 'Conta autenticada'}</span>
        </div>
        <span className="utente-profile-status">Sessão ativa</span>
      </Card>
    </div>
  );
};

const MainUtente = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = getCurrentUser();
  const displayName = [user.nome, user.apelido].filter(Boolean).join(' ') || user.username || user.email || 'Utente';
  const currentPath = location.pathname.toLowerCase();
  const selectedKey = currentPath.startsWith('/utente/certificados')
    ? 'certificados'
    : currentPath.startsWith('/utente/sala-online')
      ? 'sala-online'
      : 'inicio';

  const onMenuClick = ({ key }) => {
    setDrawerOpen(false);
    if (key === 'inicio') navigate('/utente');
    if (key === 'certificados') navigate('/utente/certificados');
    if (key === 'sala-online') navigate('/utente/sala-online');
  };

  const endSession = () => {
    clearAuthSession();
    navigate('/login');
  };

  const menu = (mode) => (
    <Menu mode={mode} selectedKeys={[selectedKey]} items={menuItems} onClick={onMenuClick} />
  );

  return (
    <Layout className="utente-layout">
      <Header className="utente-topbar">
        <div className="utente-topbar-inner">
          <Button
            className="utente-mobile-menu"
            aria-label="Abrir menu do utente"
            icon={<MenuOutlined />}
            onClick={() => setDrawerOpen(true)}
          />
          <Link to="/utente" className="utente-brand">
            <img className="brand-logo brand-logo--compact" src={logo} alt="ACMA LDA" />
            <span className="utente-brand-label"><small>Área do utente</small></span>
          </Link>
          <div className="utente-account">
            <Avatar icon={<UserOutlined />} />
            <span>{displayName}</span>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              aria-label="Terminar sessão"
              title="Terminar sessão"
              onClick={endSession}
            />
          </div>
        </div>
      </Header>

      <Layout className="utente-workspace">
        <aside className="utente-sidebar">
          {menu('inline')}
        </aside>
        <Content className="utente-content">
          <Routes>
            <Route index element={<UtenteInicio />} />
            <Route path="certificados" element={<CertificadosUtente />} />
            <Route path="sala-online" element={<SalaOnline />} />
            <Route path="*" element={<UtenteInicio />} />
          </Routes>
        </Content>
      </Layout>

      <Drawer
        className="utente-nav-drawer"
        title={<span className="drawer-brand">ACMA <small>Área do utente</small></span>}
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={300}
      >
        {menu('vertical')}
      </Drawer>
    </Layout>
  );
};

export default MainUtente;
