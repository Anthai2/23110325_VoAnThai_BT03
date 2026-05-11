import React from "react";
import { Button, Col, Form, Input, notification, Row } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPasswordApi } from "../util/api";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // Lấy email từ trang trước truyền sang

  const onFinish = async (values) => {
    const res = await resetPasswordApi(email, values.otp, values.newPassword);
    if (res && res.EC === 0) {
      notification.success({
        message: "Thành công",
        description: "Đổi mật khẩu thành công! Vui lòng đăng nhập lại.",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Lỗi",
        description: res?.EM ?? "Mã OTP sai hoặc đã hết hạn",
      });
    }
  };

  return (
    <Row justify={"center"}>
      <Col xs={24} md={16} lg={8}>
        <div className="form-container">
          <div className="form-title">Đặt Lại Mật Khẩu</div>
          <p style={{ textAlign: "center", marginBottom: "20px" }}>
            Email: <strong>{email}</strong>
          </p>
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Mã OTP"
              name="otp"
              rules={[{ required: true, message: "Vui lòng nhập mã OTP!" }]}
            >
              <Input placeholder="Nhập 6 số từ email" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu mới" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default ResetPasswordPage;
