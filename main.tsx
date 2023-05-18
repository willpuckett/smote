/** @jsx h */
import blog, { h } from "deno_blog/blog.tsx"

import "prismjs/components/prism-typescript"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-rust"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-vim"
import "prismjs/components/prism-graphql"
// import * as unocss from './unocss.ts';

blog({
  title: "⚒ Smote.io ⚒",
  description: "The Voice of the Synthetic Minority.",
  // header: <header>Your custom header</header>,
  // section: <section>Your custom section</section>,
  // footer: <footer>Your custom footer</footer>,
  avatar: "/images/avatar.webp",
  avatarClass: "rounded-full",
  author: "Will Puckett",
  links: [
    { title: "Email", url: "mailto:willpuckett@gmail.com" },
    { title: "GitHub", url: "https://github.com/willpuckett" },
    { title: "Twitter", url: "https://twitter.com/vvill_call" },
  ],
  lang: "en",
  cover: "/images/background.svg",
  // middlewares: [
  // If you want to set up Google Analytics, paste your GA key here.
  // ga("UA-XXXXXXXX-X"),
  // If you want to provide some redirections, you can specify them here,
  // pathname specified in a key will redirect to pathname in the value.
  // redirects({
  //  "/hello_world.html": "/hello_world",
  // }),
  // ]
  // check https://github.com/unocss/unocss
  favicon: "/images/favicon.ico",
  /** Color of the text that goes on the background cover. */
  coverTextColor: "dimgray",
  /** Whether to show the header on post pages */
  showHeaderOnPostPage: true,
  /** Custom CSS */
  // style ?: string;
  /** URL to open graph image. Can be relative. */
  // ogImage ?: string | {
  //   url: string;
  //   twitterCard: "summary" | "summary_large_image" | "app" | "player";
  // };
  /** The ISO code of the language the blog is in */
  dateFormat: (d) =>
    d.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "PST",
    }),
  /** The canonical URL of the blog */
  // canonicalUrl ?: string;
  /** UnoCSS configuration */
  // unocss ?: UnoConfig;
  /** Color scheme */
  theme: "auto",
  /**
  /** Whether to display readtime or not */
  readtime: true,
})
