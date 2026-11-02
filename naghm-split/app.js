const C={v:'#5B405D',p:'#F4EEE7',r:'#D9A6A1',o:'#A8B5A0',g:'#C79B5B',i:'#202026',p2:'#EBE2D8'};
const ar=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
const money=n=>ar(n.toLocaleString('en-US'))+' ر.س';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// ---------- store (local, per device) ----------
const mem={};
const store={get(k,d){try{const v=localStorage.getItem('naghm_'+k);return v?JSON.parse(v):d}catch(e){return k in mem?mem[k]:d}},
  set(k,v){mem[k]=v;try{localStorage.setItem('naghm_'+k,JSON.stringify(v))}catch(e){}}};

// ---------- data ----------
const CATS=[
 {k:'رسم',bg:C.r,ic:'<path d="M4 20c4 0 5-3 5-5a3 3 0 0 1 3-3l7-7a2 2 0 0 0-3-3l-7 7a3 3 0 0 1-3 3c-2 0-2 5-2 8z"/>'},
 {k:'غناء',bg:'#d8cfe0',ic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'},
 {k:'عزف',bg:C.o,ic:'<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'},
 {k:'خط',bg:'#ecd9b8',ic:'<path d="M3 17c3-1 5-6 9-6s4 4 9 2"/><path d="M14 4l3 3"/>',l:'خط عربي'},
 {k:'تصوير',bg:'#e3d6d0',ic:'<rect x="3" y="7" width="18" height="13" rx="3"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7l1.5-3h5L16 7"/>'},
];
const PK={
 'رسم':[['درس رسم فردي','ساعة واحدة · الأدوات متوفرة',1],['باقة ٤ دروس','درس أسبوعيًا لمدة شهر',3.4],['ورشة جماعية','٣ ساعات · السعر للشخص',.7]],
 'غناء':[['درس تدريب صوت','ساعة واحدة',1],['باقة ٤ دروس','تنفّس، مقامات، أداء',3.4],['ورشة جماعية','ساعتين · السعر للشخص',.6]],
 'عزف':[['درس عزف فردي','ساعة واحدة',1],['باقة ٨ دروس','درسين أسبوعيًا لمدة شهر',6.4],['ورشة جماعية','ساعتين · السعر للشخص',.6]],
 'خط':[['درس خط فردي','ساعة واحدة · القصب والحبر علينا',1],['باقة ٤ دروس','أساسيات الحرف لمدة شهر',3.4],['ورشة جماعية','٣ ساعات · السعر للشخص',.7]],
 'تصوير':[['درس تصوير فردي','ساعة ونص · تطبيق عملي',1],['باقة ٤ دروس','من الأساسيات للتعديل',3.4],['ورشة تصوير خارجية','٣ ساعات · السعر للشخص',.6]],
};
const AGES=['نفسي','طفلي (٦–١٢)','ابني/بنتي (١٣–١٧)'];
const LEVELS=['مبتدئ من الصفر','عندي أساسيات','متقدم'];
const MODES=[['artist','عند المدرّب'],['me','في موقعي'],['online','أونلاين']];
const A=[
 {n:'ليان العتيبي',cat:'عزف',spec:'مدرّبة عود',city:'الرياض',area:'حي الملقا',rate:4.9,rev:128,price:300,yrs:9,col:C.r,fg:C.v,bio:'أعزف العود منذ تسع سنوات، وأبدأ مع كل طالب من الأغنية التي يحبها. دروسي للمبتدئين من الصفر، وللي يبون يطورون أسلوبهم.'},
 {n:'سلمان القحطاني',cat:'رسم',spec:'مدرّب رسم تجريدي',city:'جدة',area:'حي الشاطئ',rate:4.8,rev:96,price:250,yrs:12,col:C.v,fg:C.p,bio:'أرسم البحر كما أسمعه. مرسمي قريب من الكورنيش، ودروسي مناسبة لمن يريد أن يجرّب اللون بلا خوف، حتى لو ما رسم من قبل.'},
 {n:'عبدالله السبيعي',cat:'خط',spec:'مدرّب خط ثلث ونسخ',city:'الرياض',area:'حي السفارات',rate:4.9,rev:74,price:200,yrs:15,col:C.i,fg:C.g,bio:'حاصل على إجازة في خط الثلث. أعلّم أساسيات القصبة والحبر خطوة خطوة، من رسم الحرف إلى أول لوحة كاملة.'},
 {n:'نورة الحربي',cat:'رسم',spec:'مدرّبة ألوان مائية',city:'المدينة المنورة',area:'حي قباء',rate:4.7,rev:51,price:220,yrs:6,col:C.o,fg:C.v,bio:'أرسم النباتات والضوء بالألوان المائية. دروسي هادئة ومناسبة للكبار والصغار من عمر ٨ سنوات.'},
 {n:'ريم الشمري',cat:'رسم',spec:'مدرّبة رسم بورتريه',city:'الدمام',area:'حي الشاطئ',rate:4.8,rev:63,price:280,yrs:8,col:C.g,fg:C.i,bio:'أدرّس رسم الوجوه بالفحم والزيت: النسب، الظل والنور، وبناء الملامح.'},
 {n:'فهد الدوسري',cat:'غناء',spec:'مدرّب غناء وتلحين',city:'الخبر',area:'حي العقربية',rate:4.9,rev:140,price:450,yrs:11,col:C.v,fg:C.r,bio:'أدرّب على الغناء الخليجي والحديث: التنفّس، طبقات الصوت، وأساسيات التلحين.'},
 {n:'مها الزهراني',cat:'غناء',spec:'مدرّبة صوت',city:'أبها',area:'حي المنسك',rate:4.8,rev:88,price:400,yrs:7,col:C.r,fg:C.i,bio:'تدريب صوت للمبتدئات: التنفّس الصحيح، الثقة في الأداء، وحماية الصوت.'},
 {n:'تركي المطيري',cat:'عزف',spec:'مدرّب بيانو',city:'جدة',area:'حي الروضة',rate:4.7,rev:45,price:350,yrs:10,col:C.o,fg:C.i,bio:'أدرّس البيانو الكلاسيكي والموسيقى العربية المعاصرة، من عمر ٧ سنوات وفوق.'},
 {n:'سارة الغامدي',cat:'تصوير',spec:'مدرّبة تصوير فني',city:'الرياض',area:'حي النرجس',rate:4.8,rev:102,price:500,yrs:8,col:'#d8cfe0',fg:C.v,bio:'أعلّم التصوير بالضوء الطبيعي: التكوين، قراءة الضوء، والتعديل بعد التصوير.'},
 {n:'خالد العنزي',cat:'غناء',spec:'مدرّب إنشاد ومقامات',city:'الرياض',area:'حي العليا',rate:4.6,rev:39,price:380,yrs:5,col:C.g,fg:C.v,bio:'أعلّم المقامات العربية وأساسيات الإنشاد بطريقة سهلة وممتعة.'},
 {n:'جود الشهري',cat:'خط',spec:'مدرّبة خط ديواني',city:'جدة',area:'حي السلامة',rate:4.9,rev:57,price:230,yrs:6,col:'#ecd9b8',fg:C.v,bio:'أدرّس الخط الديواني للمبتدئين، وأعلّم كتابة الأسماء والعبارات على الورق والخشب.'},
 {n:'ماجد الحربي',cat:'تصوير',spec:'مدرّب تصوير بالجوال',city:'الدمام',area:'حي الفيصلية',rate:4.7,rev:66,price:450,yrs:9,col:C.i,fg:C.r,bio:'أعلّمك تطلع صور احترافية من جوالك: الإعدادات، التكوين، والتعديل.'},
];
A.forEach((a,i)=>a.id=i);
const CITIES=['كل المناطق',...new Set(A.map(a=>a.city))];
const REVS=[['أم فيصل','سجلت لبنتي وصارت تنتظر الدرس كل أسبوع.'],['محمد','بديت من الصفر وبعد شهر صرت أطبق لحالي.'],['هند','صبور ويشرح بطريقة سهلة جدًا.'],['عبدالرحمن','الدرس منظم وكل مرة أطلع بشي جديد.'],['لمى','أول مرة أجرب، وطلعت بشي أفتخر فيه.']];
const TIMES=['10:00 ص','12:00 م','2:00 م','4:00 م','6:00 م','7:00 م','8:00 م','9:00 م'];
const DN=['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const MN=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

// ---------- art ----------
function art(a,k=0,h=300){const s=(a.id*7+k*13)%5,c=[C.v,C.r,C.o,C.g,C.p,C.i];const bg=c[(a.id+k)%4],f1=c[(a.id+k+1)%4],f2=c[(a.id+k+2)%4];
 let g='';
 if(a.cat==='عزف'||a.cat==='غناء'){g=Array.from({length:9},(_,j)=>{const hh=30+((j*37+a.id*11+k*5)%90);return `<rect x="${70+j*30}" y="${150-hh/2}" width="12" height="${hh}" rx="6" fill="${C.p}" opacity="${j%3?.75:1}"/>`}).join('')+`<circle cx="${320-k*40}" cy="60" r="34" fill="${f1}"/>`}
 else if(a.cat==='خط'){g=`<circle cx="200" cy="150" r="96" fill="none" stroke="${f1}" stroke-dasharray="3 8"/><path d="M130 130 C 130 220, 270 220, 270 130" fill="none" stroke="${bg===C.i?C.p:C.i}" stroke-width="18" stroke-linecap="round"/><circle cx="200" cy="${88+k*6}" r="11" fill="${f2}"/>`}
 else if(a.cat==='تصوير'){g=`<rect x="70" y="60" width="160" height="180" fill="${C.p}" opacity=".9"/><circle cx="150" cy="140" r="44" fill="${f1}"/><rect x="250" y="90" width="90" height="120" fill="${f2}" opacity=".85"/><path d="M70 240 L150 170 L230 240Z" fill="${bg}" opacity=".6"/>`}
 else g=[`<circle cx="270" cy="110" r="70" fill="${f1}"/><circle cx="130" cy="210" r="46" fill="${f2}" opacity=".9"/><path d="M0 230 C 120 150 260 300 400 200 L400 300 L0 300Z" fill="${C.p}" opacity=".35"/>`,
   `<rect x="50" y="50" width="160" height="200" fill="${f1}"/><rect x="225" y="50" width="120" height="90" fill="${f2}"/><rect x="225" y="155" width="120" height="95" fill="${C.p}" opacity=".7"/><circle cx="130" cy="150" r="40" fill="${C.p}" opacity=".8"/>`,
   Array.from({length:6},(_,j)=>`<path d="M-10 ${80+j*35} Q 100 ${40+j*35} 200 ${80+j*35} T 410 ${80+j*35}" fill="none" stroke="${j%2?f1:C.p}" stroke-width="${3+j}" opacity=".7"/>`).join('')][(s+k)%3];
 return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="${bg}"/>${g}</svg>`}
const I={
 pin:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
 star:'<svg width="12" height="12" viewBox="0 0 24 24" fill="#C79B5B"><path d="M12 2l3 6.6 7 .7-5.3 4.8 1.6 7L12 17.5 5.7 21l1.6-7L2 9.3l7-.7z"/></svg>',
 back:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>',
 search:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7a6f7c" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
 heart:(on)=>`<svg width="20" height="20" viewBox="0 0 24 24" fill="${on?C.r:'none'}" stroke="${on?C.r:C.i}" stroke-width="2"><path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/></svg>`,
 chev:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"/></svg>',
};
const logo=`<svg width="34" height="34" viewBox="0 0 44 44"><circle cx="22" cy="22" r="20" fill="none" stroke="#5B405D" stroke-width="1.4" stroke-dasharray="2 4"/><circle cx="22" cy="22" r="14" fill="#5B405D"/><path d="M14 23 q2-6 4 0 t4 0 t4 0 t4 0" fill="none" stroke="#F4EEE7" stroke-width="1.6" stroke-linecap="round"/></svg>`;

// ================= ADMIN DASHBOARD =================
const hidden=new Set(store.get('hidden',[]));
const priceOv=store.get('priceOv',{});
Object.entries(priceOv).forEach(([i,p])=>{if(A[i])A[i].price=p});
store.get('extraA',[]).forEach(x=>{x.id=A.length;A.push(x)});
const DEMO_NAMES=['نوف القحطاني','عبدالعزيز الشهري','ريما العتيبي','يوسف المالكي','هيا الدوسري','بدر الغامدي','جنى الحربي','سلطان العمري','لطيفة الزهراني','مشاري السبيعي','غلا الشمري','عمر الأحمدي'];
function demoBookings(){let d=store.get('demo_bk4',null);if(d)return d;d=[];const now=new Date();now.setHours(0,0,0,0);
 for(let k=0;k<34;k++){const a=A[(k*5+3)%12],pk=(k*7)%3,day=+now+((k*11)%26-10)*864e5,p=PK[a.cat][pk];
  d.push({code:'NGM-'+(70000+k*977).toString(36).toUpperCase().slice(-5),aid:a.id,pkg:p[0],day,time:(k*3)%8,where:k%4===0?'أونلاين (مكالمة فيديو)':'عند المدرّب — '+a.area+'، '+a.city,level:LEVELS[k%3],cost:Math.round(a.price*p[2]),
   status:day<+now?(k%5===0?'x':'c'):(k%3===0?'c':k%7===0?'x':'w'),name:DEMO_NAMES[k%12],phone:'05'+String(51234567+(k%12)*3172839).slice(0,8),at:Math.min(Date.now()-((k*k+k*3)%14)*864e5-3600e3,day-864e5),demo:true})}
 store.set('demo_bk4',d);return d}
let DB=demoBookings();
const allBk=()=>[...S.bookings.map(b=>({...b,name:b.name||S.user.name||'متدرّب',phone:b.phone||S.user.phone||'',mine:true})),...DB].sort((a,b)=>b.at-a.at);
function setStatus(code,st){let b=S.bookings.find(x=>x.code===code);if(b){b.status=st;store.set('bookings',S.bookings)}else{b=DB.find(x=>x.code===code);if(b){b.status=st;store.set('demo_bk4',DB)}}
 toast(st==='c'?'تم تأكيد الحجز':'تم إلغاء الحجز');render()}
let AD={tab:'overview',bf:'all',bq:''};
const ST={w:'بانتظار التأكيد',c:'مؤكد',x:'ملغي'};

function bars(rows,unit){const mx=Math.max(1,...rows.map(r=>r[1]));
 return `<div class="bars">${rows.map(([l,v])=>`<div class="br" tabindex="0"><span class="bl">${l}</span><span class="bt"><i style="width:${v/mx*100}%"></i></span><b>${unit?money(v):ar(v)}</b><em class="tip">${l}: ${unit?money(v):ar(v)+' حجز'}</em></div>`).join('')}</div>`}
function trend(list){const now=new Date();now.setHours(0,0,0,0);const days=[];for(let k=13;k>=0;k--)days.push(+now-k*864e5);
 const cnt=days.map(d=>list.filter(b=>{const a=new Date(b.at);a.setHours(0,0,0,0);return +a===d}).length);const mx=Math.max(1,...cnt);
 return `<div class="cols">${days.map((d,k)=>{const dt=new Date(d);return `<div class="cl" tabindex="0"><i style="height:${Math.max(3,cnt[k]/mx*100)}%"></i><span>${ar(dt.getDate())}</span><em class="tip">${fmtDay(d)}: ${ar(cnt[k])} طلب</em></div>`}).join('')}</div>`}

function admin(){const L=allBk(),act=L.filter(b=>b.status!=='x');
 const rev=L.filter(b=>b.status==='c').reduce((t,b)=>t+b.cost,0),pend=L.filter(b=>b.status==='w');
 const tabs=[['overview','نظرة عامة'],['bookings','الحجوزات'],['trainers','المدرّبون'],['trainees','المتدرّبون']];
 let body='';
 if(AD.tab==='overview'){
  const byCat=CATS.map(c=>[catName(c.k),act.filter(b=>A[b.aid].cat===c.k).length]).sort((a,b)=>b[1]-a[1]);
  const byCity=CITIES.slice(1).map(c=>[c,act.filter(b=>A[b.aid].city===c).length]).sort((a,b)=>b[1]-a[1]);
  const topT=A.map(a=>[a.n,L.filter(b=>b.aid===a.id&&b.status==='c').reduce((t,b)=>t+b.cost,0)]).sort((a,b)=>b[1]-a[1]).slice(0,5);
  body=`<div class="kgrid">
   <div class="kc"><span>إجمالي الحجوزات</span><b>${ar(L.length)}</b><small>${ar(L.filter(b=>b.status==='x').length)} ملغي</small></div>
   <div class="kc warn"><span>بانتظار التأكيد</span><b>${ar(pend.length)}</b><small>${pend.length?'<button class="linkb" onclick="AD.tab=\'bookings\';AD.bf=\'w\';render()">راجعها الآن ←</button>':'كل شي مؤكد'}</small></div>
   <div class="kc"><span>الإيرادات المؤكدة</span><b>${money(rev)}</b><small>من ${ar(L.filter(b=>b.status==='c').length)} حجز مؤكد</small></div>
   <div class="kc"><span>المدرّبون النشطون</span><b>${ar(A.length-hidden.size)}</b><small>من ${ar(A.length)} مدرّب</small></div>
  </div>
  <div class="dgrid">
   <div class="panel"><h3>طلبات الحجز — آخر ١٤ يوم</h3><div class="pb">${trend(L)}</div></div>
   <div class="panel"><h3>الحجوزات حسب الفن</h3><div class="pb">${bars(byCat)}</div></div>
   <div class="panel"><h3>الحجوزات حسب المدينة</h3><div class="pb">${bars(byCity)}</div></div>
   <div class="panel"><h3>أعلى المدرّبين إيرادًا</h3><div class="pb">${bars(topT,1)}</div></div>
  </div>
  <div class="panel"><h3>أحدث الطلبات <button class="btn sm" onclick="AD.tab='bookings';AD.bf='all';render()">كل الحجوزات</button></h3>${bkTable(L.slice(0,5))}</div>`}
 else if(AD.tab==='bookings'){
  const q=AD.bq.trim();const l=L.filter(b=>(AD.bf==='all'||b.status===AD.bf)&&(!q||(b.code+b.name+A[b.aid].n).includes(q)));
  body=`<div class="toolbar"><input class="field" style="max-width:300px" placeholder="ابحث برقم الحجز أو الاسم" value="${esc(AD.bq)}" oninput="AD.bq=this.value;document.getElementById('bkt').innerHTML=bkTable(allBk().filter(b=>(AD.bf==='all'||b.status===AD.bf)&&(!AD.bq.trim()||(b.code+b.name+A[b.aid].n).includes(AD.bq.trim()))))">
   <div class="tabs" style="margin:0">${[['all','الكل'],['w','بانتظار التأكيد'],['c','مؤكد'],['x','ملغي']].map(([k,t])=>`<button class="${AD.bf===k?'on':''}" onclick="AD.bf='${k}';render()">${t} (${ar(k==='all'?L.length:L.filter(b=>b.status===k).length)})</button>`).join('')}</div></div>
  <div class="panel" id="bkt">${bkTable(l)}</div>`}
 else if(AD.tab==='trainers'){
  body=`<div class="toolbar"><p class="pr">المدرّب المخفي ما يظهر للزوار في الدليل ولا الرئيسية.</p><button class="btn primary" onclick="addTrainer()">+ إضافة مدرّب</button></div>
  <div class="panel"><table class="tbl"><thead><tr><th>المدرّب</th><th>الفن</th><th>المنطقة</th><th>سعر الدرس</th><th>التقييم</th><th>الحجوزات</th><th>الحالة</th><th></th></tr></thead><tbody>
  ${A.map(a=>{const n=L.filter(b=>b.aid===a.id&&b.status!=='x').length,h=hidden.has(a.id);return `<tr style="${h?'opacity:.55':''}"><td data-l="المدرّب"><div style="display:flex;gap:10px;align-items:center"><div class="av" style="width:34px;height:34px;font-size:14px;background:${a.col};color:${a.fg}">${a.n[0]}</div><div><b>${esc(a.n)}</b><br><span class="pr">${esc(a.spec)}</span></div></div></td>
   <td data-l="الفن">${catName(a.cat)}</td><td data-l="المنطقة">${esc(a.city)}<br><span class="pr">${esc(a.area)}</span></td>
   <td data-l="سعر الدرس"><span style="display:inline-flex;align-items:center;gap:4px"><input class="field" type="number" min="50" step="10" value="${a.price}" style="width:86px;padding:5px 8px" onchange="setPrice(${a.id},this.value)"> ر.س</span></td>
   <td data-l="التقييم">${ar(a.rate)} ★</td><td data-l="الحجوزات">${ar(n)}</td>
   <td data-l="الحالة"><span class="st ${h?'x':'c'}">${h?'مخفي':'ظاهر'}</span></td>
   <td data-l=""><span style="display:flex;gap:6px"><button class="btn sm" onclick="go('artist-${a.id}')">الملف</button><button class="btn sm ${h?'':'danger'}" onclick="toggleHide(${a.id})">${h?'إظهار':'إخفاء'}</button></span></td></tr>`}).join('')}</tbody></table></div>`}
 else{
  const map={};L.forEach(b=>{const k=b.phone||b.name;if(!map[k])map[k]={name:b.name,phone:b.phone,n:0,spent:0,last:0,cats:new Set(),mine:b.mine};const m=map[k];if(b.status!=='x'){m.n++;m.spent+=b.cost}m.last=Math.max(m.last,b.day);m.cats.add(A[b.aid].cat)});
  if(S.user.reg&&!map[S.user.phone])map[S.user.phone]={name:S.user.name,phone:S.user.phone,n:0,spent:0,last:0,cats:new Set(S.user.ints),mine:true};
  const tr=Object.values(map).sort((a,b)=>b.spent-a.spent);
  body=`<div class="kgrid"><div class="kc"><span>عدد المتدرّبين</span><b>${ar(tr.length)}</b></div><div class="kc"><span>متوسط الإنفاق</span><b>${money(Math.round(tr.reduce((t,x)=>t+x.spent,0)/Math.max(1,tr.length)))}</b></div><div class="kc"><span>متدرّبين بأكثر من حجز</span><b>${ar(tr.filter(x=>x.n>1).length)}</b></div></div>
  <div class="panel"><table class="tbl"><thead><tr><th>المتدرّب</th><th>الجوال</th><th>الفنون</th><th>الحجوزات</th><th>الإنفاق</th><th>آخر موعد</th></tr></thead><tbody>
  ${tr.map(x=>`<tr><td data-l="المتدرّب"><b>${esc(x.name)}</b>${x.mine?' <span class="tag">هذا الجهاز</span>':''}</td><td data-l="الجوال"><span class="mono">${esc(x.phone)}</span></td><td data-l="الفنون">${[...x.cats].map(catName).join('، ')}</td><td data-l="الحجوزات">${ar(x.n)}</td><td data-l="الإنفاق">${money(x.spent)}</td><td data-l="آخر موعد">${x.last?fmtDay(x.last):'—'}</td></tr>`).join('')}</tbody></table></div>`}
 return `<section class="hero sm"><div class="crumb">نغم · لوحة التحكم</div><h1>لوحة التحكم</h1><p>تابع الحجوزات والمدرّبين والمتدرّبين، وأدِر المنصة من مكان واحد.</p>
  <div class="hstep">${tabs.map(([k,t])=>`<div class="${AD.tab===k?'on':''}" style="cursor:pointer" onclick="AD.tab='${k}';render()">${t}${k==='bookings'&&pend.length?` <span>${ar(pend.length)}</span>`:''}</div>`).join('')}</div></section>
 <div class="notice" style="margin-top:16px"><b>وضع المعاينة:</b> الأرقام تشمل حجوزات تجريبية للعرض، وحجوزاتك من هذا الجهاز. التعديلات تُحفظ على هذا الجهاز فقط.</div>
 ${body}`}
function bkTable(l){if(!l.length)return `<div class="empty" style="border:none">ما فيه حجوزات بهالفلتر.</div>`;
 return `<table class="tbl"><thead><tr><th>رقم الحجز</th><th>المتدرّب</th><th>المدرّب</th><th>الدرس</th><th>الموعد</th><th>المبلغ</th><th>الحالة</th><th>الإجراء</th></tr></thead><tbody>
 ${l.map(b=>{const a=A[b.aid];return `<tr><td data-l="رقم الحجز"><span class="mono">${b.code}</span>${b.mine?'<br><span class="tag">هذا الجهاز</span>':''}</td><td data-l="المتدرّب">${esc(b.name)}<br><span class="mono">${esc(b.phone)}</span></td><td data-l="المدرّب">${esc(a.n)}<br><span class="pr">${catName(a.cat)} · ${esc(a.city)}</span></td><td data-l="الدرس">${b.pkg}<br><span class="pr">${b.level||''}</span></td><td data-l="الموعد">${fmtDay(b.day)}<br><span class="pr">${TIMES[b.time]}</span></td><td data-l="المبلغ">${money(b.cost)}</td><td data-l="الحالة"><span class="st ${b.status}">${ST[b.status]}</span></td>
 <td data-l="الإجراء"><span style="display:flex;gap:6px">${b.status==='w'?`<button class="btn primary sm" onclick="setStatus('${b.code}','c')">تأكيد</button>`:''}${b.status!=='x'?`<button class="btn danger sm" onclick="setStatus('${b.code}','x')">إلغاء</button>`:`<button class="btn sm" onclick="setStatus('${b.code}','w')">استرجاع</button>`}</span></td></tr>`}).join('')}</tbody></table>`}
function toggleHide(id){hidden.has(id)?hidden.delete(id):hidden.add(id);store.set('hidden',[...hidden]);toast(hidden.has(id)?'تم إخفاء المدرّب':'تم إظهار المدرّب');render()}
function setPrice(id,v){v=Math.max(50,Math.round(+v||0));A[id].price=v;priceOv[id]=v;store.set('priceOv',priceOv);toast('تم تحديث السعر')}
function addTrainer(){dlg(`<div class="pb"><h3>إضافة مدرّب</h3><div class="frm" style="margin-top:12px">
 <div class="full"><label class="f-lbl">الاسم</label><input class="field" id="tN"></div>
 <div><label class="f-lbl">الفن</label>${sel('tC',CATS.map(c=>[c.k,catName(c.k)]),'رسم','')}</div>
 <div><label class="f-lbl">التخصص</label><input class="field" id="tS" placeholder="مثال: مدرّبة عود"></div>
 <div><label class="f-lbl">المدينة</label>${sel('tR',CITIES.slice(1).map(c=>[c,c]),CITIES[1],'')}</div>
 <div><label class="f-lbl">الحي</label><input class="field" id="tA" placeholder="حي ..."></div>
 <div><label class="f-lbl">سعر الدرس الفردي</label><input class="field" id="tP" type="number" value="250" min="50" step="10"></div>
 <div><label class="f-lbl">سنوات الخبرة</label><input class="field" id="tY" type="number" value="3" min="0"></div>
 <div class="full"><label class="f-lbl">نبذة</label><textarea class="field" id="tB" rows="2"></textarea></div></div><div class="err" id="tE"></div></div>
 <div class="actions"><button class="btn" onclick="closeDlg()">إلغاء</button><button class="btn primary" onclick="saveTrainer()">إضافة</button></div>`)}
function saveTrainer(){const n=$('tN').value.trim(),sp=$('tS').value.trim(),ar_=$('tA').value.trim();
 if(!n||!sp||!ar_)return $('tE').textContent='اكتب الاسم والتخصص والحي';
 const cols=[[C.r,C.v],[C.o,C.i],[C.g,C.i],[C.v,C.p]],c=cols[A.length%4];
 const x={n,cat:$('tC').value,spec:sp,city:$('tR').value,area:ar_.startsWith('حي')?ar_:'حي '+ar_,rate:5,rev:0,price:Math.max(50,+$('tP').value||250),yrs:+$('tY').value||0,col:c[0],fg:c[1],bio:$('tB').value.trim()||'مدرّب جديد في نغم.',online:true,kids:false};
 const ex=store.get('extraA',[]);ex.push(x);store.set('extraA',ex);x.id=A.length;A.push(x);closeDlg();toast('تمت إضافة '+n);render()}

// ---------- extra data ----------
A.forEach(a=>{a.online=a.id%3!==1;a.kids=[0,2,3,7,10].includes(a.id)});
const CATCOL={'رسم':C.r,'غناء':'#b9a3c0','عزف':C.o,'خط':C.g,'تصوير':'#cdb3a8'};
const catName=k=>k==='خط'?'خط عربي':k;
const avatar=a=>{const p=MEDIA[a.id]&&MEDIA[a.id].photo;return p?`<div class="av ph" style="background:${a.col}"><img src="${p}" alt="${esc(a.n)}"></div>`:`<div class="av" style="background:${a.col};color:${a.fg}">${a.n[0]}</div>`};
const catIcon=(k,col=C.v,s=20)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${col}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${CATS.find(c=>c.k===k).ic}</svg>`;
const PRICES=[['all','كل الأسعار'],['lo','أقل من ٢٥٠ ر.س'],['mid','٢٥٠ – ٣٩٩ ر.س'],['hi','٤٠٠ ر.س وأكثر']];
const MODEF=[['all','حضوري وأونلاين'],['in','حضوري فقط'],['online','يتوفر أونلاين']];
const SORTS=[['rate','الأعلى تقييمًا'],['low','الأقل سعرًا'],['high','الأعلى سعرًا'],['exp','الأكثر خبرة']];

// ---------- state ----------
let S={city:store.get('city','كل المناطق'),cat:'all',q:'',sort:'rate',price:'all',mode:'all',kids:false,
 favs:store.get('favs',[]),bookings:store.get('bookings',[]),user:store.get('user',{name:'',phone:''}),bt:'up'};
let B=null;
const $=id=>document.getElementById(id);
function toast(m){const t=$('toast');t.textContent=m;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),2400)}
function go(h){if(location.hash==='#'+h)render();else location.hash=h}
addEventListener('hashchange',render);
const upcoming=()=>S.bookings.filter(b=>b.status!=='x'&&b.day>=Date.now()-864e5);
const minPrice=a=>Math.min(...PK[a.cat].map(p=>Math.round(a.price*p[2])));
function fmtDay(t){const d=new Date(t);return `${DN[d.getDay()]} ${ar(d.getDate())} ${MN[d.getMonth()]}`}

// ---------- filtering ----------
function filtered(){const q=S.q.trim();
 let l=A.filter(a=>!hidden.has(a.id)&&(S.city==='كل المناطق'||a.city===S.city)&&(S.cat==='all'||a.cat===S.cat)
  &&(!q||(a.n+a.spec+catName(a.cat)+a.area+a.city).includes(q))
  &&(S.price==='all'||(S.price==='lo'?a.price<250:S.price==='mid'?a.price>=250&&a.price<400:a.price>=400))
  &&(S.mode==='all'||(S.mode==='online'?a.online:true))
  &&(!S.kids||a.kids));
 const f={rate:(a,b)=>b.rate-a.rate||b.rev-a.rev,low:(a,b)=>a.price-b.price,high:(a,b)=>b.price-a.price,exp:(a,b)=>b.yrs-a.yrs}[S.sort];
 return l.sort(f)}
const countFor=k=>A.filter(a=>!hidden.has(a.id)&&(S.city==='كل المناطق'||a.city===S.city)&&(k==='all'||a.cat===k)).length;

// ---------- components ----------
function card(a){const fav=S.favs.includes(a.id);
 return `<article class="card"><div class="cov" onclick="go('artist-${a.id}')">${art(a)}${avatar(a)}<button class="fav" aria-label="مفضلة" onclick="event.stopPropagation();toggleFav(${a.id},this)">${I.heart(fav)}</button></div><div class="bd">
  <div class="ch" style="margin-bottom:4px"><div style="flex:1;min-width:0"><h3>${a.n}</h3><p>${a.spec}</p></div></div>
  <div class="tags"><span class="tag">${catIcon(a.cat,'#4a3f50',13)}${catName(a.cat)}</span><span class="tag">${I.pin}${a.city} · ${a.area}</span>${a.online?'<span class="tag ok">أونلاين متاح</span>':''}${a.kids?'<span class="tag dash">مناسب للأطفال</span>':''}</div>
  <div class="stats"><span>${I.star} <b>${ar(a.rate)}</b> (${ar(a.rev)})</span><span><b>${ar(a.yrs)}</b> سنوات خبرة</span><span><b>${ar(a.rev*3+17)}</b> طالب</span></div>
 </div><div class="ft"><span class="pr">الدرس من <b>${money(minPrice(a))}</b></span>
  <span style="display:flex;gap:6px"><button class="btn sm" onclick="go('artist-${a.id}')">الملف</button><button class="btn primary sm" onclick="startBook(${a.id},0)">احجز درس</button></span></div></article>`}
function sel(id,opts,val,on){return `<select class="field" id="${id}" onchange="${on}">${opts.map(([v,l])=>`<option value="${v}"${v===val?' selected':''}>${l}</option>`).join('')}</select>`}
const cityOpts=()=>CITIES.map(c=>[c,c]);
const catOpts=()=>[['all','كل الفنون'],...CATS.map(c=>[c.k,catName(c.k)])];

// ---------- screens ----------
function home(){
 const top=A.filter(a=>!hidden.has(a.id)).sort((a,b)=>b.rate-a.rate||b.rev-a.rev).slice(0,3);
 const sg=S.user.reg?A.filter(a=>!hidden.has(a.id)&&S.user.ints.includes(a.cat)&&(S.city==='كل المناطق'||a.city===S.city)).slice(0,3):[];
 const bars=Array.from({length:11},(_,j)=>`<rect class="pulse" x="${150+j*19}" y="${200-((j*37)%70)}" width="8" height="${100+((j*37)%70)*2}" rx="4" fill="#F4EEE7" style="animation-delay:-${(j*.37)%2.4}s"/>`).join('');
 return `<section class="home-hero"><div>
  <div class="crumb">نغم · منصة تعلّم الفنون</div>
  <h1>تعلّم الفن اللي <em>يحرّكك</em></h1>
  <p>رسم، غناء، عزف، خط عربي وتصوير — مع مدرّبين قريبين منك، حضوريًا أو أونلاين.</p>
  <div class="hsearch" style="margin-top:22px"><input class="field q" id="hq" placeholder="وش تبي تتعلم؟ (مثال: عود، بورتريه، ديواني)">
   ${sel('hc',catOpts(),S.cat,'')}${sel('hr',cityOpts(),S.city,'')}
   <button class="btn primary" onclick="S.q=$('hq').value;S.cat=$('hc').value;setCity($('hr').value,true);go('explore')">ابحث عن مدرّب</button></div>
  <div class="kpis"><div><b>${ar(A.length)}</b>مدرّب</div><div><b>${ar(CATS.length)}</b>فنون</div><div><b>${ar(CITIES.length-1)}</b>مدن</div><div><b>${ar(4.8)} ★</b>متوسط التقييم</div></div></div>
  <div class="hart"><svg viewBox="0 0 500 500" aria-hidden="true">
   <g class="spin"><circle cx="250" cy="250" r="232" fill="none" stroke="#5B405D" stroke-width="1.2" stroke-dasharray="3 9" opacity=".5"/></g>
   <circle cx="250" cy="250" r="190" fill="#5B405D"/>
   <circle cx="345" cy="160" r="78" fill="#D9A6A1"/><circle cx="160" cy="350" r="56" fill="#A8B5A0"/>
   <path d="M90 300 C 170 200, 270 340, 410 230" fill="none" stroke="#C79B5B" stroke-width="5" stroke-linecap="round"/>
   ${bars}
   <circle cx="400" cy="390" r="14" fill="#C79B5B"/><circle cx="95" cy="130" r="8" fill="#5B405D"/>
   <text x="250" y="470" text-anchor="middle" font-family="Noto Kufi Arabic" font-size="22" fill="#5B405D" opacity=".7">مساحة تُرى وتُسمع</text>
  </svg></div></section>

 <div class="sec"><div><h2>اختر فنّك</h2><p>كل فن له مدرّبين ينتظرونك</p></div></div>
 <div class="tiles">${CATS.map((c,i)=>`<button class="tile" onclick="S.cat='${c.k}';go('explore')">${art({id:([1,0,2,3,0][i]-i+8)%4,cat:c.k},i)}<div class="lb"><div><b>${catName(c.k)}</b><br><small>${['لوحات، ألوان، بورتريه','تدريب صوت ومقامات','عود، بيانو، وأكثر','ثلث، نسخ، ديواني','تصوير فني وبالجوال'][i]}</small></div><small>${ar(countFor(c.k))} مدرّب</small></div></button>`).join('')}</div>

 ${S.user.reg?`<div class="sec"><div><h2>مقترح لك</h2><p>حسب اهتماماتك: ${S.user.ints.map(catName).join('، ')}</p></div><button class="linkb" onclick="S.cat='all';go('explore')">عرض الكل</button></div>
   ${sg.length?`<div class="grid">${sg.map(card).join('')}</div>`:`<div class="empty">ما فيه مدرّبين لاهتماماتك في ${S.city} حاليًا.</div>`}`
 :''}

 <div class="sec"><div><h2>الأعلى تقييمًا</h2><p>مدرّبين أشاد فيهم طلابهم</p></div><button class="linkb" onclick="S.cat='all';go('explore')">كل المدرّبين</button></div>
 <div class="grid">${top.map(card).join('')}</div>

 <div class="sec"><div><h2>من أعمال طلاب نغم</h2><p>أول خطوة دايمًا تبدأ بدرس</p></div></div>
 <div class="mosaic">${[1,4,10,2,8,5,11,7].map((id,k)=>`<div>${art(A[id],k+2)}<span>${catName(A[id].cat)}</span></div>`).join('')}</div>

 <div class="quote"><blockquote>الفن لا يحتاج إلى ضجيج كي يصل؛<br>يحتاج مدرّبًا يسمعك، ووقتًا تمنحه لنفسك.</blockquote><small>نغم — مساحة تُرى وتُسمع</small></div>

 <div class="sec"><div><h2>كيف تحجز؟</h2></div></div>
 <div class="steps3"><div class="st3"><span>١</span><div><h4>سجّل دخولك</h4><p>بجوالك وكلمة المرور، أو أنشئ حساب جديد في دقيقة.</p></div></div>
 <div class="st3"><span>٢</span><div><h4>اختر المدرّب</h4><p>فلتر حسب الفن والمنطقة والسعر.</p></div></div>
 <div class="st3"><span>٣</span><div><h4>احجز مباشرة</h4><p>اختر الدرس والموعد وأكّد بضغطة — الدفع بعد تأكيد المدرّب.</p></div></div></div>`}

function explore(){
 const act=[];
 if(S.city!=='كل المناطق')act.push(['city',S.city]);
 if(S.price!=='all')act.push(['price',PRICES.find(p=>p[0]===S.price)[1]]);if(S.mode!=='all')act.push(['mode',MODEF.find(p=>p[0]===S.mode)[1]]);
 if(S.kids)act.push(['kids','مناسب للأطفال']);if(S.q.trim())act.push(['q','"'+esc(S.q.trim())+'"']);
 return `<section class="hero sm"><div class="crumb">نغم · دليل المدرّبين</div>
  <h1>اختر الفن، ونلقى لك مدرّبه</h1><p>فلتر حسب المنطقة وطريقة الدرس والسعر، واحجز مباشرة.</p>
  <div class="hsearch f5"><input class="field q" id="fq" placeholder="اسم المدرّب، المهارة، أو الحي" value="${esc(S.q)}" oninput="S.q=this.value;refresh()">
   ${sel('fr',cityOpts(),S.city,"setCity(this.value,true);render()")}${sel('fm',MODEF,S.mode,"S.mode=this.value;render()")}${sel('fp',PRICES,S.price,"S.price=this.value;render()")}${sel('fs',SORTS,S.sort,"S.sort=this.value;refresh()")}</div>
 </section>
 <div class="sec"><div><h2>الفنون</h2><p>اضغط على الفن عشان تفلتر</p></div></div>
 <div class="cats f6">${[['all','كل الفنون'],...CATS.map(c=>[c.k,catName(c.k)])].map(([k,l])=>`<button class="catc${S.cat===k?' on':''}" onclick="S.cat='${k}';render()"><i style="background:${k==='all'?'#e9e2ec':CATCOL[k]+'33'}">${k==='all'?`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${C.v}" stroke-width="1.7"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>`:catIcon(k)}</i><b>${l}</b><small>${ar(countFor(k))} مدرّب</small></button>`).join('')}</div>
 <div class="resbar"><div><h2>${S.cat==='all'?'كل المدرّبين':'مدرّبين '+catName(S.cat)} <span class="pr" style="font-family:var(--body)">(<span id="cN">٠</span>)</span></h2>
  <div class="active-f" style="margin-top:6px">${act.map(([k,l])=>`<span class="af">${l}<button onclick="clearF('${k}')" aria-label="إزالة">×</button></span>`).join('')}</div></div>
  <div style="display:flex;gap:12px;align-items:center"><label style="display:flex;gap:6px;align-items:center;font-size:13.5px;cursor:pointer"><input type="checkbox" ${S.kids?'checked':''} onchange="S.kids=this.checked;render()" style="accent-color:var(--accent);width:16px;height:16px"> مناسب للأطفال</label>${act.length||S.cat!=='all'?`<button class="linkb" onclick="clearF('all')">مسح الفلاتر</button>`:''}</div></div>
 <div class="grid" id="res"></div>`}
function refresh(){const l=filtered();$('res').innerHTML=l.length?l.map(card).join(''):`<div class="empty"><b>ما فيه نتائج مطابقة.</b><br>جرّب تغيّر الفن أو المنطقة، أو <button class="linkb" onclick="clearF('all')">امسح الفلاتر</button>.</div>`;$('cN').textContent=ar(l.length)}
function clearF(k){if(k==='all'||k==='cat')S.cat='all';if(k==='all'||k==='city')setCity('كل المناطق',true);if(k==='all'||k==='price')S.price='all';if(k==='all'||k==='mode')S.mode='all';if(k==='all'||k==='kids')S.kids=false;if(k==='all'||k==='q')S.q='';render()}

function artist(id){const a=A[id];if(!a)return explore();const pk=PK[a.cat];const revs=[0,1,2].map(k=>REVS[(id+k*2)%REVS.length]);
 return `<section class="hero sm"><div class="crumb" style="cursor:pointer" onclick="go('explore')">دليل المدرّبين · ${catName(a.cat)}</div>
  <div class="hid">${EDIT===id?`<label class="avup" title="تغيير الصورة">${avatar(a)}<input type="file" accept="image/*" hidden onchange="upPhoto(${id},this)"><span>${media(id).photo?'تغيير':'+ صورة'}</span></label>`:avatar(a)}<div><h1 style="margin:0">${a.n}</h1><p>${a.spec}</p></div></div>
  <div class="tags" style="margin-top:14px"><span class="tag">${catIcon(a.cat,'currentColor',13)}${catName(a.cat)}</span><span class="tag">${I.pin}${a.city} · ${a.area}</span>${a.online?'<span class="tag ok">أونلاين متاح</span>':''}${a.kids?'<span class="tag dash">مناسب للأطفال</span>':''}</div>
  <div class="kpis"><div><b>${ar(a.rate)} ★</b>${ar(a.rev)} تقييم</div><div><b>${ar(a.yrs)}</b>سنوات خبرة</div><div><b>${ar(a.rev*3+17)}</b>طالب</div><div><b>${money(minPrice(a))}</b>الدرس من</div></div>
  <div class="hero-acts"><button class="btn primary lg" onclick="startBook(${id},0)">احجز درس</button><button class="btn outline-l lg" onclick="toggleFav(${id},this)">${S.favs.includes(id)?'في المفضلة ♥':'أضف للمفضلة ♡'}</button>${EDIT===id?'':`<button class="btn lg tmode" onclick="EDIT=${id};render()">${svgI('<path d="M4 20h4L19 9l-4-4L4 16z"/>',16)} إدارة ملفي (للمدرّب)</button>`}</div>${EDIT===id&&media(id).photo?`<button class="linkb" style="margin-top:8px" onclick="delMedia(${id},'photo')">حذف الصورة الشخصية</button>`:''}
 </section>
 ${editBar(a)}<div class="prof" style="margin-top:20px"><div>
  <div class="panel"><h3>عن المدرّب</h3><div class="pb bio" style="font-size:16.5px">${a.bio}</div></div>
  ${portfolioPanel(a)}
  <div class="panel"><h3>المنطقة</h3><div class="pb"><dl class="dl"><dt>المدينة</dt><dd>${a.city}</dd><dt>الحي</dt><dd>${a.area}</dd><dt>طريقة الدرس</dt><dd>حضوري${a.online?' أو أونلاين':''}</dd></dl></div></div>
  <div class="panel"><h3>آراء الطلاب <span class="pr">${I.star} ${ar(a.rate)} من ${ar(a.rev)}</span></h3><div class="pb" style="padding-top:4px;padding-bottom:4px">${revs.map(r=>`<div class="rv"><div class="h"><span>${r[0]}</span><span style="color:${C.g}">★★★★★</span></div><p>${r[1]}</p></div>`).join('')}</div></div>
 </div>
 <aside class="side"><div class="panel"><h3>الدروس المتاحة</h3><div class="pb">
  ${pk.map((p,k)=>`<button class="pkg" onclick="startBook(${id},${k})"><div><h4>${p[0]}</h4><small>${p[1]}</small></div><span class="p">${money(Math.round(a.price*p[2]))}</span></button>`).join('')}
  <button class="btn primary block lg" style="margin-top:6px" onclick="startBook(${id},0)">احجز درس</button>
  <p class="pr" style="margin-top:10px;text-align:center">الدفع بعد تأكيد المدرّب · إلغاء مجاني قبل ٢٤ ساعة</p></div></div></aside></div>
 <div class="mbar"><span class="pr">من<br><b>${money(minPrice(a))}</b></span><button class="btn primary lg" onclick="startBook(${id},0)">احجز درس</button></div>`}

// ---------- booking ----------
function days(){const o=[];for(let k=1;k<=14;k++){const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()+k);o.push(d)}return o}
const busy=(a,d,t)=>((a*3+d.getDate()*5+t*7)%9)<2;
const newB=(id,pk)=>({id,pk,day:null,time:null,level:S.user.level??null,where:'artist',addr:'',note:'',name:S.user.name||'',phone:S.user.phone||'',step:1});
function startBook(id,pk){B=newB(id,pk);go('book-'+id)}
function whereTxt(a){return B.where==='artist'?'عند المدرّب — '+a.area+'، '+a.city:B.where==='online'?'أونلاين (مكالمة فيديو)':B.addr+'، '+a.city}
function bookOld(id){const a=A[id];if(!a)return explore();if(!B||B.id!==id)B=newB(id,0);
 const p=PK[a.cat][B.pk],cost=Math.round(a.price*p[2]);
 const modes=MODES.filter(m=>m[0]!=='online'||a.online);
 const stepper=`<div class="hstep">${['الدرس والموعد','بياناتك','المراجعة والتأكيد'].map((t,k)=>`<div class="${B.step===k+1?'on':B.step>k+1?'dn':''}"><span>${B.step>k+1?'✓':ar(k+1)}</span>${t}</div>`).join('')}</div>`;
 const summary=`<div class="panel"><h3>ملخص الحجز</h3><div class="pb"><div class="ch">${avatar(a)}<div><h3 style="font-size:15px">${a.n}</h3><p>${a.spec}</p></div></div>
  <dl class="dl"><dt>الدرس</dt><dd>${p[0]}</dd><dt>التفاصيل</dt><dd>${p[1]}</dd>${B.day?`<dt>اليوم</dt><dd>${fmtDay(B.day)}</dd>`:''}${B.time!==null?`<dt>الوقت</dt><dd>${TIMES[B.time]}</dd>`:''}${B.level!==null?`<dt>المستوى</dt><dd>${LEVELS[B.level]}</dd>`:''}<dt>المكان</dt><dd>${esc(B.where==='me'&&!B.addr?'في موقعك':whereTxt(a))}</dd></dl>
  <div style="display:flex;justify-content:space-between;margin-top:12px;padding-top:12px;border-top:1px solid var(--line);font-weight:700"><span>الإجمالي</span><span style="color:var(--accent)">${money(cost)}</span></div></div></div>`;
 let body,next;
 if(B.step===1){const ds=days();
  body=`<label class="lbl">نوع الدرس</label>${PK[a.cat].map((q,k)=>`<button class="pkg${k===B.pk?' on':''}" onclick="B.pk=${k};render()"><div><h4>${q[0]}</h4><small>${q[1]}</small></div><span class="p">${money(Math.round(a.price*q[2]))}</span></button>`).join('')}
  <label class="lbl">اليوم</label><div class="opts o7">${ds.map(d=>`<button class="opt${B.day===+d?' on':''}" onclick="B.day=${+d};B.time=null;render()"><small>${DN[d.getDay()]}</small>${ar(d.getDate())} ${MN[d.getMonth()].slice(0,5)}</button>`).join('')}</div>
  <label class="lbl">الوقت</label>${B.day?`<div class="opts o4">${TIMES.map((t,k)=>`<button class="opt${B.time===k?' on':''}" ${busy(id,new Date(B.day),k)?'disabled':''} onclick="B.time=${k};render()">${t}</button>`).join('')}</div><p class="pr" style="margin-top:6px">الأوقات المشطوبة محجوزة.</p>`:'<p class="pr">اختر اليوم أولًا لعرض الأوقات المتاحة.</p>'}`;
  next=`<button class="btn primary" ${B.day&&B.time!==null?'':'disabled'} onclick="B.step=2;render();scrollTo(0,0)">التالي: بياناتك</button>`}
 else if(B.step===2){
  body=`<label class="lbl">مستواك</label><div class="opts o3">${LEVELS.map((l,k)=>`<button class="opt${B.level===k?' on':''}" onclick="B.level=${k};render()">${l}</button>`).join('')}</div>
  <label class="lbl">مكان الدرس</label><div class="opts o3">${modes.map(([k,l])=>`<button class="opt${B.where===k?' on':''}" onclick="B.where='${k}';render()">${l}<small>${k==='artist'?a.area:k==='me'?'المدرّب يجيك':'مكالمة فيديو'}</small></button>`).join('')}</div>
  ${B.where==='me'?`<input class="field" style="margin-top:8px" placeholder="الحي والشارع في ${a.city}" value="${esc(B.addr)}" oninput="B.addr=this.value">`:''}
  <label class="lbl">بيانات المتدرّب</label><div class="frm"><input class="field" placeholder="الاسم" value="${esc(B.name)}" oninput="B.name=this.value"><input class="field" placeholder="رقم الجوال 05xxxxxxxx" dir="ltr" style="text-align:right" inputmode="tel" value="${esc(B.phone)}" oninput="B.phone=this.value">
  <textarea class="field full" rows="3" placeholder="وش تبي تتعلم؟ (اختياري) — مثال: أبي أعزف أغنية معيّنة، أو الدرس لطفلي عمره ١٠ سنوات" oninput="B.note=this.value">${esc(B.note)}</textarea></div>
  <div class="err" id="err"></div>`;
  next=`<button class="btn primary" onclick="step2()">التالي: المراجعة</button>`}
 else{body=`<dl class="dl" style="gap:10px 18px"><dt>المدرّب</dt><dd>${a.n}</dd><dt>الدرس</dt><dd>${p[0]} — ${p[1]}</dd><dt>الموعد</dt><dd>${fmtDay(B.day)} · ${TIMES[B.time]}</dd><dt>المستوى</dt><dd>${LEVELS[B.level]}</dd><dt>المكان</dt><dd>${esc(whereTxt(a))}</dd><dt>الاسم</dt><dd>${esc(B.name)}</dd><dt>الجوال</dt><dd dir="ltr" style="text-align:left">${esc(B.phone)}</dd>${B.note?`<dt>هدفك</dt><dd>${esc(B.note)}</dd>`:''}</dl>
  <div class="notice" style="margin:16px 0 0">الدفع يكون بعد ما يأكد المدرّب الموعد. الإلغاء مجاني قبل الموعد بـ ٢٤ ساعة.</div>`;
  next=`<button class="btn primary" onclick="confirmBook()">تأكيد الحجز</button>`}
 const prev=B.step===1?`<button class="btn" onclick="history.back()">إلغاء</button>`:`<button class="btn" onclick="B.step--;render()">السابق</button>`;
 return `<section class="hero sm"><div class="crumb" style="cursor:pointer" onclick="go('artist-${id}')">${a.n} · حجز درس</div>
 <h1>احجز درسك مع ${a.n}</h1><p>${a.spec} · ${a.city}، ${a.area}</p>${stepper}</section>
 <div class="prof" style="margin-top:20px"><div class="panel"><div class="pb">${body}</div><div class="actions">${prev}${next}</div></div><aside class="side">${summary}</aside></div>`}
