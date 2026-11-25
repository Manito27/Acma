import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { MailOutlined, PhoneOutlined, QuestionCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const Suporte = () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    message.success('O pedido foi registado. A equipa ACMA entrará em contacto.');
    form.resetFields();
  };

  return (
    <main className="page-container">
      <header className="page-heading page-heading--left">
        <span className="eyebrow">Apoio ao cliente</span>
        <h1 className="page-title">Como podemos ajudar?</h1>
        <p className="page-lead">Descreva a sua questão e a nossa equipa irá orientar o seu pedido.</p>
      </header>
      <div className="form-layout">
        <aside className="form-aside">
          <span className="eyebrow">Centro de suporte</span>
          <h2>Conte connosco para o próximo passo.</h2>
          <p>Partilhe o contexto do seu pedido para que possamos encaminhá-lo da melhor forma.</p>
          <div className="form-aside-list">
            <div><MailOutlined /><span><strong>E-mail</strong><br />geral@acmaconsultancy.com</span></div>
            <div><PhoneOutlined /><span><strong>Telefone</strong><br />+258 86 992 6990</span></div>
            <div><SafetyCertificateOutlined /><span><strong>Atendimento</strong><br />Maputo, Moçambique</span></div>
          </div>
        </aside>

        <section className="form-card">
          <div className="form-card-heading"><h2>Abrir um pedido</h2><p>Os campos marcados são necessários para analisarmos o pedido.</p></div>
          <Form form={form} layout="vertical" onFinish={onFinish} name="support-form" requiredMark="optional">
            <Form.Item name="nome" label="Nome completo" rules={[{ required: true, message: 'Indique o seu nome.' }]}>
              <Input placeholder="O seu nome" autoComplete="name" />
            </Form.Item>
            <Form.Item name="email" label="E-mail" rules={[{ required: true, message: 'Indique o seu e-mail.' }, { type: 'email', message: 'Introduza um e-mail válido.' }]}>
              <Input placeholder="nome@empresa.com" autoComplete="email" />
            </Form.Item>
            <Form.Item name="assunto" label="Assunto" rules={[{ required: true, message: 'Indique o assunto.' }]}>
              <Input placeholder="Ex.: acesso a um serviço" />
            </Form.Item>
            <Form.Item name="descricao" label="Descrição do pedido" rules={[{ required: true, message: 'Descreva o pedido.' }]}>
              <Input.TextArea rows={5} placeholder="Descreva o que aconteceu e como podemos ajudar." />
            </Form.Item>
            <Button type="primary" htmlType="submit" icon={<QuestionCircleOutlined />} className="form-submit">Enviar pedido</Button>
          </Form>
        </section>
      </div>
    </main>
  );
};

export default Suporte;
