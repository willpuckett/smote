import blog from 'deno_blog/blog.tsx'
import { Footer } from './components.tsx'

import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-vim'
import 'prismjs/components/prism-lisp'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-git'
import 'prismjs/components/prism-json'

blog({
  title: 'smote.io',
  description: '𐡷 Yes, but smaller. 𐡸',
  showHeaderOnPostPage: true, // by default, the header will only show on home, set showHeaderOnPostPage to true to make it show on each post page
  footer: Footer,
  avatar: '/images/avatar.webp',
  avatarClass: 'rounded-full',
  author: 'Will Puckett',
  links: [
    { title: 'Email', url: 'mailto:willpuckett@gmail.com' },
    { title: 'GitHub', url: 'https://github.com/willpuckett' },
    { title: 'Shop', url: 'https://octule.com' },
  ],
  lang: 'en',
  cover: '/static/header.svg',
  favicon: '/images/favicon.ico',
  coverTextColor: 'whitesmoke',
  dateFormat: (d: Date) =>
    d.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'PST',
    }),
  theme: 'auto',
  readtime: true,
  // middlewares: [
  // // If you want to set up Google Analytics, paste your GA key here.
  // // ga("UA-XXXXXXXX-X"),
  // // If you want to provide some redirections, you can specify them here,
  // // pathname specified in a key will redirect to pathname in the value.
  // redirects({
  //  "/hello_world.html": "/hello_world",
  // }),
  // ]
})
