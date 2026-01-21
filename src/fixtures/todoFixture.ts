import { test as base, expect } from '@playwright/test'
import { Todo } from '../pageFactory/Todo'

type Fixtures = {
  todoPage: Todo
}

export const test = base.extend<Fixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new Todo(page)

    // Open the app using your page object
    await todoPage.openTodosSpace()

    // Clear localStorage to start fresh
    await page.evaluate(() => localStorage.clear())
    await page.reload()

    await todoPage.waitForReady()

    await use(todoPage)
  },
})

export { expect }
