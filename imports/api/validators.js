export function required (value, errorMsgs, field) {
  if (!value) {
    errorMsgs.push(field + ' cannot by empty')
  }
}

export function email (value, errorMsgs, field) {
  if (value) {
    if (!(/\S+@\S+\.\S+/.test(value))) {
      errorMsgs.push(value + ' is not a valid email address')
    }
  }
}
