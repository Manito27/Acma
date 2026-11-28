import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { IdcardOutlined, LockOutlined, MailOutlined, PhoneOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import { createUtente } from '../../services/api';
import { useLanguage } from '../../i18n/LanguageContext';

const Inscricao = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await createUtente({
        nome: values.nome,
        apelido: values.apelido,
        username: values.username,
        password: values.password,
        nuit: values.nuit,
        email: values.email,
        telefone: values.telefone || null,
        endereco: values.endereco || null,
      });

      if (response.status === 200 || response.status === 201) {
        message.success(t('Inscrição realizada com sucesso.'));
        form.resetFields();
      }
    } catch (error) {
      if (error.response?.status === 400) {
        const errors = error.response.data;
        if (errors.nuit) message.error(t('Este NUIT já está registado.'));
        else if (errors.email) message.error(t('Este e-mail já está registado.'));
        else if (errors.username) message.error(t('Este nome de utilizador já está registado ou não é válido.'));
        else if (errors.password) message.error(t('A palavra-passe deve ter pelo menos 8 caracteres.'));
        else if (errors.non_field_errors) message.error(errors.non_field_errors[0]);
        else message.error(t('Verifique os dados e tente novamente.'));
      } else if (error.response) {
        message.error(t('Não foi possível concluir a inscrição. Tente novamente mais tarde.'));
      } else {
        message.error(t('Erro de conexão. Verifique a sua ligação à internet.'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-container">
      <header className="page-heading page-heading--left">
        <span className="eyebrow">{t('Criar registo ACMA')}</span>
        <h1 className="page-title">{t('Faça a sua inscrição')}</h1>
        <p className="page-lead">{t('Registe os seus dados para aceder aos serviços e acompanhar as suas formações.')}</p>
      </header>
      <div className="form-layout">
        <aside className="form-aside">
          <span className="eyebrow">{t('Bem-vindo à ACMA')}</span>
          <h2>{t('Um registo simples para começar.')}</h2>
          <p>{t('Preencha os seus dados com atenção. O NUIT e o e-mail ajudam a identificar o seu registo.')}</p>
          <div className="form-aside-list">
            <div><SafetyCertificateOutlined /><span>{t('Os campos obrigatórios estão identificados no formulário.')}</span></div>
            <div><MailOutlined /><span>{t('Utilize um e-mail ativo para receber comunicações.')}</span></div>
            <div><PhoneOutlined /><span>{t('O telefone e o endereço são opcionais.')}</span></div>
          </div>
        </aside>

        <section className="form-card">
          <div className="form-card-heading"><h2>{t('Dados pessoais')}</h2><p>{t('Preencha os campos para concluir o registo.')}</p></div>
          <Form form={form} name="inscricao_cliente" layout="vertical" onFinish={onFinish} autoComplete="off" requiredMark="optional">
            <div className="registration-grid">
              <Form.Item label={t('Nome de utilizador')} name="username" rules={[{ required: true, message: t('Indique um nome de utilizador.') }, { min: 3, max: 150, message: t('O nome de utilizador deve ter entre 3 e 150 caracteres.') }]}>
                <Input prefix={<UserOutlined />} placeholder={t('Escolha um nome de utilizador')} autoComplete="username" />
              </Form.Item>
              <Form.Item label={t('Palavra-passe')} name="password" rules={[{ required: true, message: t('Indique uma palavra-passe.') }, { min: 8, message: t('A palavra-passe deve ter pelo menos 8 caracteres.') }]}>
                <Input.Password prefix={<LockOutlined />} placeholder={t('Crie uma palavra-passe')} autoComplete="new-password" />
              </Form.Item>
              <Form.Item
                label={t('Confirmar palavra-passe')}
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: t('Confirme a sua palavra-passe.') },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) return Promise.resolve();
                      return Promise.reject(new Error(t('As palavras-passe não coincidem.')));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder={t('Repita a palavra-passe')} autoComplete="new-password" />
              </Form.Item>
              <Form.Item label={t('Nome')} name="nome" rules={[{ required: true, message: t('Indique o seu nome.') }, { min: 2, message: t('Introduza pelo menos 2 caracteres.') }]}>
                <Input prefix={<UserOutlined />} placeholder={t('O seu nome')} autoComplete="given-name" />
              </Form.Item>
              <Form.Item label={t('Apelido')} name="apelido" rules={[{ required: true, message: t('Indique o seu apelido.') }, { min: 2, message: t('Introduza pelo menos 2 caracteres.') }]}>
                <Input prefix={<UserOutlined />} placeholder={t('O seu apelido')} autoComplete="family-name" />
              </Form.Item>
              <Form.Item label="NUIT" name="nuit" rules={[{ required: true, message: t('Indique o seu NUIT.') }, { pattern: /^[0-9]{9}$/, message: t('O NUIT deve conter 9 dígitos.') }]}>
                <Input prefix={<IdcardOutlined />} placeholder="000000000" maxLength={9} inputMode="numeric" />
              </Form.Item>
              <Form.Item label="E-mail" name="email" rules={[{ required: true, message: t('Indique o seu e-mail.') }, { type: 'email', message: t('Introduza um e-mail válido.') }]}>
                <Input prefix={<MailOutlined />} placeholder="nome@empresa.com" autoComplete="email" />
              </Form.Item>
              <Form.Item label={t('Telefone (opcional)')} name="telefone" rules={[{ pattern: /^[0-9+\s()-]{9,20}$/, message: t('Introduza um número válido.') }]}>
                <Input prefix={<PhoneOutlined />} placeholder="+258 84 000 0000" autoComplete="tel" />
              </Form.Item>
              <Form.Item label={t('Endereço (opcional)')} name="endereco" className="registration-address">
                <Input.TextArea placeholder={t('Rua, bairro, cidade ou província')} rows={3} autoComplete="street-address" />
              </Form.Item>
            </div>
            <Button type="primary" htmlType="submit" loading={loading} className="form-submit">
              {loading ? t('A processar…') : t('Concluir inscrição')}
            </Button>
            <div className="form-note">{t('Ao concluir, os seus dados serão enviados para registo no sistema ACMA.')}</div>
          </Form>
        </section>
      </div>
    </main>
  );
};

export default Inscricao;
