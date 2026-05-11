import React from "react";
import { Button, Col, Form, Input, notification, Row } from "antd";
import { createUserApi } from "../util/api";

const RegisterPage = () => {
  const onFinish = async (values) => {
    const { name, email, password } = values;
    // Gọi API xuống backend MySQL
    const res = await createUserApi(name, email, password);

    if (res) {
      notification.success({
        message: "Đăng ký thành công",
        description: "Dữ liệu đã được lưu vào MySQL!",
      });
    } else {
      notification.error({
        message: "Đăng ký thất bại",
        description: "Email đã tồn tại hoặc có lỗi hệ thống.",
      });
    }
  };

  return (
    <Row justify={"center"} style={{ marginTop: "50px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <legend style={{ fontSize: "18px", fontWeight: "bold" }}>
            Đăng Ký Tài Khoản
          </legend>
          <Form name="register" onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Họ và Tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input placeholder="Ví dụ: Võ An Thái" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input placeholder="thai@hcmute.edu.vn" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </fieldset>
      </Col>
    </Row>
  );
};

export default RegisterPage;
