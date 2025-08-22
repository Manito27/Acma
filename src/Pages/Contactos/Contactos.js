import React from 'react';
import { Layout, Form, Input, Button, message } from 'antd';

const { Content } = Layout;

const Contactos = () => {
  const [form] = Form.useForm();

  // Função chamada quando o formulário é enviado com sucesso
  const onFinish = (values) => {
    console.log('Dados do formulário:', values);
    message.success('Sua mensagem foi enviada com sucesso!');
    form.resetFields();
  };

  return (
    <Layout style={{ background: '#fff', padding: '40px 0' }}>
      <Content style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Contatos</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          name="contact-form"
        >
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
            <Input placeholder="Assunto da mensagem" />
          </Form.Item>

          <Form.Item
            name="mensagem"
            label="Mensagem"
            rules={[{ required: true, message: 'Por favor, insira sua mensagem' }]}
          >
            <Input.TextArea rows={6} placeholder="Sua mensagem" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Contactos;
