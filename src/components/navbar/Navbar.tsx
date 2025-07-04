import logo from '../../assets/logo.svg';
import { FaCar } from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="w-full bg-gray-300 shadow-md h-16 px-6 flex items-center">
      <div className="container mx-auto flex items-center justify-between h-full">

        {/* LOGO */}
        <Link to="/">
          <img src={logo} alt="RideBro Logo" className="h-[125px] w-auto" />
        </Link>

        <div className="flex items-center gap-8 text-[#001133] text-lg font-medium">
          
          <Link
            to="/veiculo"
            className="relative group flex items-center gap-2 px-2 py-1 transition-transform duration-300 ease-out hover:-translate-y-0.5"
          >
            <FaCar className="text-gray-600 group-hover:text-cyan-500 transition-colors duration-300" />
            <span className="group-hover:text-cyan-500 transition-colors duration-300">Veículo</span>
            
            {/* A linha animada */}
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Link Viagem */}
          <Link
            to="/viagem"
            className="relative group flex items-center gap-2 px-2 py-1 transition-transform duration-300 ease-out hover:-translate-y-0.5"
          >
            <MdTrendingUp className="text-gray-600 group-hover:text-cyan-500 transition-colors duration-300" />
            <span className="group-hover:text-cyan-500 transition-colors duration-300">Viagem</span>

            {/* A linha animada */}
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;