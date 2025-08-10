// import React, { useEffect } from "react";

// const SnippetViewer = ({ snippet, onClose }) => {
//   useEffect(() => {
//     // This effect runs when the component appears
//     if (window.AdobeDC && snippet?.source) {
//       console.log("--- SnippetViewer: Initializing (Back to Basics) ---");
//       let adobeViewer; // Variable to hold the viewer instance

//       const adobeDCView = new window.AdobeDC.View({
//         clientId: "847ba97432054871b8ffbb5f71a87f62", // Your Adobe Client ID
//         divId: "snippet-pdf-viewer",
//       });

//       // 1. We register the callback FIRST to make sure it's listening.
//       adobeDCView.registerCallback(
//         window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
//         (event) => {
//           if (event.type === "DOCUMENT_OPEN") {
//             console.log("✅ DOCUMENT_OPEN event fired.");
//             // Get the viewer object from the event
//             adobeViewer = event.data.adobeViewer;
//           }
//         },
//         { listenOn: ["DOCUMENT_OPEN"] }
//       );

//       // 2. We render the file.
//       const previewFilePromise = adobeDCView.previewFile(
//         {
//           content: { location: { url: `http://localhost:8000/static/${snippet.source}?t=${new Date().getTime()}` } },
//           metaData: { fileName: snippet.source },
//         },
//         {
//           embedMode: "SIZED_CONTAINER", // Using the simpler, more stable container
//           showAnnotationTools: false,
//         }
//       );

//       // 3. AFTER the preview promise resolves, we get the APIs and perform actions.
//       previewFilePromise.then((viewer) => {
//         viewer.getAPIs().then((apis) => {
//           console.log(`✅ Preview is ready. Jumping to page: ${snippet.page}`);
//           apis.gotoLocation(snippet.page)
//             .then(() => {
//               console.log("✅ Page jump command sent successfully.");
//               // Highlighting logic would go here if needed in the future
//             })
//             .catch(error => console.error("❌ Page jump failed:", error));
//         });
//       });
//     }
//   }, [snippet]);

//   // The rest of your component with inline styles remains the same
//   const modalOverlayStyle = { position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 };
//   const modalContentStyle = { backgroundColor: 'white', width: '90%', height: '85%', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', position: 'relative', padding: '8px' };
//   const closeButtonStyle = { position: 'absolute', top: '12px', right: '12px', color: '#4A5568', fontSize: '1.125rem', fontWeight: 'bold', zIndex: 60, background: 'white', borderRadius: '9999px', padding: '0px 8px', cursor: 'pointer', border: 'none' };

//   return (
//     <div style={modalOverlayStyle}>
//       <div style={modalContentStyle}>
//         <button onClick={onClose} style={closeButtonStyle}>✕</button>
//         <div id="snippet-pdf-viewer" style={{ width: '100%', height: '100%' }}></div>
//       </div>
//     </div>
//   );
// };

// export default SnippetViewer;




// import React, { useEffect } from "react";

// const SnippetViewer = ({ snippet, onClose }) => {
//   useEffect(() => {
//     // Check for snippet.source_url now
//     if (window.AdobeDC && snippet?.source_url) {
//       const adobeDCView = new window.AdobeDC.View({
//         clientId: "847ba97432054871b8ffbb5f71a87f62",
//         divId: "snippet-pdf-viewer",
//       });

//       const previewPromise = adobeDCView.previewFile({
//         // Use the public URL from the snippet object
//         content: { location: { url: snippet.source_url } },
//         metaData: { fileName: snippet.source },
//       });

//       previewPromise.then(adobeViewer => {
//         adobeViewer.getAPIs().then(apis => {
//           if (snippet.page) apis.gotoLocation(snippet.page);
//           if (snippet.text) apis.search(snippet.text);
//         });
//       });
//     }
//   }, [snippet]);

//   if (!snippet) return null;

//   // Reusing the modal styles for consistency
//   const modalOverlayStyle = { position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 };
//   const modalContentStyle = { backgroundColor: 'white', width: '90%', height: '85%', borderRadius: '8px', position: 'relative' };
//   const closeButtonStyle = { position: 'absolute', top: '12px', right: '12px', zIndex: 60, background: '#1e293b', /* slate-800 */ color: '#cbd5e1', /* slate-300 */ borderRadius: '9999px', padding: '0px 8px', cursor: 'pointer', border: '1px solid #334155' /* slate-700 */, fontSize: '1.125rem', fontWeight: 'bold' };

//   return (
//     <div style={modalOverlayStyle}>
//       <div style={modalContentStyle}>
//         <button onClick={onClose} style={closeButtonStyle}>✕</button>
//         <div id="snippet-pdf-viewer" style={{ width: '100%', height: '100%' }} />
//       </div>
//     </div>
//   );
// };

// export default SnippetViewer;



