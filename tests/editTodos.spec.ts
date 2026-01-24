import { test } from '../src/fixtures/todoFixture'

test.beforeEach(async ({ todoPage }) => {
  await todoPage.seedTodos(['Buy milk', 'Write tests', 'Deploy app'])
})

test('Validate editing of the second todo item', async ({ todoPage }) => {
  await todoPage.item(1).editAndValidateText('Write Playwright tests')
})
