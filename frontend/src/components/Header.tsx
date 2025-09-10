import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { useAuth } from '../context/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

interface HeaderProps {
  setIsSignInOpen?: (value: boolean) => void;
  openWriteDialog?: () => void;
  openGetStartedDialog?: () => void;
}

export default function Header({
  setIsSignInOpen,
  openGetStartedDialog,
}: // openWriteDialog,

HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  // const handleWriteClick = () => {
  //   if (user) {
  //     // openWriteDialog?.();
  //   } else {
  //     // openWriteDialog?.();
  //   }
  // };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className='shadow-md rounded-3xl bg-white sticky  top-0 z-50'>
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
            {/* <li className='hidden md:block hover:text-primary'>
              <button onClick={handleWriteClick} className='cursor-pointer'>
                Write
              </button>
            </li> */}

            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className='size-10 cursor-pointer'>
                      <AvatarImage
                        src={user?.profilePicture}
                        alt={user.username}
                      />
                      <AvatarFallback className='text-xs font-semibold'>
                        {user?.username?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className='px-3 bg-white drop-shadow-xl border text-center rounded-2xl p-3'
                    align='end'
                  >
                    <div className=''>
                      Signed in as <span className=''>{user?.username}</span>
                    </div>

                    {(user?.role === 'admin' || user?.role === 'editor') && (
                      <DropdownMenuItem
                        onClick={() => navigate('/me/stories')}
                        className='justify-center'
                      >
                        Stories
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem
                      className='justify-center'
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => setIsSignInOpen?.(true)}
                    className='hidden sm:block cursor-pointer'
                  >
                    Login
                  </button>
                </li>
                <li className='cursor-pointer hover:text-primary'>
                  <Button
                    className='rounded-full cursor-pointer'
                    onClick={() => openGetStartedDialog?.()}
                  >
                    Get Started
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}
