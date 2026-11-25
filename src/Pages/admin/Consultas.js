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
  Tooltip,
  Upload,
  message,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LinkOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  associateCertificateToUtente,
  createCertificado,
  deleteCertificado,
  getBackendFileUrl,
  getCertificados,
  getUtenteCertificados,
  getUtentes,
  updateCertificado,
} from '../../services/api';

const getId = (record) => record?.id ?? record?.pk;

const getPerson = (utente) => {
  if (!utente || typeof utente !== 'object') return {};
  const nestedUser = utente.user ?? utente.usuario;
  return nestedUser && typeof nestedUser === 'object' ? { ...utente, ...nestedUser } : utente;
};

const getUtenteName = (utente) => {
  const person = getPerson(utente);
  return [person.nome ?? person.first_name, person.apelido ?? person.last_name].filter(Boolean).join(' ') || 'Utente';
};

const getCertificateTitle = (certificate) => certificate.titulo ?? certificate.nome ?? certificate.codigo ?? 'Sem título';

const getFilePath = (certificate) => {
  const file = certificate?.arquivos ?? certificate?.arquivo ?? certificate?.ficheiro ?? certificate?.file;
  return file && typeof file === 'object' ? file.url ?? file.path ?? '' : file ?? '';
};

const getRelationReference = (relation, key) => relation?.[key] ?? relation?.[`${key}_id`] ?? relation?.[`${key}Id`];

const getReferenceId = (value) => (value && typeof value === 'object' ? getId(value) : value);

const sameId = (left, right) => left != null && right != null && String(left) === String(right);

const normalizeSearch = (value) => String(value ?? '')
  .trim()
  .toLocaleLowerCase('pt-MZ')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('pt-MZ');
};

const toDateInput = (value) => {
  const date = String(value ?? '').match(/^\d{4}-\d{2}-\d{2}/);
  return date ? date[0] : '';
};

const normalizeFileEvent = (event) => (Array.isArray(event) ? event : event?.fileList);

const getErrorMessage = (error) => {
  const data = error.response?.data;
  if (typeof data?.detail === 'string') return data.detail;
  if (typeof data?.message === 'string') return data.message;

  const validationMessages = Object.values(data ?? {})
    .flatMap((value) => Array.isArray(value) ? value : [value])
    .filter((value) => typeof value === 'string');
  if (validationMessages.length) return validationMessages.join(' ');
  if (error.response) return 'Não foi possível concluir a operação. Verifique os dados e tente novamente.';
  return 'Não foi possível ligar ao servidor Django.';
};

