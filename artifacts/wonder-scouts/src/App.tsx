import { useEffect, useState } from 'react';

const root = import.meta.env.BASE_URL.replace(/\/$/, '');
const donateUrl = 'https://www.surveycake.com/s/ayPAY?utm_id=97758_v0_s00_e233_tv2_tp1_a1den5ez9v5f9m';
const partnerForm = 'https://docs.google.com/forms/d/e/1FAIpQLSd3bYH1n5HX569WxzNzub4dR5kgBN8yGw9mLjVakEfFVzULEA/viewform?usp=sharing&ouid=109580868900905926784';
const joinForm = 'https://forms.gle/2575hnCrJk556J3cA';

const venues = [
  { tag:'眷村文化',color:'#9b641d',title:'新竹將軍村',date:'2024.09 — 持續進行中',description:'少年導覽隊的起點場域，以眷村歷史文化為主題設計角色扮演、互動遊戲與 QR Code 數位導覽。',stats:[['2,000+','累計人次'],['7','QR Code 點位']] },
  { tag:'歷史宅邸',color:'#4a7a45',title:'台中霧峰林家宮保第',date:'2025.07.19–20',description:'首次跨縣市複製導覽模組，以林家歷史人物為腳本設計沉浸式互動體驗，驗證模式可移植性。',stats:[['200+','兩天人次'],['首次','跨縣市複製']] },
  { tag:'機關接待',color:'#1a6b72',title:'台東縣政府參訪團',date:'2025.04.24',description:'承接政府機關正式接待導覽任務，以將軍村歷史為主題為 70 位公務員提供專業導覽服務。',stats:[['70+','參與人數'],['95%','好評率']] },
  { tag:'社區教育',color:'#2a6faa',title:'竹塹社區大學',date:'2025.06.09',description:'為社區大學學員導覽，獲副校長高度讚揚，展現少年導覽跨年齡層的影響力。',stats:[['40+','參與人數'],['感動','副校長直呼']] },
  { tag:'創客論壇',color:'#6b3fa0',title:'清交大創客市集',date:'2024 & 2025 連續兩年',description:'受邀於頂尖大學創客論壇分享少年導覽模式，擴散青少年主導文化行動的理念。',stats:[['2年','受邀分享'],['跨校','影響力擴散']] },
  { tag:'成果驗收',color:'#c0391b',title:'影響力市集',date:'2026.01.24–25',description:'作為最終成果驗收場域，收集 118 份回饋問卷，94% 民眾正向認同少年導覽的價值。',stats:[['118份','回饋問卷'],['94%','正向認同']] },
  { tag:'街頭導覽',color:'#d18121',title:'台北・台南・高雄 街頭導覽',date:'2024–2026',description:'走入城市街頭，以青少年視角詮釋在地歷史與文化脈絡，向路過的民眾提供即興導覽服務。',stats:[['1,000+','累計人次'],['3城市','台北/台南/高雄']] },
  { tag:'國際交流',color:'#2a6faa',title:'接待日本・美國師生',date:'2024–2026',description:'以英語、日語接待來自日本與美國的教師與學生，進行台灣在地文化導覽。',stats:[['EN・JA','雙語導覽'],['跨國','日本・美國']] },
  { tag:'海外導覽',color:'#4a7a45',title:'日本沖繩 街頭導覽',date:'2026',description:'將台灣少年導覽的模式帶到海外，在沖繩街頭以日語向當地民眾介紹台灣文化，首次海外實踐。',stats:[['200+','導覽人次'],['首次','海外導覽']] },
];
const videos = [
  {id:'KWGm5TQCVxs',place:'新竹將軍村',title:'影響力市集成果紀錄',full:'金車第15屆愛讓世界轉動_少年導覽隊。影響力市集'},
  {id:'025HOvHCdP4',place:'台中霧峰林家宮保第',title:'宮保第夏日派對導覽紀錄',full:'2025.07.19-20 宮保第夏日派對'},
  {id:'yUfGYheqBIs',place:'精選紀錄',title:'美國高中生來台交流',full:'🇹🇼實人實驗教育＆🇺🇲 Pricipia School ＿ 迷人的台美交流'},
];
const testimonials = [
  ['孩子們口條清晰、熱情開朗。每位同學都不僅是了解林家的歷史，還內化了以後能夠這樣呈現出來。','霧峰林家宮保第 參觀民眾'],
  ['導覽的同學熟悉負責的導覽內容，還可以展現自我風格很厲害。有比較害羞的同學，也鼓起勇氣進行導覽，值得鼓勵！','台東縣政府人事主任'],
  ['非常令人感動的活動，謝謝！NPC 導覽方法讓參觀的小孩更容易接觸了解歷史。','竹塹社區大學副校長'],
  ['小朋友表現很棒！講解生動，努力互動。透過互動式，讓遊客對宮保第的故事印象加深！','霧峰林家 參觀民眾'],
  ['我覺得讓小朋友導覽是一件很讚的事情。支持！認真且落落大方，面對陌生人不緊張，很棒！','影響力市集 民眾回饋'],
  ['孩子很活潑，借由導覽活動讓孩子激發腦子，很棒的創意設計活動。自信大方，內容豐富，一級棒！','影響力市集 民眾回饋'],
];

