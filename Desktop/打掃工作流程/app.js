// ============================================================
//  打掃工作流程製作器 - app.js
//  Features: 內建四套範本、編輯與核取雙模式、語音朗讀、相片旋轉與壓縮
// ============================================================

// ──────────────────────────────────────────────
//  打掃流程預設範本
// ──────────────────────────────────────────────
const presets = {
  classroom: {
    title: '教室掃地與拖地',
    subtitle: '分工合作，把教室整理得乾淨又明亮！',
    steps: [
      { title: '穿戴防護裝備', desc: '穿上圍裙，戴好口罩與手套', img: null },
      { title: '準備掃除工具', desc: '拿出掃把、畚斗、拖把和水桶', img: null },
      { title: '整理桌椅與桌面', desc: '把垃圾丟掉，椅子靠攏，桌面擦乾淨', img: null },
      { title: '由內向外掃地', desc: '用掃把將灰塵垃圾掃進畚斗中丟棄', img: null },
      { title: '落實垃圾分類', desc: '將一般垃圾與資源回收分開丟入桶中', img: null },
      { title: '浸濕並擰乾拖把', desc: '水桶裝水，把拖把沾濕並用力擰乾', img: null },
      { title: 'S形拖淨地板', desc: '由教室裡面往外，以S形向後拖地', img: null },
      { title: '收納工具與洗手', desc: '洗乾淨拖把與水桶歸位，用肥皂洗手', img: null }
    ]
  },
  wipe_table: {
    title: '抹布擦桌椅',
    subtitle: '把個人課桌椅擦拭乾淨，讀書更舒服！',
    steps: [
      { title: '準備抹布與水盆', desc: '裝半盆水，準備一條乾淨的抹布', img: null },
      { title: '浸濕並用力擰乾', desc: '將抹布泡水浸濕，雙手合力擰乾水分', img: null },
      { title: '收乾淨桌面物品', desc: '把書本、鉛筆盒等移開，清空桌面', img: null },
      { title: '由內向外擦拭', desc: '抹布平貼桌面，由身體遠處往近處擦', img: null },
      { title: '擦拭桌角與椅子', desc: '仔細把桌邊、四個角落和椅面擦乾淨', img: null },
      { title: '清洗與晾乾抹布', desc: '把抹布放進水盆搓洗乾淨，掛在通風處', img: null },
      { title: '物品物歸原位', desc: '把桌椅排整齊，書本鉛筆盒放回桌上', img: null },
      { title: '肥皂清洗雙手', desc: '用肥皂搓洗雙手20秒，並擦乾雙手', img: null }
    ]
  },
  trash_recycle: {
    title: '倒垃圾與資源回收',
    subtitle: '分類做得好，地球沒煩惱，保護環境大家一起來！',
    steps: [
      { title: '穿戴手套與口罩', desc: '戴好防護手套與口罩保護自己', img: null },
      { title: '收集各組垃圾桶', desc: '把教室裡和走廊的垃圾桶集中在一起', img: null },
      { title: '進行資源分類', desc: '將紙類、塑膠、鐵鋁罐及一般垃圾分開', img: null },
      { title: '紙盒沖水並壓扁', desc: '喝完的鋁箔包/牛奶盒先沖水再壓扁', img: null },
      { title: '綁緊垃圾袋口', desc: '將垃圾袋裝滿至八分滿，用力打結綁緊', img: null },
      { title: '提到垃圾場丟棄', desc: '兩人一組將垃圾與回收物提去垃圾場丟', img: null },
      { title: '套上乾淨垃圾袋', desc: '垃圾桶洗淨後，套入乾淨的新垃圾袋', img: null },
      { title: '肥皂洗手消毒', desc: '脫下防護裝備，用肥皂將手清洗乾淨', img: null }
    ]
  },
  restroom_sink: {
    title: '廁所洗手台清潔',
    subtitle: '亮晶晶的洗手台，洗手時心情更開朗！',
    steps: [
      { title: '準備清潔用品', desc: '準備手套、刷子、菜瓜布和清潔劑', img: null },
      { title: '移開檯面物品', desc: '將洗手乳和盆栽移至安全地方', img: null },
      { title: '噴灑清潔劑', desc: '在水槽周圍均勻噴灑稀釋的清潔劑', img: null },
      { title: '刷洗水槽與水龍頭', desc: '用菜瓜布刷洗水槽污垢與水龍頭', img: null },
      { title: '清水沖洗乾淨', desc: '開水龍頭或用水瓢沖走髒污泡泡', img: null },
      { title: '抹布擦乾檯面', desc: '用乾布把檯面與鏡子上的水滴擦乾', img: null },
      { title: '物品歸位收納', desc: '將洗手乳放回，工具洗淨晾乾收好', img: null },
      { title: '清洗雙手消毒', desc: '洗乾淨雙手，檢查檯面是否乾淨', img: null }
    ]
  }
};

// ──────────────────────────────────────────────
//  應用程式狀態 (State)
// ──────────────────────────────────────────────
let steps = [];
let design = {
  theme: 'mint',
  cols: 4,
  titleSize: 1,
  cardStyle: 'round',
  deco: 'cleaning',
  perpage: 4,
  decoSize: 65,
  stepTextSize: 1,
  frameStyle: 'none'
};
let customDecos = [];
let editMode = false;
let editingIdx = null;
let editImgData = null;
let nextId = 1;

