import './globals.css';
import Header from '@/components/custom/Header';
import Footer from '@/components/custom/Footer';
import { globalQuery, fetchStrapiData } from '@/utils/fetchData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mite Tal',
  description:
    'Mite Tal is a creative company blending education, animation, and emerging tech to spark curiosity and bring learning to life. We craft immersive learning experiences through Augmented Reality (AR), WebGL, and animated storytelling — serving both institutional partners and global audiences on YouTube.From classrooms to smartphones, our goal is simple: make learning joyful, visual, and unforgettable.Ready to Transform Your Business with AR?',
  keywords: ['Mite Tal', 'Augmented Reality (AR) Learning Tools', 'WebGL-based Learning Modules', 'Animated Educational Videos', 'YouTube Educational Channels'],
  metadataBase: new URL('https://mitetal.com'),
  openGraph: {
    title: 'Mite Tal',
    description:
      'We build immersive learning experiences using AR, animation, and storytelling — to make education joyful, visual, and unforgettable.',
    url: 'https://mitetal.com',
    siteName: 'Mite Tal',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://mitetal.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mite Tal Open Graph Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mite Tal',
    description:
      'We build immersive learning experiences using AR, animation, and storytelling — to make education joyful, visual, and unforgettable.',
    images: ['https://mitetal.com/twitter-image.jpg'],
    site: '@mitetal',
  },
  icons: {
    icon: '/favicon.ico'
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalData = await fetchStrapiData('global', globalQuery);

  if (!globalData) {
    console.warn('Global data not available, using fallback');
  }

  return (
    <html lang="en">
      <body className="pt-20">
        {/* <CursorDot /> */}
        <Header data={globalData?.header} />
        <main className="min-h-screen">{children}</main>
        <Footer data={globalData?.footer} />
      </body>
    </html>
  );
}


// import './globals.css';
// import Header from '@/components/custom/Header';
// import Footer from '@/components/custom/Footer';
// import {globalQuery, fetchStrapiData} from '@/utils/fetchData'
// // import CursorDot from '@/components/custom/CursorDot';

// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const globalData = await fetchStrapiData('global', globalQuery);

//   if (!globalData) {
//     console.warn('Global data not available, using fallback');
//   }
//   return (
//     <html lang="en">
// 	  <head>
// 		<title>Mite Tal</title>
// 	  </head>
//       <body className="pt-20">
// 		{/* <CursorDot /> */}
//         <Header data={globalData.header}/>
//         <main className="min-h-screen">{children}</main>
//         <Footer data={globalData.footer}/>
//       </body>
//     </html>
//   );
// }
