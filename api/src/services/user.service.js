const isValidPassword = (password) => {
    const passwordRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})"
    );
    return passwordRegex.test(password);
};

export { isValidPassword };
