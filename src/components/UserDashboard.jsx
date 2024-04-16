import React, { useState } from "react";
import ejemplo from "../data/ejemplo.json";
import FinalJson from "./FInalJson";
import { Table, Button, Popconfirm, message, Modal, Form, Input } from "antd";
import { v4 as uuidv4 } from "uuid";

const UserDashboard = ({ showJson, setShowJson }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState({});
  const [combinedData, setCombinedData] = useState([]);
  const [newRecords, setNewRecords] = useState([]);

  const handleEdit = (record) => {
    setRecordToEdit(record);
    setEditModalVisible(true);
  };

  const handleEditModalClose = () => {
    setRecordToEdit({});
    setEditModalVisible(false);
  };

  const handleDelete = (key) => {
    const newData = combinedData.filter((item) => item.key !== key);
    setCombinedData(newData);
    message.success(`Se borró el registro ${key}`);
  };

  const handleEditSubmit = (values) => {
    const updatedData = combinedData.map((item) => {
      if (item.key === recordToEdit.key) {
        return { ...item, ...values };
      }
      return item;
    });
    setCombinedData(updatedData);
    message.success(`Se editó el registro ${recordToEdit.key}`);
    setEditModalVisible(false);
  };

  const handleAddSubmit = (values) => {
    const newRecord = {
      ...values,
      key: uuidv4(),
    };
    setNewRecords([...newRecords, newRecord]);
    message.success(`Se agregó un nuevo registro`);
    setAddModalVisible(false);
  };

  const data1 = ejemplo.policyInsured["Cobertura afectada"].map(
    (cobertura, index) => ({
      key: `P${index + 1}`,
      "#": ejemplo.policyInsured["#"][index],
      "Cobertura afectada": cobertura,
      "Fecha Ocurrencia": ejemplo.policyInsured["FechaOcurrencia"][index],
      Motor: ejemplo.policyInsured["Motor"][index],
      "DominioChasisMotorCobertura afectada":
        ejemplo.policyInsured["DominioChasisMotorCobertura afectada"][index],
      Chasis: ejemplo.policyInsured["Chasis"][index],
      Concepto: ejemplo.policyInsured["Concepto"][index],
      Entidad: ejemplo.policyInsured["Entidad"][index],
    })
  );

  const data2 = [];
  ejemplo.exposurevehicles.forEach((vehicle, index) => {
    vehicle["#"].forEach((value, idx) => {
      data2.push({
        key: `E${index + 1}`,
        "#": value,
        "Cobertura afectada": vehicle["Cobertura afectada"][idx],
        "Fecha Ocurrencia": vehicle["FechaOcurrencia"][idx],
        Motor: vehicle["Motor"][idx],
        Chasis: vehicle["Chasis"][idx],
        Concepto: vehicle["Concepto"][idx],
        Entidad: vehicle["Entidad"][idx],
      });
    });
  });

  const combineData = [...data1, ...data2];

  const finalData = [...combineData, ...newRecords];

  const columns = [
    { title: "#", dataIndex: "#", key: "#" },
    {
      title: "Cobertura afectada",
      dataIndex: "Cobertura afectada",
      key: "Cobertura afectada",
    },
    {
      title: "Fecha Ocurrencia",
      dataIndex: "Fecha Ocurrencia",
      key: "Fecha Ocurrencia",
    },
    { title: "Motor", dataIndex: "Motor", key: "Motor" },
    {
      title: "DominioChasisMotorCobertura afectada",
      dataIndex: "DominioChasisMotorCobertura afectada",
      key: "DominioChasisMotorCobertura afectada",
    },
    { title: "Chasis", dataIndex: "Chasis", key: "Chasis" },
    { title: "Concepto", dataIndex: "Concepto", key: "Concepto" },
    { title: "Entidad", dataIndex: "Entidad", key: "Entidad" },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <span>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Editar
          </Button>
          <Popconfirm
            title="Estás seguro que quieres borrar este registro?"
            onConfirm={() => handleDelete(record.key)}
            okText="Si"
            cancelText="No"
          >
            <Button type="danger">Eliminar</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={finalData} />

      <Modal
        title="Editar Registro"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={recordToEdit}
          onFinish={handleEditSubmit}
        >
          <Form.Item label="Cobertura afectada" name="Cobertura afectada">
            <Input />
          </Form.Item>
          <Form.Item label="Fecha Ocurrencia" name="Fecha Ocurrencia">
            <Input />
          </Form.Item>
          <Form.Item label="Motor" name="Motor">
            <Input />
          </Form.Item>
          <Form.Item
            label="DominioChasisMotorCobertura afectada"
            name="DominioChasisMotorCobertura afectada"
          >
            <Input />
          </Form.Item>
          <Form.Item label="Chasis" name="Chasis">
            <Input />
          </Form.Item>
          <Form.Item label="Concepto" name="Concepto">
            <Input />
          </Form.Item>
          <Form.Item label="Entidad" name="Entidad">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Guardar Cambios
          </Button>
        </Form>
      </Modal>

      <Modal
        title="Agregar Registro"
        visible={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddSubmit}>
          <Form.Item label="Cobertura afectada" name="Cobertura afectada">
            <Input />
          </Form.Item>
          <Form.Item label="Fecha Ocurrencia" name="Fecha Ocurrencia">
            <Input />
          </Form.Item>
          <Form.Item label="Motor" name="Motor">
            <Input />
          </Form.Item>
          <Form.Item
            label="DominioChasisMotorCobertura afectada"
            name="DominioChasisMotorCobertura afectada"
          >
            <Input />
          </Form.Item>
          <Form.Item label="Chasis" name="Chasis">
            <Input />
          </Form.Item>
          <Form.Item label="Concepto" name="Concepto">
            <Input />
          </Form.Item>
          <Form.Item label="Entidad" name="Entidad">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Agregar
          </Button>
        </Form>
      </Modal>

      <Button type="primary" onClick={() => setAddModalVisible(true)}>
        Agregar Registro
      </Button>
      <br />
      <br />

      <FinalJson
        showJson={showJson}
        setShowJson={setShowJson}
        combineData={combineData}
      />
    </div>
  );
};

export default UserDashboard;
