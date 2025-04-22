import { h } from 'deno_blog/blog.tsx'

function IconLaptop() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      class='h-6 w-6 hover:text-primary transition-colors text-gray-900 dark:text-gray-100'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M3 19l18 0' />
      <path d='M5 6m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z' />
    </svg>
  )
}

// const IconMail = () => (
//   <svg
//     xmlns='http://www.w3.org/2000/svg'
//     width='24'
//     height='24'
//     viewBox='0 0 24 24'
//     fill='none'
//     stroke='currentColor'
//     stroke-width='2'
//     stroke-linecap='round'
//     stroke-linejoin='round'
//     class='h-6 w-6 hover:text-gray-600 hover:dark:text-gray-400 text-gray-900 dark:text-gray-100 transition-colors'
//   >
//     <path stroke='none' d='M0 0h24v24H0z' fill='none' />
//     <path d='M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z' />
//     <path d='M3 7l9 6l9 -6' />
//   </svg>
// )

const IconBrandGithub = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    stroke-width='2'
    stroke-linecap='round'
    stroke-linejoin='round'
    class='h-6 w-6 hover:text-gray-600 hover:dark:text-gray-400 text-gray-900 dark:text-gray-100 transition-colors'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5' />
  </svg>
)

const IconBrandMastodon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    stroke-width='2'
    stroke-linecap='round'
    stroke-linejoin='round'
    class='h-6 w-6 hover:text-gray-600 hover:dark:text-gray-400 text-gray-900 dark:text-gray-100 transition-colors'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M18.648 15.254c-1.816 1.763 -6.648 1.626 -6.648 1.626a18.262 18.262 0 0 1 -3.288 -.256c1.127 1.985 4.12 2.81 8.982 2.475c-1.945 2.013 -13.598 5.257 -13.668 -7.636l-.026 -1.154c0 -3.036 .023 -4.115 1.352 -5.633c1.671 -1.91 6.648 -1.666 6.648 -1.666s4.977 -.243 6.648 1.667c1.329 1.518 1.352 2.597 1.352 5.633s-.456 4.074 -1.352 4.944z' />
    <path d='M12 11.204v-2.926c0 -1.258 -.895 -2.278 -2 -2.278s-2 1.02 -2 2.278v4.722m4 -4.722c0 -1.258 .895 -2.278 2 -2.278s2 1.02 2 2.278v4.722' />
  </svg>
)

// const IconBrandTwitter = () => (
//   <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="h-6 w-6 hover:text-gray-600 hover:dark:text-gray-400 text-gray-900 dark:text-gray-100 transition-colors"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>)

// const IconBrandLinkedin = () => (
//   <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="h-6 w-6 hover:text-gray-600 hover:dark:text-gray-400 text-gray-900 dark:text-gray-100 transition-colors"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" /></svg>)

const IconShoppingBag = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    stroke-width='2'
    stroke-linecap='round'
    stroke-linejoin='round'
    class='h-6 w-6 hover:text-gray-600 hover:dark:text-gray-400 text-gray-900 dark:text-gray-100 transition-colors'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z' />
    <path d='M9 11v-5a3 3 0 0 1 6 0v5' />
  </svg>
)

const IconRss = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    stroke-width='2'
    stroke-linecap='round'
    stroke-linejoin='round'
    class='h-6 w-6 hover:text-gray-600 hover:dark:text-gray-400 text-gray-900 dark:text-gray-100 transition-colors'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M5 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
    <path d='M4 4a16 16 0 0 1 16 16' />
    <path d='M4 11a9 9 0 0 1 9 9' />
  </svg>
)

