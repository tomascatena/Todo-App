import { setFilters } from './filters';
import { createTodo, loadTodos } from './todos';
import { renderTodos } from './views';

renderTodos();

document.querySelector('#filter-todo').addEventListener('input', (e) => {
  setFilters({
    searchText: e.target.value,
  });
  renderTodos();
});

document.querySelector('#todo-form').addEventListener('submit', (e) => {
  const text = e.target.elements.text.value.trim();
  e.preventDefault();
  if (text.length > 0) {
    createTodo(text);
    renderTodos();
    e.target.elements.text.value = '';
  }
});

document.querySelector('#hide-completed').addEventListener('change', (e) => {
  setFilters({
    hideCompleted: e.target.checked,
  });
  renderTodos();
});

window.addEventListener('storage', (e) => {
  if (e.key === 'todos') {
    loadTodos();
    renderTodos();
  }
});
