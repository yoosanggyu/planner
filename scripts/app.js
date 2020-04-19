

const store = {
    todos: [
      { id: 1, title: 'todo1', completed: false },
      { id: 2, title: 'todo2', completed: false },
      { id: 3, title: 'todo3', completed: false },
      { id: 4, title: 'todo4', completed: true },
    ],
  }
  
  // === 화면 동작과는 관련 없는 비지니스 로직 ===
  // 화면은 웹이 아닌 모바일 등 언제든 다른 부분으로 바뀔 수도 있다.
  // 실제 어플리케이션에 필요한 동작을 처리하는 비지니스 로직은 화면과는 상관이 없다.
  // 따라서 비지니스 로직 안에는 화면에 관련된 함수나 객체 등의 요소들이 나타나면 안 된다.
  
  // 보통 비지니스 로직은 별도의 javascript파일 (예를 들면 todoService.js) 로
  // 분리해서 관리하지만
  // 그러면 js파일들을 app.js에 모두 묶어주는(bundle) 라이브러리(webpack, parcel 등)이 필요하다.
  // 지금 단계에서는 번들링하지 않는다.
  
  const getTodos = () => {
    return store.todos;
  };
  
  // 추후에 입력값이 늘어날 수 있으므로 object로 받으며 전달 받을 때
  // 편의를 위해 destructuring
  const addTodo = ({ title }) => {
    store.todos = [
      ...store.todos,
      { id: store.todos.length + 1, title, completed: false },
    ];
  };
  
  const toggleTodo = todoId => {
    const todo = store.todos.find(todo => todo.id === todoId);
    todo.completed = !todo.completed;
  };
  
  const removeTodo = todoId => {
    store.todos = store.todos.filter(todo => todo.id !== todoId);
  };
  
  // === 비지니스 로직 끝 ===
  
  // === 화면에 관련된 처리를 하는 부분 ===
  
  const form = document.querySelector('form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('input-todo-title');
    const title = input.value;
    input.value = ''; // 입력창 비워주기
  
    addTodo({ title }); // 추후에 입력값이 늘어날 수 있으므로 object로 전달
    update(); // 화면을 새로 그려줌
  });
  
  // li DOM 오브젝트를 생성해서 리턴해주는 함수
  const createLi = todo => {
    const li = document.createElement('li');
    const complete = document.createElement('input');
    const remove = document.createElement('button');
    
    li.textContent = todo.title;
    complete.type = 'checkbox';
    complete.id = `checkbox-todo-${todo.id}`;
    complete.checked = todo.completed;
    remove.type = 'button';
    remove.textContent = 'Remove'
  
    complete.addEventListener('click', () => {
      toggleTodo(todo.id);
      update();
    });
  
    remove.addEventListener('click', () => {
      removeTodo(todo.id);
      update();
    })
  
    li.appendChild(complete);
    li.appendChild(remove);
  
    return li;
  };
  
  
  // 화면을 갱신해주는 부분(redering)
  const update = () => {
    const todoUl = document.getElementById('todo-list');
    const completedUl = document.getElementById('completed-list');
  
    todoUl.innerHTML = '';
    completedUl.innerHTML = '';
  
    const items = getTodos();
    
    items.map(item => 
      item.completed
        ? completedUl.appendChild(createLi(item))
        : todoUl.appendChild(createLi(item))
    );
  };
  
  
  // 즉시 실행 함수를 이용해 처음 화면 진입시 렌더링
  (() => {
    update();
  })();
  