function step2(){const e=$('err'),ph=B.phone.replace(/\s/g,'');
 if(B.level===null)return e.textContent='اختر مستواك';
 if(B.where==='me'&&!B.addr.trim())return e.textContent='اكتب عنوانك عشان يوصلك المدرّب';
 if(!B.name.trim())return e.textContent='اكتب اسمك';
 if(!/^05\d{8}$/.test(ph))return e.textContent='رقم الجوال لازم يبدأ بـ 05 ويكون ١٠ أرقام';
 B.phone=ph;S.user={...S.user,name:B.name.trim(),phone:ph};store.set('user',S.user);B.step=3;render();scrollTo(0,0)}
function confirmBook(){const a=A[B.id],p=PK[a.cat][B.pk];
 const bk={code:'NGM-'+Math.random().toString(36).slice(2,7).toUpperCase(),aid:B.id,pkg:p[0],dur:p[1],day:B.day,time:B.time,where:whereTxt(a),level:LEVELS[B.level],cost:Math.round(a.price*p[2]),status:'w',note:B.note,at:Date.now()};
 S.bookings.unshift(bk);store.set('bookings',S.bookings);B=null;go('done-'+bk.code)}
function done(code){const b=S.bookings.find(x=>x.code===code);if(!b)return bookings();const a=A[b.aid];
 return `<section class="hero sm" style="text-align:center"><svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="none" stroke="${C.r}" stroke-dasharray="2 5"/><rect x="12" y="12" width="40" height="40" rx="10" fill="${C.v}"/><path d="M22 32l7 7 13-14" fill="none" stroke="${C.p}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <h1 style="margin:12px auto 4px">تم استلام طلب الحجز</h1><p style="margin:0 auto">بيتواصل معك ${a.n} لتأكيد موعد الدرس.</p><div class="code">${b.code}</div></section>
  <div style="max-width:620px;margin:20px auto 0"><div class="panel">
  <div class="pb"><dl class="dl" style="gap:10px 18px"><dt>المدرّب</dt><dd>${a.n}</dd><dt>الدرس</dt><dd>${b.pkg}</dd><dt>الموعد</dt><dd>${fmtDay(b.day)} · ${TIMES[b.time]}</dd><dt>المكان</dt><dd>${esc(b.where)}</dd><dt>الإجمالي</dt><dd style="font-weight:700;color:var(--accent)">${money(b.cost)}</dd></dl></div>
  <div class="actions"><button class="btn" onclick="go('home')">الرئيسية</button><button class="btn primary" onclick="go('bookings')">عرض حجوزاتي</button></div></div></div>`}

