// 1. SEARCH - اردو + عربی دونوں میں سرچ کرے
document.getElementById('search').addEventListener('input', function(e){
  let term = e.target.value.trim().toLowerCase();
  let cards = document.querySelectorAll('.card');
  
  cards.forEach(card=>{
    let text = card.innerText.toLowerCase();
    if(text.includes(term) || term === ''){
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// 2. PWA INSTALL BUTTON
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// جب App انسٹال ہونے کے قابل ہو
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); 
  deferredPrompt = e; 
  installBtn.style.display = 'block'; // بٹن شو کر دیں
});

// جب یوزر بٹن پر کلک کرے
installBtn.addEventListener('click', async () => {
  if (deferredPrompt) { 
    deferredPrompt.prompt(); 
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    deferredPrompt = null; 
    installBtn.style.display = 'none'; 
  }
});

// اگر پہلے سے انسٹال ہے تو بٹن چھپا دیں
window.addEventListener('appinstalled', () => {
  installBtn.style.display = 'none';
  console.log('PWA was installed');
  deferredPrompt = null;
});

// 3. SERVICE WORKER REGISTER
if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('SW Registered: ', reg))
    .catch(err => console.log('SW Error: ', err));
  });
}
