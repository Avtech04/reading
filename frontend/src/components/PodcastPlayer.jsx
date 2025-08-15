


// import React, { useState, useRef } from 'react';
// import { Mic, Play, Pause, RotateCcw } from 'lucide-react';
// import toast from 'react-hot-toast';

// const PodcastPlayer = ({ contextType, contextText, disabled }) => {
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);

//   const generatePodcast = async () => {
//     if (disabled) {
//       toast.error(`Please generate ${contextType} first.`);
//       return;
//     }
//     setIsLoading(true);
//     setError(null);
//     setAudioUrl(null);

//     try {
//       const response = await fetch("https://avtech03-pdf-insight-backend.hf.space/api/podcast", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ context_type: contextType, text_content: contextText }),
//       });
//       if (!response.ok) throw new Error("Server responded with an error.");
//       const data = await response.json();
//       const fullAudioUrl = `https://avtech03-pdf-insight-backend.hf.space${data.audio_url}`;
//       setAudioUrl(fullAudioUrl);
//       setIsPlaying(true); // Automatically play on successful generation
//       toast.success("Podcast generated successfully!");
//     } catch (err) {
//       toast.error("Could not generate the podcast.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const togglePlayPause = () => {
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };
  
//   const handleStopAndReset = () => {
//     if(audioRef.current) {
//       audioRef.current.pause();
//     }
//     setAudioUrl(null);
//     setIsPlaying(false);
//   }

//   return (
//     <div className="flex items-center gap-3">
//       {/* This button now acts as a STOP/RESET button after generation */}
//       <button
//         onClick={!audioUrl ? generatePodcast : handleStopAndReset}
//         disabled={isLoading}
//         className="group relative flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-full hover:bg-red-700 disabled:bg-slate-500 transition-all duration-300 focus:outline-none"
//         title={!audioUrl ? `Generate Podcast for ${contextType}` : "Stop & Regenerate"}
//       >
//         {isLoading ? (
//           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//         ) : !audioUrl ? (
//           <Mic size={20} />
//         ) : (
//           <RotateCcw size={20} />
//         )}
//       </button>

//       {/* Custom Play/Pause Button */}
//       {audioUrl && (
//         <button
//           onClick={togglePlayPause}
//           className="flex items-center justify-center w-10 h-10 bg-slate-700 text-white rounded-full hover:bg-slate-600 transition-colors"
//         >
//           {isPlaying ? <Pause size={20} /> : <Play size={20} />}
//         </button>
//       )}

//       {/* Hidden Audio Element */}
//       {audioUrl && (
//         <audio
//           ref={audioRef}
//           src={audioUrl}
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//           onEnded={() => setIsPlaying(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default PodcastPlayer;

// import React, { useState, useRef } from 'react';
// import { Mic, Play, Pause, RotateCcw } from 'lucide-react';
// import toast from 'react-hot-toast';

// const PodcastPlayer = ({ contextType, contextText, disabled }) => {
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);

//   const generatePodcast = async () => {
//     if (disabled) {
//       toast.error(`Please generate ${contextType} first.`);
//       return;
//     }
//     setIsLoading(true);
//     setAudioUrl(null);

//     // --- THIS IS THE IF/ELSE LOGIC ---
//     const isDevelopment = window.location.hostname === 'localhost';
//     const apiBaseUrl = isDevelopment 
//       ? 'http://localhost:8080' 
//       : 'https://avtech03-pdf-insight-backend.hf.space';

//     try {
//       const response = await fetch(`${apiBaseUrl}/api/podcast`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ context_type: contextType, text_content: contextText }),
//       });
//       if (!response.ok) throw new Error("Server responded with an error.");
//       const data = await response.json();
      
//       // Construct the full URL using the correct base
//       const fullAudioUrl = `${apiBaseUrl}${data.audio_url}`;
//       setAudioUrl(fullAudioUrl);
      
//       setIsPlaying(true);
//       toast.success("Podcast generated successfully!");
//     } catch (err) {
//       toast.error("Could not generate the podcast.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const togglePlayPause = () => {
//     if (isPlaying) audioRef.current.pause();
//     else audioRef.current.play();
//     setIsPlaying(!isPlaying);
//   };
  
//   const handleStopAndReset = () => {
//     if(audioRef.current) audioRef.current.pause();
//     setAudioUrl(null);
//     setIsPlaying(false);
//   };

//   return (
//     <div className="flex items-center gap-3">
//       <button
//         onClick={!audioUrl ? generatePodcast : handleStopAndReset}
//         disabled={isLoading}
//         className="group relative flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-full hover:bg-red-700 disabled:bg-slate-500 transition-all"
//         title={!audioUrl ? `Generate Podcast for ${contextType}` : "Stop & Regenerate"}
//       >
//         {isLoading ? (
//           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//         ) : !audioUrl ? (
//           <Mic size={20} />
//         ) : (
//           <RotateCcw size={20} />
//         )}
//       </button>

//       {audioUrl && (
//         <button onClick={togglePlayPause} className="flex items-center justify-center w-10 h-10 bg-slate-700 text-white rounded-full hover:bg-slate-600">
//           {isPlaying ? <Pause size={20} /> : <Play size={20} />}
//         </button>
//       )}

//       {audioUrl && (
//         <audio
//           ref={audioRef}
//           src={audioUrl}
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//           onEnded={() => setIsPlaying(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default PodcastPlayer;




import React, { useState, useRef } from 'react';
import { Mic, Play, Pause, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../apiConfig'; // Import the single source of truth

const PodcastPlayer = ({ contextType, contextText, disabled }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const generatePodcast = async () => {
    if (disabled) {
      toast.error(`Please generate ${contextType} first.`);
      return;
    }
    setIsLoading(true);
    setAudioUrl(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/podcast`, { // Use the config URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context_type: contextType, text_content: contextText }),
      });
      if (!response.ok) throw new Error("Server responded with an error.");
      const data = await response.json();
      
      // Construct the full URL using the correct base
      const fullAudioUrl = `${API_BASE_URL}${data.audio_url}`;
      setAudioUrl(fullAudioUrl);
      
      setIsPlaying(true);
      toast.success("Podcast generated successfully!");
    } catch (err) {
      toast.error("Could not generate the podcast.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };
  
  const handleStopAndReset = () => {
    if(audioRef.current) audioRef.current.pause();
    setAudioUrl(null);
    setIsPlaying(false);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={!audioUrl ? generatePodcast : handleStopAndReset}
        disabled={isLoading}
        className="group relative flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-full hover:bg-red-700 disabled:bg-slate-500 transition-all"
        title={!audioUrl ? `Generate Podcast for ${contextType}` : "Stop & Regenerate"}
      >
        {isLoading ? ( <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> ) : !audioUrl ? ( <Mic size={20} /> ) : ( <RotateCcw size={20} /> )}
      </button>

      {audioUrl && (
        <button onClick={togglePlayPause} className="flex items-center justify-center w-10 h-10 bg-slate-700 text-white rounded-full hover:bg-slate-600">
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      )}

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
};

export default PodcastPlayer;