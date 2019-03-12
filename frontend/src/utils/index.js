export function getChatId(fromId, toId) {
  return [fromId, toId].sort().join('-')
}