import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Descriptions,
  Form,
  Grid,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  message,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileProtectOutlined,
  LinkOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  associateCertificateToUtente,
  createUtente,
  deleteUtente,
  getCertificados,
  getUtentes,
  getUtenteCertificados,
  updateUtente,
} from '../../services/api';

const getPerson = (utente) => {
  const nestedUser = utente.user ?? utente.usuario;
  return nestedUser && typeof nestedUser === 'object' ? { ...utente, ...nestedUser } : utente;
};

const getName = (utente) => {
  const person = getPerson(utente);
  return [person.nome ?? person.first_name, person.apelido ?? person.last_name].filter(Boolean).join(' ') || '—';
};

const getRecordId = (utente) => utente.id ?? utente.pk;

const normalizeSearch = (value) => String(value ?? '')
  .trim()
  .toLocaleLowerCase('pt-MZ')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

const getUtenteValues = (utente = {}) => {
  const person = getPerson(utente);
  return {
    nome: person.nome ?? person.first_name,
    apelido: person.apelido ?? person.last_name,
    nuit: person.nuit,
    email: person.email,
    telefone: person.telefone ?? person.phone,
    endereco: person.endereco ?? person.address,
  };
};

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('pt-MZ');
};

const getErrorMessage = (error) => {
  const data = error.response?.data;
  if (typeof data?.detail === 'string') return data.detail;
  if (typeof data?.message === 'string') return data.message;

  const validationMessages = Object.values(data ?? {})
    .flatMap((value) => Array.isArray(value) ? value : [value])
    .filter((value) => typeof value === 'string');
  if (validationMessages.length) return validationMessages.join(' ');
  if (error.response) return 'Não foi possível guardar os dados. Verifique os campos e tente novamente.';
  return 'Não foi possível ligar ao servidor Django.';
};

