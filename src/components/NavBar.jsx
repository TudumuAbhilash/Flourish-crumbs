function NavBar({ onNavigate }) {
    return (
      <nav>
        <ul>
          <li>
            <button onClick={() => onNavigate('home')}>Home</button>
          </li>
          <li>
            <button onClick={() => onNavigate('products')}>Products</button>
          </li>
          <li>
            <button onClick={() => onNavigate('orders')}>Orders</button>
          </li>
        </ul>
      </nav>
    );
  }
  
  export default NavBar;
  