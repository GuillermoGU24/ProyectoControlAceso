import React, { useState, type ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  hasError: boolean;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
}

export default function PasswordInput({
  name,
  value,
  onChange,
  hasError,
  placeholder,
  onKeyDown,
  inputRef,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <label
      className={`input input-bordered flex items-center gap-2 w-full ${
        hasError ? "input-error" : ""
      }`}
    >
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={inputRef}
        className="grow bg-transparent focus:outline-none"
        placeholder={placeholder}
      />
      <button
        type="button"
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={togglePasswordVisibility}
        tabIndex={-1}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </label>
  );
}
