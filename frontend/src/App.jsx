
// import React, { useState, useEffect } from "react";
// import PDFUpload from "./components/PDFUpload";
// import PdfList from "./components/PdfList";
// import RecommendationPanel from "./components/RecommendationPanel";
// import SnippetViewer from "./components/SnippetViewer";
// import PDFViewer from "./components/PDFViewer"; // 1. Make sure PDFViewer is imported
// import InsightsPanel from "./components/InsightsPanel"; // 1. Import the new component
// import Chatbot from "./components/Chatbot"; 
// import PodcastPlayer from "./components/PodcastPlayer"; // 1. Import PodcastPlayer



// export default function App() {
//   console.log("TEST 1: App component is rendering...");

//   const [pdfs, setPdfs] = useState([]);
//   const [selectedSnippet, setSelectedSnippet] = useState(null);

//   // 2. Add state for the main PDF viewer
//   const [selectedPdf, setSelectedPdf] = useState(null);
//   const [showViewer, setShowViewer] = useState(false);
// const [recommendations, setRecommendations] = useState([]);
//   const [insights, setInsights] = useState(null);
//   const fetchPdfList = () => {
//     // ... (Your existing fetchPdfList function stays the same)
//     console.log("Attempting to fetch PDF list...");
//     fetch("http://localhost:8000/api/pdf/list", {
//       method: "GET",
//       headers: { "Cache-Control": "no-cache" },
//     })
//       .then((res) => {
//         console.log("Received response from server:", res);
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Successfully parsed JSON data:", data);
//         if (Array.isArray(data.pdfs)) {
//           setPdfs(data.pdfs);
//           console.log(`Updated state with ${data.pdfs.length} PDFs.`);
//         } else {
//           console.warn("Data received, but 'pdfs' key is not an array. Data:", data);
//           setPdfs([]);
//         }
//       })
//       .catch((err) => {
//         console.error("An error occurred in fetchPdfList:", err);
//         setPdfs([]);
//       });
//   };

//   useEffect(() => {
//     console.log("TEST 2: useEffect is running, about to call fetchPdfList.");
//     fetchPdfList();
//   }, []);

//   const handleUpload = () => {
//     fetchPdfList();
//   };

//   const handleDelete = (filename) => {
//     fetch(`http://localhost:8000/api/pdf/delete/${filename}`, {
//       method: "DELETE",
//     })
//     .then(() => fetchPdfList())
//     .catch((err) => console.error("Delete failed:", err));
//   };
  
//   const handleSnippetClick = (recommendation) => {
//     setSelectedSnippet(recommendation);
//   };
  
//   // 3. Add the handler function for the "View" button
//   const handleView = (filename) => {
//     setSelectedPdf(filename);
//     setShowViewer(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">
//         Adobe Hackathon – PDF Intelligence
//       </h1>

//       <PDFUpload onUpload={handleUpload} />

//       {/* 4. Pass the handleView function as the onView prop */}
//       <PdfList pdfs={pdfs} onDelete={handleDelete} onView={handleView} />

//       {/* <RecommendationPanel onSnippetClick={handleSnippetClick} /> */}
// <RecommendationPanel 
//             onSnippetClick={handleSnippetClick}
//             onNewRecommendations={setRecommendations} 
//           />
//       {/* Viewer for snippets */}
//       {selectedSnippet && (
//         <SnippetViewer
//           snippet={selectedSnippet}
//           onClose={() => setSelectedSnippet(null)}
//         />
//       )}

//       {/* 5. Add the viewer for individual PDFs */}
//       {showViewer && (
//         <PDFViewer 
//           fileName={selectedPdf} 
//           onClose={() => setShowViewer(false)} 
//         />
//       )}

//       <div>
//           {/* Pass the handler down to InsightsPanel */}
//           <InsightsPanel onNewInsights={setInsights} />

//           <Chatbot />
          
//           {/* Pass the shared data down to PodcastPlayer */}
//           <PodcastPlayer 
//             recommendations={recommendations}
//             insights={insights}
//           />
//         </div>
//     </div>
//   );
// }
//---------------------------------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import PDFUpload from "./components/PDFUpload";
// import PdfList from "./components/PdfList";
// import RecommendationPanel from "./components/RecommendationPanel";
// import SnippetViewer from "./components/SnippetViewer";
// import PDFViewer from "./components/PDFViewer";
// import InsightsPanel from "./components/InsightsPanel";
// import Chatbot from "./components/Chatbot";
// import PodcastPlayer from "./components/PodcastPlayer";
// import MinimalNavbar from "./components/MinimalNavbar";

// export default function App() {
//   // --- State Management ---
//   const [pdfs, setPdfs] = useState([]);
//   const [selectedSnippet, setSelectedSnippet] = useState(null);
//  const [selectedPdf, setSelectedPdf] = useState(null);
// const [showViewer, setShowViewer] = useState(false);

//   // State lifted up to be shared between components
//   const [recommendations, setRecommendations] = useState([]);
//   const [insights, setInsights] = useState(null);

//   // --- Functions ---
//   const fetchPdfList = () => {
//     console.log("--- Attempting to run fetchPdfList ---");
//     fetch("http://localhost:8000/api/pdf/list")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setPdfs(data);
//         } else {
//           console.error("Received unexpected data format for PDF list:", data);
//           setPdfs([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Error loading PDFs:", err);
//         setPdfs([]);
//       });
//   };

//   useEffect(() => {
//     // This hook runs once when the component first loads.
//     fetchPdfList();
//   }, []);

//   const handleUpload = () => {
//     // Refresh the list after a successful upload.
//     fetchPdfList();
//   };

