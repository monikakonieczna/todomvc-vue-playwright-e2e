import { test, expect, Locator, Page } from '@playwright/test'
import { Filters } from '../types/Filters'

export class Todo {
  private readonly url: string
  private readonly page: Page
  private readonly input: Locator
  private readonly todos: Locator
  private readonly filters: Locator
  private readonly deleteButton: (index: number) => Locator
  private readonly todoCheckbox: (index: number) => Locator
  private readonly editButton: (index: number) => Locator

  constructor(page: Page, url = 'https://todomvc.com/examples/vue/dist/#/') {
    this.url = url
    this.page = page
    this.input = page.locator('.new-todo')
    this.todos = page.locator('.todo-list li')
    this.filters = page.locator('.filters')
    this.todoCheckbox = (index: number) => this.todos.nth(index).locator('.toggle')
    this.deleteButton = (index: number) => this.todos.nth(index).locator('.destroy')
    this.editButton = (index: number) => this.todos.nth(index).locator('.destroy')
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
    await test.step('Add todo', async () => {
      await this.input.fill(todoText)
      await this.input.press('Enter')
    })
  }

  async seedTodos(todos: string[]) {
    for (const todo of todos) {
      await this.addTodo(todo)
    }
  }

  todo(index: number) {
    return this.todos.nth(index)
  }

  viewLabel(index: number) {
    return this.page.locator(`.todo-list li:nth-child(${index}) .view label`)
  }

  async validateTodoText(index: number, text: string) {
    await test.step('Validate text in todo', async () => {
      await expect(this.viewLabel(index)).toContainText(text)
    })
  }

  async validateTodosCount(count: number) {
    await test.step('Validate count of todos in the list', async () => {
      await expect(this.todos).toHaveCount(count)
    })
  }

  async toggleTodo(index: number) {
    await test.step('Toggle todo on the list', async () => {
      await this.todo(index).check()
    })
  }

  async deleteTodo(index: number) {
    await test.step('Delete todo from the list', async () => {
      await this.deleteButton(index).click({ force: true })
    })
  }
  async editTodo(index: number, newText: string) {
    await test.step('Edit chosen todo on the list', async () => {
      await this.editButton(index).fill(newText)
      await this.editButton(index).press('Enter')
    })
  }

  async filter(filter: Filters) {
    await test.step('Filter todos', async () => {
      await this.filters.locator(`text=${filter}`).click()
    })
  }
}
