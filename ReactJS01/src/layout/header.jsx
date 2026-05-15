import React, { useContext, useState } from "react";
import {
  UsergroupAddOutlined,
  HomeOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [current, setCurrent] = useState("home");
  const cartCount = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const items = [
    {
      label: <Link to={"/"}>Trang chủ</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/products">Sản phẩm</Link>,
      key: "products",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to="/cart">Giỏ hàng ({cartCount})</Link>,
      key: "cart",
      icon: <ShoppingCartOutlined />,
    },
    ...(auth.isAuthenticated
      ? [
          {
            label: <Link to={"/user"}>Tài khoản</Link>,
            key: "user",
            icon: <UsergroupAddOutlined />,
          },
        ]
      : []),
    {
      label: `Menu ${auth?.user?.name ?? "Guest"}`,
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        ...(auth.isAuthenticated
          ? [
              {
                label: (
                  <span
                    onClick={() => {
                      localStorage.removeItem("access_token");
                      setAuth({
                        isAuthenticated: false,
                        user: { email: "", name: "" },
                      });
                      navigate("/");
                    }}
                  >
                    Đăng xuất
                  </span>
                ),
                key: "logout",
              },
            ]
          : [
              {
                label: <Link to={"/login"}>Đăng nhập</Link>,
                key: "login",
              },
              {
                label: <Link to={"/register"}>Đăng ký</Link>,
                key: "register",
              },
            ]),
      ],
    },
  ];

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