//   const handleDelete = (filename) => {
//     fetch(`http://localhost:8000/api/pdf/delete/${filename}`, {
//       method: "DELETE",
//     })
//       .then(() => fetchPdfList())
//       .catch((err) => console.error("Delete failed:", err));
//   };

//  const handleView = (file) => {
//   setSelectedPdf(file);
//   setShowViewer(true);
// };
//   const handleSnippetClick = (recommendation) => {
//     setSelectedSnippet(recommendation);
//   };

//   return (
  
//     <div className="min-h-screen bg-gray-50 p-6">
    
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">
//         Adobe Hackathon – PDF Intelligence
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Left Column */}
//         <div>
//           <PDFUpload onUpload={handleUpload} />
//          <PdfList 
//   pdfs={pdfs} 
//   onDelete={handleDelete} 
//   onView={handleView} 
// />

//           <RecommendationPanel
//             onSnippetClick={handleSnippetClick}
//             onNewRecommendations={setRecommendations}
//           />
//         </div>

//         {/* Right Column */}
//         <div>
//           <InsightsPanel onNewInsights={setInsights} />
//           <Chatbot />
//           {/* We only show the "Combined Podcast" option if BOTH recommendations and insights exist */}
//           {recommendations.length > 0 && insights && (
//             <div className="bg-white p-4 rounded-lg shadow-md mt-6">
//               <h2 className="text-lg font-semibold mb-2">Combined Podcast</h2>
//               <p className="text-sm text-gray-500 mb-3">
//                 A podcast generated from both recommendations and insights.
//               </p>
//               <PodcastPlayer
//                 insights={insights}
//                 recommendations={recommendations}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
//       {selectedSnippet && (
//         <SnippetViewer
//           snippet={selectedSnippet}
//           onClose={() => setSelectedSnippet(null)}
//         />
//       )}
//      {showViewer && (
//   <PDFViewer 
//     file={selectedPdf} 
//     onClose={() => setShowViewer(false)} 
//   />
// )}
//     </div>
//   );
// }


//----------------------------------------------------------------
import React, { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import PDFUpload from "./components/PDFUpload";
import PdfList from "./components/PdfList";
import RecommendationPanel from "./components/RecommendationPanel";
import SnippetViewer from "./components/SnippetViewer";
import PDFViewer from "./components/PDFViewer";
import InsightsPanel from "./components/InsightsPanel";
import Chatbot from "./components/Chatbot";
import { FileText } from 'lucide-react';
import SummarizeButton from "./components/SummarizeButton";
import SummarizeModal from "./components/SummarizeModal";
import DebateButton from "./components/DebateButton";
import DebateModal from "./components/DebateModal";
export default function App() {
  const [pdfs, setPdfs] = useState([]);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const [isSummarizeModalOpen, setIsSummarizeModalOpen] = useState(false);
    const [isDebateModalOpen, setIsDebateModalOpen] = useState(false);
  const fetchPdfList = () => {
    fetch(`https://avtech03-pdf-insight-backend.hf.space/api/pdf/list`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPdfs(data);
        else setPdfs([]);
      })
      .catch((err) => {
        console.error("Error loading PDFs:", err);
        setPdfs([]);
      });
  };

  useEffect(() => {
    fetchPdfList();
  }, []);

  const handleUpload = () => fetchPdfList();
  const handleDelete = (filename) => {
    fetch(`https://avtech03-pdf-insight-backend.hf.space/api/pdf/delete/${filename}`, { method: "DELETE" })
      .then(() => fetchPdfList())
      .catch((err) => console.error("Delete failed:", err));
  };
  const handleView = (file) => {
    setSelectedPdf(file);
    setShowViewer(true);
  };
  const handleSnippetClick = (recommendation) => setSelectedSnippet(recommendation);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col">
      {/* The Toaster component is added here to enable notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#334155', // slate-700
            color: '#e2e8f0', // slate-300
            border: '1px solid #475569', // slate-600
          },
        }}
      />

      <nav className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700 p-4 flex-shrink-0 sticky top-0 z-40">
        <h1 className="text-xl font-bold text-blue-400">PDF Insight</h1>
      </nav>

      <main className="p-4 sm:p-6 lg:p-8 flex-grow flex flex-col">
        <div className="flex-grow flex flex-col lg:flex-row gap-6">
          <div className="lg:flex-[2] flex flex-col">
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col flex-grow h-0">
              <h2 className="text-lg font-semibold mb-3 flex items-center flex-shrink-0">
                <FileText className="mr-2 text-blue-400" /> Documents
              </h2>
              <PDFUpload onUpload={handleUpload} />
              <PdfList pdfs={pdfs} onDelete={handleDelete} onView={handleView} />
            </div>
          </div>
          <div className="lg:flex-[3] flex flex-col">
            <RecommendationPanel
              onSnippetClick={handleSnippetClick}
            />
          </div>
          <div className="lg:flex-[2] flex flex-col">
            <InsightsPanel />
          </div>
        </div>
      </main>

      {/* Floating Buttons */}
      <DebateButton onClick={() => setIsDebateModalOpen(true)} />
      <SummarizeButton onClick={() => setIsSummarizeModalOpen(true)} />
      <Chatbot />

      {/* Modals */}
      <DebateModal
        isOpen={isDebateModalOpen}
        onClose={() => setIsDebateModalOpen(false)}
        onEvidenceClick={handleSnippetClick}
      />
      <SummarizeModal 
        isOpen={isSummarizeModalOpen}
        onClose={() => setIsSummarizeModalOpen(false)}
        pdfs={pdfs}
      />
      {selectedSnippet && <SnippetViewer snippet={selectedSnippet} onClose={() => setSelectedSnippet(null)} />}
      {showViewer && <PDFViewer file={selectedPdf} onClose={() => setShowViewer(false)} />}
    </div>
  );
}