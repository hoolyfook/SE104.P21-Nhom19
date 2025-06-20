import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "../api/axiosClient";

type FormValues = {
  password: string;
  newpassword: string;
};

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [email, setEmail] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/users/info");
        const userEmail = response.data.DT?.user?.email;
        if (userEmail) {
          setEmail(userEmail);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setMessage("Không thể lấy thông tin người dùng.");
      }
    };

    fetchUserInfo();
  }, []);

  const onSubmit = async (data: FormValues) => {
    if (!email) {
      setMessage("Không có email người dùng.");
      return;
    }

    try {
      const response = await axios.put("/users/password", {
        email,
        ...data,
      });

      const { EM } = response.data;
      if (EM === "Password updated successfully") {
        setMessage("✅ Mật khẩu đã được đổi thành công.");
        reset();
      } else {
        setMessage(`❌ ${EM}`);
      }
    } catch (error) {
      setMessage("❌ Đã xảy ra lỗi khi đổi mật khẩu.");
      console.error("Error updating password:", error);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Đổi mật khẩu</h2>
        {message && (
          <div className="mb-4 text-sm p-2 rounded bg-gray-100 text-red-700">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Mật khẩu hiện tại</Label>
            <Input
              type="password"
              {...register("password", { required: "Vui lòng nhập mật khẩu hiện tại" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <div>
            <Label>Mật khẩu mới</Label>
            <Input
              type="password"
              {...register("newpassword", { required: "Vui lòng nhập mật khẩu mới" })}
            />
            {errors.newpassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newpassword.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={!email}>
            Cập nhật mật khẩu
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
