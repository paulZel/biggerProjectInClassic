const filter = () => { //будет слишком много классов в верстке чтобы передавать их аргументами. Пропишем вручную.
    const menu = document.querySelector('.portfolio-menu'),
          items = menu.querySelectorAll('li'),
          btnAll = menu.querySelector('.all'),
          btnLovers = menu.querySelector('.lovers'),
          btnChef = menu.querySelector('.chef'),
          btnGirl =  menu.querySelector('.girl'),
          btnGuy = menu.querySelector('.guy'),
          btnGrandMother = menu.querySelector('.grandmother'),
          btnGranddad = menu.querySelector('.granddad'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          markAll = wrapper.querySelectorAll('.all'),
          markGirl = wrapper.querySelectorAll('.girl'),
          markLovers = wrapper.querySelectorAll('.lovers'),
          markChef = wrapper.querySelectorAll('.chef'),
          markGuy = wrapper.querySelectorAll('.guy'),
          no = document.querySelector('.portfolio-no');

    //нужна сделать фильтрацию елементов, показывать только нужные
    const typeFilter = (markType) => {
        markAll.forEach(mark => {
            mark.style.display = 'none';
            mark.classList.remove('animated', 'fadeIn');
        });

        no.style.display = "none";
        no.classList.remove('animated', 'fadeIn');

        //таким образом будет показывать интересные пользователю елементы
        if (markType) {
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            });
        } else {
                no.style.display = 'block';
                no.classList.add('animated', 'fadeIn');
        }
    };

    btnAll.addEventListener('click', () => {
        typeFilter(markAll);
    });

    btnLovers.addEventListener('click', () => {
        typeFilter(markLovers);
    });

    btnChef.addEventListener('click', () => {
        typeFilter(markChef);
    });

    btnGuy.addEventListener('click', () => {
        typeFilter(markGuy);
    });

    btnGirl.addEventListener('click', () => {
        typeFilter(markGirl);
    });

    btnGrandMother.addEventListener('click', () => {
        typeFilter(); //без аргумента срабатывает условие no.
    });

    btnGranddad.addEventListener('click', () => {
        typeFilter();
    });

    menu.addEventListener('click', (e) => {
        let target = e.target; //елемент на катором будет происходить событие

        if (target && target.tagName == "LI") { //обьязательно верхний регистр
            items.forEach(btn => btn.classList.remove('active')); //удаляем класс акивности со всех елементов в меню
            target.classList.add('active'); //добавляем класс активности елементу на каторый клкнул пользователь
        }
    });
};

export default filter;