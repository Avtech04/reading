

//-----------------------------------------------------

// import React, { useState } from 'react';
// import { Mic } from 'lucide-react';

// const PodcastPlayer = ({ recommendations, insights }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const generatePodcast = async () => {
//     setIsLoading(true);
//     setError(null);
//     setAudioUrl(null);
//     setIsModalOpen(true); // Open the modal immediately

//     let context = `You are a podcast host. First, summarize these AI-generated insights, and then discuss how the related content supports or adds to those insights.\n\n--- AI-Generated Insights ---\nKey Insights: ${insights.key_insights}\nDid You Know?: ${insights.did_you_know.join(' ')}\n\n--- Related Content ---\n${recommendations.map(r => r.text).join('\n')}`;

//     try {
//       const response = await fetch("http://localhost:8000/api/podcast", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ context }),
//       });
//       if (!response.ok) throw new Error("Server responded with an error.");
//       const data = await response.json();
//       const fullAudioUrl = `http://localhost:8000${data.audio_url}`;
//       setAudioUrl(fullAudioUrl);
//     } catch (err) {
//       setError("Could not generate the podcast.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Only render the button if there is content to generate a podcast from
//   if (!recommendations?.length > 0 || !insights) {
//     return null;
//   }

//   return (
//     <>
//       {/* Floating Microphone Button */}
//       <button
//         onClick={generatePodcast}
//         className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-transform hover:scale-110 animate-fade-in"
//         title="Generate Overall Podcast"
//       >
//         <Mic />
//       </button>

//       {/* Podcast Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md border border-slate-700 flex flex-col items-center">
//             <h3 className="text-lg font-semibold text-white mb-4">Overall Podcast</h3>
            
//             {/* Animation and Player */}
//             <div className="w-full h-24 flex items-center justify-center">
//               {isLoading && (
//                 <div className="flex items-center space-x-2">
//                   <span className="text-slate-400">Generating audio...</span>
//                   <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
// 	                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
// 	                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
//                 </div>
//               )}
//               {error && <p className="text-red-500">{error}</p>}
//               {audioUrl && (
//                 <audio controls autoPlay src={audioUrl} className="w-full">
//                   Your browser does not support the audio element.
//                 </audio>
//               )}
//             </div>
            
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="mt-6 px-4 py-2 rounded bg-slate-600 text-white hover:bg-slate-500 transition-colors w-full"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PodcastPlayer;



import React, { useState, useRef } from 'react';
import { Mic, Play, Pause, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

const PodcastPlayer = ({ contextType, contextText, disabled }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const generatePodcast = async () => {
    if (disabled) {
      toast.error(`Please generate ${contextType} first.`);
      return;
    }
    setIsLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const response = await fetch("https://avtech03-pdf-insight-backend.hf.space/api/podcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context_type: contextType, text_content: contextText }),
      });
      if (!response.ok) throw new Error("Server responded with an error.");
      const data = await response.json();
      const fullAudioUrl = `https://avtech03-pdf-insight-backend.hf.space${data.audio_url}`;
      setAudioUrl(fullAudioUrl);
      setIsPlaying(true); // Automatically play on successful generation
      toast.success("Podcast generated successfully!");
    } catch (err) {
      toast.error("Could not generate the podcast.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleStopAndReset = () => {
    if(audioRef.current) {
      audioRef.current.pause();
    }
    setAudioUrl(null);
    setIsPlaying(false);
  }

  return (
    <div className="flex items-center gap-3">
      {/* This button now acts as a STOP/RESET button after generation */}
      <button
        onClick={!audioUrl ? generatePodcast : handleStopAndReset}
        disabled={isLoading}
        className="group relative flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-full hover:bg-red-700 disabled:bg-slate-500 transition-all duration-300 focus:outline-none"
        title={!audioUrl ? `Generate Podcast for ${contextType}` : "Stop & Regenerate"}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : !audioUrl ? (
          <Mic size={20} />
        ) : (
          <RotateCcw size={20} />
        )}
      </button>

      {/* Custom Play/Pause Button */}
      {audioUrl && (
        <button
          onClick={togglePlayPause}
          className="flex items-center justify-center w-10 h-10 bg-slate-700 text-white rounded-full hover:bg-slate-600 transition-colors"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      )}

      {/* Hidden Audio Element */}
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