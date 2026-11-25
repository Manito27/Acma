import React, { useState } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import { getBackendFileUrl, getUtenteCertificados } from '../../services/api';

const CertificateQueryForm = () => {
  const [form] = Form.useForm();
  const [certificate, setCertificate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onFinish = async (values) => {
    const { email, nuit } = values;

    try {
      const data = await getUtenteCertificados();

      // Filtra por email e NUIT do cliente
      const found = data.find(
        (item) =>
          (item.utente?.email ?? item.cliente?.email ?? item.email)?.toLowerCase() === email.toLowerCase() &&
          String(item.utente?.nuit ?? item.cliente?.nuit ?? item.nuit) === String(nuit)
      );

      if (found) {
        setCertificate(found);
        setModalVisible(true);
      } else {
        setCertificate(null);
        message.error('Nenhum certificado encontrado para os dados informados!');
      }
    } catch (error) {
      console.error(error);
      message.error('Erro ao consultar o certificado. Tente novamente.');
    }
  };

  const handleDownload = () => {
    const filePath = certificate?.certificado?.arquivos ?? certificate?.certificate?.arquivos ?? certificate?.arquivos;
    if (!filePath) {
      message.error('Arquivo do certificado não disponível!');
      return;
    }
    window.open(getBackendFileUrl(filePath), '_blank', 'noopener,noreferrer');
    message.success('Iniciando download do certificado...');
  };

  const handleView = () => {
    const filePath = certificate?.certificado?.arquivos ?? certificate?.certificate?.arquivos ?? certificate?.arquivos;
    if (!filePath) {
      message.error('Arquivo do certificado não disponível!');
      return;
    }
    window.open(getBackendFileUrl(filePath), '_blank', 'noopener,noreferrer');
  };

  const linkedUtente = certificate?.utente ?? certificate?.cliente ?? {};
  const certificateDetails = certificate?.certificado ?? certificate?.certificate ?? certificate ?? {};

  return (
    <>
      <h2 style={{ textAlign: 'center', color: '#0D47A1', marginBottom: 20 }}>
        Consulta de Certificados
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{
          maxWidth: 500,
          margin: '0 auto',
          background: '#fff',
          padding: 24,
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Form.Item
          name="email"
          label="Email do Cliente"
          rules={[{ required: true, message: 'Insira o email!', type: 'email' }]}
        >
          <Input placeholder="exemplo@email.com" />
        </Form.Item>

        <Form.Item
          name="nuit"
          label="NUIT do Cliente"
          rules={[{ required: true, message: 'Insira o NUIT!' }]}
        >
          <Input placeholder="Ex: 123456789" />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            Consultar Certificado
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Certificado Encontrado"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="view" onClick={handleView}>
            Visualizar
          </Button>,
          <Button key="download" type="primary" onClick={handleDownload}>
            Baixar
          </Button>,
        ]}
      >
        {certificate && (
          <>
            <p>
              <strong>Utente:</strong> {linkedUtente.nome} {linkedUtente.apelido}
            </p>
            <p>
              <strong>Email:</strong> {linkedUtente.email}
            </p>
            <p>
              <strong>NUIT:</strong> {linkedUtente.nuit}
            </p>
            <hr />
            <p>
              <strong>Certificado:</strong> {certificateDetails.titulo || certificateDetails.nome}
            </p>
            <p>
              <strong>Descrição:</strong> {certificateDetails.descricao || 'N/A'}
            </p>
            <p>
              <strong>Data de Emissão:</strong> {certificateDetails.data_emissao || '—'}
            </p>
            <p>
              <strong>Validade:</strong> {certificateDetails.validade || 'Indefinida'}
            </p>
          </>
        )}
      </Modal>
    </>
  );
};

export default CertificateQueryForm;
