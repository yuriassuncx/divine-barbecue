import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="max-w-2xl mx-2 lg:mx-auto mt-12 text-white">
      <div className="p-8 bg-stone-700 border border-gray-500 rounded">
        <strong className="text-2xl mb-6 block">Faça login como administrador!</strong>

        <div className="flex flex-col gap-2 w-full">
          <input
            className="bg-gray-900 rounded px-5 h-14"
            type="email"
            placeholder="Digite seu email"
            onChange={event => setEmail(event.target.value)}
            value={email}
          />

          <input
              className="bg-gray-900 rounded px-5 h-14"
              type="password"
              placeholder="Digite sua senha"
              onChange={event => setPassword(event.target.value)}
              value={password}
          />

          <button
              type="submit"
              disabled={!email || !password}
              onClick={() => signIn(data, password)}
              className="mt-4 bg-amber-500 uppercase py-4 rounded font-bold text-sm hover:bg-amber-400 transition-colors disabled:opacity-50"
          >
              Fazer login
          </button>
        </div>
      </div>
    </div>
  )
}
