import { createLogger } from '../utils/logger.mjs'
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

const logger = createLogger('TodosAccess')

export class TodosAccess {
  constructor(
    dynamoDbDocument = DynamoDBDocument.from(new DynamoDB()),
    todosTable = process.env.TODOS_TABLE,
    todosCreatedAtIndex = process.env.TODOS_CREATED_AT_INDEX
  ) {
    this.dynamoDbDocument = dynamoDbDocument
    this.todosTable = todosTable
    this.todosCreatedAtIndex = todosCreatedAtIndex
  }

  async getTodosForUser(userId) {
    logger.info('Getting all todos for user', { userId })

    const result = await this.dynamoDbDocument.query({
      TableName: this.todosTable,
      IndexName: this.todosCreatedAtIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    })

    return result.Items
  }

  async createTodo(todo) {
    logger.info('Creating todo', { todo })

    await this.dynamoDbDocument.put({
      TableName: this.todosTable,
      Item: todo
    })

    return todo
  }

  async updateTodo(userId, todoId, todoUpdate) {
    logger.info('Updating todo', { userId, todoId, todoUpdate })

    await this.dynamoDbDocument.update({
      TableName: this.todosTable,
      Key: { userId, todoId },
      UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
      ExpressionAttributeNames: {
        '#name': 'name'
      },
      ExpressionAttributeValues: {
        ':name': todoUpdate.name,
        ':dueDate': todoUpdate.dueDate,
        ':done': todoUpdate.done
      }
    })
  }

  async deleteTodo(userId, todoId) {
    logger.info('Deleting todo', { userId, todoId })

    await this.dynamoDbDocument.delete({
      TableName: this.todosTable,
      Key: { userId, todoId }
    })
  }

  async updateAttachmentUrl(userId, todoId, attachmentUrl) {
    logger.info('Updating attachment URL', { userId, todoId, attachmentUrl })

    await this.dynamoDbDocument.update({
      TableName: this.todosTable,
      Key: { userId, todoId },
      UpdateExpression: 'set attachmentUrl = :attachmentUrl',
      ExpressionAttributeValues: {
        ':attachmentUrl': attachmentUrl
      }
    })
  }
}
