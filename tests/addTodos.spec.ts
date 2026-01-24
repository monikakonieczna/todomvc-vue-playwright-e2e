import { test } from '../src/fixtures/todoFixture'

test.describe('Add Todos', () => {
  test('Validate new todo was added with correct text', async ({ todoPage }) => {
    await todoPage.addTodo('Buy milk')
    const firstTodo = todoPage.item(0)
    await firstTodo.expectText('Buy milk')
  })

  test('Validate that multiple added todos are available in the list', async ({ todoPage }) => {
    await todoPage.addTodo('Task 1')
    await todoPage.addTodo('Task 2')
    await todoPage.validateTodosCount(2)
  })
})
