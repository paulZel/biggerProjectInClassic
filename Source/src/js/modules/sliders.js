const sliders = (slides, dir, prev, next) => {
    let slideIndex = 1, //будет отображать текущей слайд, что показывается пользователю.
        paused = false; //переменая должна знать нужно ли в текущий момент остановить переключение слайдов
    const items = document.querySelectorAll(slides);
          

    //функция перемещения slideIndex
    function showSlides(n) { //можем идти вперед и назад
        if (n > items.length) { //чтобы не выходило больше слайдов чем есть
            slideIndex = 1;
        }

        if (n < 1) { //чтобы не выходило меньше 0
            slideIndex = items.length;
        }

        //показывая нужный слайд, скрыть все остальные
        items.forEach(item => {
            item.classList.add('animated'); //для css анимаций
            item.style.display = "none"; //мы не знаем есть ли в проекте определенный класс который отвечает за такой функционал, поэтому скрываем с помощю inline стилей
        });

        //нужно показать нужный пользователю
        items[slideIndex - 1].style.display = 'block';
    }

    //нужно выполнить первичною инициализацию функции
    showSlides(slideIndex); //когда пользователь первый раз зайдет на страницу, эта функция скроет все не активные слайды

    function changeSlide(n) {//будем вызывать когда будем кликать на определенные елементы либо вперед либо назад
        showSlides(slideIndex += n); //будем передавать либо 1 либо -1
        //можно это вызывать напрямую эту операцию, но красивее обернуть в функцию
    }

    //если мы подозреваем появления ошибок в будущем хорошо использовать следующее
    //теперь если селекторы кнопок небыли переданы, этот блок кода не сработает просто и не сламает логику скриптов
    try {
        const prevBtn = document.querySelector(prev),
              nextBtn = document.querySelector(next);

        //а если код все таки есть прописываем
        prevBtn.addEventListener('click', () => {
            changeSlide(-1); //вместо (-1) или (1) можно передать аргумент каторый будет инициализировать на слайдер
            //также добавляем анимации для переключения слайдов
            items[slideIndex - 1].classList.remove('slideInleft');//первый раз в нас не будет это срабатовать и ошыбки не будет
            items[slideIndex - 1].classList.add('slideInRight');
            //нужно это сделать чтобы убирать класс каторый мы добавляем в следующем
            
        });

        nextBtn.addEventListener('click', () => {
            changeSlide(1);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        });
    } catch (e) {

    }

    function activateAnimation() {
        if (dir === 'vertical') {
            //paused будет принимать значение уникального индетификатора setInterval
            paused = setInterval(function() {
                changeSlide(1);
                items[slideIndex - 1].classList.add('slideInDown');
            }, 3000);
        } else {
            paused = setInterval(function() {
                changeSlide(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, 3000);
        }
    }
    activateAnimation(); //первичная инициализация анимации 

    //если пользователь наводит мышку на слайдер
    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    //если убирает мышку со слайдера, обратно
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });
    
};

export default sliders;