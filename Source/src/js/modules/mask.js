const mask = (selector) => {

    let setCursorPosition = (pos, elem) => {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true); //будет обединять граничные точки диапазона
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select(); //таким образом мы установим курсор и выделим то значение которое сформировалось при помощи этих параметров
        }
    };

    function createMask(event) {
        let matrix = '+38 (___) ___ __ __',//матрицу можно вбить вручную, подятягивать с БД или json файл зависимо от страны
            i = 0,
            //удаления всех не цифр внутри матрицы
            def = matrix.replace(/\D/g, ''), //статичная на основе матрицы
            val = this.value.replace(/\D/g, ''); //динамичная на основе что ввел пользователь

        if (def.length >= val.length) {
            val = def; //не дадим пользователю удалить +38
        }
        
        this.value = matrix.replace(/./g, function(a) { //a - каждый символ
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        }); //нужно пройтись по матрице и заменить нужные значения, скобки оставляем

        //если пользователь нажал вне фокуса, маска должна очистится
        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            } 
        } else { //если не blur, скорее всего тогда focus
            setCursorPosition(this.value.length, this); //this ссылка на елемента в работе 
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
       input.addEventListener('input', createMask); 
       input.addEventListener('focus', createMask); 
       input.addEventListener('blur', createMask); 
    });
};

export default mask;