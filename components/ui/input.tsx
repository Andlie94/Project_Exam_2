
const baseInputStyle =
  "bg-[#ffffff] border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  const textStyle =
  "text-white text-sm mb-1";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputName({ value, onChange }: InputProps) {
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

export function InputEmail({ value, onChange }: InputProps) {
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

export function InputPassword({ value, onChange }: InputProps) {
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

export function InputConfirmPassword() {
  return (
    <div>
      <h3 className={textStyle}>Confirm Password</h3>
      <input type="password" name="confirmPassword" placeholder="Confirm your password" className={baseInputStyle} />
    </div>
  );
}

export function InputSearch() {
  return (
    <div>
      <h3>Search</h3>
      <input type="search" name="search" placeholder="Search..." className={baseInputStyle} />
    </div>
  );
}
export function InputPhone() {
  return (
    <div>
      <h3>Phone</h3>
      <input type="tel" name="phone" placeholder="Enter your phone number" className={baseInputStyle} />
    </div>
  );
}

export function InputPersonalID() {
  return (
    <div>
      <h3>Personal ID</h3>
      <input type="text" name="personalID" placeholder="Enter your personal ID" className={baseInputStyle} />
    </div>
  );
}

export function InputAddress() {
  return (
    <div>
      <h3>Address</h3>
      <input type="text" name="address" placeholder="Enter your address" className={baseInputStyle} />
    </div>
  );
}
export function InputCountryCheckout() {
  return (
    <div>
      <h3>Country</h3>
      <input type="text" name="country" placeholder="Enter your country" className={baseInputStyle} />
    </div>
  );
}
export function InputPostalCode() {
  return (
    <div>
      <h3>Postal Code</h3>
      <input type="text" name="postalCode" placeholder="Enter your postal code" className={baseInputStyle} />
    </div>
  );
}

// Input for adminuser *//

function inputtitle() {
  return (
    <div>
      <h3>Title</h3>
      <input type="text" name="title" placeholder="Enter title" className={baseInputStyle} />
    </div>
  );
}

export function inputdescription() {
  return (
    <div>
      <h3>Description</h3>
      <input type="text" name="description" placeholder="Enter description" className={baseInputStyle} />
    </div>
  );
}
export function inputprice() {
  return (
    <div>
      <h3>Price</h3>
      <input type="number" name="price" placeholder="Enter price" className={baseInputStyle} />
    </div>
  );
}
export function inputmaxGuests() {
  return (
    <div>
      <h3>Max Guests</h3>
      <input type="number" name="maxGuests" placeholder="Enter max guests" className={baseInputStyle} />
    </div>
  );
}

export function InputCountry() {
  return (
    <div>
      <h3>Country</h3>
      <input type="text" name="country" placeholder="Enter your country" className={baseInputStyle} />
    </div>
  );
}

export function InputUrlImage() {
  return (
    <div>
      <h3>Image URL</h3>
      <input type="url" name="urlImage" placeholder="Enter image URL" className={baseInputStyle} />
    </div>
  );
}

export function InputUrlImage2() {
  return (
    <div>
      <h3>Image URL 2</h3>
      <input type="url" name="urlImage2" placeholder="Enter image URL" className={baseInputStyle} />
    </div>
  );
}