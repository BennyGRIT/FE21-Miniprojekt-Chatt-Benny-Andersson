import { db } from "./modules/firebaseApp";
import { onValue, ref, push, update, remove } from "firebase/database";

////////////////////////////////////
// if (input.value !== '') {
//     localStorage.setItem('name', input.value);
//   } else {
//     event.preventDefault();
//     alert('Please enter a name!');
//   }
// });



const nameBtn: any = document.getElementById('yourName');
nameBtn.addEventListener('click', e => {
    e.preventDefault();
    // const theName: any = document.getElementById('whosYourDaddy')
    const myUserInput: any = document.getElementById('whosYourDaddy');
    const myName = myUserInput.value

    if(myName == ""){
        alert("Skriv ditt namn för f*n")
        location.reload();

    }


    document.getElementById('legendId').innerHTML = `Ditt användarnamn: ${myName}`

 
    nameBtn.style.display = "none"
    myUserInput.style.display = "none"

    const refreshBtn: HTMLButtonElement = document.createElement('button');
    refreshBtn.setAttribute('class', 'refreshKnapp');
    refreshBtn.innerHTML = 'Klicka här för byta namn';
    document.getElementById('nameButton').appendChild(refreshBtn)
    refreshBtn.addEventListener('click', e => {
        e.preventDefault();
        location.reload();
    })




    const dbRef = ref(db, '/to-do');
    let tasks: Task[] = [];

    //On every value change in the database





    onValue(dbRef, snapshot => {
        const todoData = snapshot.val();

        //Remove ech task from the dom
        for (const task of tasks) {
            task.clearDOM();
        }

        tasks = []; //empty the array before we add new objects to it
        for (const key in todoData) {
            tasks.push(new Task(
                key,
                todoData[key].task,
                todoData[key].userName,
                todoData[key].theTime
            ));
        }

        console.log(tasks);

        

        function only25():void{
            const taskArray = Object.values(todoData);
            const first0 = Object.keys(todoData)[0];
            console.log(taskArray)
            for(let i=0; i<taskArray.length; i++){
            
            }if(taskArray.length>25){
            const test = ref(db, '/to-do/'+first0);
            remove(test);
            
            }else{
            console.log(taskArray.length);
            }
            }
            only25()

            const scrollingElement = (document.scrollingElement || document.body);
            scrollingElement.scrollTop = scrollingElement.scrollHeight;
        
    })

    //Add a task
    const theChatBtn: any = document.querySelector('#add')
    theChatBtn.addEventListener('click', e => {
        e.preventDefault();
    

        const chatTxt: any = document.getElementById('chatInput');
        const test = chatTxt.value
        if(test == ""){
            alert("Skriv något för helvetet")
        }

        const myUserInput: any = document.getElementById('whosYourDaddy');
        const myName = myUserInput.value

        // var today = new Date(); var time = today. getHours() + ":" + today
        const thisDate = new Date();
        const time = thisDate.getHours();
        const thisTime = thisDate + ""

        const taskToAdd = {
            userName: myName,
            task: test,
            theTime: thisTime

        }

        const newKey: string = push(dbRef).key;
        const newTask = {};
        newTask[newKey] = taskToAdd;

        update(dbRef, newTask);

        chatTxt.value = '';


        const scrollingElement = (document.scrollingElement || document.body);
        scrollingElement.scrollTop = scrollingElement.scrollHeight;
    })

    /////////////////////


    class Task {
        constructor(
            public readonly id: string,
            public readonly task: string,
            public readonly userName: string,
            public readonly theTime: string
        ) {
            this.displayTask();
        }

        //Create all DOM elements to display the task
        private displayTask(): void {

            const myUserInput: any = document.getElementById('whosYourDaddy');
            const myName = myUserInput.value




            const container: HTMLElement = document.createElement('section');
            const myAllChatt: HTMLElement = document.getElementById('allChatt');
            container.setAttribute('class', 'sectionId')
            container.id = this.id;
            document.body.prepend(container);
            myAllChatt.appendChild(container)

            const h4: HTMLHeadingElement = document.createElement('h4');
            h4.innerText = `Tid: ${this.theTime}
            Användarnamn: ${this.userName}
        Meddelande: ${this.task}`

            // if(this.done) h4.style.textDecorationLine = 'line-through';

            const removeBtn: HTMLButtonElement = document.createElement('button');
            removeBtn.setAttribute('class', 'taBortKnapp')
            removeBtn.innerText = 'Ta bort inlägget';
            container.prepend(h4, removeBtn);

            //Remove task
            removeBtn.addEventListener('click', () => {
                const taskRef = ref(db, '/to-do/' + this.id);
                remove(taskRef);
            })

            if (myName != this.userName) {
                removeBtn.style.display = "none"
            };
        }
        private toggleDone(): void {
            // this.done = !this.done;

    



            // const taskRef = ref(db, '/to-do/' + this.id);
            // const newDone = {};
            // // newDone['/done'] = this.done;
            // update(taskRef, newDone);
        }

        //Remove all DOM elements
        public clearDOM(): void {
            document.querySelector(`#${this.id}`).remove();
        }
    }

})



