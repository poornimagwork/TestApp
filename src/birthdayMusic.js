const NOTE_FREQ = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
}

// Happy Birthday melody: [note, beats]
const MELODY = [
  ['C4', 0.75],
  ['C4', 0.25],
  ['D4', 1],
  ['C4', 1],
  ['F4', 1],
  ['E4', 2],
  ['C4', 0.75],
  ['C4', 0.25],
  ['D4', 1],
  ['C4', 1],
  ['G4', 1],
  ['F4', 2],
  ['C4', 0.75],
  ['C4', 0.25],
  ['C5', 1],
  ['A4', 1],
  ['F4', 1],
  ['E4', 1],
  ['D4', 2],
  ['A4', 0.75],
  ['A4', 0.25],
  ['F4', 1],
  ['G4', 1],
  ['F4', 2],
]

const BEAT_MS = 320

export function createBirthdayMusic() {
  let audioCtx = null
  let masterGain = null
  let playing = false
  let timerId = null
  let noteIndex = 0

  function ensureContext() {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext
      audioCtx = new Ctx()
      masterGain = audioCtx.createGain()
      masterGain.gain.value = 0.18
      masterGain.connect(audioCtx.destination)
    }
    return audioCtx
  }

  function playTone(freq, durationSec) {
    const ctx = ensureContext()
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, now)

    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.9, now + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec)

    osc.connect(gain)
    gain.connect(masterGain)
    osc.start(now)
    osc.stop(now + durationSec + 0.05)
  }

  function scheduleNext() {
    if (!playing) return

    const [note, beats] = MELODY[noteIndex]
    const durationSec = (beats * BEAT_MS) / 1000
    const freq = NOTE_FREQ[note]

    if (freq) {
      playTone(freq, durationSec * 0.92)
    }

    noteIndex = (noteIndex + 1) % MELODY.length
    timerId = window.setTimeout(scheduleNext, beats * BEAT_MS)
  }

  return {
    async play() {
      const ctx = ensureContext()
      if (ctx.state === 'suspended') {
        await ctx.resume()
      }
      if (playing) return
      playing = true
      noteIndex = 0
      scheduleNext()
    },
    stop() {
      playing = false
      if (timerId) {
        window.clearTimeout(timerId)
        timerId = null
      }
      if (masterGain && audioCtx) {
        masterGain.gain.cancelScheduledValues(audioCtx.currentTime)
        masterGain.gain.setValueAtTime(0.18, audioCtx.currentTime)
      }
    },
    isPlaying() {
      return playing
    },
  }
}
