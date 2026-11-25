import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

const Contactos = () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    message.success('A sua mensagem foi recebida. A equipa ACMA entrará em contacto.');
    form.resetFields();
  };

  return (
    <main className="page-container">
      <header className="page-heading page-heading--left">
        <span className="eyebrow">Estamos disponíveis</span>
        <h1 className="page-title">Fale com a ACMA</h1>
        <p className="page-lead">Envie-nos uma mensagem ou contacte diretamente a nossa equipa para conversar sobre as suas necessidades.</p>
      </header>
      <div className="form-layout contact-layout">
        <aside className="contact-aside">
          <h2>Vamos encontrar a solução certa.</h2>
          <p>Partilhe o seu objetivo e ajudaremos a identificar o próximo passo.</p>
          <div className="contact-info-card">
            <div className="contact-info-row"><MailOutlined /><div><strong>E-mail</strong><span><a href="mailto:geral@acmaconsultancy.com">geral@acmaconsultancy.com</a></span></div></div>
            <div className="contact-info-row"><PhoneOutlined /><div><strong>Telefone</strong><span><a href="tel:+258869926990">+258 86 992 6990</a></span></div></div>
            <div className="contact-info-row"><EnvironmentOutlined /><div><strong>Localização</strong><span>Maputo, Moçambique</span></div></div>
          </div>
        </aside>

        <section className="form-card">
          <div className="form-card-heading"><h2>Envie uma mensagem</h2><p>Preencha os campos abaixo e entraremos em contacto.</p></div>
          <Form form={form} layout="vertical" onFinish={onFinish} name="contact-form" requiredMark="optional">
            <Form.Item name="nome" label="Nome completo" rules={[{ required: true, message: 'Indique o seu nome.' }]}>
              <Input placeholder="O seu nome" autoComplete="name" />
            </Form.Item>
            <Form.Item name="email" label="E-mail" rules={[{ required: true, message: 'Indique o seu e-mail.' }, { type: 'email', message: 'Introduza um e-mail válido.' }]}>
              <Input placeholder="nome@empresa.com" autoComplete="email" />
            </Form.Item>
            <Form.Item name="assunto" label="Assunto" rules={[{ required: true, message: 'Indique o assunto.' }]}>
              <Input placeholder="Como podemos ajudar?" />
            </Form.Item>
            <Form.Item name="mensagem" label="Mensagem" rules={[{ required: true, message: 'Escreva a sua mensagem.' }]}>
              <Input.TextArea rows={5} placeholder="Conte-nos um pouco sobre o que precisa." />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="form-submit">Enviar mensagem</Button>
            <div className="form-note">Ao enviar, a sua mensagem será encaminhada à equipa de atendimento da ACMA.</div>
          </Form>
        </section>
      </div>
    </main>
  );
};

export default Contactos;