function bookingsPage(){const up=upcoming(),past=S.bookings.filter(b=>!up.includes(b));const l=S.bt==='up'?up:past;
 const spent=S.bookings.filter(b=>b.status!=='x').reduce((t,b)=>t+b.cost,0);
 return `<section class="hero sm"><div class="crumb">حسابي · حجوزاتي</div><h1>دروسك في مكان واحد</h1><p>تابع دروسك القادمة، وراجع السابقة.</p>
  <div class="kpis"><div><b>${ar(up.length)}</b>درس قادم</div><div><b>${ar(past.length)}</b>سابق وملغي</div><div><b>${money(spent)}</b>إجمالي الحجوزات</div></div>
  <div class="hero-acts"><button class="btn primary" onclick="go('explore')">احجز درس جديد</button></div></section>
 <div class="resbar"><div class="tabs" style="margin:0"><button class="${S.bt==='up'?'on':''}" onclick="S.bt='up';render()">القادمة</button><button class="${S.bt==='past'?'on':''}" onclick="S.bt='past';render()">السابقة والملغاة</button></div></div>
 ${l.length?l.map(b=>{const a=A[b.aid];return `<div class="bcard" style="--c:${CATCOL[a.cat]}">${avatar(a)}
  <div><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><h3 style="font-size:16px;color:var(--accent-2);cursor:pointer" onclick="go('artist-${a.id}')">${a.n}</h3><span class="st ${b.status}">${{w:'بانتظار التأكيد',c:'مؤكد',x:'ملغي'}[b.status]}</span><span class="mono">${b.code}</span></div>
   <dl class="dl"><dt>الدرس</dt><dd>${b.pkg}${b.level?' · '+b.level:''}</dd><dt>الموعد</dt><dd>${fmtDay(b.day)} · ${TIMES[b.time]}</dd><dt>المكان</dt><dd>${esc(b.where)}</dd><dt>المبلغ</dt><dd><b>${money(b.cost)}</b></dd></dl></div>
  <div style="display:flex;gap:6px">${b.status!=='x'?`<button class="btn danger sm" onclick="cancelBk('${b.code}')">إلغاء الحجز</button>`:`<button class="btn sm" onclick="startBook(${a.id},0)">احجز مرة ثانية</button>`}</div></div>`}).join('')
 :`<div class="empty"><b>${S.bt==='up'?'ما عندك دروس قادمة.':'ما فيه حجوزات سابقة.'}</b><br><button class="btn primary" style="margin-top:12px" onclick="go('explore')">تصفّح المدرّبين</button></div>`}`}
