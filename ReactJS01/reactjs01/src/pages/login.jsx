import React, { useContext } from "react";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { loginApi } from "../util/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const onFinish = async (values) => {
    const { email, password } = values;
    const res = await loginApi(email, password);

    if (res && res.EC === 0) {
      localStorage.setItem("access_token", res.access_token);
      notification.success({
        message: "Thành công",
        description: "Đăng nhập thành công!",
      });
      setAuth({
        isAuthenticated: true,
        user: { email: res?.user?.email ?? "", name: res?.user?.name ?? "" },
      });
      navigate("/");
    } else {
      notification.error({
        message: "Lỗi",
        description: res?.EM ?? "Email hoặc mật khẩu sai",
      });
    }
  };

  return (
    <Row justify={"center"}>
      <Col xs={24} md={16} lg={8}>
        <div className="form-container">
          <div className="form-title">Đăng Nhập</div>
          <Form name="login" onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
                <Link to={"/forgot-password"}>Quên mật khẩu?</Link>
              </div>
            </Form.Item>
          </Form>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
