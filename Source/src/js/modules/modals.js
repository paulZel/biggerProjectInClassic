const modals = () => {
    let btnPressed = false; //для вычисления была ли нажата хотя бы одна кнопка

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),//все модальные окна со станицы
              scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) { //проверка на обьект ивента
                    e.preventDefault(); //чтобы не перезагружалась страница на нажатия ссылки <a>
                }

                btnPressed = true; //пользователь кликнул хоть на одну кнопку

                if (destroy) {
                    item.remove();
                }

//при открытие нового модального окна, старые все закрываются
                windows.forEach(item => {
                    item.style.display = 'none';
                    //когда будем скрывать ненужные модальные окна будем использовать дополнительные классы
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = "block"; //модальное окно уже показывается на странице
                //чтобы не скролилась страница при открытом модальном окне
                document.body.style.overflow = "hidden";
                //document.body.classList.add('modal-open'); //можем использувать анимации и бутстрап css
                document.body.style.marginRight = `${scroll}px`;
        });

            
        });

        close.addEventListener('click', () => { //обект события нам здесь не нужен
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none"; 
            document.body.style.overflow = "";
            //document.body.classList.remove('modal-open');

            document.body.style.marginRight = `0px`;
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = "";
                //document.body.classList.remove('modal-open');

                document.body.style.marginRight = `0px`;
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display; //логически false / undefind

            //в этой функции нет доступа к window, поэтому
            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block'; //логически становится true
                }
            });
            //если ни одно модал окно не показывается, мы берем и показываем нужное
            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = "hidden";
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            } 
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px'; //задаем параметры чтобы блог действительно существовал на странице
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        //этот блок готов и мы можем поместить его на страницу
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth; //от полной ширины отнимаем пединги и главный контент (не включается прокрутка)
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            //обе функции включают в себя только пединги
            //так проверим долистал ли пользователь до конца страницы
            //для частично стандартных нужно изменить на body
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight); //вернет максимальное значение из аргументов каторые мы передадим

            //это будет работать только в стандартных режимах браузера
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                document.querySelector(selector).click(); //можно событие вызывать вручную
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    //showModalByTime('.popup-consultation', 5000);
};

export default modals;