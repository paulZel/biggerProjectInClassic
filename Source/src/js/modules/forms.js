//import checkNumInputs from './checkNumInputs';
import { postData } from "../services/requests";

const forms = () => { //собирет информацию и отправлеет на сервер
    //получаем все формы и все инпуты
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]');
          

    //checkNumInputs('input[name="user_phone"]');
    //Когда будем показавать уведомления, будем скрывать форму, а потом возвращать ее обратно

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы с вами скоро свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    //создадим пути по каторым будем отправлять ныши даные
    //текстовая форма на адин адрес, с изображением на другой
    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };
 
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = "файл не выбран";
        });
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots; //либо будет содержать ... либо ничего
            //повторяющийся код закинем в переменую.
            const arr = item.files[0].name.split('.');
            //условие на длину имя файла, сколько символов показывать
            arr[0].length > 5 ? dots = "..." : dots = '.'; 
            //теперь формируем само имя
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => { //отправляя форму она перезагружается это нужно отменить для adjax 
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);//будем показывать оповещение в родителе формы

            //нужно форму скрыть
            item.classList.add('animated', 'fadeOutUp');//последний класс с анимация позволит красиво скрыть форму
            //по факту форма останется на странице просто она будет прозрачной
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);
            //теперь кроме того что форма станет прозрачной, она еще и исчезнет физически со страницы на время

            //теперь статус оповещения
            let statusImg = document.createElement('img');//будем создавать тег img
            //чтобы он заработал, нам его нужно заполнить
            statusImg.setAttribute('src', message.spinner); //устанавливаем самый главный атрибут изображения src, 2 аргумент это свойство с путем к изображению
            //И добавим анимация при появление спиннера
            statusImg.classList.add('animated', 'fadeInUp');// это противоположная анимация нашей форме
            statusMessage.appendChild(statusImg);
            //наш спинер готов и он будет отражатся после того как мы отправляем форму
            //этого не совсем достаточно так что добавим еще текстовое сообщение
            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading; //textConten помещает текст в созданый елемент, message.loading переменая с текстом
            //добавим еще один блок в statusMessage
            statusMessage.appendChild(textMessage);

            //собираем все даные с формы
            const formData = new FormData(item); 
            let api;
            //эта конструкция может иметь два выхода, если блок существует в родителя то получим его, если нет получим false по факту null можем это использовать для логического утверждения
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            //если здесь будет больше адрессов можно легко использовать switch case (было в прошлом проекте)
            console.log(api);



            //postData('assets/server.php', formData).then(res => {
                //уже не используем один адресс, переменая api
            postData(api, formData).then(res => {
                console.log(res);
                statusImg.setAttribute('src', message.ok);//если запрос пошел с положительным результатом
                textMessage.textContent = message.success;
            })
            //.catch(() => statusMessage.textContent = message.failure)
            //Если в catch больше чем одна строчка мы ставвим фигупные скобки
            .catch(() => {
                statusImg.setAttribute('src', message.fail);
                textMessage.textContent = message.fail;
            })
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                    //так как стоит display none поставим block
                    item.style.display = 'block';
                    //форма не появится благодаря анимации opecity 0
                    item.classList.remove('fadeOutUp');//нужно удалить класс каторыйотвечает за скрития формы
                    //И добавим класс для красивого появления формы
                    item.classList.add('fadeInUp'); //можно подбирать классы каторые нравятся
                }, 5000);
            });
        });
    });
};

export default forms;