// ──────────────────────────────────────────────
//  DOM 元素參照
// ──────────────────────────────────────────────
const stepsGrid     = document.getElementById('stepsGrid');
const poster        = document.getElementById('poster');
const mainTitle     = document.getElementById('mainTitle');
const subTitle      = document.getElementById('subTitle');
const footerLabel   = document.getElementById('footerLabel');
const footerDeco    = document.getElementById('footerDeco');
const modalOverlay  = document.getElementById('modalOverlay');
const congratsOverlay = document.getElementById('congratsOverlay');
const imgPreview    = document.getElementById('imgPreview');
const imgFileInput  = document.getElementById('imgFileInput');
const imgDropZone   = document.getElementById('imgDropZone');
const editTitleEl   = document.getElementById('editTitle');
const editDescEl    = document.getElementById('editDesc');
const orderHint     = document.getElementById('orderHint');
const toast         = document.getElementById('toast');
const designPanel   = document.getElementById('designPanel');
const labelInput    = document.getElementById('labelInput');
const decoUploadSection = document.getElementById('decoUploadSection');
const decoSlots         = document.getElementById('decoSlots');
const decoFileInput     = document.getElementById('decoFileInput');
const decoSizeSlider    = document.getElementById('decoSizeSlider');
const titleSizeSlider   = document.getElementById('titleSizeSlider');
const stepTextSizeSlider= document.getElementById('stepTextSizeSlider');
const presetSelector    = document.getElementById('presetSelector');
const practiceProgressContainer = document.getElementById('practiceProgressContainer');
const progressBarFill   = document.getElementById('progressBarFill');
const progressText      = document.getElementById('progressText');

// ──────────────────────────────────────────────
//  本地儲存 (LocalStorage)
// ──────────────────────────────────────────────
function loadState() {
  const savedSteps = localStorage.getItem('clean_steps');
  const savedDesign = localStorage.getItem('clean_design');
  const savedDecos = localStorage.getItem('clean_custom_decos');
  const savedMainTitle = localStorage.getItem('clean_title_main');
  const savedSubTitle = localStorage.getItem('clean_title_sub');
  const savedFooter = localStorage.getItem('clean_footer');

  if (savedSteps) {
    steps = JSON.parse(savedSteps);
  } else {
    // 預設載入教室打掃範本
    loadPreset('classroom', false);
  }

  if (savedDesign) {
    design = JSON.parse(savedDesign);
    // 強制升級列印設定：確保預設為一頁4個步驟
    if (!design.perpage || design.perpage === 1) {
      design.perpage = 4;
      localStorage.setItem('clean_design', JSON.stringify(design));
    }
  }

  if (savedDecos) {
    customDecos = JSON.parse(savedDecos);
  }

  if (savedMainTitle) mainTitle.textContent = savedMainTitle;
  if (savedSubTitle) subTitle.textContent = savedSubTitle;
  if (savedFooter) {
    footerLabel.textContent = savedFooter;
    labelInput.value = savedFooter;
  } else {
    footerLabel.textContent = '瑞翔日間作業所';
    labelInput.value = '瑞翔日間作業所';
  }

  nextId = Math.max(0, ...steps.map(s => s.id || 0)) + 1;
}

function saveSteps() {
  localStorage.setItem('clean_steps', JSON.stringify(steps));
}

function saveDesign() {
  localStorage.setItem('clean_design', JSON.stringify(design));
}

function saveDecos() {
  localStorage.setItem('clean_custom_decos', JSON.stringify(customDecos));
}

// ──────────────────────────────────────────────
//  Toast 提示與防避 HTML 溢出
// ──────────────────────────────────────────────
function showToast(msg) {
  toast.innerHTML = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ──────────────────────────────────────────────
//  載入範本 Presets
// ──────────────────────────────────────────────
function loadPreset(key, confirmRequired = true) {
  if (confirmRequired && !confirm('確定要載入此打掃範本嗎？這將覆蓋您目前編輯的流程。')) {
    presetSelector.value = steps.presetKey || 'classroom';
    return;
  }

  const preset = presets[key];
  if (!preset) return;

  steps = preset.steps.map((s, idx) => ({
    id: idx + 1,
    title: s.title,
    desc: s.desc,
    img: null,
    checked: false
  }));
  steps.presetKey = key;

  mainTitle.textContent = preset.title;
  subTitle.textContent = preset.subtitle;

  localStorage.setItem('clean_title_main', preset.title);
  localStorage.setItem('clean_title_sub', preset.subtitle);

  saveSteps();
  nextId = steps.length + 1;

  if (confirmRequired) {
    showToast(`✨ 已成功套用「${preset.title}」範本！`);
    render();
    updateProgressBar();
  }
}

// ──────────────────────────────────────────────
//  語音朗讀 (Text-to-Speech)
// ──────────────────────────────────────────────
function speakText(text) {
  if ('speechSynthesis' in window) {
    // 先停止目前正在播放的語音
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-TW';
    utterance.rate = 0.85; // 速度稍慢，讓特教生能聽得更清晰
    utterance.pitch = 1.0;
    
    // 尋找台灣中文的 Voice
    const voices = window.speechSynthesis.getVoices();
    const twVoice = voices.find(v => v.lang.includes('ZH-TW') || v.lang.includes('zh-TW'));
    if (twVoice) utterance.voice = twVoice;

    window.speechSynthesis.speak(utterance);
  } else {
    showToast('❌ 您的瀏覽器不支援語音合成朗讀功功能');
  }
}

// 確保瀏覽器已載入語音清單
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {};
}

// ──────────────────────────────────────────────
//  更新實踐核取進度條
// ──────────────────────────────────────────────
function updateProgressBar() {
  if (editMode) {
    practiceProgressContainer.style.display = 'none';
    return;
  }

  practiceProgressContainer.style.display = 'flex';
  const total = steps.length;
  const completed = steps.filter(s => s.checked).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  progressBarFill.style.width = `${percentage}%`;
  progressText.textContent = `實踐度：${percentage}% (已完成 ${completed} / ${total} 步)`;

  // 當全部完成時，顯示祝賀視窗
  if (total > 0 && completed === total) {
    setTimeout(() => {
      congratsOverlay.classList.add('active');
      speakText('太棒了，打掃完成！你今天做得很棒，把環境整理得亮晶晶了！');
    }, 500);
  }
}

