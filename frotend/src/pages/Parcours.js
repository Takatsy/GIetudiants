/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Row,
  Col,
  Card,
  Table,
  //Progress,
  Button,
  Popconfirm,
  notification,
  Modal,
  Form,
  Select,
  Input,
} from "antd";

import { DeleteColumnOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
//import { Link } from "react-router-dom";

// Images
//import ava1 from "../assets/images/logo-shopify.svg";
//import ava2 from "../assets/images/logo-atlassian.svg";
//import ava3 from "../assets/images/logo-slack.svg";
/*import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import face from "../assets/images/face-1.jpg";
import face2 from "../assets/images/face-2.jpg";
import face3 from "../assets/images/face-3.jpg";
import face4 from "../assets/images/face-4.jpg";
import face5 from "../assets/images/face-5.jpeg";
import face6 from "../assets/images/face-6.jpeg";
import pencil from "../assets/images/pencil.svg";
*/

const { Option } = Select;
//const { Title } = Typography;

const ParcoursTable = () => {
    const [parcoursList, setParcoursList] = useState([]);
    const [metionList, setMentionList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentParcours, setCurrentParcours] = useState(null);
    const [form] = Form.useForm();
    const [searchTerm, setSearchTerm] = useState('');

    const getParcoursList = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/Parcours');
            setParcoursList(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des parcours:', error);
            notification.error({ message: 'Erreur lors de la récupération des parcours!' });
        } finally {
            setLoading(false);
        }
    };

    const getMentionList = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/Mention');
            setMentionList(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des mentions:', error);
            notification.error({ message: 'Erreur lors de la récupération des mentions!' });
        }
    };

    useEffect(() => {
        getParcoursList();
        getMentionList();
    }, []);

    const handleDelete = async (value) => {
        try {
            await axios.delete(`http://localhost:8000/api/Parcours/${value.id}/`);
            const filteredData = parcoursList.filter((item) => item.id !== value.id);
            setParcoursList(filteredData);
            notification.success({ message: 'Parcours supprimé avec succès!' });
        } catch (error) {
            console.error('Erreur lors de la suppression du parcours:', error);
            notification.error({ message: 'Erreur lors de la suppression du parcours!' });
        }
    };

    const handleAdd = async (values) => {
        try {
            await axios.post('http://localhost:8000/api/Parcours/', {
                Nom_Parcours: values.Nom_Parcours,
                Mention: values.Mention,
            });
            form.resetFields();
            setIsModalOpen(false);
            getParcoursList();
            notification.success({ message: 'Parcours ajoutée avec succès!' });
        } catch (error) {
            console.error('Erreur lors de l\'ajout du parcours:', error);
            notification.error({ message: 'Erreur lors de l\'ajout du parcours!' });
        }
    };

    const handleEdit = async (values) => {
        try {
            await axios.put(`http://localhost:8000/api/Parcours/${currentParcours.id}/`, {
                Nom_Parcours: values.Nom_Parcours,
                Mention: values.Mention,
            });
            form.resetFields();
            setIsModalOpen(false);
            getParcoursList();
            notification.success({ message: 'Parcours mise à jour avec succès!' });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du parcours:', error);
            notification.error({ message: 'Erreur lors de la mise à jour du parcours!' });
        }
    };

    const openEditModal = (parcours) => {
        setCurrentParcours(parcours);
        form.setFieldsValue({
            Nom_Parcours: parcours.Nom_Parcours,
            Mention: parcours.Mention ? parcours.Mention.id : undefined,
        });
        setIsEditMode(true);
        setIsModalOpen(true);
    };


/*const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};*/
// table code start
const columns = [
    {
        title: "Id",
        dataIndex: "id",
        align: "center",
    },
    {
        title: "Mention",
        dataIndex: "Mention_Info",
        align: "center",
        render: (mentionInfo) => mentionInfo ? mentionInfo.Nom_Mention : 'N/A',
    },
    {
        title: "Parcours",
        dataIndex: "Nom_Parcours",
        align: "center",
    },
    {
        title: "Actions",
        dataIndex: "action",
        align: "center",
        render: (_, record) => (
            <div>
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => openEditModal(record)}
                    
                >
                    Modifier
                </Button>
                <Popconfirm
                    title="Etes-vous sûr de vouloir supprimer ?"
                    onConfirm={() => handleDelete(record)}
                >
                    <Button type="primary" danger icon={<DeleteOutlined />} style={{ marginLeft: '8px' }}>
                        Supprimer
                    </Button>
                </Popconfirm>
                
            </div>
        ),
    },
];

const filteredParcoursList = parcoursList.filter(parcours => {
    const mentionName = parcours.Mention_Info ? parcours.Mention_Info.Nom_Mention : '';
    return (
        (parcours.Nom_Parcours && parcours.Nom_Parcours.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (mentionName && mentionName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
});

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              
              extra={
                <>
                 <Row gutter={[16, 16]} justify="start" align="middle">
                  <Col>
                    <Button
                      type="primary"
                      onClick={() => { setIsModalOpen(true); setIsEditMode(false); form.resetFields(); }}
                      icon={<PlusOutlined />}
                      style={{ backgroundColor: 'black', borderColor: 'black', color: 'white' }}
                    >
                      Ajouter un parcours
                    </Button>
                  </Col>
                  <Col>
                    <Input
                      placeholder="Rechercher"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: '300px', marginLeft: '1460px'}} 
                    />
                  </Col>
                </Row>
                  
                <Modal
                        title={isEditMode ? "Modifier un parcours" : "Ajouter un parcours"}
                        open={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                        footer={null}
                >
                        <Form form={form} onFinish={isEditMode ? handleEdit : handleAdd}>
                        
                        <Form.Item
                            label="Mention"
                            name="Mention"
                            rules={[{ required: true, message: 'Veuillez sélectionner une mention!' }]}
                        >
                            <Select placeholder="Sélectionnez une mention" >
                                {metionList.map((mention) => (
                                    <Option key={mention.id} value={mention.id}>
                                        {mention.Nom_Mention}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Parcours"
                            name="Nom_Parcours"
                            rules={[{ required: true, message: 'Veuillez entrer le parcours!' }]}
                        >
                            <Input placeholder="Entrez le parcours" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: 'black', borderColor: 'black', color: 'white' }}
                                icon={isEditMode ? <EditOutlined /> : <PlusOutlined />}>
                                {isEditMode ? "Mettre à jour" : "Ajouter"}
                            </Button>
                        </Form.Item>
                        </Form>
                    </Modal>
                </>
              }
            >
              
              <div className="table-responsive">
              
                <Table
                  columns={columns}
                  dataSource={filteredParcoursList}
                  loading={loading}
                  rowKey="id"
                  pagination={true}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default ParcoursTable;
