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

const SemestreTable = () => {
 // const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const [semestreList, setSemestreList] = useState([]);
  const [gradeList, setGradeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSemestre, setCurrentSemestre] = useState(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState('');

  const getSemestreList = async () => {
    setLoading(true);
    try {
        const response = await axios.get('http://localhost:8000/api/Semestre');
        setSemestreList(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des semestres:', error);
        notification.error({ message: 'Erreur lors de la récupération des semestres!' });
    } finally {
        setLoading(false);
    }
};

const getGradeList = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/Grade');
        setGradeList(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des grades:', error);
        notification.error({ message: 'Erreur lors de la récupération des grades!' });
    }
};
const handleDelete = async (value) => {
  try {
      await axios.delete(`http://localhost:8000/api/Semestre/${value.id}/`);
      const filteredData = semestreList.filter((item) => item.id !== value.id);
      setSemestreList(filteredData);
      notification.success({ message: 'Semestre supprimé avec succès!' });
  } catch (error) {
      console.error('Erreur lors de la suppression de la semestre:', error);
      notification.error({ message: 'Erreur lors de la suppression de la semestre!' });
  }
};

const handleAdd = async (values) => {
  try {
      await axios.post('http://localhost:8000/api/Semestre/', {
          Type_semestre: values.Type_semestre,
          Grade: values.Grade,
      });
      form.resetFields();
      setIsModalOpen(false);
      getSemestreList();
      notification.success({ message: 'Semestre ajoutée avec succès!' });
  } catch (error) {
      console.error('Erreur lors de l\'ajout de la semestre:', error);
      notification.error({ message: 'Erreur lors de l\'ajout de la semestre!' });
  }
};

const handleEdit = async (values) => {
  try {
      await axios.put(`http://localhost:8000/api/Semestre/${currentSemestre.id}/`, {
          Type_semestre: values.Type_semestre,
          Grade: values.Grade,
      });
      form.resetFields();
      setIsModalOpen(false);
      getSemestreList();
      notification.success({ message: 'Semestre mise à jour avec succès!' });
  } catch (error) {
      console.error('Erreur lors de la mise à jour de la semestre:', error);
      notification.error({ message: 'Erreur lors de la mise à jour de la semestre!' });
  }
};

useEffect(() => {
    getSemestreList();
    getGradeList();
}, []);

const openEditModal = (semestre) => {
  setCurrentSemestre(semestre);
  form.setFieldsValue({
      Type_semestre: semestre.Type_semestre,
      Grade: semestre.Grade ? semestre.Grade.id : undefined,
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
    title: "Grade",
    dataIndex: "Grade_Info",
    align: "center",
    render: (gradeInfo) => gradeInfo ? gradeInfo.Nom_Grade : 'N/A',
},
{
    title: "Semestre",
    dataIndex: "Type_semestre",
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
                <Button type="primary" danger 
                icon={<DeleteOutlined />} 
                style={{ marginLeft: '8px' }}>
                    Supprimer
                </Button>
            </Popconfirm>
            
        </div>
    ),
},
];
const filteredSemestreList = semestreList.filter(semestre => {
  const gradeName = semestre.Grade_Info ? semestre.Grade_Info.Nom_Grade : '';
  return (
      (semestre.Type_semestre && semestre.Type_semestre.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (gradeName && gradeName.toLowerCase().includes(searchTerm.toLowerCase()))
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
              //title="Semetres Listes "
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
                      Ajouter un semestre
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
                        title={isEditMode ? "Modifier un semestre" : "Ajouter un semestre"}
                        open={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                        footer={null}
                    >
                        <Form form={form} onFinish={isEditMode ? handleEdit : handleAdd}>
                            
                            <Form.Item
                                label="Grade"
                                name="Grade"
                                rules={[{ required: true, message: 'Veuillez sélectionner un grade!' }]}
                            >
                                <Select placeholder="Sélectionnez un grade" style={{marginLeft: '5%', width:'95%'}}>
                                    {gradeList.map((grade) => (
                                        <Option key={grade.id} value={grade.id}>
                                            {grade.Nom_Grade}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Semestre"
                                name="Type_semestre"
                                rules={[{ required: true, message: 'Veuillez entrer le type de la semestre!' }]}
                            >
                                <Input placeholder="Entrez le type de la semestre" />
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
                  dataSource={filteredSemestreList}
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
export default SemestreTable;
