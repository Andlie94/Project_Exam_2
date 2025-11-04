export function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
       <h3>&copy; {new Date().getFullYear()} Holidaze</h3>
      </div>
    </footer>
  );
}