import React from 'react';

import Container from 'react-bootstrap/Container';

const Page = ({ title, children }) => (
  <div>
    {title && (
      <Container>
          <h2>{title}</h2>
      </Container>
    )}
    <Container>
      <div>
        {children};
      </div>
    </Container>
  </div>
);
export default Page;
