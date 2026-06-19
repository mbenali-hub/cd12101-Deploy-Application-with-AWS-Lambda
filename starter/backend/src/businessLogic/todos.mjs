import { TodosAccess } from '../dataLayer/todosAccess.mjs'
import { AttachmentUtils } from '../fileStorage/attachmentUtils.mjs'
import { createLogger } from '../utils/logger.mjs'
import { v4 as uuidv4 } from 'uuid'

const logger = createLogger('Todos')
const todosAccess = new TodosAccess()
const attachmentUtils = new AttachmentUtils()

export async function getTodosForUser(userId) {
  logger.info('Getting todos for user', { userId })
  return todosAccess.getTodosForUser(userId)
}

export async function createTodo(userId, createTodoRequest) {
  const todoId = uuidv4()
  const createdAt = new Date().toISOString()

  const todo = {
    userId,
    todoId,
    createdAt,
    done: false,
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate
  }

  logger.info('Creating todo', { todo })
  return todosAccess.createTodo(todo)
}

export async function updateTodo(userId, todoId, updateTodoRequest) {
  logger.info('Updating todo', { userId, todoId })
  return todosAccess.updateTodo(userId, todoId, updateTodoRequest)
}

export async function deleteTodo(userId, todoId) {
  logger.info('Deleting todo', { userId, todoId })
  return todosAccess.deleteTodo(userId, todoId)
}

export async function createAttachmentPresignedUrl(userId, todoId) {
  logger.info('Generating presigned URL', { userId, todoId })

  const uploadUrl = await attachmentUtils.getUploadUrl(todoId)
  const attachmentUrl = attachmentUtils.getAttachmentUrl(todoId)

  await todosAccess.updateAttachmentUrl(userId, todoId, attachmentUrl)

  return uploadUrl
}