// ------------------------------------------------------------------



// import React, { useEffect, useRef } from 'react';

// const SnippetViewer = ({ snippet, onClose }) => {
//   const viewerRef = useRef(null);
//   const adobeDCView = useRef(null);

//   useEffect(() => {
//     if (!adobeDCView.current) {
//       adobeDCView.current = new window.AdobeDC.View({
//         clientId: "847ba97432054871b8ffbb5f71a87f62",
//         divId: viewerRef.current.id,
//       });
//     }

//     const viewAndHighlight = async () => {
//       if (snippet?.source_url) {
//         try {
//           const previewFilePromise = await adobeDCView.current.previewFile({
//             content: { location: { url: snippet.source_url } },
//             metaData: { fileName: snippet.source },
//           }, {
//             // 1. Enable the annotation tools in the viewer
//             showAnnotationTools: true,
//             defaultViewMode: "FIT_WIDTH",
//           });

//           const apis = await previewFilePromise.getAPIs();
          
//           if (snippet.page) {
//             await apis.gotoLocation(snippet.page);
//           }

//           if (snippet.text) {
//             console.log(`Adding highlight annotation for: "${snippet.text}"`);
            
//             // 2. Use the Annotation API to add a highlight
//             const annotationPayload = {
//               "type": "highlight",
//               "page": snippet.page,
//               "color": "#FFD700", // Yellow color
//               "opacity": 0.4,
//               "text": snippet.text // The text to find and highlight
//             };

//             const result = await apis.addAnnotation(annotationPayload);
//             console.log("Annotation added successfully:", result);
//           }
//         } catch (error) {
//           console.error("Adobe Viewer Error:", error);
//         }
//       }
//     };

//     viewAndHighlight();
    
//   }, [snippet]);

//   if (!snippet) return null;

//   // The rest of your component remains the same
//   const modalOverlayStyle = { position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 };
//   const modalContentStyle = { backgroundColor: 'white', width: '90%', height: '85%', borderRadius: '8px', position: 'relative' };
//   const closeButtonStyle = { position: 'absolute', top: '12px', right: '12px', zIndex: 60, background: '#1e2b3b', color: '#cbd5e1', borderRadius: '9999px', padding: '0px 8px', cursor: 'pointer', border: '1px solid #334155', fontSize: '1.125rem', fontWeight: 'bold' };
  
//   return (
//     <div style={modalOverlayStyle}>
//       <div style={modalContentStyle}>
//         <button onClick={onClose} style={closeButtonStyle}>✕</button>
//         <div id="snippet-pdf-viewer" ref={viewerRef} style={{ width: '100%', height: '100%' }} />
//       </div>
//     </div>
//   );
// };

// export default SnippetViewer;




import React, { useEffect, useState, useRef } from 'react';
import TextToSpeechPlayer from './TextToSpeechPlayer'; // Import the new player

const SnippetViewer = ({ snippet, onClose }) => {
  const viewerRef = useRef(null);
  const adobeDCView = useRef(null);

  useEffect(() => {
    if (!adobeDCView.current) {
      adobeDCView.current = new window.AdobeDC.View({
        clientId: "847ba97432054871b8ffbb5f71a87f62",
        divId: viewerRef.current.id,
      });
    }

    const viewAndHighlight = async () => {
      if (snippet?.source_url) {
        try {
          const previewFilePromise = await adobeDCView.current.previewFile({
            content: { location: { url: snippet.source_url } },
            metaData: { fileName: snippet.source },
          });
          const apis = await previewFilePromise.getAPIs();
          if (snippet.page) await apis.gotoLocation(snippet.page);
          if (snippet.text) await apis.search(snippet.text, { highlight: { color: "#FFD700" } });
        } catch (error) {
          console.error("Adobe Viewer Error:", error);
        }
      }
    };
    viewAndHighlight();
  }, [snippet]);

  if (!snippet) return null;

  const modalOverlayStyle = { position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 };
  const modalContentStyle = { backgroundColor: 'white', width: '90%', height: '85%', borderRadius: '8px', position: 'relative' };
  const closeButtonStyle = { position: 'absolute', top: '12px', right: '12px', zIndex: 60, background: '#1e2b3b', color: '#cbd5e1', borderRadius: '9999px', padding: '0px 8px', cursor: 'pointer', border: '1px solid #334155', fontSize: '1.125rem', fontWeight: 'bold' };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        {/* Add the TTS Player to the top-left corner */}
        <div className="absolute top-2 left-4 z-10 bg-slate-800/50 p-2 rounded-full backdrop-blur-sm">
          <TextToSpeechPlayer
            contextType="recommendation_snippet"
            textToRead={snippet.text}
          />
        </div>
        <button onClick={onClose} style={closeButtonStyle}>✕</button>
        <div id="snippet-pdf-viewer" ref={viewerRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default SnippetViewer;