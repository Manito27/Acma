import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Card, Button } from 'antd';

import evento1 from '../../assets/img/evento1.jpg';
import prevencaoIncendiosImg from '../../assets/img/prevencao-incendios.jpg';
import sobrevivenciaMarImg from '../../assets/img/sobrevivencia-mar.jpg';
import segurancaMaritimaImg from '../../assets/img/seguranca-maritima.jpg';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Eventos = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventos = [
    {
      id: 1,
      title: 'BST & DSD Training',
      image: evento1,
      description: 'Programa intensivo de formação em BST e DSD em parceria com a MARPERITA.',
      fullDetails: `
**Objetivo:** Capacitar profissionais para operações seguras em ambientes marítimos, atendendo normas internacionais da IMO.  
**Público-alvo:** Tripulantes, oficiais de segurança, gestores marítimos e profissionais da indústria naval.  
**Duração:** 5 dias (teoria e prática).  
**Atividades:** Sessões teóricas, simulações práticas de emergência, exercícios de evacuação, treinamento em equipamentos de segurança.  
**Resultados Esperados:** Profissionais preparados para enfrentar situações de emergência no mar, garantindo a segurança de tripulação e cargas.  
**Benefícios:** Certificação reconhecida internacionalmente e aumento da eficiência operacional da empresa.
      `
    },
    {
      id: 2,
      title: 'Prevenção e Consciencialização de Incêndios',
      image: prevencaoIncendiosImg,
      description: 'Identificação de riscos e procedimentos de segurança contra incêndios.',
      fullDetails: `
**Objetivo:** Reduzir riscos de incêndio em empresas e edifícios, capacitando colaboradores a agir rapidamente em situações de emergência.  
**Público-alvo:** Funcionários de empresas, gestores de segurança e brigadas de incêndio.  
**Duração:** 2 dias.  
**Atividades:** Treinamento em uso de extintores, planos de evacuação, simulações práticas e identificação de riscos potenciais.  
**Resultados Esperados:** Participantes capazes de identificar riscos, agir preventivamente e responder adequadamente a emergências.  
**Benefícios:** Ambiente de trabalho mais seguro e conformidade com normas de segurança.
      `
    },
    {
      id: 3,
      title: 'Sobrevivência no Mar',
      image: sobrevivenciaMarImg,
      description: 'Sessões práticas na Baía de Maputo para situações de emergência marítima.',
      fullDetails: `
**Objetivo:** Ensinar técnicas de sobrevivência em mar aberto e situações de emergência.  
**Público-alvo:** Tripulantes, oficiais de bordo e profissionais marítimos.  
**Duração:** 3 dias.  
**Atividades:** Treinamento em botes salva-vidas, sinalização de socorro, primeiros socorros, técnicas de natação e resgate.  
**Resultados Esperados:** Profissionais capazes de se proteger e auxiliar outros durante emergências marítimas.  
**Benefícios:** Redução de riscos e aumento da confiança operacional no mar.
      `
    },
    {
      id: 4,
      title: 'Segurança Marítima (DSD)',
      image: segurancaMaritimaImg,
      description: 'Foco na identificação de ameaças, prevenção e resposta em ambiente marítimo.',
      fullDetails: `
**Objetivo:** Capacitar profissionais para identificar ameaças e implementar medidas de segurança em navios e portos.  
**Público-alvo:** Oficiais de segurança, tripulantes e gestores de transporte marítimo.  
**Duração:** 4 dias.  
**Atividades:** Avaliação de risco, proteção de cargas, simulações de incidentes, protocolos de segurança e prevenção de ataques.  
**Resultados Esperados:** Tripulação treinada para prevenção de incidentes e resposta eficiente a ameaças marítimas.  
**Benefícios:** Conformidade com normas internacionais e aumento da segurança operacional.
      `
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
    height: '250px',
    width: '100%',
    objectFit: 'cover'
  };

  return (
    <Layout style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Content style={{ padding: '60px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '50px', color: '#1e3a8a' }}>
            {selectedEvent ? selectedEvent.title : 'Todos os Eventos'}
          </Title>

          {selectedEvent ? (
            <div>
              <Card
                hoverable
                style={{ ...cardStyle, maxWidth: '800px', margin: '0 auto' }}
                cover={<img src={selectedEvent.image} alt={selectedEvent.title} style={{ height: '400px', objectFit: 'cover' }} />}
              >
                <Paragraph style={{ color: '#64748b', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                  {selectedEvent.fullDetails}
                </Paragraph>
                <Button type="primary" onClick={() => setSelectedEvent(null)}>
                  Voltar para todos os eventos
                </Button>
              </Card>
            </div>
          ) : (
            <Row gutter={[24, 24]}>
              {eventos.map((evento) => (
                <Col xs={24} sm={12} lg={6} key={evento.id}>
                  <Card
                    hoverable
                    style={cardStyle}
                    cover={<img src={evento.image} alt={evento.title} style={imageStyle} />}
                    onClick={() => setSelectedEvent(evento)}
                  >
                    <Title level={4} style={{ color: '#1e3a8a', marginBottom: '12px' }}>
                      {evento.title}
                    </Title>
                    <Paragraph style={{ color: '#64748b', lineHeight: '1.5', margin: 0 }}>
                      {evento.description}
                    </Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default Eventos;
