import React from 'react';
import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

const AboutWebsite = () => {
  return (
    <Layout style={{ background: '#fff', padding: '40px 0' }}>
      <Content style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          color: '#1565C0',
          fontSize: '32px',
          fontWeight: '600'
        }}>
          Sobre a Plataforma ACMA
        </h1>
        
        <Row justify="center" gutter={[16, 16]}>
          <Col xs={24} sm={22} md={20}>
            <div style={{ 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              padding: '20px'
            }}>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Bem-vindo à plataforma digital da <strong>ACMA, LDA</strong>, sua parceira estratégica em consultoria especializada, formação profissional e certificações internacionais. Nossa plataforma foi desenvolvida para oferecer soluções integradas nos setores de Telecomunicações, Informática, Segurança Ocupacional e Gestão de Qualidade.
              </p>
              
              <h2 style={{ 
                color: '#1890ff',
                margin: '24px 0 16px',
                fontSize: '22px'
              }}>
                Nossa Missão Digital
              </h2>
              
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Através desta plataforma, democratizamos o acesso a:
              </p>
              
              <ul style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                marginBottom: '20px',
                paddingLeft: '20px'
              }}>
                <li>Cursos internacionais reconhecidos (ISO, OSHA, STCW, IOSH)</li>
                <li>Sistemas de consultoria e certificação para PMEs</li>
                <li>Ferramentas de avaliação de riscos ocupacionais (IGAORHSW)</li>
                <li>Plataforma de gestão de recursos humanos e logística</li>
                <li>Monitoramento e implementação de normas de qualidade</li>
              </ul>
              
              <h2 style={{ 
                color: '#1890ff',
                margin: '24px 0 16px',
                fontSize: '22px'
              }}>
                Tecnologia e Profissionalismo
              </h2>
              
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Desenvolvemos esta plataforma com tecnologia de ponta para garantir:
              </p>
              
              <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                <Col xs={24} sm={12}>
                  <div style={{ 
                    background: '#f0f9ff',
                    padding: '15px',
                    borderRadius: '6px',
                    height: '100%'
                  }}>
                    <h3 style={{ color: '#1565C0', marginBottom: '10px' }}>Segurança de Dados</h3>
                    <p>Proteção garantida para todas as suas informações e certificações</p>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div style={{ 
                    background: '#f0f9ff',
                    padding: '15px',
                    borderRadius: '6px',
                    height: '100%'
                  }}>
                    <h3 style={{ color: '#1565C0', marginBottom: '10px' }}>Acesso Multiplataforma</h3>
                    <p>Disponível em qualquer dispositivo, a qualquer momento</p>
                  </div>
                </Col>
              </Row>
              
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Nossa equipe de especialistas está comprometida em fornecer conteúdo atualizado e suporte técnico especializado, garantindo que sua experiência na plataforma seja produtiva e eficiente.
              </p>
              
              <div style={{ 
                background: '#e6f7ff',
                padding: '20px',
                borderRadius: '6px',
                marginTop: '30px',
                borderLeft: '4px solid #1890ff'
              }}>
                <p style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: '1.6', 
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  "Na ACMA, combinamos expertise técnica com inovação digital para transformar desafios organizacionais em oportunidades de crescimento sustentável."
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AboutWebsite;
