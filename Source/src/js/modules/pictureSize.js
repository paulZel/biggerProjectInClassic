const pictureSize = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector);

    //мы должны показывать изображения и скрывать их.
    function showImg(block) { //мы можем получить картинку в этом блоке
        const img = block.querySelector('img');
        //нужно изменить путь src можем напрямую обратится через точку
        img.src = img.src.slice(0, -4) + '-1.png';//нам нужно превратить название с -1 У нас одинаковые окончания .png можем поработать с концом.
        //отрезали 4 символа и добавили 6
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'none'; //Выбераем только те селекторы где нет класса sizes-hit
        });
    }

    //теперь противоположная функция, когда мышка выходит за приделы блока
    function hideImg(block) { //мы можем получить картинку в этом блоке
        const img = block.querySelector('img');
        //можно использовать регулярное выражение чтобы вырезать -1, но мы уже используем метод slice
        //можем вырезать 6 символов и просто добавить .png
        img.src = img.src.slice(0, -6) + '.png';//картинка вернется в состояние заглушки
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'block'; //Выбераем только те селекторы где нет класса sizes-hit
        });
    }

    //берем все блоки и перебираем
    blocks.forEach(block => {
        block.addEventListener('mouseover', () => { //когда мышь над елементом
            showImg(block);
        });

        block.addEventListener('mouseout', () => { 
            hideImg(block);
        });
    });
};

export default pictureSize;