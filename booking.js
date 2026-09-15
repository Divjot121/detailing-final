const prices = { Gold: { Interior: 130, Full: 160 }, Titanium: { Interior: 170, Full: 200 } };
const packageSelect = document.querySelector('#package');
const typeSelect = document.querySelector('#serviceType');
const priceOutput = document.querySelector('#selectedPrice');
const params = new URLSearchParams(location.search);
if (prices[params.get('package')]) packageSelect.value = params.get('package');
if (prices[packageSelect.value][params.get('type')]) typeSelect.value = params.get('type');
function updatePrice(){ const p=packageSelect.value, t=typeSelect.value; priceOutput.textContent = `${p} ${t} — $${prices[p][t]}`; }
packageSelect.addEventListener('change', updatePrice); typeSelect.addEventListener('change', updatePrice); updatePrice();
const form = document.querySelector('#bookingForm');
function clearErrors(){ form.querySelectorAll('.field-error').forEach(el => el.remove()); form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid')); }
form.addEventListener('submit', function(event){
  event.preventDefault(); clearErrors();
  const invalid = [...this.querySelectorAll('input[required], select[required]')].filter(input => !input.checkValidity());
  if(invalid.length){
    const first = invalid[0]; first.setAttribute('aria-invalid', 'true');
    const note = document.createElement('small'); note.className='field-error';
    note.textContent = first.type === 'radio' ? 'Please choose Mobile or Shop.' : 'This field is required.';
    (first.closest('.radio-field') || first.parentElement).append(note);
    first.focus(); return;
  }
  const button=document.querySelector('#submitButton'); button.disabled=true; button.textContent='Request sent'; this.hidden=true; document.querySelector('#success').hidden=false; window.scrollTo({top:0,behavior:'smooth'});
});
