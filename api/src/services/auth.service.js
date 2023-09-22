const generateAuthentificationToken = () => {
    const charset =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        code += charset.charAt(randomIndex);
    }
    return code;
};

export { generateAuthentificationToken };
