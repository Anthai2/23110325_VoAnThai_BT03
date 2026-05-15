import React, { useContext } from "react";
import { Button, Form, Input, notification } from "antd";
import { loginApi } from "../util/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

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
    <div className="min-h-[calc(100svh-64px)] flex items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl shadow-lg border border-slate-200 bg-white">
        <div className="hidden md:flex flex-col justify-between p-8 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-100">
              Member Area
            </p>
            <h2 className="text-3xl font-bold mt-3 leading-tight">
              Chào mừng bạn quay lại cửa hàng
            </h2>
            <p className="mt-4 text-emerald-50/90 text-sm leading-6">
              Đăng nhập để xem sản phẩm mới nhất, khuyến mãi nổi bật và quản lý
              giỏ hàng của bạn.
            </p>
          </div>
          <div className="text-xs text-emerald-100">
            FullStackNodeJS01 • React + Express
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Đăng nhập</h1>
            <p className="mt-1 text-sm text-slate-500">
              Nhập thông tin tài khoản để tiếp tục.
            </p>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              label={<span className="text-slate-700">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input size="large" placeholder="you@example.com" />
            </Form.Item>

            <Form.Item
              label={<span className="text-slate-700">Mật khẩu</span>}
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password size="large" placeholder="Nhập mật khẩu" />
            </Form.Item>

            <div className="mb-4 text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-emerald-700 hover:text-emerald-800"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="!h-11 !bg-emerald-600 hover:!bg-emerald-700 !border-emerald-600 hover:!border-emerald-700"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-5 border-t border-slate-200 pt-4 text-sm text-slate-600 text-center">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-medium text-emerald-700 hover:text-emerald-800"
            >
              Đăng ký tại đây
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
