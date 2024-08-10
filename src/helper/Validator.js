export const validation = (values) => {
    const errors = {};

    // if (values.username && values.username.toString().trim() === '') {
    if (values.username === '') {
        errors.username = 'Username is required';
    }

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email.toString())) {
        errors.email = 'Email is invalid';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    } else {
        const password = values.password.toString();
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /[0-9]{1,2}/.test(password);
        const isLengthValid = password.length >= 8;

        if (!hasLetter || !hasNumber || !isLengthValid) {
            errors.password = 'Please enter a valid password: at least 8 characters, including at least one letter and one number from 0 to 99';
        }
    }

    return errors;
};