import Head from 'next/head';

export default () => (
  <div>
    <Head>
      <title>About | Best Blog</title>
    </Head>
    <img src="static/images/desktop.jpg" />
    <div>about</div>
    <style jsx>{`
      img {
        height: 500px;
      }
    `}</style>
  </div>
);
