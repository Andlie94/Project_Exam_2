import React from "react";

interface BookingDateInputProps {
  dateFrom: string;
  dateTo: string;
  onChange: (field: "dateFrom" | "dateTo", value: string) => void;
}

interface AuthInputProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const baseInputStyle =
  "bg-[#ffffff] border border-gray-300 rounded-sm p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

const textStyle = "text-white text-sm mb-1";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function InputName({ value, onChange }: AuthInputProps) {
  return (
    <div>
      <h3 className={textStyle}>Name</h3>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={value}
        onChange={onChange}
        className={baseInputStyle}
      />
    </div>
  );
}

export function InputEmail({ value, onChange }: AuthInputProps) {
  return (
    <div>
      <h3 className={textStyle}>Email</h3>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={value}
        onChange={onChange}
        className={baseInputStyle}
      />
    </div>
  );
}

export function InputPassword({ value, onChange }: AuthInputProps) {
  return (
    <div>
      <h3 className={textStyle}>Password</h3>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={value}
        onChange={onChange}
        className={baseInputStyle}
      />
    </div>
  );
}

export function InputConfirmPassword({ value, onChange }: AuthInputProps) {
  return (
    <div>
      <h3 className={textStyle}>Confirm Password</h3>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        value={value}
        onChange={onChange}
        className={baseInputStyle}
      />
    </div>
  );
}
export function InputSearch({ value, onChange }: AuthInputProps) {
  return (
    <div>
      <input
        type="search"
        name="search"
        placeholder="Search for venues..."
        value={value}
        onChange={onChange}
        className={baseInputStyle}
      />
    </div>
  );
}

// Input for adminuser *//

export function InputTitle({ value, onChange }: InputProps) {
  return (
    <div>
      <h3 className="text-[#FFFFFF]">Title</h3>
      <input
        type="text"
        name="title"
        placeholder="Enter title"
        value={value}
        onChange={onChange}
        className={baseInputStyle}
      />
    </div>
  );
}

export function InputDescription({ value, onChange }: TextareaProps) {
  return (
    <div>
      <h3 className="text-[#FFFFFF]">Description</h3>
      <textarea
        name="description"
        placeholder="Enter description"
        value={value}
        className="bg-[#ffffff] border border-gray-300 rounded-sm p-2 w-full min-h-[100px] resize-y"
        onChange={onChange}
      />
    </div>
  );
}

export function InputPrice({ value, onChange }: InputProps) {
  return (
    <div>
      <h3 className="text-[#FFFFFF]">Price</h3>
      <input
        type="number"
        name="price"
        placeholder="Enter price"
        value={value}
        onChange={onChange}
        className={baseInputStyle}
      />
    </div>
  );
}

export function InputMaxGuests({ value, onChange }: InputProps) {
  return (
    <div>
      <h3 className="text-[#FFFFFF]">Max Guests</h3>
      <input
        type="number"
        name="maxGuests"
        placeholder="Enter max guests"
        value={value}
        onChange={onChange}
        className={baseInputStyle}
      />
    </div>
  );
}

export function InputCountry({ value, onChange }: InputProps) {
  return (
    <div>
      <h3 className="text-[#FFFFFF]">Country</h3>
      <input
        type="text"
        name="country"
        placeholder="Enter country"
        value={value}
        onChange={onChange}
        className={baseInputStyle}
      />
    </div>
  );
}

export function InputUrlImage({ value, onChange }: InputProps) {
  return (
    <div>
      <input
        type="url"
        name="urlImage"
        placeholder="Enter image URL"
        value={value}
        onChange={onChange}
        className={baseInputStyle}
      />
    </div>
  );
}

export function InputUrlImage2({ value, onChange }: InputProps) {
  return (
    <div>
      <input
        type="url"
        name="urlImage2"
        placeholder="Enter image URL"
        value={value}
        onChange={onChange}
        className={baseInputStyle}
      />
    </div>
  );
}

export function DateTo({ value, onChange }: InputProps) {
  return (
    <div>
      <input
        type="date"
        name="dateTo"
        value={value}
        onChange={onChange}
        className={baseInputStyle}
      />
    </div>
  );
}

export function DateFrom({ value, onChange }: InputProps) {
  return (
    <div>
      <input
        type="date"
        name="dateFrom"
        value={value}
        onChange={onChange}
        className={baseInputStyle}
      />
    </div>
  );
}

export function InputGuests({
  value,
  onChange,
  min = 1,
  max,
  ...props
}: {
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      className={baseInputStyle}
      {...props}
    />
  );
}

export function BookingDateInput({
  dateFrom,
  dateTo,
  onChange,
}: BookingDateInputProps) {
  return (
    <div className="flex gap-2 w-full justify-center items-center">
      <input
        type="date"
        name="dateFrom"
        value={dateFrom}
        onChange={(e) => onChange("dateFrom", e.target.value)}
        className={baseInputStyle}
      />
      <input
        type="date"
        name="dateTo"
        value={dateTo}
        onChange={(e) => onChange("dateTo", e.target.value)}
        className={baseInputStyle}
      />
    </div>
  );
}
