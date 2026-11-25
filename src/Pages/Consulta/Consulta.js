import React, { useState } from 'react';
import { Button, Divider, Form, Input, Modal, Tag, message } from 'antd';
import { CalendarOutlined, DownloadOutlined, EyeOutlined, FileTextOutlined, SearchOutlined } from '@ant-design/icons';
import { getBackendFileUrl, getUtenteCertificados } from '../../services/api';

const Consulta = () => {
  const [form] = Form.useForm();
  const [certificate, setCertificate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async ({ email, nuit }) => {
    setLoading(true);
    try {
      const data = await getUtenteCertificados();
      const requestedEmail = email.trim().toLocaleLowerCase();
      const requestedNuit = String(nuit).trim();
      const found = data.find((item) =>
        String(item.utente?.email ?? item.cliente?.email ?? item.usuario?.email ?? item.email ?? '').trim().toLocaleLowerCase() === requestedEmail &&
        String(item.utente?.nuit ?? item.cliente?.nuit ?? item.usuario?.nuit ?? item.nuit ?? '').trim() === requestedNuit
      );

      if (found) {
        setCertificate(found);
        setModalVisible(true);
        message.success('Certificado encontrado.');
      } else {
        setCertificate(null);
        message.warning('Não encontrámos um certificado com os dados indicados.');
      }
    } catch (error) {
      console.error(error);
      message.error('Não foi possível consultar o certificado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const linkedUtente = certificate?.utente ?? certificate?.cliente ?? certificate?.usuario ?? {};
  const certificateDetails = certificate?.certificado ?? certificate?.certificate ?? certificate ?? {};

  const openCertificate = () => {
    const filePath = certificateDetails?.arquivos ?? certificateDetails?.arquivo ?? certificateDetails?.ficheiro ??
      certificateDetails?.documento ?? certificateDetails?.file ?? certificateDetails?.url;
    if (!filePath) {
      message.error('O ficheiro do certificado não está disponível.');
      return;
    }
    window.open(getBackendFileUrl(filePath), '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="page-container page-container--narrow">
      <header className="page-heading">
        <span className="eyebrow">Serviço online</span>
        <h1 className="page-title">Consultar certificado</h1>
        <p className="page-lead">Introduza o e-mail e o NUIT utilizados no registo para localizar o seu certificado.</p>
      </header>
      <section className="consult-card">
        <div className="consult-card-header">
          <span className="catalog-icon"><FileTextOutlined /></span>
          <h2>Dados de identificação</h2>
          <p>Os dados devem corresponder ao registo associado ao certificado.</p>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark="optional">
          <Form.Item name="email" label="E-mail do titular" rules={[{ required: true, message: 'Indique o seu e-mail.' }, { type: 'email', message: 'Introduza um e-mail válido.' }]}>
            <Input size="large" type="email" placeholder="nome@empresa.com" autoComplete="email" />
          </Form.Item>
          <Form.Item name="nuit" label="NUIT" rules={[{ required: true, message: 'Indique o seu NUIT.' }]}>
            <Input size="large" placeholder="Introduza o NUIT" inputMode="numeric" />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" loading={loading} icon={<SearchOutlined />} block>
            Consultar certificado
          </Button>
        </Form>
        <div className="form-note">Se os seus dados não forem encontrados, confirme que utilizou o mesmo e-mail e NUIT do registo.</div>
      </section>

      <Modal
        title={<span><FileTextOutlined />&nbsp; Certificado encontrado</span>}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={640}
        footer={[
          <Button key="view" icon={<EyeOutlined />} onClick={openCertificate}>Visualizar</Button>,
          <Button key="download" type="primary" icon={<DownloadOutlined />} onClick={openCertificate}>Abrir certificado</Button>,
        ]}
      >
        {certificate && (
          <div className="certificate-info">
            <section className="certificate-info-section">
              <h3>Dados do titular</h3>
              <p><strong>Nome:</strong> {linkedUtente.nome} {linkedUtente.apelido}</p>
              <p><strong>E-mail:</strong> {linkedUtente.email}</p>
              <p><strong>NUIT:</strong> {linkedUtente.nuit}</p>
            </section>
            <Divider style={{ margin: 0 }} />
            <section className="certificate-info-section">
              <h3>Detalhes do certificado</h3>
              <p><strong>Título:</strong> {certificateDetails.titulo || certificateDetails.nome}</p>
              <p><strong>Descrição:</strong> {certificateDetails.descricao || 'Não indicada'}</p>
              <p><CalendarOutlined />&nbsp; <strong>Emissão:</strong> {certificateDetails.data_emissao || '—'}</p>
              <p><CalendarOutlined />&nbsp; <strong>Validade:</strong> {certificateDetails.validade || 'Indefinida'}</p>
              {(certificate.data_atribuicao || certificate.data_criacao) && <Tag color="green">Atribuído em {certificate.data_atribuicao || certificate.data_criacao}</Tag>}
            </section>
          </div>
        )}
      </Modal>
    </main>
  );
};

export default Consulta;
