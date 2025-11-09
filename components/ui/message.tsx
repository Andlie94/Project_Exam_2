export function Error({ text }: { text: string }) {
  return (
    <div className="bg-[#FFCECE] border border-[#DE0236] text-[#414141] px-4 py-3 rounded relative mb-4" role="alert">
      <span className="block sm:inline">{text}
      </span>
    </div>
  );
}