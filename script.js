(function(){
  document.documentElement.classList.add('js');
  var sc=document.getElementById('scroller'),links=document.querySelectorAll('.nav a'),secs=document.querySelectorAll('main section[id]');
  // reveal on scroll
  var rv=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}});},{threshold:.1});
    rv.forEach(function(x){io.observe(x);});
  }else{rv.forEach(function(x){x.classList.add('on');});}
  // active nav link (works for the scrolling panel on desktop and the page on phones)
  function mark(){
    var cur='home';
    secs.forEach(function(s){if(s.getBoundingClientRect().top<200)cur=s.id;});
    links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+cur);});
  }
  sc.addEventListener('scroll',mark,{passive:true});addEventListener('scroll',mark,{passive:true});mark();
  // subtle 3D tilt on the profile card (mouse only)
  var t=document.getElementById('tilt');
  if(t&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    t.addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;var r=t.getBoundingClientRect();t.style.transform='rotateY('+(((e.clientX-r.left)/r.width-.5)*14)+'deg) rotateX('+(-((e.clientY-r.top)/r.height-.5)*14)+'deg)';});
    t.addEventListener('pointerleave',function(){t.style.transform='';});
  }
  // contact form: opens the visitor's email app
  document.getElementById('cf').addEventListener('submit',function(e){
    e.preventDefault();var d=new FormData(e.target);
    location.href='mailto:chzain325700@gmail.com?subject='+encodeURIComponent(d.get('subject'))+'&body='+encodeURIComponent('From: '+d.get('name')+'\nReply email: '+d.get('email')+'\n\n'+d.get('message'));
  });
  // certificate viewer
  var md=document.getElementById('modal'),mi=document.getElementById('mi'),vb=document.getElementById('viewcert');
  function close(){md.classList.remove('open');mi.removeAttribute('src');}
  if(vb){vb.addEventListener('click',function(){mi.src=vb.getAttribute('data-img');md.classList.add('open');});}
  md.addEventListener('click',function(e){if(e.target!==mi)close();});
  addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  document.getElementById('yr').textContent=new Date().getFullYear();
})();
