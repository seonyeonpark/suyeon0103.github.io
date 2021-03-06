// header
	// 사이트맵 열고닫기
	const html = document.querySelector('html');
	const header = html.querySelector('.header_wrap');
	const btnSitemap = html.querySelector('.btn_sitemap');
	const sitemap = html.querySelector('.sitemap');

	btnSitemap.addEventListener('click', () => {
		html.classList.toggle('active'); // overflow: hidden;
		header.classList.toggle('active');
		sitemap.classList.toggle('active');
	});

	// 스크롤에 따른 헤더변화
	const headerWrap = html.querySelector('.header_wrap');
	let lastScroll = 0;

	window.addEventListener('scroll', () => {
		let scrollValue = html.scrollTop;

		if (scrollValue > 80) {
			if (scrollValue > lastScroll) {
				headerWrap.classList.add('fix');
				headerWrap.style.top = '0';
			} else {
				headerWrap.style.top = '-80px';
			}
		} else {
			headerWrap.classList.remove('fix');
			headerWrap.style.top = '0';
		}

		lastScroll = scrollValue;
	});

// main
	// 최상단 슬라이드
	const slideList = document.querySelector('ul.slide_list');
	const slidePage = slideList.querySelectorAll('.slide_page');
	const pageLen = slidePage.length; // li 길이
	const slidePageWidth = 100 / (pageLen + 2); // li 너비 계산
	const pageNum = document.querySelector('.page_num');
	const state = document.querySelector('.state');
	let curIdx = 0;
	let curPage = slidePage[curIdx]; // 활성화 슬라이드 선언
	curPage.classList.add('active');

	slideList.style.width = `${100 * (pageLen + 2)}%`; // ul 너비 지정
	slidePage.forEach((element) => {
		element.style.width = `${slidePageWidth}%`;
	}); // li 너비 지정

	// 슬라이드 양 끝에 슬라이드 복제하기
	const slidePageFirst = slideList.firstElementChild.cloneNode(true);
	const slidePageLast = slideList.lastElementChild.cloneNode(true);
	slideList.appendChild(slidePageFirst);
	slideList.insertBefore(slidePageLast, slideList.firstElementChild);

	slideList.lastElementChild.classList.remove('active'); // 복제된 슬라이드로부터 따라온 active 제거

	// 페이지 로드되면 자동재생
	let setting; // clear를 위한 전역함수 선언

	function autoPlay() {
		setting = setInterval(() => {
			slideList.style.transition = '1s';
			slideList.style.transform = `translateX(-${slidePageWidth * (curIdx + 2)}%`;

			curPage.classList.remove('active'); // 지나간 슬라이드
			
			curIdx++;

			curPage = slidePage[curIdx];
			pageNum.textContent = curIdx + 1;
			state.style.width = `${20 * (curIdx + 1)}%`;

			if(curIdx === pageLen) {
				setTimeout(() => {
					slideList.style.transition = '0s';
					slideList.style.transform = `translateX(-${slidePageWidth}%`;
				},1001);
				curIdx = 0;
				curPage = slidePage[curIdx];
				pageNum.textContent = curIdx + 1;
				state.style.width = '20%';
			};

			curPage.classList.add('active');
		},4000);
	};

	document.addEventListener("DOMContentLoaded", () => {
		autoPlay();
	});

	// 다음 페이지로 이동
	function nextPage() {
		slideList.style.transition = '1s';
		slideList.style.transform = `translateX(-${slidePageWidth * (curIdx + 2)}%`;

		curPage.classList.remove('active'); // 지나간 슬라이드

		curIdx++;

		curPage = slidePage[curIdx];
		pageNum.textContent = curIdx + 1;
		state.style.width = `${20 * (curIdx + 1)}%`;

		if(curIdx === pageLen) {
			setTimeout(() => {
				slideList.style.transition = '0s';
				slideList.style.transform = `translateX(-${slidePageWidth}%`;
			},1001);
			curIdx = 0;
			curPage = slidePage[curIdx];
			pageNum.textContent = curIdx + 1;
			state.style.width = '20%';
		};

		curPage.classList.add('active');
	};

	// 다음버튼 클릭
	const btnNext = document.querySelector('.btn.next');
	let click = true;

	btnNext.addEventListener('click', () => {
		if (click) {
			clearInterval(setting); // 자동재생 중지
			
			nextPage();

			autoPlay();

			click = !click;

			// transition(1s) 완료 후 클릭이 또 가능하도록
			setTimeout(() => {
				click = true;
			},1000)
		}
	});

	// 이전 페이지로 이동
	function prevPage() {
		slideList.style.transition = '1s';
		slideList.style.transform = `translateX(-${slidePageWidth * curIdx}%`;

		curPage.classList.remove('active'); // 지나간 슬라이드

		curIdx--;

		curPage = slidePage[curIdx];
		pageNum.textContent = curIdx + 1;
		state.style.width = `${20 * (curIdx + 1)}%`;

		if(curIdx === -1) {
			setTimeout(() => {
				slideList.style.transition = '0s';
				slideList.style.transform = `translateX(-${slidePageWidth * pageLen}%`;
			},1001);
			curIdx = pageLen - 1;
			curPage = slidePage[curIdx];
			pageNum.textContent = curIdx + 1;
			state.style.width = '100%';
		};

		curPage.classList.add('active');
	};

	// 이전버튼 클릭
	const btnPrev = document.querySelector('.btn.prev');

	btnPrev.addEventListener('click', () => {
		if (click) {
			clearInterval(setting); // 자동재생 중지
			
			prevPage();

			autoPlay();

			click = !click;

			// transition(1s) 완료 후 클릭이 또 가능하도록
			setTimeout(() => {
				click = true;
			},1000)
		}
	});

// footer
	// 자회사 바로가기
	const btnAffiliate = document.querySelector('.btn_affiliate');
	const affiliateList = document.querySelector('.affiliate_list');

	btnAffiliate.addEventListener('click', () => {
		affiliateList.style.display = 'block';

		html.addEventListener('click', function(e) {
			if ( !closeCheck(e.target) ) { // false일 경우 닫기
				affiliateList.style.display = 'none';

				this.removeEventListener('click', arguments.callee);
			}

			function closeCheck(click) { // 다른 곳 클릭시 false 반환
				while (click.className !== 'wrap') {
					if (click.className === 'affiliate') {
						return true;
					}
					click = click.parentNode;
				}
				return false;
			}
		})
	});