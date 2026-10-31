// 這個應用程式使用 localStorage 儲存待辦事項，讓重新整理後資料仍然保留。
const STORAGE_KEY = 'todoListData';

const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const remainingCount = document.getElementById('remainingCount');

// 先從 localStorage 讀取資料，若不存在則使用空陣列。
let todos = loadTodos();

// 這個函式用來載入資料，並在資料不存在時回傳空陣列。
function loadTodos() {
  try {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : [];
  } catch (error) {
    // 若 localStorage 讀取失敗，直接回傳空陣列，避免整個頁面中斷。
    return [];
  }
}

// 這個函式用來保存資料到 localStorage。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 這個函式會重新渲染待辦列表，包含空白提示與未完成數量。
function renderTodos() {
  todoList.innerHTML = '';

  if (todos.length === 0) {
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
  }

  const incompleteCount = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = String(incompleteCount);

  // 依序建立每一筆待辦項目。
  todos.forEach((todo, index) => {
    const item = document.createElement('li');
    item.className = `todo-item${todo.completed ? ' completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.className = 'todo-checkbox';
    checkbox.setAttribute('aria-label', `完成待辦: ${todo.text}`);
    checkbox.addEventListener('change', () => {
      // 勾選後改變完成狀態，並更新畫面與 localStorage。
      todos[index].completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-button';
    deleteButton.textContent = '×';
    deleteButton.setAttribute('aria-label', `刪除待辦: ${todo.text}`);
    deleteButton.addEventListener('click', () => {
      // 刪除該筆待辦項目，並同步存回 localStorage。
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(deleteButton);
    todoList.appendChild(item);
  });
}

// 這個事件會在表單送出時新增待辦事項。
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = todoInput.value.trim();

  // 若輸入內容為空白，直接忽略，不新增待辦項目。
  if (!value) {
    todoInput.focus();
    return;
  }

  todos.push({
    id: Date.now(),
    text: value,
    completed: false,
  });

  saveTodos();
  todoInput.value = '';
  todoInput.focus();
  renderTodos();
});

// 頁面載入時先渲染一次。
renderTodos();
