import React from 'react';
import { Card } from 'antd';
import { ArrowRightOutlined, FileDoneOutlined, SolutionOutlined, TeamOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const shortcuts = [
  {
    title: 'Utentes',
    description: 'Registe, consulte, atualize e remova utentes da plataforma.',
    path: '/admin/utentes',
    icon: <FileDoneOutlined />,
  },
  {
    title: 'Certificados',
    description: 'Consulte os certificados registados no sistema ACMA.',
    path: '/admin/certificados',
    icon: <SolutionOutlined />,
  },
  {
    title: 'Membros',
    description: 'Consulte a lista de membros registados no painel.',
    path: '/admin/membros',
    icon: <TeamOutlined />,
  },
];

const Ahome = () => (
  <main className="admin-dashboard-home">
    <header className="admin-welcome">
      <span className="eyebrow">Painel de gestão</span>
      <h1>Bem-vindo à administração ACMA</h1>
      <p>Escolha uma área para consultar os registos da plataforma ACMA.</p>
    </header>
    <section className="admin-shortcuts" aria-label="Áreas de administração">
      {shortcuts.map((shortcut) => (
        <Link to={shortcut.path} className="admin-shortcut-link" key={shortcut.title}>
          <Card hoverable className="admin-shortcut-card">
            <span className="admin-shortcut-icon">{shortcut.icon}</span>
            <h2>{shortcut.title}</h2>
            <p>{shortcut.description}</p>
            <span className="admin-shortcut-action">Abrir área <ArrowRightOutlined /></span>
          </Card>
        </Link>
      ))}
    </section>

  </main>
);

export default Ahome;