function cancelBk(code){dlg(`<div class="pb"><h3>إلغاء الحجز ${code}؟</h3><p>بيتم إبلاغ المدرّب بالإلغاء. الإلغاء مجاني قبل الموعد بـ ٢٤ ساعة.</p></div><div class="actions"><button class="btn" onclick="closeDlg()">تراجع</button><button class="btn danger-f" onclick="doCancel('${code}')">تأكيد الإلغاء</button></div>`)}
function doCancel(code){const b=S.bookings.find(x=>x.code===code);if(b)b.status='x';store.set('bookings',S.bookings);closeDlg();toast('تم إلغاء الحجز');render()}

// ---------- account / trainee registration ----------
function account(){const u=S.user,favs=S.favs.map(i=>A[i]).filter(Boolean),edit=!u.reg||S.editing;
 const form=`<div class="panel"><h3>${u.reg?'تعديل بيانات المتدرّب':'تسجيل متدرّب جديد'}</h3><div class="pb"><div class="frm">
  <div><label class="f-lbl">الاسم</label><input class="field" id="jN" value="${esc(u.name||'')}"></div>
  <div><label class="f-lbl">رقم الجوال</label><input class="field" id="jP" dir="ltr" style="text-align:right" inputmode="tel" placeholder="05xxxxxxxx" value="${esc(u.phone||'')}"></div>
  <div><label class="f-lbl">المنطقة</label>${sel('jR',CITIES.slice(1).map(c=>[c,c]),u.city||(S.city!=='كل المناطق'?S.city:CITIES[1]),'')}</div>
  <div><label class="f-lbl">التسجيل لـ</label>${sel('jA',[['','اختر'],...AGES.map((l,k)=>[String(k),l])],u.age!=null?String(u.age):'','')}</div>
  <div class="full"><label class="f-lbl">الفنون اللي تبي تتعلمها (اختر واحد أو أكثر)</label><div class="chk">${CATS.map(c=>`<label><input type="checkbox" name="ints" value="${c.k}" ${(u.ints||[]).includes(c.k)?'checked':''}>${catName(c.k)}</label>`).join('')}</div></div>
  <div class="full"><label class="f-lbl">المستوى</label><div class="chk">${LEVELS.map((l,k)=>`<label><input type="radio" name="lvl" value="${k}" ${u.level===k?'checked':''}>${l}</label>`).join('')}</div></div>
 </div><div class="err" id="jE"></div></div>
 <div class="actions">${u.reg?`<button class="btn" onclick="S.editing=false;render()">إلغاء</button>`:'<span></span>'}<button class="btn primary" onclick="saveJoin()">${u.reg?'حفظ التعديلات':'تسجيل'}</button></div></div>`;
 const prof=()=>`<div class="panel"><h3>ملف المتدرّب <button class="btn sm" onclick="S.editing=true;render()">تعديل</button></h3><div class="pb">
  <div class="ch"><div class="av" style="background:${C.v};color:${C.p}">${esc(u.name[0])}</div><div><h3>${esc(u.name)}</h3><p dir="ltr" style="text-align:right">${esc(u.phone)}</p></div></div>
  <dl class="dl" style="gap:8px 16px;margin-top:8px"><dt>المنطقة</dt><dd>${esc(u.city)}</dd><dt>التسجيل لـ</dt><dd>${AGES[u.age]}</dd><dt>المستوى</dt><dd>${LEVELS[u.level]}</dd><dt>الاهتمامات</dt><dd>${u.ints.map(catName).join('، ')}</dd></dl></div></div>`;
 return `<section class="hero sm"><div class="crumb">نغم · حسابي</div><h1>${u.reg?'أهلًا '+esc(u.name.split(' ')[0]):'سجّل كمتدرّب'}</h1><p>${u.reg?'بياناتك واهتماماتك والمدرّبين المفضلين.':'قل لنا وش تبي تتعلم ومستواك، ونقترح لك المدرّبين المناسبين في منطقتك.'}</p>
  ${u.reg?`<div class="kpis"><div><b>${ar(u.ints.length)}</b>فنون تهمك</div><div><b>${ar(upcoming().length)}</b>درس قادم</div><div><b>${ar(S.favs.length)}</b>مدرّب مفضّل</div></div>`:''}</section>
 <div class="acc-grid" style="margin-top:20px"><div>${edit?form:prof()}
  <div class="panel"><h3>الإعدادات</h3><div class="pb" style="display:flex;flex-direction:column;gap:10px">
   <div><label class="f-lbl">منطقة التصفح الافتراضية</label>${sel('sc',cityOpts(),S.city,"setCity(this.value);toast('تم تحديث المنطقة')")}</div>
   <button class="btn danger" onclick="resetAll()">مسح بياناتي من هذا الجهاز</button></div></div></div>
 <div><div class="sec" style="margin-top:0"><div><h2>المدرّبين المفضلين</h2><p>اضغط ♡ على أي مدرّب لحفظه هنا</p></div></div>
  ${favs.length?`<div class="grid" style="grid-template-columns:1fr">${favs.map(card).join('')}</div>`:`<div class="empty">ما فيه مدرّبين في المفضلة.</div>`}</div></div>`}
