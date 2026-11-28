import React, { useState } from 'react';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloudOutlined,
  MedicineBoxOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { useLanguage } from '../../i18n/LanguageContext';

const courses = [
  {
    title: 'HSE / ISO 14001 e ISO/IEC 9712',
    category: 'Ambiente e qualidade',
    description: 'Sistema de gestão ambiental e práticas de sustentabilidade.',
    details: 'Introdução a sistemas de gestão ambiental, identificação de impactos e práticas para apoiar a conformidade e a melhoria contínua das operações.',
    icon: <SafetyCertificateOutlined />,
  },
  {
    title: 'OSHA, ISO 22000 e sistemas de gestão',
    category: 'Segurança e qualidade',
    description: 'Normas de gestão, segurança ocupacional e melhoria de processos.',
    details: 'Formação introdutória em normas e sistemas de gestão, com temas de segurança ocupacional, qualidade, segurança alimentar e eficiência energética.',
    icon: <SafetyCertificateOutlined />,
  },
  {
    title: 'Legislação de petróleo e gás',
    category: 'Petróleo e gás',
    description: 'Enquadramento legal e regulatório para o setor energético.',
    details: 'Aborda requisitos legais e regulatórios aplicáveis ao setor, conformidade, licenças e gestão de riscos em operações de petróleo e gás.',
    icon: <CloudOutlined />,
  },
  {
    title: 'BST, Oil and Gas Industrial',
    category: 'Operações industriais',
    description: 'Rigging, slinging e coordenação segura de cargas.',
    details: 'Princípios de movimentação de cargas, sinalização, comunicação e coordenação de operações em ambientes industriais.',
    icon: <ToolOutlined />,
  },
  {
    title: 'Primeiros socorros e GMDSS',
    category: 'Resposta a emergências',
    description: 'Competências iniciais para resposta em contextos marítimos.',
    details: 'Noções de primeiros socorros, resposta rápida e comunicação em emergência, com aplicação a ambientes marítimos e portuários.',
    icon: <MedicineBoxOutlined />,
  },
  {
    title: 'Logística e segurança marítima',
    category: 'Logística',
    description: 'Planeamento de operações e gestão eficiente de recursos.',
    details: 'Planeamento de operações logísticas em ambientes marítimos, com atenção à segurança, gestão de recursos e procedimentos operacionais.',
    icon: <RocketOutlined />,
  },
  {
    title: 'IOSH, Big Lifting e WASH',
    category: 'Operações e segurança',
    description: 'Operação de equipamentos e práticas de segurança no trabalho.',
    details: 'Técnicas para operação segura de equipamentos de elevação, prevenção de riscos e práticas de segurança no local de trabalho.',
    icon: <TeamOutlined />,
  },
  {
    title: 'Segurança em trabalhos em altura',
    category: 'Segurança no trabalho',
    description: 'Prevenção de quedas, utilização de EPI e controlo de riscos.',
    details: 'Princípios de prevenção de quedas, seleção e utilização de equipamento de proteção individual e avaliação de riscos em altura.',
    icon: <SafetyCertificateOutlined />,
  },
];

const Cursos = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { t } = useLanguage();

  return selectedCourse ? (
    <main className="page-container page-container--narrow">
      <button className="text-action" onClick={() => setSelectedCourse(null)}>
        <ArrowLeftOutlined /> {t('Voltar aos cursos')}
      </button>
      <div className="page-heading page-heading--left" style={{ marginTop: 20 }}>
        <span className="eyebrow">{t(selectedCourse.category)}</span>
        <h1 className="page-title">{t(selectedCourse.title)}</h1>
        <p className="page-lead">{t(selectedCourse.description)}</p>
      </div>
      <section className="detail-panel detail-panel-content">
        <span className="catalog-icon">{selectedCourse.icon}</span>
        <h2>{t('Sobre o curso')}</h2>
        <p>{t(selectedCourse.details)}</p>
        <div className="detail-fact"><strong>{t('Informações e inscrições')}</strong><span>{t('Contacte a ACMA para consultar disponibilidade, calendário e condições.')}</span></div>
      </section>
    </main>
  ) : (
    <main>
      <section className="page-hero-compact">
        <div className="page-hero-inner">
          <header className="page-heading">
            <span className="eyebrow">{t('Desenvolvimento profissional')}</span>
            <h1 className="page-title">{t('Cursos e capacitação')}</h1>
            <p className="page-lead">{t('Programas para desenvolver competências técnicas em segurança, operações e gestão.')}</p>
          </header>
        </div>
      </section>
      <section className="page-container" style={{ paddingTop: 42 }}>
        <div className="catalog-grid">
          {courses.map((course) => (
            <article className="catalog-card" key={course.title}>
              <div className="catalog-card-body">
                <span className="catalog-icon">{course.icon}</span>
                <span className="eyebrow">{t(course.category)}</span>
                <h3>{t(course.title)}</h3>
                <p>{t(course.description)}</p>
                <button className="text-action" onClick={() => setSelectedCourse(course)}>
                  {t('Consultar curso')} <ArrowRightOutlined />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Cursos;
