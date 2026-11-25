import React, { useState } from 'react';
import { Avatar, Button, Drawer, Layout, Menu } from 'antd';
import {
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Ahome from './Ahome';
import Inscri from './Inscri';
import Consultas from './Consultas';
import Membros from './Membros';
import { clearAuthSession, getCurrentUser } from '../../services/api';

const { Content, Header } = Layout;

const adminMenuItems = [
  { key: 'inicio', icon: <HomeOutlined />, label: 'Início' },
  { key: 'utentes', icon: <UserOutlined />, label: 'Utentes' },
  { key: 'certificados', icon: <SolutionOutlined />, label: 'Certificados' },
  { key: 'membros', icon: <TeamOutlined />, label: 'Membros' },
];

const MainAdmin = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = getCurrentUser();
  const displayName = [user.nome, user.apelido].filter(Boolean).join(' ') || user.username || user.email || 'Administrador';
  const currentPath = pathname.toLowerCase();
  const selectedKey = currentPath.includes('/utentes') || currentPath.includes('/inscricoes')
    ? 'utentes'
    : currentPath.includes('/certificados') || currentPath.includes('/pedidos')
      ? 'certificados'
      : currentPath.includes('/membros')
        ? 'membros'
        : 'inicio';

  const onMenuClick = ({ key }) => {
    setDrawerOpen(false);
    const routeByKey = {
      inicio: '/admin',
      utentes: '/admin/utentes',
      certificados: '/admin/certificados',
      membros: '/admin/membros',
    };
    navigate(routeByKey[key]);
  };

  const endSession = () => {
    clearAuthSession();
    navigate('/login');
  };

  const menu = (mode) => (
    <Menu mode={mode} selectedKeys={[selectedKey]} items={adminMenuItems} onClick={onMenuClick} />
  );

  return (
    <Layout className="admin-layout">
      <Header className="admin-topbar">
        <div className="admin-topbar-inner">
          <Button
            className="admin-mobile-menu"
            aria-label="Abrir menu de administração"
            icon={<MenuOutlined />}
            onClick={() => setDrawerOpen(true)}
          />
          <Link to="/admin" className="utente-brand admin-brand">
            <span className="brand-mark">A</span>
            <span><strong>ACMA</strong><small>Painel administrativo</small></span>
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

      <Layout className="admin-workspace">
        <aside className="admin-sidebar">
          {menu('inline')}
        </aside>
        <Content className="admin-content">
          <Routes>
            <Route index element={<Ahome />} />
            <Route path="utentes" element={<Inscri />} />
            <Route path="inscricoes" element={<Inscri />} />
            <Route path="certificados" element={<Consultas />} />
            <Route path="pedidos" element={<Consultas />} />
            <Route path="membros" element={<Membros />} />
            <Route path="*" element={<Ahome />} />
          </Routes>
        </Content>
      </Layout>

      <Drawer
        className="admin-nav-drawer"
        title={<span className="drawer-brand">ACMA <small>Painel administrativo</small></span>}
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

export default MainAdmin;
