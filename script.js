const IMG = Object.fromEntries(Array.from({length:12},(_,i)=>{const n=String(i+1).padStart(2,'0');return [n,`assets/hamper-${n}.jpg`]}));
const hampers = [
 ['01','Festive Copper Hamper','festive','Festive'],['02','Executive Diary Hamper','corporate','Corporate'],
 ['03','Executive Carry Hamper','corporate','Corporate'],['04','Executive Gift Hamper','corporate','Corporate'],
 ['05','Personalised Welcome Kit','welcome','Welcome Kit'],['06','Festive Celebration Hamper','festive','Festive'],
 ['07','Mugs & Greens Hamper','corporate','Corporate'],['08','Modern Gentleman Hamper','corporate','Corporate'],
 ['09','Cozy Comfort Hamper','corporate','Corporate'],['10','Welcome to the Family','welcome','Welcome Kit'],
 ['11','Personalised Welcome Hamper','welcome','Welcome Kit'],['12','Festive Gourmet Hamper','gourmet','Gourmet']
];
const grid=document.getElementById('grid');
hampers.forEach(([n,t,c,l])=>{const el=document.createElement('article');el.className='card reveal';el.dataset.cat=c;el.innerHTML=`<div class="img"><img src="${IMG[n]}" alt="${t}" loading="lazy"><span class="cat">${l}</span></div><div class="info"><h3>${t}</h3><a href="#quote" data-h="${t}">Enquire →</a></div>`;grid.appendChild(el)});
function applyFilter(f){document.querySelectorAll('#filters button').forEach(b=>b.classList.toggle('on',b.dataset.f===f));document.querySelectorAll('.card').forEach(c=>c.classList.toggle('hide',f!=='all'&&c.dataset.cat!==f))}
document.getElementById('filters')?.addEventListener('click',e=>{if(e.target.dataset.f)applyFilter(e.target.dataset.f)});
document.querySelectorAll('.coll').forEach(c=>c.addEventListener('click',()=>{applyFilter(c.dataset.filter);document.getElementById('gallery').scrollIntoView({behavior:'smooth'})}));
const lb=document.getElementById('lb'),lbi=lb?.querySelector('img');
grid?.addEventListener('click',e=>{const img=e.target.closest('.img');if(img&&lbi){lbi.src=img.querySelector('img').src;lb.classList.add('on')}const a=e.target.closest('a[data-h]');if(a){const msg=document.querySelector('[name="msg"]');if(msg)msg.value='I am interested in: '+a.dataset.h}});
lb?.addEventListener('click',()=>lb.classList.remove('on'));document.addEventListener('keydown',e=>{if(e.key==='Escape')lb?.classList.remove('on')});
const menu=document.getElementById('menu');document.getElementById('menuBtn')?.addEventListener('click',()=>menu?.classList.toggle('open'));menu?.addEventListener('click',()=>menu.classList.remove('open'));
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Website enquiry: save through Vercel API and show confirmation; no automatic WhatsApp redirect.
const form=document.getElementById('form');
if(form){form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const button=form.querySelector('button[type="submit"]'),note=form.querySelector('.note'),original=button.textContent;const f=Object.fromEntries(new FormData(form).entries());const payload={fullName:f.name,company:f.company,phone:f.phone,email:f.email,eventType:f.type,quantity:f.qty,budget:f.budget,message:f.msg};button.disabled=true;button.textContent='Submitting...';note.textContent='Submitting your enquiry securely...';note.setAttribute('role','status');note.setAttribute('aria-live','polite');try{const response=await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const result=await response.json().catch(()=>({}));if(!response.ok||result.success!==true)throw new Error(result.message||'Submission failed');form.reset();note.textContent='Thank you for contacting Memora Krafts! Your enquiry has been received successfully. Our team will contact you shortly.';note.style.color='#247443'}catch(err){console.error('Enquiry submission error:',err);note.textContent='We could not submit your enquiry right now. Please try again or contact us using the WhatsApp button.';note.style.color='#a12626'}finally{button.disabled=false;button.textContent=original}})}
document.addEventListener('error',e=>{if(e.target.tagName==='IMG')e.target.style.opacity=0},true);
