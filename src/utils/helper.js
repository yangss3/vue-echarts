function wrapWithArray(obj) {
  if (obj !== undefined) return Array.isArray(obj) ? obj : [obj]
  else return []
}

export { wrapWithArray }
