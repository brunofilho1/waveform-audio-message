import { GithubIcon, SparklesIcon } from 'lucide-react';
import { Player } from './components/player';

export default function App() {
  return (
    <div className="min-w-screen min-h-screen pt-10 bg-linear-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-2 mb-6">
            <SparklesIcon className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Open Source</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Audio Player
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Um player de áudio moderno, elegante e totalmente customizável para seus projetos React
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <a 
              href="https://github.com/brunofilho1/waveform-audio-message" 
              className="flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              <GithubIcon className="w-5 h-5" />
              Ver no GitHub
            </a>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-10">          
          <div className="bg-linear-to-br from-purple-900/50 via-blue-900/50 to-indigo-900/50 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/10 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold">A</span>
              </div>
              <div className="">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm p-4 border border-white/10">
                  <p className="text-gray-200">Oi! Escuta essa música que eu gravei 🎵</p>
                </div>
                <span className="text-xs text-gray-500 ml-3 mt-1 block">14:32</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold">A</span>
              </div>
              <div className="w-[300px]">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm p-4 border border-white/10">
                  <Player src="/audio.mp3" />
                </div>
                <span className="text-xs text-gray-500 ml-3 mt-1 block">14:33</span>
              </div>
            </div>

            <div className="flex items-end gap-3 justify-end">
              <div className="flex-1">
                <div className="bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl rounded-tr-sm p-4 border border-purple-500/30 ml-auto max-w-md">
                  <p className="text-white">Que legal! Adorei o player também, muito bonito! 😍</p>
                </div>
                <span className="text-xs text-gray-500 mr-3 mt-1 block text-right">14:35</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold">B</span>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
}