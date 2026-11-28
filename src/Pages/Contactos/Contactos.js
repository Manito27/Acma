import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useLanguage } from '../../i18n/LanguageContext';

const Contactos = () => {
  const [form] = Form.useForm();
  const { t } = useLanguage();

  const onFinish = () => {
    message.success(t('A sua mensagem foi recebida. A equipa ACMA entrará em contacto.'));
    form.resetFields();
  };

  return (
    <main className="page-container">
      <header className="page-heading page-heading--left">
        <span className="eyebrow">{t('Estamos disponíveis')}</span>
        <h1 className="page-title">{t('Fale com a ACMA')}</h1>
        <p className="page-lead">{t('Envie-nos uma mensagem ou contacte diretamente a nossa equipa para conversar sobre as suas necessidades.')}</p>
      </header>
      <div className="form-layout contact-layout">
        <aside className="contact-aside">
          <h2>{t('Vamos encontrar a solução certa.')}</h2>
          <p>{t('Partilhe o seu objetivo e ajudaremos a identificar o próximo passo.')}</p>
          <div className="contact-info-card">
            <div className="contact-info-row"><MailOutlined /><div><strong>E-mail</strong><span><a href="mailto:geral@acmaconsultancy.com">geral@acmaconsultancy.com</a></span></div></div>
            <div className="contact-info-row"><PhoneOutlined /><div><strong>{t('Telefone')}</strong><span><a href="tel:+258869926990">+258 86 992 6990</a></span></div></div>
            <div className="contact-info-row"><EnvironmentOutlined /><div><strong>{t('Localização')}</strong><span>{t('Maputo, Moçambique')}</span></div></div>
          </div>
        </aside>

        <section className="form-card">
          <div className="form-card-heading"><h2>{t('Envie uma mensagem')}</h2><p>{t('Preencha os campos abaixo e entraremos em contacto.')}</p></div>
          <Form form={form} layout="vertical" onFinish={onFinish} name="contact-form" requiredMark="optional">
            <Form.Item name="nome" label={t('Nome completo')} rules={[{ required: true, message: t('Indique o seu nome.') }]}>
              <Input placeholder={t('O seu nome')} autoComplete="name" />
            </Form.Item>
            <Form.Item name="email" label="E-mail" rules={[{ required: true, message: t('Indique o seu e-mail.') }, { type: 'email', message: t('Introduza um e-mail válido.') }]}>
              <Input placeholder={t('nome@empresa.com')} autoComplete="email" />
            </Form.Item>
            <Form.Item name="assunto" label={t('Assunto')} rules={[{ required: true, message: t('Indique o assunto.') }]}>
              <Input placeholder={t('Como podemos ajudar?')} />
            </Form.Item>
            <Form.Item name="mensagem" label={t('Mensagem')} rules={[{ required: true, message: t('Escreva a sua mensagem.') }]}>
              <Input.TextArea rows={5} placeholder={t('Conte-nos um pouco sobre o que precisa.')} />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="form-submit">{t('Enviar mensagem')}</Button>
            <div className="form-note">{t('Ao enviar, a sua mensagem será encaminhada à equipa de atendimento da ACMA.')}</div>
          </Form>
        </section>
      </div>
    </main>
  );
};

export default Contactos;
