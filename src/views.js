import { getTodos, toggleTodo, removeTodo } from './todos';
import { getFilters } from './filters';

// Render h2 with amount of not completed todos
const todosLeft = () => {
  const incompleteTodos = getTodos().filter((todo) => !todo.completed);

  document.querySelector('#todosLeft').innerHTML = '';
  document
    .querySelector('#todosLeft')
    .appendChild(generateSummaryDOM(incompleteTodos));
};

// Render application todos based on filters
const renderTodos = () => {
  const todoEl = document.querySelector('#todos');
  const { searchText, hideCompleted } = getFilters();

  const filteredTodos = getTodos().filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const hideCompletedMatch = !hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  todoEl.innerHTML = '';

  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      todoEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement('p');
    messageEl.classList.add('empty-message');
    messageEl.textContent = 'No to-dos to show';
    todoEl.appendChild(messageEl);
  }

  todosLeft(todos);
};

// Get the DOM elements fon an individual note
const generateTodoDOM = function (todo) {
  const todoEl = document.createElement('label');
  const containerEl = document.createElement('div');
  const todoCheckbox = document.createElement('input');
  const todoText = document.createElement('span');
  const todoButton = document.createElement('button');

  // Setup the todo checkbox
  todoCheckbox.setAttribute('type', 'checkbox');
  todoCheckbox.checked = todo.completed;
  todoCheckbox.addEventListener('change', () => {
    toggleTodo(todo.id);
    renderTodos();
  });

  // Setup the todo text element
  todoText.textContent = todo.text;

  // Setup container
  todoEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');

  // Setup the remove todo button
  todoButton.textContent = 'remove';
  todoButton.classList.add('button', 'button--text');
  todoButton.addEventListener('click', () => {
    removeTodo(todo.id);
    renderTodos();
  });

  containerEl.appendChild(todoCheckbox);
  containerEl.appendChild(todoText);
  todoEl.appendChild(containerEl);
  todoEl.appendChild(todoButton);

  return todoEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement('h2');
  summary.classList.add('list-title');

  if (incompleteTodos.length === 0) {
    summary.textContent = `You have no todos left!`;
  } else if (incompleteTodos.length === 1) {
    summary.textContent = `You have ${incompleteTodos.length} todo left`;
  } else {
    summary.textContent = `You have ${incompleteTodos.length} todos left`;
  }

  return summary;
};

export { generateTodoDOM, generateSummaryDOM, renderTodos };
