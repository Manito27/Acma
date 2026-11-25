import React, { useEffect, useState } from 'react';
import { Button, Grid, Space, Table, Tooltip, message } from 'antd';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import {
  downloadBackendFile,
  getBackendFileUrl,
  getCurrentUser,
  getUtenteCertificados,
  getUtentes,
} from '../../services/api';

const getId = (record) => record?.id ?? record?.pk;

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('pt-MZ');
};

const getCertificateFile = (certificate) => {
  const file = certificate?.arquivos ?? certificate?.arquivo ?? certificate?.ficheiro ?? certificate?.file;
  return typeof file === 'string' ? file : file?.url ?? file?.path ?? '';
};

const CertificadosUtente = () => {
  const screens = Grid.useBreakpoint();
  const username = String(getCurrentUser().username ?? '').trim();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloadingCertificateId, setDownloadingCertificateId] = useState(null);

  useEffect(() => {
    let active = true;

    const loadCertificates = async () => {
      setLoading(true);
      setError('');

      if (!username) {
        setError('Não foi possível identificar a sua conta. Termine a sessão e entre novamente.');
        setLoading(false);
        return;
      }

      try {
        const utentes = await getUtentes();
        const normalizedUsername = username.toLocaleLowerCase();
        const utente = utentes.find((record) => {
          const account = record.user ?? record.usuario ?? {};
          const accountUsername = account.username ?? record.username ?? '';
          return String(accountUsername).trim().toLocaleLowerCase() === normalizedUsername;
        });

        if (!utente || getId(utente) == null) {
          if (active) setError('Não encontramos um registo de utente associado a esta conta.');
          return;
        }

        const relations = await getUtenteCertificados({ utente_id: getId(utente) });
        const associatedCertificates = relations
          .map((relation) => {
            const certificate = relation.certificado ?? relation.certificate;
            if (!certificate || typeof certificate !== 'object') return null;
            return {
              ...certificate,
              associationId: relation.id,
              data_atribuicao: relation.data_atribuicao ?? relation.data_criacao,
            };
          })
          .filter(Boolean)
          .sort((left, right) => String(left.titulo ?? left.nome ?? '').localeCompare(String(right.titulo ?? right.nome ?? ''), 'pt-MZ'));

        if (active) setCertificates(associatedCertificates);
      } catch {
        if (active) {
          setError('Não foi possível carregar os certificados associados. Tente novamente mais tarde.');
          message.error('Não foi possível carregar os seus certificados.');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadCertificates();
    return () => { active = false; };
  }, [username]);

  const openCertificate = (certificate) => {
    const file = getCertificateFile(certificate);
    if (!file) {
      message.info('O ficheiro deste certificado não está disponível.');
      return;
    }
    window.open(getBackendFileUrl(file), '_blank', 'noopener,noreferrer');
  };

  const downloadCertificate = async (certificate) => {
    const file = getCertificateFile(certificate);
    if (!file) {
      message.info('O ficheiro deste certificado não está disponível.');
      return;
    }

    const certificateId = certificate.associationId ?? getId(certificate);
    setDownloadingCertificateId(certificateId);
    try {
      await downloadBackendFile(file);
    } catch {
      message.error('Não foi possível descarregar o certificado.');
    } finally {
      setDownloadingCertificateId(null);
    }
  };

  const columns = [
    {
      title: 'Certificado',
      key: 'titulo',
      width: 210,
      ellipsis: true,
      render: (_, certificate) => (
        <div className="utente-certificate-title">
          <strong>{certificate.titulo ?? certificate.nome ?? certificate.codigo ?? 'Certificado'}</strong>
          {certificate.descricao && <small>{certificate.descricao}</small>}
        </div>
      ),
    },
    { title: 'Emissão', key: 'data_emissao', width: 90, render: (_, certificate) => formatDate(certificate.data_emissao) },
    { title: 'Validade', key: 'validade', width: 90, render: (_, certificate) => certificate.validade ? formatDate(certificate.validade) : 'Indefinida' },
    { title: 'Atribuído em', key: 'data_atribuicao', width: 100, render: (_, certificate) => formatDate(certificate.data_atribuicao) },
    {
      title: 'Ficheiro',
      key: 'ficheiro',
      width: 110,
      render: (_, certificate) => {
        const fileAvailable = Boolean(getCertificateFile(certificate));
        const certificateId = certificate.associationId ?? getId(certificate);
        return (
          <Space size={0} className="utente-certificates-actions">
            <Tooltip title="Visualizar certificado">
              <Button type="text" size="small" aria-label="Visualizar certificado" icon={<EyeOutlined />} disabled={!fileAvailable} onClick={() => openCertificate(certificate)} />
            </Tooltip>
            <Tooltip title="Descarregar certificado">
              <Button type="text" size="small" aria-label="Descarregar certificado" icon={<DownloadOutlined />} disabled={!fileAvailable} loading={String(downloadingCertificateId) === String(certificateId)} onClick={() => downloadCertificate(certificate)} />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <section className="utente-certificates-page">
      <header className="utente-certificates-heading">
        <span className="eyebrow">Área do utente</span>
        <h1>Os meus certificados</h1>
        <p>Consulte os certificados associados à sua conta.</p>
      </header>
      <div className="utente-certificates-table">
        <Table
          rowKey={(certificate) => certificate.associationId ?? getId(certificate)}
          columns={columns}
          dataSource={certificates}
          loading={loading}
          tableLayout="fixed"
          pagination={{ pageSize: 8, showSizeChanger: false }}
          scroll={screens.lg ? undefined : { x: 600 }}
          locale={{
            emptyText: loading ? 'A carregar certificados…' : error || 'Ainda não tem certificados associados.',
          }}
        />
      </div>
    </section>
  );
};

export default CertificadosUtente;
