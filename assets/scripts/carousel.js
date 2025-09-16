class CarouselSlider {
  constructor(sliderSelector, trackSelector, dotsSelector, dotsClassName) {
    this.slider = document.querySelector(sliderSelector);
    this.dotsContainer = document.querySelector(dotsSelector);
    this.dotsClassName = dotsClassName;
    if (!this.slider || !this.dotsContainer) return;

    this.track = this.slider.querySelector(trackSelector);
    this.cards = () => Array.from(this.track.children);
    this.currentPage = 0;
    this.isScrollingProgrammatically = false;

    this.buildDots();
    this.attachEvents();
  }

  itemsPerPage() {
    return window.innerWidth >= 768 ? 3 : 1;
  }

  pageCount() {
    return Math.ceil(this.cards().length / this.itemsPerPage());
  }

  clearDots() {
    this.dotsContainer.innerHTML = '';
  }

  buildDots() {
    this.clearDots();
    const pages = this.pageCount();
    for (let i = 0; i < pages; i++) {
      const btn = document.createElement('button');
      btn.className = this.dotsClassName;
      btn.dataset.index = i;
      btn.addEventListener('click', () => {
        this.setActiveDot(i); // highlight immediately
        const list = this.cards();
        const target = list[i * this.itemsPerPage()];
        if (!target) return;

        this.isScrollingProgrammatically = true;

        const onScroll = () => {
          const currentScroll = this.slider.scrollLeft;
          const targetOffset = target.offsetLeft;
          const distance = Math.abs(currentScroll - targetOffset);

          if (distance < 2) { // reached target
            this.isScrollingProgrammatically = false;
            this.slider.removeEventListener('scroll', onScroll);
          }
        };

        this.slider.addEventListener('scroll', onScroll);

        this.scrollToPage(i);
      });
      this.dotsContainer.appendChild(btn);
    }
    this.setActiveDot(0);
  }

  setActiveDot(idx) {
    Array.from(this.dotsContainer.children).forEach((b, i) => b.classList.toggle('active', i === idx));
    this.currentPage = idx;
  }

  scrollToPage(pageIndex) {
    const startCard = pageIndex * this.itemsPerPage();
    const list = this.cards();
    const target = list[startCard] || list[list.length - 1];
    if (!target) return;
    this.slider.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
  }

  updateActiveDotFromScroll() {
    if (this.isScrollingProgrammatically) return; // skip updates while programmatic scrolling
    const list = this.cards();
    if (!list.length) return;

    const sliderRect = this.slider.getBoundingClientRect();
    let visibleIndex = -1;

    list.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      if (rect.right > sliderRect.left && rect.left < sliderRect.right) {
        visibleIndex = i;
      }
    });

    if (visibleIndex !== -1) {
      const page = Math.floor(visibleIndex / this.itemsPerPage());
      this.setActiveDot(Math.min(page, this.pageCount() - 1));
    }
  }

  attachEvents() {
    this.slider.addEventListener('scroll', () => this.updateActiveDotFromScroll());

    this.slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = Math.min(this.pageCount() - 1, this.currentPage + 1);
        this.scrollToPage(next);
        this.setActiveDot(next);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = Math.max(0, this.currentPage - 1);
        this.scrollToPage(prev);
        this.setActiveDot(prev);
      }
    });

    window.addEventListener('resize', () => {
      this.buildDots();
      this.scrollToPage(this.currentPage);
    });
  }
}

new CarouselSlider('.carousel', '.carousel__track', '.carousel__dots', 'carousel__dots--dot');
