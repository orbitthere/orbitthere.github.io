// /js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DOM 요소 선택 ---
    const gridContainer = document.querySelector('.grid-container');
    const linesOverlay = document.querySelector('.grid-lines-overlay');
    const sloganContainers = document.querySelectorAll('.slogan-container');
    const imgScrollWrapper = document.querySelector('.img-scroll-wrapper');
    const imageTrack = document.getElementById('image-track');
    const projectDescriptionContainer = document.querySelector('.project-description-container');
    const mobileProjectFeed = document.getElementById('mobile-project-feed');

    const elTitle = document.getElementById('p-title');
    const elCategory = document.getElementById('p-category');
    const elYear = document.getElementById('p-year');
    const elDesc = document.getElementById('p-description');
    const elCurrentNum = document.getElementById('current-num');
    const elTotalNum = document.getElementById('total-num');

    const btnPrev = document.querySelector('.button-col-1');
    const btnNextArrow = document.querySelector('.button-col-11-1');
    const btnNextMenu = document.querySelector('.button-col-11-2');

    const menuOverlay = document.getElementById('menu-overlay');
    const menuCloseBtn = document.getElementById('menu-close-btn');
    const menuProjectList = document.getElementById('menu-project-list');

    // --- 2. 상수 및 상태 변수 ---
    const COLUMN_COUNT = 11;
    const GUTTER_WIDTH_RATIO = 0.002;
    const ROW_HEIGHTS_RATIO = [0.015, 0.045, 0.91, 0.015, 0.015];
    const MAGENTA_COLOR = '#feccff';
    const LINE_THICKNESS = 1;
    const MOBILE_QUERY = '(max-width: 768px)';

    let lastProjectIndex = 0;
    let lastRandomColor = '';
    let mobileRevealObserver = null;

    const isMobile = () => window.matchMedia(MOBILE_QUERY).matches;

    // --- 3. 링크 심볼 설정 ---
    const linkSymbol = document.createElement('div');
    linkSymbol.classList.add('project-link-symbol');
    linkSymbol.style.backgroundColor = 'transparent';
    linkSymbol.style.borderRadius = '0';

    const titleContainer = document.querySelector('.project-info-container');
    if (titleContainer) {
        titleContainer.style.position = 'relative';
        titleContainer.appendChild(linkSymbol);
    }

    // --- 4. 프로젝트 데이터 시작 ---
    const projects = [
        {
            title: "it is all just style_3",
            category: "personal project, poster",
            year: "2026",
            desc: `It is all just style is a poster project which expresses my comprehensive thoughts on graphic design. 

The theme of the posters is design and style, and the inherent elements within graphic design become the main graphic. Each poster develops the fundamental idea behind the project by applying various styles to the same text each time. The text is continuously added, and the hierarchy of the content changes depending on the styles.
            
The decorations that hide the text are inspired by Roland Barthes' concept of "geno-song."            

(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">It is all just style은 그래픽 디자인에 관한 나의 생각을 총체적으로 표현하는 포스터 작업이다.</span>

<span class="ko-text">포스터의 주제는 디자인과 스타일이며, 그래픽 디자인 내부에서 발생한 요소가 주인공이 된다. 각각의 포스터는 동일한 텍스트에 여러 스타일을 적용해서 표현하는 과정을 통해 포스터의 기반이 되는 사고를 발전시킨다. 텍스트는 계속 추가되며 스타일에 따라 내용의 위계가 달라진다.</span>
            
<span class="ko-text">글자를 가리는 장식은 롤랑 바르트의 제노-노래(geno-song)의 개념에 착안한다.</span>`,
            media: ["/img/styleposter/style_3-1.jpg", "/img/styleposter/style_3-2.jpg"],
        },
        {
            title: "it is all just style_2",
            category: "personal project, poster",
            year: "2026",
            desc: `It is all just style is a poster project which expresses my comprehensive thoughts on graphic design. 

The theme of the posters is design and style, and the inherent elements within graphic design become the main graphic. Each poster develops the fundamental idea behind the project by applying various styles to the same text each time. The text is continuously added, and the hierarchy of the content changes depending on the styles.
            
The decorations that hide the text are inspired by Roland Barthes' concept of "geno-song."            

(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">It is all just style은 그래픽 디자인에 관한 나의 생각을 총체적으로 표현하는 포스터 작업이다.</span>

<span class="ko-text">포스터의 주제는 디자인과 스타일이며, 그래픽 디자인 내부에서 발생한 요소가 주인공이 된다. 각각의 포스터는 동일한 텍스트에 여러 스타일을 적용해서 표현하는 과정을 통해 포스터의 기반이 되는 사고를 발전시킨다. 텍스트는 계속 추가되며 스타일에 따라 내용의 위계가 달라진다.</span>
            
<span class="ko-text">글자를 가리는 장식은 롤랑 바르트의 제노-노래(geno-song)의 개념에 착안한다.</span>`,
            media: ["/img/styleposter/style_2-1.jpg", "/img/styleposter/style_2-2.jpg", "/img/styleposter/style_2-3.jpg", "/img/styleposter/style_2-4.jpg"],
        },
        {
            title: "it is all just style_1",
            category: "personal project, poster",
            year: "2026",
            desc: `It is all just style is a poster project which expresses my comprehensive thoughts on graphic design. 

The theme of the posters is design and style, and the inherent elements within graphic design become the main graphic. Each poster develops the fundamental idea behind the project by applying various styles to the same text each time. The text is continuously added, and the hierarchy of the content changes depending on the styles.
            
The decorations that hide the text are inspired by Roland Barthes' concept of "geno-song."            

(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">It is all just style은 그래픽 디자인에 관한 나의 생각을 총체적으로 표현하는 포스터 작업이다.</span>

<span class="ko-text">포스터의 주제는 디자인과 스타일이며, 그래픽 디자인 내부에서 발생한 요소가 주인공이 된다. 각각의 포스터는 동일한 텍스트에 여러 스타일을 적용해서 표현하는 과정을 통해 포스터의 기반이 되는 사고를 발전시킨다. 텍스트는 계속 추가되며 스타일에 따라 내용의 위계가 달라진다.</span>
            
<span class="ko-text">글자를 가리는 장식은 롤랑 바르트의 제노-노래(geno-song)의 개념에 착안한다.</span>`,
            media: ["/img/styleposter/style_1-1.jpg", "/img/styleposter/style_1-2.jpg"],
        },
        {
            title: "Public Design Walk",
            category: "personal project, exhibition",
            year: "2025",
            desc: `Public Design Walk is an exhibition project that showcases two projects, “Iconic Icon” and “Illegal Area”. It is a permanent exhibition taking place in Jongno-gu, Seoul.

The aim was to move beyond the limited audiences who are able to access exhibition information and visit design exhibitions, and plan an exhibition that engages diverse, random audiences. Developing the two preceding projects on street-based participation, I therefore explored their potential to evolve into an exhibition. In order to create a street exhibition, the area was specifically limited to Jongno-gu in Seoul, where the works were attached.
            
I created digital posters and a catalogue to promote the exhibition. The contracts featured on the poster declares that this work is not merely a personal project by the designer, but an “official design work” that underwent an officially approval process similar to that for a commissioned project.
             
(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">Public Design Walk는 Iconic Icon과 Illegal Area 두 개의 프로젝트를 서울 종로구에서 선보이는 전시 프로젝트다.</span> 

<span class="ko-text">디자인에 관심을 갖고 전시의 정보를 접할 수 있는 한정된 관객만이 갤러리를 찾는 기존의 디자인 전시를 벗어나, 다양한 층의 관객을 만나는 전시를 기획하고자 하는 욕구가 있었다. 그렇기에 디자이너의 사회 참여에 관련된 앞선 두 프로젝트를 진행하는 과정에서 전시로 이어질 가능성을 염두에 두었고, 거리 전시를 만들고자 서울의 종로구로 구역을 한정지어 작업물을 부착했다.</span> 

<span class="ko-text">그리고 이를 선전하는 디지털 포스터와 도록을 만들었다. 포스터에 들어간 계약서는 이 작업물이 디자이너의 개인 프로젝트에 그치지 않고 사회 내부의 요청에 응답하는, 수주와 비슷한 승인의 과정을 거친 공식 디자인 작업물임을 암시하는 개체다.</span>
`,
            media: ["/img/pdw/pdw_1.jpg", "/img/pdw/pdw_2.jpg", "/img/pdw/pdw_3.jpg", "/img/pdw/pdw_4.jpg", "/img/pdw/pdw_5.jpg", "/img/pdw/pdw_6.jpg"]
        },
        {
            title: "Iconic Icon",
            category: "personal project, sticker",
            year: "2025",
            desc: `Iconic Icon started as a project exploring how design can operate on its own by treating social demands as the client, and searching for the right methods and media to respond to them.
            
Icons (more precisely, symbols) are a powerful visual language. They communicate messages and nuances without words. In Iconic Icon, I use the intuitive impact of icons to speak against hatred by responding to problems embedded in our social climate and the inherent demand to resolve them. 
Moving beyond design exhibitions limited to curated audiences in white cubes, the project intends its design output to meet random passersby on the street.
            
The first theme is “Hatred-blocking Icons.” Four types of icon stickers were directly applied to hateful materials found on the street. You can spot them scattered throughout the streets of Jongno-gu, Seoul.

(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">Iconic Icon은 사회의 요청을 클라이언트 삼아 디자인이 스스로 기능하는 방법과 매체를 찾는 중에 시작된 프로젝트다.</span>

<span class="ko-text">아이콘(정확히는 심볼)은 글자 없이 메세지와 뉘앙스를 전달할 수 있는 강력한 시각 언어다. Iconic Icon에서는 아이콘의 즉각적인 전달력을 통해 혐오에 반대해야 한다고 말하며, 이는 디자이너로서 사회에 내재한 문제와 이를 해결하라는 잠재적인 수요에 응하는 행위다. 또한 디자인의 결과물이 정제된 환경 속 선별된 관객이 아닌, 거리를 걷는 무작위의 대중과 만나게 한다.</span>
            
<span class="ko-text">첫번째 주제는 혐오를 가리는 아이콘이다. 거리에 붙은 혐오 게시글 위에 4종의 아이콘 스티커를 붙여 가린다. 종로구 거리 곳곳에서 스티커를 발견할 수 있다.</span>`,
            media: ["/img/iconicicon/icon_1.jpg", "/img/iconicicon/icon_2.jpg", "/img/iconicicon/icon_3.jpg", "/img/iconicicon/icon_4.jpg"],
            //--- link: "iconicicon.html",
            //--- icon: "/img/icon/iconic_icon.svg",
            //--- linkMsg: "essay"
        },
        {
            title: "Illegal Area",
            category: "personal project, sticker",
            year: "2025",
            desc: `Illegal Area is a street-based project that identifies public spaces where graphics can physically intervene, designates them as “Illegal Area”, and then attaches stickers reproducing the visual styles found within those areas.

While exploring ways to engage with the urban landscape through graphics, I began by analyzing the graphics already present on the streets.
            
The project was structured around two themes: "Orderly Illegal Zones" and "Disorderly Illegal Zones." I produced stickers that capture the distinct style of each zone and applied them to their respective locations.

(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">Illegal area는 공공장소에서 그래픽이 물리적으로 침투할 수 있는 영역을 찾아 범법구역으로 규정하고, 범법구역 내의 스타일을 재현해서 디자인 매체를 부착하는 길거리 기반 프로젝트다.</span>

<span class="ko-text">그래픽으로 거리 조경에 참여할 방안을 모색하던 중, 이미 조성된 거리의 그래픽을 분석해보자는 의도로 시작했다.</span>

<span class="ko-text">질서가 있는 범법구역과 무질서한 법법구역, 두 범법구역의 스타일을 추출한 두 개의 스티커를 제작해서 각각 해당하는 구역에 부착했다. 종로구 거리 곳곳에서 스티커를 발견할 수 있다.</span>`,
            media: ["/img/illegal/illegal_1.jpg", "/img/illegal/illegal_2.jpg", "/img/illegal/illegal_3.jpg"]
        },
        {
            title: "No surfing club",
            category: "personal project, SNS",
            year: "2024",
            desc: `No surfing club is a fictional club that exists only on Instagram.
        
1) Become known for a very distinctive style, or 2) have friends working inside the club scene, otherwise, getting commissioned to design club posters is difficult. So instead of waiting, I started my own club. The only content No surfing club offers is live show posters featuring font Transition that constantly morphs inside a hypercube. Recently, I have also been making unrestricted posters based on the keywords “dimension” and “transition.” No hierarchy, No refinement, and No obligation to be readable. The core concept of minority graphics is the main source of No Surfing Club, and the style of the club is continuously transitioning.
        
As a designer who produces content firsthand, I see No Surfing Club as an experiment in finding a sustainable way to survive as an independent designer.
        
(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">No surfing club은 SNS상에서 운영되는 클럽이다.</span>
        
<span class="ko-text">1) 개성적인 스타일로 유명해지거나 2) 클럽 관계자인 지인을 통해서가 아니면 클럽의 포스터 수주를 받기는 힘들므로, 스스로 클럽을 운영하기로 했다. No surfing club이 제공하는 콘텐츠는 하이퍼큐브 속에서 변화하는 서체 Transition의 개별 글자를 보여주는 라이브 공연 포스터다. 현재는 한발 나아가 차원과 변화라는 폭넓은 컨셉을 가지고 포스터를 제작하고 있다. 위계 없음, 정제 없음, 읽을 수 없는 글자와 날 것의 그래픽을 선보이는 음지의 양식이라면 뭐든 사용하며, 유행하는 양식을 따라 그래픽 컨셉은 계속 달라진다.</span>
        
<span class="ko-text">이 프로젝트는 콘텐츠를 직접 생산하는 독립 디자이너로서 자생 방안을 찾는 실험이기도 하다.</span>`,
            media: ["https://player.vimeo.com/video/1169303778?badge=0&autopause=0&player_id=0&app_id=58479", "https://player.vimeo.com/video/1169303797?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479", "https://player.vimeo.com/video/1169303825?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"],
            link: "https://www.instagram.com/no.surfingclub",
            icon: "/img/icon/nsc_icon.svg",
            linkMsg: "sns"
        },
        {
            title: "meta-Canvas",
            category: "personal project, digital",
            year: "2025",
            desc: `meta-Canvas is a project that visualizes the hierarchies emerging between various graphic design media. The work comprises both essays which serve as commentaries and symbolic images. This project was made to be optimized for the Instagram format.

The first series defines the distinct characteristics of design as it materialized in digital or printed media. This inquiry began during a social media-based project, where the rapid consumption of digital works led me to doubt my identity as a designer. The project started from the idea that producing designs for print is a privilege reserved for a few designers.
            
Canvas<>background, Art<>work, Spectacle<>essence: these are the three thematic pairs of the first series
            
Moving forward, the project will continue to examine hierarchies within design themes and styles. My goal is to foster a critical awareness among fellow designers regarding systemic disparities within the field and to prompt a collective reconsideration of why these hierarchies exist.
            
(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">meta-Canvas는 그래픽 디자인 매체간에 생겨나는 위계를 시각화한 프로젝트다. 작업의 기반이 되는 에세이와 기호로 이루어진 이미지가 있으며, 인스타그램 환경에 맞춰 작업되었다.</span>

<span class="ko-text">첫번째 시리즈는 디지털과 종이로 귀결되는 디자인 간의 특성 차이를 밝혀 특징지은 것이다. SNS를 기반으로 한 디지털 프로젝트를 진행하며, 빠르게 소모되는 작업을 만드는 과정에서 디자이너로서 정체성의 의문을 느낀 경험과 종이로 인쇄되는 디자인을 만드는 것은 일부 디자이너의 특권이라는 생각에서 시작됐다. 캔버스와 배경, 예술과 일, 환영과 본질이라는 대립되는 키워드이자 세 개의 주제로 이루어졌다.</span>`,
            media: ["/img/metacanvas/meta_1.jpg", "/img/metacanvas/meta_2.jpg", "/img/metacanvas/meta_3.jpg", "/img/metacanvas/meta_4.jpg"],
            //--- link: "metacanvas.html",
            //--- icon: "/img/icon/meta_icon.svg",
            //--- linkMsg: "essay"
        },
        {
            title: "Receipt as media",
            category: "personal project, book",
            year: "2025",
            desc: `Receipt as media is a work that regards the common receipt encountered in daily life as a design media, analyzing its inherent layout and typesetting to reassemble it into a book.

I layered new graphics and text over the original printed elements of collected receipts while strictly maintaining their existing margins. My objective was to examine the narratives generated by the media’s inherent properties, such as its fixed layouts, white space, and varying type sizes.

(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">Receipt as media는 일상에서 자주 마주치는 출력물인 영수증을 하나의 디자인 매체로 보고, 영수증의 디자인적 요소인 레이아웃과 조판을 분석해 다시 책으로 엮은 작업이다.</span>

<span class="ko-text">수집한 영수증에 출력된 글자 위에 새로운 그래픽과 글을 배치했다. 마진도 그대로 유지했다. 영수증에 내재되어 있는 레이아웃, 여백과 글씨의 크기 등이 자아내는 내용을 보려 했다.</span>`,
            media: ["/img/receipt/receipt_1.jpg", "/img/receipt/receipt_2.jpg", "/img/receipt/receipt_3.jpg", "/img/receipt/receipt_4.jpg"]
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

<span class="ko-text">invisible visible은 나에게 보이지만 남에게 동일하게 보이는지 확신할 수 없는 대상을 가시 영역과 비가시 영역 사이에 있는 "간가시" 영역의 상태로 규정하고 시각화하는 작업이다. 이 책은 간가시적 상태의 한 예인 비문증을 시각적으로 재현한 내용을 담았다.</span>

<span class="ko-text">시각화의 목표는 사실에 가까운 재현과 재현된 상태를 기반으로 하는 소통이다. 내가 보고 재현한 것이 타인에게도 동일하게 보인다고 확인 받으면 그것은 가시적인 상태에 더 가까워질 수 있다. 시각화를 위해 약 6주간 간가시적 물질을 본 뒤 글과 그림으로 기록하고 이를 기반으로, 혹은 기억에 의존하여 재현하는 작업을 했다. 시각화에 이와 같은 방법을 사용하며 이것이 원초적인 감각에 기반한 불안정한 관찰과 재현임을 느꼈다. 이러한 작업의 특성을 책의 개념에 반영했다.</span>

<span class="ko-text">비문증을 현상적인 특성을 반영해서 Invisible visible은 얇은 종이에 인쇄한 뒤 제본하지 않았다. 독자는 원하는 페이지를 겹쳐가며 간가시 영역의 물질을 관찰할 수 있다.</span>`,
            media: ["/img/invisible/invisible_1.jpg", "/img/invisible/invisible_2.jpg", "/img/invisible/invisible_3.jpg", "/img/invisible/invisible_4.jpg", "/img/invisible/invisible_5.jpg"]
        },
        {
            title: "Transition book",
            category: "personal project, book",
            year: "2024",
            desc: `Transition is a typeface created for the branding of “No surfing club” project, which explores the visual expression of the third dimension through graphics.The typeface is named for its transition from a line form to a halftone through 3D modeling.

To emphasize the theme of the project, 'a secretive club without physical space,' the typeface was designed as a cryptic dingbat.
            
Transition was completed as a halftone pattern and consists of four versions: C, M, Y, and K. These versions, each derived from a single halftone pattern, can be combined to form 3D objects, while each version also functions independently. The angles and densities of the halftone patterns in each version are different, creating distinct visual effects.

(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">No surfing club 프로젝트를 위해 제작한 암호 딩벳 서체 Transition의 제작 과정과 활용을 설명한 책. 선에서 입체로, 입체에서 망점으로 상태를 달리하는 Transition의 제작 과정에서 착안하여 이름을 붙였다. 망점으로 만들어진 모든 패밀리가 겹쳐졌을 때 깊이감을 드러내는 서체의 특징을 반영하여, 색상이 다른 텍스트를 겹쳐서 조판한 페이지가 삽입되었다.</span>

<span class="ko-text">러닝헤드는 목차가 더해질 때마다 서체의 버전을 겹쳐서 표현해 깊이감을 드러냈다. 서체가 주로 사용되는 디지털 환경을 암시하기 위해 텍스트의 양에 따라 서체의 크기가 달라지도록 조판했으며, 책의 판형 또한 모바일 환경과 같은 비율로 제작되었다.</span>
`,
            media: ["/img/transition/tran_1.jpg", "/img/transition/tran_2.jpg", "/img/transition/tran_3.jpg", "/img/transition/tran_4.jpg", "/img/transition/tran_5.jpg"],
            //--- link: "transition.html",
            //--- icon: "/img/icon/transition_icon.svg",
            //--- linkMsg: "full"
        },
        {
            title: "Form follows texture",
            category: "personal project, poster",
            year: "2024",
            desc: `Form follows texture is a project that explores digital textures to design objects that evoke the sensation of visual tactility. In the digital realm, any flat image can instantly transform into a texture, connecting these textures to form shapes.
           
(~˘▾˘)~ ♥ ~(˘▾˘~)

<span class="ko-text">Form follows texture는 시각적 촉감을 불러 일으키는 디지털 텍스처를 제작하고, 텍스처와 오브젝트의 관계를 실험하는 프로젝트다.</span>

<span class="ko-text">디지털 환경에서는 모든 평면 이미지가 곧바로 질감이 될 수 있다는 점에 착안하여 탐구를 시작했다. 자연환경에서 재현할 수 없는 6가지 질감을 주제로 촉각을 자극하는 형태를 생성했다.</span>`,
            media: ["/img/fft/fft_1.jpg", "/img/fft/fft_2.jpg", "/img/fft/fft_3.jpg", "/img/fft/fft_4.jpg"]
        },
        {
            title: "Spaceship",
            category: "personal project, poster",
            year: "2025",
            desc: `(~˘▾˘)~ ♥ ~(˘▾˘~)`,
            media: ["/img/spaceship/spaceship_1.jpg", "/img/spaceship/spaceship_2.jpg", "/img/spaceship/spaceship_3.jpg"]
        }
    ];

    // --- 5. 미디어 생성 공통 함수 ---
    function createProjectMediaElement(src, className) {
        const cleanSrc = src.replace(/&amp;/g, '&');
        let el;

        if (cleanSrc.includes('player.vimeo.com') || cleanSrc.includes('vimeo.com')) {
            el = document.createElement('iframe');
            const joiner = cleanSrc.includes('?') ? '&' : '?';
            el.src = `${cleanSrc}${joiner}autoplay=1&muted=1&loop=1&background=1`;
            el.setAttribute('frameborder', '0');
            el.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
            el.setAttribute('allowfullscreen', '');
            el.style.aspectRatio = '16 / 9';
        } else if (cleanSrc.toLowerCase().endsWith('.mp4')) {
            el = document.createElement('video');
            el.src = cleanSrc;
            el.autoplay = true;
            el.muted = true;
            el.loop = true;
            el.playsInline = true;
        } else {
            el = document.createElement('img');
            el.src = cleanSrc;
            el.loading = 'lazy';
            el.decoding = 'async';
            el.alt = '';
        }

        el.classList.add(className);
        return el;
    }

    // --- 6. 이미지/영상/Vimeo 초기화 ---
    function initImages() {
        if (!imageTrack) return;
        imageTrack.innerHTML = '';

        projects.forEach((project, pIdx) => {
            const projectWrapper = document.createElement('div');
            projectWrapper.classList.add('project-wrapper');

            const isStreet = ["Iconic Icon", "Illegal Area", "Public Design Walk"].includes(project.title);
            if (isStreet) {
                Object.assign(projectWrapper.style, {
                    backgroundImage: "url('/img/street.svg')",
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: 'auto 100%',
                    backgroundPosition: 'left center'
                });
            }

            project.media.forEach((src, mIdx) => {
                const el = createProjectMediaElement(src, 'project-image');
                el.dataset.projectIdx = pIdx;
                el.dataset.isLastInProject = (mIdx === project.media.length - 1);
                projectWrapper.appendChild(el);
            });

            if (project.title === "No surfing club") {
                const overlayContainer = document.createElement('div');
                overlayContainer.classList.add('nsc-overlay-container');
                for (let i = 1; i <= 8; i++) {
                    const overlayImg = document.createElement('img');
                    overlayImg.src = `/img/nsc/sticker/stickers_${i}.png`;
                    overlayImg.alt = '';
                    overlayImg.classList.add('nsc-random-img', `img-${i}`);
                    overlayContainer.appendChild(overlayImg);
                }
                projectWrapper.appendChild(overlayContainer);
            }

            imageTrack.appendChild(projectWrapper);
        });
    }

    // --- 7. 모바일 전용 프로젝트 피드 ---
function createMobileProjectFeed() {
    if (!mobileProjectFeed || mobileProjectFeed.dataset.ready === 'true') return;

    // [요청 2] 모바일 버전에서 홈페이지의 배경색이 노란색, 초록색, 하늘색 중 하나로 랜덤 설정
    if (isMobile()) {
        const colors = ['#fdffde', '#edffdc', '#e1fffb']; // 각각 노란색(--bg-yellow), 초록색(--bg-green), 하늘색(--bg-blue)의 값
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // CSS 미디어 쿼리 내에서 #fff로 강제 지정되어 있는 주요 컨테이너 요소들의 배경색을 한 번에 변경
        document.querySelectorAll('html, body, .grid-container, .main-content, .mobile-project-feed').forEach(el => {
            el.style.backgroundColor = randomColor;
        });

        createMobileNavButtons();
    }

    projects.forEach((project, idx) => {
        const section = document.createElement('article');
        section.className = 'mobile-project';
        section.id = `project-${idx + 1}`;
        section.dataset.projectIdx = idx;

        // [요청 1] 기존의 project.media[0]만 가져오던 방식에서 모든 이미지가 순서대로 노출되도록 변경
        if (project.media && project.media.length > 0) {
            project.media.forEach(mediaItem => {
                const mediaWrap = document.createElement('div');
                mediaWrap.className = 'mobile-project-media-wrap mobile-reveal';
                mediaWrap.appendChild(createProjectMediaElement(mediaItem, 'mobile-project-media'));
                section.appendChild(mediaWrap);
            });
        }

        const textWrap = document.createElement('div');
        textWrap.className = 'mobile-project-text mobile-reveal';

        const title = document.createElement('h2');
        title.className = 'mobile-project-title';
        title.textContent = project.title;

        const category = document.createElement('div');
        category.className = 'mobile-project-category';
        category.textContent = project.category;

        const year = document.createElement('div');
        year.className = 'mobile-project-year';
        year.textContent = project.year;

        const desc = document.createElement('div');
        desc.className = 'mobile-project-description';
        desc.innerHTML = project.desc || '';

        textWrap.appendChild(title);
        textWrap.appendChild(category);
        textWrap.appendChild(year);
        textWrap.appendChild(desc);

        // 미디어 요소들이 순서대로 위에 쌓인 후, 텍스트 설명 정보가 하단에 위치하도록 정렬
        section.appendChild(textWrap);
        mobileProjectFeed.appendChild(section);
    });

    mobileProjectFeed.dataset.ready = 'true';
    initMobileRevealObserver();
}

// 모바일 화살표 내비게이션 기능 함수 (웹 버전 스타일 이미지 적용)
function createMobileNavButtons() {
    // 중복 생성 방지
    if (document.querySelector('.mobile-nav-btn')) return;

    // 1. 이전 프로젝트 버튼 (arrow_1.png)
    const prevBtn = document.createElement('div');
    prevBtn.className = 'circular-button mobile-nav-btn prev';
    prevBtn.setAttribute('aria-label', 'Previous project');
    
    const prevImg = document.createElement('img');
    prevImg.className = 'arrow';
    prevImg.src = '/img/button_arrow/arrow_1.png';
    prevImg.alt = '';
    prevBtn.appendChild(prevImg);

    // 2. 다음 프로젝트 버튼 (arrow_2.png)
    const nextBtn = document.createElement('div');
    nextBtn.className = 'circular-button mobile-nav-btn next';
    nextBtn.setAttribute('aria-label', 'Next project');
    
    const nextImg = document.createElement('img');
    nextImg.className = 'arrow';
    nextImg.src = '/img/button_arrow/arrow_2.png';
    nextImg.alt = '';
    nextBtn.appendChild(nextImg);

    let currentIdx = 0;

    // 현재 스크롤 위치에서 가장 가까운 프로젝트 인덱스 구하기
    const updateCurrentIndex = () => {
        const mobileProjects = document.querySelectorAll('.mobile-project');
        let closestIdx = 0;
        let minDistance = Infinity;
        
        mobileProjects.forEach((proj, idx) => {
            const rect = proj.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            if (distance < minDistance) {
                minDistance = distance;
                closestIdx = idx;
            }
        });
        currentIdx = closestIdx;
    };

    // 이전 버튼 클릭 이벤트
    prevBtn.addEventListener('click', () => {
        updateCurrentIndex();
        if (currentIdx > 0) {
            currentIdx--;
            const target = document.getElementById(`project-${currentIdx + 1}`);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // 다음 버튼 클릭 이벤트
    nextBtn.addEventListener('click', () => {
        updateCurrentIndex();
        const mobileProjects = document.querySelectorAll('.mobile-project');
        if (currentIdx < mobileProjects.length - 1) {
            currentIdx++;
            const target = document.getElementById(`project-${currentIdx + 1}`);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    document.body.appendChild(prevBtn);
    document.body.appendChild(nextBtn);
}

    function initMobileRevealObserver() {
        if (!mobileProjectFeed) return;

        if (mobileRevealObserver) {
            mobileRevealObserver.disconnect();
            mobileRevealObserver = null;
        }

        const revealItems = mobileProjectFeed.querySelectorAll('.mobile-reveal');
        if (!('IntersectionObserver' in window)) {
            revealItems.forEach((item) => item.classList.add('is-visible'));
            return;
        }

        mobileRevealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -8% 0px'
        });

        revealItems.forEach((item) => mobileRevealObserver.observe(item));
    }

    // --- 8. 그리드 레이아웃 ---
    function createGridLines() {
        if (!linesOverlay || !gridContainer || isMobile()) return;
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
                Object.assign(line.style, {
                    left: `${currentWidth - gutterWidthPx}px`,
                    width: `${LINE_THICKNESS}px`,
                    height: '100%',
                    backgroundColor: MAGENTA_COLOR,
                    position: 'absolute'
                });
                linesOverlay.appendChild(line);
            }
            if (i < COLUMN_COUNT) {
                currentWidth += columnWidthPx;
                const line = document.createElement('div');
                Object.assign(line.style, {
                    left: `${currentWidth - columnWidthPx}px`,
                    width: `${LINE_THICKNESS}px`,
                    height: '100%',
                    backgroundColor: MAGENTA_COLOR,
                    position: 'absolute'
                });
                linesOverlay.appendChild(line);
            }
        }

        let currentHeight = 0;
        ROW_HEIGHTS_RATIO.forEach((heightRatio, index) => {
            currentHeight += containerHeight * heightRatio;
            if (index < ROW_HEIGHTS_RATIO.length - 1) {
                const line = document.createElement('div');
                Object.assign(line.style, {
                    top: `${currentHeight}px`,
                    height: `${LINE_THICKNESS}px`,
                    width: '100%',
                    backgroundColor: MAGENTA_COLOR,
                    position: 'absolute'
                });
                linesOverlay.appendChild(line);
            }
        });
    }

    // --- 9. 프로젝트 배치 및 스크롤 감지 ---
    function layoutProjectContent() {
        if (isMobile() || !gridContainer || !imageTrack || !imgScrollWrapper) return;

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
            projectImages.forEach((img) => {
                const rect = img.getBoundingClientRect();
                const containerRect = imgScrollWrapper.getBoundingClientRect();
                const relativeLeft = rect.left - containerRect.left + imgScrollWrapper.scrollLeft;
                if (relativeLeft < centerX) activeIdx = parseInt(img.dataset.projectIdx, 10);
            });
            if (activeIdx !== lastProjectIndex) {
                updateProjectText(activeIdx);
                lastProjectIndex = activeIdx;
            }
        };
    }

    // --- 10. 텍스트 업데이트 ---
    function updateProjectText(index) {
        const data = projects[index];
        if (!data) return;

        if (elTitle) elTitle.textContent = data.title;
        if (elCategory) elCategory.textContent = data.category;
        if (elYear) elYear.textContent = data.year;
        if (elDesc) elDesc.innerHTML = data.desc || '';

        if (elCurrentNum) elCurrentNum.textContent = (index + 1).toString().padStart(2, '0');
        if (elTotalNum) elTotalNum.textContent = projects.length.toString().padStart(2, '0');

        const colors = ['#feccff', '#e1fffb', '#edffdc'];
        let newColor;
        do {
            newColor = colors[Math.floor(Math.random() * colors.length)];
        } while (newColor === lastRandomColor);
        if (elDesc) {
            elDesc.style.backgroundColor = newColor;
            lastRandomColor = newColor;
        }

        if (data.link) {
            linkSymbol.style.display = 'block';
            linkSymbol.setAttribute('data-message', data.linkMsg || 'View Link');
            linkSymbol.style.backgroundImage = `url('${data.icon || '/img/icon/heart.svg'}')`;
            linkSymbol.onclick = (e) => {
                e.stopPropagation();
                window.location.href = data.link;
            };
        } else {
            linkSymbol.style.display = 'none';
        }

        if (elTitle) {
            elTitle.classList.remove('title-flash');
            void elTitle.offsetWidth;
            elTitle.classList.add('title-flash');
        }

        document.querySelectorAll('.project-image').forEach((img) => {
            img.classList.toggle('focused', parseInt(img.dataset.projectIdx, 10) === index);
        });
    }

    // --- 11. 스크롤 함수 ---
    const scrollToProject = (index) => {
        if (isMobile()) {
            const target = document.querySelector(`.mobile-project[data-project-idx="${index}"]`);
            if (!target) return;
            lastProjectIndex = index;
            updateProjectText(index);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }

        const wrappers = document.querySelectorAll('.project-wrapper');
        if (!wrappers[index] || !imgScrollWrapper) return;
        let offset = 0;
        for (let i = 0; i < index; i++) offset += wrappers[i].offsetWidth;
        imgScrollWrapper.scrollTo({ left: offset, behavior: 'smooth' });
    };

    // --- 12. 메뉴 오버레이 생성 로직 ---
    function closeMenuOverlay() {
        if (menuOverlay) menuOverlay.style.display = 'none';
    }

    function createMenuOverlay() {
        if (!menuOverlay || !menuProjectList) return;

        menuProjectList.innerHTML = '';
        projects.forEach((proj, idx) => {
            const item = document.createElement('div');
            item.className = 'menu-item';
            item.tabIndex = 0;
            item.setAttribute('role', 'button');

            const title = document.createElement('div');
            title.className = 'm-title';
            title.textContent = proj.title;

            const category = document.createElement('div');
            category.className = 'm-category';
            category.textContent = proj.category;

            const year = document.createElement('div');
            year.className = 'm-year';
            year.textContent = proj.year.replace(/\*/g, '');

            item.appendChild(title);
            item.appendChild(category);
            item.appendChild(year);

            const goToProject = () => {
                scrollToProject(idx);
                closeMenuOverlay();
            };

            item.addEventListener('click', goToProject);
            item.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    goToProject();
                }
            });

            menuProjectList.appendChild(item);
        });

        menuOverlay.style.display = 'flex';
    }

    function initMenuOverlayEvents() {
        if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenuOverlay);
        if (menuOverlay) {
            menuOverlay.addEventListener('click', (event) => {
                if (event.target === menuOverlay) closeMenuOverlay();
            });
        }
    }

    // --- 13. 버튼 이벤트 ---
    function initButtonEvents() {
        if (btnPrev) {
            btnPrev.onclick = () => {
                if (lastProjectIndex > 0) scrollToProject(lastProjectIndex - 1);
            };
        }
        if (btnNextArrow) {
            btnNextArrow.onclick = () => {
                if (lastProjectIndex < projects.length - 1) scrollToProject(lastProjectIndex + 1);
            };
        }
        if (btnNextMenu) {
            btnNextMenu.onclick = (e) => {
                e.stopPropagation();
                createMenuOverlay();
            };
        }
    }

    // --- 14. 원형 요소 배치 및 기타 ---
    function positionCircularElements() {
        if (!gridContainer || isMobile()) return;

        const r1H = gridContainer.clientHeight * ROW_HEIGHTS_RATIO[0];
        const mH = gridContainer.clientHeight * ROW_HEIGHTS_RATIO[2];
        const cW = gridContainer.clientWidth;
        const gW = cW * GUTTER_WIDTH_RATIO;
        const colW = (cW - (gW * (COLUMN_COUNT + 1))) / COLUMN_COUNT;
        const d = colW / 2;

        sloganContainers.forEach((container) => {
            const topPos = r1H - container.offsetTop;
            container.querySelectorAll('.circular-slogan-item').forEach((item, idx) => {
                item.textContent = item.dataset.word;
                Object.assign(item.style, {
                    width: `${d}px`,
                    height: `${d}px`,
                    top: `${topPos}px`,
                    left: `${idx * d}px`
                });
            });
        });

        document.querySelectorAll('.circular-button').forEach((btn) => {
            const col = parseInt(btn.dataset.col, 10);
            const left = ((col - 1) * (colW + gW)) + gW;
            Object.assign(btn.style, {
                width: `${d}px`,
                height: `${d}px`,
                top: `${mH - d}px`
            });
            if (btn.classList.contains('button-col-11-1') || btn.classList.contains('button-col-11-2')) {
                btn.style.left = `${left + colW - d}px`;
                if (btn.classList.contains('button-col-11-2')) btn.style.top = '0px';
            } else {
                btn.style.left = btn.classList.contains('button-col-6-2') ? `${left + colW - d}px` : `${left}px`;
            }
        });
    }

    const runLayout = () => {
        createMobileProjectFeed();
        if (isMobile()) return;
        createGridLines();
        positionCircularElements();
        layoutProjectContent();
    };

    initImages();
    createMobileProjectFeed();
    initButtonEvents();
    initMenuOverlayEvents();
    runLayout();
    updateProjectText(0);
    window.addEventListener('resize', runLayout);
});