// ──────────────────────────────────────────────
//  畫面上渲染渲染 Poster
// ──────────────────────────────────────────────
function render() {
  stepsGrid.innerHTML = '';

  steps.forEach((step, idx) => {
    const card = document.createElement('div');
    card.className = `step-card ${step.checked ? 'checked' : ''}`;
    card.dataset.idx = idx;

    // 編輯模式的標籤鉛筆
    const badge = document.createElement('div');
    badge.className = 'edit-mode-badge';
    badge.innerHTML = '<i class="fa-solid fa-pen"></i>';
    card.appendChild(badge);

    // 預覽/實踐模式的打勾方塊
    const checkOverlay = document.createElement('div');
    checkOverlay.className = 'practice-check-overlay';
    const checkBtn = document.createElement('button');
    checkBtn.className = 'check-btn';
    checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkBtn.title = '點擊標記已完成';
    checkOverlay.appendChild(checkBtn);
    card.appendChild(checkOverlay);

    // 防止在編輯模式下點擊打勾觸發編輯，或在預覽模式下點擊打勾
    checkBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      step.checked = !step.checked;
      saveSteps();
      render();
      updateProgressBar();
      if (step.checked) {
        speakText(`完成步驟 ${idx + 1}：${step.title}`);
      }
    });

    // 圖片區域
    const imgWrap = document.createElement('div');
    imgWrap.className = 'step-img-wrap';

    if (step.img) {
      const img = document.createElement('img');
      img.src = step.img;
      img.alt = step.title;
      imgWrap.appendChild(img);
    } else {
      const ph = document.createElement('div');
      ph.className = 'step-img-placeholder';
      ph.innerHTML = `
        <span class="ph-icon"><i class="fa-solid fa-broom"></i></span>
        <span>${editMode ? '點擊上傳照片' : '尚無照片'}</span>
      `;
      imgWrap.appendChild(ph);
    }

    // 編輯模式下支援把相片拖放到步驟卡片直接更新
    if (editMode) {
      imgWrap.addEventListener('dragover', e => {
        e.preventDefault();
        card.classList.add('drag-over');
      });
      imgWrap.addEventListener('dragleave', () => card.classList.remove('drag-over'));
      imgWrap.addEventListener('drop', e => {
        e.preventDefault();
        card.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
          readFileAsDataURL(file, dataUrl => {
            steps[idx].img = dataUrl;
            saveSteps();
            render();
            showToast(`✅ 已更新「${steps[idx].title}」的步驟相片`);
          });
        }
      });
    }

    // 卡片資訊區
    const label = document.createElement('div');
    label.className = 'step-label';
    
    // 朗讀按鈕 (TTS)
    const speakBtnHtml = `
      <div class="speak-btn-wrapper">
        <button class="speak-btn" data-text="步驟 ${idx + 1}，${step.title}。${step.desc || ''}">
          <i class="fa-solid fa-volume-high"></i> 🔊 語音朗讀
        </button>
      </div>
    `;

    label.innerHTML = `
      <div>
        <div class="step-number">步驟 ${idx + 1}</div>
        <div class="step-title">${esc(step.title)}</div>
        ${step.desc ? `<div class="step-desc">${esc(step.desc)}</div>` : ''}
      </div>
      ${speakBtnHtml}
    `;

    card.appendChild(imgWrap);
    card.appendChild(label);

    // 朗讀按鈕點擊事件
    const speakBtn = label.querySelector('.speak-btn');
    speakBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // 阻止卡片點擊觸發編輯
      const readText = speakBtn.getAttribute('data-text');
      speakText(readText);
    });

    if (editMode) {
      card.addEventListener('click', () => openModal(idx));
    }

    stepsGrid.appendChild(card);
  });

  // 編輯模式下的新增步驟卡片
  if (editMode) {
    const addCard = document.createElement('div');
    addCard.className = 'step-card add-card';
    addCard.title = '新增步驟';
    addCard.innerHTML = '<span>＋</span>';
    addCard.addEventListener('click', addStep);
    stepsGrid.appendChild(addCard);
  }
}

// ──────────────────────────────────────────────
//  套用設計設定 (Apply Design)
// ──────────────────────────────────────────────
function applyDesign() {
  // Theme
  poster.className = `poster theme-${design.theme}`;

  // Columns & Print layout steps count
  stepsGrid.className = `steps-grid cols-${design.cols} print-pp-${design.perpage || 1}`;
  stepsGrid.style.setProperty('--step-text-scale', design.stepTextSize || 1);

  // Title scales
  mainTitle.className = 'main-title';
  subTitle.className = 'sub-title';
  mainTitle.style.setProperty('--title-scale', design.titleSize || 1);
  subTitle.style.setProperty('--title-scale', design.titleSize || 1);

  // Card styles
  poster.classList.remove('cstyle-round', 'cstyle-sharp', 'cstyle-circle');
  poster.classList.add(`cstyle-${design.cardStyle}`);

  // Frame styles
  poster.classList.remove('frame-none', 'frame-thin', 'frame-thick', 'frame-dashed', 'frame-polaroid', 'frame-glow');
  poster.classList.add(`frame-${design.frameStyle || 'none'}`);

  // Footer decorators
  footerDeco.className = `footer-deco deco-${design.deco}`;
  if (decoUploadSection) decoUploadSection.style.display = (design.deco === 'custom') ? 'flex' : 'none';

  if (design.deco === 'cleaning') {
    footerDeco.innerHTML = '<span>🧼</span><span>🧽</span><span>🧹</span><span>🪣</span><span>✨</span>';
  } else if (design.deco === 'water') {
    footerDeco.innerHTML = '<span>💦</span><span>🫧</span><span>✨</span><span>🫧</span><span>💦</span>';
  } else if (design.deco === 'custom') {
    footerDeco.innerHTML = customDecos.map(img => `
      <img src="${img}" style="height:${design.decoSize || 65}px; width:auto; border-radius:8px; vertical-align:middle; margin:0 6px; box-shadow:0 3px 10px rgba(0,0,0,0.3);">
    `).join('');
  } else {
    footerDeco.innerHTML = '';
  }
}

