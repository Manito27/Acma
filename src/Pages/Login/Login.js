import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { CheckCircleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuthSession, login, resolveLoginRole, saveAuthSession } from '../../services/api';
import { useLanguage } from '../../i18n/LanguageContext';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await login({ username: values.username, password: values.password });
      const role = resolveLoginRole(response);

      if (!role) {
        clearAuthSession();
        message.error(t('O servidor autenticou o utilizador, mas não devolveu o perfil admin ou utente.'));
        return;
      }

      saveAuthSession(response, role, values.username);
      message.success(t('Sessão iniciada.'));
      navigate(role === 'admin' ? '/admin' : '/utente');
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 401) {
        const detail = error.response.data?.detail ?? error.response.data?.message;
        message.error(typeof detail === 'string' ? detail : t('Nome de utilizador ou palavra-passe incorretos.'));
      } else if (error.response) {
        message.error(t('Não foi possível iniciar sessão. Tente novamente mais tarde.'));
      } else {
        message.error(t('Não foi possível ligar ao servidor Django em execução local.'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-story">
        <span className="eyebrow">{t('Área do utilizador')}</span>
        <h1>{t('Bem-vindo de volta à ACMA.')}</h1>
        <p>{t('Entre com a sua conta ACMA. O servidor encaminha cada perfil para a respetiva área.')}</p>
        <div className="auth-benefits">
          <span><CheckCircleOutlined /> {t('Acesso aos serviços da ACMA')}</span>
          <span><CheckCircleOutlined /> {t('Acompanhamento de formações')}</span>
          <span><CheckCircleOutlined /> {t('Consulta de informação e certificados')}</span>
        </div>
      </section>
      <section className="auth-form-area">
        <div className="auth-card">
          <span className="eyebrow">{t('Entrar na plataforma')}</span>
          <h2>{t('Iniciar sessão')}</h2>
          <p>{t('Introduza os seus dados de acesso para continuar.')}</p>
          <Form
            name="login_form"
            layout="vertical"
            onFinish={onFinish}
            size="large"
            autoComplete="on"
          >
            <Form.Item name="username" label={t('Nome de utilizador')} rules={[{ required: true, message: t('Indique o seu nome de utilizador.') }]}>
              <Input prefix={<UserOutlined />} placeholder={t('O seu utilizador')} autoComplete="username" />
            </Form.Item>
            <Form.Item name="password" label={t('Palavra-passe')} rules={[{ required: true, message: t('Indique a sua palavra-passe.') }]}>
              <Input.Password prefix={<LockOutlined />} placeholder={t('A sua palavra-passe')} autoComplete="current-password" />
            </Form.Item>
            <div className="auth-help"><Link to="/suporte">{t('Precisa de ajuda para aceder?')}</Link></div>
            <Button type="primary" htmlType="submit" block loading={loading}>{t('Entrar')}</Button>
          </Form>
          <div className="auth-footnote">{t('Ainda não tem registo?')} <Link to="/inscricao">{t('Faça a sua inscrição')}</Link>.</div>
        </div>
      </section>
    </main>
  );
};

export default Login;
