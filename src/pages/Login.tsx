import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';

import { useGetAdminByEmailQuery } from '../graphql/generated';
import { useApplication } from '../hooks/useApplication';

export function Login() {
  const { user, signIn } = useApplication();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, signIn]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data } = useGetAdminByEmailQuery({
    variables: {
      email
    }
  });

  return (
    <div className="flex h-screen bg-gradient-to-r from-red-500 to-red-900">
      <section className="grid md:grid-cols-2 m-auto bg-slate-50 rounded-md w-3/5 h-3/5">
        <div className="imgStyle">
          <div className="cartoonImg" />
          <div className="cloud_one" />
          <div className="cloud_two" />
        </div>

        <div className="flex flex-col justify-evenly right">
          <div className="flex flex-col gap-4 text-center py-10 px-3">
            <Input
              className="input-text"
              type="email"
              placeholder="Seu email"
              onChange={event => setEmail(event.target.value)}
              value={email}
            />

            <Input
                className="input-text"
                type="password"
                placeholder="Sua senha"
                isPassword={true}
                onChange={event => setPassword(event.target.value)}
                value={password}
            />

            <button
                type="submit"
                disabled={!email || !password}
                onClick={() => signIn(data, password)}
                className="text-white font-bold py-3 w-full bg-red-400 rounded-md cursor-pointer hover:-translate-y-1 duration-150 transition disabled:cursor-not-allowed"
            >
                Fazer login
            </button>            
          </div>
        </div>
      </section>
    </div>
  )
}