function saveJoin(){const n=$('jN').value.trim(),ph=$('jP').value.replace(/\s/g,''),e=$('jE');
 const ints=[...document.querySelectorAll('input[name=ints]:checked')].map(x=>x.value),lv=document.querySelector('input[name=lvl]:checked');
 if(!n)return e.textContent='اكتب الاسم';
 if(!/^05\d{8}$/.test(ph))return e.textContent='رقم الجوال لازم يبدأ بـ 05 ويكون ١٠ أرقام';
 if($('jA').value==='')return e.textContent='حدّد التسجيل لمين';
 if(!ints.length)return e.textContent='اختر فن واحد على الأقل';
 if(!lv)return e.textContent='اختر المستوى';
 const was=S.user.reg;S.user={name:n,phone:ph,city:$('jR').value,age:+$('jA').value,ints,level:+lv.value,reg:true};store.set('user',S.user);
 S.editing=false;setCity(S.user.city,true);toast(was?'تم حفظ التعديلات':'تم تسجيلك كمتدرّب');render()}
function resetAll(){dlg(`<div class="pb"><h3>مسح البيانات؟</h3><p>بيتم حذف حجوزاتك وملفك والمفضلة من هذا الجهاز.</p></div><div class="actions"><button class="btn" onclick="closeDlg()">تراجع</button><button class="btn danger-f" onclick="S.bookings=[];S.favs=[];S.user={name:'',phone:''};['bookings','favs'].forEach(k=>store.set(k,[]));store.set('user',S.user);closeDlg();toast('تم مسح البيانات');render()">مسح</button></div>`)}
function toggleFav(id,btn){const i=S.favs.indexOf(id);i>-1?S.favs.splice(i,1):S.favs.push(id);store.set('favs',S.favs);btn.innerHTML=I.heart(i<0);toast(i<0?'أُضيف للمفضلة':'أُزيل من المفضلة')}
function setCity(c,silent){S.city=c;store.set('city',c);if(!silent)render()}
function dlg(h){$('dlg').className='dlg';$('dlg').innerHTML=h;$('ov').classList.add('open')}
function closeDlg(){$('ov').classList.remove('open');LB=null}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDlg()});

// ---------- router ----------
const TABS=[['home','الرئيسية','<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>'],['explore','المدرّبون','<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'],['bookings','حجوزاتي','<rect x="4" y="5" width="16" height="16" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>'],['account','حسابي','<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>'],['admin','لوحة التحكم','<rect x="3" y="3" width="8" height="10" rx="1.5"/><rect x="13" y="3" width="8" height="6" rx="1.5"/><rect x="13" y="11" width="8" height="10" rx="1.5"/><rect x="3" y="15" width="8" height="6" rx="1.5"/>']];
function render(){const h=(location.hash||'#home').slice(1);const [r,arg]=h.split(/-(.+)/);
 let html,tab=r;
 if(r==='explore')html=explore();else if(r==='bookings')html=bookings();else if(r==='account')html=account();else if(r==='admin')html=admin();
 else if(r==='artist'){html=artist(+arg);tab='explore'}else if(r==='book'){html=book(+arg);tab='explore'}
 else if(r==='done'){html=done(arg);tab='bookings'}else{html=home();tab='home'}
 $('app').innerHTML=html;if(r==='explore')refresh();
 document.body.classList.toggle('has-mbar',r==='artist');
 const n=upcoming().length,bd=k=>k==='bookings'&&n?`<span class="badge">${ar(n)}</span>`:'';
 $('nav').innerHTML=TABS.map(([k,l])=>`<button class="${tab===k?'on':''}" onclick="go('${k}')">${l}${bd(k)}</button>`).join('');
 $('bnav').innerHTML=TABS.map(([k,l,ic])=>`<button class="${tab===k?'on':''}" onclick="go('${k}')"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ic}</svg>${l}${bd(k)}</button>`).join('');
 $('tbEnd').innerHTML=S.user.reg?`<button class="who" onclick="go('account')" style="color:inherit"><i>${esc(S.user.name[0])}</i>${esc(S.user.name.split(' ')[0])}</button>`:`<button class="btn rose sm" onclick="go('account')">تسجيل الدخول</button>`;
 if(h!==render.last)scrollTo(0,0);render.last=h}

// ================= v2: registration wizard + dashboard =================
const AGE_IC=['<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>','<circle cx="12" cy="9" r="3"/><path d="M7 21c.5-3 2.5-5 5-5s4.5 2 5 5"/><path d="M9 4.5c1-1 2-1.5 3-1.5s2 .5 3 1.5"/>','<circle cx="9" cy="8" r="3"/><circle cx="16" cy="9" r="2.5"/><path d="M3 21c.6-3.5 3-5.5 6-5.5s5.4 2 6 5.5M14 15.6c.6-.4 1.3-.6 2-.6 2.4 0 4.3 1.8 5 4.5"/>'];
const AGE_SUB=['التسجيل باسمي','من ٦ إلى ١٢ سنة','من ١٣ إلى ١٧ سنة'];
const LV_SUB=['أول مرة أجرب، وأبي أبدأ صح','أعرف الأساسيات وأبي أتطور','عندي خبرة وأبي أصقل أسلوبي'];
const ART_SUB={'رسم':'لوحات، ألوان، بورتريه','غناء':'تدريب صوت ومقامات','عزف':'عود، بيانو، وأكثر','خط':'ثلث، نسخ، ديواني','تصوير':'تصوير فني وبالجوال'};
const svgI=(p,s=22,c='currentColor')=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
let W=null;
function wizInit(){const u=S.user;W={step:1,name:u.name||'',phone:u.phone||'',city:u.city||(S.city!=='كل المناطق'?S.city:CITIES[1]),age:u.age??null,ints:[...(u.ints||[])],level:u.level??null,pass:u.pass||'',err:''}}

function wizard(){if(!W)wizInit();const st=W.step,u=S.user;
 const steps=['بياناتك','اهتماماتك','مستواك'];
 const prog=`<div class="wprog"><div class="wbar"><i style="width:${(st-1)/2*100}%"></i></div><div class="wsteps">${steps.map((t,k)=>`<div class="${st===k+1?'on':st>k+1?'dn':''}"><span>${st>k+1?'✓':ar(k+1)}</span><b>${t}</b></div>`).join('')}</div></div>`;
 let body;
 if(st===1)body=`<h2 class="wt">عرّفنا عليك</h2><p class="ws">بياناتك الأساسية عشان يتواصل معك المدرّب.</p>
  <div class="frm">
   <div><label class="f-lbl">الاسم</label><div class="ifield">${svgI('<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',18)}<input class="field" placeholder="الاسم الكامل" value="${esc(W.name)}" oninput="W.name=this.value"></div></div>
   <div><label class="f-lbl">رقم الجوال</label><div class="ifield">${svgI('<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>',18)}<input class="field" placeholder="05xxxxxxxx" dir="ltr" style="text-align:right" inputmode="tel" value="${esc(W.phone)}" oninput="W.phone=this.value"></div></div>
   <div><label class="f-lbl">كلمة المرور</label><div class="ifield">${svgI(LOCK,18)}<input class="field" type="password" placeholder="٦ أحرف أو أكثر" value="${esc(W.pass)}" oninput="W.pass=this.value"></div></div>
   <div><label class="f-lbl">المنطقة</label><div class="ifield">${svgI('<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',18)}${sel('wR',CITIES.slice(1).map(c=>[c,c]),W.city,"W.city=this.value")}</div></div>
  </div>
  <label class="f-lbl" style="margin-top:18px">التسجيل لمين؟</label>
  <div class="picks p3">${AGES.map((l,k)=>`<button class="pick${W.age===k?' on':''}" onclick="W.age=${k};render()"><i>${svgI(AGE_IC[k],24)}</i><b>${['لنفسي','لطفلي','لابني / بنتي'][k]}</b><small>${AGE_SUB[k]}</small></button>`).join('')}</div>`;
 else if(st===2)body=`<h2 class="wt">وش تبي تتعلم؟</h2><p class="ws">اختر فن واحد أو أكثر — نقترح لك المدرّبين حسب اختيارك.</p>
  <div class="arts-pick">${CATS.map((c,i)=>`<button class="ap${W.ints.includes(c.k)?' on':''}" onclick="wTog('${c.k}')"><div class="apc">${art({id:([1,0,2,3,0][i]-i+8)%4,cat:c.k},i)}</div><div class="apl"><b>${catName(c.k)}</b><small>${ART_SUB[c.k]}</small></div><span class="ck">${svgI('<path d="M5 12l5 5 9-10"/>',14)}</span></button>`).join('')}</div>
  <p class="pr" style="margin-top:10px">${W.ints.length?'اخترت: '+W.ints.map(catName).join('، '):'ما اخترت شي للحين'}</p>`;
 else body=`<h2 class="wt">وش مستواك؟</h2><p class="ws">عشان يجهّز المدرّب الدرس المناسب لك من البداية.</p>
  <div class="picks p3 lv">${LEVELS.map((l,k)=>`<button class="pick${W.level===k?' on':''}" onclick="W.level=${k};render()"><span class="meter">${[0,1,2].map(j=>`<i class="${j<=k?'f':''}"></i>`).join('')}</span><b>${l}</b><small>${LV_SUB[k]}</small></button>`).join('')}</div>
  <div class="wsum"><div><span>الاسم</span>${esc(W.name)}</div><div><span>المنطقة</span>${esc(W.city)}</div><div><span>التسجيل لـ</span>${AGES[W.age]}</div><div><span>الاهتمامات</span>${W.ints.map(catName).join('، ')}</div></div>`;
 return `<div class="wiz">${prog}<div class="wb">${body}<div class="err">${W.err}</div></div>
  <div class="actions">${st>1?`<button class="btn" onclick="W.step--;W.err='';render()">السابق</button>`:(u.reg?`<button class="btn" onclick="S.editing=false;W=null;render()">إلغاء</button>`:`<button class="btn" onclick="S.signup=false;W=null;render()">رجوع لتسجيل الدخول</button>`)}
  <button class="btn primary lg" onclick="wNext()">${st<3?'التالي':(u.reg?'حفظ التعديلات':'إنشاء الحساب')}</button></div></div>`}
