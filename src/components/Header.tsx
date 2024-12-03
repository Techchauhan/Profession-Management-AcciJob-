'use client';
import { Row, Col, Button, Modal, Input, Form } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Image from "next/image";

// TypeScript interface for form state
interface FormData {
    username: string;
    age: number | string;
    profession: string;
}

// Props interface
interface HeaderProps {
    handleSubmit: (form: FormData) => void; // Function to handle form submission
}

const Header: React.FC<HeaderProps> = ({ handleSubmit }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [form] = Form.useForm<FormData>();

    // To handle modal open
    const setModal = () => {
        setOpen(true);
    };

    // To handle modal close
    const handleCancel = () => {
        setOpen(false);
    };

    // To handle save button click
    const onSave = async () => {
        try {
            const values = await form.validateFields();
            handleSubmit(values); // Pass the form values to the parent logic
            form.resetFields(); // Reset the form
            setOpen(false); // Close the modal
        } catch (error) {
            console.error('Validation Failed:', error);
        }
    };

    return (
        <div className="px-5 pt-3">
            <Row
                gutter={[16, 16]} // Add spacing between columns
                align="middle" // Vertically align content
                justify="space-between" // Adjust spacing for responsiveness
            >
                <Col xs={24} sm={16} md={20} lg={20}>
                    <div className="flex items-center space-x-3">
                        <Image
                            alt="acciojob-log"
                            src={'/acciojob.png'}
                            height={50}
                            width={50}
                        />
                        <h1 className="text-xl md:text-2xl font-bold text-black">
                            Profession Management System
                        </h1>
                    </div>
                </Col>
                <Col xs={24} sm={8} md={4} lg={4} className="text-right">
                    <Button
                        type="primary"
                        icon={<UserAddOutlined />}
                        onClick={setModal}
                        className="w-full sm:w-auto" // Make button full width on small screens
                    >
                        Add User
                    </Button>
                </Col>
            </Row>

            <Modal
                title="Add the User"
                open={open}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={onSave}>
                        Save
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    layout="vertical" // Vertical layout for better spacing
                    initialValues={{
                        username: '',
                        age: '',
                        profession: ''
                    }}
                >
                    {/* User Name Input */}
                    <Form.Item
                        label="User Name"
                        name="username"
                        rules={[{ required: true, message: 'Please enter the user name!' }]}
                    >
                        <Input placeholder="Enter the User Name" />
                    </Form.Item>

                    {/* Age Input */}
                    <Form.Item
                        label="Age"
                        name="age"
                        rules={[{ required: true, message: 'Please enter the age!' }]}
                    >
                        <Input type="number" placeholder="Enter the Age" />
                    </Form.Item>

                    {/* Profession Input */}
                    <Form.Item
                        label="Profession"
                        name="profession"
                        rules={[{ required: true, message: 'Please enter the profession!' }]}
                    >
                        <Input placeholder="Enter the Profession" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Header;