const Consultas = () => {
  const screens = Grid.useBreakpoint();
  const [form] = Form.useForm();
  const [associationForm] = Form.useForm();
  const [certificados, setCertificados] = useState([]);
  const [utentes, setUtentes] = useState([]);
  const [associations, setAssociations] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [associating, setAssociating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [associationCertificate, setAssociationCertificate] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [associationOpen, setAssociationOpen] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [certificateRecords, utenteRecords, associationRecords] = await Promise.all([
        getCertificados(),
        getUtentes(),
        getUtenteCertificados(),
      ]);
      setCertificados(certificateRecords);
      setUtentes(utenteRecords);
      setAssociations(associationRecords);
    } catch {
      message.error('Não foi possível carregar os certificados e as associações.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const getRelatedUtentes = useCallback((certificate) => {
    const certificateId = getId(certificate);
    const directUtentes = certificate.utentes ?? certificate.usuarios;
    if (Array.isArray(directUtentes)) return directUtentes;

    const relatedRecords = associations.filter((relation) => {
      const relationCertificate = getRelationReference(relation, 'certificado') ?? getRelationReference(relation, 'certificate');
      return sameId(getReferenceId(relationCertificate), certificateId);
    });

    const linkedUtentes = relatedRecords
      .map((relation) => {
        const reference = getRelationReference(relation, 'utente') ?? getRelationReference(relation, 'cliente') ?? getRelationReference(relation, 'usuario');
        if (reference && typeof reference === 'object') return reference;
        return utentes.find((utente) => sameId(getId(utente), reference));
      })
      .filter(Boolean);

    if (linkedUtentes.length) return linkedUtentes;
    const directUtente = certificate.utente ?? certificate.cliente ?? certificate.usuario;
    if (directUtente && typeof directUtente === 'object') return [directUtente];
    const directUtenteId = getReferenceId(directUtente);
    const matchingUtente = utentes.find((utente) => sameId(getId(utente), directUtenteId));
    return matchingUtente ? [matchingUtente] : [];
  }, [associations, utentes]);

  const filteredCertificates = useMemo(() => {
    const query = normalizeSearch(search);
    if (!query) return certificados;

    return certificados.filter((certificate) => {
      const holderNames = getRelatedUtentes(certificate).map(getUtenteName).join(' ');
      return [
        getCertificateTitle(certificate),
        certificate.descricao,
        certificate.data_emissao,
        certificate.validade,
        holderNames,
      ].some((value) => normalizeSearch(value).includes(query));
    });
  }, [certificados, getRelatedUtentes, search]);

  const openCreateForm = () => {
    setEditingCertificate(null);
    form.resetFields();
    setFormOpen(true);
  };

  const openEditForm = (certificate) => {
    setEditingCertificate(certificate);
    form.setFieldsValue({
      titulo: certificate.titulo ?? certificate.nome ?? '',
      descricao: certificate.descricao ?? '',
      data_emissao: toDateInput(certificate.data_emissao),
      validade: toDateInput(certificate.validade),
      arquivos: [],
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingCertificate(null);
    form.resetFields();
  };

  const onFinish = async (values) => {
    const file = values.arquivos?.[0]?.originFileObj;
    const payload = {
      titulo: values.titulo.trim(),
      descricao: values.descricao?.trim() ?? '',
      data_emissao: values.data_emissao || null,
      validade: values.validade || null,
    };
    if (file) payload.arquivos = file;

    setSaving(true);
    try {
      if (editingCertificate) {
        const id = getId(editingCertificate);
        if (id == null) {
          message.error('Este certificado não tem um identificador para atualização.');
          return;
        }
        await updateCertificado(id, payload);
        message.success('Certificado atualizado.');
      } else {
        await createCertificado(payload);
        message.success('Certificado criado.');
      }
      closeForm();
      await loadData();
    } catch (error) {
      message.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (certificate) => {
    const id = getId(certificate);
    if (id == null) {
      message.error('Este certificado não tem um identificador para remoção.');
      return;
    }

    setDeletingId(id);
    try {
      await deleteCertificado(id);
      setCertificados((current) => current.filter((item) => !sameId(getId(item), id)));
      setAssociations((current) => current.filter((item) => {
        const reference = getRelationReference(item, 'certificado') ?? getRelationReference(item, 'certificate');
        return !sameId(getReferenceId(reference), id);
      }));
      if (sameId(getId(selectedCertificate ?? {}), id)) setSelectedCertificate(null);
      message.success('Certificado eliminado.');
    } catch (error) {
      message.error(getErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  const openAssociationModal = (certificate) => {
    setAssociationCertificate(certificate);
    associationForm.resetFields();
    setAssociationOpen(true);
  };

  const closeAssociationModal = () => {
    setAssociationOpen(false);
    setAssociationCertificate(null);
    associationForm.resetFields();
  };

  const onAssociateUtente = async ({ utente }) => {
    const certificateId = getId(associationCertificate ?? {});
    if (certificateId == null) return;

    setAssociating(true);
    try {
      await associateCertificateToUtente(utente, certificateId);
      message.success('Utente associado ao certificado.');
      closeAssociationModal();
      await loadData();
    } catch (error) {
      message.error(getErrorMessage(error));
    } finally {
      setAssociating(false);
    }
  };

  const getAvailableUtentes = (certificate) => {
    const associatedIds = new Set(getRelatedUtentes(certificate).map((utente) => String(getId(utente))));
    return utentes.filter((utente) => getId(utente) != null && !associatedIds.has(String(getId(utente))));
  };

  const columns = [
    { title: 'Certificado', key: 'titulo', width: 145, ellipsis: true, render: (_, record) => getCertificateTitle(record) },
    {
      title: 'Utentes associados',
      key: 'utentes',
      width: 160,
      ellipsis: true,
      render: (_, record) => {
        const holders = getRelatedUtentes(record);
        return holders.length ? holders.map(getUtenteName).join(', ') : 'Sem utentes associados';
      },
    },
    { title: 'Emissão', key: 'emissao', width: 90, ellipsis: true, render: (_, record) => formatDate(record.data_emissao) },
    { title: 'Validade', key: 'validade', width: 95, ellipsis: true, render: (_, record) => record.validade ? formatDate(record.validade) : 'Indefinida' },
    {
      title: 'Ações',
      key: 'acoes',
      width: 128,
      render: (_, record) => {
        const id = getId(record);
        const availableUtenteCount = getAvailableUtentes(record).length;
        const canAssociate = id != null && availableUtenteCount > 0;
        return (
          <Space size={0} className="admin-table-actions">
            <Tooltip title="Ver detalhes">
              <Button type="text" size="small" aria-label={`Ver detalhes de ${getCertificateTitle(record)}`} icon={<EyeOutlined />} onClick={() => setSelectedCertificate(record)} />
            </Tooltip>
            <Tooltip title="Editar certificado">
              <Button type="text" size="small" aria-label={`Editar ${getCertificateTitle(record)}`} icon={<EditOutlined />} disabled={id == null} onClick={() => openEditForm(record)} />
            </Tooltip>
            <Tooltip title={canAssociate ? 'Associar utente' : utentes.length ? 'Todos os utentes já estão associados' : 'Não existem utentes registados'}>
              <Button type="text" size="small" aria-label={`Associar utente a ${getCertificateTitle(record)}`} icon={<LinkOutlined />} disabled={!canAssociate} onClick={() => openAssociationModal(record)} />
            </Tooltip>
            <Popconfirm
              title="Eliminar certificado?"
              description="Esta ação não pode ser desfeita."
              okText="Eliminar"
              cancelText="Cancelar"
              okButtonProps={{ danger: true, loading: id != null && sameId(deletingId, id) }}
              onConfirm={() => onDelete(record)}
            >
              <Tooltip title="Eliminar certificado">
                <Button type="text" size="small" danger aria-label={`Eliminar ${getCertificateTitle(record)}`} icon={<DeleteOutlined />} disabled={id == null} loading={id != null && sameId(deletingId, id)} />
              </Tooltip>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const detailUtentes = selectedCertificate ? getRelatedUtentes(selectedCertificate) : [];
  const selectedFilePath = selectedCertificate ? getFilePath(selectedCertificate) : '';
  const associatedIds = associationCertificate
    ? new Set(getRelatedUtentes(associationCertificate).map((utente) => String(getId(utente))))
    : new Set();
  const availableUtentes = associationCertificate
    ? utentes.filter((utente) => getId(utente) != null && !associatedIds.has(String(getId(utente))))
    : [];

  return (
    <section className="admin-data-page">
      <header className="admin-data-heading">
        <div><span className="eyebrow">Registos emitidos</span><h2>Certificados</h2></div>
        <Space wrap>
          <Input.Search
            aria-label="Pesquisar certificados"
            placeholder="Pesquisar certificado ou utente"
            allowClear
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={{ width: 270 }}
          />
          <span>{filteredCertificates.length} de {certificados.length} certificado(s)</span>
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreateForm}>Novo certificado</Button>
        </Space>
      </header>
      <Table
        rowKey={(record) => getId(record) ?? record.codigo ?? `${getCertificateTitle(record)}-${record.data_emissao}`}
        columns={columns}
        dataSource={filteredCertificates}
        loading={loading}
        tableLayout="fixed"
        pagination={{ pageSize: 10, showSizeChanger: false }}
        scroll={screens.lg ? undefined : { x: 'max-content' }}
        locale={{ emptyText: loading ? 'A carregar certificados…' : search ? 'Nenhum certificado corresponde à pesquisa.' : 'Ainda não existem certificados.' }}
      />

      <Modal
        title={editingCertificate ? 'Editar certificado' : 'Adicionar certificado'}
        open={formOpen}
        onCancel={closeForm}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark="optional">
          <Form.Item name="titulo" label="Título" rules={[{ required: true, message: 'Indique o título do certificado.' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="descricao" label="Descrição">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="data_emissao" label="Data de emissão" rules={[{ required: true, message: 'Indique a data de emissão.' }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item name="validade" label="Validade">
            <Input type="date" />
          </Form.Item>
          {editingCertificate && getFilePath(editingCertificate) && (
            <p className="form-note">
              Ficheiro atual: <a href={getBackendFileUrl(getFilePath(editingCertificate))} target="_blank" rel="noreferrer">Abrir certificado</a>. Selecione outro para o substituir.
            </p>
          )}
          <Form.Item
            name="arquivos"
            label="Ficheiro do certificado"
            valuePropName="fileList"
            getValueFromEvent={normalizeFileEvent}
          >
            <Upload beforeUpload={() => false} maxCount={1} accept=".pdf,.png,.jpg,.jpeg">
              <Button icon={<UploadOutlined />}>Selecionar ficheiro</Button>
            </Upload>
          </Form.Item>
          <Space>
            <Button onClick={closeForm}>Cancelar</Button>
            <Button type="primary" htmlType="submit" loading={saving}>
              {editingCertificate ? 'Guardar alterações' : 'Adicionar certificado'}
            </Button>
          </Space>
        </Form>
      </Modal>

      <Modal
        title={`Associar utente${associationCertificate ? ` ao certificado “${getCertificateTitle(associationCertificate)}”` : ''}`}
        open={associationOpen}
        onCancel={closeAssociationModal}
        footer={null}
        destroyOnClose
      >
        <Form form={associationForm} layout="vertical" onFinish={onAssociateUtente}>
          <Form.Item
            name="utente"
            label={`Utente${availableUtentes.length ? ` (${availableUtentes.length} disponiveis)` : ''}`}
            extra={availableUtentes.length ? 'Todos os utentes disponiveis aparecem na lista.' : 'Nao existem utentes disponiveis para este certificado.'}
            rules={[{ required: true, message: 'Selecione um utente.' }]}
          >
            <Select
              showSearch
              loading={loading}
              placeholder="Selecione um utente da lista"
              optionFilterProp="label"
              filterOption={(input, option) => normalizeSearch(option?.label).includes(normalizeSearch(input))}
              notFoundContent={utentes.length ? 'Todos os utentes ja estao associados a este certificado.' : 'Ainda nao existem utentes registados.'}
              options={availableUtentes.map((utente) => {
                const person = getPerson(utente);
                const identifiers = [
                  person.nuit && `NUIT ${person.nuit}`,
                  person.email,
                  person.username,
                ].filter(Boolean);
                return {
                  value: getId(utente),
                  label: [getUtenteName(utente), identifiers.join(' · ')].filter(Boolean).join(' · '),
                };
              })}
            />
          </Form.Item>
          <Space>
            <Button onClick={closeAssociationModal}>Cancelar</Button>
            <Button type="primary" htmlType="submit" loading={associating} disabled={availableUtentes.length === 0}>
              Associar utente
            </Button>
          </Space>
        </Form>
      </Modal>

      <Modal
        title="Detalhes do certificado"
        open={Boolean(selectedCertificate)}
        onCancel={() => setSelectedCertificate(null)}
        width={650}
        footer={[
          selectedFilePath && <Button key="file" type="primary" onClick={() => window.open(getBackendFileUrl(selectedFilePath), '_blank', 'noopener,noreferrer')}>Abrir ficheiro</Button>,
          <Button key="close" onClick={() => setSelectedCertificate(null)}>Fechar</Button>,
        ]}
      >
        {selectedCertificate && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Título">{getCertificateTitle(selectedCertificate)}</Descriptions.Item>
            <Descriptions.Item label="Descrição">{selectedCertificate.descricao || '—'}</Descriptions.Item>
            <Descriptions.Item label="Data de emissão">{formatDate(selectedCertificate.data_emissao)}</Descriptions.Item>
            <Descriptions.Item label="Validade">{selectedCertificate.validade ? formatDate(selectedCertificate.validade) : 'Indefinida'}</Descriptions.Item>
            <Descriptions.Item label="Utentes associados">
              {detailUtentes.length ? detailUtentes.map(getUtenteName).join(', ') : 'Sem utentes associados'}
            </Descriptions.Item>
            <Descriptions.Item label="Ficheiro">{selectedFilePath ? 'Disponível' : 'Não anexado'}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </section>
  );
};

export default Consultas;
