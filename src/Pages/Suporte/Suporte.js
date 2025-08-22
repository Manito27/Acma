import React from 'react';
import { Layout, Form, Input, Button, message, Card, Row, Col } from 'antd';
import { PhoneOutlined, MailOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Content } = Layout;

const TechnicalSupport = () => {
  const [form] = Form.useForm();

  // Função chamada quando o formulário é enviado com sucesso
  const onFinish = (values) => {
    console.log('Chamado de Suporte:', values);
    message.success('Sua solicitação de suporte foi enviada com sucesso!');
    form.resetFields();
  };

  return (
    <Layout style={{ background: '#fff', padding: '40px 0' }}>
      <Content style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Row gutter={[32, 32]}>
          {/* Seção de Informações de Suporte */}
          <Col xs={24} md={12}>
            <h1>Suporte Técnico</h1>
            <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                Se você está enfrentando problemas técnicos ou precisa de assistência com nossos serviços, 
                preencha o formulário ao lado para abrir um chamado de suporte. Nossa equipe está pronta para ajudar.
              </p>
              <div style={{ marginTop: '20px' }}>
                <p>
                  <PhoneOutlined style={{ marginRight: '8px' }} />
                  Telefone: (11) 1234-5678
                </p>
                <p>
                  <MailOutlined style={{ marginRight: '8px' }} />
                  E-mail: suporte@exemplo.com
                </p>
              </div>
            </Card>
          </Col>

          {/* Formulário para abertura de chamado */}
          <Col xs={24} md={12}>
            <h2>Abrir Chamado</h2>
            <Form form={form} layout="vertical" onFinish={onFinish} name="support-form">
              <Form.Item
                name="nome"
                label="Nome"
                rules={[{ required: true, message: 'Por favor, insira seu nome' }]}
              >
                <Input placeholder="Seu nome" />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  { required: true, message: 'Por favor, insira seu e-mail' },
                  { type: 'email', message: 'Por favor, insira um e-mail válido' },
                ]}
              >
                <Input placeholder="Seu e-mail" />
              </Form.Item>
              <Form.Item
                name="assunto"
                label="Assunto"
                rules={[{ required: true, message: 'Por favor, insira o assunto' }]}
              >
                <Input placeholder="Assunto do problema" />
              </Form.Item>
              <Form.Item
                name="descricao"
                label="Descrição do Problema"
                rules={[{ required: true, message: 'Por favor, descreva o problema' }]}
              >
                <Input.TextArea rows={6} placeholder="Detalhe o problema que está enfrentando" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<QuestionCircleOutlined />} block>
                  Enviar Solicitação
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default TechnicalSupport;