function wTog(k){const i=W.ints.indexOf(k);i>-1?W.ints.splice(i,1):W.ints.push(k);W.err='';render()}
function wNext(){W.err='';
 if(W.step===1){const ph=W.phone.replace(/\s/g,'');
  if(!W.name.trim())W.err='اكتب اسمك';else if(!/^05\d{8}$/.test(ph))W.err='رقم الجوال لازم يبدأ بـ 05 ويكون ١٠ أرقام';else if((W.pass||'').length<6)W.err='كلمة المرور لازم تكون ٦ أحرف أو أكثر';else if(W.age===null)W.err='اختر التسجيل لمين';
  if(!W.err){W.phone=ph;W.step=2}}
 else if(W.step===2){if(!W.ints.length)W.err='اختر فن واحد على الأقل';else W.step=3}
 else{if(W.level===null)W.err='اختر مستواك';else{const was=S.user.reg;
  S.user={name:W.name.trim(),phone:W.phone,city:W.city,age:W.age,ints:W.ints,level:W.level,pass:W.pass,reg:true};store.set('user',S.user);store.set('acct_'+W.phone,S.user);S.signup=false;
  setCity(W.city,true);S.editing=false;S.justReg=!was;W=null;toast(was?'تم حفظ التعديلات':'تم إنشاء حسابك');if(S.after){const t=S.after;S.after=null;go(t)}else render();scrollTo(0,0);return}}
 render()}

function accountPage(){const u=S.user,favs=S.favs.map(i=>A[i]).filter(Boolean);
 if(!u.reg||S.editing)return `<div class="phead" style="justify-content:center;text-align:center"><div style="margin:0 auto"><div class="crumb" style="justify-content:center">حسابي</div><h1>${u.reg?'تعديل ملفك':'أنشئ حسابك كمتدرّب'}</h1><p style="margin:0 auto">${u.reg?'حدّث بياناتك واهتماماتك.':'ثلاث خطوات بسيطة، ونقترح لك المدرّبين المناسبين في منطقتك.'}</p></div></div>${wizard()}`;
 const sg=A.filter(a=>!hidden.has(a.id)&&u.ints.includes(a.cat)&&a.city===u.city).slice(0,3);
 return `${S.justReg?`<div class="welcome"><b>أهلًا ${esc(u.name.split(' ')[0])}، حسابك جاهز</b><span>جهّزنا لك مدرّبين يناسبون اهتماماتك تحت.</span><button onclick="S.justReg=false;render()" aria-label="إغلاق">×</button></div>`:''}
 <div class="pband"><div class="pbc">${art({id:2,cat:u.ints[0]},3)}</div>
  <div class="pbi"><div class="av big" style="background:${C.v};color:${C.p}">${esc(u.name[0])}</div>
   <div style="flex:1;min-width:0"><h1>${esc(u.name)}</h1><p><span dir="ltr">${esc(u.phone)}</span> · ${esc(u.city)}</p></div>
   <button class="btn" onclick="S.editing=true;wizInit();render()">${svgI('<path d="M4 20h4L19 9l-4-4L4 16z"/>',16)} تعديل</button></div>
  <div class="pbs"><div><span>التسجيل لـ</span><b>${AGES[u.age]}</b></div><div><span>المستوى</span><b>${LEVELS[u.level]}</b></div><div><span>دروس قادمة</span><b>${ar(upcoming().length)}</b></div><div><span>المفضلة</span><b>${ar(S.favs.length)}</b></div></div>
  <div class="pbt">${u.ints.map(k=>`<span class="tag">${catIcon(k,'#4a3f50',13)}${catName(k)}</span>`).join('')}</div></div>
 <div class="sec"><div><h2>مقترحين لك في ${esc(u.city)}</h2><p>حسب اهتماماتك ومنطقتك</p></div><button class="linkb" onclick="S.cat='all';setCity('${u.city}',true);go('explore')">عرض الكل</button></div>
 ${sg.length?`<div class="grid">${sg.map(card).join('')}</div>`:`<div class="empty">ما فيه مدرّبين لاهتماماتك في ${esc(u.city)} حاليًا — <button class="linkb" onclick="setCity('كل المناطق',true);go('explore')">تصفّح كل المناطق</button></div>`}
 <div class="sec"><div><h2>المدرّبين المفضلين</h2><p>اضغط ♡ على أي مدرّب لحفظه هنا</p></div></div>
 ${favs.length?`<div class="grid">${favs.map(card).join('')}</div>`:`<div class="empty">ما فيه مدرّبين في المفضلة.</div>`}
 <div class="sec"><div><h2>الإعدادات</h2></div></div>
 <div class="panel"><div class="pb setrow"><div><b>منطقة التصفح</b><p class="pr">المنطقة الافتراضية لعرض المدرّبين</p></div>${sel('sc',cityOpts(),S.city,"setCity(this.value);toast('تم تحديث المنطقة')").replace('class="field"','class="field" style="max-width:200px"')}</div>
  <div class="pb setrow" style="border-top:1px solid var(--line)"><div><b>تسجيل الخروج</b><p class="pr">الخروج من حسابك على هذا الجهاز</p></div><button class="btn" onclick="logoutUser('home')">تسجيل خروج</button></div>
  <div class="pb setrow" style="border-top:1px solid var(--line)"><div><b>مسح البيانات</b><p class="pr">حذف الحساب والحجوزات والمفضلة من هذا الجهاز</p></div><button class="btn danger" onclick="resetAll()">مسح</button></div></div>`}

// ---------------- dashboard ----------------
const DIC={overview:'<rect x="3" y="3" width="8" height="10" rx="1.5"/><rect x="13" y="3" width="8" height="6" rx="1.5"/><rect x="13" y="11" width="8" height="10" rx="1.5"/><rect x="3" y="15" width="8" height="6" rx="1.5"/>',
 bookings:'<rect x="4" y="5" width="16" height="16" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>',trainers:'<circle cx="9" cy="8" r="3.5"/><path d="M3 20c.6-3.6 3-5.6 6-5.6s5.4 2 6 5.6"/><path d="M16 4.5a3 3 0 0 1 0 6M18 14.6c1.8.7 3 2.6 3.4 5.4"/>',
 trainees:'<path d="M3 9l9-5 9 5-9 5z"/><path d="M7 11.5V16c0 1.5 2.5 3 5 3s5-1.5 5-3v-4.5"/>'};
function kc(ic,col,label,val,sub,cls=''){return `<div class="kc ${cls}"><i class="ki" style="background:${col}26;color:${col}">${svgI(ic,20)}</i><div><span>${label}</span><b>${val}</b><small>${sub}</small></div></div>`}
function lrow(b){const a=A[b.aid];return `<div class="lr">${avatar(a)}
 <div class="lm"><div class="l1"><b>${esc(b.name)}</b><span class="arrow">←</span><span>${esc(a.n)}</span><span class="st ${b.status}">${ST[b.status]}</span>${b.mine?'<span class="tag">هذا الجهاز</span>':''}</div>
  <div class="l2"><span>${b.pkg}</span><span>${fmtDay(b.day)} · ${TIMES[b.time]}</span><span>${catName(a.cat)} · ${esc(a.city)}</span><span class="mono">${b.code}</span></div></div>
 <div class="le"><b>${money(b.cost)}</b><span class="lacts">${b.status==='w'?`<button class="btn primary sm" onclick="setStatus('${b.code}','c')">تأكيد</button>`:''}${b.status!=='x'?`<button class="btn danger sm" onclick="setStatus('${b.code}','x')">إلغاء</button>`:`<button class="btn sm" onclick="setStatus('${b.code}','w')">استرجاع</button>`}</span></div></div>`}
function bkList(l){return l.length?`<div class="list">${l.map(lrow).join('')}</div>`:`<div class="empty" style="border:none">ما فيه حجوزات بهالفلتر.</div>`}
function bkTable(l){return bkList(l)}
function trend(list){const now=new Date();now.setHours(0,0,0,0);const days=[];for(let k=13;k>=0;k--)days.push(+now-k*864e5);
 const cnt=days.map(d=>list.filter(b=>{const a=new Date(b.at);a.setHours(0,0,0,0);return +a===d}).length);const mx=Math.max(1,...cnt),tot=cnt.reduce((a,b)=>a+b,0);
 return `<div class="trh"><b>${ar(tot)}</b> طلب خلال أسبوعين · المتوسط ${ar((tot/14).toFixed(1))} يوميًا</div>
 <div class="cols"><div class="gl" style="bottom:50%"><span>${ar(Math.round(mx/2))}</span></div><div class="gl" style="bottom:100%"><span>${ar(mx)}</span></div>${days.map((d,k)=>{const dt=new Date(d);return `<div class="cl${k===13?' today':''}" tabindex="0"><i style="height:${Math.max(2,cnt[k]/mx*100)}%"></i><span>${k%2===1||k===13?ar(dt.getDate()):''}</span><em class="tip">${fmtDay(d)}: ${ar(cnt[k])} طلب</em></div>`}).join('')}</div>`}

