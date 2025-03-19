import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Prevent theme flash during initial load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Prevent any transitions during initial load
                  document.documentElement.classList.add('no-transitions');
                  
                  // Apply theme from localStorage or system preference
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                  
                  // Remove the no-transitions class after the page loads
                  window.addEventListener('load', function() {
                    // Short delay to ensure all elements are painted before enabling transitions
                    setTimeout(function() {
                      document.documentElement.classList.remove('no-transitions');
                    }, 50);
                  });
                } catch (e) {
                  console.error('Theme initialization error:', e);
                }
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Prevent flash of unstyled content */
              .no-transitions * {
                transition: none !important;
              }
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
