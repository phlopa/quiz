import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getDatabase, ref, get, push, child } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
document.addEventListener("DOMContentLoaded",()=>{
    // Import the functions you need from the SDKs you need
    
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyDjHxgtgtneH1diEfipKn3rRKBHHGFxT7w",
        authDomain: "burger-7d448.firebaseapp.com",
        databaseURL: "https://burger-7d448-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "burger-7d448",
        storageBucket: "burger-7d448.firebasestorage.app",
        messagingSenderId: "1052813496084",
        appId: "1:1052813496084:web:34c553e10b0fa28cabfc01",
        measurementId: "G-ZLP69MHCB5"
    };

    // Initialize Firebase
    // 2. Ініціалізація
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    

    const btnOpenModal = document.querySelector("#btnOpenModal");
    const modalBlock = document.querySelector("#modalBlock");
    const closeModal = document.querySelector("#closeModal");
    const questionTitle = document.querySelector("#question");
    const formAnswers = document.querySelector("#formAnswers");
    const prevButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");
    const sendButton = document.querySelector("#send");


    const getData=()=>{
        formAnswers.textContent="LOAD";
        
        prevButton.classList.add('d-none');
        nextButton.classList.add('d-none');
        // 3. Отримання даних (аналог вашого коду)
        const dbRef = ref(db);
        get(child(dbRef, "questions"))
            .then((snapshot) => {
            if (snapshot.exists()) {
                playTest(snapshot.val()); // Ось ваші дані у форматі JSON/Object
            } else {
                console.log("No data available");
            }
            })
            .catch((error) => {
            formAnswers.textContent="Помилка завантаження даних!"
            console.error(error);
            });
                
        
        
    }
/*
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
*/
    btnOpenModal.addEventListener("click",()=>{
        modalBlock.classList.add('d-block');
        getData();
    })

    closeModal.addEventListener("click",()=>{
        modalBlock.classList.remove('d-block');

    })

    const playTest = (questions)=> {
        
        const finalAnswers=[];

        let numberQuestion=0;

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
            const contactsRef = ref(db, 'contacts');

            // 3. Генеруємо новий ключ (push) і зберігаємо туди дані
            push(contactsRef, finalAnswers)
            .then(() => {
                console.log("Дані успішно збережені!");
            })
            .catch((error) => {
                console.error("Помилка запису:", error);
            });
            console.log(finalAnswers);
        }
    }
})