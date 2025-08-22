import React, { useState } from "react";
import { Card, Col, Row, Button } from "antd";

const { Meta } = Card;

const ServicosPage = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: "FORMAÇÃO PROFISSIONAL",
      description: "Cursos especializados para capacitação de profissionais",
      details: "Nossos cursos de formação profissional são desenhados para capacitar profissionais com habilidades técnicas e práticas, abrangendo diversas áreas como tecnologia, gestão e segurança ocupacional. Oferecemos programas personalizados que atendem às necessidades específicas de cada cliente, garantindo excelência e aplicabilidade no mercado de trabalho."
    },
    {
      title: "MONITORAMENTO",
      description: "Soluções de acompanhamento contínuo de operações",
      details: "Oferecemos soluções avançadas de monitoramento contínuo para operações empresariais, utilizando tecnologias de ponta para acompanhar desempenho, segurança e eficiência. Nossos serviços garantem relatórios detalhados e intervenções rápidas para otimizar processos e minimizar riscos."
    },
    {
      title: "AVALIAÇÃO E VIABILIDADE",
      description: "Análise técnica e econômica de projetos",
      details: "Realizamos análises técnicas e econômicas detalhadas para avaliar a viabilidade de projetos. Nosso processo inclui estudos de mercado, análises de risco e projeções financeiras, assegurando que cada projeto seja sustentável e alinhado aos objetivos estratégicos do cliente."
    },
    {
      title: "CERTIFICAÇÃO DE PME's",
      description: "Processos de certificação para pequenas e médias empresas",
      details: "Apoiamos pequenas e médias empresas na obtenção de certificações reconhecidas, como ISO e outras normas internacionais. Nosso processo inclui consultoria, auditorias internas e preparação para certificações, garantindo conformidade e competitividade no mercado."
    },
    {
      title: "SEGURANÇA E SAÚDE",
      description: "Implementação de normas de segurança ocupacional",
      details: "Implementamos normas de segurança e saúde ocupacional, como parte do nosso compromisso com o IGAORHSW. Oferecemos avaliação de riscos, implementação de medidas preventivas e treinamento para garantir um ambiente de trabalho seguro e em conformidade com regulamentações."
    },
    {
      title: "RECURSOS HUMANOS",
      description: "Consultoria em gestão de talentos e carreiras",
      details: "Nossa consultoria em recursos humanos foca na gestão de talentos, recrutamento estratégico e desenvolvimento de carreiras. Oferecemos soluções personalizadas para melhorar a eficiência organizacional, engajamento dos colaboradores e retenção de talentos."
    },
    {
      title: "PLANO OIL AND GAS",
      description: "Estratégias para indústria de petróleo e gás",
      details: "Desenvolvemos estratégias específicas para a indústria de petróleo e gás, incluindo planejamento operacional, gestão de riscos e conformidade regulatória. Nossos serviços visam maximizar a eficiência e sustentabilidade em projetos de grande escala."
    },
    {
      title: "PLANO DE IMPLEMENTAÇÃO",
      description: "Estruturação de planos de ação estratégicos",
      details: "Estruturamos planos de ação estratégicos detalhados para empresas que buscam implementar mudanças ou novos projetos. Nosso processo inclui análise de objetivos, definição de etapas e monitoramento de resultados para garantir o sucesso da implementação."
    },
    {
      title: "NORMAS ISO",
      description: "Implementação e certificação de normas internacionais",
      details: "Especializamo-nos na implementação e certificação de normas ISO, como ISO 9001, ISO 14001 e ISO 45001. Nossa equipe oferece suporte completo, desde a preparação até a auditoria final, garantindo que sua empresa atinja padrões internacionais de qualidade."
    },
    {
      title: "LOGÍSTICA & FROTAS",
      description: "Otimização de gestão logística e frota de veículos",
      details: "Otimizamos a gestão logística e de frotas com soluções que aumentam a eficiência, reduzem custos e melhoram a rastreabilidade. Nossos serviços incluem planejamento logístico, manutenção de frotas e integração de tecnologias para gestão em tempo real."
    },
    {
      title: "STCW DSD",
      description: "Certificação para profissionais marítimos",
      details: "Oferecemos certificação STCW (Standards of Training, Certification and Watchkeeping) para profissionais marítimos, com foco em Designação de Segurança Designada (DSD). Nossos programas garantem conformidade com padrões internacionais e segurança no setor marítimo."
    }
  ];

  const handleCardClick = (service) => {
    setSelectedService(service);
  };

  const handleBackClick = () => {
    setSelectedService(null);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {selectedService ? (
        <div>
          <h1 className="text-3xl font-bold mb-6 text-blue-800">{selectedService.title}</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">{selectedService.details}</p>
            <Button
              type="primary"
              onClick={handleBackClick}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Voltar aos Serviços
            </Button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-blue-800">Nossos Serviços</h1>
          
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <p className="mb-4 text-gray-700">
              A ACMA, LDA como uma empresa Consultora Moçambicana, tem como foco principal prestar e garantir
              serviços de alta qualidade (VIP) aos seus clientes, baseado numa organização eficiente e profissional, 
              sendo uma mais-valia no sector das Telecomunicações & Informática.
            </p>
            <p className="mb-4 text-gray-700">
              <strong>IGAORHSW</strong> é uma abreviação de Avaliação Geral Internacional de Riscos Ocupacionais e 
              Saúde Segurança no Trabalho. Oferecemos avaliação de risco, implementação das normas e correção 
              das marcas gráficas de segurança no local de trabalho.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-6 text-blue-700">Serviços Principais</h2>
          
          <Row gutter={[16, 16]}>
            {services.map((service, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Card
                  hoverable
                  onClick={() => handleCardClick(service)}
                  className="h-full transform transition-all hover:scale-105 hover:shadow-lg"
                  cover={
                    <div className="h-32 bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {service.title.charAt(0)}
                      </span>
                    </div>
                  }
                >
                  <Meta
                    title={<span className="text-blue-800">{service.title}</span>}
                    description={<span className="text-gray-600">{service.description}</span>}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          <div className="mt-8 text-center text-sm text-gray-500 border-t pt-4">
            PRODUZIDO PELO GRUPO DA ACMA, LDA {new Date().getFullYear()}
          </div>
        </>
      )}
    </div>
  );
};

export default ServicosPage;