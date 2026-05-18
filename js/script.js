// /js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DOM 요소 선택 ---
    const gridContainer = document.querySelector('.grid-container');
    const linesOverlay = document.querySelector('.grid-lines-overlay');
    const sloganContainers = document.querySelectorAll('.slogan-container');
    const imgScrollWrapper = document.querySelector('.img-scroll-wrapper');
    const imageTrack = document.getElementById('image-track');
    const projectDescriptionContainer = document.querySelector('.project-description-container');

    const elTitle = document.getElementById('p-title');
    const elCategory = document.getElementById('p-category');
    const elYear = document.getElementById('p-year');
    const elDesc = document.getElementById('p-description');
    const elCurrentNum = document.getElementById('current-num');
    const elTotalNum = document.getElementById('total-num');

    const btnPrev = document.querySelector('.button-col-1');
    const btnNextArrow = document.querySelector('.button-col-11-1');
    const btnNextMenu = document.querySelector('.button-col-11-2'); 

    // --- 2. 상수 및 상태 변수 ---
    const COLUMN_COUNT = 11;
    const GUTTER_WIDTH_RATIO = 0.002;
    const ROW_HEIGHTS_RATIO = [0.015, 0.045, 0.91, 0.015, 0.015];
    const MAGENTA_COLOR = '#feccff';
    const LINE_THICKNESS = 1;

    let lastProjectIndex = 0;
    let lastRandomColor = '';

    // --- 3. 링크 심볼 설정 ---
    const linkSymbol = document.createElement('div');
    linkSymbol.classList.add('project-link-symbol');
    linkSymbol.style.backgroundColor = "transparent";
    linkSymbol.style.borderRadius = "0";

    const titleContainer = document.querySelector('.project-info-container');
    if (titleContainer) {
        titleContainer.style.position = 'relative';
        titleContainer.appendChild(linkSymbol);
    }

    // --- 4. 프로젝트 데이터 시작 ---
    const projects = [{
            title: "Iconic Icon",
            category: "personal project, sticker",
            year: "2025 *(ongoing)*",
            desc: `Iconic Icon started as a project exploring how design can operate on its own by treating social demands as the client, and searching for the right methods and media to respond to them.
            
Icons (more precisely, symbols) are a powerful visual language. They communicate messages and nuances without words. In Iconic Icon, I use the intuitive impact of icons to speak against hatred by responding to problems embedded in our social climate and the inherent demand to resolve them. 
Moving beyond design exhibitions limited to curated audiences in white cubes, the project intends its design output to meet random passersby on the street.
            
The first theme is “Hatred-blocking Icons.” Four types of icon stickers were directly applied to hateful materials found on the street. You can spot them scattered throughout the streets of Jongno-gu, Seoul.

(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">설명을 재고하고 있습니다.</span>`,
            media: ["/img/iconicicon/icon_1.png", "/img/iconicicon/icon_2.png", "/img/iconicicon/icon_3.png", "/img/iconicicon/icon_4.png"],
            link: "iconicicon.html",
            icon: "/img/icon/iconic_icon.svg",
            linkMsg: "essay"
        },
        {
            title: "Illegal Area",
            category: "personal project, sticker",
            year: "2025 *(ongoing)*",
            desc: `Illegal Area is a street-based project that identifies public spaces where graphics can physically intervene, designates them as “Illegal Area”, and then attaches stickers reproducing the visual styles found within those areas.

While exploring ways to engage with the urban landscape through graphics, I began by analyzing the graphics already present on the streets.
            
The project was structured around two themes: "Orderly Illegal Zones" and "Disorderly Illegal Zones." I produced stickers that capture the distinct style of each zone and applied them to their respective locations.

(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">설명을 재고하고 있습니다.</span>`,
            media: ["/img/illegal/illegal_1.png", "/img/illegal/illegal_2.png", "/img/illegal/illegal_3.png"]
        },
        {
            title: "Public Design Walk",
            category: "personal project, exhibition",
            year: "2025",
            desc: `Public Design Walk is an exhibition project that showcases two projects, “Iconic Icon” and “Illegal Area”. It is a permanent exhibition taking place in Jongno-gu, Seoul.

The aim was to move beyond the limited audiences who are able to access exhibition information and visit design exhibitions, and plan an exhibition that engages diverse, random audiences. Developing the two preceding projects on street-based participation, I therefore explored their potential to evolve into an exhibition. In order to create a street exhibition, the area was specifically limited to Jongno-gu in Seoul, where the works were attached.
            
I created digital posters and a catalogue to promote the exhibition. The contracts featured on the poster declares that this work is not merely a personal project by the designer, but an “official design work” that underwent an officially approval process similar to that for a commissioned project.
             
(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">설명을 재고하고 있습니다.</span>`,
            media: ["/img/pdw/pdw_1.png", "/img/pdw/pdw_2.png"]
        },
        {
            title: "No surfing club",
            category: "personal project, SNS",
            year: "2024 *(ongoing)*",
            desc: `No surfing club is a fictional club that exists only on Instagram.
        
1) Become known for a very distinctive style, or 2) have friends working inside the club scene, otherwise, getting commissioned to design club posters is difficult. So instead of waiting, I started my own club. The only content No surfing club offers is live show posters featuring font Transition that constantly morphs inside a hypercube. Recently, I have also been making unrestricted posters based on the keywords “dimension” and “transition.” No hierarchy, No refinement, and No obligation to be readable. The core concept of minority graphics is the main source of No Surfing Club, and the style of the club is continuously transitioning.
        
As a designer who produces content firsthand, I see No Surfing Club as an experiment in finding a sustainable way to survive as an independent designer.
        
(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">설명을 재고하고 있습니다.</span>`,
            media: ["https://player.vimeo.com/video/1169303778?badge=0&autopause=0&player_id=0&app_id=58479", "https://player.vimeo.com/video/1169303797?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479", "https://player.vimeo.com/video/1169303825?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"],
            link: "https://www.instagram.com/no.surfingclub",
            icon: "/img/icon/nsc_icon.svg",
            linkMsg: "sns"
        },
        {
            title: "Soul Digital",
            category: "personal project, SNS",
            year: "2025 *(ongoing)*",
            desc: `No surfing club is a fictional club that exists only on Instagram.
        
1) Become known for a very distinctive style, or 2) have friends working inside the club scene, otherwise, getting commissioned to design club posters is difficult. So instead of waiting, I started my own club. The only content No surfing club offers is live show posters featuring font Transition that constantly morphs inside a hypercube. Recently, I have also been making unrestricted posters based on the keywords “dimension” and “transition.” No hierarchy, No refinement, and No obligation to be readable. The core concept of minority graphics is the main source of No Surfing Club, and the style of the club is continuously transitioning.
        
As a designer who produces content firsthand, I see No Surfing Club as an experiment in finding a sustainable way to survive as an independent designer.
        
(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">설명을 재고하고 있습니다.</span>`,
            media: ["/img/souldigital/souldigital_1.png", "/img/souldigital/souldigital_2.png", "https://player.vimeo.com/video/1169305293?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479", "/img/souldigital/souldigital_4.png", "/img/souldigital/souldigital_5.png"],
            link: "https://www.instagram.com/souldigital.official",
            icon: "/img/icon/souldigital_icon.svg",
            linkMsg: "sns"
        },
        {
            title: "meta-Canvas",
            category: "personal project, digital",
            year: "2025 *(ongoing)*",
            desc: `meta-Canvas is a project that visualizes the hierarchies emerging between various graphic design media. The work comprises both essays which serve as commentaries and symbolic images. This project was made to be optimized for the Instagram format.

The first series defines the distinct characteristics of design as it materialized in digital or printed media. This inquiry began during a social media-based project, where the rapid consumption of digital works led me to doubt my identity as a designer. The project started from the idea that producing designs for print is a privilege reserved for a few designers.
            
Canvas<>background, Art<>work, Spectacle<>essence: these are the three thematic pairs of the first series
            
Moving forward, the project will continue to examine hierarchies within design themes and styles. My goal is to foster a critical awareness among fellow designers regarding systemic disparities within the field and to prompt a collective reconsideration of why these hierarchies exist.
            
(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">설명을 재고하고 있습니다.</span>`,
            media: ["/img/metacanvas/meta_1.png", "/img/metacanvas/meta_2.png", "/img/metacanvas/meta_3.png"],
            link: "metacanvas.html",
            icon: "/img/icon/meta_icon.svg",
            linkMsg: "essay"
        },
        {
            title: "Receipt as media",
            category: "personal project, book",
            year: "2025",
            desc: `Receipt as media is a work that regards the common receipt encountered in daily life as a design media, analyzing its inherent layout and typesetting to reassemble it into a book.

I layered new graphics and text over the original printed elements of collected receipts while strictly maintaining their existing margins. My objective was to examine the narratives generated by the media’s inherent properties, such as its fixed layouts, white space, and varying type sizes.

(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">설명을 재고하고 있습니다.</span>`,
            media: ["/img/receipt/receipt_1.png", "/img/receipt/receipt_2.png", "/img/receipt/receipt_3.png", "/img/receipt/receipt_4.png"]
        },
        {
            title: "Invisible visible",
            category: "personal project, book",
            year: "2025",
            desc: `Invisible visible is a project to define the area that cannot be assured as being observed identically between myself and others as the “inter-visible area,” and to visualize it.

This book contains the process of visualizing eye floaters, which are a representative example of the inter-visible area. I spent about six weeks observing eye floaters, recording them in writings and drawings, and recreating them into images, either by relying on those records or on memory alone.
            
During this process, I realized it was an unstable practice based on instinctive perception. I reflected this characteristic in the concept of the book.
            
To reflect the phenomenal characteristics of eye floaters, Invisible visible was printed on thin paper and remains unbound. This allows readers to observe the “invisible visible objects” by overlapping the pages of their choice.

(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">설명을 재고하고 있습니다.</span>`,
            media: ["/img/invisible/invisible_1.png", "/img/invisible/invisible_2.png", "/img/invisible/invisible_3.png", "/img/invisible/invisible_4.png", "/img/invisible/invisible_5.png"]
        },
        {
            title: "Transition book",
            category: "personal project, book",
            year: "2024",
            desc: `Transition is a typeface created for the branding of “No surfing club” project, which explores the visual expression of the third dimension through graphics.The typeface is named for its transition from a line form to a halftone through 3D modeling.

To emphasize the theme of the project, 'a secretive club without physical space,' the typeface was designed as a cryptic dingbat.
            
Transition was completed as a halftone pattern and consists of four versions: C, M, Y, and K. These versions, each derived from a single halftone pattern, can be combined to form 3D objects, while each version also functions independently. The angles and densities of the halftone patterns in each version are different, creating distinct visual effects.

(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">설명을 재고하고 있습니다.</span>`,
            media: ["/img/transition/tran_1.png", "/img/transition/tran_2.png", "/img/transition/tran_3.png", "/img/transition/tran_4.png", "/img/transition/tran_5.png"],
            link: "transition.html",
            icon: "/img/icon/transition_icon.svg",
            linkMsg: "full"
        },
        {
            title: "Form follows texture",
            category: "personal project, poster",
            year: "2024",
            desc: `Form follows texture is a project that explores digital textures to design objects that evoke the sensation of visual tactility. In the digital realm, any flat image can instantly transform into a texture, connecting these textures to form shapes.
           
(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">설명을 재고하고 있습니다.</span>`,
            media: ["/img/fft/fft_1.png", "/img/fft/fft_2.png", "/img/fft/fft_3.png", "/img/fft/fft_4.png"],
        },
        {
            title: "Spaceship",
            category: "personal project, poster",
            year: "2025",
            desc: `(~˘▾˘)~ ♥ ~(˘▾˘~)`,
            media: ["/img/spaceship/spaceship_1.png", "/img/spaceship/spaceship_2.png", "/img/spaceship/spaceship_3.png"]
        },
        {
            title: "Flip & Ollie",
            category: "personal project, postcard",
            year: "2024",
            desc: `(~˘▾˘)~ ♥ ~(˘▾˘~)`,
            media: ["/img/ollie/ollie_1.png", "/img/ollie/ollie_2.png", "/img/ollie/ollie_3.png"]
        },
    ];
