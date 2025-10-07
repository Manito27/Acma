import React, { useState } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';

const CertificateQueryForm = () => {
  const [form] = Form.useForm();
  const [certificate, setCertificate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onFinish = async (values) => {
    const { email, nuit } = values;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/cliente-certificados/');
      if (!response.ok) throw new Error('Erro ao consultar API');

      const data = await response.json();

      // Filtra por email e NUIT do cliente
      const found = data.find(
        (item) =>
          item.cliente.email.toLowerCase() === email.toLowerCase() &&
          item.cliente.nuit === nuit
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
    if (!certificate?.certificado?.arquivos) {
      message.error('Arquivo do certificado não disponível!');
      return;
    }
    window.open(`http://127.0.0.1:8000${certificate.certificado.arquivos}`, '_blank');
    message.success('Iniciando download do certificado...');
  };

  const handleView = () => {
    if (!certificate?.certificado?.arquivos) {
      message.error('Arquivo do certificado não disponível!');
      return;
    }
    window.open(`http://127.0.0.1:8000${certificate.certificado.arquivos}`, '_blank');
  };

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
              <strong>Cliente:</strong> {certificate.cliente.nome} {certificate.cliente.apelido}
            </p>
            <p>
              <strong>Email:</strong> {certificate.cliente.email}
            </p>
            <p>
              <strong>NUIT:</strong> {certificate.cliente.nuit}
            </p>
            <hr />
            <p>
              <strong>Certificado:</strong> {certificate.certificado.titulo}
            </p>
            <p>
              <strong>Descrição:</strong> {certificate.certificado.descricao || 'N/A'}
            </p>
            <p>
              <strong>Data de Emissão:</strong> {certificate.certificado.data_emissao}
            </p>
            <p>
              <strong>Validade:</strong> {certificate.certificado.validade || 'Indefinida'}
            </p>
          </>
        )}
      </Modal>
    </>
  );
};

export default CertificateQueryForm;
