import "./preview.css";
import { useRef, useEffect } from "react";
import React from "react";

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
<html>
  <head></head>
  <body bgcolor="white">
    <div id="root">
    </div>
    <script>
      const handleErrors = (err) => {
        console.log(err);
        const root = document.getElementById('root');
        root.innerHTML += \`
          <div style='color:red;'>
            <h4>Runtime Error</h4>
            \${err}
          </div>\`;
      }
      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleErrors(event.error);
        console.log(event);
      });
      window.addEventListener('message', (event) => {
        try{
          if (event.data.err === '') {
            eval(event.data.code);
          } else {
            handleErrors(event.data.err);
          }
        } catch(err) {handleErrors(err);}
      }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
  }, [code, err]);

  const onLoad = () => {
    iframe.current.contentWindow.postMessage({ code, err }, "*");
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