;

// --- 5. 이미지/영상/Vimeo 초기화 ---
function initImages() {
    if (!imageTrack) return;
    imageTrack.innerHTML = '';
    
    projects.forEach((project, pIdx) => {
        const projectWrapper = document.createElement('div');
        projectWrapper.classList.add('project-wrapper');

        // PC 전용 배경 효과 (기존 로직 유지)
        const isStreet = ["Iconic Icon", "Illegal Area", "Public Design Walk"].includes(project.title);
        if (isStreet) {
            Object.assign(projectWrapper.style, {
                backgroundImage: "url('/img/street.svg')",
                backgroundRepeat: "repeat-x",
                backgroundSize: "auto 100%",
                backgroundPosition: "left center"
            });
        }

        project.media.forEach((src, mIdx) => {
            let el;
            
            // [분기 1] Vimeo 링크인 경우
            if (src.includes("player.vimeo.com") || src.includes("vimeo.com")) {
                el = document.createElement('iframe');
                
                // 핵심: background=1 (컨트롤 숨김+자동재생+루프), muted=1, autoplay=1
                const vimeoSrc = src.includes('?') 
                    ? `${src}&autoplay=1&muted=1&loop=1&background=1` 
                    : `${src}?autoplay=1&muted=1&loop=1&background=1`;
                    
                el.src = vimeoSrc;
                el.setAttribute('frameborder', '0');
                el.setAttribute('allow', 'autoplay; fullscreen'); // 자동재생 권한 부여
                el.style.aspectRatio = "16 / 9"; 
                el.classList.add('project-image');
            }
            // [분기 2] 직접 업로드한 .mp4 파일인 경우
            else if (src.toLowerCase().endsWith('.mp4')) {
                el = document.createElement('video');
                el.src = src; 
                el.autoplay = true; 
                el.muted = true; 
                el.loop = true; 
                el.playsInline = true;
            } 
            // [분기 3] 일반 이미지인 경우
            else {
                el = document.createElement('img');
                el.src = src;
            }

            el.classList.add('project-image');
            el.dataset.projectIdx = pIdx;
            el.dataset.isLastInProject = (mIdx === project.media.length - 1);
            projectWrapper.appendChild(el);
        });

        // NSC 스티커 오버레이 로직 (기존 로직 유지)
        if (project.title === "No surfing club") {
            const overlayContainer = document.createElement('div');
            overlayContainer.classList.add('nsc-overlay-container');
            for (let i = 1; i <= 8; i++) {
                const overlayImg = document.createElement('img');
                overlayImg.src = `/img/nsc/sticker/stickers_${i}.png`;
                overlayImg.classList.add('nsc-random-img', `img-${i}`);
                overlayContainer.appendChild(overlayImg);
            }
            projectWrapper.appendChild(overlayContainer);
        }
        imageTrack.appendChild(projectWrapper);
    });
}

