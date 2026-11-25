import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { IdcardOutlined, MailOutlined, PhoneOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import { createUtente } from '../../services/api';

const Inscricao = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await createUtente({
        nome: values.nome,
        apelido: values.apelido,
        nuit: values.nuit,
        email: values.email,
        telefone: values.telefone || null,
        endereco: values.endereco || null,
      });

      if (response.status === 200 || response.status === 201) {
        message.success('Inscrição realizada com sucesso.');
        form.resetFields();
      }
    } catch (error) {
      if (error.response?.status === 400) {
        const errors = error.response.data;
        if (errors.nuit) message.error('Este NUIT já está registado.');
        else if (errors.email) message.error('Este e-mail já está registado.');
        else message.error('Verifique os dados e tente novamente.');
      } else if (error.response) {
        message.error('Não foi possível concluir a inscrição. Tente novamente mais tarde.');
      } else {
        message.error('Erro de conexão. Verifique a sua ligação à internet.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-container">
      <header className="page-heading page-heading--left">
        <span className="eyebrow">Criar registo ACMA</span>
        <h1 className="page-title">Faça a sua inscrição</h1>
        <p className="page-lead">Registe os seus dados para aceder aos serviços e acompanhar as suas formações.</p>
      </header>
      <div className="form-layout">
        <aside className="form-aside">
          <span className="eyebrow">Bem-vindo à ACMA</span>
          <h2>Um registo simples para começar.</h2>
          <p>Preencha os seus dados com atenção. O NUIT e o e-mail ajudam a identificar o seu registo.</p>
          <div className="form-aside-list">
            <div><SafetyCertificateOutlined /><span>Os campos obrigatórios estão identificados no formulário.</span></div>
            <div><MailOutlined /><span>Utilize um e-mail ativo para receber comunicações.</span></div>
            <div><PhoneOutlined /><span>O telefone e o endereço são opcionais.</span></div>
          </div>
        </aside>

        <section className="form-card">
          <div className="form-card-heading"><h2>Dados pessoais</h2><p>Preencha os campos para concluir o registo.</p></div>
          <Form form={form} name="inscricao_cliente" layout="vertical" onFinish={onFinish} autoComplete="off" requiredMark="optional">
            <div className="registration-grid">
              <Form.Item label="Nome" name="nome" rules={[{ required: true, message: 'Indique o seu nome.' }, { min: 2, message: 'Introduza pelo menos 2 caracteres.' }]}>
                <Input prefix={<UserOutlined />} placeholder="O seu nome" autoComplete="given-name" />
              </Form.Item>
              <Form.Item label="Apelido" name="apelido" rules={[{ required: true, message: 'Indique o seu apelido.' }, { min: 2, message: 'Introduza pelo menos 2 caracteres.' }]}>
                <Input prefix={<UserOutlined />} placeholder="O seu apelido" autoComplete="family-name" />
              </Form.Item>
              <Form.Item label="NUIT" name="nuit" rules={[{ required: true, message: 'Indique o seu NUIT.' }, { pattern: /^[0-9]{9}$/, message: 'O NUIT deve conter 9 dígitos.' }]}>
                <Input prefix={<IdcardOutlined />} placeholder="000000000" maxLength={9} inputMode="numeric" />
              </Form.Item>
              <Form.Item label="E-mail" name="email" rules={[{ required: true, message: 'Indique o seu e-mail.' }, { type: 'email', message: 'Introduza um e-mail válido.' }]}>
                <Input prefix={<MailOutlined />} placeholder="nome@empresa.com" autoComplete="email" />
              </Form.Item>
              <Form.Item label="Telefone (opcional)" name="telefone" rules={[{ pattern: /^[0-9+\s()-]{9,20}$/, message: 'Introduza um número válido.' }]}>
                <Input prefix={<PhoneOutlined />} placeholder="+258 84 000 0000" autoComplete="tel" />
              </Form.Item>
              <Form.Item label="Endereço (opcional)" name="endereco" className="registration-address">
                <Input.TextArea placeholder="Rua, bairro, cidade ou província" rows={3} autoComplete="street-address" />
              </Form.Item>
            </div>
            <Button type="primary" htmlType="submit" loading={loading} className="form-submit">
              {loading ? 'A processar…' : 'Concluir inscrição'}
            </Button>
            <div className="form-note">Ao concluir, os seus dados serão enviados para registo no sistema ACMA.</div>
          </Form>
        </section>
      </div>
    </main>
  );
};

export default Inscricao;
