import { Button } from './ui/button';

interface HeaderProps {
  setIsSignInOpen: (value: boolean) => void;
  openWriteDialog: () => void;
  openGetStartedDialog: () => void;
}

export default function Header({
  setIsSignInOpen,
  openWriteDialog,
  openGetStartedDialog,
}: HeaderProps) {
  return (
    <div className='shadow-md rounded-3xl bg-white'>
      <header className='w-full flex items-center justify-between sm:py-4 sm:p-10 py-3 p-5'>
        <div>
          <img
            src='/logo.svg'
            alt='logo'
            className='w-16 cursor-pointer max-w-xs'
          />
        </div>

        <nav className='flex items-center'>
          <ul className='flex gap-12 text-md items-center'>
            <li className='hidden md:block hover:text-primary'>
              <button
                onClick={() => {
                  openWriteDialog();
                }}
                className='cursor-pointer '
              >
                Write
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsSignInOpen(true)}
                className='hidden sm:block cursor-pointer '
              >
                Login
              </button>
            </li>
            <li className='cursor-pointer hover:text-primary'>
              <Button
                className='rounded-full cursor-pointer'
                onClick={() => {
                  openGetStartedDialog();
                }}
              >
                Get Started
              </Button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
