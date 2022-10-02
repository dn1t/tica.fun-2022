import { Head } from '$fresh/runtime.ts';
import { getPosts } from '../lib/post.ts';
import contacts from '../lib/contacts.tsx';
import Header from '../components/Header.tsx';
import Nav from '../components/Nav.tsx';
import { PageProps } from 'https://deno.land/x/fresh@1.1.1/server.ts';

const portfolioProjects = [
  {
    href: 'https://github.com/thoratica/remote-kakao',
    title: 'remote-kakao',
    description: 'A Node.js module to make unofficial KakaoTalk bots easily.',
    thumbnail:
      'https://raw.githubusercontent.com/remote-kakao/core/main/images/banner.png',
  },
  {
    href: 'https://github.com/thoratica/SolveEncoder',
    title: 'SolveEncoder',
    description:
      'A web-based encoder that helps you change any text in 0 and 1, and replace them into specified texts.',
    thumbnail: 'https://i.ibb.co/NS36F4s/image.png',
  },
  {
    href: 'https://github.com/thoratica/The-NoIE-License',
    title: 'The NoIE License',
    description:
      'A license created to expel Internet Explorer; the enemy of all, especially front-end developers.',
  },
];

const blogPosts = await getPosts();

export default function Home(props: PageProps) {
  return (
    <div class='bg-black text-white min-h-screen'>
      <Head>
        <title>David Lee</title>
        <meta
          name='description'
          content="I'm a developer & designer. Love building beautiful websites & apps. Currently 15-years-old (17 in Korean Age). Programming since 2017."
        />
        <meta property='og:title' content='David Lee' />
        <meta property='og:type' content='website' />
        <meta
          property='og:description'
          content="I'm a developer & designer. Love building beautiful websites & apps. Currently 15-years-old (17 in Korean Age). Programming since 2017."
        />
        <meta property='og:url' content={props.url.href} />
        <meta
          property='og:image'
          content={`${
            new URL(props.url).origin
          }/api/thumbnail?title=David%20Lee`}
        />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='David Lee' />
        <meta
          name='twitter:description'
          content="I'm a developer & designer. Love building beautiful websites & apps. Currently 15-years-old (17 in Korean Age). Programming since 2017."
        />
        <meta
          name='twitter:image'
          content={`${
            new URL(props.url).origin
          }/api/thumbnail?title=David%20Lee`}
        />
      </Head>
      <Nav />
      <div class='px-6 xs:px-10 mx-auto max-w-screen-xl'>
        <section class='py-16 md:py-32'>
          <h1 class='text-3xl xxs:text-4xl xs:text-5xl md:text-6xl font-semibold font-display'>
            Hi, I'm <br class='sm:hidden' />
            <span class='font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500'>
              David Lee
            </span>{' '}
            — <br />A Student Developer.
          </h1>
          <p class='text-lg xs:text-xl text-gray-400 font-light mt-8'>
            I'm a developer & designer. Love building beautiful websites & apps.
            Currently{' '}
            {(() => {
              const date = new Date();
              return (
                date.getFullYear() -
                2006 -
                (date.getMonth() + 1 < 10 || date.getDay() < 27 ? 1 : 0)
              );
            })()}
            -years-old ({new Date().getFullYear() - 2006 + 1} in Korean Age).
            Programming since 2017.
          </p>
        </section>
        <section>
          <Header title='Blog' href='/blog' beta />
          <div class='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))80px] gap-10 py-4'>
            {blogPosts.slice(0, 3).map((post) => (
              <a href={`/blog/${post.slug}`} class='inline-block'>
                <div
                  class='w-full bg-center bg-cover'
                  style={{
                    backgroundImage: `url(/api/thumbnail?title=${encodeURIComponent(
                      post.title
                    )})`,
                    aspectRatio: '16 / 9',
                  }}
                />
                <h2 class='text-2xl font-semibold mt-4'>{post.title}</h2>
                <p class='text-base md:text-lg text-gray-400 font-light mt-2'>
                  {post.abstract}
                </p>
              </a>
            ))}
            {blogPosts.length >= 3 && (
              <div class='flex flex-col items-center justify-center'>
                <a
                  href='/blog'
                  class='px-4 xs:px-3 py-3 mx-auto bg-gray-800 bg-opacity-50 flex items-center justify-center gap-x-2.5 lg:inline-block w-full xs:w-max rounded-xl xs:rounded-full'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-9 h-9 lg:(w-9 h-9) text-gray-200'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <p class='lg:hidden mr-1.5 uppercase text-gray-200 font-light'>
                    See More
                  </p>
                </a>
              </div>
            )}
          </div>
        </section>
        <section>
          <Header title='Portfolio' href='/portfolio' />
          <div class='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))80px] gap-10 py-4'>
            {portfolioProjects.slice(0, 3).map((project) => (
              <a href={project.href} class='inline-block' target='_blank'>
                <div
                  class='w-full bg-center bg-cover'
                  style={{
                    backgroundImage: `url(${
                      project.thumbnail
                        ? project.thumbnail
                        : `/api/thumbnail?title=${encodeURIComponent(
                            project.title
                          )}`
                    })`,
                    aspectRatio: '16 / 9',
                  }}
                />
                <h2 class='text-2xl font-semibold mt-4'>{project.title}</h2>
                <p class='text-base md:text-lg text-gray-400 font-light mt-2'>
                  {project.description}
                </p>
              </a>
            ))}
            {portfolioProjects.length >= 3 && (
              <div class='flex flex-col items-center justify-center'>
                <a
                  href='/portfolio'
                  class='px-4 xs:px-3 py-3 mx-auto bg-gray-800 bg-opacity-50 flex items-center justify-center gap-x-2.5 lg:inline-block w-full xs:w-max rounded-xl xs:rounded-full'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-9 h-9 lg:(w-9 h-9) text-gray-200'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <p class='lg:hidden mr-1.5 uppercase text-gray-200 font-light'>
                    See More
                  </p>
                </a>
              </div>
            )}
          </div>
        </section>
        <section>
          <Header title='Contact' />
          <div class='grid xs:grid-cols-2 md:grid-cols-3 gap-8 py-4 overflow-x-auto'>
            {contacts.map((contact) => {
              return (
                <a
                  href={contact.href}
                  class='flex w-full gap-x-6 items-center'
                  target='_blank'
                >
                  <div
                    class='h-20 w-20 rounded-xl flex items-center justify-center'
                    style={{
                      color: contact.color,
                      backgroundImage: contact.bgImage,
                      backgroundColor: contact.bgColor,
                      aspectRatio: '1',
                    }}
                  >
                    <div class='h-12 w-12 flex items-center justify-center'>
                      {contact.icon}
                    </div>
                  </div>
                  <div class='flex flex-col'>
                    <h2 class='text-[22px] font-semibold'>{contact.name}</h2>
                    <p class='text-base md:text-lg text-gray-400 font-light'>
                      {contact.account}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
        <div class='h-40' />
      </div>
    </div>
  );
}