// ──────────────────────────────────────────────
//  模式切換 (編輯/預覽模式)
// ──────────────────────────────────────────────
const btnToggleEdit = document.getElementById('btnToggleEdit');

function setEditMode(on) {
  editMode = on;
  poster.classList.toggle('edit-mode', on);
  btnToggleEdit.classList.toggle('active', on);
  
  if (on) {
    btnToggleEdit.innerHTML = '<i class="fa-solid fa-eye"></i> 預覽與實踐';
    showToast('✏️ 已進入「編輯模式」！可雙擊修改標題，點擊步驟修改照片或文字');
  } else {
    btnToggleEdit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> 編輯模式';
    showToast('👁️ 已進入「預覽實踐模式」！學生可在平板上點擊打勾記錄進度');
    // 切換回預覽時，清除所有人打勾，重設進度
    steps.forEach(s => s.checked = false);
    saveSteps();
  }

  [mainTitle, subTitle, footerLabel].forEach(el => {
    el.contentEditable = on ? 'true' : 'false';
  });

  applyDesign();
  render();
  updateProgressBar();
}

btnToggleEdit.addEventListener('click', () => setEditMode(!editMode));

// ──────────────────────────────────────────────
//  步驟編輯 Modal 視窗控制
// ──────────────────────────────────────────────
function openModal(idx) {
  editingIdx = idx;
  const step = steps[idx];
  editTitleEl.value = step.title;
  editDescEl.value = step.desc || '';
  editImgData = step.img || null;
  
  updateOrderHint();
  renderImgPreview();
  modalOverlay.classList.add('active');
  editTitleEl.focus();
  editTitleEl.select();
}

function closeModal() {
  modalOverlay.classList.remove('active');
  editingIdx = null;
  editImgData = null;
  editTitleEl.classList.remove('error');
}

function updateOrderHint() {
  if (editingIdx === null) return;
  orderHint.textContent = `（第 ${editingIdx + 1} 步，共 ${steps.length} 步）`;
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('btnCancelStep').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

// ──────────────────────────────────────────────
//  編輯視窗中的圖片處理
// ──────────────────────────────────────────────
function renderImgPreview() {
  if (editImgData) {
    imgPreview.innerHTML = `<img src="${editImgData}" alt="相片預覽">`;
  } else {
    imgPreview.innerHTML = `
      <div class="img-placeholder-inner">
        <span class="img-icon"><i class="fa-solid fa-camera"></i></span>
        <span>點擊上傳、拍相片，或拖曳圖片到此處</span>
        <span class="img-hint">支援各種常見圖片格式，系統會自動壓縮</span>
      </div>`;
  }
}

// 選擇與相機事件
document.getElementById('btnUploadImg').addEventListener('click', () => {
  imgFileInput.removeAttribute('capture');
  imgFileInput.click();
});

document.getElementById('btnCameraImg').addEventListener('click', () => {
  imgFileInput.setAttribute('capture', 'environment');
  imgFileInput.click();
});

imgPreview.addEventListener('click', () => {
  imgFileInput.removeAttribute('capture');
  imgFileInput.click();
});

document.getElementById('btnClearImg').addEventListener('click', () => {
  editImgData = null;
  renderImgPreview();
});

// 順時針旋轉圖片 90 度
document.getElementById('btnRotateImg').addEventListener('click', () => {
  if (!editImgData) {
    showToast('⚠️ 請先選擇上傳圖片再點擊旋轉');
    return;
  }
  const img = new Image();
  img.onload = () => {
    const cvs = document.createElement('canvas');
    cvs.width = img.height;
    cvs.height = img.width;
    const ctx = cvs.getContext('2d');
    ctx.translate(cvs.width / 2, cvs.height / 2);
    ctx.rotate(90 * Math.PI / 180);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    
    // 壓縮儲存 Base64
    editImgData = cvs.toDataURL('image/jpeg', 0.8);
    renderImgPreview();
  };
  img.src = editImgData;
});

// 讀取檔案
imgFileInput.addEventListener('change', () => {
  const file = imgFileInput.files[0];
  if (!file) return;
  readFileAsDataURL(file, dataUrl => {
    editImgData = dataUrl;
    renderImgPreview();
  });
  imgFileInput.value = '';
});

// 拖放圖片
imgDropZone.addEventListener('dragover', e => {
  e.preventDefault();
  imgPreview.classList.add('drag-active');
});

imgDropZone.addEventListener('dragleave', () => {
  imgPreview.classList.remove('drag-active');
});

imgDropZone.addEventListener('drop', e => {
  e.preventDefault();
  imgPreview.classList.remove('drag-active');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    readFileAsDataURL(file, dataUrl => {
      editImgData = dataUrl;
      renderImgPreview();
    });
  }
});

// 讀取檔案為 Base64 並壓縮以防 LocalStorage 空間不足
function readFileAsDataURL(file, cb) {
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 800;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height = Math.round(height * (MAX_WIDTH / width));
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width = Math.round(width * (MAX_HEIGHT / height));
          height = MAX_HEIGHT;
        }
      }

      const cvs = document.createElement('canvas');
      cvs.width = width;
      cvs.height = height;
      const ctx = cvs.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      cb(cvs.toDataURL('image/jpeg', 0.7)); // 0.7 品質進行高度壓縮
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// ──────────────────────────────────────────────
//  步驟上下移動排序
// ──────────────────────────────────────────────
document.getElementById('btnMoveUp').addEventListener('click', () => {
  if (editingIdx === null || editingIdx === 0) return;
  [steps[editingIdx - 1], steps[editingIdx]] = [steps[editingIdx], steps[editingIdx - 1]];
  editingIdx--;
  updateOrderHint();
  saveSteps();
  render();
  showToast('⬆️ 步驟已往前移');
});

