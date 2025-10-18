import React from 'react';
import { Layout, Typography, Row, Col, Card, Divider } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, FacebookOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';

import Whash from '../../assets/img/Whash.jpg';
import BigLifiting from '../../assets/img/BigLifiting.jpg';
import lifingtManager from '../../assets/img/lifingtManager.jpg';
import evento1 from '../../assets/img/evento1.jpg';
import prevencaoIncendiosImg from '../../assets/img/prevencao-incendios.jpg';
import sobrevivenciaMarImg from '../../assets/img/sobrevivencia-mar.jpg';
import segurancaMaritimaImg from '../../assets/img/seguranca-maritima.jpg';

const { Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const services = [
    {
      title: 'WASH (WATER SANITATION HYGIENE)',
      image: Whash,
      description: 'Em 2020 nasce a ACMA, LDA para salvaguardar a gestão empresarial e educacional em Moçambique e no mundo todo, garantindo um bom ambiente nas relações estabelecidas com os Recursos Humanos.'
    },
    {
      title: 'BIG LIFTING',
      image: BigLifiting,
      description: 'O principal objetivo é o recrutamento, prestação de serviços e fornecimento de quadros profissionais, além de formação técnica e científica.'
    },
    {
      title: 'GENERAL CERTIFICATE IN LIFTING MANAGER',
      image: lifingtManager,
      description: 'Aprimorar a estrutura organizacional, fortalecer a eficiência entre setores e desenvolver soluções firmes em TICs para melhor gestão.'
    }
  ];

  const trainingModules = [
    {
      title: 'Prevenção e Consciencialização de Incêndios',
      image: prevencaoIncendiosImg,
      description: 'Identificação de riscos e procedimentos de segurança contra incêndios'
    },
    {
      title: 'Sobrevivência no Mar',
      image: sobrevivenciaMarImg,
      description: 'Sessões práticas na Baía de Maputo para situações de emergência marítima'
    },
    {
      title: 'Segurança Marítima (DSD)',
      image: segurancaMaritimaImg,
      description: 'Foco na identificação de ameaças, prevenção e resposta em ambiente marítimo'
    }
  ];

  const cardStyle = {
    borderRadius: '12px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    height: '100%'
  };

  const imageStyle = {
    height: '220px',
    width: '100%',
    objectFit: 'cover'
  };

  return (
    <Layout style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Content style={{ padding: 0 }}>
        {/* Hero Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          padding: '40px 30px',
          marginBottom: '20px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <Title 
              level={1} 
              style={{ 
                color: 'white', 
                marginBottom: '10px',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              ACMA Consultoria
            </Title>
            <Paragraph style={{ 
              fontSize: '1.3rem', 
              color: 'rgba(255,255,255,0.95)', 
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Excelência em serviços de consultoria, formação técnica e gestão empresarial
            </Paragraph>
          </div>
        </div>

        {/* Services Section */}
        <div style={{ padding: '0 20px 80px 20px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Title 
              level={2} 
              style={{ 
                textAlign: 'center', 
                marginBottom: '50px', 
                color: '#1e3a8a',
                fontSize: '2.5rem'
              }}
            >
              Nossos Serviços
            </Title>
            
            <Row gutter={[32, 32]}>
              {services.map((service, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                  <Card
                    hoverable
                    style={cardStyle}
                    cover={
                      <img
                        src={service.image}
                        alt={service.title}
                        style={imageStyle}
                      />
                    }
                    bodyStyle={{ padding: '24px', height: 'calc(100% - 220px)' }}
                  >
                    <Title 
                      level={4} 
                      style={{ 
                        color: '#1e3a8a', 
                        marginBottom: '16px',
                        fontSize: '1.2rem',
                        lineHeight: '1.4'
                      }}
                    >
                      {service.title}
                    </Title>
                    <Paragraph style={{ 
                      color: '#64748b', 
                      textAlign: 'justify',
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      {service.description}
                    </Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* Mission Statement */}
        <div style={{ 
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          padding: '60px 20px',
          marginBottom: '80px'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <Paragraph style={{ 
              fontSize: '1.4rem', 
              color: 'white', 
              margin: 0,
              fontWeight: '500',
              lineHeight: '1.6'
            }}>
              A ACMA-LDA compromete-se com a excelência nos serviços prestados, oferecendo soluções 
              personalizadas para cada cliente e mantendo os mais altos padrões de qualidade.
            </Paragraph>
          </div>
        </div>

        {/* Recent Events Section */}
        <div style={{ padding: '0 20px 80px 20px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Title 
              level={2} 
              style={{ 
                textAlign: 'center', 
                marginBottom: '50px', 
                color: '#1e3a8a',
                fontSize: '2.5rem'
              }}
            >
              Eventos Recentes
            </Title>

            <Card
              style={{
                ...cardStyle,
                marginBottom: '40px'
              }}
              cover={
                <img
                  src={evento1}
                  alt="BST & DSD Training"
                  style={{ height: '400px', width: '100%', objectFit: 'cover' }}
                />
              }
            >
              <div style={{ padding: '32px' }}>
                <Title 
                  level={3} 
                  style={{ 
                    color: '#1e3a8a', 
                    marginBottom: '24px',
                    fontSize: '1.8rem'
                  }}
                >
                  BST & DSD Training – MARPERITA & ACMA Consultoria Partnership
                </Title>

                <Paragraph style={{
                  fontSize: '1.2rem',
                  color: '#64748b',
                  textAlign: 'justify',
                  marginBottom: '24px',
                  lineHeight: '1.7'
                }}>
                  Como parte do seu compromisso com o desenvolvimento de competências técnicas e 
                  segurança marítima, a MARPERITA, em colaboração com a ACMA Consultoria Lda, conduziu 
                  um programa intensivo de formação em Basic Safety Training (BST) e Designated Security 
                  Duties (DSD).
                </Paragraph>

                <Paragraph style={{ 
                  color: '#64748b', 
                  textAlign: 'justify', 
                  marginBottom: '32px',
                  lineHeight: '1.6'
                }}>
                  Esta iniciativa visou equipar os participantes com conhecimentos teóricos e práticos 
                  essenciais para operações seguras e eficientes no mar, em conformidade com os padrões 
                  da IMO (International Maritime Organization), aumentando assim a excelência operacional 
                  da empresa.
                </Paragraph>

                <Divider />

                <Title 
                  level={4} 
                  style={{ 
                    color: '#1e3a8a', 
                    marginBottom: '32px',
                    fontSize: '1.5rem'
                  }}
                >
                  Módulos de Formação
                </Title>

                <Row gutter={[24, 24]}>
                  {trainingModules.map((module, index) => (
                    <Col xs={24} sm={12} lg={8} key={index}>
                      <Card
                        size="small"
                        style={{
                          borderRadius: '8px',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                          height: '100%'
                        }}
                        cover={
                          <img 
                            src={module.image} 
                            alt={module.title}
                            style={{ 
                              height: '180px', 
                              width: '100%', 
                              objectFit: 'cover'
                            }}
                          />
                        }
                      >
                        <Title 
                          level={5} 
                          style={{ 
                            color: '#1e3a8a',
                            marginBottom: '8px',
                            fontSize: '1rem'
                          }}
                        >
                          {module.title}
                        </Title>
                        <Paragraph style={{ 
                          color: '#64748b', 
                          fontSize: '0.9rem',
                          margin: 0,
                          lineHeight: '1.5'
                        }}>
                          {module.description}
                        </Paragraph>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <div style={{ marginTop: '32px' }}>
                  <Paragraph style={{
                    color: '#64748b',
                    textAlign: 'justify',
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    marginBottom: '24px'
                  }}>
                    O programa foi ministrado por instrutores experientes, usando recursos atualizados e 
                    conduzido num ambiente de aprendizagem controlado, garantindo uma experiência 
                    educacional de alto impacto.
                  </Paragraph>

                  <div style={{
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                    color: 'white',
                    padding: '24px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)'
                  }}>
                    <Paragraph style={{
                      color: 'white',
                      margin: 0,
                      fontSize: '1.1rem',
                      fontWeight: '500',
                      lineHeight: '1.6'
                    }}>
                      Este projeto destaca o compromisso da MARPERITA com o desenvolvimento profissional 
                      contínuo da sua força de trabalho e contribui para a construção de uma indústria 
                      marítima mais segura e competente em Moçambique.
                    </Paragraph>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Content>

      {/* Footer Profissional */}
      <Footer style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        padding: '60px 20px 20px 20px',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Row gutter={[32, 32]}>
            {/* Sobre a ACMA */}
            <Col xs={24} sm={12} md={6}>
              <Title level={4} style={{ color: 'white', marginBottom: '20px' }}>
                ACMA Consultoria
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
                Excelência em consultoria, formação e gestão empresarial desde 2020.
              </Paragraph>
            </Col>

            {/* Contactos */}
            <Col xs={24} sm={12} md={6}>
              <Title level={4} style={{ color: 'white', marginBottom: '20px' }}>
                Contactos
              </Title>
              <div style={{ color: 'rgba(255,255,255,0.8)' }}>
                <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                  <PhoneOutlined style={{ marginRight: '10px', fontSize: '16px' }} />
                  <Text style={{ color: 'rgba(255,255,255,0.8)' }}>+258 86 992 6990</Text>
                </div>
                <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                  <MailOutlined style={{ marginRight: '10px', fontSize: '16px' }} />
                  <a href="mailto:geral@acmaconsultancy.com" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    geral@acmaconsultancy.com
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <EnvironmentOutlined style={{ marginRight: '10px', fontSize: '16px', marginTop: '4px' }} />
                  <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                    Maputo, Moçambique
                  </Text>
                </div>
              </div>
            </Col>

            {/* Parcerias */}
            <Col xs={24} sm={12} md={6}>
              <Title level={4} style={{ color: 'white', marginBottom: '20px' }}>
                Parcerias
              </Title>
              <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '2' }}>
                <div>• MARPERITA</div>
                <div>• IMO (International Maritime Organization)</div>
                <div>• Instituições de Formação Internacional</div>
              </div>
            </Col>

            {/* Suporte */}
            <Col xs={24} sm={12} md={6}>
              <Title level={4} style={{ color: 'white', marginBottom: '20px' }}>
                Suporte
              </Title>
              <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '2' }}>
                <div><a href="/suporte" style={{ color: 'rgba(255,255,255,0.8)' }}>Centro de Ajuda</a></div>
                <div><a href="/contactos" style={{ color: 'rgba(255,255,255,0.8)' }}>Fale Connosco</a></div>
                <div><a href="/inscricao" style={{ color: 'rgba(255,255,255,0.8)' }}>Inscrições</a></div>
              </div>
            </Col>
          </Row>

          <Divider style={{ background: 'rgba(255,255,255,0.2)', margin: '40px 0 20px 0' }} />

          {/* Bottom Footer */}
          <Row justify="space-between" align="middle" style={{ flexWrap: 'wrap' }}>
            <Col xs={24} md={12} style={{ textAlign: 'center', marginBottom: '10px' }}>
              <Text style={{ color: 'rgba(255,255,255,0.7)' }}>
                © {new Date().getFullYear()} ACMA Consultoria LDA. Todos os direitos reservados.
              </Text>
            </Col>
            <Col xs={24} md={12} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '20px', transition: 'color 0.3s' }}>
                  <FacebookOutlined />
                </a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '20px', transition: 'color 0.3s' }}>
                  <LinkedinOutlined />
                </a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '20px', transition: 'color 0.3s' }}>
                  <TwitterOutlined />
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </Footer>
    </Layout>
  );
};

export default Home;