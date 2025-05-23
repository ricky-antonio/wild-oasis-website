import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';

const Header = () => {
  return (
    <header className='border-b border-primary-900 px-8 py-5 bg-primary-950 bg-opacity-50  z-10'>
      <div className='flex justify-between items-center max-w-7xl mx-auto '>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
