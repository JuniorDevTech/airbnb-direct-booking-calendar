export default function LoginInput({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          h-14
          rounded-2xl
          border
          border-slate-200
          bg-slate-50
          px-4
          outline-none
          transition-all
          focus:ring-4
          focus:ring-blue-100
          focus:border-blue-500
        "
        required
      />
    </div>
  );
}
