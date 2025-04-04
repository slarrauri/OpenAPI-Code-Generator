import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

interface SwaggerUIViewerProps {
  spec: any;
}

const SwaggerUIViewer: React.FC<SwaggerUIViewerProps> = ({ spec }) => {
  return (
    <div className="swagger-ui-container">
      <SwaggerUI spec={spec} />
    </div>
  );
};

export default SwaggerUIViewer;