function adminDash(){const L=allBk(),act=L.filter(b=>b.status!=='x');
 const conf=L.filter(b=>b.status==='c'),rev=conf.reduce((t,b)=>t+b.cost,0),pend=L.filter(b=>b.status==='w').sort((a,b)=>a.day-b.day);
 const tabs=[['overview','نظرة عامة',''],['bookings','الحجوزات',pend.length],['trainers','المدرّبون',''],['trainees','المتدرّبون','']];
 const d=new Date();let body='',title=tabs.find(t=>t[0]===AD.tab)[1],act2='';
 if(AD.tab==='overview'){
  const byCat=CATS.map(c=>[catName(c.k),act.filter(b=>A[b.aid].cat===c.k).length]).sort((a,b)=>b[1]-a[1]);
  const byCity=CITIES.slice(1).map(c=>[c,act.filter(b=>A[b.aid].city===c).length]).sort((a,b)=>b[1]-a[1]);
  const topT=A.map(a=>[a.n,conf.filter(b=>b.aid===a.id).reduce((t,b)=>t+b.cost,0)]).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const rate=L.length?Math.round(conf.length/L.length*100):0;
  body=`<div class="kgrid">
   ${kc(DIC.bookings,C.v,'إجمالي الحجوزات',ar(L.length),`${ar(L.filter(b=>b.status==='x').length)} ملغي`)}
   ${kc('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>','#a8783a','بانتظار التأكيد',ar(pend.length),pend.length?'تحتاج إجراء منك':'كل شي مؤكد',pend.length?'warn':'')}
   ${kc('<path d="M4 17l5-5 4 4 7-8"/><path d="M15 8h5v5"/>','#4f6b52','الإيرادات المؤكدة',money(rev),`نسبة التأكيد ${ar(rate)}٪`)}
   ${kc(DIC.trainers,'#a0605a','المدرّبون النشطون',ar(A.length-hidden.size),`من ${ar(A.length)} مدرّب`)}</div>
  <div class="dgrid">
   <div class="panel span2"><h3>طلبات الحجز — آخر ١٤ يوم</h3><div class="pb">${trend(L)}</div></div>
   <div class="panel"><h3>تحتاج إجراء <span class="cnt">${ar(pend.length)}</span></h3>${pend.length?`<div class="queue">${pend.slice(0,4).map(b=>{const a=A[b.aid];return `<div class="q"><div><b>${esc(b.name)}</b><span>${esc(a.n)} · ${fmtDay(b.day)}</span></div><span class="qa"><button class="btn primary sm" onclick="setStatus('${b.code}','c')" aria-label="تأكيد">✓</button><button class="btn danger sm" onclick="setStatus('${b.code}','x')" aria-label="إلغاء">✕</button></span></div>`}).join('')}</div>${pend.length>4?`<div class="pb" style="padding-top:0"><button class="linkb" onclick="AD.tab='bookings';AD.bf='w';render()">عرض الكل (${ar(pend.length)}) ←</button></div>`:''}`:`<div class="pb pr">ما فيه طلبات تنتظر.</div>`}</div>
   <div class="panel"><h3>الحجوزات حسب الفن</h3><div class="pb">${bars(byCat)}</div></div>
   <div class="panel"><h3>الحجوزات حسب المدينة</h3><div class="pb">${bars(byCity)}</div></div>
   <div class="panel"><h3>أعلى المدرّبين إيرادًا</h3><div class="pb">${bars(topT,1)}</div></div>
  </div>
  <div class="panel" style="margin-top:16px"><h3>أحدث الطلبات <button class="btn sm" onclick="AD.tab='bookings';AD.bf='all';render()">كل الحجوزات</button></h3>${bkList(L.slice(0,5))}</div>`}
 else if(AD.tab==='bookings'){
  const q=AD.bq.trim(),flt=()=>allBk().filter(b=>(AD.bf==='all'||b.status===AD.bf)&&(!AD.bq.trim()||(b.code+b.name+A[b.aid].n).includes(AD.bq.trim())));
  body=`<div class="toolbar"><div class="ifield" style="flex:1;max-width:340px">${svgI('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',18)}<input class="field" placeholder="ابحث برقم الحجز أو الاسم" value="${esc(AD.bq)}" oninput="AD.bq=this.value;$('bkt').innerHTML=bkList(allBk().filter(b=>(AD.bf==='all'||b.status===AD.bf)&&(!AD.bq.trim()||(b.code+b.name+A[b.aid].n).includes(AD.bq.trim()))))"></div>
   <div class="seg2">${[['all','الكل'],['w','بانتظار التأكيد'],['c','مؤكد'],['x','ملغي']].map(([k,t])=>`<button class="${AD.bf===k?'on':''}" onclick="AD.bf='${k}';render()">${t} <em>${ar(k==='all'?L.length:L.filter(b=>b.status===k).length)}</em></button>`).join('')}</div></div>
  <div class="panel" id="bkt">${bkList(flt())}</div>`}
 else if(AD.tab==='trainers'){
  act2=`<button class="btn primary" onclick="addTrainer()">+ إضافة مدرّب</button>`;
  body=`<p class="pr" style="margin-bottom:12px">المدرّب المخفي ما يظهر للزوار في الدليل ولا الرئيسية. تقدر تعدّل سعر الدرس مباشرة.</p>
  <div class="tgrid">${A.map(a=>{const n=L.filter(b=>b.aid===a.id&&b.status!=='x').length,r=conf.filter(b=>b.aid===a.id).reduce((t,b)=>t+b.cost,0),h=hidden.has(a.id);
   return `<div class="tc${h?' off':''}"><div class="tch">${avatar(a)}<div style="flex:1;min-width:0"><b>${esc(a.n)}</b><span>${esc(a.spec)}</span></div>
    <label class="sw" title="${h?'مخفي':'ظاهر'}"><input type="checkbox" ${h?'':'checked'} onchange="toggleHide(${a.id})"><i></i></label></div>
    <div class="tcm"><span>${catName(a.cat)}</span><span>${esc(a.city)} · ${esc(a.area)}</span><span>${ar(a.rate)} ★</span></div>
    <div class="tcs"><div><span>حجوزات</span><b>${ar(n)}</b></div><div><span>إيراد</span><b>${money(r)}</b></div><div><span>سعر الدرس</span><b class="pin"><input type="number" min="50" step="10" value="${a.price}" onchange="setPrice(${a.id},this.value)" aria-label="سعر الدرس"> ر.س</b></div></div>
    <div class="tcf"><span class="st ${h?'x':'c'}">${h?'مخفي عن الزوار':'ظاهر للزوار'}</span><span style="display:flex;gap:10px"><button class="linkb" onclick="EDIT=${a.id};go('artist-${a.id}')">الصور والأعمال</button><button class="linkb" onclick="go('artist-${a.id}')">الملف ←</button></span></div></div>`}).join('')}</div>`}
 else{
  const map={};L.forEach(b=>{const k=b.phone||b.name;if(!map[k])map[k]={name:b.name,phone:b.phone,n:0,spent:0,last:0,cats:new Set(),mine:b.mine};const m=map[k];if(b.status!=='x'){m.n++;m.spent+=b.cost}m.last=Math.max(m.last,b.day);m.cats.add(A[b.aid].cat)});
  if(S.user.reg&&!map[S.user.phone])map[S.user.phone]={name:S.user.name,phone:S.user.phone,n:0,spent:0,last:0,cats:new Set(S.user.ints),mine:true};
  const tr=Object.values(map).sort((a,b)=>b.spent-a.spent);
  body=`<div class="kgrid k3">${kc(DIC.trainees,C.v,'عدد المتدرّبين',ar(tr.length),'سجّلوا حجز واحد على الأقل')}${kc('<path d="M12 3v18M17 7H9.5a3 3 0 0 0 0 6h5a3 3 0 0 1 0 6H6"/>','#4f6b52','متوسط الإنفاق',money(Math.round(tr.reduce((t,x)=>t+x.spent,0)/Math.max(1,tr.length))),'لكل متدرّب')}${kc('<path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>','#a8783a','متدرّبين عائدين',ar(tr.filter(x=>x.n>1).length),'حجزوا أكثر من مرة')}</div>
  <div class="panel"><div class="list">${tr.map((x,i)=>`<div class="lr"><div class="av" style="background:${[C.r,C.o,C.g,'#d8cfe0'][i%4]};color:${C.v}">${esc(x.name[0])}</div><div class="lm"><div class="l1"><b>${esc(x.name)}</b>${x.mine?'<span class="tag">هذا الجهاز</span>':''}${x.n>1?'<span class="st c">عائد</span>':''}</div><div class="l2"><span class="mono">${esc(x.phone)}</span><span>${[...x.cats].map(catName).join('، ')}</span><span>آخر موعد: ${x.last?fmtDay(x.last):'—'}</span></div></div><div class="le"><b>${money(x.spent)}</b><span class="pr">${ar(x.n)} حجز</span></div></div>`).join('')}</div></div>`}
 const nav=tabs.map(([k,t,c])=>`<button class="${AD.tab===k?'on':''}" onclick="AD.tab='${k}';render()">${svgI(DIC[k],19)}<span>${t}</span>${c?`<em>${ar(c)}</em>`:''}</button>`).join('');
 return `<div class="dash"><aside class="dside"><div class="dsh"><b>لوحة التحكم</b><span>إدارة منصة نغم · admin</span></div><nav class="dnav">${nav}</nav>
  <div class="dnote">وضع المعاينة: الأرقام تشمل حجوزات تجريبية، والتعديلات تُحفظ على هذا الجهاز فقط.</div></aside>
 <div class="dmain"><div class="dtop"><div><div class="crumb">لوحة التحكم</div><h1>${title}</h1><p class="pr">${DN[d.getDay()]} ${ar(d.getDate())} ${MN[d.getMonth()]} ${ar(d.getFullYear())}</p></div><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">${act2}<button class="btn sm" onclick="admLogout()">${svgI('<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 17l-5-5 5-5M5 12h11"/>',16)} تسجيل خروج</button></div></div>
  <nav class="dtabs">${nav}</nav>${body}</div></div>`}

// ================= trainer media: photo, gallery, portfolio PDF =================
const MEDIA={};          // id -> {photo:url, gallery:[{k,url}], file:{name,size,url,blob}}
const RAW={};            // id -> {photo:Blob, gallery:[{k,blob}], file:{name,size,blob}}
let EDIT=null;           // artist id in trainer-edit mode
const memDB={};
function idb(){return new Promise((res,rej)=>{try{const r=indexedDB.open('naghm_media',1);r.onupgradeneeded=()=>r.result.createObjectStore('m');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}catch(e){rej(e)}})}
async function mPut(id,val){memDB[id]=val;try{const db=await idb();await new Promise((res,rej)=>{const t=db.transaction('m','readwrite');t.objectStore('m').put(val,id);t.oncomplete=res;t.onerror=()=>rej(t.error)})}catch(e){toast('تعذّر الحفظ الدائم — الملفات بتبقى لين تقفل الصفحة')}}
async function mLoadAll(){try{const db=await idb();await new Promise(res=>{const t=db.transaction('m','readonly'),st=t.objectStore('m'),c=st.openCursor();c.onsuccess=()=>{const cur=c.result;if(cur){RAW[cur.key]=cur.value;cur.continue()}else res()};c.onerror=()=>res()})}catch(e){}
 Object.keys(RAW).forEach(id=>buildUrls(+id));render()}
function buildUrls(id){const r=RAW[id]||{},old=MEDIA[id];
 if(old){old.photo&&URL.revokeObjectURL(old.photo);(old.gallery||[]).forEach(g=>URL.revokeObjectURL(g.url));old.file&&URL.revokeObjectURL(old.file.url)}
 MEDIA[id]={photo:r.photo?URL.createObjectURL(r.photo):null,gallery:(r.gallery||[]).map(g=>({k:g.k,url:URL.createObjectURL(g.blob)})),file:r.file?{name:r.file.name,size:r.file.size,blob:r.file.blob,url:URL.createObjectURL(r.file.blob)}:null}}
const media=id=>MEDIA[id]||{photo:null,gallery:[],file:null};
function rec(id){return RAW[id]||(RAW[id]={photo:null,gallery:[],file:null})}

// resize an image file to a JPEG blob
function shrink(file,max,square){return new Promise((res,rej)=>{const img=new Image(),u=URL.createObjectURL(file);
 img.onload=()=>{let w=img.naturalWidth,h=img.naturalHeight,sx=0,sy=0,sw=w,sh=h;
  if(square){const m=Math.min(w,h);sx=(w-m)/2;sy=(h-m)/2;sw=sh=m;w=h=Math.min(m,max)}else{const s=Math.min(1,max/Math.max(w,h));w=Math.round(w*s);h=Math.round(h*s)}
  const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,sx,sy,sw,sh,0,0,w,h);URL.revokeObjectURL(u);
  c.toBlob(b=>b?res(b):rej(new Error('encode')),'image/jpeg',.85)};
 img.onerror=()=>{URL.revokeObjectURL(u);rej(new Error('bad image'))};img.src=u})}

async function upPhoto(id,input){const f=input.files[0];input.value='';if(!f)return;
 if(!f.type.startsWith('image/'))return toast('اختر صورة (JPG أو PNG)');
 try{const b=await shrink(f,480,true);rec(id).photo=b;await mPut(id,RAW[id]);buildUrls(id);toast('تم تحديث الصورة الشخصية');render()}catch(e){toast('تعذّر قراءة الصورة')}}
async function upGallery(id,files){files=[...files].filter(f=>f.type.startsWith('image/'));if(!files.length)return toast('اختر صور (JPG أو PNG)');
 const r=rec(id);if(r.gallery.length+files.length>12){toast('الحد الأقصى ١٢ صورة');files=files.slice(0,Math.max(0,12-r.gallery.length))}
 toast('جاري رفع '+ar(files.length)+' صورة…');
 for(const f of files){try{r.gallery.push({k:Date.now()+Math.random(),blob:await shrink(f,1600,false)})}catch(e){}}
 await mPut(id,r);buildUrls(id);toast('تمت إضافة الصور');render()}
async function upFile(id,input){const f=input.files[0];input.value='';if(!f)return;
 if(f.type!=='application/pdf'&&!/\.pdf$/i.test(f.name))return toast('ملف الأعمال لازم يكون PDF');
 if(f.size>25e6)return toast('حجم الملف أكبر من ٢٥ ميجا');
 rec(id).file={name:f.name,size:f.size,blob:f};await mPut(id,RAW[id]);buildUrls(id);toast('تم رفع ملف الأعمال');render()}
async function delMedia(id,what,k){const r=rec(id);if(what==='photo')r.photo=null;else if(what==='file')r.file=null;else r.gallery=r.gallery.filter(g=>g.k!==k);
 await mPut(id,r);buildUrls(id);toast('تم الحذف');render()}
function dropZone(e,id){e.preventDefault();e.currentTarget.classList.remove('drag');const fs=e.dataTransfer.files;if(!fs.length)return;
 const pdf=[...fs].find(f=>f.type==='application/pdf');if(pdf){upFile(id,{files:[pdf],value:''})}else upGallery(id,fs)}
const fsize=n=>n>1e6?ar((n/1e6).toFixed(1))+' ميجا':ar(Math.max(1,Math.round(n/1e3)))+' ك.ب';

// lightbox
let LB=null;
function openLB(id,i){LB={id,i};drawLB()}
function drawLB(){const g=media(LB.id).gallery;if(!g.length){closeDlg();return}LB.i=(LB.i+g.length)%g.length;
 $('dlg').className='dlg lb';$('dlg').innerHTML=`<div class="lbw"><img src="${g[LB.i].url}" alt="عمل ${ar(LB.i+1)} من ${ar(g.length)}">
 ${g.length>1?`<button class="lbn nx" onclick="LB.i--;drawLB()" aria-label="السابق">›</button><button class="lbn pv" onclick="LB.i++;drawLB()" aria-label="التالي">‹</button>`:''}
 <button class="lbx" onclick="closeLB()" aria-label="إغلاق">×</button><span class="lbc">${ar(LB.i+1)} / ${ar(g.length)}</span></div>`;$('ov').classList.add('open')}
function closeLB(){LB=null;closeDlg();$('dlg').className='dlg'}
document.addEventListener('keydown',e=>{if(!LB)return;if(e.key==='ArrowLeft'){LB.i++;drawLB()}if(e.key==='ArrowRight'){LB.i--;drawLB()}if(e.key==='Escape')closeLB()});

// PDF viewer (pdf.js from cdnjs, rendered to canvases in-page)
const PDFJS='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
let pdfLib=null;
function loadPdfJs(){if(pdfLib)return Promise.resolve(pdfLib);return new Promise((res,rej)=>{const s=document.createElement('script');s.src=PDFJS+'pdf.min.js';
 s.onload=()=>{pdfLib=window.pdfjsLib;pdfLib.GlobalWorkerOptions.workerSrc=PDFJS+'pdf.worker.min.js';res(pdfLib)};s.onerror=()=>rej(new Error('load'));document.head.appendChild(s)})}
async function viewPdf(id){const f=media(id).file;if(!f)return;
 $('dlg').className='dlg pdfv';$('dlg').innerHTML=`<div class="pvh"><b>${esc(f.name)}</b><span class="pr" id="pvi">جاري فتح الملف…</span><button class="btn sm" onclick="closeDlg();$('dlg').className='dlg'">إغلاق</button></div><div class="pvb" id="pvb"></div>`;$('ov').classList.add('open');
 try{const lib=await loadPdfJs();const doc=await lib.getDocument({data:new Uint8Array(await f.blob.arrayBuffer())}).promise;
  $('pvi').textContent=ar(doc.numPages)+' صفحة';const box=$('pvb'),W=Math.min(box.clientWidth-24,900);
  for(let p=1;p<=Math.min(doc.numPages,40);p++){const pg=await doc.getPage(p),v1=pg.getViewport({scale:1}),sc=W/v1.width,dpr=Math.min(2,window.devicePixelRatio||1),vp=pg.getViewport({scale:sc*dpr});
   const c=document.createElement('canvas');c.width=vp.width;c.height=vp.height;c.style.width=(vp.width/dpr)+'px';box.appendChild(c);await pg.render({canvasContext:c.getContext('2d'),viewport:vp}).promise;if(!$('pvb'))return}
  if(doc.numPages>40)box.insertAdjacentHTML('beforeend','<p class="pr" style="text-align:center;padding:12px">يُعرض أول ٤٠ صفحة.</p>')}
 catch(e){const b=$('pvb');if(b)b.innerHTML=`<div class="empty" style="margin:20px">تعذّر عرض الملف هنا.<br><a class="btn primary sm" style="margin-top:10px" href="${f.url}" target="_blank" rel="noopener">فتح الملف في صفحة جديدة</a></div>`;const i=$('pvi');if(i)i.textContent=''}}