document.getElementById('btnMoveDown').addEventListener('click', () => {
  if (editingIdx === null || editingIdx === steps.length - 1) return;
  [steps[editingIdx], steps[editingIdx + 1]] = [steps[editingIdx + 1], steps[editingIdx]];
  editingIdx++;
  updateOrderHint();
  saveSteps();
  render();
  showToast('⬇️ 步驟已往後移');
});

// ──────────────────────────────────────────────
//  儲存步驟
// ──────────────────────────────────────────────
document.getElementById('btnSaveStep').addEventListener('click', () => {
  if (editingIdx === null) return;
  const titleVal = editTitleEl.value.trim();
  if (!titleVal) {
    editTitleEl.classList.add('error');
    editTitleEl.focus();
    return;
  }
  editTitleEl.classList.remove('error');

  steps[editingIdx].title = titleVal;
  steps[editingIdx].desc = editDescEl.value.trim();
  steps[editingIdx].img = editImgData;

  saveSteps();
  render();
  closeModal();
  updateProgressBar();
  showToast(`💾 已儲存步驟「${titleVal}」！`);
});

// ──────────────────────────────────────────────
//  刪除與新增步驟
// ──────────────────────────────────────────────
document.getElementById('btnDeleteStep').addEventListener('click', () => {
  if (editingIdx === null) return;
  const name = steps[editingIdx].title;
  if (!confirm(`確定要刪除「${name}」這個打掃步驟嗎？`)) return;
  
  steps.splice(editingIdx, 1);
  saveSteps();
  render();
  closeModal();
  updateProgressBar();
  showToast(`🗑️ 已刪除「${name}」步驟`);
});

function addStep() {
  const newStep = {
    id: nextId++,
    title: `新步驟 ${steps.length + 1}`,
    desc: '',
    img: null,
    checked: false
  };
  steps.push(newStep);
  saveSteps();
  render();
  updateProgressBar();
  openModal(steps.length - 1);
}

document.getElementById('btnAddStep').addEventListener('click', () => {
  if (!editMode) setEditMode(true);
  addStep();
});

// ──────────────────────────────────────────────
//  版面設計面板 (Design Panel) 控制
// ──────────────────────────────────────────────
const btnDesign = document.getElementById('btnDesign');
btnDesign.addEventListener('click', () => {
  designPanel.classList.toggle('open');
  document.body.classList.toggle('panel-open', designPanel.classList.contains('open'));
});

document.getElementById('designPanelClose').addEventListener('click', () => {
  designPanel.classList.remove('open');
  document.body.classList.remove('panel-open');
});

// 主題按鈕事件
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    design.theme = btn.dataset.theme;
    saveDesign();
    applyDesign();
  });
});

// 欄數按鈕事件
document.querySelectorAll('.col-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.col-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    design.cols = parseInt(btn.dataset.cols);
    saveDesign();
    applyDesign();
    render();
  });
});

// 標題字型大小拉桿
titleSizeSlider.value = design.titleSize || 1;
titleSizeSlider.addEventListener('input', () => {
  design.titleSize = parseFloat(titleSizeSlider.value);
  saveDesign();
  applyDesign();
});

// 說明文字字型大小拉桿
stepTextSizeSlider.value = design.stepTextSize || 1;
stepTextSizeSlider.addEventListener('input', () => {
  design.stepTextSize = parseFloat(stepTextSizeSlider.value);
  saveDesign();
  applyDesign();
});

// 卡片邊角
document.querySelectorAll('.card-style-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.card-style-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    design.cardStyle = btn.dataset.cstyle;
    saveDesign();
    applyDesign();
  });
});

// 裝飾類型
document.querySelectorAll('.deco-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.deco-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    design.deco = btn.dataset.deco;
    saveDesign();
    applyDesign();
  });
});

// 列印分頁步驟數設定
document.querySelectorAll('.print-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.print-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    design.perpage = parseInt(btn.dataset.perpage);
    saveDesign();
    applyDesign();
  });
});

// 自訂底部裝飾大小拉桿
decoSizeSlider.value = design.decoSize || 65;
decoSizeSlider.addEventListener('input', () => {
  design.decoSize = parseInt(decoSizeSlider.value);
  saveDesign();
  applyDesign();
});

// 製作標籤 Label
labelInput.value = localStorage.getItem('clean_footer') || '瑞翔日間作業所';
labelInput.addEventListener('input', () => {
  footerLabel.textContent = labelInput.value || '瑞翔日間作業所';
  localStorage.setItem('clean_footer', labelInput.value);
});

// 恢復自訂面板在 UI 上的選取狀態
function restoreDesignUI() {
  document.querySelectorAll('.theme-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.theme === design.theme);
  });
  document.querySelectorAll('.col-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.cols) === design.cols);
  });
  titleSizeSlider.value = design.titleSize || 1;
  stepTextSizeSlider.value = design.stepTextSize || 1;
  document.querySelectorAll('.card-style-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cstyle === design.cardStyle);
  });
  document.querySelectorAll('.deco-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.deco === design.deco);
  });
  document.querySelectorAll('.print-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.perpage) === (design.perpage || 1));
  });
  document.querySelectorAll('.frame-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.frame === (design.frameStyle || 'none'));
  });
  decoSizeSlider.value = design.decoSize || 65;
}

