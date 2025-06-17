import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent} from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosClient";
import CryptoJS from "crypto-js";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // 🔒 Băm SHA256 hai lần
      console.log(data.password)
      const hashedPassword = CryptoJS.SHA256(
        CryptoJS.SHA256(data.password).toString()
      ).toString();
      console.log(hashedPassword)
      const response = await axios.post("/users/login", {
        ...data,
        password: hashedPassword,
      }, {
        withCredentials: true,
      });

      const { EM } = response.data;

      console.log("Login response:", response.data);

      if (EM === "Get JWT success") {
        navigate("/profile");
      } else if (EM === "User does not exist") {
        alert("Người dùng không tồn tại. Vui lòng kiểm tra lại email.");
      } else if (EM === "Wrong password") {
        alert("Mật khẩu không đúng. Vui lòng thử lại.");
      } else {
        alert(EM || "Đăng nhập thất bại. Vui lòng kiểm tra thông tin!");
      }
    } catch (error: any) {
      console.error("Login failed:", error?.response?.data || error.message);
      alert("Đăng nhập thất bại. Vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm p-6 shadow-lg bg-white">
        {/* 🖼️ Logo */}
        <div className="flex justify-center">
          <img src="https://image-cdn.solana.fm/images/?imageUrl=https://pbs.twimg.com/profile_images/1830748895015501824/99XU7XKo_400x400.jpg" alt="Logo" className="w-32 h-32" />
        </div>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="mb-2 block">Email</Label>
              <Input {...register("email")} placeholder="you@example.com" type="email" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <Label className="mb-2 block">Mật khẩu</Label>
              <Input {...register("password")} placeholder="••••••••" type="password" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
