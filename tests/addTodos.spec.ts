import { test, expect, Browser, Page } from '@playwright/test'
import { Todo } from '../src/pageFactory/Todo'

test.describe('Add Todos', () => {
  let todoPage: Todo
  let page: Page

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    todoPage = new Todo(page)
    await todoPage.openTodosSpace()
  });

  test.afterEach(async () => {
    await page.close()
  });

  test('Validate new todo was added with correct text', async () => {
    await todoPage.addTodo('Buy milk')
    await todoPage.validateTodoText(1, 'Buy milk')
  });

  test('Validate that multiple added todos are available in the list', async () => {
    await todoPage.addTodo('Task 1');
    await todoPage.addTodo('Task 2');
    await todoPage.validateTodosCount(2)
  });
});
