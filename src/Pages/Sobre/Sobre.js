import React from "react";
import { Layout, Row, Col, Card, Typography, Divider } from "antd";
import {
  SafetyCertificateOutlined,
  LaptopOutlined,
  TeamOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const AboutWebsite = () => {
  return (
    <Layout style={{ background: "#fff", padding: "60px 0" }}>
      <Content
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <Title
          level={1}
          style={{
            textAlign: "center",
            marginBottom: "50px",
            color: "#1565C0",
            fontWeight: 700,
          }}
        >
          Sobre a Plataforma ACMA
        </Title>

        <Row justify="center">
          <Col xs={24} md={20}>
            <Card
              style={{
                borderRadius: "12px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              }}
              bodyStyle={{ padding: "32px" }}
            >
              <Paragraph style={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
                Bem-vindo à plataforma digital da <strong>ACMA, LDA</strong>, sua
                parceira estratégica em consultoria especializada, formação
                profissional e certificações internacionais. Nossa solução foi
                desenvolvida para oferecer suporte integrado nos setores de{" "}
                <strong>
                  Telecomunicações, Informática, Segurança Ocupacional e Gestão
                  de Qualidade.
                </strong>
              </Paragraph>

              <Divider />

              <Title level={2} style={{ color: "#1890ff", marginBottom: "16px" }}>
                Nossa Missão Digital
              </Title>
              <Paragraph style={{ fontSize: "1.1rem" }}>
                Democratizamos o acesso a:
              </Paragraph>

              <ul style={{ fontSize: "1.05rem", lineHeight: "1.9" }}>
                <li>Cursos internacionais reconhecidos (ISO, OSHA, STCW, IOSH)</li>
                <li>Sistemas de consultoria e certificação para PMEs</li>
                <li>Ferramentas de avaliação de riscos ocupacionais (IGAORHSW)</li>
                <li>Gestão de recursos humanos e logística integrada</li>
                <li>Monitoramento e implementação de normas de qualidade</li>
              </ul>

              <Divider />

              <Title level={2} style={{ color: "#1890ff", marginBottom: "16px" }}>
                Tecnologia e Profissionalismo
              </Title>
              <Paragraph style={{ fontSize: "1.1rem" }}>
                A plataforma foi desenvolvida com tecnologia de ponta para
                garantir:
              </Paragraph>

              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Card
                    bordered={false}
                    style={{
                      background: "#f0f9ff",
                      borderRadius: "10px",
                      height: "100%",
                    }}
                  >
                    <SafetyCertificateOutlined
                      style={{ fontSize: "32px", color: "#1565C0" }}
                    />
                    <Title level={4} style={{ marginTop: "10px", color: "#1565C0" }}>
                      Segurança de Dados
                    </Title>
                    <Paragraph>
                      Proteção avançada para todas as suas informações e
                      certificações.
                    </Paragraph>
                  </Card>
                </Col>

                <Col xs={24} md={12}>
                  <Card
                    bordered={false}
                    style={{
                      background: "#f0f9ff",
                      borderRadius: "10px",
                      height: "100%",
                    }}
                  >
                    <LaptopOutlined
                      style={{ fontSize: "32px", color: "#1565C0" }}
                    />
                    <Title level={4} style={{ marginTop: "10px", color: "#1565C0" }}>
                      Acesso Multiplataforma
                    </Title>
                    <Paragraph>
                      Disponível em qualquer dispositivo, a qualquer momento.
                    </Paragraph>
                  </Card>
                </Col>
              </Row>

              <Divider />

              <Paragraph style={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
                Nossa equipe de especialistas está comprometida em fornecer{" "}
                <strong>conteúdo atualizado</strong> e{" "}
                <strong>suporte técnico especializado</strong>, garantindo uma
                experiência produtiva e eficiente na sua jornada conosco.
              </Paragraph>

              <Card
                style={{
                  background: "#e6f7ff",
                  borderLeft: "4px solid #1890ff",
                  borderRadius: "8px",
                  marginTop: "30px",
                }}
              >
                <Paragraph
                  style={{
                    fontSize: "1.15rem",
                    fontStyle: "italic",
                    margin: 0,
                    color: "#0d47a1",
                  }}
                >
                  "Na ACMA, combinamos expertise técnica com inovação digital
                  para transformar desafios organizacionais em oportunidades de
                  crescimento sustentável."
                </Paragraph>
              </Card>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AboutWebsite;
