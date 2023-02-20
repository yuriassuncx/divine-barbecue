import { InputHTMLAttributes } from 'react';

import { At, Fingerprint } from 'phosphor-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isPassword?: boolean;
}

export function Input({ isPassword, ...props }: InputProps) {
  return (
    <div className="input-group">
      <input
        {...props}
        className="input-text"
      />

      <span className="icon flex items-center px-4">
        {!isPassword 
          ? <At size={25} weight="bold" /> 
          : <Fingerprint size={25} weight="bold" />
        }
      </span>
    </div>
  )
}
