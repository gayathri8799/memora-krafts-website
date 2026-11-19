export default async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow','POST'); return res.status(405).json({success:false,message:'Method not allowed.'}); }
  const scriptUrl=process.env.GOOGLE_APPS_SCRIPT_URL;
  if(!scriptUrl) return res.status(500).json({success:false,message:'Server configuration is incomplete.'});
  const data=req.body||{};
  if(!String(data.fullName||'').trim()||!String(data.phone||'').trim()) return res.status(400).json({success:false,message:'Please enter your name and contact number.'});
  const clean={};
  for(const key of ['fullName','company','email','phone','eventType','quantity','budget','message']) clean[key]=String(data[key]||'').trim().slice(0,key==='message'?2000:250);
  try {
    const upstream=await fetch(scriptUrl,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:new URLSearchParams(clean).toString(),redirect:'follow'});
    const body=await upstream.text(); let result; try{result=JSON.parse(body)}catch{result=null}
    if(!upstream.ok||!result||result.success!==true){console.error('Apps Script error:',upstream.status,body.slice(0,400));return res.status(502).json({success:false,message:'Your enquiry could not be saved. Please try again later.'})}
    return res.status(200).json({success:true});
  } catch(err){console.error('Enquiry submission error:',err);return res.status(502).json({success:false,message:'Unable to connect to the enquiry database.'})}
}
