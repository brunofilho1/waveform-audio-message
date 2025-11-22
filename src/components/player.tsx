/* eslint-disable react-hooks/refs */
import { useWavesurfer } from '@wavesurfer/react'
import Hover from 'wavesurfer.js/dist/plugins/hover'
import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { PauseIcon, PlayIcon } from 'lucide-react'

export function Player({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const gradientRef = useRef<CanvasGradient | null>(null)
  const progressRef = useRef<CanvasGradient | null>(null)

  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  // Gradiente do waveform
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (!ctx) return

      const gradient = ctx.createLinearGradient(0, 0, 0, 150)
      gradient.addColorStop(0, 'rgb(200, 200, 200)')
      gradient.addColorStop(0.7, 'rgb(100, 100, 100)')
      gradient.addColorStop(1, 'rgb(0, 0, 0)')
      gradientRef.current = gradient

      const progress = ctx.createLinearGradient(0, 0, 0, 150)
      progress.addColorStop(0, 'rgb(255, 185, 0)')
      progress.addColorStop(0.7, 'rgb(255, 120, 0)')
      progress.addColorStop(1, 'rgb(255, 40, 0)')
      progressRef.current = progress
    }
  }, [])

  function formatTime(value: number, forceMs = false): string {
    if (!Number.isFinite(value) || value < 0) return '0:00'

    const totalSeconds = forceMs
      ? Math.floor(value / 1000)
      : value > 1000 // se maior que 1000, provavelmente é ms
        ? Math.floor(value / 1000)
        : Math.floor(value) // caso contrário, é seconds float

    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Wavesurfer
  const { wavesurfer, currentTime } = useWavesurfer({
    hideScrollbar: true,
    container: containerRef,
    height: 40,
    autoplay: false,
    waveColor: gradientRef.current || 'white',
    progressColor: progressRef.current || 'blue',
    barWidth: 1,
    barGap: 1,
    barRadius: 10,
    url: src,
    plugins: useMemo(
      () => [
        Hover.create({
          lineColor: '#ff0000',
          lineWidth: 2,
          labelBackground: '#555',
          labelColor: '#fff',
          labelSize: '11px',
        }),
      ],
      []
    ),
  })

  const onPlayPause = useCallback(() => {
    if (!wavesurfer) return
    wavesurfer.playPause()
    setIsPlaying((prev) => !prev)
  }, [wavesurfer])

  useEffect(() => {
    if (!wavesurfer) return

    const handleFinish = () => setIsPlaying(false)
    wavesurfer.on('finish', handleFinish)

    return () => {
      wavesurfer.un('finish', handleFinish)
    }
  }, [wavesurfer])

  return (
    <div className="flex w-full items-center gap-1 text-white">
      <button
        onClick={onPlayPause}
        className="transition mb-5 bg-white/10 hover:bg-white/5 cursor-pointer rounded-md flex items-center justify-center w-8 h-8 shrink-0 text-white"
      >
        {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
      </button>

      <div className="flex flex-1 flex-col gap-1">
        <div>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <div ref={containerRef} className="w-full" />
        </div>

        <div className="flex w-full items-center justify-between gap-2 text-xs">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(wavesurfer?.getDuration() as number)}</span>
        </div>
      </div>
    </div>
  )
}