// ──────────────────────────────────────────────
//  大標題與 Footer 在畫面上直接編輯失去焦點事件
// ──────────────────────────────────────────────
[mainTitle, subTitle, footerLabel].forEach(el => {
  el.addEventListener('blur', () => {
    localStorage.setItem('clean_title_main', mainTitle.textContent);
    localStorage.setItem('clean_title_sub', subTitle.textContent);
    localStorage.setItem('clean_footer', footerLabel.textContent);
    if (el === footerLabel) labelInput.value = footerLabel.textContent;
  });
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      el.blur();
    }
  });
});

// ──────────────────────────────────────────────
//  列印按鈕
// ──────────────────────────────────────────────
document.getElementById('btnPrint').addEventListener('click', () => {
  // 自動進入預覽模式，並關閉側邊面板
  setEditMode(false);
  designPanel.classList.remove('open');
  document.body.classList.remove('panel-open');
  
  // 等待渲染後發送列印指令
  setTimeout(() => {
    window.print();
  }, 300);
});

// ──────────────────────────────────────────────
//  祝賀視窗關閉
// ──────────────────────────────────────────────
document.getElementById('btnCongratsClose').addEventListener('click', () => {
  congratsOverlay.classList.remove('active');
  // 完成後重設打勾
  steps.forEach(s => s.checked = false);
  saveSteps();
  render();
  updateProgressBar();
});

// ──────────────────────────────────────────────
//  熱鍵監聽
// ──────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (modalOverlay.classList.contains('active')) closeModal();
    else if (congratsOverlay.classList.contains('active')) {
      congratsOverlay.classList.remove('active');
    } else if (designPanel.classList.contains('open')) {
      designPanel.classList.remove('open');
      document.body.classList.remove('panel-open');
    }
  }
  // 在編輯步驟彈窗時按下 Enter 鍵保存
  if (e.key === 'Enter' && modalOverlay.classList.contains('active') && e.target !== editDescEl) {
    document.getElementById('btnSaveStep').click();
  }
});

// ──────────────────────────────────────────────
//  自訂底部裝飾圖的 Slot 上傳處理
// ──────────────────────────────────────────────
function renderDecoSlots() {
  if (!decoSlots) return;
  decoSlots.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const slot = document.createElement('div');
    slot.className = 'deco-slot';
    
    if (customDecos[i]) {
      slot.innerHTML = `<img src="${customDecos[i]}" style="width:100%; height:100%; object-fit:cover; border-radius:6px;">`;
      slot.onclick = () => {
        if (confirm('是否要刪除這張自訂的底部裝飾相片？')) {
          customDecos.splice(i, 1);
          saveDecos();
          renderDecoSlots();
          applyDesign();
        }
      };
    } else {
      slot.innerHTML = '<span>＋</span>';
      slot.onclick = () => {
        decoFileInput.value = '';
        decoFileInput.click();
      };
    }
    decoSlots.appendChild(slot);
  }
}

if (decoFileInput) {
  decoFileInput.addEventListener('change', () => {
    const files = decoFileInput.files;
    if (!files || !files.length) return;
    
    let i = 0;
    const processNext = () => {
      if (i >= files.length || customDecos.length >= 5) {
        decoFileInput.value = '';
        saveDecos();
        renderDecoSlots();
        applyDesign();
        return;
      }
      
      readFileAsDataURL(files[i], dataUrl => {
        customDecos.push(dataUrl);
        i++;
        processNext();
      });
    };
    processNext();
  });
}

// ──────────────────────────────────────────────
//  Preset 選項切換監聽
// ──────────────────────────────────────────────
presetSelector.addEventListener('change', (e) => {
  loadPreset(e.target.value, true);
});

// ──────────────────────────────────────────────
//  初始化啟動
// ──────────────────────────────────────────────
window.onload = () => {
  loadState();
  restoreDesignUI();
  applyDesign();
  render();
  updateProgressBar();
  renderDecoSlots();
  showToast('🧼 打掃工作流程製作器載入完成！可自由切換上方打掃項目');
};

// ──────────────────────────────────────────────
//  圖框樣式切換
// ──────────────────────────────────────────────
document.querySelectorAll('.frame-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.frame-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    design.frameStyle = btn.dataset.frame;
    saveDesign();
    applyDesign();

    // 自訂圖框上傳區顯示/隱藏
    const uploadArea = document.getElementById('customFrameUploadArea');
    if (design.frameStyle === 'custom') {
      uploadArea.style.display = 'flex';
    } else {
      uploadArea.style.display = 'none';
    }

    // 更新所有卡片的 overlay
    applyCustomFrameOverlay();
    showToast(`🖼️ 圖框樣式已切換！`);
  });
});

// ──────────────────────────────────────────────
//  自訂圖框：上傳、預覽、套用到每張卡片
// ──────────────────────────────────────────────

// 從 localStorage 恢復自訂圖框
let customFrameBase64 = localStorage.getItem('clean_custom_frame') || '';

// 初始化預覽
function refreshCustomFramePreview() {
  const previewBox = document.getElementById('customFramePreview');
  if (!previewBox) return;
  if (customFrameBase64) {
    previewBox.innerHTML = `<img src="${customFrameBase64}" alt="自訂圖框預覽">`;
  } else {
    previewBox.innerHTML = `<span style="color:#64748b; font-size:0.75rem;">尚未上傳圖框</span>`;
  }
}

// 把自訂圖框 overlay 注入每張卡片的 .step-img-wrap (使用 CSS Grid 疊加，最相容列印)
function applyCustomFrameOverlay() {
  document.querySelectorAll('.step-img-wrap').forEach(wrap => {
    // 移除舊的 overlay (如果有殘留的 img)
    wrap.querySelectorAll('.custom-frame-overlay').forEach(el => el.remove());
    wrap.style.backgroundImage = ''; // 清除之前的舊設定

    // 只在自訂模式且有圖框時加入
    if (design.frameStyle === 'custom' && customFrameBase64) {
      const overlay = document.createElement('img');
      overlay.src = customFrameBase64;
      overlay.className = 'custom-frame-overlay';
      overlay.alt = '圖框';
      // 確保 overlay 出現在 HTML 後面，雖然 CSS Grid z-index 會控制，但這樣更保險
      wrap.appendChild(overlay);
    }
  });
}