// --- 6. 그리드 레이아웃 ---
function createGridLines() {
    if (!linesOverlay) return;
    linesOverlay.innerHTML = '';
    const containerWidth = gridContainer.clientWidth;
    const containerHeight = gridContainer.clientHeight;
    const gutterWidthPx = containerWidth * GUTTER_WIDTH_RATIO;
    const columnWidthPx = (containerWidth - (gutterWidthPx * (COLUMN_COUNT + 1))) / COLUMN_COUNT;

    let currentWidth = 0;
    for (let i = 0; i <= COLUMN_COUNT; i++) {
        currentWidth += gutterWidthPx;
        if (i > 0) {
            const line = document.createElement('div');
            Object.assign(line.style, { left: `${currentWidth - gutterWidthPx}px`, width: `${LINE_THICKNESS}px`, height: '100%', backgroundColor: MAGENTA_COLOR, position: 'absolute' });
            linesOverlay.appendChild(line);
        }
        if (i < COLUMN_COUNT) {
            currentWidth += columnWidthPx;
            const line = document.createElement('div');
            Object.assign(line.style, { left: `${currentWidth - columnWidthPx}px`, width: `${LINE_THICKNESS}px`, height: '100%', backgroundColor: MAGENTA_COLOR, position: 'absolute' });
            linesOverlay.appendChild(line);
        }
    }

    let currentHeight = 0;
    ROW_HEIGHTS_RATIO.forEach((heightRatio, index) => {
        currentHeight += containerHeight * heightRatio;
        if (index < ROW_HEIGHTS_RATIO.length - 1) {
            const line = document.createElement('div');
            Object.assign(line.style, { top: `${currentHeight}px`, height: `${LINE_THICKNESS}px`, width: '100%', backgroundColor: MAGENTA_COLOR, position: 'absolute' });
            linesOverlay.appendChild(line);
        }
    });
}

