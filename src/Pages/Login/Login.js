import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { CheckCircleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuthSession, login, resolveLoginRole, saveAuthSession } from '../../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await login({ username: values.username, password: values.password });
      const role = resolveLoginRole(response);

      if (!role) {
        clearAuthSession();
        message.error('O servidor autenticou o utilizador, mas não devolveu o perfil admin ou utente.');
        return;
      }

      saveAuthSession(response, role);
      message.success('Sessão iniciada.');
      navigate(role === 'admin' ? '/admin' : '/utente');
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 401) {
        const detail = error.response.data?.detail ?? error.response.data?.message;
        message.error(typeof detail === 'string' ? detail : 'Nome de utilizador ou palavra-passe incorretos.');
      } else if (error.response) {
        message.error('Não foi possível iniciar sessão. Tente novamente mais tarde.');
      } else {
        message.error('Não foi possível ligar ao servidor Django em execução local.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-story">
        <span className="eyebrow">Área do utilizador</span>
        <h1>Bem-vindo de volta à ACMA.</h1>
        <p>Entre com a sua conta ACMA. O servidor encaminha cada perfil para a respetiva área.</p>
        <div className="auth-benefits">
          <span><CheckCircleOutlined /> Acesso aos serviços da ACMA</span>
          <span><CheckCircleOutlined /> Acompanhamento de formações</span>
          <span><CheckCircleOutlined /> Consulta de informação e certificados</span>
        </div>
      </section>
      <section className="auth-form-area">
        <div className="auth-card">
          <span className="eyebrow">Entrar na plataforma</span>
          <h2>Iniciar sessão</h2>
          <p>Introduza os seus dados de acesso para continuar.</p>
          <Form
            name="login_form"
            layout="vertical"
            onFinish={onFinish}
            size="large"
            autoComplete="on"
          >
            <Form.Item name="username" label="Nome de utilizador" rules={[{ required: true, message: 'Indique o seu nome de utilizador.' }]}>
              <Input prefix={<UserOutlined />} placeholder="O seu utilizador" autoComplete="username" />
            </Form.Item>
            <Form.Item name="password" label="Palavra-passe" rules={[{ required: true, message: 'Indique a sua palavra-passe.' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="A sua palavra-passe" autoComplete="current-password" />
            </Form.Item>
            <div className="auth-help"><Link to="/suporte">Precisa de ajuda para aceder?</Link></div>
            <Button type="primary" htmlType="submit" block loading={loading}>Entrar</Button>
          </Form>
          <div className="auth-footnote">Ainda não tem registo? <Link to="/inscricao">Faça a sua inscrição</Link>.</div>
        </div>
      </section>
    </main>
  );
};

export default Login;