function SectionHeading({ eyebrow, title, description, dark = false }: { eyebrow: string; title: string; description?: string; dark?: boolean }) {
  return <><div className="section-eyebrow" style={{color:dark?'var(--amber)':'var(--amber)'}}><span className="line"/>{eyebrow}</div><h2 className="section-title">{title}</h2>{description && <p className="section-lead">{description}</p>}</>;
}

function App() {
  const [activeTab, setActiveTab] = useState('venues');
  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;
    requestAnimationFrame(() => {
      const target = document.getElementById(targetId);
      if (!target) return;
      const html = document.documentElement;
      const previousScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
      requestAnimationFrame(() => {
        html.style.scrollBehavior = previousScrollBehavior;
      });
    });
  }, []);
  return <main>
    <nav aria-label="主要導覽">
      <a className="nav-logo" href="#top">少年導覽隊</a>
      <ul className="nav-links">
        <li><a href="#about">關於我們</a></li><li><a href="#results">導覽成果</a></li><li><a href="#partner">場域合作</a></li><li><a href="#join">加入我們</a></li><li><a className="nav-donate" href={donateUrl} target="_blank" rel="noreferrer">❤️ 支持我們</a></li>
      </ul>
    </nav>
    <header className="hero" id="top">
      <div className="hero-bg"/><div className="hero-circle hc1"/><div className="hero-circle hc2"/><div className="hero-circle hc3"/>
      <div className="hero-inner">
        <div>
          <h1 className="hero-title">少年導覽隊<br/><em>市集活動</em></h1>
          <p className="hero-desc">我們是台灣的孩子、是一群中小學生；我們走進古蹟、研究歷史、探索自然科學與天文生物，用青少年的視角設計沉浸式體驗，為每一個有故事的地方注入新的生命力。</p>
          <div className="award-row">
            <div className="award-pill"><span className="award-icon">🏆</span><span>金車文教基金會 第15屆<strong>文化理解組 全國首獎</strong></span></div>
            <div className="award-pill"><span className="award-icon">🎖️</span><span>2026 IASE 影響力創新獎<strong>教學創新與實踐組 楷模獎</strong></span></div>
          </div>
          <div className="hero-cta"><a className="btn-primary" href="#partner">場域合作提案 →</a><a className="btn-outline" href="#results">看看我們做了什麼</a><a className="btn-outline" href={donateUrl} target="_blank" rel="noreferrer">❤️ 捐款支持</a></div>
        </div>
        <div className="hero-awards">
          <figure className="award-image"><img src={`${root}/images/award-1.jpg`} alt="少年導覽隊金車文教得獎合照"/><figcaption>金車文教基金會第15屆 · 文化理解組全國首獎</figcaption></figure>
          <figure className="award-image"><img src={`${root}/images/award-2.jpg`} alt="2026 IASE 影響力創新獎楷模獎"/><figcaption>2026 IASE 影響力創新獎 · 教學創新楷模</figcaption></figure>
        </div>
      </div>
      <div className="scroll-hint">SCROLL<span className="scroll-arrow"/></div>
    </header>

    <section id="about"><div className="section-inner">
      <SectionHeading eyebrow="關於少年導覽隊" title="我們從腳下這塊土地出發"/>
      <div className="about-grid">
        <div>
          <p className="about-text">2024年9月，我們在新竹將軍村學習，卻對這塊土地的故事一無所知。那份「近在眼前卻陌生的疏離感」，成了少年導覽隊的起點。</p>
          <blockquote className="about-quote">由少年從無到有、全由自己準備的導覽！<br/>過程中，我們學會合作，精采了自己的人生。</blockquote>
          <p className="about-text"><strong>從「聽歷史」到「走進歷史」</strong><br/>以「感官體驗」為主軸，設計「角色扮演」、「情境佈置」與「互動體驗」活動，讓參與者透過行動與感官實地探索、觸碰歷史的溫度，藉此縮短時空距離，讓歷史從知識轉化為觸動全身的感受。</p>
          <p className="about-text"><strong>從「旁觀敘述」到「時空轉譯」</strong><br/>少年主動研究歷史、理解背景、整理觀點，專業志工成為學習資源之一。這樣的場域學習，改變了傳統教育模式，也加深學習體驗。透過導覽角色轉換，文化傳承成為一道跨世代的共創風景。</p>
          <p className="about-text"><strong>從「單點行動」到「數位聯網」</strong><br/>將「真實的青少年導覽員」結合「虛擬的數位平台」，透過拍攝實境導覽影片、佈置現場 QR Code，將青少年的導覽與創意，轉化為不限時空的數位資產。</p>
        </div>
        <div className="module-flow">
          <div className="module-step"><span className="step-num" style={{background:'var(--rust)'}}>1</span><div className="step-body"><h4>研究</h4><p>訪談耆老與文史專家、查閱文獻資料、實地觀察記錄，建立導覽所需的知識厚度。</p></div></div>
          <div className="module-step"><span className="step-num" style={{background:'var(--amber)'}}>2</span><div className="step-body"><h4>設計</h4><p>把歷史知識轉化為遊戲、角色扮演腳本與互動任務，讓參觀者「主動學」而非「被動聽」。</p></div></div>
          <div className="module-step"><span className="step-num" style={{background:'var(--sage)'}}>3</span><div className="step-body"><h4>行動</h4><p>實際站上場域，面對各年齡層的參觀者，在一次次導覽中調整、優化、成長。</p></div></div>
          <div className="module-step"><span className="step-num" style={{background:'var(--teal)'}}>4</span><div className="step-body"><h4>數位永續</h4><p>拍攝實境導覽影片，結合 QR Code 佈建於場域，打造不受時間限制的文化資產。</p></div></div>
          <figure className="about-photo"><img src={`${root}/hero.avif`} alt="少年導覽隊穿著戲服揮手"/></figure>
        </div>
      </div>
    </div></section>

    <section id="results"><div className="section-inner">
      <SectionHeading eyebrow="導覽成果與影片" title="從將軍村到霧峰，我們走過的每一步" description="從一次市集擺攤開始，到接待縣政府、社區大學，再到跨縣市複製模組。每一場導覽都是一次真實的學習。" dark/>
      <div className="result-gallery">
        {[4,5,6].map(n=><img key={n} src={`${root}/images/image_${n}.avif`} alt={['角色扮演庭院導覽','互動體驗活動','霧峰林家宮保第導覽大人潮'][n-4]}/>)}
      </div>
      <div className="results-tabs" role="tablist" aria-label="成果分類">
        {[['venues','導覽場域'],['videos','精選影片'],['feedback','民眾回饋']].map(([id,label])=><button key={id} type="button" role="tab" aria-selected={activeTab===id} className={`tab-btn ${activeTab===id?'active':''}`} onClick={()=>setActiveTab(id)}>{label}</button>)}
      </div>
      {activeTab==='venues'&&<div className="tab-panel venue-grid" role="tabpanel">{venues.map(v=><article className="venue-card" key={v.title}><span className="venue-tag" style={{background:`${v.color}33`,color:v.color}}>{v.tag}</span><h3>{v.title}</h3><div className="meta">{v.date}</div><p>{v.description}</p><div className="venue-stat">{v.stats.map(([num,lbl])=><div className="vs-item" key={lbl}><span className="num">{num}</span><span className="lbl">{lbl}</span></div>)}</div></article>)}</div>}
      {activeTab==='videos'&&<div className="tab-panel video-grid" role="tabpanel">{videos.map(v=><article className="video-card" key={v.id}><iframe className="video-frame" src={`https://www.youtube-nocookie.com/embed/${v.id}`} title={v.full} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/><div className="video-caption"><span>{v.place}</span><h3>{v.title}</h3></div></article>)}</div>}
      {activeTab==='feedback'&&<div className="tab-panel feedback-row" role="tabpanel">{testimonials.map(([quote,who],i)=><article className="feedback-card" key={i}><blockquote>「{quote}」</blockquote><cite>— {who}</cite></article>)}</div>}
    </div></section>

    <section id="partner"><div className="section-inner">
      <SectionHeading eyebrow="場域合作提案" title="讓你的場域也有少年導覽隊" description="我們提供從研究、設計到數位永續的完整服務，一起讓更多人感受到歷史的溫度。"/>
      <div className="partner-intro">
        <article className="benefit-block" style={{borderColor:'var(--amber)'}}><h3>✦ 合作對場域（你們）的價值</h3><ul className="benefit-list"><li>引入青少年視角，吸引年輕世代與親子客群</li><li>獲得一套免費數位導覽影片資產（QR Code 永久展示）</li><li>獲得一套完整的導覽活動設計內容</li><li>活化場域人氣，提升社群媒體曝光</li><li>無需負擔高額導覽人力成本</li></ul></article>
        <article className="benefit-block" style={{borderColor:'var(--sage)'}}><h3>✦ 合作對少年導覽隊的價值</h3><ul className="benefit-list"><li>提供真實場域讓學生深度學習文史知識</li><li>提供教育舞台讓學生與真實社會互動接軌</li><li>場域方提供交通、餐點經費支持</li><li>協助文獻資料、耆老訪談等資源媒合</li><li>若有活動宣傳，協助露出少年導覽隊品牌</li></ul></article>
      </div>
      <div className="partner-photos">{[1,2,3].map((n)=><img key={n} src={`${root}/images/image_${n}.avif`} alt="少年導覽隊場域合作活動照片"/>)}</div>
      <div className="form-types">
        <article className="form-type-card" style={{borderColor:'var(--amber)'}}><span className="ftype-num">01</span><h3>一次性活動企劃導覽</h3><p>由少年導覽隊負責研究、設計、執行完整導覽活動，適合節慶特展、週年慶或單次推廣活動。</p><div className="tags"><span className="tag">內容研究</span><span className="tag">活動設計</span><span className="tag">現場執行</span></div></article>
        <article className="form-type-card" style={{borderColor:'var(--teal)'}}><span className="ftype-num">02</span><h3>數位導覽影片製作與 QR Code 佈建</h3><p>由學生扮演場域角色拍攝實境導覽影片，製作 QR Code 標示佈建於現場，打造不打烊的文化體驗。</p><div className="tags"><span className="tag">影片製作</span><span className="tag">QR Code 佈建</span><span className="tag">永久資產</span></div></article>
        <article className="form-type-card" style={{borderColor:'var(--sage)'}}><span className="ftype-num">03</span><h3>在地少年導覽見習隊養成計畫</h3><p>由場域方聯繫當地學校招募見習學生，少年導覽隊提供完整模組培訓，讓你的場域擁有自己的在地少年導覽隊。</p><div className="tags"><span className="tag">見習培訓</span><span className="tag">在地生根</span><span className="tag">永續傳承</span></div></article>
      </div>
      <div className="cta-bar"><div><h3>填寫合作提案表單</h3><p>填寫後 7 個工作天內主動與您聯繫，安排初步說明會。</p></div><div className="cta-bar-btns"><a className="btn-primary" href={partnerForm} target="_blank" rel="noreferrer">📋 填寫合作表單</a><a className="btn-outline" href="https://reurl.cc/laEAeY" target="_blank" rel="noreferrer">📺 觀看成果影片</a></div></div>
    </div></section>

    <section id="join"><div className="section-inner">
      <SectionHeading eyebrow="加入我們／見習隊" title="你的場域，可以是下一個起點" description="少年導覽隊的模式已經驗證可以複製。如果你也相信年輕人有能力說好歷史的故事，我們邀請你一起來。"/>
      <div className="join-grid"><div>
        <h3>✦ 在地少年導覽見習隊　<span style={{fontSize:14,fontWeight:400}}>三個步驟，讓少年導覽在你的場域生根</span></h3>
        <div className="seedling-steps">
          <div className="seed-step"><span className="seed-num" style={{background:'var(--amber)'}}>1</span><div className="seed-body"><h4>場域方招募見習學生</h4><p>由場域方聯繫當地學校、教育團體或社區，招募有興趣的青少年加入見習隊。</p></div></div>
          <div className="seed-step"><span className="seed-num" style={{background:'var(--sage)'}}>2</span><div className="seed-body"><h4>觀摩完整模組執行</h4><p>見習隊全程參與實人少年導覽隊的企劃、設計到導覽現場，從做中學。</p></div></div>
          <div className="seed-step"><span className="seed-num" style={{background:'var(--teal)'}}>3</span><div className="seed-body"><h4>見習隊自主企劃執行</h4><p>在少年導覽隊的培訓指導下，見習隊獨立設計並完成屬於自己場域的沉浸式導覽。</p></div></div>
        </div>
        <p className="about-text">少年導覽隊目前為 <strong>非營利性質</strong>，合作以文化共創、資源互惠為原則。<br/>我們已整理全台 22 個古蹟文化單位，預計 2026 年陸續聯繫推廣。<br/>歡迎各規模場域主動洽詢。</p>
      </div>
      <aside className="join-right"><span className="join-icon">📋</span><h3>填寫在地少年導覽隊<br/>孵化計畫表單</h3><p>填表不代表正式承諾，我們收到後會主動與您聯繫，一起討論最適合的合作方式。</p><p>填表時間約 3 分鐘。</p><a className="btn-primary" href={joinForm} target="_blank" rel="noreferrer">立即填寫表單 →</a><p style={{marginTop:18,marginBottom:0}}>填寫後 7 個工作天內主動與您聯繫</p></aside></div>
    </div></section>
    <footer><div className="footer-inner"><div className="footer-brand"><div className="logo">少年導覽隊</div><p>我們是台灣的孩子、是一群中小學生；用青少年的視角設計沉浸式體驗，為每一個有故事的地方注入新的生命力。</p></div><div className="footer-col"><h4>探索</h4><ul><li><a href="#about">關於少年導覽隊</a></li><li><a href="#results">導覽成果與影片</a></li><li><a href="#partner">場域合作提案</a></li><li><a href="#join">加入我們／見習隊</a></li></ul></div><div className="footer-col"><h4>一起支持</h4><ul><li><a href={donateUrl} target="_blank" rel="noreferrer">捐款支持</a></li><li><a href={partnerForm} target="_blank" rel="noreferrer">填寫合作表單</a></li><li><a href={joinForm} target="_blank" rel="noreferrer">填寫在地見習隊表單</a></li></ul></div></div><div className="footer-bottom"><p>實人教育 少年導覽隊</p><p className="footer-note-item">合作以文化共創、資源互惠為原則</p></div></footer>
  </main>;
}

export default App;