// --- 7. 프로젝트 배치 및 스크롤 감지 ---
function layoutProjectContent() {
    const containerWidth = gridContainer.clientWidth;
    const gutterWidthPx = containerWidth * GUTTER_WIDTH_RATIO;
    const columnWidthPx = (containerWidth - (gutterWidthPx * (COLUMN_COUNT + 1))) / COLUMN_COUNT;
    const threeColTotalWidth = (3 * columnWidthPx) + (2 * gutterWidthPx);

    document.documentElement.style.setProperty('--three-col-total-width', `${threeColTotalWidth}px`);

    document.querySelectorAll('.project-info-container').forEach((container) => {
        const col = container.classList.contains('col-1') ? 1 : (container.classList.contains('col-2') ? 2 : 3);
        container.style.left = `${(col - 1) * (columnWidthPx + gutterWidthPx) + gutterWidthPx}px`;
    });

    if (projectDescriptionContainer) {
        projectDescriptionContainer.style.left = `${(9 - 1) * (columnWidthPx + gutterWidthPx) + gutterWidthPx}px`;
        projectDescriptionContainer.style.width = `${threeColTotalWidth}px`;
    }

    imageTrack.style.paddingLeft = `${(3 * columnWidthPx) + (4 * gutterWidthPx)}px`;

    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach((img) => {
        img.style.width = `${threeColTotalWidth}px`;
        img.style.marginRight = img.dataset.isLastInProject === 'true' ? `${threeColTotalWidth}px` : `${gutterWidthPx}px`;
    });

    imgScrollWrapper.onscroll = () => {
        const centerX = imgScrollWrapper.scrollLeft + (containerWidth * 0.4);
        let activeIdx = 0;
        projectImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const containerRect = imgScrollWrapper.getBoundingClientRect();
            const relativeLeft = rect.left - containerRect.left + imgScrollWrapper.scrollLeft;
            if (relativeLeft < centerX) activeIdx = parseInt(img.dataset.projectIdx);
        });
        if (activeIdx !== lastProjectIndex) {
            updateProjectText(activeIdx);
            lastProjectIndex = activeIdx;
        }
    };
}