const IconBrandPrintables = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    stroke-width='2'
    stroke-linecap='round'
    stroke-linejoin='round'
    class='h-6 w-6 hover:text-gray-600 hover:dark:text-gray-400 text-gray-900 dark:text-gray-100 transition-colors'
  >
    <path d='m 3.507371,19.018348 c 0,-2.628827 0.048066,-4.779688 0.1068732,-4.779688 0.1324549,0 0.8713185,0.414307 4.3590898,2.444287 1.5117538,0.879887 2.968953,1.717695 3.238217,1.861801 l 0.489573,0.262013 V 14.158007 9.5092579 L 7.6042477,7.1829296 C 2.6762276,4.3846465 2.6814406,4.9709516 7.5599887,2.2007788 12.41598,-0.55659977 11.233758,-0.56312251 16.13943,2.2480704 l 4.096876,2.3477362 v 4.8672443 4.8672431 l -7.283337,4.179912 c -9.228057,5.295984 -9.213605,5.287803 -9.3398471,5.287803 -0.058131,0 -0.1057246,-2.15086 -0.1057246,-4.779687 z' />
  </svg>
)

export const Footer = (
  <footer class='text-gray-600 dark:text-gray-400'>
    <div class='max-w-6xl mx-auto px-4 py-10 md:py-16'>
      <div class='grid grid-cols-1 md:grid-cols-4 gap-8'>
        {/* Logo and description */}
        <div class='col-span-1 md:col-span-2'>
          <a href='/' class='flex items-center mb-4'>
            <IconLaptop />
            <span class='text-2xl font-bold text-gray-900 dark:text-gray-100'>
              smote.io
            </span>
          </a>
          <p class='text-sm'>
            <em>𐡷 How do you know where home is? 𐡸</em>
          </p>
        </div>

        {
          /* Quick as
        <div>
          <h3 class='text-lg font-semibold text-white mb-4'>Quick as</h3>
          <ul class='space-y-2'>
            <li>
              <a href='https://octule.com' class='hover:text-primary transition-colors'>
                <span><IconShoppingBag /> Shop</span>
              </a>
            </li>
            <li>
              <a href='/about' class='hover:text-primary transition-colors'>
                About Us
              </a>
            </li>
          </ul>
        </div> */
        }

        {/* Categories */}
        <div>
          <h3 class='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4'>
            Categories
          </h3>
          <ul class='space-y-2'>
            <li>
              <a
                href='/?tag=keebs'
                class='hover:text-gray-900 hover:dark:text-gray-100 border-b-1 transition-colors'
              >
                Keyboards
              </a>
            </li>
            <li>
              <a
                href='/?tag=3dp'
                class='hover:text-gray-900 hover:dark:text-gray-100 border-b-1 transition-colors'
              >
                3d Printing
              </a>
            </li>
            <li>
              <a
                href='/?tag=sbc'
                class='hover:text-gray-900 hover:dark:text-gray-100 border-b-1 transition-colors'
              >
                SBCs
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Newsletter Signup */}
      {
        /* <div class='mt-10 border-t border-gray-700 pt-8'>
        <h3 class='text-lg font-semibold text-white mb-4'>
          Subscribe to Our Newsletter
        </h3>
        <form class='flex flex-col sm:flex-row gap-4'>
          <input
            type='email'
            placeholder='Enter your email'
            class='bg-gray-800 text-white border-gray-700 focus:border-primary'
            aria-label='Email for newsletter'
          />
          <button
            type='submit'
            class='bg-primary hover:bg-primary-dark text-white'
          >
            Subscribe
          </button>
        </form>
      </div> */
      }

      {/* Social as and Copyright */}
      <div class='mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center'>
        <div class='flex space-x-6 mb-4 sm:mb-0'>
          <a
            href='https://octule.com'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Twitter'
          >
            <IconShoppingBag />
          </a>
          {
            /* <a
            href='mailto:'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Mail'
          >
            <IconMail />
          </a> */
          }
          <a
            href='https://github.com/willpuckett'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='GitHub'
          >
            <IconBrandGithub />
          </a>
          <a
            href='https://www.printables.com/@willpuckett'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Printables'
          >
            <IconBrandPrintables />
          </a>
          <a
            href='https://mastodon.social/@willpuckett'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Mastodon'
          >
            <IconBrandMastodon />
          </a>

          {
            /* <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <IconBrandTwitter />
            </a>   */
          }

          <a href='/feed' aria-label='RSS Feed'>
            <IconRss />
          </a>
        </div>
        <p class='text-sm text-gray-500'>
          © {new Date().getFullYear()} Smote.io. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
)
