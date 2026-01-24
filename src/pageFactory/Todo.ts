import { test, expect, Locator, Page } from '@playwright/test'
import { Filters } from '../types/Filters'
import { TodoItem } from './ToDoItem'

export class Todo {
  private readonly url: string
  private readonly page: Page
  private readonly input: Locator
  private readonly todos: Locator
  private readonly filters: Locator

  constructor(page: Page, url = 'https://todomvc.com/examples/vue/dist/#/') {
    this.url = url
    this.page = page
    this.input = page.locator('.new-todo')
    this.todos = page.locator('.todo-list li')
    this.filters = page.locator('.filters')
  }

  item(index: number): TodoItem {
    return new TodoItem(this.todos.nth(index))
  }

  async openTodosSpace() {
    await test.step('Open todos space', async () => {
      await this.page.goto(`${this.url}`)
    })
  }

  async waitForReady() {
    await this.input.waitFor({ state: 'visible' })
  }

  async addTodo(todoText: string) {
    await test.step(`Add todo: ${todoText}`, async () => {
      await this.input.fill(todoText)
      await this.input.press('Enter')
    })
  }

  async seedTodos(todos: string[]) {
    for (const todo of todos) {
      await this.addTodo(todo)
    }
  }

  viewLabel(index: number) {
    return this.page.locator(`.todo-list li:nth-child(${index}) .view label`)
  }

  async validateTodosCount(count: number) {
    await test.step('Validate count of todos in the list', async () => {
      await expect(this.todos).toHaveCount(count)
    })
  }

  async filter(filter: Filters) {
    await test.step('Filter todos', async () => {
      await this.filters.locator(`text=${filter}`).click()
    })
  }
}