// 上傳圖框圖片
document.getElementById('btnUploadFrame').addEventListener('click', () => {
  document.getElementById('frameFileInput').click();
});

document.getElementById('frameFileInput').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    alert('❌ 請選擇圖片檔案（建議使用 PNG 透明背景）');
    return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    customFrameBase64 = ev.target.result;
    localStorage.setItem('clean_custom_frame', customFrameBase64);
    refreshCustomFramePreview();
    applyCustomFrameOverlay();
    showToast('✅ 自訂圖框已套用！');
  };
  reader.readAsDataURL(file);
  e.target.value = '';
});

// 清除自訂圖框
document.getElementById('btnClearFrame').addEventListener('click', () => {
  customFrameBase64 = '';
  localStorage.removeItem('clean_custom_frame');
  refreshCustomFramePreview();
  applyCustomFrameOverlay();
  showToast('🗑️ 已清除自訂圖框。');
});

// 頁面載入時如有自訂圖框則顯示上傳區
window.addEventListener('DOMContentLoaded', () => {
  refreshCustomFramePreview();
  if (design.frameStyle === 'custom') {
    const uploadArea = document.getElementById('customFrameUploadArea');
    if (uploadArea) uploadArea.style.display = 'flex';
  }
});


// ──────────────────────────────────────────────
//  💾 存檔功能（匯出 JSON 檔案）
// ──────────────────────────────────────────────
function saveDraft() {
  const draftData = {
    version: 2,
    savedAt: new Date().toLocaleString('zh-TW'),
    title: mainTitle.textContent.trim(),
    subtitle: subTitle.textContent.trim(),
    footer: footerLabel.textContent.trim(),
    design: design,
    steps: steps,
    customFrame: customFrameBase64 || ''
  };

  const json = JSON.stringify(draftData, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  const title = mainTitle.textContent.trim() || '打掃工作流程';
  a.href     = url;
  a.download = `${title}_存檔.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('💾 存檔完成！檔案已下載到您的電腦。');
}

document.getElementById('btnSaveDraft').addEventListener('click', saveDraft);

// ──────────────────────────────────────────────
//  📂 載入存檔功能（讀取 JSON 檔案）
// ──────────────────────────────────────────────
function loadDraft(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);

      if (!data.steps || !Array.isArray(data.steps)) {
        alert('❌ 這個檔案格式不正確，無法載入。');
        return;
      }

      if (!confirm(`確定要載入「${data.title || '存檔'}」嗎？目前的內容會被取代。`)) return;

      // 還原所有資料
      steps = data.steps;
      design = { ...design, ...(data.design || {}) };

      if (data.title)    mainTitle.textContent   = data.title;
      if (data.subtitle) subTitle.textContent    = data.subtitle;
      if (data.footer) {
        footerLabel.textContent = data.footer;
        labelInput.value        = data.footer;
      }

      // 確保 frameStyle 有值
      if (!design.frameStyle) design.frameStyle = 'none';

      // 還原自訂圖框
      if (data.customFrame) {
        customFrameBase64 = data.customFrame;
        localStorage.setItem('clean_custom_frame', customFrameBase64);
      } else {
        customFrameBase64 = '';
        localStorage.removeItem('clean_custom_frame');
      }

      // 同步儲存
      saveSteps();
      saveDesign();
      localStorage.setItem('clean_title_main', mainTitle.textContent);
      localStorage.setItem('clean_title_sub',  subTitle.textContent);
      localStorage.setItem('clean_footer',      footerLabel.textContent);

      nextId = Math.max(0, ...steps.map(s => s.id || 0)) + 1;

      restoreDesignUI();
      applyDesign();
      refreshCustomFramePreview();
      applyCustomFrameOverlay();
      render();
      updateProgressBar();

      showToast(`✅ 已成功載入「${data.title || '存檔'}」！`);
    } catch (err) {
      alert('❌ 載入失敗：檔案可能已損壞。\n' + err.message);
    }
  };
  reader.readAsText(file, 'utf-8');
}

document.getElementById('btnLoadDraft').addEventListener('click', () => {
  document.getElementById('loadDraftInput').click();
});

document.getElementById('loadDraftInput').addEventListener('change', e => {
  const file = e.target.files[0];
  if (file) {
    loadDraft(file);
    e.target.value = ''; // 重設讓同一個檔案也能再次載入
  }
});

// ──────────────────────────────────────────────
//  匯出 Word 功能
// ──────────────────────────────────────────────
const THEME_COLORS = {
  mint:          { bg: '#059669', accent: '#fef08a', text: '#ffffff', cardBg: '#ffffff', cardText: '#1e293b', labelBg: '#059669' },
  sky:           { bg: '#0284c7', accent: '#a7f3d0', text: '#ffffff', cardBg: '#ffffff', cardText: '#1e293b', labelBg: '#0284c7' },
  citrus:        { bg: '#ea580c', accent: '#fef08a', text: '#ffffff', cardBg: '#ffffff', cardText: '#1e293b', labelBg: '#ea580c' },
  lavender:      { bg: '#7c3aed', accent: '#fbcfe8', text: '#ffffff', cardBg: '#ffffff', cardText: '#1e293b', labelBg: '#7c3aed' },
  rose:          { bg: '#db2777', accent: '#fef08a', text: '#ffffff', cardBg: '#ffffff', cardText: '#1e293b', labelBg: '#db2777' },
  highcontrast:  { bg: '#000000', accent: '#fbbf24', text: '#fbbf24', cardBg: '#000000', cardText: '#ffffff', labelBg: '#fbbf24' }
};

function exportToWord() {
  const theme = THEME_COLORS[design.theme] || THEME_COLORS.mint;
  const cols   = design.cols || 4;
  const title  = mainTitle.textContent.trim()  || '打掃工作流程';
  const sub    = subTitle.textContent.trim()   || '';
  const footer = footerLabel.textContent.trim() || '';

  // 決定每列步驟數（Word 表格）
  const colWidth = Math.floor(100 / cols);

  // 把步驟切成每列 cols 個
  const rows = [];
  for (let i = 0; i < steps.length; i += cols) {
    rows.push(steps.slice(i, i + cols));
  }

  // 生成每個步驟卡片的 HTML (Word 相容)
  function stepCardHtml(step, idx) {
    const borderRadius = design.cardStyle === 'sharp' ? '2pt' : '10pt';
    const imgHtml = step.img
      ? `<div style="text-align:center; margin-bottom:6pt;">
           <img src="${step.img}" style="max-width:100%; max-height:120pt; object-fit:contain; border-radius:${borderRadius};" />
         </div>`
      : `<div style="height:110pt; background:#f1f5f9; border-radius:${borderRadius}; display:flex; align-items:center; justify-content:center; margin-bottom:6pt; border:1pt solid #e2e8f0;">
           <p style="color:#94a3b8; font-size:11pt; text-align:center; margin:0;">📷 尚無照片</p>
         </div>`;

    return `
      <div style="
        background:${theme.cardBg};
        border-radius:${borderRadius};
        overflow:hidden;
        box-shadow:0 2pt 8pt rgba(0,0,0,0.18);
        display:flex;
        flex-direction:column;
        height:100%;
      ">
        ${imgHtml}
        <div style="
          background:${theme.labelBg};
          padding:8pt 10pt 10pt;
          flex:1;
        ">
          <div style="
            font-size:9pt;
            font-weight:700;
            color:rgba(255,255,255,0.8);
            margin-bottom:2pt;
            letter-spacing:1pt;
          ">步驟 ${idx + 1}</div>
          <div style="
            font-size:12pt;
            font-weight:900;
            color:#ffffff;
            margin-bottom:4pt;
            line-height:1.3;
          ">${esc(step.title)}</div>
          ${step.desc
            ? `<div style="font-size:10pt; color:rgba(255,255,255,0.85); line-height:1.4;">${esc(step.desc)}</div>`
            : ''}
        </div>
      </div>`;
  }

  // 生成表格行的 HTML
  function tableRowHtml(rowSteps, startIdx) {
    const cells = rowSteps.map((step, i) => `
      <td style="
        width:${colWidth}%;
        padding:6pt;
        vertical-align:top;
      ">
        ${stepCardHtml(step, startIdx + i)}
      </td>`).join('');

    // 補空格子
    const emptyCells = Array(cols - rowSteps.length).fill(
      `<td style="width:${colWidth}%; padding:6pt;"></td>`
    ).join('');

    return `<tr>${cells}${emptyCells}</tr>`;
  }

  // 裝飾 emoji
  const decoMap = {
    cleaning: '🧼 🧽 🧹 🪣 ✨',
    water: '💦 🫧 ✨ 🫧 💦',
    none: '',
    custom: ''
  };
  const decoLine = decoMap[design.deco] || '';

  // 完整 Word 文件 HTML
  const htmlContent = `
<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>90</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      size: A4;
      margin: 15mm 12mm;
    }
    body {
      font-family: '微軟正黑體', 'Microsoft JhengHei', 'Noto Sans TC', Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: #ffffff;
    }
    table { border-collapse: collapse; width: 100%; }
    td { padding: 6pt; vertical-align: top; }
  </style>
</head>
<body>

<!-- 海報主體：有色背景大區塊 -->
<div style="
  background:${theme.bg};
  border-radius:16pt;
  padding:28pt 22pt 22pt;
  margin:0;
">

  <!-- 標題區 -->
  <div style="text-align:center; margin-bottom:16pt;">
    <h1 style="
      font-size:${Math.round(32 * (design.titleSize || 1))}pt;
      font-weight:900;
      color:${theme.text};
      letter-spacing:6pt;
      margin:0 0 6pt 0;
      line-height:1.2;
    ">${title}</h1>
    ${sub ? `<p style="
      font-size:${Math.round(16 * (design.titleSize || 1))}pt;
      font-weight:700;
      color:${theme.accent};
      letter-spacing:4pt;
      margin:0;
    ">${sub}</p>` : ''}
  </div>

  <!-- 步驟卡片表格 -->
  <table style="width:100%; border-collapse:separate; border-spacing:8pt;">
    ${rows.map((row, rIdx) => tableRowHtml(row, rIdx * cols)).join('\n')}
  </table>

  <!-- 底部裝飾 -->
  ${decoLine ? `<div style="text-align:center; margin-top:14pt; font-size:20pt; letter-spacing:4pt;">${decoLine}</div>` : ''}

  <!-- 底部標籤 -->
  ${footer ? `<div style="
    text-align:center;
    margin-top:10pt;
    font-size:11pt;
    font-weight:700;
    color:rgba(255,255,255,0.75);
    letter-spacing:2pt;
  ">${footer}</div>` : ''}

</div>

</body>
</html>`;

  // 用 Blob 下載為 .doc 檔
  const blob = new Blob(['\ufeff' + htmlContent], {
    type: 'application/msword;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const a   = document.createElement('a');
  a.href    = url;
  a.download = `${title}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('📄 Word 檔案已下載！用 Microsoft Word 或 Google 文件開啟即可。');
}

document.getElementById('btnExportWord').addEventListener('click', exportToWord);
