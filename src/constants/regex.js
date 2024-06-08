export const regex = {
    name: /^([A-Z])[A-Z0-9\s]{3,15}$/m,
    username: /^([a-z])[a-z0-9_]{3,15}$/m,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/m,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/m,
}