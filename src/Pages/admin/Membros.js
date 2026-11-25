import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, message } from 'antd';
import { getAdministradores } from '../../services/api';

const getAdminName = (admin) => {
  const user = admin.user ?? admin.usuario ?? admin;
  return [user.nome ?? user.first_name, user.apelido ?? user.last_name].filter(Boolean).join(' ') || '—';
};

const Membros = () => {
  const [administradores, setAdministradores] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getAdministradores()
      .then((records) => { if (active) setAdministradores(records); })
      .catch(() => { if (active) message.error('Não foi possível carregar os administradores.'); })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, []);

  const columns = [
    { title: 'Nome', key: 'nome', render: (_, record) => getAdminName(record) },
    { title: 'E-mail', key: 'email', render: (_, record) => record.email ?? record.user?.email ?? record.usuario?.email ?? '—' },
    { title: 'Contacto', key: 'telefone', render: (_, record) => record.telefone ?? record.phone ?? '—' },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, record) => <Button type="link" onClick={() => setSelectedAdmin(record)}>Ver detalhes</Button>,
    },
  ];

  return (
    <section className="admin-data-page">
      <header className="admin-data-heading">
        <div><span className="eyebrow">Equipa administrativa</span><h2>Membros</h2></div>
        <span>{administradores.length} membro(s)</span>
      </header>
      <Table
        rowKey={(record) => record.id ?? record.pk ?? record.email}
        columns={columns}
        dataSource={administradores}
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: false }}
        scroll={{ x: 620 }}
        locale={{ emptyText: loading ? 'A carregar membros…' : 'Não existem administradores registados.' }}
      />
      <Modal
        title="Detalhes do membro"
        open={Boolean(selectedAdmin)}
        onCancel={() => setSelectedAdmin(null)}
        footer={<Button onClick={() => setSelectedAdmin(null)}>Fechar</Button>}
      >
        {selectedAdmin && (
          <div className="admin-member-details">
            <p><strong>Nome:</strong> {getAdminName(selectedAdmin)}</p>
            <p><strong>E-mail:</strong> {selectedAdmin.email ?? selectedAdmin.user?.email ?? selectedAdmin.usuario?.email ?? '—'}</p>
            <p><strong>Contacto:</strong> {selectedAdmin.telefone ?? selectedAdmin.phone ?? '—'}</p>
            <p><strong>Perfil:</strong> {selectedAdmin.role ?? selectedAdmin.tipo ?? 'Administrador'}</p>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Membros;
