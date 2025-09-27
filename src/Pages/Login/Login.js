// src/Pages/Login/Login.js

import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  // Função que é chamada quando o formulário é submetido com sucesso
  const onFinish = (values) => {
    console.log('Dados recebidos do formulário: ', values);
    
    // --- LÓGICA DE AUTENTICAÇÃO ---
    // Aqui você deve adicionar a sua lógica real de autenticação.
    // Por exemplo, verificar se 'values.username' e 'values.password' são corretos.
    
    // Exemplo simples de validação:
    if (values.username === 'admin' && values.password === 'password') {
      message.success('Login bem-sucedido!');
      // Redireciona para uma página de dashboard ou para a página inicial após o login
      navigate('/home'); 
    } else {
      message.error('Nome de usuário ou senha incorretos!');
    }
  };

  return (
    // Container para centralizar o card de login na tela
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '50px 0' // Adiciona um espaçamento vertical
    }}>
      <Card 
        title={
          <Title level={2} style={{ textAlign: 'center', marginBottom: 0 }}>
            Área de Acesso
          </Title>
        }
        style={{ 
          width: 400, 
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}
      >
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large" // Deixa os campos maiores e mais fáceis de usar
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Por favor, insira seu nome de usuário!' }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
              placeholder="Nome de Usuário" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Senha"
            />
          </Form.Item>

          <Form.Item>
            <a className="login-form-forgot" href="/esqueci-senha" style={{ float: 'right' }}>
              Esqueceu a senha?
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;