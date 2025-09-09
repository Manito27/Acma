import React, { useState, useRef } from "react";
import { Button, Input, List, Tabs, message } from "antd";
import Peer from "simple-peer";

const { TabPane } = Tabs;

const OnlineClassroom = () => {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");
  const [peer, setPeer] = useState(null);
  const [stream, setStream] = useState(null);

  const myVideo = useRef();
  const partnerVideo = useRef();

  // Adicionar link externo (Zoom, Meet, etc)
  const addLink = () => {
    if (!newLink) {
      message.error("Insira um link válido!");
      return;
    }
    setLinks([...links, newLink]);
    setNewLink("");
  };

  // Iniciar videochamada local
  const startCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      if (myVideo.current) {
        myVideo.current.srcObject = mediaStream;
      }

      const newPeer = new Peer({ initiator: true, trickle: false, stream: mediaStream });
      newPeer.on("signal", (data) => {
        console.log("SIGNAL:", JSON.stringify(data));
        message.info("Compartilhe este sinal com o outro participante.");
      });

      newPeer.on("stream", (remoteStream) => {
        if (partnerVideo.current) {
          partnerVideo.current.srcObject = remoteStream;
        }
      });

      setPeer(newPeer);
    } catch (err) {
      console.error(err);
      message.error("Erro ao acessar câmera/microfone");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2 className="text-xl font-bold mb-4">📚 Sala Online</h2>

      <Tabs defaultActiveKey="1">
        {/* Aba 1 - Links */}
        <TabPane tab="Links de Videoaula" key="1">
          <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
            <Input
              placeholder="Cole o link do Zoom, Meet, etc"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
            />
            <Button type="primary" onClick={addLink}>
              Adicionar
            </Button>
          </div>
          <List
            bordered
            dataSource={links}
            renderItem={(item, index) => (
              <List.Item>
                <a href={item} target="_blank" rel="noreferrer">
                  Aula {index + 1}: {item}
                </a>
              </List.Item>
            )}
          />
        </TabPane>

        {/* Aba 2 - Videochamada */}
        <TabPane tab="Videochamada" key="2">
          <Button type="primary" onClick={startCall}>
            Iniciar Videochamada
          </Button>
          <div style={{ display: "flex", marginTop: 20, gap: 20 }}>
            <div>
              <h4>Meu Vídeo</h4>
              <video ref={myVideo} autoPlay playsInline muted style={{ width: 300, borderRadius: 8 }} />
            </div>
            <div>
              <h4>Participante</h4>
              <video ref={partnerVideo} autoPlay playsInline style={{ width: 300, borderRadius: 8 }} />
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default OnlineClassroom;