// --- 8. 텍스트 업데이트 ---
function updateProjectText(index) {
    const data = projects[index];
    if (!data) return;

    elTitle.textContent = data.title;
    elCategory.textContent = data.category;
    elYear.textContent = data.year;
    if (elDesc) elDesc.innerHTML = data.desc || '';

    elCurrentNum.textContent = (index + 1).toString().padStart(2, '0');
    elTotalNum.textContent = projects.length.toString().padStart(2, '0');

    const colors = ['#feccff', '#e1fffb', '#edffdc'];
    let newColor;
    do { newColor = colors[Math.floor(Math.random() * colors.length)]; } while (newColor === lastRandomColor);
    if (elDesc) { elDesc.style.backgroundColor = newColor; lastRandomColor = newColor; }

    if (data.link) {
        linkSymbol.style.display = 'block';
        linkSymbol.setAttribute('data-message', data.linkMsg || "View Link");
        linkSymbol.style.backgroundImage = `url('${data.icon || '/img/icon/heart.svg'}')`;
        linkSymbol.onclick = (e) => { 
            e.stopPropagation(); 
            window.location.href = data.link; // 현재 창에서 이동
        };
    } else { 
        linkSymbol.style.display = 'none'; 
    }

    elTitle.classList.remove('title-flash');
    void elTitle.offsetWidth;
    elTitle.classList.add('title-flash');

    document.querySelectorAll('.project-image').forEach(img => {
        img.classList.toggle('focused', parseInt(img.dataset.projectIdx) === index);
    });
}

