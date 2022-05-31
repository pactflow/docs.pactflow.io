import React from 'react';
import Footer from '@theme-original/Footer';
import DocsRating from '../../components/DocsRating';
import { useLocation } from '@docusaurus/router';

export default function FooterWrapper(props) {
  const location = useLocation();
  return (
    <>
      <DocsRating label={location.pathname} />
      <Footer {...props} />
    </>
  );
}