// profile sections
function portfolioPanel(a){const m=media(a.id),ed=EDIT===a.id,g=m.gallery;
 const tiles=g.length?g.map((x,i)=>`<div class="gi"><button class="gimg" onclick="openLB(${a.id},${i})" aria-label="عرض الصورة ${ar(i+1)}"><img src="${x.url}" alt="" loading="lazy"></button>${ed?`<button class="gdel" onclick="delMedia(${a.id},'g',${x.k})" aria-label="حذف">×</button>`:''}</div>`).join('')
  :[3,4,5].map(k=>`<div class="gi">${art(a,k)}</div>`).join('');
 return `<div class="panel"><h3>من أعماله وأعمال طلابه ${g.length?`<span class="pr">${ar(g.length)} صورة</span>`:''}</h3><div class="pb">
  <div class="gal">${tiles}${ed&&g.length<12?`<label class="gadd" ondragover="event.preventDefault();this.classList.add('drag')" ondragleave="this.classList.remove('drag')" ondrop="dropZone(event,${a.id})"><input type="file" accept="image/*" multiple onchange="upGallery(${a.id},this.files);this.value=''"><span>+</span><small>إضافة صور</small></label>`:''}</div>
  ${!g.length&&!ed?'<p class="pr" style="margin-top:8px">صور توضيحية — المدرّب ما أضاف صور أعماله للحين.</p>':''}</div></div>
 ${m.file||ed?`<div class="panel"><h3>ملف الأعمال</h3><div class="pb">${m.file?`<div class="fcard"><i>${svgI('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 14h6M9 17h4"/>',24)}</i><div><b>${esc(m.file.name)}</b><span class="pr">PDF · ${fsize(m.file.size)}</span></div>
   <span class="fa"><button class="btn primary sm" onclick="viewPdf(${a.id})">عرض الملف</button>${ed?`<label class="btn sm">استبدال<input type="file" accept="application/pdf" hidden onchange="upFile(${a.id},this)"></label><button class="btn danger sm" onclick="delMedia(${a.id},'file')">حذف</button>`:''}</span></div>`
  :`<label class="drop" ondragover="event.preventDefault();this.classList.add('drag')" ondragleave="this.classList.remove('drag')" ondrop="dropZone(event,${a.id})"><input type="file" accept="application/pdf" hidden onchange="upFile(${a.id},this)">${svgI('<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',28)}<b>ارفع ملف أعمالك (PDF)</b><small>بورتفوليو، شهادات، أو سيرة فنية — حتى ٢٥ ميجا</small></label>`}</div></div>`:''}`}
function editBar(a){const ed=EDIT===a.id;
 return ed?`<div class="editbar"><div><b>وضع المدرّب</b><span>أضف صورتك الشخصية وصور أعمالك وملف الأعمال. التعديلات تظهر للزوار في ملفك.</span></div><button class="btn primary sm" onclick="EDIT=null;render()">تم</button></div>`:''}

// ================= login: trainee + admin =================
const LOCK='<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>';
const DEMO_USER={name:'سارة العتيبي',phone:'0500000000',pass:'123456',city:'الرياض',age:0,ints:['عزف','رسم'],level:0,reg:true};
const ADMIN_DEMO={u:'admin',p:'naghm123'};
let ADM=store.get('adm',false);
function fillDemo(a,b,u,p){$(a).value=u;$(b).value=p;$(b).focus()}
function demoBox(t,rows,fill){return `<div class="demo"><div class="dmh"><b>${t}</b><button class="linkb" onclick="${fill}">تعبئة تلقائية</button></div>${rows.map(([l,v])=>`<div class="dmr"><span>${l}</span><code dir="ltr">${v}</code></div>`).join('')}</div>`}
function loginBox(after){return `<div class="lgn">
 <label class="f-lbl">رقم الجوال</label><div class="ifield">${svgI('<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>',18)}<input class="field" id="lgP" placeholder="05xxxxxxxx" dir="ltr" style="text-align:right" inputmode="tel" autocomplete="username"></div>
 <div class="gap"></div>
 <label class="f-lbl">كلمة المرور</label><div class="ifield">${svgI(LOCK,18)}<input class="field" id="lgW" type="password" dir="ltr" style="text-align:right" autocomplete="current-password" onkeydown="if(event.key==='Enter')doLogin('${after}')"></div>
 ${demoBox('حساب متدرّب تجريبي',[['الجوال',DEMO_USER.phone],['كلمة المرور',DEMO_USER.pass]],`fillDemo('lgP','lgW','${DEMO_USER.phone}','${DEMO_USER.pass}')`)}
 <div class="err" id="lgE"></div>
 <button class="btn primary block lg" onclick="doLogin('${after}')">تسجيل الدخول</button>
 <p class="alt pr">ما عندك حساب؟ <button class="linkb" onclick="S.signup=true;S.after=${after==='account'?'null':`'${after}'`};W=null;go('account')">أنشئ حساب جديد</button></p></div>`}
function doLogin(after){const ph=$('lgP').value.replace(/\s/g,''),pw=$('lgW').value,e=$('lgE');
 if(!ph||!pw)return e.textContent='اكتب رقم الجوال وكلمة المرور';
 let u=null;if(ph===DEMO_USER.phone&&pw===DEMO_USER.pass)u={...DEMO_USER};
 else{const a=store.get('acct_'+ph,null);if(a&&(!a.pass||a.pass===pw))u=a}
 if(!u)return e.textContent='رقم الجوال أو كلمة المرور غير صحيحة';
 S.user=u;store.set('user',u);setCity(u.city,true);toast('أهلًا '+u.name.split(' ')[0]+'، تم تسجيل الدخول');
 if(B&&B.level===null)B.level=u.level??null;
 go(after||'home')}
function logoutUser(to){if(S.user.reg)store.set('acct_'+S.user.phone,S.user);S.user={name:'',phone:''};store.set('user',S.user);toast('تم تسجيل الخروج');go(to||'home')}
function loginPage(title,sub,after){return `<div class="phead" style="justify-content:center;text-align:center"><div style="margin:0 auto"><div class="crumb" style="justify-content:center">حسابي</div><h1>${title}</h1><p style="margin:0 auto">${sub}</p></div></div>
 <div class="lpage"><div class="panel"><div class="pb" style="padding:22px">${loginBox(after)}</div></div></div>`}
function account(){if(!S.user.reg&&!S.signup&&!S.editing)return loginPage('تسجيل الدخول','ادخل لحسابك عشان تحجز دروسك وتتابعها.','account');return accountPage()}
function bookings(){if(!S.user.reg)return loginPage('حجوزاتي','سجّل دخولك عشان تشوف دروسك القادمة والسابقة.','bookings');return bookingsPage()}

// admin
function admLogin(){const u=$('adU').value.trim(),p=$('adW').value,e=$('adE');
 if(!u||!p)return e.textContent='اكتب اسم المستخدم وكلمة المرور';
 if(u!==ADMIN_DEMO.u||p!==ADMIN_DEMO.p)return e.textContent='اسم المستخدم أو كلمة المرور غير صحيحة';
 ADM=true;store.set('adm',true);toast('أهلًا بك في لوحة التحكم');render()}
function admLogout(){ADM=false;store.set('adm',false);toast('تم تسجيل الخروج من لوحة التحكم');render()}
function adminLogin(){return `<div class="alog"><div class="alh"><i>${svgI('<rect x="3" y="3" width="8" height="10" rx="1.5"/><rect x="13" y="3" width="8" height="6" rx="1.5"/><rect x="13" y="11" width="8" height="10" rx="1.5"/><rect x="3" y="15" width="8" height="6" rx="1.5"/>',24)}</i><div><b>لوحة التحكم</b><span>دخول المشرفين — منصة نغم</span></div></div>
 <div class="alb lgn">
  <label class="f-lbl">اسم المستخدم</label><div class="ifield">${svgI('<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',18)}<input class="field" id="adU" dir="ltr" style="text-align:right" autocomplete="username" placeholder="اسم المستخدم"></div>
  <div class="gap"></div>
  <label class="f-lbl">كلمة المرور</label><div class="ifield">${svgI(LOCK,18)}<input class="field" id="adW" type="password" dir="ltr" style="text-align:right" autocomplete="current-password" placeholder="••••••••" onkeydown="if(event.key==='Enter')admLogin()"></div>
  ${demoBox('بيانات الدخول التجريبية',[['اسم المستخدم',ADMIN_DEMO.u],['كلمة المرور',ADMIN_DEMO.p]],`fillDemo('adU','adW','${ADMIN_DEMO.u}','${ADMIN_DEMO.p}')`)}
  <div class="err" id="adE"></div>
  <button class="btn primary block lg" onclick="admLogin()">دخول لوحة التحكم</button>
 </div></div>`}
function admin(){return ADM?adminDash():adminLogin()}

// booking: step 1 login, step 2 book directly
function book(id){const a=A[id];if(!a)return explore();if(!B||B.id!==id)B=newB(id,0);
 const logged=!!S.user.reg;if(logged&&B.level===null&&S.user.level!=null)B.level=S.user.level;
 const p=PK[a.cat][B.pk],cost=Math.round(a.price*p[2]);
 const modes=MODES.filter(m=>m[0]!=='online'||a.online);
 const stepper=`<div class="hstep">${['تسجيل الدخول','الدرس والموعد والحجز'].map((t,k)=>{const c=logged?(k?'on':'dn'):(k?'':'on');return `<div class="${c}"><span>${c==='dn'?'✓':ar(k+1)}</span>${t}</div>`}).join('')}</div>`;
 const summary=`<div class="panel"><h3>ملخص الحجز</h3><div class="pb"><div class="ch">${avatar(a)}<div><h3 style="font-size:15px">${a.n}</h3><p>${a.spec}</p></div></div>
  <dl class="dl"><dt>الدرس</dt><dd>${p[0]}</dd><dt>التفاصيل</dt><dd>${p[1]}</dd>${B.day?`<dt>اليوم</dt><dd>${fmtDay(B.day)}</dd>`:''}${B.time!==null?`<dt>الوقت</dt><dd>${TIMES[B.time]}</dd>`:''}${B.level!==null?`<dt>المستوى</dt><dd>${LEVELS[B.level]}</dd>`:''}<dt>المكان</dt><dd>${esc(B.where==='me'&&!B.addr?'في موقعك':whereTxt(a))}</dd></dl>
  <div style="display:flex;justify-content:space-between;margin-top:12px;padding-top:12px;border-top:1px solid var(--line);font-weight:700"><span>الإجمالي</span><span style="color:var(--accent)">${money(cost)}</span></div></div></div>`;
 let body,next='';
 if(!logged){body=`<h3 style="margin:0 0 4px;font-size:18px">سجّل دخولك أولًا</h3><p class="pr" style="margin:0 0 16px">بعدها تختار الدرس والموعد وتأكد حجزك مباشرة.</p>${loginBox('book-'+id)}`}
 else{const ds=days();
  body=`<div class="whobar"><span class="ok">✓</span> الحجز باسم <b>${esc(S.user.name)}</b> · <span dir="ltr">${esc(S.user.phone)}</span><button class="linkb" style="margin-inline-start:auto" onclick="logoutUser('book-${id}')">مو أنت؟ بدّل الحساب</button></div>
  <label class="lbl">نوع الدرس</label>${PK[a.cat].map((q,k)=>`<button class="pkg${k===B.pk?' on':''}" onclick="B.pk=${k};render()"><div><h4>${q[0]}</h4><small>${q[1]}</small></div><span class="p">${money(Math.round(a.price*q[2]))}</span></button>`).join('')}
  <label class="lbl">اليوم</label><div class="opts o7">${ds.map(d=>`<button class="opt${B.day===+d?' on':''}" onclick="B.day=${+d};B.time=null;render()"><small>${DN[d.getDay()]}</small>${ar(d.getDate())} ${MN[d.getMonth()].slice(0,5)}</button>`).join('')}</div>
  <label class="lbl">الوقت</label>${B.day?`<div class="opts o4">${TIMES.map((t,k)=>`<button class="opt${B.time===k?' on':''}" ${busy(id,new Date(B.day),k)?'disabled':''} onclick="B.time=${k};render()">${t}</button>`).join('')}</div><p class="pr" style="margin-top:6px">الأوقات المشطوبة محجوزة.</p>`:'<p class="pr">اختر اليوم أولًا لعرض الأوقات المتاحة.</p>'}
  <label class="lbl">مستواك</label><div class="opts o3">${LEVELS.map((l,k)=>`<button class="opt${B.level===k?' on':''}" onclick="B.level=${k};render()">${l}</button>`).join('')}</div>
  <label class="lbl">مكان الدرس</label><div class="opts o3">${modes.map(([k,l])=>`<button class="opt${B.where===k?' on':''}" onclick="B.where='${k}';render()">${l}<small>${k==='artist'?a.area:k==='me'?'المدرّب يجيك':'مكالمة فيديو'}</small></button>`).join('')}</div>
  ${B.where==='me'?`<input class="field" style="margin-top:8px" placeholder="الحي والشارع في ${a.city}" value="${esc(B.addr)}" oninput="B.addr=this.value">`:''}
  <label class="lbl">ملاحظة للمدرّب (اختياري)</label><textarea class="field" rows="3" placeholder="مثال: أبي أعزف أغنية معيّنة، أو الدرس لطفلي عمره ١٠ سنوات" oninput="B.note=this.value">${esc(B.note)}</textarea>
  <div class="notice" style="margin:16px 0 0">الدفع يكون بعد ما يأكد المدرّب الموعد. الإلغاء مجاني قبل الموعد بـ ٢٤ ساعة.</div>
  <div class="err" id="err"></div>`;
  next=`<button class="btn primary lg" onclick="bookNow()">تأكيد الحجز · ${money(cost)}</button>`}
 return `<section class="hero sm"><div class="crumb" style="cursor:pointer" onclick="go('artist-${id}')">${a.n} · حجز درس</div>
 <h1>احجز درسك مع ${a.n}</h1><p>${a.spec} · ${a.city}، ${a.area}</p>${stepper}</section>
 <div class="prof" style="margin-top:20px"><div class="panel"><div class="pb">${body}</div><div class="actions"><button class="btn" onclick="history.back()">إلغاء</button>${next}</div></div><aside class="side">${summary}</aside></div>`}
function bookNow(){const e=$('err');
 if(!B.day)return e.textContent='اختر اليوم';
 if(B.time===null)return e.textContent='اختر الوقت';
 if(B.level===null)return e.textContent='اختر مستواك';
 if(B.where==='me'&&!B.addr.trim())return e.textContent='اكتب عنوانك عشان يوصلك المدرّب';
 B.name=S.user.name;B.phone=S.user.phone;confirmBook()}
render();mLoadAll();
