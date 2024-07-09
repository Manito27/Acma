import React from 'react';
import { Carousel, Layout, Button, Card, Row, Col } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';


const { Content } = Layout;

const carouselItems = [
  {
    title: 'Transforme a aquisição pública',
    description: 'Crie processos de aquisição mais eficientes e simplificados.',
    buttonText: 'Comece Agora',
    link: '/servicos-de-registro'
  },
  {
    title: 'Valor pelo dinheiro',
    description: 'Promova oportunidades iguais para a comunidade empresarial.',
    buttonText: 'Saiba Mais',
    link: '/valor-pelo-dinheiro'
  },
  {
    title: 'Transparência e Responsabilidade',
    description: 'Melhor conformidade regulatória e transparência.',
    buttonText: 'Descubra Mais',
    link: '/transparencia'
  }
];

const Home = () => {
  return (
    <Layout style={{ background: '#f0f2f5' }}>
      <Content>
        <Carousel autoplay>
          {carouselItems.map((item, index) => (
            <div key={index} style={{ textAlign: 'center', padding: '50px', background: '#1890ff', color: '#fff' }}>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <Button type="primary" href={item.link} style={{ marginTop: '20px' }}>
                {item.buttonText}
              </Button>
            </div>
          ))}
        </Carousel>
        <div style={{ padding: '24px', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 'bold' }}>O que podemos fazer por si hoje?</h2>
          <p>A plataforma eConcursos oferece vários serviços e soluções online para ajudar você a participar da aquisição governamental.</p>
          <Row gutter={16} style={{marginTop:'4%'}}>
            <Col span={8}>
              <Card title="Planos de Aquisição" bordered={false} style={{ textAlign: 'left' }}>
                <p>Publique planos anuais de aquisição de agências governamentais para que a comunidade empresarial se prepare e responda mais efetivamente.</p>
                <Button type="link" href="/planos-de-aquisicao">
                  Saiba Mais <InfoCircleOutlined />
                </Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Concursos" bordered={false} style={{ textAlign: 'left' }}>
                <p>Acesse avisos de concursos de várias agências governamentais para a aquisição de bens, serviços e obras.</p>
                <Button type="link" href="/concursos">
                  Saiba Mais <InfoCircleOutlined />
                </Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Avisos Publicados" bordered={false} style={{ textAlign: 'left' }}>
                <p>Fornece acesso a avisos de concursos, atas de abertura de propostas, relatórios de avaliação, adjudicações e outras informações sobre aquisições.</p>
                <Button type="link" href="/avisos-publicados">
                  Saiba Mais <InfoCircleOutlined />
                </Button>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
