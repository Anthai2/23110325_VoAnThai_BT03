import React from "react";
import { Button, Col, Form, Input, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../util/api";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const res = await forgotPasswordApi(values.email);
    if (res && res.EC === 0) {
      notification.success({
        message: "Thành công",
        description: "Vui lòng kiểm tra email để lấy mã OTP",
      });
      // Chuyển sang trang nhập OTP, truyền kèm email đi theo
      navigate("/reset-password", { state: { email: values.email } });
    } else {
      notification.error({
        message: "Lỗi",
        description: res?.EM ?? "Lỗi hệ thống",
      });
    }
  };

  return (
    <Row justify={"center"}>
      <Col xs={24} md={16} lg={8}>
        <div className="form-container">
          <div className="form-title">Quên Mật Khẩu</div>
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Email của bạn"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input placeholder="Nhập email để nhận mã OTP" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Gửi mã OTP
              </Button>
            </Form.Item>
          </Form>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Link to={"/login"}>
              <ArrowLeftOutlined /> Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ForgotPasswordPage;
