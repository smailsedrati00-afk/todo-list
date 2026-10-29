function Navbar() {
  return (
    <header className="navbar">
      <a href="#home" className="logo">
        TaskFlow
      </a>
      <nav>
        <a href="#home">Home</a>
        <a href="Tasks">My Tasks</a>
        <a href="#features">Features</a>
      </nav>
    </header>
  );
}

export default Navbar;
