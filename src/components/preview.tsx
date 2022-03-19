import "./preview.css";
import { useRef, useEffect } from "react";
import React from "react";

interface PreviewProps {
  code: string;
}

const html = `
<html>
  <head></head>
  <body bgcolor="white">
    <div id="root">
    </div>
    <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          const root = document.getElementById('root');
          root.innerHTML = \`
            <div style='color:red;'>
              <h4>Runtime Error</h4>
              \${err}
            </div>\`;
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  const onLoad = () => {
    iframe.current.contentWindow.postMessage(code, "*");
  };

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
        onLoad={onLoad}
      />
    </div>
  );
};

export default Preview;
