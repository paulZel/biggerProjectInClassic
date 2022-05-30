const accordion = (triggersSelector, itemsSelector) => {
    //нам нужно получить тригеры заголовки, и скритый контент. Также контенту нужно назначить класы из animate.css
    const btns = document.querySelectorAll(triggersSelector);
          //blocks = document.querySelectorAll(itemsSelector);

          btns.forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active-style'); //если в елемента нет класса toggle ео добавит, елси класс есть toggle его уберет
                this.nextElementSibling.classList.toggle('active-content');

                if (this.classList.contains('active-style')) {
                    this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
                } else {
                    this.nextElementSibling.style.maxHeight = '0px';
                }
            });
          });
    
          /*
          это с помощю css
          //назначим каждому блоку анимацию
    blocks.forEach(block => {
        block.classList.add('animated', 'fadeInDown');
    });

    btns.forEach(btn => {
        btn.addEventListener('click', function() { //чтобы использоватся контекстом вызова внутри обработчика, воспользуемся класической функцией.

            //является ли елемент на каторый я нажал активный
            if (!this.classList.contains('active')) {
                //елси нет класса активности добавим, а у всех остальных заберем
                btns.forEach(btn => {
                    btn.classList.remove('active', 'active-style');
                });
                this.classList.add('active', 'active-style'); //на елементе где мы есть добавляем
                //добавили стили в main.css там все сделано
                

                    .often-questions .accordion-heading.active+.accordion-block {
                        display: block;
                    }

                    .often-questions p.active-style span {
                        color: #E950D7;
                        font-weight: 900;
                        text-decoration: none;
                        border: 0;
                    }

                    .often-questions .accordion-block {
                        display: none; //добавляем display = 'none'
                        margin-top: 1rem;
                        background-color: #f7e7e6;
                        padding: 3rem 4rem;
                    }
                
            }
        });
    });
    */
};

export default accordion;