// --- 9. 스크롤 함수 ---
const scrollToProject = (index) => {
    const wrappers = document.querySelectorAll('.project-wrapper');
    if (!wrappers[index]) return;
    let offset = 0;
    for (let i = 0; i < index; i++) offset += wrappers[i].offsetWidth;
    imgScrollWrapper.scrollTo({ left: offset, behavior: 'smooth' });
};

// --- 10. 메뉴 오버레이 생성 로직 ---
function createMenuOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'menu-overlay';
    overlay.className = 'menu-overlay'; // CSS 클래스 적용
    overlay.style.display = 'flex'; // 활성화

    const menuContent = document.createElement('div');
    menuContent.className = 'menu-content';

    const closeBtn = document.createElement('div');
    closeBtn.className = 'menu-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `position:absolute; top:20px; right:70px; font-size:30px; cursor:pointer; color:${MAGENTA_COLOR};`;
    closeBtn.onclick = () => overlay.remove();

    const listContainer = document.createElement('div');
    listContainer.className = 'menu-project-list';
    listContainer.style.marginTop = '40px';

    projects.forEach((proj, idx) => {
        const item = document.createElement('div');
        item.className = 'menu-item';
        const cleanYear = proj.year.replace(/\*/g, '');
        
        // style="color: #000;" 등을 제거하여 CSS가 제어할 수 있게 합니다.
        item.innerHTML = `
            <div class="m-title" style="font-weight:bold;">${proj.title}</div>
            <div class="m-category">${proj.category}</div>
            <div class="m-year" style="text-align:right;">${cleanYear}</div>
        `;
    
        item.onclick = () => {
            scrollToProject(idx);
            overlay.remove();
        };
        listContainer.appendChild(item);
    });

    menuContent.appendChild(closeBtn);
    menuContent.appendChild(listContainer);
    overlay.appendChild(menuContent);
    document.body.appendChild(overlay);

    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

// --- 11. 버튼 이벤트 ---
function initButtonEvents() {
    if (btnPrev) btnPrev.onclick = () => lastProjectIndex > 0 && scrollToProject(lastProjectIndex - 1);
    if (btnNextArrow) btnNextArrow.onclick = () => {
        if (lastProjectIndex < projects.length - 1) scrollToProject(lastProjectIndex + 1);
    };
    if (btnNextMenu) btnNextMenu.onclick = (e) => {
        e.stopPropagation();
        createMenuOverlay();
    };
}

// --- 12. 원형 요소 배치 및 기타 ---
function positionCircularElements() {
    const r1H = gridContainer.clientHeight * ROW_HEIGHTS_RATIO[0];
    const mH = gridContainer.clientHeight * ROW_HEIGHTS_RATIO[2];
    const cW = gridContainer.clientWidth;
    const gW = cW * GUTTER_WIDTH_RATIO;
    const colW = (cW - (gW * (COLUMN_COUNT + 1))) / COLUMN_COUNT;
    const d = colW / 2;

    sloganContainers.forEach(container => {
        const topPos = r1H - container.offsetTop;
        container.querySelectorAll('.circular-slogan-item').forEach((item, idx) => {
            item.textContent = item.dataset.word;
            Object.assign(item.style, { width: `${d}px`, height: `${d}px`, top: `${topPos}px`, left: `${idx * d}px` });
        });
    });

    document.querySelectorAll('.circular-button').forEach(btn => {
        const col = parseInt(btn.dataset.col);
        const left = ((col - 1) * (colW + gW)) + gW;
        Object.assign(btn.style, { width: `${d}px`, height: `${d}px`, top: `${mH - d}px` });
        if (btn.classList.contains('button-col-11-1') || btn.classList.contains('button-col-11-2')) {
            btn.style.left = `${left + colW - d}px`;
            if (btn.classList.contains('button-col-11-2')) btn.style.top = `0px`;
        } else {
            btn.style.left = btn.classList.contains('button-col-6-2') ? `${left + colW - d}px` : `${left}px`;
        }
    });
}

initImages();
const runLayout = () => { createGridLines(); positionCircularElements(); layoutProjectContent(); };
runLayout();
initButtonEvents();
updateProjectText(0);
window.addEventListener('resize', runLayout);
});
