var companyEmail = localStorage.getItem('companyEmail');
var companyId = localStorage.getItem('companyId');



exports.isLoggedIn = () => {
    if(companyId === null || companyId === '')
    {
        return false;
    }
    else
    {
        return true;
    }
};
exports.getCompanyId = () => {
    return companyId;
};
exports.getCompanyEmail = () => {
    return companyEmail;

};
exports.setUserLoggedIn = (id,email) => {
    localStorage.setItem('companyId',id);
    localStorage.setItem('companyEmail',email);
}
exports.Logout = () => {
    localStorage.removeItem('companyId');
    localStorage.removeItem('companyEmail');
}
