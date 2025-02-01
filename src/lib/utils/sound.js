export const playSound = (type) => {
  const audio = new Audio()
  
  switch(type) {
    case "click":
      audio.src = "/sounds/click.mp3"
      break
    default:
      return
  }

  audio.play().catch(err => console.log("Audio playback failed:", err))
} 