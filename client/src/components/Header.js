import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Astronomy Cosmos</h1>
      <div>
        <button className="mr-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Login</button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
