document.addEventListener("DOMContentLoaded",()=>{
    "use strict"

    const btnOpenModal = document.querySelector("#btnOpenModal");
    const modalBlock = document.querySelector("#modalBlock");
    const closeModal = document.querySelector("#closeModal");
    const questionTitle = document.querySelector("#question");
    const formAnswers = document.querySelector("#formAnswers");
    const prevButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");
    const sendButton = document.querySelector("#send");

    

    const questions = [
        {
            question: "Якого кольору бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Чорний',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "З якого м'яса котлета?",
            answers: [
                {
                    title: 'Курка',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Яловичина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Додаткові інгредієнти ?",
            answers: [
                {
                    title: 'Помідор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огірок',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Цибуля',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Додати соус?",
            answers: [
                {
                    title: 'Часниковий',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатний',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Гірчичний',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];

    btnOpenModal.addEventListener("click",()=>{
        modalBlock.classList.add('d-block');
        playTest();
        
    })

    closeModal.addEventListener("click",()=>{
        modalBlock.classList.remove('d-block');

    })

    const playTest = ()=> {
        
        const finalAnswers=[];

        let numberQuestion=0;
/*
        const renderButtons= ()=>{
            prevButton.style.display = numberQuestion === 0 ? 'none' : 'inline-block';
            nextButton.style.display = numberQuestion === questions.length - 1 ? 'none' : 'inline-block';
        }
*/
        const renderAnswers= (index)=>{
            questions[index].answers.forEach((answer)=>{
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

                 answerItem.innerHTML=
                `
                
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" value=${answer.title} class="d-none">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="${answer.url}" alt="burger">
                        <span>${answer.title}</span>
                    </label>
                
                `
                formAnswers.appendChild(answerItem);
            })
        };

        const renderQuestions=(indexQuestion)=>{
            formAnswers.innerHTML='';
            switch (true) {
                case numberQuestion === 0:
                    questionTitle.textContent = questions[indexQuestion].question;
                    formAnswers.innerHTML = '';
                    renderAnswers(indexQuestion);

                    prevButton.classList.add('d-none');
                    nextButton.classList.remove('d-none');
                    sendButton.classList.add('d-none');
                    break;

                case numberQuestion > 0 && numberQuestion <= questions.length - 1:
                    questionTitle.textContent = questions[indexQuestion].question;
                    formAnswers.innerHTML = '';
                    renderAnswers(indexQuestion);

                    prevButton.classList.remove('d-none');
                    nextButton.classList.remove('d-none');
                    sendButton.classList.add('d-none');
                    break;

                case numberQuestion === questions.length:
                    questionTitle.textContent = '';
                    formAnswers.innerHTML = `
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text">Ведіть номер телефону</span>
                        <input type="text" id="NumberPhone" class="form-control"
                            placeholder="Ведіть номер телефону..">
                    </div>
                    `;

                    prevButton.classList.add('d-none');
                    nextButton.classList.add('d-none');
                    sendButton.classList.remove('d-none');
                    break;

                case numberQuestion === questions.length + 1:
                    formAnswers.innerHTML = `
                    Дякуємо за замовлення! Менеджер вам зателефонує.
                    `;

                    setTimeout(() => {
                    modalBlock.classList.remove('d-block');
                    }, 2000);
                    break;
            }
            /*
            if(numberQuestion>=0&&numberQuestion<=questions.length-1){
                questionTitle.textContent=`${questions[indexQuestion].question}`;
                renderAnswers(indexQuestion);

                nextButton.classList.remove('d-none');
                prevButton.classList.remove('d-none');
            }
            if(numberQuestion===0){
                prevButton.classList.add('d-none');
                sendButton.classList.add('d-none');
            }
            if(numberQuestion===questions.length){
                questionTitle.textContent='';
                nextButton.classList.add('d-none');
                prevButton.classList.add('d-none');
                sendButton.classList.remove('d-none');

                formAnswers.innerHTML=
                `
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="NumberPhone">Ведіть номер телефону</span>
                    <input type="text" id="NumberPhone" class="form-control" placeholder="Ведіть номер телефону.." aria-label="Username" aria-describedby="addon-wrapping">
                </div>
                `
            }
            if(numberQuestion===questions.length+1){
                formAnswers.innerHTML=
                `
                Дякуємо за замовлення! Менеджер вам зателефонує.
                `
                setTimeout(()=>{
                    modalBlock.classList.remove('d-block');
                },2000)
            }*/
            
            //renderButtons();
        }
        renderQuestions(numberQuestion);

        const checkAnswers=()=>{
            const obj = {};
            const inputs = [...formAnswers.elements].filter((input)=>input.checked||input.id==="NumberPhone");
            
            inputs.forEach((input, index)=>{
                if(numberQuestion>=0&&numberQuestion<=questions.length-1){
                    obj[`${index}_${questions[numberQuestion].question}`]=input.value;
                }
                if(numberQuestion===questions.length){
                    obj['Number Phone']=input.value;
                }
            })
            finalAnswers.push(obj);
            console.log(finalAnswers);
            
        }

        prevButton.onclick=()=>{
            numberQuestion--;
            renderQuestions(numberQuestion);
        }

        nextButton.onclick=()=>{
            checkAnswers();
            numberQuestion++;
            renderQuestions(numberQuestion);
        }

        sendButton.onclick=()=>{
            checkAnswers();
            numberQuestion++;
            renderQuestions(numberQuestion);
            console.log(finalAnswers);
        }
    }
})