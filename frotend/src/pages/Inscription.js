import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importer axios pour les requêtes HTTP
import { Form, Select, Input, DatePicker, Button } from 'antd';
import jsPDF from 'jspdf';
import QRCode from 'qrcode'; // Assurez-vous d'importer la bonne bibliothèque
import 'antd/dist/antd.css'; // Assurez-vous d'importer le style d'Ant Design

const { Option } = Select;

const StudentRegistrationForm = () => {
  const [formData, setFormData] = useState(null); // État pour stocker les données du formulaire
  const [parcoursList, setParcoursList] = useState([]); // État pour stocker la liste des parcours
  const [niveauList, setNiveauList] = useState([]); // État pour stocker la liste des niveaux

  const getParcoursList = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/Parcours');
        setParcoursList(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des parcours:', error);
        //notification.error({ message: 'Erreur lors de la récupération des parcours!' });
    } 
};
const getNiveauList = async () => {
  try {
      const response = await axios.get('http://localhost:8000/api/Niveau');
      setNiveauList(response.data);
  } catch (error) {
      console.error('Erreur lors de la récupération des niveaux:', error);
      //notification.error({ message: 'Erreur lors de la récupération des niveaux!' });
  } 
};
useEffect(() => {
  getNiveauList();
  getParcoursList();
}, []);

  const onFinish = (values) => {
    setFormData(values); // Mettre à jour l'état avec les données du formulaire
    generatePdfWithQrCode(values); // Appeler la fonction pour générer le PDF
  };

  const generatePdfWithQrCode = (data) => {
    const doc = new jsPDF();

    // Ajouter les informations dans le PDF
    doc.text(`Nom: ${data.nom}`, 10, 10);
    doc.text(`Prénom: ${data.prenom}`, 10, 20);
    doc.text(`Date de naissance: ${data.datenaiss}`, 10, 30);
    doc.text(`Lieu de naissance: ${data.lieunaiss}`, 10, 40);
    doc.text(`Nationalité: ${data.nationalite}`, 10, 50);
    doc.text(`CIN: ${data.cin}`, 10, 60);
    doc.text(`Date de CIN: ${data.date_cin}`, 10, 70);
    doc.text(`Nom du père: ${data.nom_pere}`, 10, 80);
    doc.text(`Nom de la mère: ${data.nom_mere}`, 10, 90);
    doc.text(`Téléphone: ${data.telephone}`, 10, 100);
    doc.text(`Adresse des parents: ${data.adresse_parents}`, 10, 110);
    doc.text(`Numéro d'inscription BAC: ${data.bacc_num_inscription}`, 10, 120);
    doc.text(`Année de BAC: ${data.bacc_annee}`, 10, 130);
    doc.text(`Série de BAC: ${data.bacc_serie}`, 10, 140);
    doc.text(`Centre de BAC: ${data.bacc_centre}`, 10, 150);
    doc.text(`Secteur de BAC: ${data.bacc_secteur}`, 10, 160);
    doc.text(`Session: ${data.session}`, 10, 170);
    doc.text(`Date d'inscription: ${data.date_inscription}`, 10, 180);
    doc.text(`Parcours: ${data.parcours}`, 10, 190); // ou ${data.parcours.nom} si c'est un objet
    doc.text(`Niveau: ${data.niveau}`, 10, 200); 

    const qrValue = JSON.stringify(data); // Convertir les données du formulaire en JSON pour le QR code
    QRCode.toCanvas(document.createElement('canvas'), qrValue, { errorCorrectionLevel: 'H' })
      .then((canvas) => {
        const qrImage = canvas.toDataURL('image/png');
        // Ajouter le QR code dans le PDF
        doc.addImage(qrImage, 'PNG', 10, 200, 50, 50);
        // Télécharger le PDF
        doc.save('student_registration.pdf');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Parcours" name="parcours" rules={[{ required: true, message: 'Veuillez sélectionner votre parcours !' }]}>
        <Select placeholder="Sélectionnez un parcours">
          {parcoursList.map((parcours) => (
            <Option key={parcours.Nom_Parcours} value={parcours.Nom_Parcours}>
              {parcours.Nom_Parcours} {/* Assurez-vous d'adapter cela selon votre modèle Parcours */}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Niveau" name="niveau" rules={[{ required: true, message: 'Veuillez sélectionner votre niveau !' }]}>
        <Select placeholder="Sélectionnez un niveau">
          {niveauList.map((niveau) => (
            <Option key={niveau.Type_Niveau} value={niveau.Type_Niveau}>
              {niveau.Type_Niveau} {/* Assurez-vous d'adapter cela selon votre modèle Niveau */}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Nom" name="nom" rules={[{ required: true, message: 'Veuillez entrer votre nom !' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Prénom" name="prenom" rules={[{ required: true, message: 'Veuillez entrer votre prénom !' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Date de naissance" name="datenaiss" rules={[{ required: true, message: 'Veuillez sélectionner votre date de naissance !' }]}>
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item label="Lieu de naissance" name="lieunaiss">
        <Input />
      </Form.Item>

      <Form.Item label="Nationalité" name="nationalite">
        <Input maxLength={10} />
      </Form.Item>

      <Form.Item label="CIN" name="cin">
        <Input type="number" />
      </Form.Item>

      <Form.Item label="Date de CIN" name="date_cin">
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item label="Lieu de CIN" name="lieu_cin">
        <Input />
      </Form.Item>

      <Form.Item label="Nom du père" name="nom_pere">
        <Input />
      </Form.Item>

      <Form.Item label="Profession du père" name="profession_pere">
        <Input />
      </Form.Item>

      <Form.Item label="Nom de la mère" name="nom_mere">
        <Input />
      </Form.Item>

      <Form.Item label="Profession de la mère" name="profession_mere">
        <Input />
      </Form.Item>

      <Form.Item label="Nom du tuteur" name="nom_tuteur">
        <Input />
      </Form.Item>

      <Form.Item label="Profession du tuteur" name="profession_tuteur">
        <Input />
      </Form.Item>

      <Form.Item label="Téléphone" name="telephone">
        <Input type="number" />
      </Form.Item>

      <Form.Item label="Adresse des parents" name="adresse_parents">
        <Input />
      </Form.Item>

      <Form.Item label="Numéro d'inscription BAC" name="bacc_num_inscription" rules={[{ required: true, message: 'Veuillez entrer votre numéro d\'inscription BAC !' }]}>
        <Input type="number" />
      </Form.Item>

      <Form.Item label="Année de BAC" name="bacc_annee" rules={[{ required: true, message: 'Veuillez sélectionner votre année de BAC !' }]}>
        <DatePicker format="YYYY" picker="year" />
      </Form.Item>

      <Form.Item label="Série de BAC" name="bacc_serie">
        <Input maxLength={4} />
      </Form.Item>

      <Form.Item label="Centre de BAC" name="bacc_centre">
        <Input />
      </Form.Item>

      <Form.Item label="Secteur de BAC" name="bacc_secteur">
        <Input />
      </Form.Item>

      <Form.Item label="Session" name="session">
        <Input />
      </Form.Item>

      <Form.Item label="Date d'inscription" name="date_inscription" rules={[{ required: true, message: 'Veuillez sélectionner la date d\'inscription !' }]}>
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          S'inscrire
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StudentRegistrationForm;
