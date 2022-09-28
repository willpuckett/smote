/** @jsx h */

import blog, { ga, redirects, h } from "blog";
import "https://esm.sh/prismjs@1.27.0/components/prism-typescript?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-bash?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-rust?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-clike?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-vim?no-check";
// import * as unocss from './unocss.ts';


blog({
  title: "⚒ Smote.io ⚒",
  description: "The Voice of the Synthetic Minority.",
  // header: <header>Your custom header</header>,
  // section: <section>Your custom section</section>,
  // footer: <footer>Your custom footer</footer>,
  // avatar: "https://deno-avatar.deno.dev/avatar/6c464.svg",
  avatar: "/images/avatar.webp",
  avatarClass: "rounded-full",
  author: "Will Puckett",
  links: [
    { title: "Email", url: "mailto:willpuckett@gmail.com" },
    { title: "GitHub", url: "https://github.com/willpuckett" },
    { title: "Twitter", url: "https://twitter.com/vvill_call" },
  ],
  lang: "en",
  dateStyle: "long",
  cover: "/images/background.svg",
  // background: "#f9f9f9",
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
  // unocss: unocss, 
  favicon: "/images/favicon.ico",
});
