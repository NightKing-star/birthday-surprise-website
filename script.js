const musicButton = document.querySelector('#musicButton');
const musicLabel = document.querySelector('#musicLabel');
let musicOn = false, audioContext, timer;

function playTune() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const notes = [261.63, 329.63, 392.0, 523.25, 493.88, 392.0, 329.63, 261.63];
  let index = 0;
  const playNote = () => {
    const oscillator = audioContext.createOscillator(), gain = audioContext.createGain();
    oscillator.type = 'sine'; oscillator.frequency.value = notes[index++ % notes.length];
    gain.gain.setValueAtTime(.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.10, audioContext.currentTime + .03);
    gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + .48);
    oscillator.connect(gain).connect(audioContext.destination); oscillator.start(); oscillator.stop(audioContext.currentTime + .5);
  };
  playNote(); timer = setInterval(playNote, 520);
}
function stopTune() { clearInterval(timer); audioContext?.close(); }
musicButton.addEventListener('click', () => { musicOn = !musicOn; musicOn ? playTune() : stopTune(); musicButton.setAttribute('aria-pressed', musicOn); musicLabel.textContent = musicOn ? 'Pause the tune' : 'Play a little tune'; });

document.querySelector('#scrollButton').addEventListener('click', () => document.querySelector('#surprise').scrollIntoView({behavior:'smooth'}));
const canvas = document.querySelector('#confetti');
function hearts() { for(let i=0;i<15;i++){ const heart=document.createElement('span'); heart.className='heart'; heart.textContent=['♥','♡','✦'][i%3]; heart.style.left=`${Math.random()*100}%`; heart.style.fontSize=`${15+Math.random()*18}px`; heart.style.animationDuration=`${5+Math.random()*5}s`; heart.style.animationDelay=`${Math.random()*2}s`; canvas.append(heart); setTimeout(()=>heart.remove(),11000); } }
function confetti(){ const colors=['#ff5c9f','#ffd364','#ffffff','#ac5cc9','#77d7cf']; for(let i=0;i<85;i++){const p=document.createElement('i');p.className='confetti-piece';p.style.left=`${Math.random()*100}%`;p.style.background=colors[i%colors.length];p.style.transform=`rotate(${Math.random()*180}deg)`;p.style.animationDelay=`${Math.random()*.65}s`;canvas.append(p);setTimeout(()=>p.remove(),3700);} }
hearts(); setInterval(hearts, 8500);
document.querySelector('#revealButton').addEventListener('click', () => { document.querySelector('#giftCard').classList.add('revealed'); confetti(); });
