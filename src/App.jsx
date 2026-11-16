import './App.css'

const confetti = Array.from({ length: 24 }, (_, i) => i)

const friends = [
  {
    name: 'Puppy',
    wish: 'Woof! Extra belly rubs and birthday treats for you!',
    color: '#d4a574',
    animal: 'puppy',
  },
  {
    name: 'Lion',
    wish: 'Roar! May your day be brave, bold, and full of joy!',
    color: '#e8a838',
    animal: 'lion',
  },
  {
    name: 'Panda',
    wish: 'Happy birthday! Hope it is as sweet as bamboo cake.',
    color: '#5c5c5c',
    animal: 'panda',
  },
  {
    name: 'Elephant',
    wish: 'A trunkful of hugs and big birthday wishes!',
    color: '#8fa4b8',
    animal: 'elephant',
  },
]

function AnimalFace({ type, color }) {
  if (type === 'puppy') {
    return (
      <svg viewBox="0 0 80 80" className="friend__face" aria-hidden="true">
        <ellipse cx="22" cy="28" rx="12" ry="16" fill={color} />
        <ellipse cx="58" cy="28" rx="12" ry="16" fill={color} />
        <circle cx="40" cy="44" r="26" fill={color} />
        <circle cx="40" cy="48" r="14" fill="#f3d5b5" />
        <circle cx="32" cy="40" r="3.5" fill="#2a1520" />
        <circle cx="48" cy="40" r="3.5" fill="#2a1520" />
        <ellipse cx="40" cy="48" rx="4" ry="3" fill="#2a1520" />
        <path d="M36 54 Q40 58 44 54" fill="none" stroke="#2a1520" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'lion') {
    return (
      <svg viewBox="0 0 80 80" className="friend__face" aria-hidden="true">
        <circle cx="40" cy="42" r="30" fill="#d4892a" />
        <circle cx="40" cy="44" r="20" fill={color} />
        <circle cx="33" cy="40" r="3.2" fill="#2a1520" />
        <circle cx="47" cy="40" r="3.2" fill="#2a1520" />
        <ellipse cx="40" cy="48" rx="4" ry="3" fill="#8b4513" />
        <path d="M34 54 Q40 59 46 54" fill="none" stroke="#8b4513" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'panda') {
    return (
      <svg viewBox="0 0 80 80" className="friend__face" aria-hidden="true">
        <circle cx="18" cy="22" r="12" fill="#2a1520" />
        <circle cx="62" cy="22" r="12" fill="#2a1520" />
        <circle cx="40" cy="44" r="26" fill="#f5f5f5" />
        <ellipse cx="30" cy="42" rx="9" ry="10" fill="#2a1520" />
        <ellipse cx="50" cy="42" rx="9" ry="10" fill="#2a1520" />
        <circle cx="30" cy="42" r="3" fill="#fff" />
        <circle cx="50" cy="42" r="3" fill="#fff" />
        <ellipse cx="40" cy="52" rx="5" ry="4" fill="#2a1520" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 80 80" className="friend__face" aria-hidden="true">
      <ellipse cx="18" cy="28" rx="8" ry="14" fill={color} />
      <ellipse cx="62" cy="28" rx="8" ry="14" fill={color} />
      <circle cx="40" cy="44" r="26" fill={color} />
      <circle cx="32" cy="40" r="3.5" fill="#2a1520" />
      <circle cx="48" cy="40" r="3.5" fill="#2a1520" />
      <ellipse cx="40" cy="50" rx="7" ry="5" fill="#6d8090" />
      <path d="M34 56 Q40 60 46 56" fill="none" stroke="#2a1520" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function App() {
  return (
    <main className="party">
      <div className="party__glow" aria-hidden="true" />
      <div className="party__balloon party__balloon--one" aria-hidden="true" />
      <div className="party__balloon party__balloon--two" aria-hidden="true" />
      <div className="party__balloon party__balloon--three" aria-hidden="true" />

      <div className="party__confetti" aria-hidden="true">
        {confetti.map((piece) => (
          <span
            key={piece}
            className={`party__piece party__piece--${(piece % 5) + 1}`}
            style={{
              left: `${(piece * 4.1) % 100}%`,
              animationDelay: `${(piece % 10) * 0.35}s`,
              animationDuration: `${6 + (piece % 5)}s`,
            }}
          />
        ))}
      </div>

      <section className="party__stage">
        <p className="party__eyebrow">Today is yours</p>
        <h1 className="party__title">
          <span className="party__line">Happy Birthday</span>
          <span className="party__emphasis">My Son</span>
        </h1>
        <p className="party__message">
          Your animal friends gathered to celebrate you today.
        </p>
      </section>

      <section className="friends" aria-label="Birthday wishes from animals">
        <h2 className="friends__heading">Wishes from your animal friends</h2>
        <ul className="friends__list">
          {friends.map((friend, index) => (
            <li
              key={friend.name}
              className="friend"
              style={{ animationDelay: `${0.55 + index * 0.12}s` }}
            >
              <AnimalFace type={friend.animal} color={friend.color} />
              <div className="friend__wish">
                <p className="friend__name">{friend.name}</p>
                <p className="friend__text">{friend.wish}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
