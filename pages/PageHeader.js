import Head from 'next/head';

const PageHeader = (props) => (
  <Head>
    <title>{props.title || 'Github Events Dashboard'}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/static/styles.css" />
    <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
  </Head>
);

export default PageHeader;
