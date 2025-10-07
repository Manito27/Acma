import React, { useState } from 'react';
import { Form, Input, Button, message, Modal, Card, Divider, Tag } from 'antd';
import { SearchOutlined, DownloadOutlined, EyeOutlined, FileTextOutlined, CalendarOutlined } from '@ant-design/icons';

const CertificateQueryForm = () => {
  const [form] = Form.useForm();
  const [certificate, setCertificate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseUrl = "https://acmabackendv2.onrender.com";

  const onFinish = async (values) => {
    const { email, nuit } = values;
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/acma_api/cliente-certificados/`);
      if (!response.ok) throw new Error('Erro ao consultar API');

      const data = await response.json();

      // Filtra por email e NUIT do cliente
      const found = data.find(
        (item) =>
          item.cliente?.email?.toLowerCase() === email.toLowerCase() &&
          item.cliente?.nuit === nuit
      );

      if (found) {
        setCertificate(found);
        setModalVisible(true);
        message.success('Certificado encontrado com sucesso!');
      } else {
        setCertificate(null);
        message.warning('Nenhum certificado encontrado para os dados informados.');
      }
    } catch (error) {
      console.error(error);
      message.error('Erro ao consultar o certificado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!certificate?.certificado?.arquivos) {
      message.error('Arquivo do certificado não disponível!');
      return;
    }
    const fileUrl = certificate.certificado.arquivos.startsWith('http') 
      ? certificate.certificado.arquivos 
      : `${baseUrl}${certificate.certificado.arquivos}`;
    
    window.open(fileUrl, '_blank');
    message.success('Iniciando download do certificado...');
  };

  const handleView = () => {
    if (!certificate?.certificado?.arquivos) {
      message.error('Arquivo do certificado não disponível!');
      return;
    }
    const fileUrl = certificate.certificado.arquivos.startsWith('http') 
      ? certificate.certificado.arquivos 
      : `${baseUrl}${certificate.certificado.arquivos}`;
    
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-2xl rounded-2xl border-0">
          <div className="text-center mb-8">
            <FileTextOutlined className="text-6xl text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Consulta de Certificados
            </h2>
            <p className="text-gray-600">
              Insira seus dados para verificar seus certificados
            </p>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-4"
          >
            <Form.Item
              name="email"
              label={<span className="text-gray-700 font-semibold">Email do Cliente</span>}
              rules={[
                { required: true, message: 'Por favor, insira o email!' },
                { type: 'email', message: 'Email inválido!' }
              ]}
            >
              <Input 
                size="large"
                placeholder="exemplo@email.com" 
                prefix={<span className="text-gray-400">@</span>}
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="nuit"
              label={<span className="text-gray-700 font-semibold">NUIT do Cliente</span>}
              rules={[{ required: true, message: 'Por favor, insira o NUIT!' }]}
            >
              <Input 
                size="large"
                placeholder="Ex: 123456789" 
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large"
                loading={loading}
                icon={<SearchOutlined />}
                className="w-full h-12 text-lg font-semibold rounded-lg bg-blue-600 hover:bg-blue-700"
              >
                Consultar Certificado
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Modal
          title={
            <div className="flex items-center gap-2 text-xl">
              <FileTextOutlined className="text-blue-600" />
              <span>Certificado Encontrado</span>
            </div>
          }
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          width={600}
          footer={[
            <Button 
              key="view" 
              icon={<EyeOutlined />}
              size="large"
              onClick={handleView}
              className="rounded-lg"
            >
              Visualizar
            </Button>,
            <Button 
              key="download" 
              type="primary" 
              icon={<DownloadOutlined />}
              size="large"
              onClick={handleDownload}
              className="rounded-lg bg-blue-600 hover:bg-blue-700"
            >
              Baixar
            </Button>,
          ]}
        >
          {certificate && (
            <div className="space-y-4">
              {/* Informações do Cliente */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Dados do Cliente
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Nome:</strong> {certificate.cliente.nome} {certificate.cliente.apelido}
                  </p>
                  <p>
                    <strong>Email:</strong> {certificate.cliente.email}
                  </p>
                  <p>
                    <strong>NUIT:</strong> {certificate.cliente.nuit}
                  </p>
                </div>
              </div>

              <Divider className="my-4" />

              {/* Informações do Certificado */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Detalhes do Certificado
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Título:</strong> {certificate.certificado.titulo}
                  </p>
                  <p>
                    <strong>Descrição:</strong> {certificate.certificado.descricao || 'Não informada'}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <CalendarOutlined className="text-blue-600" />
                    <span>
                      <strong>Emissão:</strong> {certificate.certificado.data_emissao}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarOutlined className="text-orange-600" />
                    <span>
                      <strong>Validade:</strong> {certificate.certificado.validade || 'Indefinida'}
                    </span>
                  </div>
                  <div className="mt-3">
                    <Tag color="green" className="text-sm px-3 py-1">
                      Data de Atribuição: {certificate.data_atribuicao}
                    </Tag>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default CertificateQueryForm;