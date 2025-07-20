import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function Register() {
  const { register: signup } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await signup(data);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2>Sign Up</h2>
      <input {...register("username")} placeholder="Username" />
      <p>{errors.username?.message}</p>

      <input {...register("email")} placeholder="Email" />
      <p>{errors.email?.message}</p>

      <input type="password" {...register("password")} placeholder="Password" />
      <p>{errors.password?.message}</p>

      <button type="submit">Register</button>
    </form>
  );
}
