import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { MailOutlined, PhoneOutlined, QuestionCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useLanguage } from '../../i18n/LanguageContext';

const Suporte = () => {
  const [form] = Form.useForm();
  const { t } = useLanguage();

  const onFinish = () => {
    message.success(t('O pedido foi registado. A equipa ACMA entrará em contacto.'));
    form.resetFields();
  };

  return (
    <main className="page-container">
      <header className="page-heading page-heading--left">
        <span className="eyebrow">{t('Apoio ao cliente')}</span>
        <h1 className="page-title">{t('Como podemos ajudar?')}</h1>
        <p className="page-lead">{t('Descreva a sua questão e a nossa equipa irá orientar o seu pedido.')}</p>
      </header>
      <div className="form-layout">
        <aside className="form-aside">
          <span className="eyebrow">{t('Centro de suporte')}</span>
          <h2>{t('Conte connosco para o próximo passo.')}</h2>
          <p>{t('Partilhe o contexto do seu pedido para que possamos encaminhá-lo da melhor forma.')}</p>
          <div className="form-aside-list">
            <div><MailOutlined /><span><strong>E-mail</strong><br />geral@acmaconsultancy.com</span></div>
            <div><PhoneOutlined /><span><strong>{t('Telefone')}</strong><br />+258 86 992 6990</span></div>
            <div><SafetyCertificateOutlined /><span><strong>{t('Atendimento')}</strong><br />{t('Maputo, Moçambique')}</span></div>
          </div>
        </aside>

        <section className="form-card">
          <div className="form-card-heading"><h2>{t('Abrir um pedido')}</h2><p>{t('Os campos marcados são necessários para analisarmos o pedido.')}</p></div>
          <Form form={form} layout="vertical" onFinish={onFinish} name="support-form" requiredMark="optional">
            <Form.Item name="nome" label={t('Nome completo')} rules={[{ required: true, message: t('Indique o seu nome.') }]}>
              <Input placeholder={t('O seu nome')} autoComplete="name" />
            </Form.Item>
            <Form.Item name="email" label="E-mail" rules={[{ required: true, message: t('Indique o seu e-mail.') }, { type: 'email', message: t('Introduza um e-mail válido.') }]}>
              <Input placeholder={t('nome@empresa.com')} autoComplete="email" />
            </Form.Item>
            <Form.Item name="assunto" label={t('Assunto')} rules={[{ required: true, message: t('Indique o assunto.') }]}>
              <Input placeholder={t('Ex.: acesso a um serviço')} />
            </Form.Item>
            <Form.Item name="descricao" label={t('Descrição do pedido')} rules={[{ required: true, message: t('Descreva o pedido.') }]}>
              <Input.TextArea rows={5} placeholder={t('Descreva o que aconteceu e como podemos ajudar.')} />
            </Form.Item>
            <Button type="primary" htmlType="submit" icon={<QuestionCircleOutlined />} className="form-submit">{t('Enviar pedido')}</Button>
          </Form>
        </section>
      </div>
    </main>
  );
};

export default Suporte;
