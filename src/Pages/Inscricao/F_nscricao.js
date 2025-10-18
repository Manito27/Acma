import React, { useState } from 'react';
import { Layout, Form, Input, Button, Typography, Card, Row, Col, message, Spin } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined, HomeOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const Inscricao = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    
    try {
      // Ajuste a URL base de acordo com seu backend
      const response = await axios.post('http://localhost:8000/api/clientes/', {
        nome: values.nome,
        apelido: values.apelido,
        nuit: values.nuit,
        email: values.email,
        telefone: values.telefone || null,
        endereco: values.endereco || null
      });

      if (response.status === 200 || response.status === 201) {
        message.success('Inscrição realizada com sucesso!');
        form.resetFields();
      }
    } catch (error) {
      if (error.response) {
        // Tratamento de erros específicos
        if (error.response.status === 400) {
          const errors = error.response.data;
          
          if (errors.nuit) {
            message.error('Este NUIT já está registado no sistema.');
          } else if (errors.email) {
            message.error('Este email já está registado no sistema.');
          } else {
            message.error('Erro ao processar a inscrição. Verifique os dados e tente novamente.');
          }
        } else {
          message.error('Erro ao conectar com o servidor. Tente novamente mais tarde.');
        }
      } else {
        message.error('Erro de conexão. Verifique sua internet e tente novamente.');
      }
      console.error('Erro na inscrição:', error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Por favor, preencha todos os campos obrigatórios!');
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Content style={{ padding: 0, margin: 0, width: '100%' }}>
        {/* Hero Section */}

        {/* Formulário */}
        <div style={{ padding: '60px 48px', background: '#f8fafc', width: '100%' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Card 
              style={{ 
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                border: 'none'
              }}
            >
              <Form
                form={form}
                name="inscricao_cliente"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                requiredMark="optional"
              >
                <Row gutter={[24, 0]}>
                  {/* Nome */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '16px', fontWeight: '500' }}>Nome</span>}
                      name="nome"
                      rules={[
                        { required: true, message: 'Por favor, insira o seu nome!' },
                        { min: 2, message: 'O nome deve ter pelo menos 2 caracteres!' }
                      ]}
                    >
                      <Input 
                        prefix={<UserOutlined style={{ color: '#1e3a8a' }} />}
                        placeholder="Digite o seu nome"
                        size="large"
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Item>
                  </Col>

                  {/* Apelido */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '16px', fontWeight: '500' }}>Apelido</span>}
                      name="apelido"
                      rules={[
                        { required: true, message: 'Por favor, insira o seu apelido!' },
                        { min: 2, message: 'O apelido deve ter pelo menos 2 caracteres!' }
                      ]}
                    >
                      <Input 
                        prefix={<UserOutlined style={{ color: '#1e3a8a' }} />}
                        placeholder="Digite o seu apelido"
                        size="large"
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Item>
                  </Col>

                  {/* NUIT */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '16px', fontWeight: '500' }}>NUIT</span>}
                      name="nuit"
                      rules={[
                        { required: true, message: 'Por favor, insira o seu NUIT!' },
                        { 
                          pattern: /^[0-9]{9}$/, 
                          message: 'O NUIT deve conter exatamente 9 dígitos!' 
                        }
                      ]}
                    >
                      <Input 
                        prefix={<IdcardOutlined style={{ color: '#1e3a8a' }} />}
                        placeholder="000000000"
                        size="large"
                        maxLength={9}
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Item>
                  </Col>

                  {/* Email */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '16px', fontWeight: '500' }}>Email</span>}
                      name="email"
                      rules={[
                        { required: true, message: 'Por favor, insira o seu email!' },
                        { type: 'email', message: 'Por favor, insira um email válido!' }
                      ]}
                    >
                      <Input 
                        prefix={<MailOutlined style={{ color: '#1e3a8a' }} />}
                        placeholder="exemplo@email.com"
                        size="large"
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Item>
                  </Col>

                  {/* Telefone */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '16px', fontWeight: '500' }}>Telefone (opcional)</span>}
                      name="telefone"
                      rules={[
                        { 
                          pattern: /^[0-9+\s()-]{9,20}$/, 
                          message: 'Por favor, insira um número válido!' 
                        }
                      ]}
                    >
                      <Input 
                        prefix={<PhoneOutlined style={{ color: '#1e3a8a' }} />}
                        placeholder="+258 84 000 0000"
                        size="large"
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Item>
                  </Col>

                  {/* Endereço */}
                  <Col xs={24}>
                    <Form.Item
                      label={<span style={{ fontSize: '16px', fontWeight: '500' }}>Endereço (opcional)</span>}
                      name="endereco"
                    >
                      <TextArea 
                        prefix={<HomeOutlined style={{ color: '#1e3a8a' }} />}
                        placeholder="Rua, Bairro, Cidade, Província"
                        size="large"
                        rows={4}
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Botão de Submissão */}
                <Form.Item style={{ marginTop: '24px', marginBottom: 0 }}>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    size="large"
                    loading={loading}
                    style={{
                      width: '100%',
                      height: '50px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                      border: 'none',
                      fontSize: '18px',
                      fontWeight: '600',
                      boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)'
                    }}
                  >
                    {loading ? 'Processando...' : 'Confirmar Inscrição'}
                  </Button>
                </Form.Item>

                {/* Informação Adicional */}
                <div style={{ 
                  marginTop: '24px', 
                  padding: '16px', 
                  background: '#f0f9ff',
                  borderRadius: '8px',
                  border: '1px solid #bae6fd'
                }}>
                  <Paragraph style={{ 
                    margin: 0, 
                    color: '#0c4a6e',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}>
                    ℹ️ Após a inscrição, você receberá um email de confirmação. 
                    Em caso de dúvidas, entre em contacto através do email: geral@acmaconsultancy.com
                  </Paragraph>
                </div>
              </Form>
            </Card>

            {/* Card de Benefícios */}
            <Row gutter={[24, 24]} style={{ marginTop: '40px' }}>
              <Col xs={24} md={8}>
                <Card 
                  style={{ 
                    textAlign: 'center', 
                    borderRadius: '12px',
                    height: '100%',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎓</div>
                  <Title level={4} style={{ color: '#1e3a8a' }}>Formação de Qualidade</Title>
                  <Paragraph style={{ color: '#64748b' }}>
                    Acesso a cursos e certificações reconhecidas internacionalmente
                  </Paragraph>
                </Card>
              </Col>

              <Col xs={24} md={8}>
                <Card 
                  style={{ 
                    textAlign: 'center', 
                    borderRadius: '12px',
                    height: '100%',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>💼</div>
                  <Title level={4} style={{ color: '#1e3a8a' }}>Oportunidades</Title>
                  <Paragraph style={{ color: '#64748b' }}>
                    Conexão com empresas parceiras e oportunidades de carreira
                  </Paragraph>
                </Card>
              </Col>

              <Col xs={24} md={8}>
                <Card 
                  style={{ 
                    textAlign: 'center', 
                    borderRadius: '12px',
                    height: '100%',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤝</div>
                  <Title level={4} style={{ color: '#1e3a8a' }}>Suporte Contínuo</Title>
                  <Paragraph style={{ color: '#64748b' }}>
                    Acompanhamento personalizado durante toda a sua jornada
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Inscricao;