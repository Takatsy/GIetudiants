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

const MentionTable = () => {
    const [domaineList, setDomaineList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentDomaine, setCurrentDomaine] = useState(null);
    const [form] = Form.useForm();
    const [searchTerm, setSearchTerm] = useState('');

    

    const getDomaineList = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/Domaine');
            setDomaineList(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des domaines:', error);
            notification.error({ message: 'Erreur lors de la récupération des domaines!' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDomaineList();
    }, []);

    const handleDelete = async (value) => {
        try {
            await axios.delete(`http://localhost:8000/api/Domaine/${value.id}/`);
            const filteredData = domaineList.filter((item) => item.id !== value.id);
            setDomaineList(filteredData);
            notification.success({ message: 'Domaine supprimée avec succès!' });
        } catch (error) {
            console.error('Erreur lors de la suppression du domaine:', error);
            notification.error({ message: 'Erreur lors de la suppression du domaine!' });
        }
    };

    const handleAdd = async (values) => {
        
        try {
            await axios.post('http://localhost:8000/api/Domaine/', {
                Nom_Domaine: values.Nom_Domaine,
                
            });
            form.resetFields();
            setIsModalOpen(false);
            notification.success({ message: 'Domaine ajoutée avec succès!' });
            getDomaineList();
        } catch (error) {
            console.error('Erreur lors de l\'ajout du domaine:', error);
            notification.error({ message: 'Erreur lors de l\'ajout du domaine!' });
        }
    };

    const handleEdit = async (values) => {
        try {
            await axios.put(`http://localhost:8000/api/Domaine/${currentDomaine.id}/`, {
                Nom_Domaine: values.Nom_Domaine,
            });
            form.resetFields();
            setIsModalOpen(false);
            getDomaineList();
            notification.success({ message: 'Domaine mise à jour avec succès!' });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du domaine:', error);
            notification.error({ message: 'Erreur lors de la mise à jour du domaine!' });
        }
    };

    const openEditModal = (domaine) => {
        setCurrentDomaine(domaine);
        form.setFieldsValue({
            Nom_Domaine: domaine.Nom_Domaine,
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
        title: "Domaine",
        dataIndex: "Nom_Domaine",
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

const filteredDomaineList = domaineList.filter(domaine => {
    
    return (
        (domaine.Nom_Domaine && domaine.Nom_Domaine.toLowerCase().includes(searchTerm.toLowerCase())) 
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
                      Ajouter un domaine
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
                        title={isEditMode ? "Modifier un domaine" : "Ajouter un domaine"}
                        open={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                        footer={null}
                    >
                        <Form form={form} onFinish={isEditMode ? handleEdit : handleAdd}>
                            
                            <Form.Item
                                label="Domaine"
                                name="Nom_Domaine"
                                rules={[{ required: true, message: 'Veuillez entrer le nom du domaine!' }]}
                            >
                                <Input placeholder="Entrez le nom du domaine" />
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
                  dataSource={filteredDomaineList}
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
export default MentionTable;
