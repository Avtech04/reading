
// import React, { useEffect } from 'react';

// const PDFViewer = ({ file, onClose }) => {
//   useEffect(() => {
//     // This effect runs when the 'file' prop changes.
//     if (file && file.url && window.AdobeDC) {
//       const adobeDCView = new window.AdobeDC.View({
//         clientId: "847ba97432054871b8ffbb5f71a87f62", // Your Adobe Client ID
//         divId: "pdf-viewer-container",
//       });

//       // We use the public Vercel Blob URL.
//       adobeDCView.previewFile({
//         content: { location: { url: file.url } },
//         metaData: { fileName: file.filename }, // Use the original filename for display.
//       });
//     }
//   }, [file]);

//   if (!file) return null;

//   // Reusing the modal styles for consistency
//   const modalOverlayStyle = { position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 };
//   const modalContentStyle = { backgroundColor: 'white', width: '90%', height: '85%', borderRadius: '8px', position: 'relative' };
//   const closeButtonStyle = { position: 'absolute', top: '12px', right: '12px', zIndex: 60, background: '#1e293b', /* slate-800 */ color: '#cbd5e1', /* slate-300 */ borderRadius: '9999px', padding: '0px 8px', cursor: 'pointer', border: '1px solid #334155' /* slate-700 */, fontSize: '1.125rem', fontWeight: 'bold' };

//   return (
//     <div style={modalOverlayStyle}>
//       <div style={modalContentStyle}>
//         <button onClick={onClose} style={closeButtonStyle}>✕</button>
//         <div id="pdf-viewer-container" style={{ width: '100%', height: '100%' }} />
//       </div>
//     </div>
//   );
// };

// export default PDFViewer;






// import React, { useEffect, useState, useRef } from 'react';
// import PodcastPlayer from './PodcastPlayer';

// const PDFViewer = ({ file, onClose }) => {
//   const viewerRef = useRef(null);
//   const [currentPageText, setCurrentPageText] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const previewFilePromiseRef = useRef(null);

//   useEffect(() => {
//     if (file && file.url && window.AdobeDC) {
//       const adobeDCView = new window.AdobeDC.View({
//         clientId: "847ba97432054871b8ffbb5f71a87f62",
//         divId: viewerRef.current.id,
//       });

//       previewFilePromiseRef.current = adobeDCView.previewFile({
//         content: { location: { url: file.url } },
//         metaData: { fileName: file.filename },
//       });

//       adobeDCView.registerCallback(
//         window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
//         async (event) => {
//           if (event.type === "PAGE_VIEW") {
//             try {
//               const pageNum = event.data.pageNumber;
//               setCurrentPage(pageNum);
//               const apis = await previewFilePromiseRef.current.getAPIs();
//               const pageText = await apis.getText({ page: pageNum });
//               setCurrentPageText(pageText);
//             } catch (e) {
//               console.error("Error getting page text:", e);
//               setCurrentPageText("Could not extract text from this page.");
//             }
//           }
//         },
//         { listenOn: ["PAGE_VIEW"], enableFilePreviewEvents: true }
//       );
//     }
//   }, [file]);

//   if (!file) return null;

//   const modalOverlayStyle = { position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 };
//   const modalContentStyle = { backgroundColor: 'white', width: '90%', height: '85%', borderRadius: '8px', position: 'relative' };
//   const closeButtonStyle = { position: 'absolute', top: '12px', right: '12px', zIndex: 60, background: '#1e2b3b', color: '#cbd5e1', borderRadius: '9999px', padding: '0px 8px', cursor: 'pointer', border: '1px solid #334155', fontSize: '1.125rem', fontWeight: 'bold' };

//   return (
//     <div style={modalOverlayStyle}>
//       <div style={modalContentStyle}>
//         <div className="absolute top-2 left-4 z-10 bg-slate-800/50 p-2 rounded-full backdrop-blur-sm">
//           <PodcastPlayer 
//             contextType="page_content"
//             contextText={`Content from page ${currentPage}: ${currentPageText}`}
//             disabled={!currentPageText}
//           />
//         </div>
//         <button onClick={onClose} style={closeButtonStyle}>✕</button>
//         <div id="pdf-viewer-container" ref={viewerRef} style={{ width: '100%', height: '100%' }} />
//       </div>
//     </div>
//   );
// };

// export default PDFViewer;



import React, { useEffect, useState, useRef } from 'react';
import TextToSpeechPlayer from './TextToSpeechPlayer';

const PDFViewer = ({ file, onClose }) => {
  const viewerRef = useRef(null);
  const [currentPageText, setCurrentPageText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const adobeDCView = useRef(null);

  useEffect(() => {
    if (!adobeDCView.current) {
      adobeDCView.current = new window.AdobeDC.View({
        clientId: "847ba97432054871b8ffbb5f71a87f62",
        divId: viewerRef.current.id,
      });
    }

    const viewPdfAndExtractText = async () => {
      if (file?.url) {
        try {
          const previewFilePromise = await adobeDCView.current.previewFile({
            content: { location: { url: file.url } },
            metaData: { fileName: file.filename },
          });

          // Register an event listener specifically for page changes
          adobeDCView.current.registerCallback(
            window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
            async (event) => {
              if (event.type === "PAGE_VIEW") {
                const pageNum = event.data.pageNumber;
                setCurrentPage(pageNum);
                try {
                  const apis = await previewFilePromise.getAPIs();
                  const pageText = await apis.getText({ page: pageNum });
                  setCurrentPageText(pageText || "No text could be extracted from this page.");
                } catch (e) {
                  console.error("Error getting page text:", e);
                  setCurrentPageText("Could not extract text.");
                }
              }
            },
            { listenOn: ["PAGE_VIEW"], enableFilePreviewEvents: true }
          );

          // For the initial page load
          const initialApis = await previewFilePromise.getAPIs();
          const initialText = await initialApis.getText({ page: 1 });
          setCurrentPageText(initialText || "No text could be extracted from this page.");

        } catch (error) {
          console.error("Adobe Viewer Error:", error);
        }
      }
    };
    
    viewPdfAndExtractText();

  }, [file]);

  if (!file) return null;

  const modalOverlayStyle = { position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 };
  const modalContentStyle = { backgroundColor: 'white', width: '90%', height: '85%', borderRadius: '8px', position: 'relative' };
  const closeButtonStyle = { position: 'absolute', top: '12px', right: '12px', zIndex: 60, background: '#1e2b3b', color: '#cbd5e1', borderRadius: '9999px', padding: '0px 8px', cursor: 'pointer', border: '1px solid #334155', fontSize: '1.125rem', fontWeight: 'bold' };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <div className="absolute top-2 left-4 z-10 bg-slate-800/50 p-2 rounded-full backdrop-blur-sm">
          <TextToSpeechPlayer 
            contextType="page_content"
            textToRead={`Content from page ${currentPage}: ${currentPageText}`}
          />
        </div>
        <button onClick={onClose} style={closeButtonStyle}>✕</button>
        <div id="pdf-viewer-container" ref={viewerRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default PDFViewer;