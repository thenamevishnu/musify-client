export const isEmpty = (fields) => {
    for (let key in fields) {
        if (!fields[key]) {
            return `${key.replace(key[0], key[0].toUpperCase())} is empty`
        }
    }
    return "OK"
}

export const nameError = `Name only allowed number, space, 4 - 16 characters and should be start with letter`
export const usernameError = `Username only allowed number, _,  4 - 16 characters and should be start with letter`
export const emailError = `Invalid email format`
export const passwordError = `Password should be contain at least one upper case, lower case, number, @$!%*?&`
export const passwordMismatchError = `Password doesn't match`
