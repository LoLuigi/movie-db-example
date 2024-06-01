import React from 'react';

import Container from 'react-bootstrap/Container';

const Page = ({ children, title }) => (
  <>
    {title && (
      <Container>
          <h2>{title}</h2>
      </Container>
    )}
    <Container>
      <div>
        {children}
      </div>
    </Container>
  </>
);

export default Page;
