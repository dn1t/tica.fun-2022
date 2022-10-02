const Header: preact.FunctionComponent<{
  title: string;
  href?: string;
  beta?: boolean;
}> = ({ title, href, beta }) => {
  return (
    <a href={href} class='pt-10 pb-4 inline-block'>
      <h1 class='flex items-center gap-x-1.5 md:gap-x-2 text-2xl md:text-3xl font-semibold'>
        {title}
        {beta && <div class="bg-blue-500 bg-opacity-20 text-blue-500 text-sm font-semibold leading-none px-2.5 py-1.5 rounded-lg">BETA</div>}
        {href && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            class='w-3 h-3 xs:w-4 xs:h-4 md:w-5 md:h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 4.5l7.5 7.5-7.5 7.5'
            />
          </svg>
        )}
      </h1>
    </a>
  );
};

export default Header;
