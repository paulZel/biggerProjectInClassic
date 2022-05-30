const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);

    let sum = 0;
    //функция котораябудет срабатывать при выборе елемента пользователем
    const calcFunc = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value)); //будет приходить value с елемента который выбрал пользователь

        //проверяем заполнены ли два первые селекты, условие клиента, чтобы выводить суму
        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
        } else if (promocodeBlock.value === 'IWANTPOPART') { //два первых селекта заполнено но мы должны также проверить промокод
            resultBlock.textContent = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum; //просто сумма
        }
    };

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc); 
    promocodeBlock.addEventListener('input', calcFunc); 
};

export default calc;