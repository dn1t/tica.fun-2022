import { useEffect, useState } from "preact/hooks";

const leftMenu = [
  { text: "Blog", href: "/blog" },
  { text: "Portfolio", href: "/portfolio" },
];

const rightMenu = [
  { text: "Contact", href: "/#contact" },
  { text: "GitHub", href: "https://github.com/thoratica" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (menuOpen) setMenuOpen(false);
      }
    }

    globalThis.addEventListener("keydown", onKeyDown);

    return () => globalThis.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <div
        class="h-[calc(100vh-100px)] w-screen fixed bg-black bg-opacity-50 backdrop-filter backdrop-blur-xl top-[100px] left-0 z-40 items-center justify-center"
        style={{ display: menuOpen ? "flex" : "none" }}
        onClick={() => setMenuOpen(false)}
      >
        <div class="flex flex-col items-start gap-y-5 mb-[100px] max-w-md w-full px-10">
          {[...leftMenu, ...rightMenu].map((item) => (
            <a
              href={item.href}
              class="font-bold text-4xl"
            >
              {item.text}
            </a>
          ))}
        </div>
      </div>
      <nav class="border-b border-gray-800 sticky top-0 bg-black bg-opacity-50 z-50 px-6 backdrop-filter backdrop-blur-xl">
        {!menuOpen
          ? (
            <button
              class="text-gray-400 absolute top-8 left-6 h-9 flex items-center xs:hidden focus:outline-none"
              onClick={() => setMenuOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          )
          : (
            <button
              class="text-gray-400 absolute top-8 left-6 h-9 flex items-center xs:hidden focus:outline-none"
              onClick={() => setMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        <div class="flex justify-between items-center px-6 xs:px-10 py-8 mx-auto max-w-screen-xl">
          {leftMenu.map((item) => (
            <a
              href={item.href}
              class="text-gray-400 text-lg hover:text-gray-300 hover:underline hover:underline-gray-300 transition-colors hidden xs:inline"
            >
              {item.text}
            </a>
          ))}
          <a href="/" class="mx-auto xs:mx-0">
            <img src="/logo.svg" class="h-9" alt="David Lee" />
          </a>
          {rightMenu.map((item) => (
            <a
              href={item.href}
              class="text-gray-400 text-lg hover:text-gray-300 hover:underline hover:underline-gray-300 transition-colors hidden xs:inline"
            >
              {item.text}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
