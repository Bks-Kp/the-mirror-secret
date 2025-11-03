/* script.js - shared typing, autosave and validation logic */
const PROGRESS_KEY = 'mirror-progress';   // stores 'chapter1'..'chapter6'
const CLUE_KEY = 'mirror-found';          // optional extra clues
const FINAL_KEY = 'mirror-final';         // 'touched' or 'broken'

/* simple typewriter: writes text to elementId, then calls callback */
function typeWriter(text, elementId, speed=30, callback){
  const el = document.getElementById(elementId);
  if(!el){ if(callback) callback(); return; }
  el.innerHTML = ''; // start fresh but keep previous content if needed
  let i = 0;
  function step(){
    if(i < text.length){
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(step, speed);
    } else {
      if(callback) callback();
    }
  }
  step();
}

/* store progress helper */
function saveProgress(chapter){
  try { localStorage.setItem(PROGRESS_KEY, chapter); } catch(e){}
}

/* read progress */
function getProgress(){
  try{ return localStorage.getItem(PROGRESS_KEY); } catch(e){ return null; }
}

/* helper to normalize answers */
function normalize(s){ return (s||'').toString().trim().toLowerCase(); }

/* standard answer-checker for text inputs */
function checkTextAnswer(elementId, expected, variants, onSuccess){
  const val = normalize(document.getElementById(elementId).value);
  const ok = val === normalize(expected) || (Array.isArray(variants) && variants.includes(val));
  if(ok){
    if(typeof onSuccess === 'string') location.href = onSuccess;
    else if(typeof onSuccess === 'function') onSuccess();
  } else {
    flash('The mirror remains silent. Try again.');
  }
}

/* small temporary flash message */
function flash(msg, duration=1200){
  const f = document.createElement('div');
  f.textContent = msg;
  Object.assign(f.style,{position:'fixed',left:'50%',top:'12%',transform:'translateX(-50%)',background:'rgba(0,0,0,0.7)',color:'var(--muted)',padding:'8px 12px',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'8px',zIndex:1200});
  document.body.appendChild(f);
  setTimeout(()=>f.remove(), duration);
}

/* helper to accept prefix match (for Chapter 3) */
function checkPrefixAnswer(elementId, prefix, onSuccess){
  const val = normalize(document.getElementById(elementId).value);
  if(val.startsWith(normalize(prefix))){
    if(typeof onSuccess === 'string') location.href = onSuccess;
    else if(typeof onSuccess === 'function') onSuccess();
  } else {
    flash('That does not match the memory. Try again.');
  }
}

/* On final choices for chapter6 */
function finalize(choice){
  try{ localStorage.setItem(FINAL_KEY, choice); }catch(e){}
  if(choice === 'touched'){
    // show final message and remain
    const msg = document.getElementById('final-msg');
    if(msg) msg.innerHTML = `<strong style="color:var(--accent-red)">The mirror names him: Bharath.</strong><br>For Kalpana — from Bharath.`;
    flash('The Heart was always there.');
  } else {
    const msg = document.getElementById('final-msg');
    if(msg) msg.innerHTML = `<strong style="color:var(--accent-red)">The mirror shatters; the whisper dims.</strong>`;
    flash('You broke the memory.');
  }
}

/* Utility: go to next chapter by number */
function goToChapter(n){
  const target = `chapter${n}.html`;
  saveProgress(`chapter${n}`);
  location.href = target;
}
