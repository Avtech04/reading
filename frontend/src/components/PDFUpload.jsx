// import React, { useState } from "react";
// import axios from "axios";

// const PDFUpload = () => {
//   const [file, setFile] = useState(null);

//   const uploadFile = async () => {
//     const formData = new FormData();
//     formData.append("file", file);
//     await axios.post("http://localhost:8000/api/pdf/upload", formData);
//     alert("Upload successful!");
//   };

//   return (
//     <div className="mb-4">
//       <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
//       <button className="bg-blue-500 text-white px-3 py-1 ml-2" onClick={uploadFile}>
//         Upload PDF
//       </button>
//     </div>
//   );
// };

// export default PDFUpload;



// import { useState } from "react";
// import axios from "axios"; // Make sure axios is imported

// const PDFUpload = ({ fetchPdfList }) => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleUpload = async () => {
//     const formData = new FormData();
//     for (let i = 0; i < selectedFiles.length; i++) {
//      formData.append('files', selectedFiles[i]);  // ✅ this matches FastAPI's expected name

//     }

//     try {
//   setUploading(true);
//   const response = await axios.post('http://localhost:8000/api/pdf/upload', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });

//   if (response.status === 200) {
//     console.log('Upload success:', response.data);
//     setMessage("Upload successful!");
//     if (fetchPdfList) fetchPdfList();  // ✅ Safe call
//   } else {
//     setMessage("Upload failed.");
//   }
// } catch (error) {
//   console.error('Upload failed:', error);
//   setMessage("Upload failed.");
// } finally {
//   setUploading(false);
// }

//   };

//   return (
//     <div className="my-4">
//       <input
//         type="file"
//         multiple
//         accept="application/pdf"
//         onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
//       />

//       <button
//         onClick={handleUpload}
//         disabled={uploading || selectedFiles.length === 0}
//         className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//       >
//         {uploading ? "Uploading..." : "Upload PDF(s)"}
//       </button>

//       {message && <p className="mt-2">{message}</p>}
//     </div>
//   );
// };

// export default PDFUpload;




// import { useState } from "react";
// import axios from "axios";

// const PDFUpload = ({ fetchPdfList }) => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleUpload = async () => {
//     const formData = new FormData();
//     for (let i = 0; i < selectedFiles.length; i++) {
//       formData.append("file", selectedFiles[i]); // <- not "files[]"
//     }

//     try {
//       setUploading(true);
//       const response = await axios.post("http://localhost:8000/api/pdf/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessage("Upload successful!");
//       fetchPdfList?.(); // optional chaining to avoid crash
//     } catch (error) {
//       console.error("Upload failed:", error);
//       setMessage("Upload failed.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//   //   <div className="my-4">
//   //     <input
//   //       type="file"
//   //       accept="application/pdf"
//   //       multiple
//   //       onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
//   //     />
//   //     <button
//   //       onClick={handleUpload}
//   //       disabled={uploading || selectedFiles.length === 0}
//   //       className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//   //     >
//   //       {uploading ? "Uploading..." : "Upload PDF(s)"}
//   //     </button>
//   //     {message && <p className="mt-2">{message}</p>}
//   //   </div>
//   // );
//   // Inside return JSX:
// <div className="mb-4">
//   <input
//     type="file"
//     multiple
//     accept="application/pdf"
//     onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
//     className="block w-full text-sm text-gray-700 border rounded p-1"
//   />
//   <button
//     onClick={handleUpload}
//     disabled={uploading || selectedFiles.length === 0}
//     className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//   >
//     {uploading ? "Uploading..." : "Upload PDF(s)"}
//   </button>
//   {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
// </div>
// );
// };

// export default PDFUpload;






// import { useState } from "react";
// import axios from "axios";

// const PDFUpload = ({ fetchPdfList }) => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleUpload = async () => {
//     const formData = new FormData();
//     for (let i = 0; i < selectedFiles.length; i++) {
//       formData.append("file", selectedFiles[i]); // <- not "files[]"
//     }

//     try {
//       setUploading(true);
//       const response = await axios.post("http://localhost:8000/api/pdf/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessage("Upload successful!");
//       fetchPdfList?.(); // optional chaining to avoid crash
//     } catch (error) {
//       console.error("Upload failed:", error);
//       setMessage("Upload failed.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="my-4">
//       <input
//         type="file"
//         accept="application/pdf"
//         multiple
//         onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
//       />
//       <button
//         onClick={handleUpload}
//         disabled={uploading || selectedFiles.length === 0}
//         className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//       >
//         {uploading ? "Uploading..." : "Upload PDF(s)"}
//       </button>
//       {message && <p className="mt-2">{message}</p>}
//     </div>
//   );
// };

// export default PDFUpload;
// import { useState } from "react";
// import axios from "axios";

// const PDFUpload = ({ fetchPdfList }) => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleUpload = async () => {
//     const formData = new FormData();
//     for (let i = 0; i < selectedFiles.length; i++) {
//       formData.append("file", selectedFiles[i]); // <- not "files[]"
//     }

//     try {
//       setUploading(true);
//       const response = await axios.post("http://localhost:8000/api/pdf/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessage("Upload successful!");
//       fetchPdfList?.(); // optional chaining to avoid crash
//     } catch (error) {
//       console.error("Upload failed:", error);
//       setMessage("Upload failed.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="my-4">
//       <input
//         type="file"
//         accept="application/pdf"
//         multiple
//         onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
//       />
//       <button
//         onClick={handleUpload}
//         disabled={uploading || selectedFiles.length === 0}
//         className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//       >
//         {uploading ? "Uploading..." : "Upload PDF(s)"}
//       </button>
//       {message && <p className="mt-2">{message}</p>}
//     </div>
//   );
// };

// export default PDFUpload;




import { useState } from "react";
import axios from "axios";

const PDFUpload = ({ fetchPdfList }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    try {
      setUploading(true);
      setMessage(""); // Clear previous messages
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/pdf/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Upload successful!");
      // This is now in App.jsx, but if you pass onUpload, it would be called here.
      // fetchPdfList?.(); 
    } catch (error) {
      console.error("Upload failed:", error);
      
      // --- NEW ERROR HANDLING LOGIC ---
      if (error.response && error.response.status === 409) {
        // If we get a 409 Conflict error, show a specific message
        setMessage(`Upload failed: ${error.response.data.detail}`);
      } else {
        // For all other errors, show a generic message
        setMessage("Upload failed. Please check the server connection.");
      }
    } finally {
      setUploading(false);
    }
  };

  

  return (
    <div className="my-4">
      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
        // Clear the message when new files are selected
        onClick={() => setMessage("")}
      />
      <button
        onClick={handleUpload}
        disabled={uploading || selectedFiles.length === 0}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        {uploading ? "Uploading..." : "Upload PDF(s)"}
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default PDFUpload;