const Inscri = () => {
  const screens = Grid.useBreakpoint();
  const [form] = Form.useForm();
  const [associationForm] = Form.useForm();
  const [utentes, setUtentes] = useState([]);
  const [certificados, setCertificados] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadingCertificados, setLoadingCertificados] = useState(false);
  const [associating, setAssociating] = useState(false);
  const [editingUtente, setEditingUtente] = useState(null);
  const [associationUtente, setAssociationUtente] = useState(null);
  const [selectedUtente, setSelectedUtente] = useState(null);
  const [certificatesUtente, setCertificatesUtente] = useState(null);
  const [associatedCertificates, setAssociatedCertificates] = useState([]);
  const [loadingAssociatedCertificates, setLoadingAssociatedCertificates] = useState(false);
  const [associatedCertificatesError, setAssociatedCertificatesError] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [associationOpen, setAssociationOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const filteredUtentes = useMemo(() => {
    const query = normalizeSearch(search);
    if (!query) return utentes;

    return utentes.filter((utente) => {
      const person = getPerson(utente);
      return [getName(utente), person.email, person.nuit, person.telefone ?? person.phone]
        .some((value) => normalizeSearch(value).includes(query));
    });
  }, [search, utentes]);

  const loadUtentes = useCallback(async () => {
    setLoading(true);
    try {
      setUtentes(await getUtentes());
    } catch {
      message.error('Não foi possível carregar os utentes.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUtentes();
  }, [loadUtentes]);

  const openCreateForm = () => {
    setEditingUtente(null);
    form.resetFields();
    setFormOpen(true);
  };

  const openEditForm = (utente) => {
    setEditingUtente(utente);
    form.setFieldsValue(getUtenteValues(utente));
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingUtente(null);
    form.resetFields();
  };

  const onFinish = async (values) => {
    const payload = {
      nome: values.nome.trim(),
      apelido: values.apelido.trim(),
      nuit: values.nuit.trim(),
      email: values.email.trim(),
      telefone: values.telefone?.trim() || null,
      endereco: values.endereco?.trim() || null,
    };

    setSaving(true);
    try {
      if (editingUtente) {
        const id = getRecordId(editingUtente);
        if (id == null) {
          message.error('Este registo não tem um identificador para atualização.');
          return;
        }
        await updateUtente(id, payload);
        message.success('Dados do utente atualizados.');
      } else {
        await createUtente(payload);
        message.success('Utente registado com sucesso.');
      }
      closeForm();
      await loadUtentes();
    } catch (error) {
      message.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (utente) => {
    const id = getRecordId(utente);
    if (id == null) {
      message.error('Este registo não tem um identificador para remoção.');
      return;
    }

    setDeletingId(id);
    try {
      await deleteUtente(id);
      setUtentes((current) => current.filter((item) => String(getRecordId(item)) !== String(id)));
      message.success('Utente removido.');
      if (String(getRecordId(selectedUtente ?? {})) === String(id)) setSelectedUtente(null);
    } catch (error) {
      message.error(getErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  const openAssociationModal = async (utente) => {
    if (getRecordId(utente) == null) {
      message.error('Este utente não tem um identificador para associar certificados.');
      return;
    }

    setAssociationUtente(utente);
    associationForm.resetFields();
    setCertificados([]);
    setAssociationOpen(true);
    setLoadingCertificados(true);
    try {
      const records = await getCertificados();
      setCertificados(records);
      if (records.length === 0) message.info('Ainda não existem certificados para associar.');
    } catch {
      message.error('Não foi possível carregar os certificados.');
    } finally {
      setLoadingCertificados(false);
    }
  };

  const closeAssociationModal = () => {
    setAssociationOpen(false);
    setAssociationUtente(null);
    associationForm.resetFields();
  };

  const onAssociateCertificate = async ({ certificado }) => {
    const utenteId = getRecordId(associationUtente ?? {});
    if (utenteId == null) return;

    setAssociating(true);
    try {
      await associateCertificateToUtente(utenteId, certificado);
      message.success('Certificado associado ao utente.');
      closeAssociationModal();
    } catch (error) {
      message.error(getErrorMessage(error));
    } finally {
      setAssociating(false);
    }
  };

  const openAssociatedCertificates = async (utente) => {
    const utenteId = getRecordId(utente);
    if (utenteId == null) return;

    setCertificatesUtente(utente);
    setAssociatedCertificates([]);
    setAssociatedCertificatesError(false);
    setLoadingAssociatedCertificates(true);
    try {
      const relations = await getUtenteCertificados();
      const relatedCertificates = relations
        .filter((relation) => {
          const relatedUtente = relation.utente ?? relation.utente_id ?? relation.cliente ?? relation.usuario;
          const relatedUtenteId = relatedUtente && typeof relatedUtente === 'object'
            ? getRecordId(relatedUtente)
            : relatedUtente;
          return String(relatedUtenteId) === String(utenteId);
        })
        .map((relation) => relation.certificado ?? relation.certificate)
        .filter((certificate) => certificate && typeof certificate === 'object')
        .sort((left, right) => String(left.titulo ?? left.nome ?? '').localeCompare(String(right.titulo ?? right.nome ?? ''), 'pt-MZ'));
      setAssociatedCertificates(relatedCertificates);
    } catch (error) {
      setAssociatedCertificatesError(true);
      message.error(getErrorMessage(error));
    } finally {
      setLoadingAssociatedCertificates(false);
    }
  };

  const closeAssociatedCertificates = () => {
    setCertificatesUtente(null);
    setAssociatedCertificates([]);
    setAssociatedCertificatesError(false);
  };

  const columns = [
    { title: 'Nome', key: 'nome', width: 114, ellipsis: true, render: (_, record) => getName(record) },
    {
      title: 'E-mail',
      key: 'email',
      width: 134,
      ellipsis: true,
      render: (_, record) => getPerson(record).email ?? '—',
    },
    {
      title: 'NUIT',
      key: 'nuit',
      width: 88,
      ellipsis: true,
      render: (_, record) => getPerson(record).nuit ?? '—',
    },
    {
      title: 'Registado em',
      key: 'data',
      width: 90,
      ellipsis: true,
      render: (_, record) => formatDate(record.data_criacao ?? record.created_at ?? record.data_inscricao),
    },
    {
      title: 'Estado',
      key: 'estado',
      width: 82,
      render: (_, record) => {
        const status = record.estado ?? record.status ?? 'Registado';
        const color = /ativo|validado|aprovado/i.test(status) ? 'green' : /pendente/i.test(status) ? 'gold' : 'blue';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Ações',
      key: 'acoes',
      width: 144,
      render: (_, record) => {
        const id = getRecordId(record);
        return (
          <Space size={0} className="admin-table-actions">
            <Tooltip title="Ver detalhes">
              <Button type="text" size="small" aria-label={`Ver detalhes de ${getName(record)}`} icon={<EyeOutlined />} onClick={() => setSelectedUtente(record)} />
            </Tooltip>
            <Tooltip title="Ver certificados associados">
              <Button type="text" size="small" aria-label={`Ver certificados associados de ${getName(record)}`} icon={<FileProtectOutlined />} disabled={id == null} onClick={() => openAssociatedCertificates(record)} />
            </Tooltip>
            <Tooltip title="Editar utente">
              <Button type="text" size="small" aria-label={`Editar ${getName(record)}`} icon={<EditOutlined />} disabled={id == null} onClick={() => openEditForm(record)} />
            </Tooltip>
            <Tooltip title="Associar certificado">
              <Button type="text" size="small" aria-label={`Associar certificado a ${getName(record)}`} icon={<LinkOutlined />} disabled={id == null} onClick={() => openAssociationModal(record)} />
            </Tooltip>
            <Popconfirm
              title="Eliminar utente?"
              description="Esta ação não pode ser desfeita."
              okText="Eliminar"
              cancelText="Cancelar"
              okButtonProps={{ danger: true, loading: id != null && String(deletingId) === String(id) }}
              onConfirm={() => onDelete(record)}
            >
              <Tooltip title="Eliminar utente">
                <Button type="text" size="small" danger aria-label={`Eliminar ${getName(record)}`} icon={<DeleteOutlined />} disabled={id == null} loading={id != null && String(deletingId) === String(id)} />
              </Tooltip>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const details = getUtenteValues(selectedUtente ?? {});

  return (
    <section className="admin-data-page">
      <header className="admin-data-heading">
        <div><span className="eyebrow">Registos da plataforma</span><h2>Utentes</h2></div>
        <Space wrap>
          <Input.Search
            aria-label="Pesquisar utentes"
            placeholder="Pesquisar nome, e-mail ou NUIT"
            allowClear
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={{ width: 280 }}
          />
          <span>{filteredUtentes.length} de {utentes.length} utente(s)</span>
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreateForm}>Novo utente</Button>
        </Space>
      </header>
      <Table
        rowKey={(record) => getRecordId(record) ?? getPerson(record).email ?? getPerson(record).nuit}
        columns={columns}
        dataSource={filteredUtentes}
        loading={loading}
        tableLayout="fixed"
        pagination={{ pageSize: 10, showSizeChanger: false }}
        scroll={screens.lg ? undefined : { x: 'max-content' }}
        locale={{ emptyText: loading ? 'A carregar registos…' : search ? 'Nenhum utente corresponde à pesquisa.' : 'Ainda não existem utentes registados.' }}
      />

      <Modal
        title={editingUtente ? 'Editar utente' : 'Registar utente'}
        open={formOpen}
        onCancel={closeForm}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark="optional">
          <Form.Item name="nome" label="Nome" rules={[{ required: true, message: 'Indique o nome.' }]}>
            <Input autoComplete="given-name" />
          </Form.Item>
          <Form.Item name="apelido" label="Apelido" rules={[{ required: true, message: 'Indique o apelido.' }]}>
            <Input autoComplete="family-name" />
          </Form.Item>
          <Form.Item
            name="nuit"
            label="NUIT"
            rules={[
              { required: true, message: 'Indique o NUIT.' },
              { pattern: /^[0-9]{9}$/, message: 'O NUIT deve conter 9 dígitos.' },
            ]}
          >
            <Input maxLength={9} inputMode="numeric" />
          </Form.Item>
          <Form.Item name="email" label="E-mail" rules={[{ required: true, message: 'Indique o e-mail.' }, { type: 'email', message: 'Introduza um e-mail válido.' }]}>
            <Input autoComplete="email" />
          </Form.Item>
          <Form.Item name="telefone" label="Telefone">
            <Input autoComplete="tel" />
          </Form.Item>
          <Form.Item name="endereco" label="Endereço">
            <Input.TextArea rows={3} autoComplete="street-address" />
          </Form.Item>
          <Space>
            <Button onClick={closeForm}>Cancelar</Button>
            <Button type="primary" htmlType="submit" loading={saving}>
              {editingUtente ? 'Guardar alterações' : 'Registar utente'}
            </Button>
          </Space>
        </Form>
      </Modal>

      <Modal
        title={`Associar certificado${associationUtente ? ` a ${getName(associationUtente)}` : ''}`}
        open={associationOpen}
        onCancel={closeAssociationModal}
        footer={null}
        destroyOnClose
      >
        <Form form={associationForm} layout="vertical" onFinish={onAssociateCertificate}>
          <Form.Item
            name="certificado"
            label="Certificado"
            rules={[{ required: true, message: 'Selecione um certificado.' }]}
          >
            <Select
              showSearch
              loading={loadingCertificados}
              placeholder="Pesquise e selecione um certificado"
              optionFilterProp="label"
              notFoundContent={loadingCertificados ? 'A carregar certificados…' : 'Nenhum certificado disponível.'}
              filterOption={(input, option) => normalizeSearch(option?.label).includes(normalizeSearch(input))}
              options={certificados
                .map((certificado) => {
                  const id = getRecordId(certificado);
                  const label = certificado.titulo ?? certificado.nome ?? certificado.codigo ?? `Certificado ${id ?? ''}`;
                  return id == null ? null : { value: id, label: String(label) };
                })
                .filter(Boolean)}
            />
          </Form.Item>
          <Space>
            <Button onClick={closeAssociationModal}>Cancelar</Button>
            <Button type="primary" htmlType="submit" loading={associating} disabled={loadingCertificados || certificados.length === 0}>
              Associar certificado
            </Button>
          </Space>
        </Form>
      </Modal>

      <Modal
        title="Detalhes do utente"
        open={Boolean(selectedUtente)}
        onCancel={() => setSelectedUtente(null)}
        footer={<Button onClick={() => setSelectedUtente(null)}>Fechar</Button>}
      >
        {selectedUtente && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Nome">{getName(selectedUtente)}</Descriptions.Item>
            <Descriptions.Item label="E-mail">{details.email || '—'}</Descriptions.Item>
            <Descriptions.Item label="NUIT">{details.nuit || '—'}</Descriptions.Item>
            <Descriptions.Item label="Telefone">{details.telefone || '—'}</Descriptions.Item>
            <Descriptions.Item label="Endereço">{details.endereco || '—'}</Descriptions.Item>
            <Descriptions.Item label="Registado em">
              {formatDate(selectedUtente.data_criacao ?? selectedUtente.created_at ?? selectedUtente.data_inscricao)}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
      <Modal
        className="admin-associated-certificates-modal"
        title={`Certificados associados${certificatesUtente ? ` — ${getName(certificatesUtente)}` : ''}`}
        open={Boolean(certificatesUtente)}
        onCancel={closeAssociatedCertificates}
        footer={<Button onClick={closeAssociatedCertificates}>Fechar</Button>}
        destroyOnClose
        width={680}
      >
        <Table
          rowKey={(certificate) => getRecordId(certificate) ?? `${certificate.titulo ?? certificate.nome ?? 'certificado'}-${certificate.data_emissao ?? ''}`}
          columns={[
            {
              title: 'Certificado',
              key: 'titulo',
              ellipsis: true,
              render: (_, certificate) => certificate.titulo ?? certificate.nome ?? certificate.codigo ?? 'Sem titulo',
            },
            { title: 'Emissao', key: 'data_emissao', width: 130, render: (_, certificate) => formatDate(certificate.data_emissao) },
            { title: 'Validade', key: 'validade', width: 130, render: (_, certificate) => certificate.validade ? formatDate(certificate.validade) : 'Indefinida' },
          ]}
          dataSource={associatedCertificates}
          loading={loadingAssociatedCertificates}
          pagination={{ pageSize: 6, showSizeChanger: false }}
          size="small"
          locale={{ emptyText: loadingAssociatedCertificates ? 'A carregar certificados...' : associatedCertificatesError ? 'Nao foi possivel carregar os certificados associados.' : 'Este utente nao tem certificados associados.' }}
        />
      </Modal>
    </section>
  );
};

export default Inscri;
