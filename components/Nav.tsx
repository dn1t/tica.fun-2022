export default function Nav() {
  return (
    <nav class='border-b border-gray-900 sticky top-0 bg-black bg-opacity-70 z-50 px-6 backdrop-filter backdrop-blur-xl'>
      <div class='text-gray-400 absolute top-8 left-6 h-9 flex items-center xs:hidden'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-7 h-7'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
          />
        </svg>
      </div>
      <div class='flex justify-between items-center px-6 xs:px-10 py-8 mx-auto max-w-screen-xl'>
        <a
          href='/blog'
          class='text-gray-400 text-lg hover:text-gray-300 hover:underline hover:underline-gray-300 transition-colors hidden xs:inline'
        >
          Blog
        </a>
        <a
          href='#portfolio'
          class='text-gray-400 text-lg hover:text-gray-300 hover:underline hover:underline-gray-300 transition-colors hidden xs:inline'
        >
          Portfolio
        </a>
        <a href='/' class='mx-auto xs:mx-0'>
          <img src='/logo.svg' class='h-9' alt='David Lee' />
        </a>
        <a
          href='#contact'
          class='text-gray-400 text-lg hover:text-gray-300 hover:underline hover:underline-gray-300 transition-colors hidden xs:inline'
        >
          Contact
        </a>
        <a
          href='https://github.com/thoratica'
          class='text-gray-400 text-lg hover:text-gray-300 hover:underline hover:underline-gray-300 transition-colors hidden xs:inline'
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}
