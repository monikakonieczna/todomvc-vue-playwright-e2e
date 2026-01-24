import { expect, Locator } from '@playwright/test'

export class TodoItem {
  readonly label: Locator
  readonly editInput: Locator
  readonly checkbox: Locator
  readonly deleteButton: Locator
  constructor(private root: Locator) {
    this.label = root.locator('.view > label')
    this.editInput = root.locator('input.edit')
    this.checkbox = root.locator('.toggle')
    this.deleteButton = root.locator('.destroy')
  }

  async editAndValidateText(text: string) {
    await this.label.dblclick()
    await expect(this.root).toHaveClass(/editing/)
    await this.editInput.fill(text)
    await this.editInput.press('Enter')
    await this.expectText(text)
  }

  async expectText(text: string) {
    await expect(this.label).toHaveText(text)
  }

  async toggleComplete() {
    await this.checkbox.check()
  }

  async delete() {
    await this.root.hover()
    await this.deleteButton.click()
  }
}
