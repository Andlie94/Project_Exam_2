export function Error({ text }: { text: string }) {
  return (
    <div className="bg-[#FFCECE] border border-[#DE0236] text-[#414141] px-4 py-3 rounded relative mb-4" role="alert">
      <span className="block sm:inline">{text}
      </span>
    </div>
  );
}

export function SuccessMessage({ text }: { text: string }) {
  return (
    <div className="bg-[#D4EDDA] border border-[#28A745] text-[#155724] px-4 py-3 rounded relative mb-4" role="alert">
      <span className="block sm:inline">{text}
      </span>
    </div>
  );
}