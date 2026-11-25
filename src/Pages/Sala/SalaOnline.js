import React, { useRef, useState } from 'react';
import { Button, Input, List, Tabs, message } from 'antd';
import { LinkOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Peer from 'simple-peer';

const SalaOnline = () => {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState('');
  const [peer, setPeer] = useState(null);
  const [stream, setStream] = useState(null);
  const myVideo = useRef(null);
  const partnerVideo = useRef(null);

  const addLink = () => {
    const value = newLink.trim();
    if (!value) {
      message.error('Introduza um link válido.');
      return;
    }
    setLinks((currentLinks) => [...currentLinks, value]);
    setNewLink('');
  };

  const startCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (myVideo.current) myVideo.current.srcObject = mediaStream;

      const newPeer = new Peer({ initiator: true, trickle: false, stream: mediaStream });
      newPeer.on('signal', (data) => {
        console.log('SIGNAL:', JSON.stringify(data));
        message.info('Partilhe o sinal de ligação com o outro participante.');
      });
      newPeer.on('stream', (remoteStream) => {
        if (partnerVideo.current) partnerVideo.current.srcObject = remoteStream;
      });
      setPeer(newPeer);
    } catch (error) {
      console.error(error);
      message.error('Não foi possível aceder à câmara ou ao microfone.');
    }
  };

  const tabItems = [
    {
      key: 'links',
      label: 'Links de aula',
      children: (
        <div>
          <p className="online-intro">Adicione ligações para as suas aulas no Zoom, Google Meet ou noutra plataforma.</p>
          <div className="online-link-row">
            <Input
              size="large"
              prefix={<LinkOutlined />}
              placeholder="Cole aqui o link da aula"
              value={newLink}
              onChange={(event) => setNewLink(event.target.value)}
              onPressEnter={addLink}
            />
            <Button type="primary" size="large" onClick={addLink}>Adicionar link</Button>
          </div>
          <List
            bordered
            locale={{ emptyText: 'As ligações das suas aulas aparecerão aqui.' }}
            dataSource={links}
            renderItem={(item, index) => (
              <List.Item>
                <a href={item} target="_blank" rel="noopener noreferrer">Aula {index + 1}: {item}</a>
              </List.Item>
            )}
          />
        </div>
      ),
    },
    {
      key: 'video',
      label: 'Videochamada',
      children: (
        <div>
          <p className="online-intro">Inicie a câmara e o microfone neste dispositivo para começar uma sessão.</p>
          <Button type="primary" icon={<VideoCameraOutlined />} onClick={startCall} disabled={Boolean(peer)}>
            {stream ? 'Videochamada iniciada' : 'Iniciar videochamada'}
          </Button>
          <div className="online-video-grid">
            <section className="online-video-panel">
              <h3>A sua câmara</h3>
              <video ref={myVideo} autoPlay playsInline muted />
            </section>
            <section className="online-video-panel">
              <h3>Outro participante</h3>
              <video ref={partnerVideo} autoPlay playsInline />
            </section>
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="page-container page-container--narrow">
      <header className="page-heading">
        <span className="eyebrow">Aprendizagem à distância</span>
        <h1 className="page-title">Sala online</h1>
        <p className="page-lead">Aceda às ligações das aulas ou prepare o seu dispositivo para uma sessão online.</p>
      </header>
      <section className="online-card">
        <Tabs defaultActiveKey="links" items={tabItems} />
      </section>
    </main>
  );
};

export default SalaOnline;
