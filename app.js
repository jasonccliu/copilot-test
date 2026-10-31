// 這個應用程式使用 localStorage 儲存待辦事項與主題設定，讓重新整理後資料仍然保留。
const STORAGE_KEY = 'todoListData';
const THEME_KEY = 'todoThemePreference';
const THEME_QUERY = '(prefers-color-scheme: dark)';

const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const remainingCount = document.getElementById('remainingCount');
const themeToggle = document.getElementById('themeToggle');
const filterButtons = document.querySelectorAll('.filter-button');

// 先從 localStorage 讀取資料，若不存在則使用空陣列。
let todos = loadTodos();
let currentFilter = 'all';

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

// 這個函式用來保存待辦資料到 localStorage。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 這個函式會判斷目前應使用哪種主題：
// 1. 使用者有明確選擇時，優先遵循使用者設定。
// 2. 若沒有設定，才依照作業系統的深淺色設定。
function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }

  return window.matchMedia(THEME_QUERY).matches ? 'dark' : 'light';
}

// 這個函式用來更新頁面的深淺色模式，並同步切換按鈕文字與圖示。
function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);

  const icon = themeToggle.querySelector('span');
  const label = themeToggle.querySelector('.theme-text');

  if (isDark) {
    icon.textContent = '☀️';
    label.textContent = '淺色模式';
  } else {
    icon.textContent = '🌙';
    label.textContent = '深色模式';
  }
}

// 這個函式會保存使用者選擇的主題到 localStorage。
function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

// 這個函式會依據目前篩選條件回傳要顯示的待辦列表。
function getFilteredTodos() {
  if (currentFilter === 'active') {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === 'completed') {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

// 這個函式用來取得目前篩選條件下的空白提示文字。
function getEmptyStateMessage() {
  if (currentFilter === 'all') {
    return '還沒有任何待辦事項,新增一個吧!';
  }

  if (currentFilter === 'active') {
    return '目前沒有未完成的待辦事項。已完成的項目不會在這裡顯示。';
  }

  return '目前沒有已完成的待辦事項。已取消勾選的項目會回到未完成清單，不會被刪除。';
}

// 這個函式會重新渲染待辦列表，包含空白提示與未完成數量。
function renderTodos() {
  const filteredTodos = getFilteredTodos();
  todoList.innerHTML = '';

  if (filteredTodos.length === 0) {
    emptyState.textContent = getEmptyStateMessage();
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
  }

  // 底部未完成數字會顯示整體數量，不受篩選影響。
  const incompleteCount = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = String(incompleteCount);

  // 依序建立每一筆待辦項目。
  filteredTodos.forEach((todo) => {
    const item = document.createElement('li');
    item.className = `todo-item${todo.completed ? ' completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.className = 'todo-checkbox';
    checkbox.setAttribute('aria-label', `完成待辦: ${todo.text}`);
    checkbox.addEventListener('change', () => {
      // 勾選後改變完成狀態，並更新畫面與 localStorage。
      const originalIndex = todos.findIndex((itemTodo) => itemTodo.id === todo.id);
      if (originalIndex !== -1) {
        todos[originalIndex].completed = checkbox.checked;
      }
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
      const originalIndex = todos.findIndex((itemTodo) => itemTodo.id === todo.id);
      if (originalIndex !== -1) {
        todos.splice(originalIndex, 1);
      }
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

// 這個事件會在點擊主題切換按鈕時切換深淺色模式。
themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
  saveTheme(nextTheme);
  applyTheme(nextTheme);
});

// 這個事件會在點選篩選按鈕時更新目前篩選條件。
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle('active', item === button);
    });

    renderTodos();
  });
});

// 這個事件會在作業系統主題改變時，自動更新深淺色模式，但只有在使用者沒有手動儲存設定時才生效。
const mediaQuery = window.matchMedia(THEME_QUERY);
mediaQuery.addEventListener('change', (event) => {
  const storedTheme = localStorage.getItem(THEME_KEY);

  if (!storedTheme) {
    applyTheme(event.matches ? 'dark' : 'light');
  }
});

// 頁面載入時先依照使用者設定或作業系統設定套用主題，再渲染待辦事項。
const initialTheme = getPreferredTheme();
applyTheme(initialTheme);
renderTodos();
