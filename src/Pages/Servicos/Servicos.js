import React, { useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined, AuditOutlined, SafetyCertificateOutlined, TeamOutlined, ToolOutlined } from '@ant-design/icons';
import { useLanguage } from '../../i18n/LanguageContext';

const services = [
  {
    title: 'Formação profissional',
    description: 'Cursos técnicos e programas de capacitação ajustados ao trabalho real.',
    details: 'Programas práticos que desenvolvem competências técnicas e profissionais. Os conteúdos podem ser ajustados às necessidades de cada empresa e às funções das equipas.',
    icon: <TeamOutlined />,
  },
  {
    title: 'Monitorização',
    description: 'Acompanhamento de operações, processos e indicadores de desempenho.',
    details: 'Acompanhamento contínuo de operações e processos, com análise de desempenho, segurança e eficiência para apoiar decisões e melhorias.',
    icon: <AuditOutlined />,
  },
  {
    title: 'Avaliação e viabilidade',
    description: 'Análise técnica e económica para apoiar decisões de projeto.',
    details: 'Estudos de viabilidade que consideram objetivos, riscos, recursos e condições de execução para ajudar a avaliar a sustentabilidade de projetos.',
    icon: <AuditOutlined />,
  },
  {
    title: 'Certificação de PME',
    description: 'Orientação para certificações e requisitos de qualidade.',
    details: 'Apoio à preparação de pequenas e médias empresas para processos de certificação, incluindo análise de requisitos, documentação e preparação para auditorias.',
    icon: <SafetyCertificateOutlined />,
  },
  {
    title: 'Segurança e saúde no trabalho',
    description: 'Avaliação de riscos e implementação de medidas preventivas.',
    details: 'Identificação de perigos, avaliação de riscos ocupacionais e apoio à implementação de medidas de prevenção, saúde e segurança no local de trabalho.',
    icon: <SafetyCertificateOutlined />,
  },
  {
    title: 'Recursos humanos',
    description: 'Consultoria em gestão de talentos e desenvolvimento de equipas.',
    details: 'Soluções de recrutamento, desenvolvimento de carreiras e gestão de talentos, com foco nas necessidades e objetivos da organização.',
    icon: <TeamOutlined />,
  },
  {
    title: 'Petróleo e gás',
    description: 'Planeamento operacional e gestão de riscos para o setor energético.',
    details: 'Apoio a operações do setor de petróleo e gás em temas de planeamento, gestão de riscos, conformidade e desenvolvimento de competências.',
    icon: <ToolOutlined />,
  },
  {
    title: 'Planos de implementação',
    description: 'Estruturação de objetivos, etapas e acompanhamento de resultados.',
    details: 'Transformação de objetivos estratégicos em planos de ação com etapas, responsabilidades e indicadores de acompanhamento.',
    icon: <AuditOutlined />,
  },
  {
    title: 'Normas ISO',
    description: 'Preparação e implementação de sistemas de gestão.',
    details: 'Orientação para implementação e melhoria de sistemas de gestão, incluindo normas de qualidade, ambiente, saúde e segurança ocupacional.',
    icon: <SafetyCertificateOutlined />,
  },
  {
    title: 'Logística e frotas',
    description: 'Apoio à eficiência operacional e gestão de recursos.',
    details: 'Análise de processos logísticos, utilização de frotas e oportunidades de melhoria operacional para apoiar o controlo e a eficiência.',
    icon: <ToolOutlined />,
  },
  {
    title: 'Formação marítima STCW / DSD',
    description: 'Formação para profissionais e operações do setor marítimo.',
    details: 'Programas de formação marítima com conteúdos orientados para segurança a bordo, procedimentos operacionais e requisitos aplicáveis ao setor.',
    icon: <SafetyCertificateOutlined />,
  },
];

const Servicos = () => {
  const [selectedService, setSelectedService] = useState(null);
  const { t } = useLanguage();

  if (selectedService) {
    return (
      <main className="page-container page-container--narrow">
        <button className="text-action" onClick={() => setSelectedService(null)}>
          <ArrowLeftOutlined /> {t('Voltar aos serviços')}
        </button>
        <section className="detail-panel detail-panel-content" style={{ marginTop: 20 }}>
          <span className="catalog-icon">{selectedService.icon}</span>
          <h2>{t(selectedService.title)}</h2>
          <p>{t(selectedService.details)}</p>
          <p>{t('Fale com a nossa equipa para discutir os objetivos e o âmbito mais adequado para a sua organização.')}</p>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="page-hero-compact">
        <div className="page-hero-inner">
          <header className="page-heading">
            <span className="eyebrow">{t('Soluções para organizações')}</span>
            <h1 className="page-title">{t('Serviços de consultoria e formação')}</h1>
            <p className="page-lead">{t('Apoiamos empresas com soluções práticas em formação, segurança, gestão e desenvolvimento operacional.')}</p>
          </header>
        </div>
      </section>
      <section className="page-container" style={{ paddingTop: 42 }}>
        <div className="catalog-grid">
          {services.map((service) => (
            <article className="catalog-card service-tile" key={service.title}>
              <div className="catalog-card-body">
                <span className="catalog-icon">{service.icon}</span>
                <h3>{t(service.title)}</h3>
                <p>{t(service.description)}</p>
                <button className="text-action" onClick={() => setSelectedService(service)}>
                  {t('Saber mais')} <ArrowRightOutlined />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Servicos;
