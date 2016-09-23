export function required (value, errorMsgs, field) {
  if (!value) {
    errorMsgs.push(field)
  }
}

export function email (value, errorMsgs, field) {
  if (value) {
    if (!(/\S+@\S+\.\S+/.test(value))) {
      errorMsgs.push(value + ' is not a valid email address')
    }
  }
}

export function equality (value1, value2, errorMsgs, field) {
  if (value1 !== value2) {
    errorMsgs.push(field + ' do not match!')
  }
}
