function getDiffMonth(str) {
    let hoje = new Date();
    let data = new Date(str);

    let diffMeses = (hoje.getFullYear() - data.getFullYear()) * 12;
    diffMeses -= data.getMonth();
    diffMeses += hoje.getMonth();

    return diffMeses
}

function getDiffYear(str) {
    let hoje = new Date();
    let data = new Date(str);

    const diffAnos = hoje.getFullYear() - data.getFullYear();
    const diffMeses = hoje.getMonth() - data.getMonth();
    const diffDias = hoje.getDate() - data.getDate();

    if (diffMeses < 0 || (diffMeses === 0 && diffDias < 0)) {
        idade = diffAnos - 1;
    } else {
        idade = diffAnos;
    }

    return idade
}

module.exports = { getDiffMonth, getDiffYear }